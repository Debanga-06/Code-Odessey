const textInput = document.getElementById('textInput');
const wordCount = document.getElementById('wordCount');
const charCount = document.getElementById('charCount');
const sentenceCount = document.getElementById('sentenceCount');
const readTime = document.getElementById('readTime');
const clearBtn = document.getElementById('clearBtn');
const themeButtons = document.querySelectorAll('.theme-btn');
const body = document.body;

const WORDS_PER_MINUTE = 200;

function updateStats() {
  const text = textInput.value;
  const trimmed = text.trim();

  const words = trimmed.length === 0 ? [] : trimmed.split(/\s+/);
  const characters = text.length;
  const sentences = trimmed.length === 0 ? [] : trimmed.split(/[.!?]+/).filter(s => s.trim().length > 0);

  wordCount.textContent = words.length;
  charCount.textContent = characters;
  sentenceCount.textContent = sentences.length;

  const minutes = words.length / WORDS_PER_MINUTE;
  const seconds = Math.ceil(minutes * 60);

  readTime.textContent = seconds < 60 ? `${seconds}s` : `${Math.ceil(minutes)}m`;
}

textInput.addEventListener('input', updateStats);

clearBtn.addEventListener('click', () => {
  textInput.value = '';
  updateStats();
  textInput.focus();
});

themeButtons.forEach(button => {
  button.addEventListener('click', () => {
    body.className = button.dataset.theme;
    themeButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
  });
});

updateStats();