# Keyboard Event Tester ⌨️

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

A diagnostic tool that listens for keyboard events on the page and displays everything the browser knows about each keypress in real time — the key value, its physical code, legacy keyCode, location on the keyboard, active modifier keys, and a running log of recent presses. Useful for understanding exactly what data a `keydown` event carries before building keyboard shortcuts or game controls.

## ✨ Features

- 🔤 **Live key display** — large readout of the most recently pressed key
- 📊 **Event property breakdown** — `key`, `code`, `keyCode`, and `location` shown side by side
- 🎛️ **Modifier tracking** — Shift, Ctrl, Alt, and Meta light up when held
- 📜 **Scrolling event log** — last 20 keypresses with timestamps, newest at the top
- 🧹 **Clear log** — reset the log without reloading the page

## 🎓 Learning Outcomes

This beginner project teaches:

1. **keydown event handling** — listening for keyboard input on the whole document
2. **Event object properties** — the difference between `key` (character/name) and `code` (physical key)
3. **Legacy vs. modern APIs** — why `keyCode` still shows up despite being deprecated
4. **Boolean event flags** — `shiftKey`, `ctrlKey`, `altKey`, `metaKey`
5. **Object lookup tables** — mapping numeric `location` values to readable names
6. **Bounded array logging** — using `push`/`shift` to cap a log at a fixed size
7. **Dynamic list rendering** — rebuilding a `<ul>` from an array on every update

## 🛠️ Technologies Used

- **HTML5** — Semantic structure
- **CSS3** — Flat neon-themed UI, CSS Grid for the detail cards
- **JavaScript ES6+** — Event listeners, template literals, array methods

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
2. Press any key on your keyboard
3. Watch the display update with that key's details
4. Hold Shift, Ctrl, Alt, or Meta (Cmd on Mac) to see the modifier chips light up
5. Scroll the event log to review recent presses, or click **Clear** to reset it

## 🔍 Code Walkthrough

### Capturing the event

```javascript
document.addEventListener('keydown', handleKeyDown);
```

The listener is attached to `document` rather than a specific input, so any key press anywhere on the page is captured.

### Reading modifier state

```javascript
function updateModifiers(event) {
  modShift.classList.toggle('active', event.shiftKey);
  modCtrl.classList.toggle('active', event.ctrlKey);
  modAlt.classList.toggle('active', event.altKey);
  modMeta.classList.toggle('active', event.metaKey);
}
```

Each modifier is a boolean already present on the event object — no extra key-tracking state is needed.

### Capping the log size

```javascript
logEntries.push(entryText);

if (logEntries.length > MAX_LOG_ENTRIES) {
  logEntries.shift();
}
```

`shift()` removes the oldest entry once the log exceeds 20 items, keeping memory and DOM size bounded during long sessions.

## 🎨 Customization Guide

### Add key-up tracking

Listen for `keyup` alongside `keydown` to detect when a key is released, useful for game movement controls where you want continuous motion while a key is held.

### Highlight a virtual keyboard

Render an on-screen keyboard layout and highlight the matching key using `event.code` (which stays consistent regardless of the user's keyboard layout, unlike `event.key`).

### Prevent default browser behavior

For shortcut-testing scenarios, call `event.preventDefault()` on specific key combinations (e.g. Ctrl+S) to stop the browser's default action and demonstrate interception.

## 🌐 Browser Compatibility

- ✅ Chrome, Firefox, Safari, Edge — all modern versions
- **Required Features:** `KeyboardEvent`, `classList`, ES6 arrow functions

## 🚀 Future Enhancements

- [ ] keyup event tracking alongside keydown
- [ ] Visual on-screen keyboard with live key highlighting
- [ ] Export the event log as a text or JSON file
- [ ] Detect and label common shortcut combinations (Ctrl+C, Ctrl+V, etc.)
- [ ] Repeat-key detection using `event.repeat`

---

**Part of the Code Odysseys Project Series** 🚀