// 1. CONFIG

// FINNHUB_API_KEY comes from config.js, loaded before this file

const API_BASE_URL = "https://finnhub.io/api/v1";
const POLL_INTERVAL_MS = 15000; // 4 calls/min per open stock — well under the 60/min free-tier cap
const MAX_CHART_POINTS = 30;


// 2. DOM REFERENCES

const body = document.body;
const themeButtons = document.querySelectorAll(".theme-btn");

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");

const stockCard = document.getElementById("stock-card");
const watchlistRow = document.getElementById("watchlist-row");


// 3. STATE

let state = {
  symbol: null,
  profile: null,
  priceHistory: [], // [{ time, price }], capped at MAX_CHART_POINTS, reset per symbol
  pollTimerId: null,
};


// 4. THEME HANDLING

function applyTheme(theme) {
  body.dataset.theme = theme;
  localStorage.setItem("stockapp-theme", theme);
  themeButtons.forEach((btn) => btn.classList.toggle("active", btn.dataset.theme === theme));
}

function initTheme() {
  applyTheme(localStorage.getItem("stockapp-theme") || "dark");
}

themeButtons.forEach((btn) => btn.addEventListener("click", () => applyTheme(btn.dataset.theme)));


// 5. DEBOUNCE UTILITY

function debounce(fn, delay = 350) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}


// 6. API CALLS

async function searchSymbols(query) {
  const params = new URLSearchParams({ q: query, token: FINNHUB_API_KEY });
  const response = await fetch(`${API_BASE_URL}/search?${params}`);
  if (!response.ok) throw new Error(`Search failed (${response.status})`);
  return response.json();
}

async function fetchQuote(symbol) {
  const params = new URLSearchParams({ symbol, token: FINNHUB_API_KEY });
  const response = await fetch(`${API_BASE_URL}/quote?${params}`);
  if (!response.ok) throw new Error(`Quote fetch failed (${response.status})`);
  return response.json();
}

async function fetchProfile(symbol) {
  const params = new URLSearchParams({ symbol, token: FINNHUB_API_KEY });
  const response = await fetch(`${API_BASE_URL}/stock/profile2?${params}`);
  if (!response.ok) throw new Error(`Profile fetch failed (${response.status})`);
  return response.json();
}

async function fetchMarketStatus() {
  const params = new URLSearchParams({ exchange: "US", token: FINNHUB_API_KEY });
  const response = await fetch(`${API_BASE_URL}/stock/market-status?${params}`);
  if (!response.ok) throw new Error(`Market status fetch failed (${response.status})`);
  return response.json();
}


// 7. SYMBOL SEARCH UI

const debouncedSearch = debounce(async () => {
  const query = searchInput.value.trim();
  if (query.length < 1) {
    searchResults.innerHTML = "";
    return;
  }

  try {
    const data = await searchSymbols(query);
    renderSearchResults(data.result.slice(0, 8));
  } catch (err) {
    console.error(err);
    searchResults.innerHTML = "";
  }
}, 350);

searchInput.addEventListener("input", debouncedSearch);

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = searchInput.value.trim();
  if (query) selectSymbol(query.toUpperCase(), query);
});

function renderSearchResults(results) {
  if (results.length === 0) {
    searchResults.innerHTML = "";
    return;
  }

  searchResults.innerHTML = results
    .map(
      (r) => `
      <div class="search-result-item" data-symbol="${r.symbol}" data-desc="${r.description}">
        <span class="result-symbol">${r.symbol}</span>
        <span class="result-desc">${r.description}</span>
      </div>`
    )
    .join("");
}

// Event delegation: handles every search result row, including
// rows that didn't exist when the listener was attached.
searchResults.addEventListener("click", (event) => {
  const item = event.target.closest(".search-result-item");
  if (!item) return;
  selectSymbol(item.dataset.symbol, item.dataset.desc);
  searchResults.innerHTML = "";
  searchInput.value = "";
});


// 8. SELECTING A SYMBOL — profile + start polling

