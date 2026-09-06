// UNSPLASH_ACCESS_KEY comes from config.js, loaded before this file
// in index.html. config.js is gitignored so the real key never
// gets committed — config.example.js shows the expected shape.
const API_BASE_URL = "https://api.unsplash.com";
const PER_PAGE = 20;

// Unsplash's API Guidelines require every photo credit to link back
// to the photographer and to Unsplash with these UTM parameters —
// this isn't optional styling, it's a term of using the API.
const UTM_PARAMS = "utm_source=code_odysseys_112&utm_medium=referral";

const body = document.body;
const themeButtons = document.querySelectorAll(".theme-btn");

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const orientationButtons = document.querySelectorAll(".orientation-btn");
const surpriseBtn = document.getElementById("surprise-btn");

const statusMessage = document.getElementById("status-message");
const resultsGrid = document.getElementById("results-grid");
const loadMoreBtn = document.getElementById("load-more-btn");
const favoritesRow = document.getElementById("favorites-row");

const modalOverlay = document.getElementById("modal-overlay");
const modalContent = document.getElementById("modal-content");
const modalClose = document.getElementById("modal-close");

let state = {
  query: "",
  orientation: "",
  page: 1,
  totalPages: 1,
};

const photoCache = new Map(); // id -> photo object, so the modal/favorites never need a re-fetch

function applyTheme(theme) {
  body.dataset.theme = theme;
  localStorage.setItem("unsplashapp-theme", theme);
  themeButtons.forEach((btn) => btn.classList.toggle("active", btn.dataset.theme === theme));
}

function initTheme() {
  applyTheme(localStorage.getItem("unsplashapp-theme") || "dark");
}

themeButtons.forEach((btn) => btn.addEventListener("click", () => applyTheme(btn.dataset.theme)));

orientationButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    orientationButtons.forEach((b) => b.classList.toggle("active", b === btn));
    state.orientation = btn.dataset.orientation;
    if (state.query) runSearch(state.query, 1, false);
  });
});

