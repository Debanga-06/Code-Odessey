# Sticky Notes Board 📌

![Project Status](https://img.shields.io/badge/status-completed-success)
![Difficulty](https://img.shields.io/badge/difficulty-advanced-red)
![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

### Demo :- [Live Now](https://sticky-notes-board.vercel.app/)

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

A freeform corkboard of draggable sticky notes — create a note in a random spot with a slight paper-like tilt, drag it anywhere on the board, edit its text inline, pick from six colors, and delete notes individually or clear the whole board. Visually, this project moves away from the flat neon look used earlier in the series toward a warmer, tactile design: a dark cork-textured background, glassmorphism toolbar, soft layered drop shadows, a torn-tape corner detail, and a handwritten note font.

## ✨ Features

- 🎨 **6 note colors** — selectable before creating a new note
- 🖱️ **Freeform dragging** — click and drag any note anywhere on the board, with the note lifting visually (larger shadow) while being dragged
- ✏️ **Inline editable text** — click directly into a note and type; text is retained in state as you go
- 🗑️ **Per-note delete** — a small × button removes just that note
- 🧹 **Clear board** — wipes every note at once
- 📐 **Randomized placement and tilt** — each new note appears at a random position with a slight random rotation for a natural, hand-placed look
- 🔝 **Z-index stacking on interaction** — clicking or dragging a note brings it to the front of the stack
- 🎞️ **Layered visual design** — glass-blurred toolbar, grid-textured board background, layered box-shadows, and a tape-corner pseudo-element on every note

## 🎓 Learning Outcomes

This advanced project teaches:

1. **Custom drag-and-drop with mouse events** — implementing dragging from scratch using `mousedown` (start), `mousemove` (track), and `mouseup` (end) on `document`, rather than relying on a native drag API
2. **Offset-based drag calculation** — capturing the *distance from the cursor to the element's top-left corner* at drag start, then subtracting that offset on every move, so the note doesn't "jump" to align its corner with the cursor
3. **A single global drag state object** — `activeDrag` holds everything the move/end handlers need (which note, which element, the offset), avoiding scattered variables and making it trivial to check "is anything being dragged right now?"
4. **Array of objects as canvas state** — each note's position, color, rotation, text, and z-index live in a plain JS object, with the DOM element being a rendering of that state rather than the source of truth
5. **Z-index management for stacking order** — an incrementing `topZIndex` counter ensures whichever note was most recently interacted with visually sits above all others
6. **CSS pseudo-elements for decorative detail** — the `::before` "tape" strip on each note is pure CSS, added without any extra HTML markup
7. **Layered, purposeful CSS shadows** — combining a wide soft shadow with a tighter sharp one (`0 10px 20px, 0 2px 6px`) reads as more convincingly "lifted off the surface" than a single shadow value

## 🛠️ Technologies Used

- **HTML5** — Minimal structure; almost everything is generated
- **CSS3** — `backdrop-filter` for glassmorphism, layered `box-shadow`, CSS gradients, Google Fonts (Kalam for handwriting, Poppins for UI text), pseudo-element decoration
- **JavaScript ES6+** — Mouse event drag implementation, array state management, dynamic style application

## 📁 Project Structure

```id="x32pl9"
sticky-note-board/
│
├── index.html      # Main structure
├── style.css       # Styling file
├── script.js       # JavaScript logic
├── README.md       # Documentation
```


## 💻 Usage Guide

1. Open `index.html` in a browser
2. Pick a color from the palette in the toolbar, then click **+ New Note**
3. A note appears at a random spot with a slight tilt — click into it and type
4. Click and drag anywhere on a note (not the text area itself) to reposition it
5. Click the **×** in a note's corner to delete just that note
6. Click **Clear Board** to remove every note at once

## 🔍 Code Walkthrough

### Calculating drag offset to prevent jumping

```javascript
function startDrag(event, note, noteEl) {
  const boardRect = board.getBoundingClientRect();

  activeDrag = {
    note, noteEl,
    offsetX: event.clientX - boardRect.left - note.x,
    offsetY: event.clientY - boardRect.top - note.y
  };
}

function handleDragMove(event) {
  const boardRect = board.getBoundingClientRect();
  const newX = event.clientX - boardRect.left - activeDrag.offsetX;
  const newY = event.clientY - boardRect.top - activeDrag.offsetY;
  ...
}
```

Without capturing the offset at drag start, the note's corner would instantly snap to wherever the cursor is the moment dragging begins — jarring if you clicked somewhere in the middle of the note rather than its exact top-left. Storing the initial gap between the cursor and the note's position, then subtracting it on every move, keeps the note glued to the same spot relative to the cursor throughout the whole drag.

### One state object driving the whole drag lifecycle

```javascript
let activeDrag = null;

document.addEventListener('mousemove', handleDragMove);
document.addEventListener('mouseup', handleDragEnd);
```

Listening on `document` (not the individual note) for `mousemove`/`mouseup` means dragging keeps working smoothly even if the cursor moves faster than the note or briefly leaves its bounds. Both handlers simply check `if (!activeDrag) return;` — when nothing is being dragged, they're effectively no-ops, avoiding the need to attach and detach listeners dynamically.

### Layered shadows for a lifted, tactile feel

```css
.sticky-note {
  box-shadow:
    0 10px 20px -6px rgba(0, 0, 0, 0.45),
    0 2px 6px rgba(0, 0, 0, 0.25);
}

.sticky-note.dragging {
  box-shadow:
    0 26px 40px -10px rgba(0, 0, 0, 0.6),
    0 6px 14px rgba(0, 0, 0, 0.3);
}
```

A single large shadow tends to look like a flat blur rather than genuine depth. Combining a soft, spread-out shadow (mimicking ambient light) with a tighter, sharper one (mimicking contact shadow close to the surface) reads as much more convincingly three-dimensional — and increasing both on `.dragging` reinforces the sense that the note has physically lifted off the board while being moved.

## 🎨 Customization Guide

### Persist the board

Save the `notes` array to `localStorage` on every change (create, edit, move, delete) and restore it on page load so the board survives a refresh.

### Add touch support

Mirror the `mousedown`/`mousemove`/`mouseup` handlers with `touchstart`/`touchmove`/`touchend` equivalents so notes can be dragged on mobile devices.

### Add resizable notes

Add a small drag handle in a note's bottom-right corner that adjusts its `width`/`min-height` on drag, similar to the position-dragging logic already in place.

## 🌐 Browser Compatibility

- ✅ Chrome, Firefox, Safari, Edge — all modern versions
- **Required Features:** Mouse events, `backdrop-filter` (graceful degradation without it), CSS pseudo-elements
- ⚠️ `backdrop-filter` has partial support in some older browser versions — the toolbar remains fully functional without the blur effect, it just loses the glass look

## 🚀 Future Enhancements

- [ ] Persist board state with localStorage
- [ ] Touch event support for mobile dragging
- [ ] Resizable notes via a drag handle
- [ ] Snap-to-grid alignment option
- [ ] Note stacking/collapsing when too many overlap

---

**Part of the Code Odysseys Project Series** 🚀