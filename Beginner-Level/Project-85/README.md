# Random Joke Generator 😄

![Project Status](https://img.shields.io/badge/status-completed-success)
![Difficulty](https://img.shields.io/badge/difficulty-intermediate-orange)
![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![API](https://img.shields.io/badge/API-Official%20Joke%20API-yellow)

### Demo :- [Live Now](https://random-joke-generator-jade.vercel.app/)

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Learning Outcomes](#learning-outcomes)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Usage Guide](#usage-guide)
- [Code Walkthrough](#code-walkthrough)
- [Customization Guide](#customization-guide)
- [Browser Compatibility](#browser-compatibility)
- [Future Enhancements](#future-enhancements)

## 🎯 Overview

A joke generator that fetches a random setup/punchline pair from a free public API on each click, with a small local dataset as a fallback if the request fails (offline, API down, or blocked). Includes copy-to-clipboard and a favorites list for jokes worth keeping around.

## ✨ Features

- 🌐 **Live API jokes** — fetched fresh from the Official Joke API on every click
- 🛡️ **Local fallback** — if the fetch fails for any reason, a joke from a small built-in dataset is shown instead, so the app never dead-ends
- 🏷️ **Category tag** — shows the joke's type, and flags when a joke came from the offline backup
- 📋 **Copy to clipboard** — copies the current setup and punchline as plain text
- ⭐ **Favorites list** — save jokes you like, remove them individually, with a live count
- ⏳ **Loading state** — the button disables and relabels itself while a fetch is in progress

## 🎓 Learning Outcomes

This intermediate project teaches:

1. **async/await with fetch** — making an HTTP GET request and awaiting its JSON response
2. **try/catch/finally for network resilience** — catching a failed fetch (network error, non-OK status) and falling back gracefully instead of leaving the UI broken
3. **response.ok checking** — `fetch()` only rejects on network-level failures, not HTTP error statuses (404, 500), so `response.ok` must be checked manually and a matching error thrown
4. **Graceful degradation pattern** — the app remains fully usable even without a network connection, by falling back to a local dataset rather than showing a dead end
5. **Array.some for duplicate checking** — preventing the same joke from being saved to favorites twice
6. **Array.splice for removal by index** — removing a specific favorite from the array based on its position
7. **UI state management during async operations** — disabling the button and changing its label while a request is in flight, re-enabling once it settles (success or failure)

## 🛠️ Technologies Used

- **HTML5** — Semantic structure
- **CSS3** — Flat neon-themed UI
- **JavaScript ES6+** — `fetch`, `async`/`await`, Clipboard API, array methods

## 🔑 API Used

**Official Joke API** — a free, no-key-required public API.

  GET https://official-joke-api.appspot.com/random_joke

Returns a JSON object with `setup`, `punchline`, and `type` fields. No API key or rate-limit registration needed, which keeps this project's setup to zero configuration.

## 📁 Project Structure

```id="x32pl9"
joke-generator/
│
├── index.html      # Main structure
├── style.css       # Styling file
├── script.js       # JavaScript logic
├── README.md       # Documentation
```


## 💻 Usage Guide

1. Open `index.html` in a browser (requires an internet connection for live jokes; offline still works via the local fallback)
2. Click **Get New Joke** to fetch a fresh one
3. Click **Copy** to copy the current joke to your clipboard
4. Click **☆ Save this joke** to add it to your favorites list below
5. Click **×** next to any saved joke to remove it

## 🔍 Code Walkthrough

### Fetching with graceful fallback

```javascript
async function fetchJoke() {
  setLoadingState(true);

  try {
    const response = await fetch(JOKE_API_URL);
    if (!response.ok) throw new Error(`API responded with status ${response.status}`);

    const data = await response.json();
    displayJoke(data.setup, data.punchline, data.type, 'live');
  } catch (error) {
    const fallbackJoke = getRandomLocalJoke();
    displayJoke(fallbackJoke.setup, fallbackJoke.punchline, fallbackJoke.type, 'local');
  } finally {
    setLoadingState(false);
  }
}
```

`fetch()` only throws for genuine network failures — a 404 or 500 response still resolves successfully, just with an unhelpful body — so `response.ok` is checked explicitly and a matching error is thrown to route it into the `catch` block. Either path (success or failure) ends up calling `displayJoke()`, and `finally` guarantees the loading state is cleared regardless of which branch ran.

### Preventing duplicate favorites

```javascript
function saveFavorite() {
  const alreadySaved = favorites.some(fav => fav.setup === currentJoke.setup);
  if (alreadySaved) return;

  favorites.push({ ...currentJoke });
  renderFavorites();
}
```

`some()` checks whether *any* existing favorite matches the current joke's setup text, returning as soon as a match is found rather than scanning the whole array unnecessarily. The guard clause then blocks the save entirely if a duplicate is detected.

### Removing a specific favorite

```javascript
function removeFavorite(index) {
  favorites.splice(index, 1);
  renderFavorites();
}
```

Each remove button is wired up with its own item's index captured at render time, so `splice(index, 1)` removes exactly one element at that specific position without affecting the rest of the array.

## 🎨 Customization Guide

### Add category filtering

Fetch from the API's category-specific endpoints (e.g. `/jokes/programming/random`) based on a dropdown selection, falling back to filtering `LOCAL_JOKES` by `type` when offline.

### Persist favorites across sessions

Save the `favorites` array to `localStorage` after every change, and load it back in on page start.

### Add a "joke of the day" mode

Use the current date as a seed to deterministically pick the same joke for everyone on a given day, rather than a fully random one each click.

## 🌐 Browser Compatibility

- ✅ Chrome, Firefox, Safari, Edge — all modern versions
- **Required Features:** `fetch`, `async`/`await`, Clipboard API (requires HTTPS or localhost)

## 🚀 Future Enhancements

- [ ] Category filtering (programming, general, knock-knock, etc.)
- [ ] Persisted favorites via localStorage
- [ ] Share joke as an image (canvas-generated card)
- [ ] "Joke of the day" deterministic mode
- [ ] Rating system (👍/👎) to track which jokes land best

---

**Part of the Code Odysseys Project Series** 🚀