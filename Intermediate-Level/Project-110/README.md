# Recipe Finder - API Integration 🍲

![Project Status](https://img.shields.io/badge/status-completed-success)
![Difficulty](https://img.shields.io/badge/difficulty-intermediate-orange)
![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![API](https://img.shields.io/badge/API-TheMealDB-e74c3c)

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

A **production-ready recipe finder** built on [TheMealDB](https://www.themealdb.com/api.php),
demonstrating a subtle but common real-world API pattern: **the same kind of data comes back
in two different shapes depending on which endpoint you hit**. Searching by name returns a
full recipe (ingredients, instructions, video link, everything); filtering by ingredient or
category returns only an id, a name, and a thumbnail — you have to make a *second* request to
get the full recipe. This app handles that transparently, with a cache so you never fetch the
same full recipe twice.

**Live Demo:** *(add your deployed link here once hosted)*

## ✨ Features

### Core Functionality
- 🔍 **Search by Name** - Full recipe results directly, no follow-up request needed
- 🥕 **Search by Ingredient** - Toggle to find recipes containing a specific ingredient
- 🏷️ **Category Browsing** - Chip row populated from the API's live category list
- 🎲 **Surprise Me** - Pulls one fully-random recipe and jumps straight to its details
- 📋 **Full Recipe Modal** - Ingredients with measurements, numbered instructions, category/area tags, and links to the source video/article
- ⭐ **Saved Recipes** - Star any card to keep it in a persistent favorites list

### Technical Features
- ⚡ **Async/Await** - Modern asynchronous JavaScript patterns
- 🧩 **Dual-Endpoint Handling** - Transparently fetches full recipe details only when the initial result didn't already include them
- 💾 **Full-Recipe Cache** - A `Map` keyed by recipe id avoids ever re-fetching a recipe you've already loaded in full
- 🔍 **Body-Based Success Checking** - Reads `meals: null` from the response body instead of trusting a 200 status code, since TheMealDB returns 200 even on "no results"
- 🔢 **Fixed-Field Parsing** - Loops `strIngredient1`–`strIngredient20` / `strMeasure1`–`strMeasure20` into a clean array, skipping empty slots
- 🛡️ **Error Handling** - Distinguishes "no results" from a genuine network failure
- 💾 **localStorage Favorites** - Saved recipes persist across sessions, independent of the current search results
- 🖱️ **Event Delegation** - One listener each for result-card interactions and favorite-chip interactions
- 🎨 **Theme Switcher** - Dark, light, and retro themes, persisted in localStorage

## 🎓 Learning Outcomes

This intermediate project teaches:

1. **Fetch API** - Making HTTP requests to an external API
2. **Async/Await** - Modern asynchronous JavaScript syntax
3. **Handling Inconsistent Response Shapes** - Recognizing when two endpoints for "the same kind of thing" don't return the same fields, and writing code that adapts instead of assuming
4. **Checking the Body, Not the Status Code** - A response can be `200 OK` and still represent "nothing found" — this API is a clean example of why that check matters
5. **Caching to Avoid Redundant Requests** - Using a `Map` to remember what's already been fully fetched
6. **Parsing Numbered Field Groups** - Looping `field1`...`field20` style API responses into a proper array, a pattern older/simpler APIs still use
7. **Event Delegation with Multiple Actions** - Distinguishing a favorite-star click from a card click within one listener via `event.stopPropagation()`
8. **localStorage CRUD** - Storing enough data (not just an id) so a favorited recipe's chip still works even if it's no longer in the current search results
9. **String Parsing** - Splitting a single instructions blob into discrete numbered steps
10. **Error Handling** - Try-catch blocks with a user-facing fallback message
11. **State Management** - Tracking search mode, active category, and loaded data together
12. **CSS Custom Properties** - Reusing a multi-theme system across projects

## 🛠️ Technologies Used

- **HTML5** - Semantic markup structure
- **CSS3** - Custom properties for theming, responsive card grid
- **JavaScript ES6+** - Async/await, fetch API, `Map`, template literals
- **TheMealDB API** - Recipe search, filtering, and full recipe lookups

## 🔑 API Setup

TheMealDB works a little differently from most APIs in this series: instead of signing up for
a private key, development and learning use is covered by a **public, shared test key: `1`**.
It's meant to be used exactly as-is — no signup, no account, nothing to keep secret.

```javascript
const MEALDB_API_KEY = "1"; // shared test key, safe to commit
```

This is already set in `config.js` — **there's nothing you need to configure to run this app.**

> **When you'd need your own key:** if you ever publish this as a real app (app store, wide
> public traffic) or want the premium v2 features (multi-ingredient filtering, higher limits),
> TheMealDB asks you to become a supporter via Patreon, and they'll email you a private key to
> swap in for `"1"`. At that point — and only then — treat `config.js` like the gitignored
> secret it is in the other projects in this series.

## 📁 Project Structure

```
Recipe-Finder/
│
├── index.html            # Markup
├── style.css               # CSS-variable-based theming, card grid, modal
├── script.js                # API calls, dual-endpoint handling, rendering, favorites
├── config.js                 # Holds MEALDB_API_KEY ("1" by default — safe to commit)
├── config.example.js         # Same shape, for anyone who swaps in a supporter key later
└── README.md                  # This file
```

## 🚀 Installation

### Method 1: Direct Download

1. **Download the files**
   ```bash
   git clone https://github.com/your-username/Code-Odysseys.git
   cd Code-Odysseys/Recipe-Finder
   ```

2. **Open in browser** — no configuration needed
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

### Searching by Name

1. Make sure **By Name** is selected (it's the default)
2. Type a dish name — try `Arrabiata` or `Chicken`
3. Results already contain full recipe data, so opening one is instant

### Searching by Ingredient

1. Click **By Ingredient**
2. Type an ingredient — try `chicken breast` or `salmon`
3. These results are minimal (photo + name only) — clicking one triggers a quick follow-up fetch for the full recipe, which you likely won't even notice

### Browsing by Category

Click any category chip (Seafood, Dessert, Vegetarian, etc.) to filter — click it again to clear the filter.

### Surprise Me

Click **🎲 Surprise Me** for one fully random recipe, opened straight into its details modal.

### Saving Recipes

Click the ☆ on any card (or the "Save Recipe" button inside the modal) to star it. It appears under **Saved Recipes** and persists across reloads.

## 🔗 API Integration Details

### Endpoints Used

| Endpoint | Returns | Shape |
|---|---|---|
| `search.php?s={name}` | Recipes matching a name | **Full** — includes ingredients + instructions |
| `filter.php?i={ingredient}` | Recipes containing an ingredient | **Minimal** — id, name, thumbnail only |
| `filter.php?c={category}` | Recipes in a category | **Minimal** — same as above |
| `lookup.php?i={id}` | One recipe by id | **Full** — used to "upgrade" a minimal result |
| `random.php` | One random recipe | **Full** |
| `categories.php` | All categories | Full category objects, used for the chip row |

**Search Response Example (full shape, trimmed):**
```json
{
  "meals": [
    {
      "idMeal": "52771",
      "strMeal": "Spicy Arrabiata Penne",
      "strCategory": "Vegetarian",
      "strArea": "Italian",
      "strInstructions": "Bring a large pot of water to a boil...",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
      "strIngredient1": "penne rigate",
      "strMeasure1": "1 pound",
      "strYoutube": "https://www.youtube.com/watch?v=1IszT_guI08"
    }
  ]
}
```

**Filter Response Example (minimal shape — no ingredients or instructions):**
```json
{
  "meals": [
    { "strMeal": "Teriyaki Chicken Casserole", "strMealThumb": "https://...", "idMeal": "52772" }
  ]
}
```

**No Results:**
```json
{ "meals": null }
```
Note this is still an HTTP `200` — the empty state is only visible in the body.

### API Call Flow

```
User searches by name → search.php returns FULL recipes → cache them → render cards
        │
User searches by ingredient / picks a category → filter.php returns MINIMAL
recipes → render cards (no caching yet — nothing full to cache)
        ↓
User clicks any card → already cached in full? ──Yes──▶ open modal instantly
        │
        No
        ↓
lookup.php?i={id} → cache the full result → open modal
```

## 🔍 Code Walkthrough

### 1. Checking the Body, Not the Status Code

```javascript
async function searchByName(query) {
  const response = await fetch(`${API_BASE_URL}/search.php?s=${encodeURIComponent(query)}`);
  const data = await response.json();
  return data.meals || []; // response.ok is true even when meals is null
}
```

### 2. Upgrading a Minimal Result to a Full One, With Caching

```javascript
async function openRecipeModal(id) {
  const meal = fullRecipeCache.has(id) ? fullRecipeCache.get(id) : await lookupById(id);
  renderRecipeModal(meal);
}

async function lookupById(id) {
  if (fullRecipeCache.has(id)) return fullRecipeCache.get(id); // short-circuit, no fetch
  const response = await fetch(`${API_BASE_URL}/lookup.php?i=${id}`);
  const data = await response.json();
  const meal = data.meals?.[0] || null;
  if (meal) fullRecipeCache.set(id, meal);
  return meal;
}
```

### 3. Parsing Numbered Ingredient Fields

```javascript
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
```

### 4. Splitting Instructions Into Numbered Steps

```javascript
function getInstructionSteps(meal) {
  return (meal.strInstructions || "")
    .split(/\r?\n+/)
    .map((line) => line.trim())
    .filter(Boolean); // drop blank lines some recipes include
}
```

## 🛡️ Error Handling

### Error Types & Messages

| Error | User Message | Technical Cause |
|---|---|---|
| No matches | `No recipes found for "{query}".` | `meals: null` in the response body, not an HTTP error |
| Network failure | "Something went wrong. Please try again." | No internet / API down |
| Random fetch fails | "Couldn't fetch a random recipe. Please try again." | Rare, but `random.php` can occasionally return no meal |
| Categories fail to load | (chip row silently stays empty) | Treated as non-critical — the rest of the app still works |

### Error State UI

```javascript
function setStatus(message, isError = false) {
  statusMessage.textContent = message;
  statusMessage.classList.toggle("error", isError);
}
```

## 🎨 Customization Guide

### Add "By Area" Browsing

TheMealDB also supports `filter.php?a={area}` (e.g. Italian, Mexican) and `list.php?a=list` to get all areas — add a third mode alongside Name/Ingredient using the exact same minimal-then-lookup pattern already built.

### Add a Print/Shopping-List View

Reuse `getIngredients()` to render a clean, checkbox-per-ingredient shopping list separate from the recipe modal.

### Add Multi-Ingredient Filtering

This requires TheMealDB's premium v2 API (supporter key required) — a good real-world example of a feature gated behind upgrading from a shared test key to a personal one.

### Change Color Theme

Add a new theme block in `style.css` and a matching button in `index.html`:

```css
body[data-theme="citrus"] {
  --bg: #1a1400;
  --bg-elevated: #2b2300;
  --text: #fff8e6;
  --accent: #ffb703;
  --accent-text: #1a1400;
  --border: #3d3200;
}
```

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub** — `config.js` is fine to commit here, since `"1"` isn't a secret

2. **Import in Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your repository
   - Click "Deploy"

No environment variables or CORS setup needed — this is one of the simpler deploys in the series.

### Security Best Practices

⚠️ This project is the exception to the usual rule in this series: **`config.js` does NOT need to be gitignored** while it holds the shared test key `"1"`. If you later swap in a real Patreon supporter key, add `config.js` to `.gitignore` at that point and follow the same pattern used in projects 103, 106, 107, and 105 — a `config.example.js` placeholder committed, the real key kept local only.

## 🌐 Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Opera 47+

**Required Features:**
- Fetch API
- Async/Await
- `Map`
- ES6+ JavaScript (template literals, destructuring)

## 🚀 Future Enhancements

- [ ] "By Area" browsing (Italian, Mexican, Thai, etc.)
- [ ] Printable/shopping-list ingredient view
- [ ] Serving-size scaling for measurements (where parseable)
- [ ] Recently viewed recipes, separate from starred favorites
- [ ] Combine ingredient + category filters (would require the premium v2 API)
- [ ] Offline caching of favorited recipes' full details
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

- [TheMealDB API Documentation](https://www.themealdb.com/api.php)
- [MDN - Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [MDN - Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
- [MDN - Optional Chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)
- [MDN - String.prototype.split()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split)

---

**Part of the Code Odysseys Project Series** 🚀

*Intermediate-level project demonstrating dual-endpoint response handling and response caching*

**Happy Coding!** 🍲✨