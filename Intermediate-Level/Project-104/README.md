# Movie Search App - API Integration 🎬

![Project Status](https://img.shields.io/badge/status-completed-success)
![Difficulty](https://img.shields.io/badge/difficulty-intermediate-orange)
![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![API](https://img.shields.io/badge/API-OMDb-yellow)

**Live Demo:** *(https://movie-search-app-roan-seven.vercel.app/)*

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Learning Outcomes](#learning-outcomes)
- [Technologies Used](#technologies-used)
- [API Setup](#api-setup)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage Guide](#usage-guide)
- [API Integration Details](#api-integration-details)
- [Code Walkthrough](#code-walkthrough)
- [Error Handling](#error-handling)
- [Customization Guide](#customization-guide)
- [Deployment](#deployment)
- [Browser Compatibility](#browser-compatibility)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

A **production-ready movie search application** that demonstrates professional API integration, async/await patterns, request cancellation, and real-time search UX. This intermediate-level project fetches live data from the OMDb API, letting users search movies and series by title, filter by type and year, page through results, and view full details in a modal. Features debounced live search, three switchable themes, and a polished, responsive UI.


## ✨ Features

### Core Functionality
- 🔍 **Title Search** - Search movies, series, and episodes by title
- 🎚️ **Filters** - Narrow results by type (movie/series/episode) and release year
- 📄 **Pagination** - Page through results 10 at a time, matching OMDb's response format
- 🖼️ **Details Modal** - Click any result for full plot, cast, ratings, and box office info
- ⭐ **Multi-Source Ratings** - IMDb, Rotten Tomatoes, and Metacritic scores where available
- 🎨 **Theme Switcher** - Dark, light, and retro themes, persisted across visits

### Technical Features
- ⚡ **Async/Await** - Modern asynchronous JavaScript patterns
- ⏱️ **Debounced Input** - Live search without hammering the API on every keystroke
- 🛑 **Request Cancellation** - `AbortController` cancels stale requests so slow responses can't overwrite newer ones
- 🛡️ **Error Handling** - Handles OMDb's "200 OK but Response: False" quirk explicitly
- 🔑 **Gitignored API Key** - Key lives in a separate, gitignored config file
- 📱 **Responsive Design** - Grid layout adapts from mobile to desktop
- 🎯 **Loading States** - Skeleton cards while a search is in flight
- 🖱️ **Event Delegation** - One click listener handles every result card, including cards added after page load

## 🎓 Learning Outcomes

This intermediate project teaches:

1. **Fetch API** - Making HTTP requests to external APIs
2. **Async/Await** - Modern asynchronous JavaScript syntax
3. **Debouncing** - Delaying execution until input activity pauses, using closures
4. **AbortController** - Cancelling in-flight fetch requests
5. **Event Delegation** - Handling events on dynamically rendered elements
6. **API Keys** - Secure API key handling with a gitignored config file
7. **JSON Parsing** - Working with nested JSON data structures
8. **Error Handling** - Try-catch blocks plus API-specific error conventions
9. **URLSearchParams** - Building query strings safely and readably
10. **Pagination Logic** - Deriving page counts from an API's `totalResults`
11. **State Management** - Managing UI states (idle, loading, results, error)
12. **localStorage** - Persisting a UI preference (theme) across sessions
13. **CSS Custom Properties** - Building a multi-theme system without duplicating styles

## 🛠️ Technologies Used

- **HTML5** - Semantic markup structure
- **CSS3** - Custom properties for theming, CSS Grid for layout
- **JavaScript ES6+** - Async/await, fetch API, arrow functions, destructuring
- **OMDb API** - Movie and series data provider

## 🔑 API Setup

### Step 1: Get Your API Key

1. Go to [OMDb API](https://www.omdbapi.com/apikey.aspx)
2. Select the **Free** tier and enter your email
3. Check your inbox and click the activation link
4. Your key arrives by email (looks like: `a1b2c3d4`)

### Step 2: Add API Key to Project

Copy the example config file:

```bash
cp config.example.js config.js
```

Open `config.js` and replace the placeholder:

```javascript
const OMDB_API_KEY = "YOUR_API_KEY_HERE"; // Replace this
```

With your actual key:

```javascript
const OMDB_API_KEY = "a1b2c3d4"; // Your real key
```

### Step 3: Test the App

1. Open `index.html` in your browser
2. Search for a movie title
3. Results should appear within a second or two!

⚠️ **Important:** `config.js` is listed in `.gitignore` so it won't be committed. Only `config.example.js` (with a placeholder) goes into version control. See [Security Best Practices](#security-best-practices) below.

## 📁 Project Structure

```
Movie-Search-App/
│
├── index.html           # Markup
├── style.css             # CSS-variable-based theming, grid, modal
├── script.js              # API calls, state, rendering, events
├── config.js              # Your real API key (gitignored)
├── config.example.js      # Placeholder key, committed to git
├── .gitignore
└── README.md              # This file
```

## 🚀 Installation

### Method 1: Direct Download

1. **Download the files**
   ```bash
   git clone https://github.com/your-username/Code-Odysseys.git
   cd Code-Odysseys/Movie-Search-App
   ```

2. **Add your API key** (see [API Setup](#api-setup))

3. **Open in browser**
   ```bash
   open index.html
   ```

### Method 2: Local Server (Recommended)

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000`

## 💻 Usage Guide

### Searching for a Movie

1. Type a title into the search box
2. Results update automatically after you pause typing (debounced), or press **Enter**/click **Search**
3. Results load within 1-2 seconds

**Supported input:**
- Partial titles: `bat` returns `Batman`, `Batman Begins`, etc.
- Full titles: `Inception`
- Series titles: `Breaking Bad`

### Filtering Results

- **Type** - restrict to movies, series, or episodes
- **Year** - restrict to a specific release year

Changing either filter re-runs the current search automatically.

### Viewing Details

1. Click any result card
2. A modal opens with the full plot, genre, director, cast, and available ratings
3. Close with the **×** button, by clicking outside the modal, or pressing **Esc**

### Paginating

Use **← Prev** / **Next →** below the results grid to move through additional pages (OMDb returns 10 results per page).

## 🔗 API Integration Details

### Endpoints Used

#### 1. Search
```
GET https://www.omdbapi.com/?apikey={key}&s={title}&page={n}&type={type}&y={year}
```

**Parameters:**
- `s` - Search term (title, can be partial)
- `page` - Page number (10 results per page)
- `type` - Optional: `movie`, `series`, or `episode`
- `y` - Optional: release year
- `apikey` - Your API key

**Response Example:**
```json
{
  "Search": [
    {
      "Title": "Inception",
      "Year": "2010",
      "imdbID": "tt1375666",
      "Type": "movie",
      "Poster": "https://..."
    }
  ],
  "totalResults": "1",
  "Response": "True"
}
```

#### 2. Details by ID
```
GET https://www.omdbapi.com/?apikey={key}&i={imdbID}&plot=full
```

**Parameters:**
- `i` - IMDb ID (from a search result's `imdbID`)
- `plot` - `short` or `full`
- `apikey` - Your API key

**Response:** A single object with `Plot`, `Genre`, `Director`, `Actors`, `Ratings` (array of source/value pairs), `BoxOffice`, and more.

### API Call Flow

```
User types / submits → Debounce timer starts
        ↓
Timer elapses → Cancel any in-flight search request
        ↓
Fetch search results (title + filters + page)
        ↓
Render result cards + pagination
        ↓
User clicks a card → Fetch full details by imdbID
        ↓
Render details modal
```

## 🔍 Code Walkthrough

### 1. Debounced Search

```javascript
function debounce(fn, delay = 400) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

const debouncedSearch = debounce(() => {
  state.query = searchInput.value.trim();
  state.page = 1;
  runSearch();
}, 450);

searchInput.addEventListener("input", debouncedSearch);
```

### 2. Fetch With Request Cancellation

```javascript
async function searchMovies({ query, type, year, page }) {
  // Cancel any request still in flight so an old, slow response
  // can't overwrite the results of a newer search.
  if (activeController) activeController.abort();
  activeController = new AbortController();

  const params = new URLSearchParams({ apikey: OMDB_API_KEY, s: query, page });
  if (type) params.set("type", type);
  if (year) params.set("y", year);

  const response = await fetch(`${OMDB_BASE_URL}?${params}`, {
    signal: activeController.signal,
  });

  if (!response.ok) throw new Error(`Network error: ${response.status}`);
  return response.json(); // OMDb still returns 200 even on "Movie not found"
}
```

### 3. Handling OMDb's Error Convention

```javascript
const data = await searchMovies(state);

if (data.Response === "False") {
  // OMDb returns HTTP 200 even when the search fails —
  // the real success/failure signal is this field.
  setStatus(data.Error || "No results found.", true);
  return;
}
```

### 4. Event Delegation for Result Cards

```javascript
// One listener on the grid handles clicks on any card,
// including cards added after this listener was set up.
resultsGrid.addEventListener("click", (event) => {
  const card = event.target.closest(".movie-card");
  if (!card) return;
  openMovieModal(card.dataset.id);
});
```

## 🛡️ Error Handling

### Error Types & Messages

| Error | User Message | Technical Cause |
|---|---|---|
| `Response: "False"` | "Movie not found!" (or OMDb's message) | No results for that title/filter combo |
| 401 | Search silently fails / details modal errors | Missing or invalid API key |
| `AbortError` | (no message shown) | A newer search superseded this one — expected, not a real error |
| Network failure | "Something went wrong. Please try again." | No internet / API down |
| Missing key | "Add your OMDb API key in config.js to enable search." | `config.js` not set up yet |

### Error State UI

```javascript
function setStatus(message, isError = false) {
  statusMessage.textContent = message;
  statusMessage.classList.toggle("error", isError);
}
```

## 🎨 Customization Guide

### Add a Favorites List

Store favorited `imdbID`s in `localStorage`, and check membership when rendering cards:

```javascript
function toggleFavorite(imdbID) {
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  const updated = favorites.includes(imdbID)
    ? favorites.filter((id) => id !== imdbID)
    : [...favorites, imdbID];
  localStorage.setItem("favorites", JSON.stringify(updated));
}
```

### Add More Detail Fields

The details endpoint returns additional fields you can surface in the modal:

```javascript
movie.Awards       // e.g. "Won 4 Oscars"
movie.Country      // Production country
movie.Production   // Studio
movie.DVD          // DVD release date
movie.Website      // Official site, if any
```

### Change Color Theme

Add a new theme block in `style.css` and a matching button in `index.html`:

```css
body[data-theme="ocean"] {
  --bg: #06202c;
  --bg-elevated: #0d3446;
  --text: #dff6ff;
  --accent: #2ec4b6;
  --accent-text: #06202c;
  --border: #144a5e;
}
```

### Swap in a Second Data Source

TMDb can be added alongside OMDb as an alternate provider — add a `SOURCE` toggle in state and branch the fetch/render functions per source.

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub** (with `config.js` gitignored — see below)

2. **Import in Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your repository
   - Click "Deploy"

3. Since `config.js` is gitignored, either commit a version with your key for a personal demo deploy, or wire the key in via a build step / serverless function for anything public-facing.

### Security Best Practices

⚠️ **Never commit `config.js` with a real key to a public repo!**

**Option 1: Gitignored Config File (used in this project)**

`config.js` holds the real key and is excluded via `.gitignore`; `config.example.js` shows the expected shape and is the only version committed.

**Option 2: Serverless Function**

Move OMDb calls to a backend/serverless function that stores the key as a server-side environment variable, so it's never sent to the browser at all.

**Option 3: API Key Restrictions**

OMDb's free tier doesn't support domain restrictions, so for a public deployment, a backend proxy (Option 2) is the more robust choice.

## 🌐 Browser Compatibility

- ✅ Chrome 66+
- ✅ Firefox 57+
- ✅ Safari 12.1+
- ✅ Edge 79+
- ✅ Opera 53+

**Required Features:**
- Fetch API
- Async/Await
- AbortController
- ES6+ JavaScript

## 🚀 Future Enhancements

- [ ] Favorites list saved to localStorage
- [ ] Search history dropdown
- [ ] Sort results by year or rating client-side
- [ ] Swap in TMDb as a second, user-selectable data source
- [ ] Autocomplete suggestions while typing
- [ ] "Similar titles" section in the details modal
- [ ] Keyboard navigation through result cards
- [ ] PWA support (offline-cached recent searches)
- [ ] Light/dark auto-detection via `prefers-color-scheme`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Commit and push
6. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

---

## 🎓 Learning Resources

- [OMDb API Documentation](https://www.omdbapi.com/)
- [MDN - Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [MDN - Async/Await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [MDN - AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
- [JavaScript.info - Async](https://javascript.info/async)

---

**Part of the Code Odysseys Project Series** 🚀

*Intermediate-level project demonstrating professional API integration*

**Happy Coding!** 🎬✨