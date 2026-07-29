
const API_BASE_URL = "https://api.restcountries.com/countries/v5";

// Trimming the response to just what this app displays keeps
// each page fetch smaller and faster.
const RESPONSE_FIELDS = [
  "names.common",
  "names.official",
  "capitals",
  "region",
  "subregion",
  "area.kilometers",
  "flag.url_svg",
  "flag.description",
  "flag.emoji",
  "languages",
  "currencies",
  "timezones",
  "links.google_maps",
  "codes.alpha_3",
  "population",
].join(",");

const CACHE_KEY = "countryapp-data-cache";
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

// 2. DOM REFERENCES

const body = document.body;
const themeButtons = document.querySelectorAll(".theme-btn");

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const regionFilter = document.getElementById("region-filter");
const sortSelect = document.getElementById("sort-select");

const statusMessage = document.getElementById("status-message");
const resultsGrid = document.getElementById("results-grid");

const modalOverlay = document.getElementById("modal-overlay");
const modalContent = document.getElementById("modal-content");
const modalClose = document.getElementById("modal-close");


// 3. STATE

let allCountries = [];

let state = {
  query: "",
  region: "",
  sort: "name-asc",
};


// 4. THEME HANDLING

function applyTheme(theme) {
  body.dataset.theme = theme;
  localStorage.setItem("countryapp-theme", theme);

  themeButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.theme === theme);
  });
}

function initTheme() {
  const savedTheme = localStorage.getItem("countryapp-theme") || "dark";
  applyTheme(savedTheme);
}

themeButtons.forEach((btn) => {
  btn.addEventListener("click", () => applyTheme(btn.dataset.theme));
});


// 5. FORMATTING HELPERS

const numberFormatter = new Intl.NumberFormat("en-US");

function formatNumber(value) {
  return typeof value === "number" ? numberFormatter.format(value) : "N/A";
}

function formatLanguages(languages) {
  if (!languages || languages.length === 0) return "N/A";
  return languages.map((lang) => lang.name).join(", ");
}

function formatCurrencies(currencies) {
  if (!currencies || currencies.length === 0) return "N/A";
  return currencies.map((c) => `${c.name} (${c.symbol || "—"})`).join(", ");
}


// 6. CACHE HELPERS (quota-conscious)

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;

    const { savedAt, countries } = JSON.parse(raw);
    const isExpired = Date.now() - savedAt > CACHE_TTL_MS;
    return isExpired ? null : countries;
  } catch {
    return null; // corrupted or missing cache — just refetch
  }
}

function writeCache(countries) {
  localStorage.setItem(
    CACHE_KEY,
    JSON.stringify({ savedAt: Date.now(), countries })
  );
}


// 7. API CALLS — paginated fetch of the full country list

async function fetchAllCountriesFromAPI() {
  const pageSize = 100; 
  let offset = 0;
  let allResults = [];
  let hasMore = true;

  while (hasMore) {
    const params = new URLSearchParams({
      response_fields: RESPONSE_FIELDS,
      limit: pageSize,
      offset,
    });

    const response = await fetch(`${API_BASE_URL}?${params}`, {
      headers: { Authorization: `Bearer ${RESTCOUNTRIES_API_KEY}` },
    });

    const data = await response.json();

    if (!response.ok) {
      const message = data.errors?.[0]?.message || `Request failed (${response.status})`;
      throw new Error(message);
    }

    allResults = allResults.concat(data.data.objects);
    hasMore = data.data.meta.more;
    offset += pageSize;
  }

  return allResults;
}

async function loadCountries() {
  setStatus("Loading countries...");
  renderSkeletons();

  const cached = readCache();
  if (cached) {
    allCountries = cached;
    applyFiltersAndRender();
    return;
  }

  try {
    allCountries = await fetchAllCountriesFromAPI();
    writeCache(allCountries);
    applyFiltersAndRender();
  } catch (err) {
    console.error(err);

    const message = /401|unrecognized|expired|missing/i.test(err.message)
      ? "Invalid or missing API key — check config.js."
      : /origin|hostname|cors/i.test(err.message)
      ? "This domain isn't allow-listed for your API key yet — add it on the restcountries.com API Keys page."
      : "Couldn't load country data. Please refresh and try again.";

    setStatus(message, true);
    resultsGrid.innerHTML = "";
  }
}


// 8. FILTER / SEARCH / SORT (all client-side, no network calls)

function applyFiltersAndRender() {
  let list = [...allCountries];

  if (state.query) {
    const q = state.query.toLowerCase();
    list = list.filter((country) =>
      country.names.common.toLowerCase().includes(q)
    );
  }

  if (state.region) {
    list = list.filter((country) => country.region === state.region);
  }

  list = sortCountries(list, state.sort);

  if (list.length === 0) {
    setStatus(`No countries match "${state.query}".`, true);
  } else {
    setStatus(`Showing ${list.length} of ${allCountries.length} countries`);
  }

  renderCountries(list);
}

