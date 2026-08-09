# Random User Generator - API Integration 🎲

![Project Status](https://img.shields.io/badge/status-completed-success)
![Difficulty](https://img.shields.io/badge/difficulty-intermediate-orange)
![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![API](https://img.shields.io/badge/API-randomuser.me-blueviolet)

### Live Demo: [Live Site](https://user-generator-rust.vercel.app/)

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

A **production-ready random profile generator** that pulls realistic (but fake) user data from
[randomuser.me](https://randomuser.me/) — photos, names, addresses, contact info, and more —
and displays them as a browsable card grid. The standout feature is **seed-based
reproducibility**: every generated batch can be turned into a shareable link that regenerates
the exact same set of users for anyone who opens it, using the seed the API itself returns.

**Live Demo:** *(add your deployed link here once hosted)*

## ✨ Features

### Core Functionality
- 🎲 **Batch Generation** - Generate 6, 12, or 24 random profiles at once
- 🚻 **Gender Filter** - Restrict results to male, female, or any
- 🌍 **Nationality Filter** - Restrict results to a specific country's naming/address conventions
- 🃏 **Profile Cards** - Photo, name, email, and location at a glance
- 🖼️ **Details Modal** - Full profile: contact info, address, coordinates, timezone, registration date, and an ID field
- ⭐ **Saved Profiles** - Star any card to keep it in a persistent favorites list
- 🔗 **Shareable Links** - Copy a URL that reproduces the exact same batch for anyone who opens it

### Technical Features
- ⚡ **Async/Await** - Modern asynchronous JavaScript patterns
- 🔓 **No API Key Required** - Nothing to configure, gitignore, or sign up for
- 🔁 **Seed-Based Reproducibility** - Reuses the API's own returned seed to make "randomness" replayable on demand
- 🔗 **URL State Restoration** - Reads `seed`/`results`/`gender`/`nat` from the query string on load to restore a shared batch automatically
- 🏳️ **Flag Emoji from Country Code** - Builds a flag emoji from a two-letter country code using Unicode code-point math, no image assets
- 📋 **Clipboard API** - Copies the shareable link with `navigator.clipboard.writeText()`
- 🎯 **Loading Skeletons** - Placeholder cards while a batch is being generated
- 🖱️ **Event Delegation** - One listener each for card clicks + favorite toggles, and for favorite chip clicks + removals
- 🎨 **Theme Switcher** - Dark, light, and retro themes, persisted in localStorage

## 🎓 Learning Outcomes

This intermediate project teaches:

1. **Fetch API** - Making HTTP requests to a keyless external API
2. **Async/Await** - Modern asynchronous JavaScript syntax
3. **Reproducible "Randomness"** - Using an API-provided seed value to regenerate identical results on demand
4. **URLSearchParams (read + write)** - Both building query strings for a request and parsing them from `window.location.search` to restore state
5. **Unicode Code-Point Math** - Converting letters to "regional indicator" code points to build flag emoji programmatically
6. **Clipboard API** - Writing text to the system clipboard from the browser
7. **Nested Object Destructuring** - Reading deeply nested API response fields (`location.coordinates.latitude`, `name.title`, etc.)
8. **Event Delegation with Multiple Actions** - Distinguishing a card click from a nested button click within the same listener using `event.stopPropagation()`
9. **localStorage CRUD** - Storing full objects (not just IDs) so a saved profile's modal still works even after the original batch is gone
10. **Error Handling** - Try-catch blocks with a user-facing fallback message
11. **State Management** - Managing what's currently displayed vs. what's saved vs. what's shareable
12. **CSS Custom Properties** - Reusing a multi-theme system across projects

## 🛠️ Technologies Used

- **HTML5** - Semantic markup structure
- **CSS3** - Custom properties for theming, responsive card grid
- **JavaScript ES6+** - Async/await, fetch API, destructuring, template literals
- **randomuser.me API** - Realistic placeholder user data, keyless and free

## 🔑 API Setup

No setup needed — randomuser.me is **open and requires no authentication**. There's no key
to generate, no account to create, and nothing to gitignore.

```javascript
const API_BASE_URL = "https://randomuser.me/api/";
```

## 📁 Project Structure

```
Random-User-Generator/
│
├── index.html          # Markup
├── style.css            # CSS-variable-based theming, card grid, modal
├── script.js             # API calls, seed handling, rendering, favorites
└── README.md             # This file
```

## 🚀 Installation

### Method 1: Direct Download

1. **Download the files**
   ```bash
   git clone https://github.com/your-username/Code-Odysseys.git
   cd Code-Odysseys/Random-User-Generator
   ```

2. **Open in browser** — no configuration needed
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

### Generating Profiles

1. Pick how many results, a gender filter, and a nationality filter (all optional)
2. Click **🎲 Generate**
3. A fresh batch of profile cards appears, along with the seed used to generate them

### Viewing Full Details

Click anywhere on a card (other than the star) to open a modal with the complete profile — contact info, full address, coordinates, timezone, and registration date.

### Saving a Profile

Click the ☆ in the top corner of any card to star it. It's saved to **Saved Profiles** below and persists across page reloads, even after you generate a new batch.

### Sharing a Batch

Click **🔗 Copy shareable link** after generating a batch. The copied URL includes the batch's seed and filters — anyone who opens it sees the exact same set of users, not a new random batch.

## 🔗 API Integration Details

### Endpoint Used

```
GET https://randomuser.me/api/?results={n}&gender={gender}&nat={nat}&seed={seed}
```

**Parameters:**
- `results` - How many users to generate (this app offers 6/12/24)
- `gender` - Optional: `male` or `female`
- `nat` - Optional: two-letter nationality code (e.g. `us`, `gb`, `in`)
- `seed` - Optional: reproduces a previously generated batch exactly

**Response Example (single user, trimmed):**
```json
{
  "results": [
    {
      "gender": "female",
      "name": { "title": "Ms", "first": "Aria", "last": "Novak" },
      "email": "aria.novak@example.com",
      "login": { "uuid": "...", "username": "..." },
      "dob": { "date": "1994-05-11T00:00:00Z", "age": 31 },
      "registered": { "date": "2016-02-03T00:00:00Z", "age": 9 },
      "phone": "...", "cell": "...",
      "location": {
        "street": { "number": 42, "name": "Birch Ave" },
        "city": "Austin", "state": "Texas", "country": "United States",
        "postcode": "73301",
        "coordinates": { "latitude": "30.2672", "longitude": "-97.7431" },
        "timezone": { "offset": "-6:00", "description": "Central Time" }
      },
      "picture": { "large": "...", "medium": "...", "thumbnail": "..." },
      "nat": "US"
    }
  ],
  "info": { "seed": "a1b2c3d4e5f6", "results": 1, "page": 1, "version": "1.4" }
}
```

Note the `info.seed` field — this is the key to reproducibility. Even when you don't pass a
`seed` in the request, the API tells you which seed it used, and passing that same value back
in a later request reproduces the identical batch.

### API Call Flow

```
Page loads → Check URL for a shared seed
        ├── Seed present → fetch that exact batch (reproducible)
        └── No seed → fetch a fresh random batch
        ↓
Render profile cards + store the returned seed
        ↓
User clicks "Copy shareable link" → build a URL with seed + filters
as query params → write to clipboard
        ↓
Anyone opening that URL → back to step 1, seed present → same batch
```

## 🔍 Code Walkthrough

### 1. Requesting (and Storing) a Reproducible Seed

```javascript
async function fetchUsers({ results, gender, nat, seed }) {
  const params = new URLSearchParams({ results });
  if (gender) params.set("gender", gender);
  if (nat) params.set("nat", nat);
  if (seed) params.set("seed", seed); // omit to let the API pick a fresh one

  const response = await fetch(`${API_BASE_URL}?${params}`);
  return response.json(); // info.seed tells us what was actually used
}
```

### 2. Restoring State from the URL on Load

```javascript
function init() {
  const params = new URLSearchParams(window.location.search);
  const sharedSeed = params.get("seed");

  if (sharedSeed) {
    if (params.get("results")) countSelect.value = params.get("results");
    if (params.get("gender")) genderSelect.value = params.get("gender");
    if (params.get("nat")) natSelect.value = params.get("nat");
    generateUsers(sharedSeed); // reproduces the exact shared batch
  } else {
    generateUsers();
  }
}
```

### 3. Building a Flag Emoji from a Country Code

```javascript
// Flags are pairs of Unicode "regional indicator" characters.
// Each letter A-Z maps to one by offsetting its char code.
function flagEmoji(countryCode) {
  return countryCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}
```

### 4. Distinguishing a Card Click from a Nested Button Click

```javascript
resultsGrid.addEventListener("click", (event) => {
  const favoriteBtn = event.target.closest('[data-action="favorite"]');
  if (favoriteBtn) {
    event.stopPropagation(); // don't also trigger the card's own click handling
    toggleFavorite(favoriteBtn.dataset.uuid);
    return;
  }

  const card = event.target.closest(".profile-card");
  if (card) openUserModal(card.dataset.uuid);
});
```

## 🛡️ Error Handling

### Error Types & Messages

| Error | User Message | Technical Cause |
|---|---|---|
| Network failure | "Couldn't generate users. Please try again." | No internet / API down |
| Clipboard write fails | Logged to console only | Browser permissions or insecure (non-HTTPS) context |
| Shared seed produces different data | (not expected — seeds are deterministic) | Would only happen if randomuser.me changed its generation algorithm between visits |

### Error State UI

```javascript
function setStatus(message, isError = false) {
  statusMessage.textContent = message;
  statusMessage.classList.toggle("error", isError);
}
```

## 🎨 Customization Guide

### Add More Nationality Options

The `<select id="nat-select">` in `index.html` lists a handful of common codes — randomuser.me supports many more (see their docs for the full list of `nat` values).

### Export a Batch as JSON

Add a "Download JSON" button that serializes `currentUsers` with `JSON.stringify()` and triggers a download via a Blob URL — useful for seeding test fixtures elsewhere.

### Add a Password Generator Preview

Each user already includes a `login.password` field — display it (clearly labeled as fake/demo data) for use in test account seeding.

### Change Color Theme

Add a new theme block in `style.css` and a matching button in `index.html`:

```css
body[data-theme="mint"] {
  --bg: #0c1f1a;
  --bg-elevated: #143229;
  --text: #e6fff5;
  --accent: #2dd4a7;
  --accent-text: #0c1f1a;
  --border: #1e4536;
}
```

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub** — no secrets to worry about, since there's no API key

2. **Import in Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your repository
   - Click "Deploy"

Because this app needs no API key, it's about as simple a deploy as a static site gets — no environment variables, no CORS setup, no serverless proxy required.

## 🌐 Browser Compatibility

- ✅ Chrome 66+
- ✅ Firefox 63+ (Clipboard API support)
- ✅ Safari 13.1+
- ✅ Edge 79+
- ✅ Opera 53+

**Required Features:**
- Fetch API
- Async/Await
- Clipboard API (`navigator.clipboard`)
- ES6+ JavaScript (template literals, destructuring)

## 🚀 Future Enhancements

- [ ] Download a batch as JSON or CSV
- [ ] "Load more" pagination instead of regenerating the whole grid
- [ ] Search/filter within the currently loaded batch
- [ ] Sort by age, name, or registration date
- [ ] Compare two saved profiles side-by-side
- [ ] Copy individual fields (email, phone) with one click
- [ ] Light/dark auto-detection via `prefers-color-scheme`
- [ ] QR code for the shareable link

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

- [randomuser.me Documentation](https://randomuser.me/documentation)
- [MDN - Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [MDN - URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)
- [MDN - Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API)
- [Unicode Regional Indicator Symbols](https://en.wikipedia.org/wiki/Regional_indicator_symbol)

---

**Part of the Code Odysseys Project Series** 🚀

*Intermediate-level project demonstrating seed-based reproducible data and URL state restoration*

**Happy Coding!** 🎲✨