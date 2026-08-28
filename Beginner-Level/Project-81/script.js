const grid = document.getElementById('grid');
const speedSelect = document.getElementById('speedSelect');
const replayAllBtn = document.getElementById('replayAllBtn');

const ANIMATIONS = [
  { key: 'bounce', name: 'Bounce' },
  { key: 'spin', name: 'Spin' },
  { key: 'pulse', name: 'Pulse' },
  { key: 'shake', name: 'Shake' },
  { key: 'flip', name: 'Flip' },
  { key: 'slide', name: 'Slide In' },
  { key: 'fade', name: 'Fade' },
  { key: 'elastic', name: 'Elastic Pop' },
  { key: 'wobble', name: 'Wobble' }
];

function buildCards() {
  grid.innerHTML = '';

  ANIMATIONS.forEach(anim => {
    const card = document.createElement('div');
    card.classList.add('anim-card', `anim-${anim.key}`);
    card.dataset.key = anim.key;

    card.innerHTML = `
      <div class="anim-stage">
        <div class="anim-box"></div>
      </div>
      <span class="anim-name">${anim.name}</span>
    `;

    card.addEventListener('click', () => playAnimation(card));
    grid.appendChild(card);
  });
}

function playAnimation(card) {
  card.classList.remove('play');
  void card.offsetWidth;

  card.style.setProperty('--speed', speedSelect.value);
  applySpeed(card);

  card.classList.add('play');
}

function applySpeed(card) {
  const box = card.querySelector('.anim-box');
  box.style.animationDuration = '';

  const speed = Number(speedSelect.value);
  const baseDuration = getComputedDurationSeconds(card);

  if (baseDuration) {
    box.style.animationDuration = `${baseDuration * speed}s`;
  }
}

function getComputedDurationSeconds(card) {
  const durations = {
    bounce: 0.7, spin: 0.8, pulse: 0.7, shake: 0.6,
    flip: 0.8, slide: 0.6, fade: 0.8, elastic: 0.7, wobble: 0.6
  };
  return durations[card.dataset.key] || 0.7;
}

function replayAll() {
  const cards = document.querySelectorAll('.anim-card');
  cards.forEach(card => playAnimation(card));
}

replayAllBtn.addEventListener('click', replayAll);

speedSelect.addEventListener('change', () => {
  document.querySelectorAll('.anim-card').forEach(card => applySpeed(card));
});

buildCards();