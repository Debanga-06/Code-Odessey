/* ==========================================================
   109 — RANDOM USER GENERATOR
   Concepts practiced: async/await + fetch against a keyless API,
   using an API-returned seed to build a reproducible/shareable
   URL, reading query params on load to restore state, Unicode
   code-point math to build flag emoji from a country code,
   event delegation, localStorage for a saved-profiles list,
   clipboard API.
========================================================== */

// -----------------------------------------------------------
// 1. CONFIG
// -----------------------------------------------------------
// No API key needed — randomuser.me is open and keyless.
const API_BASE_URL = "https://randomuser.me/api/";

// -----------------------------------------------------------
// 2. DOM REFERENCES
// -----------------------------------------------------------
const body = document.body;
const themeButtons = document.querySelectorAll(".theme-btn");

const countSelect = document.getElementById("count-select");
const genderSelect = document.getElementById("gender-select");
const natSelect = document.getElementById("nat-select");
const generateBtn = document.getElementById("generate-btn");

const seedLabel = document.getElementById("seed-label");
const copySeedBtn = document.getElementById("copy-seed-btn");

const statusMessage = document.getElementById("status-message");
const resultsGrid = document.getElementById("results-grid");
const favoritesRow = document.getElementById("favorites-row");

const modalOverlay = document.getElementById("modal-overlay");
const modalContent = document.getElementById("modal-content");
const modalClose = document.getElementById("modal-close");

// -----------------------------------------------------------
// 3. STATE
// -----------------------------------------------------------
let currentUsers = [];
let currentSeed = null;

// -----------------------------------------------------------
// 4. THEME HANDLING
// -----------------------------------------------------------
function applyTheme(theme) {
  body.dataset.theme = theme;
  localStorage.setItem("randomuserapp-theme", theme);
  themeButtons.forEach((btn) => btn.classList.toggle("active", btn.dataset.theme === theme));
}

function initTheme() {
  applyTheme(localStorage.getItem("randomuserapp-theme") || "dark");
}

themeButtons.forEach((btn) => btn.addEventListener("click", () => applyTheme(btn.dataset.theme)));

// -----------------------------------------------------------
// 5. FORMATTING HELPERS
// -----------------------------------------------------------
function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

// Converts a two-letter country code (e.g. "us") into its flag
// emoji by mapping each letter to a Unicode "regional indicator"
// code point — flags are composed of two of these back to back.
function flagEmoji(countryCode) {
  if (!countryCode) return "";
  return countryCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}

// -----------------------------------------------------------
// 6. API CALL
// -----------------------------------------------------------
async function fetchUsers({ results, gender, nat, seed }) {
  const params = new URLSearchParams({ results });
  if (gender) params.set("gender", gender);
  if (nat) params.set("nat", nat);
  if (seed) params.set("seed", seed);

  const response = await fetch(`${API_BASE_URL}?${params}`);
  if (!response.ok) throw new Error(`Request failed (${response.status})`);
  return response.json(); // { results: [...], info: { seed, results, page, version } }
}

// -----------------------------------------------------------
// 7. GENERATING A BATCH
// -----------------------------------------------------------
async function generateUsers(seedOverride = null) {
  generateBtn.disabled = true;
  setStatus("Generating random users...");
  renderSkeletons(Number(countSelect.value));

  try {
    const data = await fetchUsers({
      results: countSelect.value,
      gender: genderSelect.value,
      nat: natSelect.value,
      seed: seedOverride,
    });

    currentUsers = data.results;
    currentSeed = data.info.seed;

    setStatus(`Showing ${currentUsers.length} random ${currentUsers.length === 1 ? "user" : "users"}`);
    renderUsers(currentUsers);
    renderSeedLabel();
  } catch (err) {
    console.error(err);
    setStatus("Couldn't generate users. Please try again.", true);
    resultsGrid.innerHTML = "";
  } finally {
    generateBtn.disabled = false;
  }
}

function renderSeedLabel() {
  seedLabel.textContent = currentSeed ? `Seed: ${currentSeed}` : "";
}

// -----------------------------------------------------------
// 8. RENDERING — RESULTS GRID
// -----------------------------------------------------------
function renderSkeletons(count = 12) {
  resultsGrid.innerHTML = Array.from({ length: count })
    .map(
      () => `
      <div class="skeleton-card">
        <div class="skeleton-avatar"></div>
        <div class="skeleton-lines">
          <div class="skeleton-line"></div>
          <div class="skeleton-line"></div>
        </div>
      </div>`
    )
    .join("");
}

function renderUsers(users) {
  resultsGrid.innerHTML = users
    .map(
      (user) => `
      <article class="profile-card" data-uuid="${user.login.uuid}">
        <button class="favorite-toggle ${isFavorited(user.login.uuid) ? "active" : ""}" data-action="favorite" data-uuid="${user.login.uuid}" title="Save this profile">
          ${isFavorited(user.login.uuid) ? "★" : "☆"}
        </button>
        <img class="profile-photo" src="${user.picture.medium}" alt="${user.name.first} ${user.name.last}" loading="lazy" />
        <div class="profile-info">
          <div class="profile-name">${user.name.first} ${user.name.last}</div>
          <div class="profile-detail">${user.email}</div>
          <div class="profile-detail">${user.location.city}, ${user.location.country}</div>
        </div>
      </article>`
    )
    .join("");
}

// Event delegation: handles both "open modal" (card click) and
// "toggle favorite" (star button click) with one listener.
resultsGrid.addEventListener("click", (event) => {
  const favoriteBtn = event.target.closest('[data-action="favorite"]');
  if (favoriteBtn) {
    event.stopPropagation();
    toggleFavorite(favoriteBtn.dataset.uuid);
    return;
  }

  const card = event.target.closest(".profile-card");
  if (card) openUserModal(card.dataset.uuid);
});

