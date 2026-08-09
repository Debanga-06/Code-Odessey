# Stock Price Viewer - API Integration 📈

![Project Status](https://img.shields.io/badge/status-completed-success)
![Difficulty](https://img.shields.io/badge/difficulty-intermediate-orange)
![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![API](https://img.shields.io/badge/API-Finnhub-6b46c1)

### Live Demo: [Live Site](https://currency-converter-seven-bice.vercel.app/)

## ⚠️ A Note on "Historical Charts" vs. This App

Finnhub's historical candle endpoint (`/stock/candle`) was moved behind a paid plan and
returns a 403 on free-tier keys. Rather than build a chart that silently breaks for anyone
following along on the free tier, this app takes a different approach entirely: it **polls
the live quote endpoint every 15 seconds and builds its own chart from data collected during
your session**. You won't see last month's price history, but you will see genuinely live
movement for as long as you keep the tab open — which is arguably a more honest fit for a
project called "real-time data" anyway.

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

A **production-ready stock viewer** that demonstrates polling-based "real-time" data and a
hand-drawn SVG line chart with zero external charting libraries. Search any public symbol,
see live price, change, and daily range, and watch a session chart build itself in front of
you as new quotes come in every 15 seconds. Includes a localStorage-backed watchlist for
quick access to symbols you check often.

**Live Demo:** *(add your deployed link here once hosted)*

## ✨ Features

### Core Functionality
- 🔍 **Symbol Search** - Debounced autocomplete search across stocks, ETFs, and more
- 💵 **Live Quote** - Current price, change ($ and %), open, high, low, and previous close
- 📊 **Self-Built Live Chart** - A hand-drawn SVG line chart that grows as new quotes arrive during your session
- 🟢 **Market Status Badge** - Shows whether the US market is currently open
- ⭐ **Watchlist** - Save frequently checked symbols, persisted in localStorage

### Technical Features
- ⚡ **Async/Await** - Modern asynchronous JavaScript patterns
- ⏱️ **Polling with setInterval** - Refreshes the active quote on a timer, cleanly cleared on symbol switch to avoid stacking intervals
- 🖌️ **Hand-Drawn SVG Chart** - Price history mapped to SVG coordinates and rendered as a `<polyline>` — no Chart.js, no dependency
- ⏳ **Debounced Search Input** - Smooths out rapid typing before hitting the search API
- 🔑 **Gitignored API Key** - Key lives in a separate, gitignored config file
- 🛡️ **Error Handling** - Distinguishes a bad API key from an unknown symbol from a generic network failure
- 💾 **localStorage Watchlist** - Saved symbols persist across sessions
- 🖱️ **Event Delegation** - One listener each for search results and watchlist chip interactions
- 🎨 **Theme Switcher** - Dark, light, and retro themes, persisted in localStorage

## 🎓 Learning Outcomes

This intermediate project teaches:

1. **Fetch API** - Making HTTP requests to an external API
2. **Async/Await** - Modern asynchronous JavaScript syntax, including `Promise.all()` for parallel requests
3. **setInterval / clearInterval** - Polling on a timer and, critically, cleaning up the previous timer before starting a new one
4. **Manual SVG Generation** - Mapping a data array to `<polyline>` coordinates without a charting library
5. **Debouncing** - Delaying execution until input activity pauses, using closures
6. **API Keys** - Secure API key handling with a gitignored config file
7. **Error Handling** - Distinguishing an auth failure, an unknown symbol, and a network failure by response shape
8. **Graceful Degradation** - Letting a non-critical request (market status) fail without blocking the rest of the UI, via `.catch()` on an individual `Promise.all()` entry
9. **localStorage CRUD** - Add, read, and remove entries from a persisted watchlist
10. **Event Delegation with `data-action`** - Routing multiple click behaviors through shared listeners
11. **Intl.NumberFormat (currency style)** - Locale- and currency-aware price formatting
12. **State Management** - Tracking what's actively polling vs. what's static per session

## 🛠️ Technologies Used

- **HTML5** - Semantic markup structure
- **CSS3** - Custom properties for theming, responsive card layout
- **JavaScript ES6+** - Async/await, fetch API, closures, template literals
- **Finnhub API** - Live quotes, company profiles, symbol search, and market status

## 🔑 API Setup

### Step 1: Get Your API Key

1. Go to [finnhub.io/register](https://finnhub.io/register)
2. Sign up (no credit card required)
3. Copy your API key from the dashboard

Finnhub's free tier gives **60 API calls/minute** — comfortably enough for this app, which
polls one symbol at a time roughly every 15 seconds (4 calls/min).

### Step 2: Add API Key to Project

Copy the example config file:

```bash
cp config.example.js config.js
```

Open `config.js` and replace the placeholder:

```javascript
const FINNHUB_API_KEY = "YOUR_API_KEY_HERE"; // Replace this
```

### Step 3: Test the App

1. Open `index.html` in your browser
2. Search for a symbol (try `AAPL`, `TSLA`, or type a company name)
3. A live-updating quote should appear, with the chart filling in over the next few polls

⚠️ **Important:** `config.js` is listed in `.gitignore` so it won't be committed. Only `config.example.js` (with a placeholder) goes into version control.

> Unlike project 105 (Country Info App), Finnhub does **not** require allow-listing your
> domain — CORS is enabled for all origins, so a valid key is all you need, locally or deployed.

## 📁 Project Structure

```
Stock-Price-Viewer/
│
├── index.html           # Markup
├── style.css              # CSS-variable-based theming, stock card, chart, watchlist
├── script.js               # API calls, polling, SVG chart rendering, watchlist
├── config.js                # Your real API key (gitignored)
├── config.example.js        # Placeholder key, committed to git
├── .gitignore
└── README.md                 # This file
```

## 🚀 Installation

### Method 1: Direct Download

1. **Download the files**
   ```bash
   git clone https://github.com/your-username/Code-Odysseys.git
   cd Code-Odysseys/Stock-Price-Viewer
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

### Searching for a Stock

1. Type a symbol or company name into the search box
2. Pick a result from the dropdown (or press Enter to search the raw symbol directly)
3. The card loads the company profile and starts polling live quotes

### Reading the Live Chart

The chart starts empty ("Collecting live data...") and fills in as quotes arrive — one point
every 15 seconds. It only reflects your current session; refreshing the page or switching
symbols resets it, since this app has no historical backend to restore from.

### Using the Watchlist

1. With a stock open, click **☆ Add to Watchlist**
2. It appears as a chip below — click any chip any time to jump straight back to that symbol
3. Click the **✕** on a chip to remove it

## 🔗 API Integration Details

### Endpoints Used

#### 1. Symbol Search
```
GET https://finnhub.io/api/v1/search?q={query}&token={key}
```
Returns matching symbols with `description`, `displaySymbol`, `symbol`, and `type`.

#### 2. Live Quote (polled every 15s per active symbol)
```
GET https://finnhub.io/api/v1/quote?symbol={symbol}&token={key}
```
**Response shape:**
```json
{
  "c": 233.15,
  "d": 1.42,
  "dp": 0.61,
  "h": 234.02,
  "l": 231.10,
  "o": 231.80,
  "pc": 231.73,
  "t": 1735689600
}
```
`c`/`d`/`dp`/`h`/`l`/`o`/`pc` map to current/change/percent-change/high/low/open/previous-close.

#### 3. Company Profile (fetched once per symbol)
```
GET https://finnhub.io/api/v1/stock/profile2?symbol={symbol}&token={key}
```
Returns `name`, `logo`, `exchange`, `currency`, and more.

#### 4. Market Status (fetched once per symbol, non-blocking)
```
GET https://finnhub.io/api/v1/stock/market-status?exchange=US&token={key}
```
Returns `isOpen`, `session`, and related fields.

### API Call Flow

```
User picks a symbol → clear any existing polling interval
        ↓
Fetch company profile + market status in parallel (Promise.all)
        ↓
Fetch quote immediately → render card + first chart point
        ↓
Start a 15s interval → each tick fetches quote → appends a chart
point (capped at 30) → re-renders card
        ↓
User picks a different symbol → clear the interval → repeat
```

## 🔍 Code Walkthrough

### 1. Clearing the Previous Poll Before Starting a New One

```javascript
async function selectSymbol(symbol) {
  // Stop polling the previously selected stock before switching —
  // otherwise every symbol you've ever viewed keeps polling forever.
  if (state.pollTimerId) clearInterval(state.pollTimerId);

  state.symbol = symbol;
  state.priceHistory = [];
  // ...
  await pollQuote();
  state.pollTimerId = setInterval(pollQuote, POLL_INTERVAL_MS);
}
```

### 2. Mapping Data to SVG Coordinates by Hand

```javascript
function renderChartSVG(history) {
  const prices = history.map((p) => p.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = max - min || 1; // avoid divide-by-zero on a perfectly flat price

  const points = history.map((point, index) => {
    const x = padding + (index / (history.length - 1)) * (width - padding * 2);
    const y = height - padding - ((point.price - min) / range) * (height - padding * 2);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  return `<svg viewBox="0 0 ${width} ${height}"><polyline points="${points.join(" ")}" ... /></svg>`;
}
```

### 3. Letting a Non-Critical Request Fail Gracefully

```javascript
const [profile, marketStatus] = await Promise.all([
  fetchProfile(symbol),
  fetchMarketStatus().catch(() => null), // if this fails, the card still renders — just without the badge
]);
```

### 4. Detecting Finnhub's "Empty Quote" Shape

```javascript
// An unknown symbol doesn't error — Finnhub returns all zeros instead.
if (quote.c === 0 && quote.pc === 0) {
  renderErrorCard(`No data found for "${state.symbol}" — check the symbol and try again.`);
  clearInterval(state.pollTimerId);
  return;
}
```

## 🛡️ Error Handling

### Error Types & Messages

| Error | User Message | Technical Cause |
|---|---|---|
| Missing/invalid key | "Add your Finnhub API key in config.js to get started." / "Invalid API key — check config.js." | `config.js` not set up, or a 401 from the API |
| Unknown symbol | `No data found for "{symbol}" — check the symbol and try again.` | Finnhub returns `c: 0, pc: 0` for symbols with no data, rather than an HTTP error |
| Single failed poll tick | (no interruption — polling continues) | A transient network blip shouldn't kill the whole session |
| Market status fetch fails | Badge simply doesn't render | Treated as non-critical via `.catch(() => null)` |

### Error State UI

```javascript
function renderErrorCard(message) {
  stockCard.innerHTML = `<p class="empty-state">${message}</p>`;
}
```

## 🎨 Customization Guide

### Adjust the Poll Interval

```javascript
const POLL_INTERVAL_MS = 15000; // lower = more "real-time" feel, but burns through your call quota faster
```

At 60 calls/min free, you could safely poll a single symbol as often as every 2 seconds — but leave headroom for search and profile calls too.

### Persist the Chart Across Reloads

Save `state.priceHistory` to `localStorage` (or `sessionStorage`) keyed by symbol, and restore it in `selectSymbol()` instead of always starting from an empty array.

### Add Multiple Simultaneous Charts

Instead of a single `state.symbol`, track an array of open symbols, each with its own polling interval and history array — useful for comparing a few stocks side-by-side.

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

3. No CORS allow-listing step needed here (unlike project 105) — Finnhub works from any origin with a valid key.

### Security Best Practices

⚠️ **Never commit `config.js` with a real key to a public repo!**

**Option 1: Gitignored Config File (used in this project)**

`config.js` holds the real key and is excluded via `.gitignore`; `config.example.js` shows the expected shape and is the only version committed.

**Option 2: Serverless Function**

Move Finnhub calls to a backend/serverless function that stores the key as a server-side environment variable, so it's never sent to the browser at all — also useful if you outgrow the 60 calls/min limit and want to add server-side caching.

## 🌐 Browser Compatibility

- ✅ Chrome 66+
- ✅ Firefox 57+
- ✅ Safari 12.1+
- ✅ Edge 79+
- ✅ Opera 53+

**Required Features:**
- Fetch API
- Async/Await
- SVG rendering
- ES6+ JavaScript (template literals, destructuring)

## 🚀 Future Enhancements

- [ ] Persist session chart data across reloads via localStorage
- [ ] Multiple simultaneous open symbols with side-by-side charts
- [ ] Price alert notifications when a threshold is crossed
- [ ] Company news feed via Finnhub's `/company-news` endpoint
- [ ] Basic fundamentals panel (market cap, P/E, 52-week range) via `/stock/metric`
- [ ] Dark chart gradient fill under the line
- [ ] Sound/visual pulse on each price tick
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

- [Finnhub API Documentation](https://finnhub.io/docs/api)
- [MDN - Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [MDN - setInterval()](https://developer.mozilla.org/en-US/docs/Web/API/Window/setInterval)
- [MDN - SVG polyline](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/polyline)
- [MDN - Promise.all()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)

---

**Part of the Code Odysseys Project Series** 🚀

*Intermediate-level project demonstrating polling-based real-time data and a hand-drawn SVG chart*

**Happy Coding!** 📈✨