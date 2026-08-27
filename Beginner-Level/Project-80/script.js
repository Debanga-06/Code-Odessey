const labelInput = document.getElementById('labelInput');
const messageInput = document.getElementById('messageInput');
const labelColorRow = document.getElementById('labelColorRow');
const messageColorRow = document.getElementById('messageColorRow');
const styleButtons = document.querySelectorAll('.style-btn');
const presetButtons = document.querySelectorAll('.preset-btn');
const badgePreview = document.getElementById('badgePreview');
const markdownOutput = document.getElementById('markdownOutput');
const copyBtn = document.getElementById('copyBtn');

const LABEL_COLORS = ['#555555', '#2be0d0', '#4caf50', '#e63946', '#ffcb47'];
const MESSAGE_COLORS = ['#4caf50', '#2be0d0', '#ff2bd6', '#2b6cb0', '#e63946', '#ffcb47'];

const CHAR_WIDTH = 6.4;
const HORIZONTAL_PADDING = 10;

let selectedLabelColor = LABEL_COLORS[0];
let selectedMessageColor = MESSAGE_COLORS[1];
let selectedStyle = 'flat';

function buildColorSwatches(container, colors, selectedColor, onSelect) {
  container.innerHTML = '';

  colors.forEach(color => {
    const swatch = document.createElement('div');
    swatch.classList.add('color-swatch');
    if (color === selectedColor) swatch.classList.add('active');
    swatch.style.background = color;

    swatch.addEventListener('click', () => onSelect(color));
    container.appendChild(swatch);
  });
}

function estimateTextWidth(text) {
  return Math.round(text.length * CHAR_WIDTH + HORIZONTAL_PADDING * 2);
}

function getCornerRadius() {
  if (selectedStyle === 'square') return 0;
  if (selectedStyle === 'rounded') return 6;
  return 3;
}

function buildBadgeSVG() {
  const labelText = labelInput.value || 'label';
  const messageText = messageInput.value || 'message';

  const labelWidth = estimateTextWidth(labelText);
  const messageWidth = estimateTextWidth(messageText);
  const totalWidth = labelWidth + messageWidth;
  const radius = getCornerRadius();

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="20">
  <clipPath id="clip">
    <rect width="${totalWidth}" height="20" rx="${radius}"/>
  </clipPath>
  <g clip-path="url(#clip)">
    <rect width="${labelWidth}" height="20" fill="${selectedLabelColor}"/>
    <rect x="${labelWidth}" width="${messageWidth}" height="20" fill="${selectedMessageColor}"/>
  </g>
  <g fill="#fff" text-anchor="middle" font-family="Verdana, sans-serif" font-size="11">
    <text x="${labelWidth / 2}" y="14">${labelText}</text>
    <text x="${labelWidth + messageWidth / 2}" y="14">${messageText}</text>
  </g>
</svg>`;
}

function renderBadge() {
  const svgMarkup = buildBadgeSVG();
  badgePreview.innerHTML = svgMarkup;
  updateMarkdownOutput(svgMarkup);
}

function updateMarkdownOutput(svgMarkup) {
  const encoded = encodeURIComponent(svgMarkup)
    .replace(/'/g, '%27')
    .replace(/"/g, '%22');

  const dataUrl = `data:image/svg+xml,${encoded}`;
  markdownOutput.textContent = `![badge](${dataUrl})`;
}

function selectStyle(style, button) {
  selectedStyle = style;
  styleButtons.forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');
  renderBadge();
}

function applyPreset(preset) {
  labelInput.value = preset.label;
  messageInput.value = preset.message;
  selectedLabelColor = preset.labelColor;
  selectedMessageColor = preset.messageColor;

  buildColorSwatches(labelColorRow, LABEL_COLORS, selectedLabelColor, handleLabelColorSelect);
  buildColorSwatches(messageColorRow, MESSAGE_COLORS, selectedMessageColor, handleMessageColorSelect);
  renderBadge();
}

function handleLabelColorSelect(color) {
  selectedLabelColor = color;
  buildColorSwatches(labelColorRow, LABEL_COLORS, selectedLabelColor, handleLabelColorSelect);
  renderBadge();
}

function handleMessageColorSelect(color) {
  selectedMessageColor = color;
  buildColorSwatches(messageColorRow, MESSAGE_COLORS, selectedMessageColor, handleMessageColorSelect);
  renderBadge();
}

function copyMarkdown() {
  navigator.clipboard.writeText(markdownOutput.textContent)
    .then(() => {
      copyBtn.textContent = 'Copied!';
      setTimeout(() => { copyBtn.textContent = 'Copy'; }, 1500);
    })
    .catch(() => {
      copyBtn.textContent = 'Failed';
      setTimeout(() => { copyBtn.textContent = 'Copy'; }, 1500);
    });
}

labelInput.addEventListener('input', renderBadge);
messageInput.addEventListener('input', renderBadge);

styleButtons.forEach(button => {
  button.addEventListener('click', () => selectStyle(button.dataset.style, button));
});

presetButtons.forEach(button => {
  button.addEventListener('click', () => {
    applyPreset({
      label: button.dataset.label,
      message: button.dataset.message,
      labelColor: button.dataset.labelColor,
      messageColor: button.dataset.messageColor
    });
  });
});

copyBtn.addEventListener('click', copyMarkdown);

buildColorSwatches(labelColorRow, LABEL_COLORS, selectedLabelColor, handleLabelColorSelect);
buildColorSwatches(messageColorRow, MESSAGE_COLORS, selectedMessageColor, handleMessageColorSelect);
renderBadge();