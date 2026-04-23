# Drag & Drop Demo

> **Code Odyssey — Beginner Level**  
> Drag API · Drop Zones · Event Handling

![Project Status](https://img.shields.io/badge/status-completed-success)
![Difficulty](https://img.shields.io/badge/difficulty-beginner-green)
![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

---

## Overview

A fully interactive Kanban-style drag and drop board built with vanilla HTML, CSS, and JavaScript. Cards can be dragged from a source panel into three column zones (To Do, In Progress, Done) or a trash zone for deletion. A live event log fires in real-time showing every drag event as it happens.

The goal of this project is to understand the **HTML5 Drag and Drop API** — what events exist, when they fire, and how data is passed between the dragged element and the drop target.

---

## What You'll Learn

- How to make any element draggable using `draggable="true"`
- The full drag event lifecycle and the order events fire in
- How to use `dataTransfer` to pass data between drag source and drop target
- Why `e.preventDefault()` is required in `dragover` (without it, drop won't work)
- How to give visual feedback during drag using CSS class toggling
- How to dynamically create and remove DOM elements on drop

---

## Drag API Events — Cheat Sheet

| Event | Fires on | When |
|---|---|---|
| `dragstart` | Dragged element | User begins dragging |
| `drag` | Dragged element | Continuously while dragging |
| `dragenter` | Drop target | Dragged item enters the zone |
| `dragover` | Drop target | Continuously while hovering over zone |
| `dragleave` | Drop target | Dragged item leaves the zone |
| `drop` | Drop target | User releases the mouse to drop |
| `dragend` | Dragged element | Drag operation ends (drop or cancel) |

---

## Key Concepts

### 1. Make an element draggable
```html
<div draggable="true" data-id="1">Card</div>
```

### 2. Store data on drag start
```js
element.addEventListener('dragstart', function(e) {
  e.dataTransfer.setData('text/plain', this.dataset.id);
  e.dataTransfer.effectAllowed = 'move';
});
```

### 3. Allow the drop (critical step)
```js
dropZone.addEventListener('dragover', function(e) {
  e.preventDefault(); // Without this, drop event will NOT fire
  e.dataTransfer.dropEffect = 'move';
});
```

### 4. Handle the drop
```js
dropZone.addEventListener('drop', function(e) {
  e.preventDefault();
  const id = e.dataTransfer.getData('text/plain'); // Retrieve the data
  // Use id to find the element and move it into this zone
});
```

---

## Project Structure

```
095-drag-drop-demo.html
├── nav                   — Project header with API labels
├── score-bar             — Live counters: available / placed / trashed
├── demo-area
│   ├── source-panel      — 8 draggable cards (task, bug, feature, note types)
│   ├── drop-board        — 3 drop zones: To Do / In Progress / Done
│   └── trash-panel       — Drop here to permanently delete a card
├── event-log             — Real-time log of every drag event that fires
└── code-hint             — 3-step reminder panel (draggable → dragover → drop)
```

---

## Features

- **8 draggable cards** across 4 types: task, bug, feature, note
- **3 Kanban columns** as drop zones with empty state indicators
- **Trash zone** — drop to delete, with count tracking
- **Remove button** on dropped cards — returns the card to the source list
- **Live event log** — shows every `dragstart`, `dragenter`, `drop`, etc. in real-time with timestamps
- **Score bar** — tracks how many cards are available, placed, and trashed
- **Visual feedback** — drag-over highlights, drop success flash, dragging opacity

---

## How to Run

Just open `095-drag-drop-demo.html` in any modern browser. No build tools, no dependencies, no install required.

```bash
open 095-drag-drop-demo.html   # macOS
start 095-drag-drop-demo.html  # Windows
```

---

## Browser Support

The HTML5 Drag and Drop API is supported in all modern browsers. Note that it does **not** work on mobile touchscreens by default — touch drag-and-drop requires a separate Touch Events implementation.

| Chrome | Firefox | Safari | Edge |
|--------|---------|--------|------|
| ✅ | ✅ | ✅ | ✅ |

---

## Concepts Practiced

`draggable` · `dragstart` · `dragover` · `dragenter` · `dragleave` · `drop` · `dragend` · `dataTransfer.setData()` · `dataTransfer.getData()` · `e.preventDefault()` · DOM manipulation · CSS class toggling · Event delegation

---

*Code Odyssey · Project 095 · Beginner Level*