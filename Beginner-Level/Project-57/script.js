const textInput = document.getElementById('textInput');
const limitInput = document.getElementById('limitInput');
const progressFill = document.getElementById('progressFill');
const limitStatus = document.getElementById('limitStatus');
const letterCount = document.getElementById('letterCount');
const digitCount = document.getElementById('digitCount');
const spaceCount = document.getElementById('spaceCount');
const specialCount = document.getElementById('specialCount');
const clearBtn = document.getElementById('clearBtn');
const themeButtons = document.querySelectorAll('.theme-btn');
const body = document.body;

function analyzeText() {
  const text = textInput.value;
  const limit = Number(limitInput.value) || 0;
  const total = text.length;

  let letters = 0;
  let digits = 0;
  let spaces = 0;
  let special = 0;

  for (const char of text) {
    if (/[a-zA-Z]/.test(char)) {
      letters++;
    } else if (/[0-9]/.test(char)) {
      digits++;
    } else if (char === ' ') {
      spaces++;
    } else {
      special++;
    }
  }

  letterCount.textContent = letters;
  digitCount.textContent = digits;
  spaceCount.textContent = spaces;
  specialCount.textContent = special;

  limitStatus.textContent = `${total} / ${limit}`;

  const percentage = limit > 0 ? Math.min((total / limit) * 100, 100) : 0;
  progressFill.style.width = `${percentage}%`;

  if (total > limit) {
    progressFill.style.background = '#e63946';
    limitStatus.style.color = '#e63946';
  } else {
    progressFill.style.background = '';
    limitStatus.style.color = '';
  }
}

textInput.addEventListener('input', analyzeText);
limitInput.addEventListener('input', analyzeText);

clearBtn.addEventListener('click', () => {
  textInput.value = '';
  analyzeText();
  textInput.focus();
});

themeButtons.forEach(button => {
  button.addEventListener('click', () => {
    body.className = button.dataset.theme;
    themeButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
  });
});

analyzeText();