function sortCountries(list, sortKey) {
  const sorted = [...list];

  switch (sortKey) {
    case "name-asc":
      return sorted.sort((a, b) => a.names.common.localeCompare(b.names.common));
    case "name-desc":
      return sorted.sort((a, b) => b.names.common.localeCompare(a.names.common));
    case "population-desc":
      return sorted.sort((a, b) => (b.population || 0) - (a.population || 0));
    case "population-asc":
      return sorted.sort((a, b) => (a.population || 0) - (b.population || 0));
    case "area-desc":
      return sorted.sort((a, b) => (b.area?.kilometers || 0) - (a.area?.kilometers || 0));
    default:
      return sorted;
  }
}


// 9. RENDERING — RESULTS GRID

function renderSkeletons(count = 12) {
  resultsGrid.innerHTML = Array.from({ length: count })
    .map(
      () => `
      <div class="skeleton-card">
        <div class="skeleton-flag"></div>
      </div>`
    )
    .join("");
}

function renderCountries(countries) {
  resultsGrid.innerHTML = countries
    .map((country) => {
      const capital = country.capitals?.[0]?.name || "N/A";

      return `
        <article class="country-card" data-code="${country.codes.alpha_3}">
          <img class="country-flag" src="${country.flag.url_svg}" alt="${country.flag.description || `Flag of ${country.names.common}`}" loading="lazy" />
          <div class="country-info">
            <h3 class="country-name">${country.names.common}</h3>
            <div class="country-meta">
              <span><strong>Capital:</strong> ${capital}</span>
              <span><strong>Region:</strong> ${country.region}</span>
              <span><strong>Population:</strong> ${formatNumber(country.population)}</span>
            </div>
          </div>
        </article>`;
    })
    .join("");
}

// Event delegation: one listener on the grid handles clicks on
// any card, including cards added after this listener was set up.
resultsGrid.addEventListener("click", (event) => {
  const card = event.target.closest(".country-card");
  if (!card) return;
  openCountryModal(card.dataset.code);
});


// 10. RENDERING — MODAL

function openCountryModal(alpha3) {
  const country = allCountries.find((c) => c.codes.alpha_3 === alpha3);
  if (!country) return;

  const capital = country.capitals?.[0]?.name || "N/A";
  const timezones = (country.timezones || []).join(", ") || "N/A";

  modalContent.innerHTML = `
    <div class="modal-hero">
      <img class="modal-flag" src="${country.flag.url_svg}" alt="${country.flag.description || `Flag of ${country.names.common}`}" />
      <div>
        <h2 class="modal-title">${country.names.common}</h2>
        <p class="modal-subtitle">${country.names.official}</p>
      </div>
    </div>
    <div class="modal-detail-grid">
      <p><strong>Capital:</strong> ${capital}</p>
      <p><strong>Region:</strong> ${country.region}</p>
      <p><strong>Subregion:</strong> ${country.subregion || "N/A"}</p>
      <p><strong>Population:</strong> ${formatNumber(country.population)}</p>
      <p><strong>Area:</strong> ${formatNumber(country.area?.kilometers)} km²</p>
      <p><strong>Timezones:</strong> ${timezones}</p>
      <p><strong>Languages:</strong> ${formatLanguages(country.languages)}</p>
      <p><strong>Currencies:</strong> ${formatCurrencies(country.currencies)}</p>
    </div>
    ${
      country.links?.google_maps
        ? `<a class="modal-map-link" href="${country.links.google_maps}" target="_blank" rel="noopener noreferrer">View on Google Maps →</a>`
        : ""
    }
  `;

  modalOverlay.classList.add("open");
}

function closeModal() {
  modalOverlay.classList.remove("open");
}

modalClose.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", (event) => {
  if (event.target === modalOverlay) closeModal(); // click outside modal box
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});


// 11. STATUS MESSAGES

function setStatus(message, isError = false) {
  statusMessage.textContent = message;
  statusMessage.classList.toggle("error", isError);
}


// 12. EVENT WIRING

searchInput.addEventListener("input", () => {
  state.query = searchInput.value.trim();
  applyFiltersAndRender();
});

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  state.query = searchInput.value.trim();
  applyFiltersAndRender();
});

regionFilter.addEventListener("change", () => {
  state.region = regionFilter.value;
  applyFiltersAndRender();
});

sortSelect.addEventListener("change", () => {
  state.sort = sortSelect.value;
  applyFiltersAndRender();
});


// 13. INIT

function init() {
  initTheme();

  if (typeof RESTCOUNTRIES_API_KEY === "undefined" || RESTCOUNTRIES_API_KEY === "YOUR_API_KEY_HERE") {
    setStatus("Add your REST Countries API key in config.js to get started.", true);
    return;
  }

  loadCountries();
}

init();