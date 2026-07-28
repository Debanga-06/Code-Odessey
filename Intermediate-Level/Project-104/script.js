/* 
MOVIE SEARCH APP
   Concepts practiced: async/await + fetch, debouncing,
   AbortController (cancelling stale requests), event
   delegation, localStorage, template literals, pagination.
 */

// 1. CONFIG

// OMDB_API_KEY comes from config.js, loaded before this file in
// index.html. config.js is gitignored so the real key never gets
// committed — config.example.js shows the expected shape.
const OMDB_BASE_URL = "https://www.omdbapi.com/";

// 2. DOM REFERENCES

const body = document.body;
const themeButtons = document.querySelectorAll(".theme-btn");

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const typeFilter = document.getElementById("type-filter");
const yearFilter = document.getElementById("year-filter");

const statusMessage = document.getElementById("status-message");
const resultsGrid = document.getElementById("results-grid");
const paginationEl = document.getElementById("pagination");

const modalOverlay = document.getElementById("modal-overlay");
const modalContent = document.getElementById("modal-content");
const modalClose = document.getElementById("modal-close");

// 3. STATE

// Keeping this in one object makes it easy to reason about
// what changes on every new search vs. what persists.
let state = {
  query: "",
  type: "",
  year: "",
  page: 1,
  totalResults: 0,
};

let activeController = null; // used to cancel an in-flight fetch

// 4. THEME HANDLING

function applyTheme(theme) {
  body.dataset.theme = theme;
  localStorage.setItem("movieapp-theme", theme);

  themeButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.theme === theme);
  });
}

function initTheme() {
  const savedTheme = localStorage.getItem("movieapp-theme") || "dark";
  applyTheme(savedTheme);
}

themeButtons.forEach((btn) => {
  btn.addEventListener("click", () => applyTheme(btn.dataset.theme));
});

// 5. YEAR FILTER OPTIONS 

function populateYearFilter() {
  const currentYear = new Date().getFullYear();
  const fragment = document.createDocumentFragment();

  for (let year = currentYear; year >= 1950; year--) {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    fragment.appendChild(option);
  }

  yearFilter.appendChild(fragment);
}

// 6. DEBOUNCE UTILITY

// Prevents firing a network request on every single keystroke.
// Returns a new function that waits `delay` ms of silence
// before actually calling `fn`.
function debounce(fn, delay = 400) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

// 7. API CALLS

async function searchMovies({ query, type, year, page }) {
  // Cancel any request still in flight so an old, slow response
  // can't overwrite the results of a newer search.
  if (activeController) activeController.abort();
  activeController = new AbortController();

  const params = new URLSearchParams({
    apikey: OMDB_API_KEY,
    s: query,
    page,
  });
  if (type) params.set("type", type);
  if (year) params.set("y", year);

  const response = await fetch(`${OMDB_BASE_URL}?${params}`, {
    signal: activeController.signal,
  });

  if (!response.ok) {
    throw new Error(`Network error: ${response.status}`);
  }

  return response.json(); // OMDb still returns 200 even on "Movie not found"
}

async function getMovieDetails(imdbID) {
  const params = new URLSearchParams({
    apikey: OMDB_API_KEY,
    i: imdbID,
    plot: "full",
  });

  const response = await fetch(`${OMDB_BASE_URL}?${params}`);
  if (!response.ok) throw new Error(`Network error: ${response.status}`);
  return response.json();
}

// 8. RENDERING — RESULTS GRID

function renderSkeletons(count = 8) {
  resultsGrid.innerHTML = Array.from({ length: count })
    .map(
      () => `
      <div class="skeleton-card">
        <div class="skeleton-poster"></div>
      </div>`
    )
    .join("");
}

function renderMovies(movies) {
  resultsGrid.innerHTML = movies
    .map((movie) => {
      const poster =
        movie.Poster && movie.Poster !== "N/A"
          ? movie.Poster
          : "https://via.placeholder.com/300x445?text=No+Poster";

      return `
        <article class="movie-card" data-id="${movie.imdbID}">
          <img class="movie-poster" src="${poster}" alt="${movie.Title} poster" loading="lazy" />
          <div class="movie-info">
            <h3 class="movie-title">${movie.Title}</h3>
            <div class="movie-meta">
              <span>${movie.Year}</span>
              <span>${movie.Type}</span>
            </div>
          </div>
        </article>`;
    })
    .join("");
}

// Event delegation: one listener on the grid handles clicks on
// any card, including cards added after this listener was set up.
resultsGrid.addEventListener("click", (event) => {
  const card = event.target.closest(".movie-card");
  if (!card) return;
  openMovieModal(card.dataset.id);
});

