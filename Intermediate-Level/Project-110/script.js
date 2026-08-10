/* ==========================================================
   110 — RECIPE FINDER
   Concepts practiced: async/await + fetch, checking the response
   BODY for success rather than trusting the HTTP status code
   (TheMealDB returns 200 with meals:null on no results), handling
   two endpoints that return differently-shaped data for the same
   entity (filter.php gives a minimal shape; a follow-up lookup.php
   call is needed for the full recipe), parsing fixed-numbered field
   groups (strIngredient1..20) into a clean array, event delegation,
   localStorage favorites.
========================================================== */

// -----------------------------------------------------------
// 1. CONFIG
// -----------------------------------------------------------
// MEALDB_API_KEY comes from config.js, loaded before this file in
// index.html. Unlike other projects in this series, "1" is a public
// SHARED test key by design — see README for when you'd swap it.
const API_BASE_URL = `https://www.themealdb.com/api/json/v1/${MEALDB_API_KEY}`;

// -----------------------------------------------------------
// 2. DOM REFERENCES
// -----------------------------------------------------------
const body = document.body;
const themeButtons = document.querySelectorAll(".theme-btn");

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const modeButtons = document.querySelectorAll(".mode-btn");
const surpriseBtn = document.getElementById("surprise-btn");
const categoryRow = document.getElementById("category-row");

const statusMessage = document.getElementById("status-message");
const resultsGrid = document.getElementById("results-grid");
const favoritesRow = document.getElementById("favorites-row");

const modalOverlay = document.getElementById("modal-overlay");
const modalContent = document.getElementById("modal-content");
const modalClose = document.getElementById("modal-close");

// -----------------------------------------------------------
// 3. STATE
// -----------------------------------------------------------
let state = {
  mode: "name", // "name" | "ingredient"
  activeCategory: null,
};

// Caches full recipe objects by id so a card we've already looked
// up in full (via search, random, or a previous lookup) never
// triggers a second network request for the same recipe.
const fullRecipeCache = new Map();

// -----------------------------------------------------------
// 4. THEME HANDLING
// -----------------------------------------------------------
function applyTheme(theme) {
  body.dataset.theme = theme;
  localStorage.setItem("recipeapp-theme", theme);
  themeButtons.forEach((btn) => btn.classList.toggle("active", btn.dataset.theme === theme));
}

function initTheme() {
  applyTheme(localStorage.getItem("recipeapp-theme") || "dark");
}

themeButtons.forEach((btn) => btn.addEventListener("click", () => applyTheme(btn.dataset.theme)));

// -----------------------------------------------------------
// 5. MODE TOGGLE (search by name vs. by ingredient)
// -----------------------------------------------------------
modeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    state.mode = btn.dataset.mode;
    modeButtons.forEach((b) => b.classList.toggle("active", b === btn));
    searchInput.placeholder =
      state.mode === "name" ? "Search by dish name (e.g. Arrabiata)..." : "Search by ingredient (e.g. chicken)...";
  });
});

// -----------------------------------------------------------
// 6. API CALLS
// -----------------------------------------------------------
// TheMealDB returns HTTP 200 even when nothing matches — the real
// signal is whether `meals` is null. Every call below checks the
// body, never the status code, for success.
async function searchByName(query) {
  const response = await fetch(`${API_BASE_URL}/search.php?s=${encodeURIComponent(query)}`);
  const data = await response.json();
  return data.meals || []; // full shape — includes ingredients + instructions
}

async function filterByIngredient(ingredient) {
  const response = await fetch(`${API_BASE_URL}/filter.php?i=${encodeURIComponent(ingredient)}`);
  const data = await response.json();
  return data.meals || []; // MINIMAL shape — id, name, thumbnail only
}

async function filterByCategory(category) {
  const response = await fetch(`${API_BASE_URL}/filter.php?c=${encodeURIComponent(category)}`);
  const data = await response.json();
  return data.meals || []; // MINIMAL shape, same as filterByIngredient
}

async function lookupById(id) {
  if (fullRecipeCache.has(id)) return fullRecipeCache.get(id); // avoid a repeat fetch

  const response = await fetch(`${API_BASE_URL}/lookup.php?i=${id}`);
  const data = await response.json();
  const meal = data.meals?.[0] || null;
  if (meal) fullRecipeCache.set(id, meal);
  return meal;
}

async function fetchRandomMeal() {
  const response = await fetch(`${API_BASE_URL}/random.php`);
  const data = await response.json();
  return data.meals?.[0] || null; // full shape
}

async function fetchCategories() {
  const response = await fetch(`${API_BASE_URL}/categories.php`);
  const data = await response.json();
  return data.categories || [];
}

// -----------------------------------------------------------
// 7. CATEGORY CHIPS
// -----------------------------------------------------------
async function loadCategories() {
  try {
    const categories = await fetchCategories();
    categoryRow.innerHTML = categories
      .map((c) => `<button class="category-chip" data-category="${c.strCategory}">${c.strCategory}</button>`)
      .join("");
  } catch (err) {
    console.error(err); // category chips are a nice-to-have, not critical — fail silently
  }
}

