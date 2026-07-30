# Country Info App - API Integration 🌍

![Project Status](https://img.shields.io/badge/status-completed-success)
![Difficulty](https://img.shields.io/badge/difficulty-intermediate-orange)
![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![API](https://img.shields.io/badge/API-REST_Countries_v5-brightgreen)


## ⚠️ Migration Notice

REST Countries relaunched as a **paid-tier, key-authenticated API (v5)**. The old free,
keyless `restcountries.com/v3.1/all` endpoint this project originally used **no longer
works** — it returns errors or is unreachable. See [API Setup](#api-setup)
below — there are **two** required steps now, not one: getting a key, *and* allow-listing
your domain for that key.

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

A **production-ready country explorer** that demonstrates a fetch-once, filter-client-side
API pattern, made deliberately quota-conscious: the full dataset is fetched in capped pages,
cached in `localStorage` for 24 hours, and only re-fetched after that window expires. This
keeps the app well inside REST Countries' free-tier monthly request quota. Search, region
filtering, and sorting all run against the cached data with plain array methods — no network
call needed after the initial (or cached) load.

**Live Demo:** *(https://country-finder-ecru.vercel.app)*

## ✨ Features

### Core Functionality
- 🔍 **Instant Search** - Filter by country name as you type, no network delay
- 🌐 **Region Filter** - Narrow to Africa, Americas, Asia, Europe, Oceania, or Antarctic
- ↕️ **Sorting** - By name (A–Z/Z–A), population (high/low), or area
- 🏳️ **Flag Grid** - Responsive card grid with flag, capital, region, and population
- 🖼️ **Details Modal** - Full stats: subregion, area, timezones, languages, currencies, and a Google Maps link

### Technical Features
- ⚡ **Fetch-Once, Cache-Aware Pattern** - The dataset is paginated in on load, then cached in `localStorage` for 24 hours so most page visits cost zero API requests
- 📄 **Manual Pagination** - The free plan caps each request at 100 records; a `while` loop assembles the full ~249-country list across multiple pages
- 🔑 **Gitignored API Key** - Key lives in a separate, gitignored config file
- 🌐 **CORS Hostname Allow-Listing** - Required step this API added: a key only works from origins you've explicitly approved
- 🛡️ **Error Handling** - Distinguishes an invalid key from a not-yet-allow-listed domain from a generic network failure
- 📱 **Responsive Design** - Grid adapts from mobile to desktop
- 🎯 **Loading States** - Skeleton cards while the dataset loads
- 🎨 **Theme Switcher** - Dark, light, and retro themes, persisted in localStorage
- 🖱️ **Event Delegation** - One click listener handles every country card
- 🔢 **Intl.NumberFormat** - Locale-aware number formatting for population and area

## 🎓 Learning Outcomes

This intermediate project teaches:

1. **Fetch API** - Making authenticated HTTP requests to an external API
2. **Async/Await** - Modern asynchronous JavaScript syntax, including a loop that awaits sequential paged requests
3. **Manual Pagination** - Looping on `offset` until an API's `meta.more` flag says there's nothing left to fetch
4. **localStorage as a Data Cache** - Storing fetched data with a timestamp and treating it as stale after a TTL, distinct from using localStorage for a UI preference
5. **Array Methods** - `.filter()`, `.sort()`, `.map()` used together to build a data pipeline
6. **Event Delegation** - Handling events on dynamically rendered elements
7. **Optional Chaining & Nullish Handling** - Safely reading nested fields that aren't always present
8. **Intl.NumberFormat** - Built-in locale-aware number formatting, no library needed
9. **Authenticated Requests** - Sending an `Authorization: Bearer` header with `fetch`
10. **Reading API Error Responses** - Distinguishing an auth failure from a CORS/origin rejection from a generic failure by inspecting the error payload
11. **Error Handling** - Try-catch blocks with a user-facing fallback message
12. **State Management** - Managing UI states (loading, results, empty, error)
13. **CSS Custom Properties** - Reusing a multi-theme system across projects

## 🛠️ Technologies Used

- **HTML5** - Semantic markup structure
- **CSS3** - Custom properties for theming, CSS Grid for layout
- **JavaScript ES6+** - Async/await, fetch API, array methods, destructuring
- **REST Countries API (v5)** - Country data provider, key-authenticated

## 🔑 API Setup

This API needs **two** setup steps — a key, and a domain allow-list entry for that key.
Missing either one is the most common reason this app "doesn't work."

### Step 1: Get Your API Key

1. Go to [restcountries.com/sign-up](https://restcountries.com/sign-up) and create a free account
2. Once logged in, open the [API Keys](https://restcountries.com/api-keys) page
3. Copy the generated key

### Step 2: Allow-List Your Domain(s)

Still on the [API Keys](https://restcountries.com/api-keys) page, add the hostnames this
app will run from — **hostname only, no protocol/port/path**:

- `localhost` (for local development)
- Your deployed domain, e.g. `your-app.vercel.app`

Browser requests from an origin not on this list are rejected even with a valid key. This
is a new requirement in v5 and is very easy to miss — if the app works locally but not once
deployed, this is almost always why.

### Step 3: Add the Key to the Project

Copy the example config file:

```bash
cp config.example.js config.js
```

Open `config.js` and replace the placeholder:

```javascript
const RESTCOUNTRIES_API_KEY = "YOUR_API_KEY_HERE"; // Replace this
```

### Step 4: Test the App

1. Open `index.html` in your browser (or serve it locally — see [Installation](#installation))
2. Countries should load within a couple of seconds
3. If nothing loads, open your browser's dev tools console — the error message there (and the on-page status message) will say whether it's a bad key or an un-allow-listed origin

⚠️ **Important:** `config.js` is listed in `.gitignore` so it won't be committed. Only `config.example.js` (with a placeholder) goes into version control.

## 📁 Project Structure

```
Country-Info-App/
│
├── index.html          # Markup
├── style.css            # CSS-variable-based theming, grid, modal
├── script.js             # Paginated API fetch, caching, filtering/sorting, rendering
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
   cd Code-Odysseys/Country-Info-App
   ```

2. **Add your API key and allow-list your hostnames** (see [API Setup](#api-setup))

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

Then open `http://localhost:8000` — remember `localhost` needs to be on your API key's allow-list.

## 💻 Usage Guide

### Searching for a Country

1. Type into the search box
2. The grid filters instantly on every keystroke — no debounce needed, since this filters data already cached in memory rather than calling the API again

### Filtering by Region

Choose a region from the dropdown to narrow the grid. Combine with search and sort — all three filters stack together.

### Sorting

Choose a sort order (name, population, or area) from the dropdown. Sorting re-runs instantly since it operates on the already-loaded dataset.

### Viewing Details

1. Click any country card
2. A modal opens with capital, subregion, area, timezones, languages, currencies, and a link to view the country on Google Maps
3. Close with the **×** button, by clicking outside the modal, or pressing **Esc**

## 🔗 API Integration Details

### Endpoint Used

```
GET https://api.restcountries.com/countries/v5?response_fields={fields}&limit={n}&offset={n}
Authorization: Bearer {your_api_key}
```

**Parameters:**
- `response_fields` - Comma-separated allowlist of fields to include (keeps payload size down)
- `limit` - Page size; **max 100 on the free plan**
- `offset` - How many records to skip (used to page through the full ~249-country list)

**Response Example (single country, trimmed):**
```json
{
  "data": {
    "objects": [
      {
        "names": { "common": "Japan", "official": "Japan" },
        "capitals": [{ "name": "Tokyo", "attributes": { "primary": true } }],
        "region": "Asia",
        "subregion": "Eastern Asia",
        "area": { "kilometers": 377930 },
        "flag": { "url_svg": "https://...", "description": "..." },
        "languages": [{ "name": "Japanese", "bcp47": "ja" }],
        "currencies": [{ "code": "JPY", "name": "Japanese yen", "symbol": "¥" }],
        "timezones": ["UTC+09:00"],
        "links": { "google_maps": "https://..." },
        "codes": { "alpha_3": "JPN" },
        "population": 125836021
      }
    ],
    "meta": { "total": 249, "count": 100, "limit": 100, "offset": 0, "more": true }
  }
}
```

Note the response shape: results are nested under `data.objects`, and field names changed
from the old v3.1 API (`name.common` → `names.common`, `cca3` → `codes.alpha_3`, `flags.svg`
→ `flag.url_svg`, `capital` (string array) → `capitals` (object array), and so on).

### API Call Flow

```
Page loads → Check localStorage cache
        ↓
   Cache valid (< 24h old)?
        ├── Yes → Use cached data, skip the network entirely
        └── No  → Loop: fetch page (offset 0, 100, 200...) until
                  meta.more is false → merge pages → write to cache
        ↓
Render initial grid (sorted A–Z by default)
        ↓
User types / changes filter or sort → re-derive a view from the
in-memory array (filter → sort) → re-render — no network call
```

## 🔍 Code Walkthrough

### 1. Paginating a Capped List Endpoint

```javascript
async function fetchAllCountriesFromAPI() {
  const pageSize = 100; // max allowed on the free plan
  let offset = 0;
  let allResults = [];
  let hasMore = true;

  while (hasMore) {
    const params = new URLSearchParams({ response_fields: RESPONSE_FIELDS, limit: pageSize, offset });
    const response = await fetch(`${API_BASE_URL}?${params}`, {
      headers: { Authorization: `Bearer ${RESTCOUNTRIES_API_KEY}` },
    });
    const data = await response.json();

    allResults = allResults.concat(data.data.objects);
    hasMore = data.data.meta.more; // API tells us when to stop
    offset += pageSize;
  }

  return allResults;
}
```

### 2. localStorage as a Data Cache (not just a preference store)

```javascript
function readCache() {
  const raw = localStorage.getItem(CACHE_KEY);
  if (!raw) return null;

  const { savedAt, countries } = JSON.parse(raw);
  const isExpired = Date.now() - savedAt > CACHE_TTL_MS; // 24 hours
  return isExpired ? null : countries;
}

async function loadCountries() {
  const cached = readCache();
  if (cached) {
    allCountries = cached; // zero network requests
    applyFiltersAndRender();
    return;
  }
  allCountries = await fetchAllCountriesFromAPI();
  writeCache(allCountries);
  applyFiltersAndRender();
}
```

### 3. Distinguishing Error Types from the Response Body

```javascript
if (!response.ok) {
  const message = data.errors?.[0]?.message || `Request failed (${response.status})`;
  throw new Error(message);
}
// ...later, in the catch block:
const message = /401|unrecognized|expired|missing/i.test(err.message)
  ? "Invalid or missing API key — check config.js."
  : /origin|hostname|cors/i.test(err.message)
  ? "This domain isn't allow-listed for your API key yet — add it on the restcountries.com API Keys page."
  : "Couldn't load country data. Please refresh and try again.";
```

## 🛡️ Error Handling

### Error Types & Messages

| Error | User Message | Technical Cause |
|---|---|---|
| Missing/invalid key | "Invalid or missing API key — check config.js." | `config.js` not set up, or key revoked/expired |
| Origin not allow-listed | "This domain isn't allow-listed for your API key yet..." | Deployed domain (or `localhost`) missing from the key's hostname list |
| Network failure | "Couldn't load country data. Please refresh and try again." | No internet / API down |
| No search matches | `No countries match "{query}".` | Search term doesn't match any cached country name |
| Missing `capital` | Displays "N/A" | Some entries (e.g. Antarctica) have no capital field |

### Error State UI

```javascript
function setStatus(message, isError = false) {
  statusMessage.textContent = message;
  statusMessage.classList.toggle("error", isError);
}
```

## 🎨 Customization Guide

### Shorten or Extend the Cache TTL

```javascript
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // change to e.g. 3 * 24 * 60 * 60 * 1000 for 3 days
```

REST Countries' terms allow caching responses for up to 3 days — 24 hours here is a conservative
default that balances freshness against the free plan's 500-request monthly quota.

### Add a "Refresh Data" Button

Clear the cache key and re-run `loadCountries()`:

```javascript
function forceRefresh() {
  localStorage.removeItem(CACHE_KEY);
  loadCountries();
}
```

### Add More Detail Fields

The v5 API exposes far more than this app surfaces — add fields to `RESPONSE_FIELDS` and display them:

```javascript
"memberships.un", "memberships.eu", "memberships.nato" // organization membership badges
"cars.driving_side"                                     // left/right driving side
"date.start_of_week"                                     // conventional first day of the week
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

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub** (with `config.js` gitignored — see [API Setup](#api-setup))

2. **Import in Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your repository
   - Click "Deploy"

3. **After deploying, add the Vercel domain to your API key's allow-list** on the restcountries.com API Keys page — this step is easy to forget and is the most common cause of "works locally, breaks once deployed."

### Security Best Practices

⚠️ **Never commit `config.js` with a real key to a public repo!**

**Option 1: Gitignored Config File (used in this project)**

`config.js` holds the real key and is excluded via `.gitignore`; `config.example.js` shows the expected shape and is the only version committed.

**Option 2: Serverless Function**

Move REST Countries calls to a backend/serverless function that stores the key as a server-side environment variable, so it's never sent to the browser at all — this also sidesteps the hostname allow-list entirely, since server-to-server requests aren't subject to CORS.

**Option 3: Hostname Allow-Listing (built into this API)**

Unlike many free APIs, REST Countries v5 has domain restriction built in as a required step, not an opt-in extra — see [API Setup](#api-setup).

## 🌐 Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Opera 47+

**Required Features:**
- Fetch API
- Async/Await
- Intl.NumberFormat
- ES6+ JavaScript (optional chaining, array methods)

## 🚀 Future Enhancements

- [ ] "Refresh data" button that bypasses the cache on demand
- [ ] Clickable bordering-country links in the details modal (using the `borders` field)
- [ ] Population comparison bar chart across all visible cards
- [ ] Favorites list saved to localStorage
- [ ] Toggle between flat list and interactive world map view
- [ ] Compare two countries side-by-side
- [ ] Show organization membership badges (UN, EU, NATO, G7, G20, etc.)
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

- [REST Countries API Documentation](https://restcountries.com/docs)
- [REST Countries Countries API Reference](https://restcountries.com/docs/countries)
- [MDN - Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [MDN - Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [MDN - Array.prototype.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
- [MDN - Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)

---

**Part of the Code Odysseys Project Series** 🚀

*Intermediate-level project demonstrating a fetch-once, cache-aware, quota-conscious API pattern*

**Happy Coding!** 🌍✨