# Theme Switcher 🎨

![Project Status](https://img.shields.io/badge/status-completed-success)
![Difficulty](https://img.shields.io/badge/difficulty-beginner-brightgreen)
![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

### Demo :- [Live Now](https://theme-switcher-inky.vercel.app/)

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

A theme-switching system built entirely on CSS custom properties, letting users pick from five color themes that apply instantly across the whole page — including a live preview card. The selected theme persists across page reloads using `localStorage`.

> Note: this project's actual subject is multi-theme switching, so multiple themes are the point of the exercise itself — the default theme is still Neon, matching the rest of the Code Odysseys series.

## ✨ Features

- 🎨 **5 selectable themes** — Neon, Light, Dark, Forest, Sunset
- 🔄 **Instant switching** — no page reload, all colors update via CSS variables
- 💾 **Persisted choice** — the selected theme is remembered via `localStorage` and reapplied on the next visit
- 🖼️ **Live preview card** — demonstrates how the same component looks across themes
- ✅ **Active state indicator** — the currently selected theme card is visually highlighted

## 🎓 Learning Outcomes

This beginner project teaches:

1. **CSS custom properties (variables)** — defining a palette once and reusing it everywhere
2. **Attribute-based theming** — using `data-theme` on `<body>` to scope variable overrides
3. **localStorage** — persisting a user preference across browser sessions
4. **Dataset attributes** — reading `data-theme` from clicked elements to drive logic
5. **Fallback/default logic** — validating a stored value before trusting it
6. **classList.toggle with a condition** — highlighting only the active selection among many elements

## 🛠️ Technologies Used

- **HTML5** — Semantic structure
- **CSS3** — Custom properties (`--bg`, `--surface`, `--accent`, etc.) driving a full theme system
- **JavaScript ES6+** — `localStorage` API, dataset access, object lookups

## 📁 Project Structure

```id="x32pl9"
theme-switcher/
│
├── index.html      # Main structure
├── style.css       # Styling file
├── script.js       # JavaScript logic
├── README.md       # Documentation
```

## 💻 Usage Guide

1. Open `index.html` in a browser
2. Click any of the five theme swatches at the top
3. The whole page — background, borders, text, and the preview card — updates instantly
4. Reload the page: your last selected theme is restored automatically

## 🔍 Code Walkthrough

### Defining a theme as CSS variables

```css
:root {
  --bg: #0a0a12;
  --surface: #111124;
  --border-color: #2be0d0;
  --text-main: #eafffb;
  --text-muted: #9ff5ec;
  --accent: #ff2bd6;
}

body[data-theme="light"] {
  --bg: #f4f4f9;
  --surface: #ffffff;
  --border-color: #d0d0e0;
  --text-main: #222222;
  --text-muted: #666666;
  --accent: #4361ee;
}
```

Every themeable color is defined once as a variable on `:root` (the default, Neon). Each alternate theme is just a `body[data-theme="..."]` selector that overrides the same variable names — every element using `var(--bg)`, `var(--accent)`, etc. updates automatically without touching component CSS.

### Applying and validating a theme

```javascript
function applyTheme(themeName) {
  if (themeName === 'neon') {
    body.removeAttribute('data-theme');
  } else {
    body.setAttribute('data-theme', themeName);
  }
  ...
}
```

Neon is the implicit default defined on `:root`, so applying it just means removing any `data-theme` attribute rather than adding one — keeping the default theme's CSS uncluttered by a redundant selector.

### Persisting and restoring the choice

```javascript
function loadSavedTheme() {
  const savedTheme = localStorage.getItem(STORAGE_KEY);
  return savedTheme && THEME_LABELS[savedTheme] ? savedTheme : 'neon';
}
```

The saved value is checked against the known `THEME_LABELS` object before being trusted — this guards against a corrupted or manually edited `localStorage` value causing an invalid theme name to be applied.

## 🎨 Customization Guide

### Respect system dark-mode preference

Use `window.matchMedia('(prefers-color-scheme: dark)')` to pick a sensible default theme on first visit, before the user has made an explicit choice.

### Add a custom theme builder

Let users pick individual colors with `<input type="color">` elements and write the resulting values directly onto `document.body.style.setProperty('--accent', value)`.

### Animate the transition

Add `transition: background 0.3s ease, color 0.3s ease` (already present here) to more elements for a smoother cross-fade between themes.

## 🌐 Browser Compatibility

- ✅ Chrome, Firefox, Safari, Edge — all modern versions
- **Required Features:** CSS custom properties, `localStorage`, `dataset`

## 🚀 Future Enhancements

- [ ] System dark-mode detection for first-time visitors
- [ ] Custom color picker to build a theme from scratch
- [ ] Sync theme choice across tabs using the `storage` event
- [ ] Scheduled theme switching (e.g. auto dark mode at night)

---

**Part of the Code Odysseys Project Series** 🚀