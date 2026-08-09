// 1. CONFIG
// gets committed — config.example.js shows the expected shape.
const API_BASE_URL = "https://v6.exchangerate-api.com/v6";


// 2. DOM REFERENCES

const body = document.body;
const themeButtons = document.querySelectorAll(".theme-btn");

const amountInput = document.getElementById("amount-input");
const fromSelect = document.getElementById("from-select");
const toSelect = document.getElementById("to-select");
const swapBtn = document.getElementById("swap-btn");

const resultMessage = document.getElementById("result-message");
const rateLine = document.getElementById("rate-line");
const favoritesRow = document.getElementById("favorites-row");


// 3. STATE

// `rates` is only re-fetched when the base currency changes.
// Changing the amount or the target currency just re-reads
// this cached object — no network call needed.
let state = {
  base: "USD",
  target: "INR",
  amount: 1,
  rates: {},
  lastUpdated: null,
};


// 4. THEME HANDLING

function applyTheme(theme) {
  body.dataset.theme = theme;
  localStorage.setItem("currencyapp-theme", theme);

  themeButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.theme === theme);
  });
}

function initTheme() {
  const savedTheme = localStorage.getItem("currencyapp-theme") || "dark";
  applyTheme(savedTheme);
}

themeButtons.forEach((btn) => {
  btn.addEventListener("click", () => applyTheme(btn.dataset.theme));
});


// 5. DEBOUNCE UTILITY

function debounce(fn, delay = 300) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}


// 6. API CALLS

async function fetchSupportedCurrencies() {
  const response = await fetch(`${API_BASE_URL}/${EXCHANGE_API_KEY}/codes`);
  const data = await response.json();

  if (data.result !== "success") {
    throw new Error(data["error-type"] || "Failed to load currency list");
  }

  return data.supported_codes; // array of [code, name] pairs
}

async function fetchRatesForBase(base) {
  const response = await fetch(`${API_BASE_URL}/${EXCHANGE_API_KEY}/latest/${base}`);
  const data = await response.json();

  if (data.result !== "success") {
    throw new Error(data["error-type"] || "Failed to load exchange rates");
  }

  return data; // includes conversion_rates and time_last_update_utc
}


// 7. RENDERING — CURRENCY DROPDOWNS

function populateSelects(codes) {
  const optionsHTML = codes
    .map(([code, name]) => `<option value="${code}">${code} — ${name}</option>`)
    .join("");

  fromSelect.innerHTML = optionsHTML;
  toSelect.innerHTML = optionsHTML;

  fromSelect.value = state.base;
  toSelect.value = state.target;
}


// 8. CONVERSION MATH (pure client-side, no network call)

function convert() {
  const rate = state.rates[state.target];

  if (!rate || Number.isNaN(state.amount)) {
    setResult("Enter a valid amount", true);
    return;
  }

  const converted = state.amount * rate;

  setResult(`${formatNumber(state.amount)} ${state.base} = ${formatNumber(converted)} ${state.target}`);
  rateLine.textContent = `1 ${state.base} = ${formatNumber(rate)} ${state.target} • Updated ${state.lastUpdated || "just now"}`;
}

const numberFormatter = new Intl.NumberFormat("en-US", { maximumFractionDigits: 4 });
function formatNumber(value) {
  return numberFormatter.format(value);
}

function setResult(message, isError = false) {
  resultMessage.textContent = message;
  resultMessage.classList.toggle("error", isError);
}


// 9. LOADING RATES FOR A NEW BASE CURRENCY

async function loadRatesForCurrentBase() {
  setResult("Fetching latest rates...");
  rateLine.textContent = "";

  try {
    const data = await fetchRatesForBase(state.base);
    state.rates = data.conversion_rates;
    state.lastUpdated = data.time_last_update_utc;
    convert();
  } catch (err) {
    console.error(err);
    setResult(
      err.message === "invalid-key"
        ? "Invalid API key — check config.js"
        : "Couldn't fetch exchange rates. Please try again.",
      true
    );
  }
}


// 10. FAVORITES (localStorage)

function getFavorites() {
  return JSON.parse(localStorage.getItem("currencyapp-favorites") || "[]");
}

function saveFavorites(favorites) {
  localStorage.setItem("currencyapp-favorites", JSON.stringify(favorites));
}

function renderFavorites() {
  const favorites = getFavorites();
  const currentPairKey = `${state.base}-${state.target}`;
  const alreadySaved = favorites.some((f) => `${f.from}-${f.to}` === currentPairKey);

  const chipsHTML = favorites
    .map(
      (pair, index) => `
      <button class="favorite-chip" data-index="${index}" data-action="use">
        ${pair.from} → ${pair.to}
        <span class="remove-chip" data-index="${index}" data-action="remove">✕</span>
      </button>`
    )
    .join("");

  favoritesRow.innerHTML =
    chipsHTML +
    (alreadySaved
      ? ""
      : `<button class="add-favorite-chip" id="add-favorite">+ Save ${state.base} → ${state.target}</button>`);
}

// Event delegation for both "use pair" and "remove pair" clicks,
// plus the "add favorite" button which is re-created on every render.
favoritesRow.addEventListener("click", (event) => {
  const target = event.target.closest("[data-action]");
  if (target) {
    const index = Number(target.dataset.index);
    const favorites = getFavorites();

    if (target.dataset.action === "remove") {
      favorites.splice(index, 1);
      saveFavorites(favorites);
      renderFavorites();
      return;
    }

    if (target.dataset.action === "use") {
      const pair = favorites[index];
      state.base = pair.from;
      state.target = pair.to;
      fromSelect.value = state.base;
      toSelect.value = state.target;
      loadRatesForCurrentBase();
      renderFavorites();
      return;
    }
  }

  if (event.target.id === "add-favorite") {
    const favorites = getFavorites();
    favorites.push({ from: state.base, to: state.target });
    saveFavorites(favorites);
    renderFavorites();
  }
});


// 11. EVENT WIRING

const debouncedAmountUpdate = debounce(() => {
  state.amount = parseFloat(amountInput.value);
  convert();
}, 200);

amountInput.addEventListener("input", debouncedAmountUpdate);

fromSelect.addEventListener("change", () => {
  state.base = fromSelect.value;
  loadRatesForCurrentBase();
  renderFavorites();
});

toSelect.addEventListener("change", () => {
  state.target = toSelect.value;
  convert(); // no fetch needed — rates for the current base are already cached
  renderFavorites();
});

swapBtn.addEventListener("click", () => {
  [state.base, state.target] = [state.target, state.base];
  fromSelect.value = state.base;
  toSelect.value = state.target;
  loadRatesForCurrentBase(); // base changed, so a fresh fetch is needed
  renderFavorites();
});


// 12. INIT

async function init() {
  initTheme();

  if (typeof EXCHANGE_API_KEY === "undefined" || EXCHANGE_API_KEY === "YOUR_API_KEY_HERE") {
    setResult("Add your ExchangeRate-API key in config.js to get started.", true);
    return;
  }

  try {
    const codes = await fetchSupportedCurrencies();
    populateSelects(codes);
    await loadRatesForCurrentBase();
    renderFavorites();
  } catch (err) {
    console.error(err);
    setResult("Couldn't load currency list. Check your API key and connection.", true);
  }
}

init();