async function selectSymbol(symbol) {
  // Stop polling the previously selected stock before switching —
  // otherwise every symbol you've ever viewed keeps polling forever.
  if (state.pollTimerId) clearInterval(state.pollTimerId);

  state.symbol = symbol;
  state.priceHistory = [];
  state.profile = null;

  renderLoadingCard(symbol);

  try {
    const [profile, marketStatus] = await Promise.all([
      fetchProfile(symbol),
      fetchMarketStatus().catch(() => null), // non-critical — don't block the card on this
    ]);

    state.profile = profile;
    state.marketStatus = marketStatus;

    await pollQuote(); // fetch immediately, don't wait for the first interval tick
    state.pollTimerId = setInterval(pollQuote, POLL_INTERVAL_MS);
  } catch (err) {
    console.error(err);
    renderErrorCard(err.message.includes("401") ? "Invalid API key — check config.js." : "Couldn't load this symbol. Try another.");
  }
}

async function pollQuote() {
  try {
    const quote = await fetchQuote(state.symbol);

    if (!quote.c && quote.c !== 0) return; // malformed response, skip this tick
    if (quote.c === 0 && quote.pc === 0) {
      renderErrorCard(`No data found for "${state.symbol}" — check the symbol and try again.`);
      clearInterval(state.pollTimerId);
      return;
    }

    state.priceHistory.push({ time: Date.now(), price: quote.c });
    if (state.priceHistory.length > MAX_CHART_POINTS) state.priceHistory.shift();

    renderStockCard(quote);
  } catch (err) {
    console.error(err); // keep polling — a single failed tick shouldn't kill the session
  }
}


// 9. RENDERING — STOCK CARD

function renderLoadingCard(symbol) {
  stockCard.innerHTML = `<p class="empty-state">Loading ${symbol}...</p>`;
}

function renderErrorCard(message) {
  stockCard.innerHTML = `<p class="empty-state">${message}</p>`;
}

function renderStockCard(quote) {
  const profile = state.profile || {};
  const change = quote.d ?? quote.c - quote.pc;
  const percent = quote.dp ?? (change / quote.pc) * 100;
  const isUp = change >= 0;

  const marketOpen = state.marketStatus?.isOpen;
  const marketBadge =
    state.marketStatus == null
      ? ""
      : `<span class="market-status ${marketOpen ? "open" : "closed"}">${marketOpen ? "● Market Open" : "Market Closed"}</span>`;

  stockCard.innerHTML = `
    <div class="stock-header">
      ${profile.logo ? `<img class="company-logo" src="${profile.logo}" alt="${profile.name} logo" />` : ""}
      <div>
        <div class="company-name">${profile.name || state.symbol}</div>
        <div class="company-meta">${state.symbol} • ${profile.exchange || "—"}</div>
      </div>
      ${marketBadge}
    </div>

    <div class="price-row">
      <span class="current-price">${formatPrice(quote.c, profile.currency)}</span>
      <span class="price-change ${isUp ? "up" : "down"}">
        ${isUp ? "▲" : "▼"} ${formatPrice(Math.abs(change), profile.currency)} (${Math.abs(percent).toFixed(2)}%)
      </span>
    </div>

    <div class="stats-grid">
      <div class="stat-box"><div class="stat-label">Open</div><div class="stat-value">${formatPrice(quote.o)}</div></div>
      <div class="stat-box"><div class="stat-label">High</div><div class="stat-value">${formatPrice(quote.h)}</div></div>
      <div class="stat-box"><div class="stat-label">Low</div><div class="stat-value">${formatPrice(quote.l)}</div></div>
      <div class="stat-box"><div class="stat-label">Prev Close</div><div class="stat-value">${formatPrice(quote.pc)}</div></div>
    </div>

    <div class="chart-wrapper">
      ${renderChartSVG(state.priceHistory)}
      <div class="chart-status">
        <span><span class="live-dot"></span>Live — updates every ${POLL_INTERVAL_MS / 1000}s</span>
        <span>${state.priceHistory.length} point${state.priceHistory.length === 1 ? "" : "s"} this session</span>
      </div>
    </div>

    <div class="stock-actions">
      <button class="watch-btn ${isInWatchlist(state.symbol) ? "active" : ""}" id="watch-toggle">
        ${isInWatchlist(state.symbol) ? "★ In Watchlist" : "☆ Add to Watchlist"}
      </button>
    </div>
  `;

  document.getElementById("watch-toggle").addEventListener("click", () => toggleWatchlist(state.symbol, profile.name));
}

