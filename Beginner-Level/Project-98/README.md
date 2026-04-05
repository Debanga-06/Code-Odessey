# ✍️ Blog Page v2

> An improved blog with categories, tag filtering, live search with highlight, grid/list view toggle, reading progress bar, newsletter widget, and scroll reveals — built with pure HTML, CSS & vanilla JavaScript.

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Level](https://img.shields.io/badge/Level-Beginner%20%23098-22c55e?style=flat)

---

## 📸 Preview

A publication-quality blog page with:
- Sticky navbar with live search and frosted glass effect
- Category tab bar for filtering by topic
- Featured article hero card
- Grid and list view toggle
- Sidebar with popular posts, tag cloud, and newsletter
- Reading progress bar at the top of the page

---

## ✨ Features

| Feature | Technique Used |
|---------|---------------|
| Reading progress bar | `scroll` event + `scrollHeight` calculation |
| Category tab filtering | Array `filter()` + DOM re-render |
| Live search with highlight | `debounce` pattern + `RegExp` replace |
| Tag cloud filtering | Dynamic render + toggle state |
| Grid ↔ List view toggle | CSS class swap + conditional card HTML |
| Scroll reveal animations | `IntersectionObserver` API |
| Load more (simulated) | `setTimeout` + slice pagination |
| Newsletter subscribe | DOM state mutation + email validation |
| Sidebar categories | Click → category filter sync |
| Back to top button | Scroll event + CSS transform |
| Sticky frosted nav | `position: sticky` + `backdrop-filter` |
| Featured post card | CSS Grid two-column layout |
| Search result clear | Input reset + featured post show/hide |

---

## 🚀 Getting Started

```bash
git clone https://github.com/Debanga-06/Code-Odessey.git
cd Code-Odessey/Project-098
open index.html
```

No build tools, no npm, no framework. Pure browser.

---

## 📁 File Structure

```
Project-098/
├── index.html    ← All HTML + CSS + JS in one file
└── README.md
```

---

## 🧠 What You'll Learn

- **Reading Progress Bar** — calculating scroll position as a percentage of total scrollable height
- **Debounce Pattern** — delaying search execution until typing stops (performance pattern)
- **`RegExp` with `replace()`** — wrapping search matches in `<mark>` tags for highlights
- **Conditional HTML strings** — rendering different card layouts based on view mode
- **`IntersectionObserver`** — triggering reveal animations as posts scroll into view
- **Pagination pattern** — slicing an array to show `N` items and extending on "load more"
- **State synchronization** — keeping category tabs, sidebar links, and search in sync
- **CSS `backdrop-filter`** — frosted glass navbar
- **CSS `position: sticky`** — sticky category bar that scrolls with the page
- **`-webkit-line-clamp`** — truncating excerpt text to 2 lines
- **Font pairing** — serif display font (Playfair Display) + clean sans (DM Sans) + monospace (JetBrains Mono)
- **Semantic HTML** — `<nav>`, `<aside>`, `<article>`, `<footer>`, `<section>` used properly

---

## 🆚 Blog v1 vs v2

| Feature | v1 (Project #007) | v2 (Project #098) |
|---------|-------------------|-------------------|
| Layout | Simple card grid | Featured + grid/list toggle |
| Filtering | None | Categories + tags + live search |
| JavaScript | None | IntersectionObserver, debounce, state management |
| Sidebar | None | Popular posts, tags, newsletter, categories |
| Search | None | Live search with result highlighting |
| UX | Static | Reading progress, back-to-top, load more |
| Typography | System fonts | Playfair Display + DM Sans + JetBrains Mono |

---

## 💡 Key Patterns Used

### Debounce (search performance)
```js
let searchDebounce;
function handleSearch(val) {
  clearTimeout(searchDebounce);
  searchDebounce = setTimeout(() => {
    // Only fires 180ms after typing stops
    performSearch(val);
  }, 180);
}
```

### Search text highlight
```js
function highlight(text, query) {
  if (!query) return text;
  const re = new RegExp(`(${query})`, 'gi');
  return text.replace(re, '<mark class="highlight">$1</mark>');
}
```

### Reading progress bar
```js
window.addEventListener('scroll', () => {
  const doc = document.documentElement;
  const scrolled = doc.scrollTop / (doc.scrollHeight - doc.clientHeight);
  progressBar.style.width = (scrolled * 100) + '%';
});
```

---

## ⚠️ Beginner Notes

This is project **#098 of 100** — the second-to-last of the beginner level:

- The debounce pattern is an interview-favourite concept — understand it well
- `IntersectionObserver` replaces old scroll-event performance antipatterns
- `backdrop-filter` may need `-webkit-backdrop-filter` in older Safari
- `RegExp` with user input must escape special characters in production (see `replace(/[.*+?^${}()|[\]\\]/g, '\\$&')`)

---

## 📄 License

MIT — Part of [Code Odyssey](https://github.com/Debanga-06/Code-Odessey)

*Project #098 of 300+ · Beginner Level — Almost There!*