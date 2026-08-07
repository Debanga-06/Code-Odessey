# Currency Converter - API Integration 💱

![Project Status](https://img.shields.io/badge/status-completed-success)
![Difficulty](https://img.shields.io/badge/difficulty-intermediate-orange)
![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![API](https://img.shields.io/badge/API-ExchangeRate--API-blue)

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

A **production-ready currency converter** that demonstrates a deliberately API-frugal pattern: it only calls the exchange rate API when the base currency changes, and does every other conversion — amount changes, target currency changes — with plain client-side arithmetic against a cached rates object. This intermediate-level project pulls live rates and the full supported-currency list from ExchangeRate-API, and includes a localStorage-backed "Quick Pairs" favorites system.

**Live Demo:** *(add your deployed link here once hosted)*

## ✨ Features

### Core Functionality
- 💰 **Live Conversion** - Convert any amount between 160+ currencies
- 🔁 **Swap Button** - Instantly flip the "from" and "to" currencies
- ⭐ **Quick Pairs** - Save frequently used currency pairs as chips for one-click reuse
- 🕐 **Last Updated Timestamp** - Shows when the underlying rate data was last refreshed
- 📉 **Rate Summary Line** - Always shows the plain "1 X = Y Z" exchange rate alongside the converted total

### Technical Features
- ⚡ **Async/Await** - Modern asynchronous JavaScript patterns
- 🧮 **Client-Side Math, Server-Side Data** - Only the base currency change triggers a fetch; amount and target changes are computed instantly against cached rates
- ⏱️ **Debounced Amount Input** - Smooths out rapid typing before recalculating
- 🔑 **Gitignored API Key** - Key lives in a separate, gitignored config file
- 🛡️ **Error Handling** - Distinguishes invalid API key errors from generic network failures
- 💾 **localStorage Favorites** - Saved pairs persist across sessions
- 🖱️ **Event Delegation** - One listener handles "use" and "remove" clicks across all favorite chips
- 🎨 **Theme Switcher** - Dark, light, and retro themes, persisted in localStorage
- 🔢 **Intl.NumberFormat** - Locale-aware number formatting for converted amounts

## 🎓 Learning Outcomes

This intermediate project teaches:

1. **Fetch API** - Making HTTP requests to external APIs
2. **Async/Await** - Modern asynchronous JavaScript syntax
3. **Minimizing API Calls** - Deciding *when* a fresh network request is actually needed vs. when cached data is enough
4. **Debouncing** - Delaying execution until input activity pauses, using closures
5. **API Keys** - Secure API key handling with a gitignored config file
6. **JSON Parsing** - Working with both list-shaped (`supported_codes`) and object-shaped (`conversion_rates`) API responses
7. **Error Handling** - Distinguishing API-reported errors (bad key) from network failures
8. **Array Destructuring** - Swapping two state values in one line (`[a, b] = [b, a]`)
9. **localStorage CRUD** - Add, read, and remove entries from a persisted list
10. **Event Delegation with `data-action`** - Routing multiple click behaviors through one listener using data attributes
11. **Intl.NumberFormat** - Built-in locale-aware number formatting
12. **State Management** - Managing what's cached vs. what's re-fetched vs. what's pure computation

## 🛠️ Technologies Used

- **HTML5** - Semantic markup structure
- **CSS3** - Custom properties for theming, responsive card layout
- **JavaScript ES6+** - Async/await, fetch API, destructuring, arrow functions
- **ExchangeRate-API** - Live exchange rate and currency list provider

## 🔑 API Setup

### Step 1: Get Your API Key

1. Go to [ExchangeRate-API](https://www.exchangerate-api.com/)
2. Click **"Get Free Key"** and sign up (no credit card required)
3. Verify your email
4. Copy your API key from the dashboard

### Step 2: Add API Key to Project

Copy the example config file:

```bash
cp config.example.js config.js
```

Open `config.js` and replace the placeholder:

```javascript
const EXCHANGE_API_KEY = "YOUR_API_KEY_HERE"; // Replace this
```

With your actual key:

```javascript
const EXCHANGE_API_KEY = "a1b2c3d4e5f6"; // Your real key
```

### Step 3: Test the App

1. Open `index.html` in your browser
2. Pick a "From" and "To" currency
3. A converted amount and live rate should appear!

⚠️ **Important:** `config.js` is listed in `.gitignore` so it won't be committed. Only `config.example.js` (with a placeholder) goes into version control. See [Security Best Practices](#security-best-practices) below.

## 📁 Project Structure

```
Currency-Converter/
│
├── index.html           # Markup
├── style.css              # CSS-variable-based theming, converter card, favorites
├── script.js               # API calls, caching, conversion math, favorites
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
   cd Code-Odysseys/Currency-Converter
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

### Converting an Amount

1. Type an amount into the amount field
2. Pick a "From" and "To" currency from the dropdowns
3. The converted total and current rate update automatically

### Swapping Currencies

Click the **⇄** button to instantly flip "From" and "To" — this triggers one fresh fetch, since the base currency has changed.

### Saving a Quick Pair

1. Set up a "From"/"To" combination you use often
2. Click **+ Save {From} → {To}** under Quick Pairs
3. Click the saved chip any time to jump straight to that pair
4. Click the **✕** on a chip to remove it

## 🔗 API Integration Details

### Endpoints Used

#### 1. Supported Currency Codes (fetched once, on load)
```
GET https://v6.exchangerate-api.com/v6/{key}/codes
```

**Response Example:**
```json
{
  "result": "success",
  "supported_codes": [
    ["USD", "United States Dollar"],
    ["INR", "Indian Rupee"]
  ]
}
```

#### 2. Latest Rates for a Base Currency (fetched only when the base changes)
```
GET https://v6.exchangerate-api.com/v6/{key}/latest/{base_code}
```

**Response Example:**
```json
{
  "result": "success",
  "time_last_update_utc": "Mon, 28 Jul 2026 00:00:01 +0000",
  "base_code": "USD",
  "conversion_rates": {
    "USD": 1,
    "INR": 83.12,
    "EUR": 0.92
  }
}
```

### API Call Flow

```
Page loads → Fetch supported currency list (once)
        ↓
Populate From/To dropdowns
        ↓
Fetch rates for the default base currency
        ↓
Cache conversion_rates in state
        ↓
User changes amount or target currency → recompute from
cached rates only (no fetch)
        ↓
User changes base currency or clicks swap → fetch new rates
for the new base → recompute
```

## 🔍 Code Walkthrough

### 1. Fetching Only When the Base Changes

```javascript
fromSelect.addEventListener("change", () => {
  state.base = fromSelect.value;
  loadRatesForCurrentBase(); // base changed → fresh fetch needed
});

toSelect.addEventListener("change", () => {
  state.target = toSelect.value;
  convert(); // target changed → cached rates are still valid
});
```

### 2. Pure Client-Side Conversion

```javascript
function convert() {
  const rate = state.rates[state.target];

  if (!rate || Number.isNaN(state.amount)) {
    setResult("Enter a valid amount", true);
    return;
  }

  const converted = state.amount * rate;
  setResult(`${formatNumber(state.amount)} ${state.base} = ${formatNumber(converted)} ${state.target}`);
}
```

### 3. Swapping State with Array Destructuring

```javascript
swapBtn.addEventListener("click", () => {
  [state.base, state.target] = [state.target, state.base];
  fromSelect.value = state.base;
  toSelect.value = state.target;
  loadRatesForCurrentBase();
});
```

### 4. Routing Multiple Click Actions Through One Listener

```javascript
favoritesRow.addEventListener("click", (event) => {
  const target = event.target.closest("[data-action]");
  if (!target) return;

  const action = target.dataset.action; // "use" or "remove"
  const index = Number(target.dataset.index);
  // ...branch on action
});
```

## 🛡️ Error Handling

### Error Types & Messages

| Error | User Message | Technical Cause |
|---|---|---|
| `result: "error"`, type `invalid-key` | "Invalid API key — check config.js" | Wrong or missing key in `config.js` |
| Network failure | "Couldn't fetch exchange rates. Please try again." | No internet / API down |
| Empty/invalid amount | "Enter a valid amount" | Amount field is blank or non-numeric |
| Missing key entirely | "Add your ExchangeRate-API key in config.js to get started." | `config.js` not set up yet |

### Error State UI

```javascript
function setResult(message, isError = false) {
  resultMessage.textContent = message;
  resultMessage.classList.toggle("error", isError);
}
```

## 🎨 Customization Guide

### Add a Historical Trend Line

ExchangeRate-API's paid tiers support historical data; a free alternative like the Frankfurter API (no key required) can supply a 7/30-day time series to render as a small SVG sparkline next to the rate line.

### Add More Currencies to a Comparison View

Rather than one "To" currency, loop over a small fixed list (e.g. USD, EUR, GBP, JPY) and render a mini table converting the amount into all of them at once using the already-cached `conversion_rates` object — no extra fetches needed.

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

### Add Keyboard Shortcuts

Bind a key (e.g. `S`) to trigger the swap button, and `Enter` in the amount field to force an immediate recalculation without waiting for the debounce.

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

Move ExchangeRate-API calls to a backend/serverless function that stores the key as a server-side environment variable, so it's never sent to the browser at all.

**Option 3: API Key Restrictions**

Check ExchangeRate-API's dashboard for domain-restriction options on paid tiers; for the free tier, a backend proxy (Option 2) is the more robust choice for a public deployment.

## 🌐 Browser Compatibility

- ✅ Chrome 66+
- ✅ Firefox 57+
- ✅ Safari 12.1+
- ✅ Edge 79+
- ✅ Opera 53+

**Required Features:**
- Fetch API
- Async/Await
- Intl.NumberFormat
- ES6+ JavaScript (destructuring, template literals)

## 🚀 Future Enhancements

- [ ] Historical trend sparkline using a free time-series endpoint
- [ ] Multi-currency comparison table for one input amount
- [ ] Keyboard shortcuts (swap, force-convert)
- [ ] Offline fallback using the last successfully cached rates
- [ ] Auto-refresh rates every N minutes while the tab is open
- [ ] Copy-to-clipboard for the converted result
- [ ] Light/dark auto-detection via `prefers-color-scheme`
- [ ] PWA support for quick access without opening a browser tab

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

- [ExchangeRate-API Documentation](https://www.exchangerate-api.com/docs/overview)
- [MDN - Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [MDN - Async/Await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [MDN - Destructuring Assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
- [MDN - Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)

---

**Part of the Code Odysseys Project Series** 🚀

*Intermediate-level project demonstrating API-call-minimizing state design*

**Happy Coding!** 💱✨