categoryRow.addEventListener("click", (event) => {
  const chip = event.target.closest(".category-chip");
  if (!chip) return;

  const isReselecting = state.activeCategory === chip.dataset.category;
  document.querySelectorAll(".category-chip").forEach((c) => c.classList.remove("active"));

  if (isReselecting) {
    state.activeCategory = null;
    return;
  }

  state.activeCategory = chip.dataset.category;
  chip.classList.add("active");
  runCategoryFilter(state.activeCategory);
});

async function runCategoryFilter(category) {
  setStatus(`Loading "${category}" recipes...`);
  renderSkeletons();

  try {
    const meals = await filterByCategory(category);
    handleResults(meals, `in ${category}`);
  } catch (err) {
    console.error(err);
    setStatus("Couldn't load that category. Please try again.", true);
  }
}

// -----------------------------------------------------------
// 8. MAIN SEARCH FLOW
// -----------------------------------------------------------
searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const query = searchInput.value.trim();
  if (!query) return;

  document.querySelectorAll(".category-chip").forEach((c) => c.classList.remove("active"));
  state.activeCategory = null;

  setStatus(`Searching for "${query}"...`);
  renderSkeletons();

  try {
    const meals = state.mode === "name" ? await searchByName(query) : await filterByIngredient(query);
    handleResults(meals, `for "${query}"`);
  } catch (err) {
    console.error(err);
    setStatus("Something went wrong. Please try again.", true);
  }
});

function handleResults(meals, contextLabel) {
  if (meals.length === 0) {
    setStatus(`No recipes found ${contextLabel}.`, true);
    resultsGrid.innerHTML = "";
    return;
  }

  // Cache any full-shaped results (from search.php) so opening
  // their card later doesn't trigger a redundant lookup.php call.
  meals.forEach((m) => {
    if (m.strInstructions) fullRecipeCache.set(m.idMeal, m);
  });

  setStatus(`Found ${meals.length} recipe${meals.length === 1 ? "" : "s"} ${contextLabel}`);
  renderResults(meals);
}

// -----------------------------------------------------------
// 9. SURPRISE ME
// -----------------------------------------------------------
surpriseBtn.addEventListener("click", async () => {
  setStatus("Picking something random...");
  renderSkeletons(1);

  try {
    const meal = await fetchRandomMeal();
    if (!meal) throw new Error("No meal returned");

    fullRecipeCache.set(meal.idMeal, meal);
    setStatus("Here's a random pick for you!");
    renderResults([meal]);
    openRecipeModal(meal.idMeal); // jump straight to the details for a "surprise"
  } catch (err) {
    console.error(err);
    setStatus("Couldn't fetch a random recipe. Please try again.", true);
  }
});

// -----------------------------------------------------------
// 10. RENDERING — RESULTS GRID
// -----------------------------------------------------------
function renderSkeletons(count = 8) {
  resultsGrid.innerHTML = Array.from({ length: count })
    .map(() => `<div class="skeleton-card"><div class="skeleton-thumb"></div></div>`)
    .join("");
}

function renderResults(meals) {
  resultsGrid.innerHTML = meals
    .map(
      (meal) => `
      <article class="recipe-card" data-id="${meal.idMeal}">
        <button class="favorite-toggle ${isFavorited(meal.idMeal) ? "active" : ""}" data-action="favorite" data-id="${meal.idMeal}" title="Save this recipe">
          ${isFavorited(meal.idMeal) ? "★" : "☆"}
        </button>
        <img class="recipe-thumb" src="${meal.strMealThumb}" alt="${meal.strMeal}" loading="lazy" />
        <div class="recipe-info">
          <div class="recipe-name">${meal.strMeal}</div>
        </div>
      </article>`
    )
    .join("");
}

// Event delegation: distinguishes a favorite-star click from a
// card click, same pattern used for the favorites chip row below.
resultsGrid.addEventListener("click", (event) => {
  const favoriteBtn = event.target.closest('[data-action="favorite"]');
  if (favoriteBtn) {
    event.stopPropagation();
    toggleFavoriteById(favoriteBtn.dataset.id);
    return;
  }

  const card = event.target.closest(".recipe-card");
  if (card) openRecipeModal(card.dataset.id);
});

// -----------------------------------------------------------
// 11. RENDERING — MODAL (the dual-endpoint handling happens here)
// -----------------------------------------------------------
async function openRecipeModal(id) {
  modalOverlay.classList.add("open");
  modalContent.innerHTML = `<p style="padding:2rem;">Loading recipe...</p>`;

  // filter.php results don't include ingredients/instructions —
  // only a lookup.php call returns the full recipe. The cache means
  // we only pay that cost once per recipe, no matter how it was found.
  const meal = fullRecipeCache.has(id) ? fullRecipeCache.get(id) : await lookupById(id);

  if (!meal) {
    modalContent.innerHTML = `<p style="padding:2rem;">Couldn't load this recipe.</p>`;
    return;
  }

  renderRecipeModal(meal);
}

