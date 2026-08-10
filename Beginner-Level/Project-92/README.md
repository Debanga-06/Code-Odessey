# Search Bar UI 🔍

![Project Status](https://img.shields.io/badge/status-completed-success)
![Difficulty](https://img.shields.io/badge/difficulty-intermediate-orange)
![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

### Demo :- [Live Now](https://search-bar-ui-phi.vercel.app/)

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

A search input with live autocomplete suggestions, keyboard navigation, matched-text highlighting, and a recent-searches history — all powered by a local in-memory dataset rather than an external API. Demonstrates the core interaction patterns behind most real-world search UIs before adding a backend.

## ✨ Features

- 💡 **Live suggestions** filtered from a local dataset as the user types
- 🖍️ **Matched-text highlighting** — the part of each suggestion matching the query is visually emphasized
- ⌨️ **Full keyboard navigation** — Arrow Up/Down to move through suggestions, Enter to select, Escape to close
- ❌ **Clear button** — appears once there's input, clears the field and refocuses it
- 🕐 **Recent search history** — clickable chips for past searches, with duplicates removed and a cap on how many are kept
- 🖱️ **Click-outside-to-close** — suggestions dismiss when clicking elsewhere on the page

## 🎓 Learning Outcomes

This intermediate project teaches:

1. **Array filtering for search** — using `filter()` combined with `includes()` for case-insensitive substring matching
2. **String slicing for highlighting** — locating a substring with `indexOf()` and splitting the string into before/match/after segments
3. **Keyboard event handling for navigation** — implementing arrow-key selection with wraparound using the modulo operator
4. **Managing "highlighted" state separately from DOM structure** — tracking an index and re-applying a class rather than re-rendering
5. **Deduplicating and capping an array** — removing existing entries before unshifting, then popping from the end once over a limit
6. **preventDefault() for custom key behavior** — stopping arrow keys from scrolling the page while navigating suggestions
7. **innerHTML with dynamically built markup** — inserting a `<mark>` tag around matched text safely within a controlled dataset

## 🛠️ Technologies Used

- **HTML5** — Semantic structure
- **CSS3** — Flat neon-themed UI, absolutely positioned suggestions dropdown
- **JavaScript ES6+** — Array methods, string methods, keyboard event handling

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
2. Start typing in the search box (try "in", "j", or "la")
3. Matching suggestions appear below, with the matched portion highlighted in pink
4. Use **Arrow Down/Up** to move through suggestions, **Enter** to select, or click a suggestion directly
5. Selected or entered searches are saved as chips under "Recent searches" — click one to search it again
6. Click **Clear** in the history section to wipe recent searches

## 🔍 Code Walkthrough

### Filtering suggestions

```javascript
function getMatches(query) {
  const lowerQuery = query.toLowerCase();
  return DATA_SOURCE.filter(item => item.toLowerCase().includes(lowerQuery)).slice(0, MAX_SUGGESTIONS);
}
```

Both the query and each dataset item are lowercased before comparison for case-insensitive matching, and results are capped with `slice()` so the dropdown never grows unbounded.

### Highlighting the matched substring

```javascript
function highlightMatch(text, query) {
  const index = text.toLowerCase().indexOf(query.toLowerCase());
  if (index === -1) return text;

  const before = text.slice(0, index);
  const match = text.slice(index, index + query.length);
  const after = text.slice(index + query.length);

  return `${before}<mark>${match}</mark>${after}`;
}
```

Rather than matching against a regular expression, the matched position is located with `indexOf()` on the lowercased strings, then the *original-case* string is sliced at that position — preserving the suggestion's real capitalization while still highlighting correctly regardless of how the user typed their query.

### Keyboard navigation with wraparound

```javascript
if (event.key === 'ArrowDown') {
  event.preventDefault();
  highlightedIndex = (highlightedIndex + 1) % items.length;
  updateHighlight(items);
}
```

The modulo operator wraps the index back to `0` after reaching the last item, so pressing Arrow Down repeatedly cycles through the list instead of stopping at the end.

## 🎨 Customization Guide

### Debounce the input for a real API

Wrap `handleInput` in a debounce function (as used in the Movie Search project) before swapping the local `DATA_SOURCE` filter for a real fetch call, to avoid firing a request on every keystroke.

### Group suggestions by category

Tag each dataset entry with a category (`country`, `city`, `language`) and render section headers within the dropdown, grouping matches accordingly.

### Persist search history

Save `searchHistory` to `localStorage` after every update so recent searches survive a page reload.

## 🌐 Browser Compatibility

- ✅ Chrome, Firefox, Safari, Edge — all modern versions
- **Required Features:** Array methods (`filter`, `slice`), keyboard events, `closest()`

## 🚀 Future Enhancements

- [ ] Debounced live API search instead of a local dataset
- [ ] Category grouping within suggestions
- [ ] Persist search history with localStorage
- [ ] Voice search input via the Web Speech API
- [ ] Fuzzy matching for typo tolerance

---

**Part of the Code Odysseys Project Series** 🚀