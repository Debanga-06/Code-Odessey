# Virtual Keyboard ⌨️

![Project Status](https://img.shields.io/badge/status-completed-success)
![Difficulty](https://img.shields.io/badge/difficulty-intermediate-orange)
![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

### Demo :- [Live Now](https://virtual-keyboard-gilt.vercel.app/)

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

An on-screen QWERTY keyboard that types directly into a textarea when its keys are clicked, complete with Backspace, Enter, Space, and a toggleable Shift for uppercase. As a bonus, pressing the physical keyboard also visually highlights the matching on-screen key, tying the two input methods together.

## ✨ Features

- 🖱️ **Click-to-type keyboard** — every key inserts its character into the textarea
- ⌫ **Backspace** — removes the last character
- ↵ **Enter** — inserts a newline
- ␣ **Space** — inserts a space, styled as an extra-wide key like a real keyboard
- ⇧ **Toggleable Shift** — switches all letter keys to uppercase until toggled off again
- 🔦 **Physical keyboard sync** — typing on your real keyboard highlights the matching on-screen key
- 🎹 **Realistic key-press feedback** — a brief color flash and scale-down on every key press, whether clicked or typed physically

## 🎓 Learning Outcomes

This intermediate project teaches:

1. **Data-driven layout generation** — the entire keyboard is built from a `KEY_ROWS` array of arrays, so the row structure lives in one place rather than being hand-written HTML
2. **Direct textarea manipulation** — reading and modifying `textarea.value` directly from JavaScript, including `slice(0, -1)` to remove the last character
3. **Toggle state affecting multiple elements** — Shift being active changes the display and behavior of every letter key at once, requiring a full re-label pass (`updateKeyLabels()`) rather than updating just one element
4. **data-* attributes for key identity** — each key stores its own label in `data-key`, used both for click handling and for matching against physical keydown events
5. **Bridging physical and virtual input** — listening for real `keydown` events on `document` and mapping `event.key` values (including the special case of `" "` needing to map to the `"Space"` label) to find and highlight the corresponding on-screen key
6. **Visual feedback with setTimeout** — a class is added on press and removed shortly after, creating a brief "flash" rather than a persistent state change
7. **Conditional flex sizing via CSS classes** — Backspace/Enter/Shift are wider than letter keys, and Space is widest of all, controlled by adding `wide` / `extra-wide` classes based on membership in lookup arrays

## 🛠️ Technologies Used

- **HTML5** — Semantic structure, `<textarea>` output
- **CSS3** — Flat neon-themed UI, flexbox for keyboard rows with variable key widths
- **JavaScript ES6+** — DOM generation from data, `keydown` events, dataset attributes

## 📁 Project Structure

```id="x32pl9"
virtual-keyboard/
│
├── index.html      # Main structure
├── style.css       # Styling file
├── script.js       # JavaScript logic
├── README.md       # Documentation
```


## 💻 Usage Guide

1. Open `index.html` in a browser
2. Click any key to type its character into the textarea above
3. Click **Shift** to toggle uppercase letters — click it again to return to lowercase
4. Use **Backspace**, **Enter**, and **Space** for their usual behavior
5. Try typing on your physical keyboard instead — the matching on-screen key will briefly light up as you type

## 🔍 Code Walkthrough

### Generating the keyboard from a data array

```javascript
const KEY_ROWS = [
  ['1', '2', '3', ...],
  ['q', 'w', 'e', ...],
  ...
];

KEY_ROWS.forEach(row => {
  const rowEl = document.createElement('div');
  row.forEach(keyLabel => {
    const keyEl = document.createElement('div');
    keyEl.dataset.key = keyLabel;
    ...
    rowEl.appendChild(keyEl);
  });
  keyboard.appendChild(rowEl);
});
```

The visual keyboard layout is entirely determined by the shape of `KEY_ROWS` — a nested loop builds one row `<div>` per array, and one key `<div>` per string inside it. Rearranging or adding keys only requires editing this array, not the rendering logic.

### Keeping Shift state in sync across every key

```javascript
function toggleShift(keyEl) {
  isShiftActive = !isShiftActive;
  keyEl.classList.toggle('active-toggle', isShiftActive);
  updateKeyLabels();
}

function updateKeyLabels() {
  document.querySelectorAll('.key').forEach(keyEl => {
    const keyLabel = keyEl.dataset.key;
    if (!SPECIAL_KEYS.includes(keyLabel)) {
      keyEl.textContent = getKeyDisplay(keyLabel);
    }
  });
}
```

Unlike most toggles in this series that only affect the element clicked, Shift needs to visually update *every* letter key on the board simultaneously. `updateKeyLabels()` loops through all keys and re-derives each one's displayed character from the current `isShiftActive` state, skipping special keys (Backspace, Enter, Shift, Space) whose labels never change case.

### Mapping physical key events to on-screen keys

```javascript
function handlePhysicalKeydown(event) {
  let matchLabel = event.key;
  if (event.key === ' ') matchLabel = 'Space';

  const keyEl = findKeyElement(matchLabel);
  if (keyEl) flashKey(keyEl);
}
```

`event.key` for the spacebar is a literal single space character `" "`, which wouldn't match the `data-key="Space"` attribute used on the on-screen key — so it's explicitly remapped to `"Space"` before the lookup, letting one `findKeyElement()` function handle both single-character keys and named special keys uniformly.

## 🎨 Customization Guide

### Add Caps Lock (persistent, not just Shift)

Add a separate toggle that behaves like Shift but doesn't reset until clicked again — unlike Shift, which many real keyboards auto-release after one keypress.

### Add sound effects per key

Attach a short click/typing sound to `flashKey()` using the `Audio` constructor, giving the keyboard some audible feedback.

### Support symbol/number layer switching

Add a toggle key that swaps the entire `KEY_ROWS` data set for a symbols-focused layout, similar to how mobile keyboards switch between letters and symbols.

## 🌐 Browser Compatibility

- ✅ Chrome, Firefox, Safari, Edge — all modern versions
- **Required Features:** `keydown` event, dataset attributes, `classList`

## 🚀 Future Enhancements

- [ ] Caps Lock as a separate persistent toggle from Shift
- [ ] Sound effects on key press
- [ ] Symbol/number layout switching
- [ ] Highlight the exact key being typed on the physical keyboard while held down (not just a brief flash)
- [ ] Mobile touch-optimized key sizing

---

**Part of the Code Odysseys Project Series** 🚀