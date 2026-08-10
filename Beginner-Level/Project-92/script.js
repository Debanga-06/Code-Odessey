const searchInput = document.getElementById('searchInput');
const clearBtn = document.getElementById('clearBtn');
const suggestionsList = document.getElementById('suggestionsList');
const historyChips = document.getElementById('historyChips');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');

const DATA_SOURCE = [
  'India', 'Indonesia', 'Ireland', 'Italy', 'Iceland',
  'Japan', 'Jamaica', 'Jordan',
  'Kenya', 'Kazakhstan',
  'London', 'Los Angeles', 'Lagos', 'Lisbon',
  'Mumbai', 'Madrid', 'Manila', 'Melbourne',
  'New York', 'Nairobi', 'Nagoya',
  'Hindi', 'Spanish', 'Japanese', 'Italian', 'Indonesian',
  'JavaScript', 'Java', 'Julia'
];

const MAX_SUGGESTIONS = 6;
const MAX_HISTORY = 6;

let searchHistory = [];
let highlightedIndex = -1;
let currentMatches = [];

function getMatches(query) {
  const lowerQuery = query.toLowerCase();
  return DATA_SOURCE.filter(item => item.toLowerCase().includes(lowerQuery)).slice(0, MAX_SUGGESTIONS);
}

function highlightMatch(text, query) {
  const index = text.toLowerCase().indexOf(query.toLowerCase());
  if (index === -1) return text;

  const before = text.slice(0, index);
  const match = text.slice(index, index + query.length);
  const after = text.slice(index + query.length);

  return `${before}<mark>${match}</mark>${after}`;
}

function renderSuggestions(query) {
  currentMatches = getMatches(query);
  highlightedIndex = -1;
  suggestionsList.innerHTML = '';

  if (currentMatches.length === 0) {
    const emptyItem = document.createElement('li');
    emptyItem.classList.add('suggestion-empty');
    emptyItem.textContent = 'No matches found';
    suggestionsList.appendChild(emptyItem);
    suggestionsList.classList.remove('hidden');
    return;
  }

  currentMatches.forEach((match, index) => {
    const item = document.createElement('li');
    item.classList.add('suggestion-item');
    item.dataset.index = index;
    item.innerHTML = highlightMatch(match, query);

    item.addEventListener('click', () => selectSuggestion(match));
    suggestionsList.appendChild(item);
  });

  suggestionsList.classList.remove('hidden');
}

function selectSuggestion(value) {
  searchInput.value = value;
  suggestionsList.classList.add('hidden');
  clearBtn.classList.remove('hidden');
  addToHistory(value);
}

function handleInput() {
  const query = searchInput.value.trim();

  clearBtn.classList.toggle('hidden', query.length === 0);

  if (query.length === 0) {
    suggestionsList.classList.add('hidden');
    return;
  }

  renderSuggestions(query);
}

function handleKeydown(event) {
  const items = document.querySelectorAll('.suggestion-item');
  if (items.length === 0) return;

  if (event.key === 'ArrowDown') {
    event.preventDefault();
    highlightedIndex = (highlightedIndex + 1) % items.length;
    updateHighlight(items);
  } else if (event.key === 'ArrowUp') {
    event.preventDefault();
    highlightedIndex = (highlightedIndex - 1 + items.length) % items.length;
    updateHighlight(items);
  } else if (event.key === 'Enter') {
    if (highlightedIndex >= 0 && currentMatches[highlightedIndex]) {
      selectSuggestion(currentMatches[highlightedIndex]);
    } else if (searchInput.value.trim().length > 0) {
      addToHistory(searchInput.value.trim());
      suggestionsList.classList.add('hidden');
    }
  } else if (event.key === 'Escape') {
    suggestionsList.classList.add('hidden');
  }
}

function updateHighlight(items) {
  items.forEach((item, index) => {
    item.classList.toggle('highlighted', index === highlightedIndex);
  });
}

function clearSearch() {
  searchInput.value = '';
  clearBtn.classList.add('hidden');
  suggestionsList.classList.add('hidden');
  searchInput.focus();
}

function addToHistory(term) {
  searchHistory = searchHistory.filter(item => item.toLowerCase() !== term.toLowerCase());
  searchHistory.unshift(term);

  if (searchHistory.length > MAX_HISTORY) {
    searchHistory.pop();
  }

  renderHistory();
}

function renderHistory() {
  historyChips.innerHTML = '';

  if (searchHistory.length === 0) {
    const emptyMsg = document.createElement('p');
    emptyMsg.classList.add('history-empty');
    emptyMsg.textContent = 'No recent searches yet';
    historyChips.appendChild(emptyMsg);
    return;
  }

  searchHistory.forEach(term => {
    const chip = document.createElement('button');
    chip.classList.add('history-chip');
    chip.textContent = term;
    chip.addEventListener('click', () => {
      searchInput.value = term;
      clearBtn.classList.remove('hidden');
      renderSuggestions(term);
    });
    historyChips.appendChild(chip);
  });
}

function clearHistory() {
  searchHistory = [];
  renderHistory();
}

document.addEventListener('click', (event) => {
  if (!event.target.closest('.search-wrapper')) {
    suggestionsList.classList.add('hidden');
  }
});

searchInput.addEventListener('input', handleInput);
searchInput.addEventListener('keydown', handleKeydown);
clearBtn.addEventListener('click', clearSearch);
clearHistoryBtn.addEventListener('click', clearHistory);

renderHistory();