function authHeaders() {
  return { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` };
}

async function searchPhotos(query, page, orientation) {
  const params = new URLSearchParams({ query, page, per_page: PER_PAGE });
  if (orientation) params.set("orientation", orientation);

  const response = await fetch(`${API_BASE_URL}/search/photos?${params}`, { headers: authHeaders() });
  if (!response.ok) throw new Error(response.status === 401 ? "Invalid API key" : `Request failed (${response.status})`);
  return response.json();
}

async function fetchRandomPhoto(query) {
  const params = new URLSearchParams();
  if (query) params.set("query", query);

  const response = await fetch(`${API_BASE_URL}/photos/random?${params}`, { headers: authHeaders() });
  if (!response.ok) throw new Error(response.status === 401 ? "Invalid API key" : `Request failed (${response.status})`);
  return response.json();
}

// Unsplash's API Guidelines require pinging this endpoint every time
// a user downloads a photo through your app — separate from actually
// fetching the image bytes. It's how photographers get download credit.
// This is a deliberate "fire and forget": we don't block the user's
// download waiting on it, and a failure here shouldn't block anything.
function trackDownload(photo) {
  fetch(photo.links.download_location, { headers: authHeaders() }).catch((err) =>
    console.error("Download tracking failed (non-blocking):", err)
  );
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = searchInput.value.trim();
  if (!query) return;
  runSearch(query, 1, false);
});

async function runSearch(query, page, append) {
  state.query = query;
  state.page = page;

  if (!append) {
    setStatus(`Searching for "${query}"...`);
    renderSkeletons();
    resultsGrid.innerHTML = "";
  }

  loadMoreBtn.disabled = true;

  try {
    const data = await searchPhotos(query, page, state.orientation);
    state.totalPages = data.total_pages;

    data.results.forEach((p) => photoCache.set(p.id, p));

    if (data.results.length === 0 && page === 1) {
      setStatus(`No photos found for "${query}".`, true);
      resultsGrid.innerHTML = "";
      loadMoreBtn.hidden = true;
      return;
    }

    setStatus(`Showing results for "${query}" (${data.total.toLocaleString()} total)`);
    renderResults(data.results, append);
    loadMoreBtn.hidden = page >= state.totalPages;
  } catch (err) {
    console.error(err);
    setStatus(
      err.message === "Invalid API key" ? "Invalid API key — check config.js." : "Something went wrong. Please try again.",
      true
    );
  } finally {
    loadMoreBtn.disabled = false;
  }
}

loadMoreBtn.addEventListener("click", () => {
  runSearch(state.query, state.page + 1, true);
});

surpriseBtn.addEventListener("click", async () => {
  setStatus("Finding something inspiring...");

  try {
    const photo = await fetchRandomPhoto(searchInput.value.trim());
    photoCache.set(photo.id, photo);
    setStatus("Here's something for inspiration!");
    renderResults([photo], false); // surprise replaces the grid with just this one highlighted pick
    openPhotoModal(photo.id);
    loadMoreBtn.hidden = true;
  } catch (err) {
    console.error(err);
    setStatus("Couldn't fetch a random photo. Please try again.", true);
  }
});

function renderSkeletons(count = 12) {
  const heights = [180, 240, 300, 220, 260, 190];
  resultsGrid.innerHTML = Array.from({ length: count })
    .map((_, i) => `<div class="skeleton-card" style="height:${heights[i % heights.length]}px;"></div>`)
    .join("");
}

function renderResults(photos, append) {
  const html = photos
    .map(
      (photo) => `
      <article class="photo-card" data-id="${photo.id}">
        <button class="favorite-toggle ${isFavorited(photo.id) ? "active" : ""}" data-action="favorite" data-id="${photo.id}" title="Save this photo">
          ${isFavorited(photo.id) ? "★" : "☆"}
        </button>
        <img class="photo-img" src="${photo.urls.small}" alt="${photo.alt_description || "Unsplash photo"}" loading="lazy" />
        <div class="photo-credit">
          By <a href="${withUtm(photo.user.links.html)}" target="_blank" rel="noopener noreferrer" data-stop>${photo.user.name}</a> on
          <a href="https://unsplash.com/?${UTM_PARAMS}" target="_blank" rel="noopener noreferrer" data-stop>Unsplash</a>
        </div>
      </article>`
    )
    .join("");

  resultsGrid.innerHTML = append ? resultsGrid.innerHTML + html : html;
}

function withUtm(url) {
  return `${url}${url.includes("?") ? "&" : "?"}${UTM_PARAMS}`;
}

// Event delegation: handles favorite toggling and card clicks, while
// letting the attribution links inside a card (marked data-stop) work
// normally without also opening the modal.
resultsGrid.addEventListener("click", (event) => {
  if (event.target.closest("[data-stop]")) return; // let the credit links navigate normally

  const favoriteBtn = event.target.closest('[data-action="favorite"]');
  if (favoriteBtn) {
    event.stopPropagation();
    toggleFavorite(favoriteBtn.dataset.id);
    return;
  }

  const card = event.target.closest(".photo-card");
  if (card) openPhotoModal(card.dataset.id);
});

function openPhotoModal(id) {
  const photo = photoCache.get(id);
  if (!photo) return;

  modalContent.innerHTML = `
    <img class="modal-img" src="${photo.urls.regular}" alt="${photo.alt_description || "Unsplash photo"}" />
    <div class="modal-body">
      <div class="modal-user-row">
        <img class="modal-avatar" src="${photo.user.profile_image.medium}" alt="${photo.user.name}" />
        <div>
          <div class="modal-username">${photo.user.name}</div>
          <a class="modal-userlink" href="${withUtm(photo.user.links.html)}" target="_blank" rel="noopener noreferrer">@${photo.user.username}</a>
        </div>
      </div>
      ${photo.description || photo.alt_description ? `<p class="modal-desc">${photo.description || photo.alt_description}</p>` : ""}
      <div class="modal-actions">
        <button class="modal-action-btn primary" id="download-btn">⬇️ Download</button>
        <a class="modal-action-btn" href="${withUtm(photo.links.html)}" target="_blank" rel="noopener noreferrer">🔗 View on Unsplash</a>
        <button class="modal-action-btn" id="modal-favorite-btn">${isFavorited(photo.id) ? "★ Saved" : "☆ Save Photo"}</button>
      </div>
      <p class="modal-attribution-note">Photo by ${photo.user.name} on Unsplash — free to use under the Unsplash License.</p>
    </div>
  `;

  document.getElementById("download-btn").addEventListener("click", () => {
    trackDownload(photo); // required tracking ping, fire-and-forget
    window.open(photo.urls.full, "_blank", "noopener,noreferrer");
  });

  document.getElementById("modal-favorite-btn").addEventListener("click", () => {
    toggleFavorite(photo.id);
    openPhotoModal(photo.id); // refresh button state in place
  });

  modalOverlay.classList.add("open");
}

function closeModal() {
  modalOverlay.classList.remove("open");
}

modalClose.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", (event) => {
  if (event.target === modalOverlay) closeModal();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});

function getFavorites() {
  return JSON.parse(localStorage.getItem("unsplashapp-favorites") || "[]");
}

function saveFavorites(list) {
  localStorage.setItem("unsplashapp-favorites", JSON.stringify(list));
}

function isFavorited(id) {
  return getFavorites().some((f) => f.id === id);
}

function toggleFavorite(id) {
  let favorites = getFavorites();

  if (isFavorited(id)) {
    favorites = favorites.filter((f) => f.id !== id);
  } else {
    const photo = photoCache.get(id);
    if (photo) {
      favorites.push({
        id: photo.id,
        thumb: photo.urls.thumb,
        userName: photo.user.name,
      });
    }
  }

  saveFavorites(favorites);
  renderFavorites();

  document.querySelectorAll(`.favorite-toggle[data-id="${id}"]`).forEach((btn) => {
    const active = isFavorited(id);
    btn.classList.toggle("active", active);
    btn.textContent = active ? "★" : "☆";
  });
}

function renderFavorites() {
  const favorites = getFavorites();

  if (favorites.length === 0) {
    favoritesRow.innerHTML = `<p class="favorites-empty">Star a photo to save it here.</p>`;
    return;
  }

  favoritesRow.innerHTML = favorites
    .map(
      (f) => `
      <button class="favorite-chip" data-id="${f.id}">
        <img src="${f.thumb}" alt="Photo by ${f.userName}" />
        ${f.userName}
        <span class="remove-chip" data-action="remove" data-id="${f.id}">✕</span>
      </button>`
    )
    .join("");
}

favoritesRow.addEventListener("click", (event) => {
  const removeBtn = event.target.closest('[data-action="remove"]');
  if (removeBtn) {
    event.stopPropagation();
    const favorites = getFavorites().filter((f) => f.id !== removeBtn.dataset.id);
    saveFavorites(favorites);
    renderFavorites();
    return;
  }

  const chip = event.target.closest(".favorite-chip");
  if (chip && photoCache.has(chip.dataset.id)) {
    openPhotoModal(chip.dataset.id);
  } else if (chip) {
    // Favorited on a previous session/page load — we only stored a thumbnail,
    // not the full photo object, so there isn't enough cached data to open
    // the full modal. This is a deliberate trade-off; see README.
    window.open(`https://unsplash.com/photos/${chip.dataset.id}?${UTM_PARAMS}`, "_blank", "noopener,noreferrer");
  }
});

function setStatus(message, isError = false) {
  statusMessage.textContent = message;
  statusMessage.classList.toggle("error", isError);
}

function init() {
  initTheme();
  renderFavorites();

  if (typeof UNSPLASH_ACCESS_KEY === "undefined" || UNSPLASH_ACCESS_KEY === "YOUR_ACCESS_KEY_HERE") {
    setStatus("Add your Unsplash Access Key in config.js to get started.", true);
  }
}

init();