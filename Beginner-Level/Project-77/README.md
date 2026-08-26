# Online Menu Page 🍽️

![Project Status](https://img.shields.io/badge/status-completed-success)
![Difficulty](https://img.shields.io/badge/difficulty-beginner-brightgreen)
![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

### Demo :- [Live Now](

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

A digital restaurant menu with items grouped into categories (Starters, Main Course, Desserts, Beverages), each shown as a card with a name, description, veg/non-veg indicator, and price. Category tabs at the top let visitors jump straight to a section or view everything at once.

## ✨ Features

- 🍴 **Categorized menu sections** rendered from a single data structure
- 🏷️ **Category tabs** — filter to one section or view "All"
- 🟢🔴 **Veg / non-veg indicators** using the familiar green square / red triangle convention
- ⭐ **Optional item tags** — highlights like "Bestseller" or "Chef's pick" on select items
- 💰 **Clear pricing** displayed alongside each item
- 📱 **Horizontally scrollable tabs** on narrow screens

## 🎓 Learning Outcomes

This beginner project teaches:

1. **Nested data structures** — an array of category objects, each containing its own array of item objects
2. **Deriving a filter list from data** — building the tab list from `MENU_DATA` itself with `map()`, rather than hardcoding category names twice
3. **Conditional filtering** — showing all sections or just one, based on a simple ternary against the active category
4. **Nested loops for rendering** — an outer loop over categories, an inner loop over each category's items
5. **Conditional markup inside a template literal** — only rendering the tag `<span>` when an item actually has a `tag` property
6. **Reusable rendering pattern** — the same `buildTabs()` + `renderMenu()` pair used throughout this series for filterable content (seen previously in the Filter List App)

## 🛠️ Technologies Used

- **HTML5** — Semantic structure
- **CSS3** — Flat neon-themed UI, `clip-path` for the non-veg triangle marker
- **JavaScript ES6+** — Array methods (`map`, `filter`, `forEach`), template literals

## 📁 Project Structure

```id="x32pl9"
survey-page/
│
├── index.html      # Main structure
├── style.css       # Styling file
├── script.js       # JavaScript logic
├── README.md       # Documentation
```


## 💻 Usage Guide

1. Open `index.html` in a browser
2. Browse the full menu by default, or click a category tab (Starters, Main Course, Desserts, Beverages) to filter to just that section
3. Each item shows its name, a short description, a veg/non-veg marker, and its price
4. Items with a special tag (like "Bestseller") show a small highlighted label beneath the description

## 🔍 Code Walkthrough

### Deriving tab names from the data itself

```javascript
function getCategoryNames() {
  return ['All', ...MENU_DATA.map(section => section.category)];
}
```

Rather than writing out `['All', 'Starters', 'Main Course', ...]` by hand — which could drift out of sync if a category is renamed — the tab list is generated directly from `MENU_DATA`, so the two always match automatically.

### Filtering sections before rendering

```javascript
const sectionsToShow = activeCategory === 'All'
  ? MENU_DATA
  : MENU_DATA.filter(section => section.category === activeCategory);
```

A single ternary decides whether to render every section or just the one matching `activeCategory` — `renderMenu()` itself doesn't need to know or care which case applies, it just loops over whatever `sectionsToShow` ends up being.

### Conditionally including markup in a template literal

```javascript
${item.tag ? `<span class="item-tag">${item.tag}</span>` : ''}
```

Not every menu item has a `tag` property. Rather than always rendering an empty tag element, this inline ternary inserts the tag markup only when `item.tag` is truthy, and an empty string otherwise — a common pattern for optional fields in generated HTML.

## 🎨 Customization Guide

### Add a simple cart

Add a "+" button per item that increments a running total and item count, displayed in a sticky footer bar — without needing full checkout logic.

### Add search within the menu

Add a text input above the tabs that filters items by name across all categories, similar to the Search Bar UI or Filter List App projects.

### Add item images

Extend each item object with an `image` URL and render a thumbnail in the card, adjusting the layout to accommodate it.

## 🌐 Browser Compatibility

- ✅ Chrome, Firefox, Safari, Edge — all modern versions
- **Required Features:** Array methods (`map`, `filter`, `forEach`), CSS `clip-path`

## 🚀 Future Enhancements

- [ ] Simple add-to-cart counter with running total
- [ ] Search bar to filter items by name across categories
- [ ] Item images/thumbnails
- [ ] Dietary filters (vegan, gluten-free, spicy level)
- [ ] "Currently unavailable" state for sold-out items

---

**Part of the Code Odysseys Project Series** 🚀