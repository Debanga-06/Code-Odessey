# Filter List App 🛍️

![Project Status](https://img.shields.io/badge/status-completed-success)
![Difficulty](https://img.shields.io/badge/difficulty-intermediate-orange)
![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

### Demo :- [Live Now](https://filter-list.vercel.app/)

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Learning Outcomes](#learning-outcomes)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Usage Guide](#usage-guide)
- [Code Walkthrough](#code-walkthrough)
- [Customization Guide](#customization-guide)
- [Browser Compatibility](#browser-compatibility)
- [Future Enhancements](#future-enhancements)

## 🎯 Overview

A product listing that can be filtered by category, maximum price, and a free-text search — all three combined at once — with results sortable by price or name. A local array of products stands in for what would typically be an API response, focusing the exercise on combining multiple independent filter conditions correctly.

## ✨ Features

- 🏷️ **Category chips** — click to filter by a single category, or "All" to clear the category filter
- 🔎 **Live text search** — filters by product name as you type
- 💰 **Price range slider** — caps results at or below the selected maximum price
- ↕️ **Sorting** — by price (low-high or high-low) or name (A-Z), applied after filtering
- 🔢 **Live result count** — updates to reflect how many products currently match
- 🧹 **Reset filters** — restores every control to its default state in one click
- 🚫 **Empty state** — clear message when no products match the current combination of filters

## 🎓 Learning Outcomes

This intermediate project teaches:

1. **Combining multiple filter conditions** — chaining boolean checks inside a single `filter()` call with AND logic
2. **Deriving categories dynamically** — using `Set` to extract unique category values from the data instead of hardcoding them
3. **Non-mutating sort** — spreading the array (`[...products]`) before calling `sort()` so the original filtered list order isn't corrupted for future re-filters
4. **Array.sort comparator functions** — numeric comparison for price, `localeCompare()` for alphabetical name sorting
5. **State variables driving a pure render function** — every control updates a variable, then calls the same `applyFilters()` function rather than manipulating the DOM directly
6. **Template literals for card markup** — building each product card's HTML from an object's properties
7. **Singular/plural text handling** — a small ternary to correctly show "1 product" vs. "3 products"

## 🛠️ Technologies Used

- **HTML5** — Semantic structure
- **CSS3** — Flat neon-themed UI, responsive `auto-fill` grid for product cards
- **JavaScript ES6+** — Array methods (`filter`, `sort`, `map`), `Set`, spread syntax

## 📁 Project Structure

```id="x32pl9"
chat-ui/
│
├── index.html      # Main structure
├── style.css       # Styling file
├── script.js       # JavaScript logic
├── README.md       # Documentation
```


## 💻 Usage Guide

1. Open `index.html` in a browser
2. Click a category chip to narrow results to that category, or leave "All" selected
3. Type in the search box to filter by product name
4. Drag the price slider to cap results at a maximum price
5. Use the sort dropdown to reorder the currently filtered results
6. Click **Reset Filters** to clear everything back to the default view

## 🔍 Code Walkthrough

### Combining filters with AND logic

```javascript
let filtered = PRODUCTS.filter(product => {
  const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
  const matchesSearch = product.name.toLowerCase().includes(currentSearch.toLowerCase());
  const matchesPrice = product.price <= maxPrice;

  return matchesCategory && matchesSearch && matchesPrice;
});
```

Each condition is calculated as its own named boolean first, then combined with `&&` — a product only survives the filter if it satisfies category, search, *and* price simultaneously. This structure scales cleanly if more filter types are added later.

### Extracting unique categories

```javascript
const CATEGORIES = ['All', ...new Set(PRODUCTS.map(p => p.category))];
```

`map()` pulls out every product's category (with duplicates), and wrapping that array in a `Set` collapses it down to unique values. Spreading the `Set` back into an array, prefixed with `'All'`, produces the exact list needed to render category chips without hardcoding category names separately from the data.

### Sorting without mutating the filtered array

```javascript
function sortProducts(products) {
  const sorted = [...products];
  if (currentSort === 'price-asc') {
    sorted.sort((a, b) => a.price - b.price);
  }
  ...
  return sorted;
}
```

`sort()` mutates the array it's called on. Spreading `products` into a new array first ensures the original filtered result (which may be reused or re-filtered later) is never silently reordered as a side effect.

## 🎨 Customization Guide

### Add multi-category selection

Change `activeCategory` from a single string to a `Set` of selected categories, and update the chip click handler to toggle membership instead of replacing the value.

### Add a minimum price filter

Add a second range input for minimum price, and extend `matchesPrice` to check both bounds.

### Load products from an API

Replace the local `PRODUCTS` array with a `fetch()` call on page load, storing the result in a variable before running the same filter/sort/render pipeline.

## 🌐 Browser Compatibility

- ✅ Chrome, Firefox, Safari, Edge — all modern versions
- **Required Features:** Array methods (`filter`, `sort`, `map`), `Set`, CSS Grid

## 🚀 Future Enhancements

- [ ] Multi-select category filtering
- [ ] Minimum and maximum price range (dual slider)
- [ ] URL query params to make filtered views shareable/bookmarkable
- [ ] Pagination for larger product sets
- [ ] Save filter preferences to localStorage

---

**Part of the Code Odysseys Project Series** 🚀