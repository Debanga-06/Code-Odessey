# Scroll Progress Bar 📊

![Project Status](https://img.shields.io/badge/status-completed-success)
![Difficulty](https://img.shields.io/badge/difficulty-beginner-brightgreen)
![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

### Demo :- [Live Now]()

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

A fixed progress bar pinned to the top of the page that fills up as the user scrolls through a long article, common on blogs and documentation sites. Includes a numeric percentage badge and a "back to top" button that appears once the reader has scrolled past a threshold.

## ✨ Features

- 📏 **Real-time progress bar** that fills from 0% to 100% as the page is scrolled
- 🔢 **Percentage badge** showing the same value as a number
- ⬆️ **Back-to-top button** that fades in after scrolling past 400px and smoothly scrolls back to the top on click
- 📐 **Resize-aware** — recalculates correctly if the window or content height changes
- 🎯 **Clamped output** — percentage never goes below 0% or above 100%, even at scroll edges

## 🎓 Learning Outcomes

This beginner project teaches:

1. **scroll event handling** — listening for scroll position changes on the window
2. **scrollHeight vs. clientHeight vs. scrollTop** — the three measurements needed to calculate scroll progress
3. **Percentage calculation** — deriving a 0-100 value from raw pixel measurements
4. **Math.min / Math.max for clamping** — keeping a calculated value within a safe range
5. **resize event handling** — recalculating layout-dependent values when the viewport changes
6. **Smooth scrolling** — using `window.scrollTo` with `behavior: 'smooth'`
7. **Fixed positioning with z-index** — keeping UI elements pinned above scrolling content

## 🛠️ Technologies Used

- **HTML5** — Semantic structure with a long-form article layout
- **CSS3** — Flat neon-themed UI, `position: fixed` elements
- **JavaScript ES6+** — Event listeners, Math methods, scroll APIs

## 📁 Project Structure

```id="x32pl9"
Keyboard-tester/
│
├── index.html      # Main structure
├── style.css       # Styling file
├── script.js       # JavaScript logic
├── README.md       # Documentation
```

## 💻 Usage Guide

1. Open `index.html` in a browser
2. Scroll down through the sample article
3. Watch the bar at the very top fill up, and the percentage badge in the corner update alongside it
4. Once scrolled past 400px, a circular back-to-top button appears in the bottom-right corner
5. Click it to smoothly scroll back to the top of the page

## 🔍 Code Walkthrough

### Calculating scroll percentage

```javascript
function calculateScrollPercentage() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const documentHeight = document.documentElement.scrollHeight;
  const viewportHeight = document.documentElement.clientHeight;
  const scrollableDistance = documentHeight - viewportHeight;

  if (scrollableDistance <= 0) return 0;

  const percentage = (scrollTop / scrollableDistance) * 100;
  return Math.min(Math.max(percentage, 0), 100);
}
```

The scrollable distance is the total document height minus the visible viewport height — that's the maximum amount the page can actually scroll. Dividing how far it's currently scrolled by that maximum gives the percentage. `document.documentElement.scrollHeight` falls back gracefully across browsers, and the `window.scrollY || document.documentElement.scrollTop` pattern covers older browser quirks.

### Guarding against short pages

```javascript
if (scrollableDistance <= 0) {
  return 0;
}
```

If the page content is shorter than the viewport, there's nothing to scroll, and the calculation would otherwise divide by zero or a negative number. This guard keeps the bar safely at 0% in that case.

### Toggling the back-to-top button

```javascript
backToTop.classList.toggle('hidden', window.scrollY < BACK_TO_TOP_THRESHOLD);
```

`classList.toggle` with a boolean second argument forces the class on or off based on the condition, rather than flipping it — the button is hidden below the threshold and visible above it.

## 🎨 Customization Guide

### Track progress within a specific container

Instead of `window` scroll, attach the listener to a specific scrollable `<div>` and read its `scrollTop`/`scrollHeight`/`clientHeight` instead of the document's, useful for scrollable panels rather than full pages.

### Add section markers

Overlay small tick marks on the progress bar at the vertical position of each `<section>`, calculated from each section's `offsetTop` relative to total document height.

### Change the fill direction

For RTL layouts or alternate designs, animate `right` instead of `width`, or use a `transform: scaleX()` approach anchored to the left or right edge.

## 🌐 Browser Compatibility

- ✅ Chrome, Firefox, Safari, Edge — all modern versions
- **Required Features:** `scroll` event, `scrollTo` with smooth behavior, `classList`

## 🚀 Future Enhancements

- [ ] Section-based progress markers on the bar itself
- [ ] Reading time estimate alongside the percentage
- [ ] Circular progress ring variant instead of a linear bar
- [ ] Save and restore scroll position across page reloads

---

**Part of the Code Odysseys Project Series** 🚀