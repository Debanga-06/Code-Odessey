const textOutput = document.getElementById('textOutput');
const keyboard = document.getElementById('keyboard');

const KEY_ROWS = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Backspace'],
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'Enter'],
  ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ','],
  ['Space']
];

const WIDE_KEYS = ['Backspace', 'Enter', 'Shift'];
const EXTRA_WIDE_KEYS = ['Space'];
const SPECIAL_KEYS = ['Backspace', 'Enter', 'Shift', 'Space'];

let isShiftActive = false;

function buildKeyboard() {
  keyboard.innerHTML = '';

  KEY_ROWS.forEach(row => {
    const rowEl = document.createElement('div');
    rowEl.classList.add('key-row');

    row.forEach(keyLabel => {
      const keyEl = document.createElement('div');
      keyEl.classList.add('key');
      keyEl.dataset.key = keyLabel;

      if (WIDE_KEYS.includes(keyLabel)) keyEl.classList.add('wide');
      if (EXTRA_WIDE_KEYS.includes(keyLabel)) keyEl.classList.add('extra-wide');
      if (SPECIAL_KEYS.includes(keyLabel)) keyEl.classList.add('special');

      keyEl.textContent = getKeyDisplay(keyLabel);

      keyEl.addEventListener('click', () => handleKeyClick(keyLabel, keyEl));
      rowEl.appendChild(keyEl);
    });

    keyboard.appendChild(rowEl);
  });
}

function getKeyDisplay(keyLabel) {
  if (keyLabel.length === 1) {
    return isShiftActive ? keyLabel.toUpperCase() : keyLabel;
  }
  return keyLabel;
}

function handleKeyClick(keyLabel, keyEl) {
  flashKey(keyEl);

  if (keyLabel === 'Backspace') {
    textOutput.value = textOutput.value.slice(0, -1);
  } else if (keyLabel === 'Enter') {
    textOutput.value += '\n';
  } else if (keyLabel === 'Space') {
    textOutput.value += ' ';
  } else if (keyLabel === 'Shift') {
    toggleShift(keyEl);
  } else {
    const character = isShiftActive ? keyLabel.toUpperCase() : keyLabel;
    textOutput.value += character;
  }

  textOutput.focus();
}

function toggleShift(keyEl) {
  isShiftActive = !isShiftActive;
  keyEl.classList.toggle('active-toggle', isShiftActive);
  updateKeyLabels();
}

function updateKeyLabels() {
  document.querySelectorAll('.key').forEach(keyEl => {
    const keyLabel = keyEl.dataset.key;
    if (!SPECIAL_KEYS.includes(keyLabel)) {
      keyEl.textContent = getKeyDisplay(keyLabel);
    }
  });
}

function flashKey(keyEl) {
  keyEl.classList.add('pressed');
  setTimeout(() => keyEl.classList.remove('pressed'), 100);
}

function findKeyElement(physicalKey) {
  const normalizedKey = physicalKey.length === 1 ? physicalKey.toLowerCase() : physicalKey;
  return document.querySelector(`.key[data-key="${normalizedKey}"]`);
}

function handlePhysicalKeydown(event) {
  let matchLabel = event.key;

  if (event.key === ' ') matchLabel = 'Space';

  const keyEl = findKeyElement(matchLabel);
  if (keyEl) {
    flashKey(keyEl);
  }
}

document.addEventListener('keydown', handlePhysicalKeydown);

buildKeyboard();