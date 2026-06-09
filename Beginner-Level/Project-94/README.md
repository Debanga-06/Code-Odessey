# Sortable List

> **Code Odyssey** · Project 94

A lightweight, zero-dependency interactive list that lets users sort items in real time using native JavaScript array methods — no frameworks, no build tools, just clean HTML, CSS, and JS.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Implementation Details](#implementation-details)
- [Acceptance Criteria](#acceptance-criteria)
- [Future Improvements](#future-improvements)
- [License](#license)

---

## Overview

Sortable List is the first project in the **Code Odyssey** series — a personal challenge to build progressively complex web projects from scratch. This project focuses on core DOM manipulation, event handling, and JavaScript's built-in `Array.sort()` method to create a functional, well-styled list UI that updates without any page refresh.

---

## Features

| Feature | Description |
|---|---|
| ▲ Ascending sort | Sorts items by numeric value, low → high |
| ▼ Descending sort | Sorts items by numeric value, high → low |
| A→Z / Z→A sort | Alphabetical sort by item name |
| ↺ Reset | Restores the original insertion order |
| Live stats | Displays item count, min, max, and average — updates on every sort |
| Visual bars | Proportional progress bars per item, colour-coded by identity |
| Tier badges | High / Mid / Low classification based on value thresholds |
| Active state | Highlights the currently active sort button |
| No page refresh | All updates happen in-place via DOM manipulation |
| Responsive | Adapts layout for mobile screens |

---

## Project Structure

```
sortable-list/
├── index.html   # Semantic HTML structure and layout
├── style.css    # All styling — layout, components, responsive rules
├── app.js       # Data, sort logic, and DOM rendering
└── README.md    # Project documentation
```

Each file has a single, well-defined responsibility. There are no external libraries or build steps.

---

## Getting Started

### Prerequisites

- Any modern web browser (Chrome, Firefox, Safari, Edge)
- No Node.js, npm, or server required

### Running the project

1. Clone or download this repository.
2. Open `index.html` directly in your browser.

```bash
# If you have a local server (optional)
npx serve .
# or
python3 -m http.server 8080
```

That's it — the project runs entirely in the browser.

---

## Usage

| Button | Action |
|---|---|
| **▲ Value Asc** | Sort by value, smallest first |
| **▼ Value Desc** | Sort by value, largest first |
| **A→Z Name** | Sort alphabetically, A to Z |
| **Z→A Name** | Sort alphabetically, Z to A |
| **↺ Reset** | Restore the original order |

The stats bar at the top updates automatically after every sort to reflect the current list state.

---

## Implementation Details

### Data model

The dataset lives in an immutable `ORIGINAL` array that is **never sorted or mutated**. All sort operations work on a separate `currentData` copy, which is replaced using the spread operator on every sort call.

```js
// Source of truth — never touched after initialisation
const ORIGINAL = [
  { name: "Quantum", value: 74 },
  { name: "Nebula",  value: 12 },
  // ...
];

// Working copy — replaced on every sort
let currentData = [...ORIGINAL];
```

### Sort strategies

All sort types are defined in a single `SORT_STRATEGIES` map. Adding a new sort requires only one new entry.

```js
const SORT_STRATEGIES = {
  asc:  { fn: (a, b) => a.value - b.value,            label: "Sorted ascending"  },
  desc: { fn: (a, b) => b.value - a.value,            label: "Sorted descending" },
  "name-asc":  { fn: (a, b) => a.name.localeCompare(b.name), label: "Name A→Z" },
  "name-desc": { fn: (a, b) => b.name.localeCompare(a.name), label: "Name Z→A" },
  original:    { fn: null,                              label: "Original order"   },
};
```

### Rendering

The `render()` function rebuilds the list HTML from `currentData` on every sort. Stats are computed fresh using `Math.max`, `Math.min`, and `Array.reduce`.

```js
function render() {
  // Recompute stats
  const maxVal = Math.max(...currentData.map(d => d.value));
  // Rebuild list HTML via Array.map()
  list.innerHTML = currentData.map((item, i) => `<li>...</li>`).join("");
}
```

### Key JavaScript methods used

- `Array.sort()` with a custom comparator function
- `Array.map()` for rendering list items
- `Array.reduce()` for computing the average
- `String.prototype.localeCompare()` for locale-aware alphabetical sort
- Spread operator (`[...arr]`) to copy arrays without mutation

---

## Acceptance Criteria

| # | Criteria | Status |
|---|---|---|
| 1 | List is displayed correctly on load | ✅ |
| 2 | Ascending sort works as expected | ✅ |
| 3 | Descending sort works as expected | ✅ |
| 4 | UI updates without page refresh | ✅ |
| 5 | Code is properly documented | ✅ |

---

## Future Improvements

- [ ] Add a search/filter input to narrow items by name
- [ ] Support drag-and-drop manual reordering
- [ ] Allow users to add and remove items dynamically
- [ ] Persist sort preference to `localStorage`
- [ ] Animate list items on reorder using the FLIP technique
- [ ] Export sorted list as CSV or JSON

---

## License

This project is part of the **Code Odyssey** series and is open for personal learning and reference.

---

<p align="center">
  <strong>Code Odyssey</strong> · Built with vanilla HTML, CSS & JavaScript
</p>
