# Mouse Tracker 🖱️

![Project Status](https://img.shields.io/badge/status-completed-success)
![Difficulty](https://img.shields.io/badge/difficulty-beginner-brightgreen)
![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

### Demo :- [Live Now](https://mouse-tracker-six.vercel.app/)

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

A real-time mouse tracking tool that reports cursor position, cumulative distance traveled, and instantaneous speed within a bounded zone. A custom dot follows the cursor in place of the default pointer, demonstrating how to read and derive metrics from raw mouse coordinates.

## ✨ Features

- 📍 **Live X/Y coordinates** relative to the tracking zone, not the whole page
- 📏 **Cumulative distance** traveled since the page loaded (or since last reset)
- ⚡ **Instantaneous speed** in pixels per second, recalculated on every move
- 🎯 **Custom cursor dot** that replaces the system pointer inside the zone
- 🚪 **Enter/leave detection** — tracking pauses and resets speed when the cursor exits the zone
- 🔁 **Reset button** to zero out the distance counter without reloading

## 🎓 Learning Outcomes

This beginner project teaches:

1. **mousemove, mouseenter, mouseleave events** — the core mouse event trio
2. **getBoundingClientRect()** — converting page-relative coordinates into element-relative coordinates
3. **Distance calculation** — applying the distance formula (`Math.sqrt` of squared deltas) between two points
4. **performance.now()** — high-resolution timestamps for accurate speed calculation
5. **Derived state** — computing speed from distance and elapsed time rather than storing it directly
6. **Guarding against null previous state** — handling the very first mouse move where there's no "previous" position yet
7. **CSS `cursor: none`** combined with an absolutely positioned element to build a custom pointer

## 🛠️ Technologies Used

- **HTML5** — Semantic structure
- **CSS3** — Flat neon-themed UI, absolute positioning for the tracking dot
- **JavaScript ES6+** — Event listeners, Math methods, performance timing API

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
2. Move your mouse into the dashed tracking zone
3. Watch the X/Y coordinates, distance, and speed update live as you move
4. Leave the zone to pause tracking — speed resets, distance is preserved
5. Click **Reset Distance** to zero the distance counter at any time

## 🔍 Code Walkthrough

### Getting zone-relative coordinates

```javascript
const rect = trackZone.getBoundingClientRect();
const x = Math.round(event.clientX - rect.left);
const y = Math.round(event.clientY - rect.top);
```

`event.clientX/Y` are relative to the browser viewport. Subtracting the tracking zone's own position (from `getBoundingClientRect`) converts them into coordinates relative to the zone itself.

### Calculating distance between two points

```javascript
const deltaX = x - lastX;
const deltaY = y - lastY;
const segmentDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
totalDistance += segmentDistance;
```

Each mouse move produces a small line segment from the last known position to the current one. Summing the length of every segment gives the total path length traveled, not just the straight-line distance from start to end.

### Deriving speed from time and distance

```javascript
const deltaTimeSeconds = (now - lastTimestamp) / 1000;
const speed = segmentDistance / deltaTimeSeconds;
```

Speed isn't tracked directly — it's recalculated each event from how far the cursor moved divided by how long that move took, using `performance.now()` for sub-millisecond timing precision.

## 🎨 Customization Guide

### Add a motion trail

Instead of one dot, push recent positions into an array and render a fading trail of small dots or an SVG polyline behind the cursor.

### Track outside the zone

Attach the listener to `document` instead of the zone element to track mouse position across the entire page.

### Visualize speed with color

Interpolate the dot's color based on current speed — slow movement in blue, fast movement in red — for an at-a-glance speed indicator.

## 🌐 Browser Compatibility

- ✅ Chrome, Firefox, Safari, Edge — all modern versions
- **Required Features:** `MouseEvent`, `getBoundingClientRect`, `performance.now()`

## 🚀 Future Enhancements

- [ ] Motion trail with fading dots
- [ ] Click-and-drag distance measurement between two points
- [ ] Heatmap overlay showing where the cursor spent the most time
- [ ] Touch event support for mobile devices

---

**Part of the Code Odysseys Project Series** 🚀