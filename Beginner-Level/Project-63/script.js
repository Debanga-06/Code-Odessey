const CHOICES = ['rock', 'paper', 'scissors'];

const EMOJI = {
  rock: '🪨',
  paper: '📄',
  scissors: '✂️'
};

const WIN_RULES = {
  rock: 'scissors',
  paper: 'rock',
  scissors: 'paper'
};

const choiceButtons = document.querySelectorAll('.choice-btn');
const playerChoiceDisplay = document.getElementById('playerChoiceDisplay');
const computerChoiceDisplay = document.getElementById('computerChoiceDisplay');
const roundResult = document.getElementById('roundResult');
const playerScoreEl = document.getElementById('playerScore');
const computerScoreEl = document.getElementById('computerScore');
const tieScoreEl = document.getElementById('tieScore');
const resetBtn = document.getElementById('resetBtn');
const themeButtons = document.querySelectorAll('.theme-btn');
const body = document.body;

let playerScore = 0;
let computerScore = 0;
let tieScore = 0;

function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[randomIndex];
}

function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return 'tie';
  }

  if (WIN_RULES[playerChoice] === computerChoice) {
    return 'player';
  }

  return 'computer';
}

function playRound(playerChoice) {
  const computerChoice = getComputerChoice();
  const result = determineWinner(playerChoice, computerChoice);

  playerChoiceDisplay.textContent = EMOJI[playerChoice];
  computerChoiceDisplay.textContent = EMOJI[computerChoice];

  if (result === 'tie') {
    tieScore++;
    roundResult.textContent = `Both chose ${playerChoice}. It's a tie!`;
  } else if (result === 'player') {
    playerScore++;
    roundResult.textContent = `${capitalize(playerChoice)} beats ${computerChoice}. You win this round!`;
  } else {
    computerScore++;
    roundResult.textContent = `${capitalize(computerChoice)} beats ${playerChoice}. Computer wins this round.`;
  }

  updateScoreboard();
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function updateScoreboard() {
  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;
  tieScoreEl.textContent = tieScore;
}

function resetScores() {
  playerScore = 0;
  computerScore = 0;
  tieScore = 0;
  updateScoreboard();
  playerChoiceDisplay.textContent = '?';
  computerChoiceDisplay.textContent = '?';
  roundResult.textContent = 'Make your move';
}

choiceButtons.forEach(button => {
  button.addEventListener('click', () => {
    playRound(button.dataset.choice);
  });
});

resetBtn.addEventListener('click', resetScores);

themeButtons.forEach(button => {
  button.addEventListener('click', () => {
    body.className = button.dataset.theme;
    themeButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
  });
});