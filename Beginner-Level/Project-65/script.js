const keyChar = document.getElementById('keyChar');
const keyValue = document.getElementById('keyValue');
const codeValue = document.getElementById('codeValue');
const keyCodeValue = document.getElementById('keyCodeValue');
const locationValue = document.getElementById('locationValue');
const modShift = document.getElementById('modShift');
const modCtrl = document.getElementById('modCtrl');
const modAlt = document.getElementById('modAlt');
const modMeta = document.getElementById('modMeta');
const logList = document.getElementById('logList');
const clearLogBtn = document.getElementById('clearLogBtn');

const LOCATION_NAMES = {
  0: 'Standard',
  1: 'Left',
  2: 'Right',
  3: 'Numpad'
};

const MAX_LOG_ENTRIES = 20;
let logEntries = [];

function updateModifiers(event) {
  modShift.classList.toggle('active', event.shiftKey);
  modCtrl.classList.toggle('active', event.ctrlKey);
  modAlt.classList.toggle('active', event.altKey);
  modMeta.classList.toggle('active', event.metaKey);
}

function displayKeyChar(event) {
  const displayable = event.key.length === 1 ? event.key.toUpperCase() : event.key;
  keyChar.textContent = displayable;
}

function addLogEntry(event) {
  const timestamp = new Date().toLocaleTimeString();
  const entryText = `[${timestamp}] key="${event.key}" code="${event.code}"`;

  logEntries.push(entryText);

  if (logEntries.length > MAX_LOG_ENTRIES) {
    logEntries.shift();
  }

  renderLog();
}

function renderLog() {
  logList.innerHTML = '';

  logEntries.forEach(entry => {
    const item = document.createElement('li');
    item.textContent = entry;
    logList.appendChild(item);
  });
}

function handleKeyDown(event) {
  displayKeyChar(event);

  keyValue.textContent = event.key;
  codeValue.textContent = event.code;
  keyCodeValue.textContent = event.keyCode;
  locationValue.textContent = LOCATION_NAMES[event.location] || 'Unknown';

  updateModifiers(event);
  addLogEntry(event);
}

document.addEventListener('keydown', handleKeyDown);

clearLogBtn.addEventListener('click', () => {
  logEntries = [];
  renderLog();
});