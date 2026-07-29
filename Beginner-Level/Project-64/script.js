const ICONS = ['🍎', '🍌', '🍇', '🍉', '🍓', '🍒', '🥝', '🍍'];

const grid = document.getElementById('grid');
const movesDisplay = document.getElementById('movesDisplay');
const matchesDisplay = document.getElementById('matchesDisplay');
const timerDisplay = document.getElementById('timerDisplay');
const winMsg = document.getElementById('winMsg');
const restartBtn = document.getElementById('restartBtn');

let cardValues = [];
let flippedCards = [];
let matchedCount = 0;
let moves = 0;
let isBoardLocked = false;
let seconds = 0;
let timerId = null;

function shuffleArray(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildBoard() {
  cardValues = shuffleArray([...ICONS, ...ICONS]);
  grid.innerHTML = '';

  cardValues.forEach((icon, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.index = index;
    card.dataset.icon = icon;
    card.textContent = '❓';
    card.addEventListener('click', () => handleCardClick(card));
    grid.appendChild(card);
  });
}

function handleCardClick(card) {
  if (isBoardLocked) return;
  if (card.classList.contains('flipped') || card.classList.contains('matched')) return;
  if (flippedCards.length === 2) return;

  if (flippedCards.length === 0 && timerId === null) {
    startTimer();
  }

  flipCard(card);
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    moves++;
    movesDisplay.textContent = `Moves: ${moves}`;
    checkForMatch();
  }
}

function flipCard(card) {
  card.classList.add('flipped');
  card.textContent = card.dataset.icon;
}

function unflipCard(card) {
  card.classList.remove('flipped');
  card.textContent = '❓';
}

function checkForMatch() {
  const [firstCard, secondCard] = flippedCards;

  if (firstCard.dataset.icon === secondCard.dataset.icon) {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    matchedCount++;
    matchesDisplay.textContent = `Matches: ${matchedCount} / ${ICONS.length}`;
    flippedCards = [];

    if (matchedCount === ICONS.length) {
      endGame();
    }
  } else {
    isBoardLocked = true;
    setTimeout(() => {
      unflipCard(firstCard);
      unflipCard(secondCard);
      flippedCards = [];
      isBoardLocked = false;
    }, 800);
  }
}

function startTimer() {
  timerId = setInterval(() => {
    seconds++;
    timerDisplay.textContent = `Time: ${seconds}s`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerId);
  timerId = null;
}

function endGame() {
  stopTimer();
  winMsg.classList.remove('hidden');
}

function restartGame() {
  stopTimer();
  seconds = 0;
  moves = 0;
  matchedCount = 0;
  flippedCards = [];
  isBoardLocked = false;

  movesDisplay.textContent = 'Moves: 0';
  matchesDisplay.textContent = `Matches: 0 / ${ICONS.length}`;
  timerDisplay.textContent = 'Time: 0s';
  winMsg.classList.add('hidden');

  buildBoard();
}

restartBtn.addEventListener('click', restartGame);

buildBoard();