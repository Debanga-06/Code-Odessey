const usernameOutput = document.getElementById('usernameOutput');
const copyBtn = document.getElementById('copyBtn');
const copyMsg = document.getElementById('copyMsg');
const optNumber = document.getElementById('optNumber');
const optSeparator = document.getElementById('optSeparator');
const separatorSelect = document.getElementById('separatorSelect');
const historyList = document.getElementById('historyList');
const generateBtn = document.getElementById('generateBtn');
const themeButtons = document.querySelectorAll('.theme-btn');
const body = document.body;

const ADJECTIVES = [
  'Swift', 'Silent', 'Brave', 'Clever', 'Mighty', 'Lucky', 'Cosmic',
  'Frosty', 'Golden', 'Wild', 'Electric', 'Shadow', 'Crimson', 'Rapid'
];

const NOUNS = [
  'Falcon', 'Tiger', 'Panther', 'Comet', 'Wolf', 'Phoenix', 'Ranger',
  'Ninja', 'Voyager', 'Dragon', 'Otter', 'Raven', 'Storm', 'Nomad'
];

const MAX_HISTORY = 5;
const usernameHistory = [];

function getRandomItem(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

function getRandomNumber() {
  return Math.floor(Math.random() * 900) + 100;
}

function generateUsername() {
  const adjective = getRandomItem(ADJECTIVES);
  const noun = getRandomItem(NOUNS);
  const separator = optSeparator.checked ? separatorSelect.value : '';

  let username = adjective + separator + noun;

  if (optNumber.checked) {
    username += separator + getRandomNumber();
  }

  usernameOutput.value = username;
  copyMsg.textContent = '';
  addToHistory(username);
}

function addToHistory(username) {
  usernameHistory.unshift(username);

  if (usernameHistory.length > MAX_HISTORY) {
    usernameHistory.pop();
  }

  renderHistory();
}

function renderHistory() {
  historyList.innerHTML = '';

  usernameHistory.forEach(name => {
    const item = document.createElement('li');
    item.textContent = name;
    historyList.appendChild(item);
  });
}

generateBtn.addEventListener('click', generateUsername);

copyBtn.addEventListener('click', () => {
  if (!usernameOutput.value) {
    copyMsg.textContent = 'Nothing to copy yet.';
    return;
  }

  navigator.clipboard.writeText(usernameOutput.value)
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

generateUsername();