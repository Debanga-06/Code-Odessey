// API Configuration
const API_KEY = '34d97b0eb9b3475db728a01ccd196239'; 
const API_BASE_URL = 'https://newsapi.org/v2';

// State Management
let currentCategory = 'general';
let currentCountry = 'us';
let currentSortBy = 'publishedAt';
let currentSearchQuery = '';
let allArticles = [];

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const categoryBtns = document.querySelectorAll('.category-btn');
const countrySelect = document.getElementById('countrySelect');
const sortSelect = document.getElementById('sortSelect');
const loading = document.getElementById('loading');
const errorMessage = document.getElementById('errorMessage');
const errorText = document.getElementById('errorText');
const emptyState = document.getElementById('emptyState');
const articlesGrid = document.getElementById('articlesGrid');
const statsBar = document.getElementById('statsBar');
const articleCount = document.getElementById('articleCount');

// Initialize App
function init() {
  // Event Listeners
  searchBtn.addEventListener('click', handleSearch);
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
  });

  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currentCategory = btn.dataset.category;
      updateActiveCategory(btn);
      currentSearchQuery = '';
      searchInput.value = '';
      fetchTopHeadlines();
    });
  });

  countrySelect.addEventListener('change', (e) => {
    currentCountry = e.target.value;
    if (!currentSearchQuery) {
      fetchTopHeadlines();
    }
  });

  sortSelect.addEventListener('change', (e) => {
    currentSortBy = e.target.value;
    if (currentSearchQuery) {
      fetchEverything();
    } else {
      fetchTopHeadlines();
    }
  });

  // Load initial news
  fetchTopHeadlines();
}

// Update Active Category
function updateActiveCategory(activeBtn) {
  categoryBtns.forEach(btn => btn.classList.remove('active'));
  activeBtn.classList.add('active');
}

// Handle Search
function handleSearch() {
  const query = searchInput.value.trim();
  if (!query) {
    showError('Please enter a search term');
    return;
  }
  currentSearchQuery = query;
  fetchEverything();
}

// Fetch Top Headlines (Category/Country based)
async function fetchTopHeadlines() {
  showLoading();

  try {
    const url = `${API_BASE_URL}/top-headlines?country=${currentCountry}&category=${currentCategory}&pageSize=50&apiKey=${API_KEY}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Invalid API key. Please check your configuration.');
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else {
        throw new Error('Failed to fetch news. Please try again.');
      }
    }

    const data = await response.json();

    if (data.status === 'error') {
      throw new Error(data.message || 'API Error');
    }

    allArticles = data.articles || [];
    displayArticles(allArticles);
    
  } catch (error) {
    showError(error.message);
    console.error('Error fetching headlines:', error);
  }
}

// Fetch Everything (Search based)
async function fetchEverything() {
  showLoading();

  try {
    const url = `${API_BASE_URL}/everything?q=${encodeURIComponent(currentSearchQuery)}&sortBy=${currentSortBy}&pageSize=50&language=en&apiKey=${API_KEY}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Invalid API key. Please check your configuration.');
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else {
        throw new Error('Failed to fetch news. Please try again.');
      }
    }

    const data = await response.json();

    if (data.status === 'error') {
      throw new Error(data.message || 'API Error');
    }

    allArticles = data.articles || [];
    displayArticles(allArticles);
    
  } catch (error) {
    showError(error.message);
    console.error('Error fetching articles:', error);
  }
}

// Display Articles
function displayArticles(articles) {
  hideLoading();
  hideError();

  if (!articles || articles.length === 0) {
    showEmptyState();
    return;
  }

  hideEmptyState();
  statsBar.classList.remove('hidden');
  articleCount.textContent = articles.length;
  articlesGrid.innerHTML = '';

  articles.forEach(article => {
    const articleCard = createArticleCard(article);
    articlesGrid.appendChild(articleCard);
  });
}

// Create Article Card
function createArticleCard(article) {
  const card = document.createElement('div');
  card.className = 'article-card';
  card.onclick = () => window.open(article.url, '_blank');

  const imageHTML = article.urlToImage 
    ? `<img src="${article.urlToImage}" alt="${article.title}" class="article-image">`
    : `<div class="article-image placeholder">📰</div>`;

  const publishedDate = new Date(article.publishedAt);
  const timeAgo = getTimeAgo(publishedDate);
  const formattedDate = publishedDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  card.innerHTML = `
    ${imageHTML}
    <div class="article-content">
      <div class="article-meta">
        <span class="article-source">📡 ${article.source.name || 'Unknown'}</span>
        <span class="article-date">🕒 ${timeAgo}</span>
      </div>
      <h3 class="article-title">${article.title || 'No Title'}</h3>
      <p class="article-description">${article.description || 'No description available.'}</p>
      <div class="article-footer">
        <span class="article-author">${article.author ? `By ${article.author}` : 'Unknown Author'}</span>
        <button class="read-more" onclick="event.stopPropagation(); window.open('${article.url}', '_blank')">
          Read More →
        </button>
      </div>
    </div>
  `;

  return card;
}

// Get Time Ago
function getTimeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
    }
  }

  return 'Just now';
}

// UI State Management
function showLoading() {
  loading.classList.remove('hidden');
  errorMessage.classList.add('hidden');
  emptyState.classList.add('hidden');
  articlesGrid.innerHTML = '';
  statsBar.classList.add('hidden');
}

function hideLoading() {
  loading.classList.add('hidden');
}

function showError(message) {
  hideLoading();
  errorText.textContent = message;
  errorMessage.classList.remove('hidden');
  articlesGrid.innerHTML = '';
  statsBar.classList.add('hidden');
  emptyState.classList.add('hidden');
}

function hideError() {
  errorMessage.classList.add('hidden');
}

function showEmptyState() {
  emptyState.classList.remove('hidden');
  statsBar.classList.add('hidden');
}

function hideEmptyState() {
  emptyState.classList.add('hidden');
}

// Initialize on DOM Load
init();