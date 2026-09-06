// No API key needed — Imgflip's get_memes endpoint is open and keyless.
const TEMPLATES_URL = "https://api.imgflip.com/get_memes";

const body = document.body;
const themeButtons = document.querySelectorAll(".theme-btn");

const templateSearch = document.getElementById("template-search");
const templateGrid = document.getElementById("template-grid");
const uploadInput = document.getElementById("upload-input");

const editorSection = document.getElementById("editor-section");
const memeStage = document.getElementById("meme-stage");
const memeImage = document.getElementById("meme-image");
const addTextBtn = document.getElementById("add-text-btn");
const downloadBtn = document.getElementById("download-btn");

const controlsPanel = document.getElementById("controls-panel");
const exportCanvas = document.getElementById("export-canvas");

let allTemplates = []; // fetched once, then filtered client-side (same pattern as project 105)
let selectedBox = null;
let isCrossOrigin = false; // tracks whether the current image needs crossOrigin handling on export
let boxIdCounter = 0;

function applyTheme(theme) {
  body.dataset.theme = theme;
  localStorage.setItem("memeapp-theme", theme);
  themeButtons.forEach((btn) => btn.classList.toggle("active", btn.dataset.theme === theme));
}

function initTheme() {
  applyTheme(localStorage.getItem("memeapp-theme") || "dark");
}

themeButtons.forEach((btn) => btn.addEventListener("click", () => applyTheme(btn.dataset.theme)));

async function loadTemplates() {
  renderTemplateSkeletons();

  try {
    const response = await fetch(TEMPLATES_URL);
    const data = await response.json();

    if (!data.success) throw new Error("Imgflip reported a failure");

    allTemplates = data.data.memes;
    renderTemplateGrid(allTemplates);
  } catch (err) {
    console.error(err);
    templateGrid.innerHTML = `<p style="color:var(--danger);">Couldn't load templates. You can still upload your own image below.</p>`;
  }
}

function renderTemplateSkeletons(count = 12) {
  templateGrid.innerHTML = Array.from({ length: count })
    .map(() => `<div class="template-skeleton"></div>`)
    .join("");
}

function renderTemplateGrid(templates) {
  if (templates.length === 0) {
    templateGrid.innerHTML = `<p style="color:var(--text-muted);">No templates match your search.</p>`;
    return;
  }

  templateGrid.innerHTML = templates
    .map(
      (t) => `
      <div class="template-card" data-id="${t.id}" data-url="${t.url}" data-boxes="${t.box_count}">
        <img class="template-thumb" src="${t.url}" alt="${t.name}" loading="lazy" />
        <div class="template-name">${t.name}</div>
      </div>`
    )
    .join("");
}

templateSearch.addEventListener("input", () => {
  const query = templateSearch.value.trim().toLowerCase();
  const filtered = query ? allTemplates.filter((t) => t.name.toLowerCase().includes(query)) : allTemplates;
  renderTemplateGrid(filtered);
});

templateGrid.addEventListener("click", (event) => {
  const card = event.target.closest(".template-card");
  if (!card) return;

  document.querySelectorAll(".template-card").forEach((c) => c.classList.remove("active"));
  card.classList.add("active");

  loadImageIntoStage(card.dataset.url, true); // Imgflip images are cross-origin
  setUpDefaultTextBoxes(Number(card.dataset.boxes) || 2);
});

uploadInput.addEventListener("change", () => {
  const file = uploadInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    // A data: URL is same-origin by definition, so this image will
    // never taint the export canvas — no CORS handling needed.
    loadImageIntoStage(reader.result, false);
    setUpDefaultTextBoxes(1);
  };
  reader.readAsDataURL(file);
});

