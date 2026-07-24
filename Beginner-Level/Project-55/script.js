const ratingWidget = document.getElementById('ratingWidget');
const feedback = document.getElementById('feedback');
const themeButtons = document.querySelectorAll('.theme-btn');
const body = document.body;

const TOTAL_ITEMS = 5;

const labels = {
  1: 'Poor',
  2: 'Fair',
  3: 'Good',
  4: 'Very Good',
  5: 'Excellent'
};

const symbolsByTheme = {
  'theme-classic': ['★', '★', '★', '★', '★'],
  'theme-hearts': ['♥', '♥', '♥', '♥', '♥'],
  'theme-emoji': ['😠', '😕', '😐', '🙂', '😍'],
  'theme-numbers': ['1', '2', '3', '4', '5'],
  'theme-neon': ['★', '★', '★', '★', '★'],
  'theme-minimal': ['', '', '', '', '']
};

let selectedRating = 0;

function renderItems() {
  const theme = body.className;
  const symbols = symbolsByTheme[theme] || symbolsByTheme['theme-classic'];

  ratingWidget.innerHTML = '';

  for (let i = 1; i <= TOTAL_ITEMS; i++) {
    const item = document.createElement('span');
    item.classList.add('item');
    item.dataset.value = i;
    item.textContent = symbols[i - 1];
    ratingWidget.appendChild(item);
  }

  attachItemEvents();
  highlightItems(selectedRating);
}

function attachItemEvents() {
  const items = document.querySelectorAll('.item');

  items.forEach(item => {
    item.addEventListener('mouseenter', () => {
      highlightItems(Number(item.dataset.value));
    });

    item.addEventListener('mouseleave', () => {
      highlightItems(selectedRating);
    });

    item.addEventListener('click', () => {
      selectedRating = Number(item.dataset.value);
      highlightItems(selectedRating);
      feedback.textContent = `You rated: ${selectedRating} - ${labels[selectedRating]}`;
    });
  });
}

function highlightItems(value) {
  const items = document.querySelectorAll('.item');
  items.forEach(item => {
    item.classList.toggle('hovered', Number(item.dataset.value) <= value);
  });
}

themeButtons.forEach(button => {
  button.addEventListener('click', () => {
    body.className = button.dataset.theme;

    themeButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    renderItems();
  });
});

renderItems();