# Unsplash Image Search - API Integration 🖼️

![Project Status](https://img.shields.io/badge/status-completed-success)
![Difficulty](https://img.shields.io/badge/difficulty-intermediate-orange)
![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![API](https://img.shields.io/badge/API-Unsplash-000000)

## ⚠️ This API's Rules Aren't Optional Extras

Unlike most APIs in this series, Unsplash's [API Guidelines](https://help.unsplash.com/en/articles/2511245-unsplash-api-guidelines)
are **terms you agree to by using the API**, not just suggestions:

1. **Attribution is required** wherever a photo appears — a visible credit linking to the
   photographer's profile and to Unsplash, both with specific UTM parameters. This app does
   this on every card, not just in the modal.
2. **Every download must "hit" a tracking endpoint.** Unsplash requires you to ping a specific
   `download_location` URL every time a user downloads a photo through your app — this is
   separate from actually fetching the image, and it's how photographers get official download
   credit. Skipping this is a guideline violation even if your app "works fine" without it.

Both are implemented here — see [Code Walkthrough](#code-walkthrough) for exactly how.

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

## Live Demo :- [Link](https://unplash-photo-search.vercel.app/)

## 🎯 Overview

A **production-ready photo search app** built on the [Unsplash API](https://unsplash.com/developers),
with a Pinterest-style masonry gallery built entirely in CSS (no JS layout library), paginated
search, orientation filtering, a "Surprise Me" random photo picker, and a localStorage
favorites list. Compliance with Unsplash's attribution and download-tracking requirements is
built in from the start, not bolted on.

**Live Demo:** *(add your deployed link here once hosted)*

## ✨ Features

### Core Functionality
- 🔍 **Photo Search** - Search Unsplash's full library by keyword
- 📐 **Orientation Filter** - Landscape, portrait, square, or any
- 🎲 **Surprise Me** - Pulls one random photo (optionally scoped to your current search term)
- 📄 **Load More Pagination** - Appends additional pages instead of replacing results
- 🖼️ **Masonry Gallery** - A Pinterest-style variable-height grid using pure CSS columns
- 🖱️ **Photo Details Modal** - Larger view, photographer info, description, and a download button
- ⭐ **Saved Photos** - Star any photo to keep it in a persistent favorites list

### Technical Features
- ⚡ **Async/Await** - Modern asynchronous JavaScript patterns
- 🔑 **Gitignored API Key** - Key lives in a separate, gitignored config file
- 🧱 **CSS-Columns Masonry** - `column-count` + `break-inside: avoid` for a true masonry layout with zero JavaScript layout code
- 📖 **Compliant Attribution** - Every photo card and the modal both link to the photographer and Unsplash with the UTM parameters the API terms require
- 📡 **Fire-and-Forget Tracking Call** - Pings Unsplash's required download-tracking endpoint without blocking the user's actual download
- 📄 **Append vs. Replace Pagination** - "Load More" appends new results to the existing grid; a fresh search replaces it
- 🛡️ **Error Handling** - Distinguishes a bad API key from "no results" from a generic network failure
- 💾 **localStorage Favorites** - Saved photos persist across sessions
- 🖱️ **Event Delegation with Link Passthrough** - Card clicks open the modal, but attribution links inside a card still navigate normally, via a `data-stop` escape hatch
- 🎨 **Theme Switcher** - Dark, light, and retro themes, persisted in localStorage

## 🎓 Learning Outcomes

This intermediate project teaches:

1. **Fetch API with Authorization Headers** - Sending `Authorization: Client-ID {key}` on every request
2. **Async/Await** - Modern asynchronous JavaScript syntax
3. **CSS Multi-Column Masonry Layout** - A pure-CSS alternative to JS masonry libraries, using `column-count` and `break-inside: avoid`
4. **Pagination: Append vs. Replace** - Deciding when new data should extend the current view (`Load More`) vs. replace it (a fresh search)
5. **API Terms as Code, Not Just Docs** - Implementing a provider's usage guidelines (attribution, tracking pings) as first-class parts of the app, not afterthoughts
6. **Fire-and-Forget Requests** - Making an API call whose result the user doesn't need to wait for, and handling its failure without disrupting the main flow
7. **Event Delegation with an Escape Hatch** - Using a `data-stop` marker so specific child elements (links) can opt out of a parent's click handling
8. **URL Manipulation for UTM Parameters** - Programmatically appending tracking parameters to outbound links
9. **Caching to Preserve Modal/Favorite Functionality** - Storing full photo objects in a `Map` so a favorited photo's modal still works without a redundant fetch
10. **Error Handling** - Try-catch blocks with a user-facing fallback message
11. **State Management** - Tracking search query, orientation, current page, and total pages together
12. **CSS Custom Properties** - Reusing a multi-theme system across projects

## 🛠️ Technologies Used

- **HTML5** - Semantic markup structure
- **CSS3** - Custom properties for theming, CSS multi-column masonry layout
- **JavaScript ES6+** - Async/await, fetch API, `Map`, template literals
- **Unsplash API** - Photo search, random photos, and download tracking

## 🔑 API Setup

### Step 1: Get Your Access Key

1. Go to [unsplash.com/developers](https://unsplash.com/developers) and register as a developer
2. Create a **New Application**, accept the API guidelines (the ones summarized at the top of this README)
3. Copy the **Access Key** from your new application's page

Your app starts in **Demo** mode: **50 requests/hour** — plenty for development. Production
approval (still free) raises this to 5,000/hour if you ever need it.

### Step 2: Add the Key to the Project

Copy the example config file:

```bash
cp config.example.js config.js
```

Open `config.js` and replace the placeholder:

```javascript
const UNSPLASH_ACCESS_KEY = "YOUR_ACCESS_KEY_HERE"; // Replace this
```

### Step 3: Test the App

1. Open `index.html` in your browser
2. Search for something — try "mountains" or "coffee"
3. A masonry grid of results should appear within a second or two

⚠️ **Important:** `config.js` is listed in `.gitignore` so it won't be committed. Only `config.example.js` (with a placeholder) goes into version control.

## 📁 Project Structure

```
Unsplash-Image-Search/
│
├── index.html            # Markup
├── style.css               # CSS-variable-based theming, masonry grid, modal
├── script.js                # API calls, tracking, attribution, favorites
├── config.js                 # Your real Access Key (gitignored)
├── config.example.js         # Placeholder key, committed to git
├── .gitignore
└── README.md                  # This file
```

## 🚀 Installation

### Method 1: Direct Download

1. **Download the files**
   ```bash
   git clone https://github.com/your-username/Code-Odysseys.git
   cd Code-Odysseys/Unsplash-Image-Search
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

### Searching for Photos

1. Type a search term and press Enter or click **Search**
2. Results load into a masonry grid — different-height photos, no gaps
3. Click **Load More** to append the next page of results

### Filtering by Orientation

Click **Landscape**, **Portrait**, or **Square** to narrow results — re-runs your current search automatically.

### Surprise Me

Click **🎲 Surprise Me** for one random photo. If there's text in the search box, the random pick is scoped to that topic; otherwise it's a fully random pick from Unsplash's whole library.

### Viewing & Downloading a Photo

Click any photo to open the details modal — photographer info, description, and a **Download** button. Clicking Download pings Unsplash's required tracking endpoint (invisibly, in the background) and opens the full-resolution image in a new tab.

### Saving Favorites

Click the ☆ on any card (or inside the modal) to star it. It's saved under **Saved Photos** and persists across reloads.

## 🔗 API Integration Details

### Endpoints Used

#### 1. Search
```
GET https://api.unsplash.com/search/photos?query={q}&page={n}&per_page=20&orientation={o}
Authorization: Client-ID {access_key}
```

#### 2. Random Photo
```
GET https://api.unsplash.com/photos/random?query={q}
Authorization: Client-ID {access_key}
```

#### 3. Download Tracking (required on every download)
```
GET {photo.links.download_location}
Authorization: Client-ID {access_key}
```
This URL is provided per-photo in the search/random response — you don't construct it yourself.

**Search Response Example (single result, trimmed):**
```json
{
  "total": 8214,
  "total_pages": 411,
  "results": [
    {
      "id": "abc123",
      "alt_description": "snow-capped mountain range at sunrise",
      "urls": { "thumb": "...", "small": "...", "regular": "...", "full": "..." },
      "links": { "html": "https://unsplash.com/photos/abc123", "download_location": "https://api.unsplash.com/photos/abc123/download" },
      "user": {
        "name": "Jane Photographer",
        "username": "janephoto",
        "profile_image": { "medium": "..." },
        "links": { "html": "https://unsplash.com/@janephoto" }
      }
    }
  ]
}
```

### API Call Flow

```
User searches → search/photos (page 1) → cache each photo by id → render masonry grid
        ↓
User clicks "Load More" → search/photos (page N+1) → APPEND to grid (not replace)
        ↓
User clicks a photo → open modal from cache (no re-fetch)
        ↓
User clicks Download → fire-and-forget ping to download_location → open full image
```

## 🔍 Code Walkthrough

### 1. Required Attribution, Built Into Every Card

```javascript
`<div class="photo-credit">
   By <a href="${withUtm(photo.user.links.html)}" target="_blank">${photo.user.name}</a> on
   <a href="https://unsplash.com/?${UTM_PARAMS}" target="_blank">Unsplash</a>
 </div>`

function withUtm(url) {
  return `${url}${url.includes("?") ? "&" : "?"}${UTM_PARAMS}`;
}
```

### 2. The Required Download-Tracking Ping

```javascript
// Fire-and-forget: we don't await this or block the user's download on it.
// A failure here is logged, not surfaced — it should never stop someone
// from getting their photo.
function trackDownload(photo) {
  fetch(photo.links.download_location, { headers: authHeaders() }).catch((err) =>
    console.error("Download tracking failed (non-blocking):", err)
  );
}

document.getElementById("download-btn").addEventListener("click", () => {
  trackDownload(photo);
  window.open(photo.urls.full, "_blank", "noopener,noreferrer");
});
```

### 3. CSS Masonry with Zero JavaScript Layout Code

```css
.results-grid {
  column-count: 2;
  column-gap: 1rem;
}
@media (min-width: 960px) { .results-grid { column-count: 4; } }

.photo-card {
  break-inside: avoid; /* never split one card across two columns */
  margin-bottom: 1rem;
}
```

### 4. Letting Attribution Links Escape Event Delegation

```javascript
resultsGrid.addEventListener("click", (event) => {
  if (event.target.closest("[data-stop]")) return; // credit links navigate normally, don't open the modal

  const card = event.target.closest(".photo-card");
  if (card) openPhotoModal(card.dataset.id);
});
```

## 🛡️ Error Handling

### Error Types & Messages

| Error | User Message | Technical Cause |
|---|---|---|
| Missing/invalid key | "Add your Unsplash Access Key in config.js to get started." / "Invalid API key — check config.js." | `config.js` not set up, or a 401 from the API |
| No search results | `No photos found for "{query}".` | Zero results on page 1 |
| Network failure | "Something went wrong. Please try again." | No internet / API down |
| Download tracking fails | Logged to console only | Never blocks the actual download — the ping is non-critical to the user experience |
| Rate limit exceeded (50/hr on Demo) | Generic request-failed message | Unsplash returns a 403; consider applying for Production access if you hit this often during development |

### Error State UI

```javascript
function setStatus(message, isError = false) {
  statusMessage.textContent = message;
  statusMessage.classList.toggle("error", isError);
}
```

## 🎨 Customization Guide

### Apply for Production Access

Once your app is ready to share widely, use the "Apply for Production" flow in your Unsplash app dashboard — same code, same key, just a higher rate limit (5,000/hour instead of 50/hour).

### Add Color Filtering

Unsplash's search endpoint also supports a `color` parameter (e.g. `black_and_white`, `blue`, `red`) — add another filter row alongside orientation using the same pattern already built.

### Persist Full Favorite Data

Currently, favorites store only a thumbnail and username to keep localStorage small — clicking an old favorite opens the Unsplash page directly rather than the in-app modal, since the full photo object isn't cached across sessions. Storing the complete photo object per favorite (trading storage size for functionality) would let the modal reopen fully offline-cached, at the cost of a larger localStorage footprint.

### Change Color Theme

Add a new theme block in `style.css` and a matching button in `index.html`:

```css
body[data-theme="sepia"] {
  --bg: #1d1810;
  --bg-elevated: #2b2318;
  --text: #f3ead9;
  --accent: #d8a35c;
  --accent-text: #1d1810;
  --border: #3c3120;
}
```

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub** (with `config.js` gitignored — see [API Setup](#api-setup))

2. **Import in Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your repository
   - Click "Deploy"

3. If you expect meaningful traffic, apply for Unsplash Production access first — 50 requests/hour disappears fast once real visitors start searching.

### Security Best Practices

⚠️ **Never commit `config.js` with a real key to a public repo!**

**Option 1: Gitignored Config File (used in this project)**

`config.js` holds the real key and is excluded via `.gitignore`; `config.example.js` shows the expected shape and is the only version committed.

**Option 2: Serverless Function**

Move Unsplash calls to a backend/serverless function that stores the key as a server-side environment variable — also a natural place to enforce your own rate limiting if you're worried about exhausting the 50/hour Demo quota.

## 🌐 Browser Compatibility

- ✅ Chrome 50+ (CSS columns, Fetch API)
- ✅ Firefox 52+
- ✅ Safari 10+
- ✅ Edge 79+
- ✅ Opera 37+

**Required Features:**
- Fetch API
- Async/Await
- CSS Multi-Column Layout
- `Map`

## 🚀 Future Enhancements

- [ ] Color filtering alongside orientation
- [ ] Full favorite data caching for fully offline-capable saved photos
- [ ] Infinite scroll instead of a manual "Load More" button
- [ ] Collections browsing (Unsplash's curated photo sets)
- [ ] Keyboard navigation through the gallery
- [ ] Copy-to-clipboard for a photo's attribution HTML snippet
- [ ] Light/dark auto-detection via `prefers-color-scheme`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Commit and push
6. Open a Pull Request

## 📝 License

This project's code is licensed under the AGPL-3.0 License. Photos returned by the API are licensed
under the [Unsplash License](https://unsplash.com/license) — free to use, with attribution
appreciated (and required by the API Terms specifically, as covered above).

---

## 🎓 Learning Resources

- [Unsplash API Documentation](https://unsplash.com/documentation)
- [Unsplash API Guidelines](https://help.unsplash.com/en/articles/2511245-unsplash-api-guidelines)
- [MDN - Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [MDN - CSS Multi-column Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_multicol_layout)
- [MDN - Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)

---

**Part of the Code Odysseys Project Series** 🚀

*Intermediate-level project demonstrating API terms-of-service compliance and CSS masonry layout*

**Happy Coding!** 🖼️✨