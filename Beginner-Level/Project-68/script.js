const themeCards = document.querySelectorAll('.theme-card');
const statusText = document.getElementById('statusText');
const body = document.body;

const STORAGE_KEY = 'preferredTheme';

const THEME_LABELS = {
  neon: 'Neon (default)',
  light: 'Light',
  dark: 'Dark',
  forest: 'Forest',
  sunset: 'Sunset'
};

function applyTheme(themeName) {
  if (themeName === 'neon') {
    body.removeAttribute('data-theme');
  } else {
    body.setAttribute('data-theme', themeName);
  }

  themeCards.forEach(card => {
    card.classList.toggle('active', card.dataset.theme === themeName);
  });

  statusText.textContent = `Current theme: ${THEME_LABELS[themeName]}`;
}

function saveTheme(themeName) {
  localStorage.setItem(STORAGE_KEY, themeName);
}

function loadSavedTheme() {
  const savedTheme = localStorage.getItem(STORAGE_KEY);
  return savedTheme && THEME_LABELS[savedTheme] ? savedTheme : 'neon';
}

themeCards.forEach(card => {
  card.addEventListener('click', () => {
    const themeName = card.dataset.theme;
    applyTheme(themeName);
    saveTheme(themeName);
  });
});

applyTheme(loadSavedTheme());