function renderRecipeModal(meal) {
  const ingredients = getIngredients(meal);
  const steps = getInstructionSteps(meal);
  const favorited = isFavorited(meal.idMeal);

  modalContent.innerHTML = `
    <img class="modal-hero-img" src="${meal.strMealThumb}" alt="${meal.strMeal}" />
    <div class="modal-body">
      <h2 class="modal-title">${meal.strMeal}</h2>
      <div class="modal-tags">
        ${meal.strCategory ? `<span class="modal-tag">${meal.strCategory}</span>` : ""}
        ${meal.strArea ? `<span class="modal-tag">${meal.strArea}</span>` : ""}
      </div>

      <div class="modal-section-title">Ingredients</div>
      <ul class="ingredients-list">
        ${ingredients.map((i) => `<li class="ingredient-item">${i.measure} ${i.ingredient}</li>`).join("")}
      </ul>

      <div class="modal-section-title">Instructions</div>
      <ol class="instructions-list">
        ${steps.map((step) => `<li class="instruction-step">${step}</li>`).join("")}
      </ol>

      <div class="modal-links">
        ${meal.strYoutube ? `<a class="modal-link" href="${meal.strYoutube}" target="_blank" rel="noopener noreferrer">▶ Watch on YouTube</a>` : ""}
        ${meal.strSource ? `<a class="modal-link" href="${meal.strSource}" target="_blank" rel="noopener noreferrer">🔗 Original Source</a>` : ""}
      </div>

      <button class="modal-favorite-btn ${favorited ? "active" : ""}" id="modal-favorite-btn">
        ${favorited ? "★ Saved" : "☆ Save Recipe"}
      </button>
    </div>
  `;

  document.getElementById("modal-favorite-btn").addEventListener("click", () => {
    toggleFavoriteById(meal.idMeal);
    renderRecipeModal(meal); // refresh the button state in place
  });
}

// Loops the fixed strIngredientN / strMeasureN field pairs (1–20)
// TheMealDB uses instead of a proper array, skipping any that are
// empty — a common shape for APIs that started small and grew.
function getIngredients(meal) {
  const list = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      list.push({ ingredient: ingredient.trim(), measure: (measure || "").trim() });
    }
  }
  return list;
}

function getInstructionSteps(meal) {
  return (meal.strInstructions || "")
    .split(/\r?\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
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
// 12. FAVORITES (localStorage)
// -----------------------------------------------------------
function getFavorites() {
  return JSON.parse(localStorage.getItem("recipeapp-favorites") || "[]");
}

function saveFavoritesList(list) {
  localStorage.setItem("recipeapp-favorites", JSON.stringify(list));
}

function isFavorited(id) {
  return getFavorites().some((f) => f.idMeal === id);
}

function toggleFavoriteById(id) {
  let favorites = getFavorites();

  if (isFavorited(id)) {
    favorites = favorites.filter((f) => f.idMeal !== id);
  } else {
    const meal = fullRecipeCache.get(id);
    favorites.push({ idMeal: id, strMeal: meal?.strMeal || "Recipe", strMealThumb: meal?.strMealThumb || "" });
  }

  saveFavoritesList(favorites);
  renderFavorites();

  // Refresh the star on any matching card currently visible.
  document.querySelectorAll(`.favorite-toggle[data-id="${id}"]`).forEach((btn) => {
    const active = isFavorited(id);
    btn.classList.toggle("active", active);
    btn.textContent = active ? "★" : "☆";
  });
}

function renderFavorites() {
  const favorites = getFavorites();

  if (favorites.length === 0) {
    favoritesRow.innerHTML = `<p class="favorites-empty">Star a recipe to save it here.</p>`;
    return;
  }

  favoritesRow.innerHTML = favorites
    .map(
      (f) => `
      <button class="favorite-chip" data-id="${f.idMeal}">
        <img src="${f.strMealThumb}" alt="${f.strMeal}" />
        ${f.strMeal}
        <span class="remove-chip" data-action="remove" data-id="${f.idMeal}">✕</span>
      </button>`
    )
    .join("");
}

favoritesRow.addEventListener("click", (event) => {
  const removeBtn = event.target.closest('[data-action="remove"]');
  if (removeBtn) {
    event.stopPropagation();
    const favorites = getFavorites().filter((f) => f.idMeal !== removeBtn.dataset.id);
    saveFavoritesList(favorites);
    renderFavorites();
    return;
  }

  const chip = event.target.closest(".favorite-chip");
  if (chip) openRecipeModal(chip.dataset.id);
});

// -----------------------------------------------------------
// 13. STATUS MESSAGES
// -----------------------------------------------------------
function setStatus(message, isError = false) {
  statusMessage.textContent = message;
  statusMessage.classList.toggle("error", isError);
}

// -----------------------------------------------------------
// 14. INIT
// -----------------------------------------------------------
function init() {
  initTheme();
  renderFavorites();
  loadCategories();
}

init();