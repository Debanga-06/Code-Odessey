# Dictionary App - API Integration 📖

![Project Status](https://img.shields.io/badge/status-completed-success)
![Difficulty](https://img.shields.io/badge/difficulty-intermediate-orange)
![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![API](https://img.shields.io/badge/API-Free_Dictionary_API-9cf)

### Live Demo: [Live Site](https://stock-viewer-ebon.vercel.app/)

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

A **production-ready dictionary app** that looks up any English word's definitions, part of
speech, example sentences, synonyms/antonyms, and audio pronunciation via the free,
keyless [dictionaryapi.dev](https://dictionaryapi.dev/). Includes a deterministic
"Word of the Day" picked from a curated list using date math, and a localStorage-backed
recent searches history.

**Live Demo:** *(add your deployed link here once hosted)*

## ✨ Features

### Core Functionality
- 🔍 **Word Lookup** - Search any English word for its full dictionary entry
- 🔊 **Audio Pronunciation** - Play native pronunciation clips where available (sometimes more than one accent)
- 📚 **Grouped Meanings** - Definitions organized by part of speech (noun, verb, adjective, etc.)
- 💬 **Example Sentences** - Real usage examples shown under each definition, where the API provides one
- 🔗 **Synonyms & Antonyms** - Related words shown as tags per meaning
- 🌅 **Word of the Day** - A deterministic daily pick from a curated word list — same word for everyone, all day
- 🕐 **Recent Searches** - Last 10 lookups saved and reusable with one click

### Technical Features
- ⚡ **Async/Await** - Modern asynchronous JavaScript patterns
- 🔓 **No API Key Required** - Nothing to configure, gitignore, or sign up for
- 🧩 **Multi-Entry Merging** - Words with more than one etymological entry (e.g. "bank") have their phonetics and meanings combined into a single view
- 🔊 **HTMLAudio Playback** - Plays pronunciation clips directly with the `Audio` constructor, no `<audio>` tags in the DOM
- 🛡️ **Structured Error Handling** - Reads the API's own JSON error body (title/message/resolution) instead of a generic failure message
- 💾 **localStorage Recent History** - Deduplicated, most-recent-first, capped at 10 entries
- 🖱️ **Event Delegation** - One listener each for pronunciation buttons and recent-search chips
- 🎨 **Theme Switcher** - Dark, light, and retro themes, persisted in localStorage
- 📅 **Date-Based Deterministic Selection** - "Word of the Day" uses day-of-year math against a fixed list instead of `Math.random()`, so it's stable across reloads and visitors

## 🎓 Learning Outcomes

This intermediate project teaches:

1. **Fetch API** - Making HTTP requests to a keyless external API
2. **Async/Await** - Modern asynchronous JavaScript syntax
3. **Handling APIs That Return JSON on Error** - Reading `response.ok` and still parsing the body for a useful message, rather than assuming failure means an empty response
4. **Data Merging** - Flattening multiple API-returned entries into one cohesive view object
5. **The `Audio` Constructor** - Playing sound clips from JavaScript without adding `<audio>` elements to the page
6. **Date Math for Deterministic Selection** - Computing day-of-year and using modulo to pick consistently from a fixed list
7. **Protocol-Relative URL Handling** - Normalizing `//example.com/...` URLs that some APIs still return
8. **localStorage CRUD** - Deduplicating, capping, and persisting a list across sessions
9. **Event Delegation** - Handling clicks on buttons that don't exist yet when the listener is attached
10. **Template Literals & Array Methods** - Building nested HTML (meanings → definitions → examples/relations) from nested API data
11. **Error Handling** - Try-catch blocks with a user-facing fallback message
12. **CSS Custom Properties** - Reusing a multi-theme system across projects

## 🛠️ Technologies Used

- **HTML5** - Semantic markup structure
- **CSS3** - Custom properties for theming, card-based layout
- **JavaScript ES6+** - Async/await, fetch API, array methods, destructuring
- **Free Dictionary API** - Definitions, phonetics, and audio, keyless and free

## 🔑 API Setup

No setup needed — the Free Dictionary API is **open and requires no authentication**. There's
no key to generate, no account to create, and nothing to gitignore.

```javascript
const API_BASE_URL = "https://api.dictionaryapi.dev/api/v2/entries/en";
```

> A note from experience with other projects in this series: keyless APIs can and do change
> their terms over time (see project 105's README for what happened with REST Countries). If
> this endpoint ever starts requiring a key or gets rate-limited, the fix is the same
> pattern used elsewhere in this series — add a `config.js` + `.gitignore` pair and swap the
> base URL. Nothing else in this app would need to change.

## 📁 Project Structure

```
Dictionary-App/
│
├── index.html          # Markup
├── style.css            # CSS-variable-based theming, word card, meanings
├── script.js             # API calls, merging, audio playback, recent history
└── README.md             # This file
```

## 🚀 Installation

### Method 1: Direct Download

1. **Download the files**
   ```bash
   git clone https://github.com/your-username/Code-Odysseys.git
   cd Code-Odysseys/Dictionary-App
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

### Looking Up a Word

1. Type a word into the search box
2. Press **Enter** or click **Search**
3. The result card shows phonetic spelling, pronunciation buttons, origin (if available), and meanings grouped by part of speech

### Playing Pronunciation

Click any 🔊 button under the word — some words have more than one, usually for different English accents (e.g. UK vs. US).

### Using Word of the Day

Click the dashed **Word of the Day** chip near the top to instantly look up today's pick.

### Revisiting Recent Searches

Click any chip under **Recent Searches** to look that word up again — no need to retype it.

## 🔗 API Integration Details

### Endpoint Used

```
GET https://api.dictionaryapi.dev/api/v2/entries/en/{word}
```

**Response Example (single entry, trimmed):**
```json
[
  {
    "word": "hello",
    "phonetic": "həˈloʊ",
    "phonetics": [
      { "text": "həˈloʊ", "audio": "https://.../hello-us.mp3" }
    ],
    "origin": "early 19th century...",
    "meanings": [
      {
        "partOfSpeech": "exclamation",
        "definitions": [
          {
            "definition": "used as a greeting.",
            "example": "hello there, Katie!",
            "synonyms": [],
            "antonyms": []
          }
        ]
      }
    ]
  }
]
```

**On a word not found (404):**
```json
{
  "title": "No Definitions Found",
  "message": "Sorry pal, we couldn't find definitions for the word you were looking for.",
  "resolution": "You can try the search again at a later time or head to the web instead."
}
```

### API Call Flow

```
User submits a word → fetch the entries array
        ↓
Response ok? ──No──▶ Parse the JSON error body anyway → show its own message
        │
       Yes
        ↓
Merge all returned entries into one phonetics + meanings view
        ↓
Render word card → add word to recent searches (localStorage)
```

## 🔍 Code Walkthrough

### 1. Reading a JSON Error Body on a Non-OK Response

```javascript
async function fetchDefinition(word) {
  const response = await fetch(`${API_BASE_URL}/${encodeURIComponent(word)}`);
  const data = await response.json(); // parse regardless of status

  if (!response.ok) {
    // The API returns { title, message, resolution } even on 404 —
    // use its own message instead of a generic one.
    throw new Error(data.message || "Word not found.");
  }

  return data;
}
```

### 2. Merging Multiple Entries into One View

```javascript
function mergeEntries(entries) {
  const phonetics = [];
  const meanings = [];
  let origin = null;

  entries.forEach((entry) => {
    if (entry.origin && !origin) origin = entry.origin;
    (entry.phonetics || []).forEach((p) => { if (p.audio) phonetics.push(p); });
    meanings.push(...(entry.meanings || []));
  });

  return { word: entries[0].word, phonetics, origin, meanings };
}
```

### 3. Deterministic "Word of the Day" from Date Math

```javascript
function pickWordOfTheDay() {
  const startOfYear = new Date(new Date().getFullYear(), 0, 0);
  const diffMs = new Date() - startOfYear;
  const dayOfYear = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return WORD_LIST[dayOfYear % WORD_LIST.length]; // same word for everyone, all day
}
```

### 4. Playing Audio Without an `<audio>` Element

```javascript
function playAudio(url) {
  if (!url) return;
  new Audio(url).play().catch((err) => console.error("Playback failed:", err));
}
```

## 🛡️ Error Handling

### Error Types & Messages

| Error | User Message | Technical Cause |
|---|---|---|
| Word not found | `Couldn't find "{word}". {API's own message}` | 404 from the API, with its own JSON error body surfaced |
| Empty search | (no request made) | Form submission is ignored if the trimmed input is empty |
| Audio playback blocked | Logged to console only | Some browsers block autoplay-adjacent audio without a direct user gesture; clicking the button itself satisfies this in practice |
| Network failure | `Couldn't find "{word}". Failed to fetch` | No internet / API down |

### Error State UI

```javascript
function renderError(message) {
  resultSection.innerHTML = `<p class="empty-state">${message}</p>`;
}
```

## 🎨 Customization Guide

### Expand the Word of the Day List

```javascript
const WORD_LIST = [
  "serendipity", "ephemeral", /* ...add as many as you like */
];
```
Longer lists mean the daily rotation repeats less often (365 words = a full year before repeating).

### Add a Favorites List

Reuse the same localStorage pattern as `recent`, but keyed under a separate `dictionaryapp-favorites` entry with explicit add/remove actions instead of automatic capture on every search.

### Support Other Languages

The API supports other language codes in the URL path (where dictionaries exist for that language):

```javascript
const API_BASE_URL = "https://api.dictionaryapi.dev/api/v2/entries/es"; // Spanish, for example
```

### Change Color Theme

Add a new theme block in `style.css` and a matching button in `index.html`:

```css
body[data-theme="forest"] {
  --bg: #0f1f14;
  --bg-elevated: #16301f;
  --text: #e8f5ea;
  --accent: #4caf72;
  --accent-text: #0f1f14;
  --border: #23492e;
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

Because this app needs no API key, it's about as simple a deploy as a static site gets — no environment variables, no CORS allow-listing, no serverless proxy required.

## 🌐 Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Opera 47+

**Required Features:**
- Fetch API
- Async/Await
- `Audio` constructor
- ES6+ JavaScript (template literals, destructuring)

## 🚀 Future Enhancements

- [ ] Favorites list, separate from auto-captured recent searches
- [ ] "Did you mean...?" suggestions on a not-found word
- [ ] Dark-mode-aware audio waveform animation while a clip plays
- [ ] Word-of-the-day history (browse previous days' picks)
- [ ] Multi-language toggle using the API's other language codes
- [ ] Share button that copies a formatted definition to the clipboard
- [ ] Light/dark auto-detection via `prefers-color-scheme`
- [ ] Flashcard/quiz mode built from recent searches

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

- [Free Dictionary API Documentation](https://dictionaryapi.dev/)
- [MDN - Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [MDN - Async/Await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [MDN - HTMLAudioElement / Audio()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement)
- [MDN - Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)

---

**Part of the Code Odysseys Project Series** 🚀

*Intermediate-level project demonstrating a keyless API with audio playback and data merging*

**Happy Coding!** 📖✨