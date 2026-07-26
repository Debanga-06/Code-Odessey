const passwordOutput = document.getElementById('passwordOutput');
const copyBtn = document.getElementById('copyBtn');
const copyMsg = document.getElementById('copyMsg');
const strengthFill = document.getElementById('strengthFill');
const strengthLabel = document.getElementById('strengthLabel');
const lengthRange = document.getElementById('lengthRange');
const lengthValue = document.getElementById('lengthValue');
const optUpper = document.getElementById('optUpper');
const optLower = document.getElementById('optLower');
const optNumbers = document.getElementById('optNumbers');
const optSymbols = document.getElementById('optSymbols');
const generateBtn = document.getElementById('generateBtn');
const themeButtons = document.querySelectorAll('.theme-btn');
const body = document.body;

const CHAR_SETS = {
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lower: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}'
};

function getRandomChar(charset) {
  const randomIndex = Math.floor(Math.random() * charset.length);
  return charset[randomIndex];
}

function buildCharPool() {
  let pool = '';
  if (optUpper.checked) pool += CHAR_SETS.upper;
  if (optLower.checked) pool += CHAR_SETS.lower;
  if (optNumbers.checked) pool += CHAR_SETS.numbers;
  if (optSymbols.checked) pool += CHAR_SETS.symbols;
  return pool;
}

function generatePassword() {
  const length = Number(lengthRange.value);
  const pool = buildCharPool();

  if (pool.length === 0) {
    passwordOutput.value = '';
    copyMsg.textContent = 'Select at least one character type.';
    updateStrength('');
    return;
  }

  let password = '';
  for (let i = 0; i < length; i++) {
    password += getRandomChar(pool);
  }

  passwordOutput.value = password;
  copyMsg.textContent = '';
  updateStrength(password);
}

function updateStrength(password) {
  if (password.length === 0) {
    strengthFill.style.width = '0%';
    strengthFill.style.background = '';
    strengthLabel.textContent = 'Strength: -';
    return;
  }

  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 14) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const levels = [
    { label: 'Very Weak', color: '#e63946', width: 20 },
    { label: 'Weak', color: '#f4a261', width: 40 },
    { label: 'Fair', color: '#e9c46a', width: 60 },
    { label: 'Strong', color: '#2a9d8f', width: 80 },
    { label: 'Very Strong', color: '#06d6a0', width: 100 }
  ];

  const levelIndex = Math.min(score, levels.length - 1);
  const level = levels[levelIndex];

  strengthFill.style.width = `${level.width}%`;
  strengthFill.style.background = level.color;
  strengthLabel.textContent = `Strength: ${level.label}`;
}

lengthRange.addEventListener('input', () => {
  lengthValue.textContent = lengthRange.value;
  generatePassword();
});

[optUpper, optLower, optNumbers, optSymbols].forEach(checkbox => {
  checkbox.addEventListener('change', generatePassword);
});

generateBtn.addEventListener('click', generatePassword);

copyBtn.addEventListener('click', () => {
  if (!passwordOutput.value) {
    copyMsg.textContent = 'Nothing to copy yet.';
    return;
  }

  navigator.clipboard.writeText(passwordOutput.value)
    .then(() => {
      copyMsg.textContent = 'Copied to clipboard!';
      setTimeout(() => { copyMsg.textContent = ''; }, 2000);
    })
    .catch(() => {
      copyMsg.textContent = 'Copy failed. Select and copy manually.';
    });
});

themeButtons.forEach(button => {
  button.addEventListener('click', () => {
    body.className = button.dataset.theme;
    themeButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
  });
});

generatePassword();