function formatPrice(value, currency = "USD") {
  if (value == null || Number.isNaN(value)) return "N/A";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: currency || "USD" }).format(value);
}


// 10. HAND-DRAWN SVG LINE CHART (no charting library)

function renderChartSVG(history) {
  if (history.length < 2) {
    return `<svg class="chart-svg" viewBox="0 0 300 140"><text x="150" y="70" text-anchor="middle" fill="var(--text-muted)" font-size="12">Collecting live data...</text></svg>`;
  }

  const prices = history.map((p) => p.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = max - min || 1; // avoid divide-by-zero on a perfectly flat price

  const width = 300;
  const height = 140;
  const padding = 10;

  const points = history.map((point, index) => {
    const x = padding + (index / (history.length - 1)) * (width - padding * 2);
    const y = height - padding - ((point.price - min) / range) * (height - padding * 2);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  const isUpOverall = prices[prices.length - 1] >= prices[0];
  const lineColor = isUpOverall ? "var(--up)" : "var(--down)";

  return `
    <svg class="chart-svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
      <polyline points="${points.join(" ")}" fill="none" stroke="${lineColor}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" />
    </svg>
  `;
}


// 11. WATCHLIST (localStorage)

function getWatchlist() {
  return JSON.parse(localStorage.getItem("stockapp-watchlist") || "[]");
}

function saveWatchlist(list) {
  localStorage.setItem("stockapp-watchlist", JSON.stringify(list));
}

function isInWatchlist(symbol) {
  return getWatchlist().some((item) => item.symbol === symbol);
}

function toggleWatchlist(symbol, name) {
  let list = getWatchlist();

  if (isInWatchlist(symbol)) {
    list = list.filter((item) => item.symbol !== symbol);
  } else {
    list.push({ symbol, name: name || symbol });
  }

  saveWatchlist(list);
  renderWatchlist();

  // Refresh the button state on the currently open card without a full re-render.
  const btn = document.getElementById("watch-toggle");
  if (btn) {
    const active = isInWatchlist(symbol);
    btn.classList.toggle("active", active);
    btn.textContent = active ? "★ In Watchlist" : "☆ Add to Watchlist";
  }
}

function renderWatchlist() {
  const list = getWatchlist();

  if (list.length === 0) {
    watchlistRow.innerHTML = `<p class="watchlist-empty">No saved stocks yet — add one from the card above.</p>`;
    return;
  }

  watchlistRow.innerHTML = list
    .map(
      (item) => `
      <button class="watchlist-chip" data-symbol="${item.symbol}">
        ${item.symbol}
        <span class="remove-chip" data-action="remove" data-symbol="${item.symbol}">✕</span>
      </button>`
    )
    .join("");
}

// Event delegation for both "select" and "remove" clicks on watchlist chips.
watchlistRow.addEventListener("click", (event) => {
  const removeBtn = event.target.closest('[data-action="remove"]');
  if (removeBtn) {
    const list = getWatchlist().filter((item) => item.symbol !== removeBtn.dataset.symbol);
    saveWatchlist(list);
    renderWatchlist();
    return;
  }

  const chip = event.target.closest(".watchlist-chip");
  if (chip) selectSymbol(chip.dataset.symbol);
});


// 12. INIT

function init() {
  initTheme();
  renderWatchlist();

  if (typeof FINNHUB_API_KEY === "undefined" || FINNHUB_API_KEY === "YOUR_API_KEY_HERE") {
    renderErrorCard("Add your Finnhub API key in config.js to get started.");
  }
}

init();