// -----------------------------------------------------------
// 9. RENDERING — MODAL
// -----------------------------------------------------------
function findUserByUuid(uuid) {
  return (
    currentUsers.find((u) => u.login.uuid === uuid) ||
    getFavorites().find((u) => u.login.uuid === uuid)
  );
}

function openUserModal(uuid) {
  const user = findUserByUuid(uuid);
  if (!user) return;

  modalContent.innerHTML = `
    <div class="modal-hero">
      <img class="modal-photo" src="${user.picture.large}" alt="${user.name.first} ${user.name.last}" />
      <div>
        <div class="modal-name">${flagEmoji(user.nat)} ${user.name.title} ${user.name.first} ${user.name.last}</div>
        <div class="modal-username">@${user.login.username}</div>
      </div>
    </div>
    <div class="modal-detail-grid">
      <p><strong>Email</strong>${user.email}</p>
      <p><strong>Gender</strong>${user.gender}</p>
      <p><strong>Phone</strong>${user.phone}</p>
      <p><strong>Cell</strong>${user.cell}</p>
      <p><strong>Date of Birth</strong>${formatDate(user.dob.date)} (age ${user.dob.age})</p>
      <p><strong>Registered</strong>${formatDate(user.registered.date)} (${user.registered.age} yrs ago)</p>
      <p class="modal-detail-full"><strong>Address</strong>${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country} ${user.location.postcode}</p>
      <p><strong>Coordinates</strong>${user.location.coordinates.latitude}, ${user.location.coordinates.longitude}</p>
      <p><strong>Timezone</strong>${user.location.timezone.description}</p>
      <p><strong>${user.id.name || "ID"}</strong>${user.id.value || "N/A"}</p>
    </div>
  `;

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

// -----------------------------------------------------------
// 10. FAVORITES (localStorage)
// -----------------------------------------------------------
function getFavorites() {
  return JSON.parse(localStorage.getItem("randomuserapp-favorites") || "[]");
}

function saveFavorites(list) {
  localStorage.setItem("randomuserapp-favorites", JSON.stringify(list));
}

function isFavorited(uuid) {
  return getFavorites().some((u) => u.login.uuid === uuid);
}

function toggleFavorite(uuid) {
  const user = findUserByUuid(uuid);
  if (!user) return;

  let favorites = getFavorites();
  favorites = isFavorited(uuid) ? favorites.filter((u) => u.login.uuid !== uuid) : [...favorites, user];

  saveFavorites(favorites);
  renderUsers(currentUsers); // refresh star state on visible cards
  renderFavorites();
}

function renderFavorites() {
  const favorites = getFavorites();

  if (favorites.length === 0) {
    favoritesRow.innerHTML = `<p class="favorites-empty">Star a profile to save it here.</p>`;
    return;
  }

  favoritesRow.innerHTML = favorites
    .map(
      (user) => `
      <button class="favorite-chip" data-uuid="${user.login.uuid}">
        <img src="${user.picture.thumbnail}" alt="${user.name.first}" />
        ${user.name.first} ${user.name.last}
        <span class="remove-chip" data-action="remove" data-uuid="${user.login.uuid}">✕</span>
      </button>`
    )
    .join("");
}

// Event delegation for both "open" and "remove" on favorite chips.
favoritesRow.addEventListener("click", (event) => {
  const removeBtn = event.target.closest('[data-action="remove"]');
  if (removeBtn) {
    event.stopPropagation();
    const favorites = getFavorites().filter((u) => u.login.uuid !== removeBtn.dataset.uuid);
    saveFavorites(favorites);
    renderFavorites();
    renderUsers(currentUsers); // in case the removed favorite is also on-screen
    return;
  }

  const chip = event.target.closest(".favorite-chip");
  if (chip) openUserModal(chip.dataset.uuid);
});

// -----------------------------------------------------------
// 11. SHAREABLE LINK (seed-based reproducibility)
// -----------------------------------------------------------
copySeedBtn.addEventListener("click", async () => {
  if (!currentSeed) return;

  const url = new URL(window.location.href);
  url.search = new URLSearchParams({
    seed: currentSeed,
    results: countSelect.value,
    gender: genderSelect.value,
    nat: natSelect.value,
  }).toString();

  try {
    await navigator.clipboard.writeText(url.toString());
    const original = copySeedBtn.textContent;
    copySeedBtn.textContent = "✅ Copied!";
    setTimeout(() => (copySeedBtn.textContent = original), 1500);
  } catch (err) {
    console.error("Clipboard write failed:", err);
  }
});

// -----------------------------------------------------------
// 12. STATUS MESSAGES
// -----------------------------------------------------------
function setStatus(message, isError = false) {
  statusMessage.textContent = message;
  statusMessage.classList.toggle("error", isError);
}

// -----------------------------------------------------------
// 13. EVENT WIRING
// -----------------------------------------------------------
generateBtn.addEventListener("click", () => generateUsers());

// -----------------------------------------------------------
// 14. INIT — restore a shared batch from URL params if present
// -----------------------------------------------------------
function init() {
  initTheme();
  renderFavorites();

  const params = new URLSearchParams(window.location.search);
  const sharedSeed = params.get("seed");

  if (sharedSeed) {
    if (params.get("results")) countSelect.value = params.get("results");
    if (params.get("gender")) genderSelect.value = params.get("gender");
    if (params.get("nat")) natSelect.value = params.get("nat");
    generateUsers(sharedSeed);
  } else {
    generateUsers();
  }
}

init();