// 9. RENDERING — PAGINATION

function renderPagination() {
  const resultsPerPage = 10; // fixed by the OMDb API
  const totalPages = Math.ceil(state.totalResults / resultsPerPage);

  if (totalPages <= 1) {
    paginationEl.innerHTML = "";
    return;
  }

  paginationEl.innerHTML = `
    <button class="page-btn" id="prev-page" ${state.page === 1 ? "disabled" : ""}>← Prev</button>
    <span class="page-info">Page ${state.page} of ${totalPages}</span>
    <button class="page-btn" id="next-page" ${state.page === totalPages ? "disabled" : ""}>Next →</button>
  `;

  document.getElementById("prev-page")?.addEventListener("click", () => {
    state.page -= 1;
    runSearch();
  });

  document.getElementById("next-page")?.addEventListener("click", () => {
    state.page += 1;
    runSearch();
  });
}

// 10. RENDERING — MODAL

async function openMovieModal(imdbID) {
  modalOverlay.classList.add("open");
  modalContent.innerHTML = `<p style="padding:2rem;">Loading details...</p>`;

  try {
    const movie = await getMovieDetails(imdbID);

    if (movie.Response === "False") {
      modalContent.innerHTML = `<p style="padding:2rem;">Could not load details: ${movie.Error}</p>`;
      return;
    }

    const poster =
      movie.Poster && movie.Poster !== "N/A"
        ? movie.Poster
        : "https://via.placeholder.com/300x445?text=No+Poster";

    const ratingsHTML = (movie.Ratings || [])
      .map((r) => `<span class="rating-badge">${r.Source}: ${r.Value}</span>`)
      .join("");

    modalContent.innerHTML = `
      <div class="modal-hero">
        <img class="modal-poster" src="${poster}" alt="${movie.Title} poster" />
        <div>
          <h2 class="modal-title">${movie.Title}</h2>
          <p class="modal-subtitle">${movie.Year} • ${movie.Runtime} • ${movie.Rated}</p>
          <div class="modal-ratings">${ratingsHTML}</div>
        </div>
      </div>
      <p class="modal-plot">${movie.Plot}</p>
      <div class="modal-detail-grid">
        <p><strong>Genre:</strong> ${movie.Genre}</p>
        <p><strong>Director:</strong> ${movie.Director}</p>
        <p><strong>Actors:</strong> ${movie.Actors}</p>
        <p><strong>Writer:</strong> ${movie.Writer}</p>
        <p><strong>Language:</strong> ${movie.Language}</p>
        <p><strong>Box Office:</strong> ${movie.BoxOffice || "N/A"}</p>
      </div>
    `;
  } catch (err) {
    modalContent.innerHTML = `<p style="padding:2rem;">Something went wrong loading this movie.</p>`;
    console.error(err);
  }
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

// 12. MAIN SEARCH FLOW

async function runSearch() {
  if (!state.query || state.query.length < 2) {
    setStatus("Search for a movie to get started 🍿");
    resultsGrid.innerHTML = "";
    paginationEl.innerHTML = "";
    return;
  }

  if (OMDB_API_KEY === "YOUR_API_KEY_HERE") {
    setStatus("Add your OMDb API key in script.js to enable search.", true);
    return;
  }

  setStatus("Searching...");
  renderSkeletons();

  try {
    const data = await searchMovies(state);

    if (data.Response === "False") {
      setStatus(data.Error || "No results found.", true);
      resultsGrid.innerHTML = "";
      paginationEl.innerHTML = "";
      return;
    }

    state.totalResults = Number(data.totalResults);
    setStatus(`Found ${state.totalResults} results for "${state.query}"`);
    renderMovies(data.Search);
    renderPagination();
  } catch (err) {
    if (err.name === "AbortError") return; // a newer search superseded this one
    console.error(err);
    setStatus("Something went wrong. Please try again.", true);
  }
}

// 13. EVENT WIRING

const debouncedSearch = debounce(() => {
  state.query = searchInput.value.trim();
  state.page = 1;
  runSearch();
}, 450);

searchInput.addEventListener("input", debouncedSearch);

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  state.query = searchInput.value.trim();
  state.page = 1;
  runSearch();
});

typeFilter.addEventListener("change", () => {
  state.type = typeFilter.value;
  state.page = 1;
  runSearch();
});

yearFilter.addEventListener("change", () => {
  state.year = yearFilter.value;
  state.page = 1;
  runSearch();
});

// 14. INIT

function init() {
  initTheme();
  populateYearFilter();
}

init();