function loadImageIntoStage(src, crossOrigin) {
  isCrossOrigin = crossOrigin;

  // crossOrigin must be set BEFORE src on some browsers (notably Safari),
  // or the CORS request headers won't be attached to the image fetch.
  if (crossOrigin) {
    memeImage.crossOrigin = "anonymous";
  } else {
    memeImage.removeAttribute("crossorigin");
  }

  memeImage.src = src;
  editorSection.hidden = false;
  editorSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

function setUpDefaultTextBoxes(boxCount) {
  document.querySelectorAll(".text-box").forEach((box) => box.remove());
  selectedBox = null;
  renderControlsPanel();

  if (boxCount >= 2) {
    addTextBox("TOP TEXT", 50, 10);
    addTextBox("BOTTOM TEXT", 50, 90);
  } else {
    addTextBox("YOUR TEXT", 50, 50);
  }
}

addTextBtn.addEventListener("click", () => addTextBox("NEW TEXT", 50, 50));

function addTextBox(text, xPct, yPct) {
  const box = document.createElement("div");
  box.className = "text-box";
  box.id = `text-box-${boxIdCounter++}`;
  box.contentEditable = "true";
  box.spellcheck = false;
  box.textContent = text;
  box.style.left = `${xPct}%`;
  box.style.top = `${yPct}%`;
  box.dataset.fontSize = "32";
  box.dataset.color = "#ffffff";
  box.dataset.stroke = "#000000";

  makeDraggable(box);
  memeStage.appendChild(box);
  selectTextBox(box);
}

// Distinguishes a click (select/edit text) from a drag (reposition)
// by watching for real pointer movement before committing to either.
function makeDraggable(box) {
  let dragging = false;
  let moved = false;
  let startX, startY, startLeftPct, startTopPct;

  box.addEventListener("pointerdown", (event) => {
    dragging = true;
    moved = false;
    startX = event.clientX;
    startY = event.clientY;
    startLeftPct = parseFloat(box.style.left);
    startTopPct = parseFloat(box.style.top);
    box.setPointerCapture(event.pointerId);
  });

  box.addEventListener("pointermove", (event) => {
    if (!dragging) return;
    const dx = event.clientX - startX;
    const dy = event.clientY - startY;

    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
      moved = true;
      event.preventDefault(); // stop text selection while dragging
      const rect = memeStage.getBoundingClientRect();
      const newLeftPct = clamp(startLeftPct + (dx / rect.width) * 100, 4, 96);
      const newTopPct = clamp(startTopPct + (dy / rect.height) * 100, 4, 96);
      box.style.left = `${newLeftPct}%`;
      box.style.top = `${newTopPct}%`;
    }
  });

  box.addEventListener("pointerup", (event) => {
    dragging = false;
    box.releasePointerCapture(event.pointerId);
    if (!moved) selectTextBox(box); // a real click, not a drag — select for editing/styling
  });
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function selectTextBox(box) {
  document.querySelectorAll(".text-box").forEach((b) => b.classList.remove("selected"));
  box.classList.add("selected");
  selectedBox = box;
  renderControlsPanel();
}

memeStage.addEventListener("click", (event) => {
  if (event.target === memeStage || event.target === memeImage) {
    document.querySelectorAll(".text-box").forEach((b) => b.classList.remove("selected"));
    selectedBox = null;
    renderControlsPanel();
  }
});

function renderControlsPanel() {
  if (!selectedBox) {
    controlsPanel.innerHTML = `<p class="controls-empty">Select a text box on the meme to edit its style, or add a new one.</p>`;
    return;
  }

  const fontSize = selectedBox.dataset.fontSize;
  const color = selectedBox.dataset.color;
  const stroke = selectedBox.dataset.stroke;

  controlsPanel.innerHTML = `
    <div class="control-group">
      <label for="font-size-input">Font size: <span id="font-size-value">${fontSize}px</span></label>
      <input type="range" id="font-size-input" min="14" max="72" value="${fontSize}" />
    </div>
    <div class="control-group">
      <label for="text-color-input">Text color</label>
      <input type="color" id="text-color-input" value="${color}" />
    </div>
    <div class="control-group">
      <label for="stroke-color-input">Outline color</label>
      <input type="color" id="stroke-color-input" value="${stroke}" />
    </div>
    <div class="control-group">
      <button class="remove-text-btn" id="remove-text-btn">🗑️ Remove this text</button>
    </div>
  `;

  document.getElementById("font-size-input").addEventListener("input", (e) => {
    selectedBox.dataset.fontSize = e.target.value;
    selectedBox.style.fontSize = `${e.target.value}px`;
    document.getElementById("font-size-value").textContent = `${e.target.value}px`;
  });

  document.getElementById("text-color-input").addEventListener("input", (e) => {
    selectedBox.dataset.color = e.target.value;
    selectedBox.style.color = e.target.value;
  });

  document.getElementById("stroke-color-input").addEventListener("input", (e) => {
    selectedBox.dataset.stroke = e.target.value;
    selectedBox.style.webkitTextStroke = `2px ${e.target.value}`;
  });

  document.getElementById("remove-text-btn").addEventListener("click", () => {
    selectedBox.remove();
    selectedBox = null;
    renderControlsPanel();
  });
}

downloadBtn.addEventListener("click", () => {
  if (!memeImage.src || !memeImage.complete) {
    alert("Please wait for the image to finish loading.");
    return;
  }

  try {
    composeExportCanvas();
    triggerDownload();
  } catch (err) {
    console.error(err);
    // This is the classic tainted-canvas error: the template's host
    // (i.imgflip.com) didn't return CORS headers for this image, so
    // the browser refuses to let us read pixel data back out.
    alert(
      "This template's image couldn't be exported due to a browser security restriction (CORS). Try uploading your own image instead — uploaded images always export fine."
    );
  }
});

function composeExportCanvas() {
  const naturalWidth = memeImage.naturalWidth;
  const naturalHeight = memeImage.naturalHeight;
  const displayedWidth = memeImage.getBoundingClientRect().width;
  const scale = naturalWidth / displayedWidth; // so exported text matches on-screen proportions at full resolution

  exportCanvas.width = naturalWidth;
  exportCanvas.height = naturalHeight;

  const ctx = exportCanvas.getContext("2d");
  ctx.drawImage(memeImage, 0, 0, naturalWidth, naturalHeight);

  document.querySelectorAll(".text-box").forEach((box) => {
    const xPct = parseFloat(box.style.left);
    const yPct = parseFloat(box.style.top);
    const x = (xPct / 100) * naturalWidth;
    const y = (yPct / 100) * naturalHeight;

    const fontSize = Number(box.dataset.fontSize) * scale;
    const lineHeight = fontSize * 1.1;
    const lines = box.textContent.split("\n");

    ctx.font = `${fontSize}px Impact, "Arial Narrow Bold", sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.lineWidth = Math.max(2, fontSize / 16);
    ctx.strokeStyle = box.dataset.stroke;
    ctx.fillStyle = box.dataset.color;

    const startY = y - ((lines.length - 1) * lineHeight) / 2;
    lines.forEach((line, i) => {
      const lineY = startY + i * lineHeight;
      ctx.strokeText(line.toUpperCase(), x, lineY);
      ctx.fillText(line.toUpperCase(), x, lineY);
    });
  });
}

function triggerDownload() {
  // toDataURL is exactly the call that throws if the canvas is tainted —
  // everything up to this point succeeds even with a cross-origin image.
  const dataUrl = exportCanvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = "meme.png";
  link.click();
}


function init() {
  initTheme();
  loadTemplates();
}

init();