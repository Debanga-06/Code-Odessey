const jokeText = document.getElementById('jokeText');
const jokeDelivery = document.getElementById('jokeDelivery');
const categoryTag = document.getElementById('categoryTag');
const newJokeBtn = document.getElementById('newJokeBtn');
const copyBtn = document.getElementById('copyBtn');
const saveBtn = document.getElementById('saveBtn');
const favCount = document.getElementById('favCount');
const favoritesList = document.getElementById('favoritesList');

const JOKE_API_URL = 'https://official-joke-api.appspot.com/random_joke';

const LOCAL_JOKES = [
  { setup: 'Why do programmers prefer dark mode?', punchline: 'Because light attracts bugs.', type: 'programming' },
  { setup: 'Why did the developer go broke?', punchline: 'Because they used up all their cache.', type: 'programming' },
  { setup: 'How many programmers does it take to change a light bulb?', punchline: "None, that's a hardware problem.", type: 'programming' },
  { setup: 'Why do Java developers wear glasses?', punchline: "Because they don't C#.", type: 'programming' },
  { setup: 'What do you call a fish with no eyes?', punchline: 'A fsh.', type: 'general' },
  { setup: 'Why did the scarecrow win an award?', punchline: 'Because he was outstanding in his field.', type: 'general' }
];

let currentJoke = null;
let favorites = [];

async function fetchJoke() {
  setLoadingState(true);

  try {
    const response = await fetch(JOKE_API_URL);

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }

    const data = await response.json();
    displayJoke(data.setup, data.punchline, data.type, 'live');
  } catch (error) {
    const fallbackJoke = getRandomLocalJoke();
    displayJoke(fallbackJoke.setup, fallbackJoke.punchline, fallbackJoke.type, 'local');
  } finally {
    setLoadingState(false);
  }
}

function getRandomLocalJoke() {
  const randomIndex = Math.floor(Math.random() * LOCAL_JOKES.length);
  return LOCAL_JOKES[randomIndex];
}

function displayJoke(setup, punchline, type, source) {
  currentJoke = { setup, punchline, type };

  jokeText.textContent = setup;
  jokeDelivery.textContent = punchline;
  jokeDelivery.classList.remove('hidden');

  categoryTag.textContent = source === 'local' ? `${type} (offline)` : type;
}

function setLoadingState(isLoading) {
  newJokeBtn.disabled = isLoading;
  newJokeBtn.textContent = isLoading ? 'Fetching...' : 'Get New Joke';
}

function copyJoke() {
  if (!currentJoke) return;

  const text = `${currentJoke.setup}\n${currentJoke.punchline}`;

  navigator.clipboard.writeText(text)
    .then(() => {
      copyBtn.textContent = 'Copied!';
      setTimeout(() => { copyBtn.textContent = 'Copy'; }, 1500);
    })
    .catch(() => {
      copyBtn.textContent = 'Failed';
      setTimeout(() => { copyBtn.textContent = 'Copy'; }, 1500);
    });
}

function saveFavorite() {
  if (!currentJoke) return;

  const alreadySaved = favorites.some(fav => fav.setup === currentJoke.setup);
  if (alreadySaved) return;

  favorites.push({ ...currentJoke });
  renderFavorites();
}

function removeFavorite(index) {
  favorites.splice(index, 1);
  renderFavorites();
}

function renderFavorites() {
  favCount.textContent = favorites.length;
  favoritesList.innerHTML = '';

  if (favorites.length === 0) {
    favoritesList.innerHTML = '<li class="favorites-empty">No saved jokes yet</li>';
    return;
  }

  favorites.forEach((fav, index) => {
    const item = document.createElement('li');
    item.classList.add('favorite-item');

    item.innerHTML = `
      <span class="favorite-item-text">${fav.setup} — ${fav.punchline}</span>
      <button class="remove-fav-btn" aria-label="Remove">×</button>
    `;

    item.querySelector('.remove-fav-btn').addEventListener('click', () => removeFavorite(index));
    favoritesList.appendChild(item);
  });
}

newJokeBtn.addEventListener('click', fetchJoke);
copyBtn.addEventListener('click', copyJoke);
saveBtn.addEventListener('click', saveFavorite);

renderFavorites();