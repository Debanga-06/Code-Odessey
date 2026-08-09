// 1. CONFIG
// No API key needed — the Free Dictionary API (dictionaryapi.dev)
// is open and keyless. See README for notes on what to do if that
// ever changes.
const API_BASE_URL = "https://api.dictionaryapi.dev/api/v2/entries/en";

// A small curated list to power "Word of the Day" — the API has
// no random-word endpoint, so this picks deterministically from
// a fixed list based on today's date (see pickWordOfTheDay below).
const WORD_LIST = [
  "serendipity", "ephemeral", "luminous", "resilience", "mosaic",
  "wanderlust", "quintessential", "labyrinth", "solitude", "cascade",
  "eloquent", "nostalgia", "paradox", "tranquil", "vivid",
  "whimsical", "harbinger", "kaleidoscope", "melancholy", "zephyr",
];

const body = document.body;
const themeButtons = document.querySelectorAll(".theme-btn");

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

const resultSection = document.getElementById("result-section");
const wordOfDayEl = document.getElementById("word-of-day");
const recentRow = document.getElementById("recent-row");

function applyTheme(theme) {
  body.dataset.theme = theme;
  localStorage.setItem("dictionaryapp-theme", theme);
  themeButtons.forEach((btn) => btn.classList.toggle("active", btn.dataset.theme === theme));
}

function initTheme() {
  applyTheme(localStorage.getItem("dictionaryapp-theme") || "dark");
}

themeButtons.forEach((btn) => btn.addEventListener("click", () => applyTheme(btn.dataset.theme)));

function pickWordOfTheDay() {
  const startOfYear = new Date(new Date().getFullYear(), 0, 0);
  const diffMs = new Date() - startOfYear;
  const dayOfYear = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return WORD_LIST[dayOfYear % WORD_LIST.length];
}

function renderWordOfDay() {
  const word = pickWordOfTheDay();
  wordOfDayEl.innerHTML = `
    <button class="wod-chip" id="wod-btn">
      <span class="wod-label">Word of the Day</span> — ${word}
    </button>
  `;
  document.getElementById("wod-btn").addEventListener("click", () => {
    searchInput.value = word;
    lookupWord(word);
  });
}

async function fetchDefinition(word) {
  const response = await fetch(`${API_BASE_URL}/${encodeURIComponent(word)}`);
  const data = await response.json();

  if (!response.ok) {
    // The API returns a JSON body even on 404 — { title, message, resolution } —
    // rather than an empty error, so we can surface its own message directly.
    throw new Error(data.message || "Word not found.");
  }

  return data; // array of entry objects (a word can have multiple etymological entries)
}

// A word like "bank" can return two separate entries (river bank vs.
// financial bank), each with its own meanings. This flattens them
// into one set of phonetics + one combined meanings list so the UI
// doesn't need to special-case "one entry" vs. "several."
function mergeEntries(entries) {
  const phonetics = [];
  const meanings = [];
  let origin = null;

  entries.forEach((entry) => {
    if (entry.origin && !origin) origin = entry.origin;

    (entry.phonetics || []).forEach((p) => {
      if (p.audio) phonetics.push(p);
    });

    meanings.push(...(entry.meanings || []));
  });

  return {
    word: entries[0].word,
    phonetic: entries[0].phonetic || entries.find((e) => e.phonetic)?.phonetic,
    phonetics,
    origin,
    meanings,
  };
}

function renderLoading(word) {
  resultSection.innerHTML = `<p class="empty-state">Looking up "${word}"...</p>`;
}

function renderError(message) {
  resultSection.innerHTML = `<p class="empty-state">${message}</p>`;
}

function renderWordCard(data) {
  const audioButtonsHTML = data.phonetics.length
    ? `<div class="audio-row">
        ${data.phonetics
          .map(
            (p, i) =>
              `<button class="audio-btn" data-audio="${normalizeAudioUrl(p.audio)}">🔊 ${p.text || `Pronunciation ${i + 1}`}</button>`
          )
          .join("")}
      </div>`
    : "";

  const meaningsHTML = data.meanings
    .map(
      (meaning) => `
      <div class="meaning-block">
        <span class="part-of-speech">${meaning.partOfSpeech}</span>
        ${meaning.definitions
          .slice(0, 4)
          .map(
            (def) => `
            <div class="definition-item">
              <div class="definition-text">${def.definition}</div>
              ${def.example ? `<div class="definition-example">"${def.example}"</div>` : ""}
            </div>`
          )
          .join("")}
        ${renderRelations("Synonyms", meaning.synonyms)}
        ${renderRelations("Antonyms", meaning.antonyms)}
      </div>`
    )
    .join("");

  resultSection.innerHTML = `
    <div class="word-card">
      <div class="word-header">
        <span class="word-title">${data.word}</span>
        ${data.phonetic ? `<span class="word-phonetic">${data.phonetic}</span>` : ""}
      </div>
      ${data.origin ? `<div class="origin-line">Origin: ${data.origin}</div>` : ""}
      ${audioButtonsHTML}
      ${meaningsHTML}
    </div>
  `;

  // Event delegation for the (possibly several) pronunciation buttons.
  resultSection.querySelectorAll(".audio-btn").forEach((btn) => {
    btn.addEventListener("click", () => playAudio(btn.dataset.audio));
  });
}

function renderRelations(label, words) {
  if (!words || words.length === 0) return "";
  const tags = words.slice(0, 6).map((w) => `<span class="relation-tag">${w}</span>`).join("");
  return `<div class="word-relations"><strong>${label}:</strong> ${tags}</div>`;
}

// Some audio URLs come back protocol-relative ("//ssl.gstatic.com/...")
// which fails when played directly in some browsers — this ensures
// an explicit https:// prefix.
function normalizeAudioUrl(url) {
  return url.startsWith("//") ? `https:${url}` : url;
}

function playAudio(url) {
  if (!url) return;
  new Audio(url).play().catch((err) => console.error("Playback failed:", err));
}

function getRecent() {
  return JSON.parse(localStorage.getItem("dictionaryapp-recent") || "[]");
}

function addToRecent(word) {
  let recent = getRecent().filter((w) => w.toLowerCase() !== word.toLowerCase());
  recent.unshift(word);
  recent = recent.slice(0, 10);
  localStorage.setItem("dictionaryapp-recent", JSON.stringify(recent));
  renderRecent();
}

function renderRecent() {
  const recent = getRecent();

  if (recent.length === 0) {
    recentRow.innerHTML = `<p class="recent-empty">Your searched words will show up here.</p>`;
    return;
  }

  recentRow.innerHTML = recent
    .map((word) => `<button class="recent-chip" data-word="${word}">${word}</button>`)
    .join("");
}

// Event delegation: handles every recent-search chip, including
// ones added after this listener was attached.
recentRow.addEventListener("click", (event) => {
  const chip = event.target.closest(".recent-chip");
  if (!chip) return;
  searchInput.value = chip.dataset.word;
  lookupWord(chip.dataset.word);
});

async function lookupWord(word) {
  const trimmed = word.trim();
  if (!trimmed) return;

  renderLoading(trimmed);

  try {
    const entries = await fetchDefinition(trimmed);
    const merged = mergeEntries(entries);
    renderWordCard(merged);
    addToRecent(merged.word);
  } catch (err) {
    console.error(err);
    renderError(`Couldn't find "${trimmed}". ${err.message}`);
  }
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  lookupWord(searchInput.value);
});


function init() {
  initTheme();
  renderWordOfDay();
  renderRecent();
}

init();