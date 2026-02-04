# News App - API Integration 📰

![Project Status](https://img.shields.io/badge/status-completed-success)
![Difficulty](https://img.shields.io/badge/difficulty-intermediate-orange)
![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![API](https://img.shields.io/badge/API-NewsAPI-orange)

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Learning Outcomes](#learning-outcomes)
- [Technologies Used](#technologies-used)
- [API Setup](#api-setup)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage Guide](#usage-guide)
- [API Endpoints](#api-endpoints)
- [Code Architecture](#code-architecture)
- [Filtering System](#filtering-system)
- [Error Handling](#error-handling)
- [Customization Guide](#customization-guide)
- [Deployment](#deployment)
- [Browser Compatibility](#browser-compatibility)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

A **professional news aggregator application** that demonstrates advanced API integration, dynamic filtering, search functionality, and real-time data display. Built with NewsAPI, this intermediate-level project features category filtering, country selection, sorting options, and a responsive card-based layout. Perfect for learning how to build data-driven applications with external APIs.

**Live Demo:** [View Project](#) *(Add your live demo link)*

## ✨ Features

### Core Functionality
- 📰 **Live News Feed** - Real-time articles from NewsAPI
- 🔍 **Keyword Search** - Search articles by any keyword
- 🏷️ **7 Category Filters** - General, Business, Tech, Sports, etc.
- 🌍 **10 Country Options** - US, UK, Canada, India, and more
- 📊 **3 Sorting Methods** - Latest, Most Relevant, Most Popular
- 📱 **Responsive Grid** - Adapts from 3 columns to 1 on mobile
- ⏱️ **Time Ago Display** - "2 hours ago" format for publish times
- 🖼️ **Article Images** - Featured images with fallback placeholders

### Technical Features
- ⚡ **Async/Await** - Modern promise handling
- 🔄 **Dynamic Filtering** - Multiple filter combinations
- 🛡️ **Error Handling** - Specific messages for different errors
- 💾 **State Management** - Tracks search, category, country, sort
- 🎯 **UI States** - Loading, Error, Empty, Success
- 📦 **Data Transformation** - Time formatting, string truncation
- 🔗 **External Links** - Opens articles in new tab
- ♿ **Accessible** - Semantic HTML, keyboard navigation

## 🎓 Learning Outcomes

This project teaches:

1. **NewsAPI Integration** - Working with a real news API
2. **Multiple Endpoints** - Top headlines vs. everything search
3. **Query Parameters** - Building URLs with filters
4. **State Management** - Tracking multiple filter states
5. **Dynamic UI Updates** - Rendering cards from JSON data
6. **Array Methods** - map, filter, forEach for data processing
7. **Event Delegation** - Handling multiple similar elements
8. **Date Manipulation** - Formatting timestamps, time ago
9. **Error Recovery** - Graceful handling of API failures
10. **Search Functionality** - Implementing keyword search
11. **Filtering Logic** - Multiple simultaneous filters
12. **API Rate Limits** - Understanding and handling limits
13. **External Links** - window.open() best practices
14. **Responsive Cards** - CSS Grid auto-fit patterns

## 🛠️ Technologies Used

- **HTML5** - Semantic structure
- **CSS3** - Grid, Flexbox, modern styling
- **JavaScript ES6+** - Async/await, template literals, arrow functions
- **NewsAPI** - News data provider
- **Fetch API** - HTTP requests

## 🔑 API Setup

### Step 1: Get Your Free API Key

1. Visit [newsapi.org](https://newsapi.org/)
2. Click **"Get API Key"**
3. Sign up (100% free - 100 requests/day on free tier)
4. Verify your email
5. Copy your API key from the dashboard

### Step 2: Add API Key to Project

Open `index.html` and replace:

```javascript
const API_KEY = 'YOUR_API_KEY_HERE';
```

With your actual key:

```javascript
const API_KEY = 'abc123def456ghi789jkl012mno345pqr';
```

### Step 3: Test

Open `index.html` in browser → Articles should load!

⚠️ **Free Tier Limits:**
- 100 requests per day
- Cannot fetch articles older than 1 month
- Developer plan only (no production use)

## 📁 Project Structure

```
News-App/
│
├── index.html          # Complete news app
└── README.md           # Documentation
```

## 🚀 Installation

```bash
# Clone repository
git clone https://github.com/Debanga-06/Code-Odessey.git
cd Code-Odessey/News-App

# Add your API key to index.html

# Open in browser
open index.html
```

Or use a local server:

```bash
# Python
python -m http.server 8000

# Node.js
npx http-server
```

## 💻 Usage Guide

### Browsing by Category

1. Click any **category button** (General, Business, Tech, etc.)
2. Articles refresh automatically
3. Active category highlighted in red

### Searching by Keyword

1. Type keyword in **search box** (e.g., "Bitcoin", "AI", "Climate")
2. Press **Enter** or click **Search**
3. Results appear within 1-2 seconds

### Changing Country

1. Click **country dropdown**
2. Select any country
3. Articles update to that country's news

### Sorting Results

1. Click **Sort by** dropdown
2. Choose:
   - **Latest First** - Most recent articles
   - **Most Relevant** - Best match for search
   - **Most Popular** - Highest engagement

### Reading Articles

1. **Click anywhere on card** → Opens article in new tab
2. Or click **"Read More →"** button

## 🔗 API Endpoints

### 1. Top Headlines

Used when **browsing categories** or **changing countries**.

```
GET https://newsapi.org/v2/top-headlines
```

**Parameters:**
- `country` - Two-letter country code (us, gb, in, etc.)
- `category` - News category (business, tech, sports, etc.)
- `pageSize` - Number of articles (max 100)
- `apiKey` - Your API key

**Example:**
```javascript
const url = `https://newsapi.org/v2/top-headlines?country=us&category=technology&pageSize=50&apiKey=${API_KEY}`;
```

### 2. Everything (Search)

Used when **searching by keyword**.

```
GET https://newsapi.org/v2/everything
```

**Parameters:**
- `q` - Search keyword
- `sortBy` - relevancy, popularity, or publishedAt
- `language` - en (English)
- `pageSize` - Number of articles
- `apiKey` - Your API key

**Example:**
```javascript
const url = `https://newsapi.org/v2/everything?q=bitcoin&sortBy=publishedAt&language=en&pageSize=50&apiKey=${API_KEY}`;
```

## 🏗️ Code Architecture

### State Management

```javascript
let currentCategory = 'general';
let currentCountry = 'us';
let currentSortBy = 'publishedAt';
let currentSearchQuery = '';
let allArticles = [];
```

### Fetch Flow

```
User Action (Category/Search/Country)
    ↓
Update State Variables
    ↓
Show Loading Spinner
    ↓
Fetch from Correct Endpoint (headlines or everything)
    ↓
Check Response Status
    ↓
Parse JSON
    ↓
Store in allArticles Array
    ↓
Display Cards
    ↓
Hide Loading
```

### Core Functions

**fetchTopHeadlines()** - Gets news by category + country
```javascript
async function fetchTopHeadlines() {
  showLoading();
  try {
    const url = `${API_BASE_URL}/top-headlines?country=${currentCountry}&category=${currentCategory}&pageSize=50&apiKey=${API_KEY}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch');
    }
    
    const data = await response.json();
    allArticles = data.articles || [];
    displayArticles(allArticles);
  } catch (error) {
    showError(error.message);
  }
}
```

**fetchEverything()** - Gets news by search keyword
```javascript
async function fetchEverything() {
  showLoading();
  try {
    const url = `${API_BASE_URL}/everything?q=${encodeURIComponent(currentSearchQuery)}&sortBy=${currentSortBy}&pageSize=50&language=en&apiKey=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    allArticles = data.articles || [];
    displayArticles(allArticles);
  } catch (error) {
    showError(error.message);
  }
}
```

**displayArticles()** - Renders cards from array
```javascript
function displayArticles(articles) {
  articlesGrid.innerHTML = '';
  
  articles.forEach(article => {
    const card = createArticleCard(article);
    articlesGrid.appendChild(card);
  });
}
```

**createArticleCard()** - Builds HTML for one card
```javascript
function createArticleCard(article) {
  const card = document.createElement('div');
  card.className = 'article-card';
  card.onclick = () => window.open(article.url, '_blank');
  
  card.innerHTML = `
    <img src="${article.urlToImage}" alt="${article.title}">
    <h3>${article.title}</h3>
    <p>${article.description}</p>
    <button>Read More</button>
  `;
  
  return card;
}
```

## 🔍 Filtering System

### How Multiple Filters Work

1. **Category Click** → Sets `currentCategory` → Calls `fetchTopHeadlines()`
2. **Country Change** → Sets `currentCountry` → Calls `fetchTopHeadlines()`
3. **Search** → Sets `currentSearchQuery` → Calls `fetchEverything()`
4. **Sort Change** → Sets `currentSortBy` → Re-fetches with new sort

### Filter Priority

- **Search overrides category** - When searching, category filter ignored
- **Country + Category** - Work together for top headlines
- **Sort applies to both** - Works with headlines and search

### Example Combinations

```javascript
// US Tech News, Latest First
country: 'us'
category: 'technology'
sortBy: 'publishedAt'

// Search "AI" globally, Most Relevant
searchQuery: 'AI'
sortBy: 'relevancy'
```

## 🛡️ Error Handling

### Error Types

| Error | Status | User Message |
|---|---|---|
| Invalid API Key | 401 | "Invalid API key. Check configuration." |
| Rate Limit | 429 | "Rate limit exceeded. Try again later." |
| Network Error | — | "Failed to fetch news. Please try again." |
| No Results | 200 | "No Articles Found" (empty state) |

### Error Handling Pattern

```javascript
try {
  const response = await fetch(url);
  
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Invalid API key');
    } else if (response.status === 429) {
      throw new Error('Rate limit exceeded');
    } else {
      throw new Error('Failed to fetch news');
    }
  }
  
  const data = await response.json();
  
  if (data.status === 'error') {
    throw new Error(data.message);
  }
  
  // Process data...
  
} catch (error) {
  showError(error.message);
  console.error('Technical error:', error);
}
```

## 🎨 Customization Guide

### Add More Categories

```javascript
// In HTML, add button:
<button class="category-btn" data-category="politics">Politics</button>

// JavaScript handles it automatically via event delegation
```

### Add More Countries

```javascript
<select class="country-select">
  <option value="es">🇪🇸 Spain</option>
  <option value="it">🇮🇹 Italy</option>
  <!-- Add any country code -->
</select>
```

### Change Articles Per Page

```javascript
const url = `${API_BASE_URL}/top-headlines?pageSize=100&...`;
// Max 100 on free tier
```

### Change Color Theme

```css
:root {
  --bg-primary: #0a0e13;      /* Page background */
  --accent: #ff6b6b;          /* Accent color */
  --text-primary: #f8fafc;    /* Main text */
}
```

### Add Image Lazy Loading

```javascript
const imageHTML = article.urlToImage 
  ? `<img src="${article.urlToImage}" loading="lazy" alt="${article.title}">`
  : `<div class="placeholder">📰</div>`;
```

## 🚀 Deployment

### Deploy to Vercel

1. **Add API key** to code (or use environment variable)
2. **Push to GitHub**
3. **Import in Vercel** → Deploy
4. Done!

### Security Best Practice

**Don't expose API key in public repos!**

**Option 1:** Add to `.gitignore`
```bash
# .gitignore
config.js
```

**Option 2:** Use environment variables (requires backend)

**Option 3:** Implement backend proxy
```javascript
// Instead of:
fetch(`https://newsapi.org/v2/...?apiKey=${API_KEY}`)

// Use:
fetch('/api/news') // Your backend adds the key
```

## 🌐 Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Opera 47+

## 🚀 Future Enhancements

- [ ] Add pagination (load more articles)
- [ ] Implement infinite scroll
- [ ] Add bookmarks / favorites (localStorage)
- [ ] Add reading list
- [ ] Show trending topics
- [ ] Add date range filter
- [ ] Implement full-text article view
- [ ] Add share buttons (Twitter, Facebook)
- [ ] Show related articles
- [ ] Add dark/light theme toggle
- [ ] Implement news sources filter
- [ ] Add article sentiment analysis
- [ ] Show breaking news notifications
- [ ] Add email newsletter subscription
- [ ] Implement PWA (offline reading)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make improvements
4. Test thoroughly
5. Commit and push
6. Open Pull Request

Please read [CONTRIBUTING.md](../../CONTRIBUTING.md) for guidelines.

## 📝 License

This project is licensed under the MIT License — see [LICENSE](../../LICENSE) file.

---

## 📚 Related Projects

- [Weather App API](../Weather-App/)
- [Project 027 - Mobile Responsive Page](../Project-27/)

## 🎓 Learning Resources

- [NewsAPI Documentation](https://newsapi.org/docs)
- [MDN - Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [JavaScript.info - Async](https://javascript.info/async)
- [CSS-Tricks - Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)

## 📞 Contact

**DEBANGA** — [@Debanga-06](https://github.com/Debanga-06)

Project Link: [https://github.com/Debanga-06/Code-Odessey](https://github.com/Debanga-06/Code-Odessey)

---

**Part of the [Code-Odessey](https://github.com/Debanga-06/Code-Odessey) Project Series** 🚀

*Intermediate-level project demonstrating API integration, filtering, and data display*

**Happy Coding!** 📰✨