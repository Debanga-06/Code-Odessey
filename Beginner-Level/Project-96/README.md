# Simple Dashboard UI

> **Code Odyssey — Beginner Level**  
> Dashboard Layout · Widgets · Data Cards

![Project Status](https://img.shields.io/badge/status-completed-success)
![Difficulty](https://img.shields.io/badge/difficulty-beginner-green)
![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

---

## Overview

A clean, fully responsive analytics dashboard built with vanilla HTML, CSS, and a small amount of JavaScript. It demonstrates how real-world dashboards are structured — sidebar navigation, a top bar, stat cards, charts, tables, and an activity feed — using only web fundamentals, no frameworks or libraries.

The goal of this project is to learn how to **compose a complex UI layout** from reusable widget components, manage a CSS Grid/Flexbox hybrid layout, and use JavaScript to make the interface dynamic without over-engineering it.

---

## What You'll Learn

- How to build a sticky sidebar + scrollable main content layout with Flexbox
- How to use CSS Grid to create responsive multi-column widget layouts
- How to build reusable "widget" components with consistent structure
- How to generate simple bar charts and sparklines using pure CSS/JS (no canvas, no library)
- How to animate value changes for a polished feel
- How to structure dashboard data and reflect it in the UI dynamically

---

## Layout Architecture

```
body (display: flex)
├── sidebar (fixed width, sticky)
│   ├── logo + branding
│   ├── navigation links (with active state)
│   └── user profile section
└── main (flex: 1, scrollable)
    ├── topbar (sticky, search + controls)
    └── content
        ├── stat-grid (4 columns → CSS Grid)
        ├── mid-grid  (2 columns: chart + goals)
        └── bottom-grid (2 columns: table + feed)
```

The entire layout is achieved with two rules:

```css
body      { display: flex; }             /* side-by-side: sidebar + main */
.main     { flex: 1; overflow: auto; }   /* main takes remaining space   */
.content  { display: grid; ... }         /* grid for widget rows         */
```

---

## Widget Pattern

Every section of the dashboard uses the same widget structure, making it easy to add new panels:

```html
<div class="widget">
  <div class="widget-head">
    <div class="widget-title">Title</div>
    <a class="widget-action">Action →</a>
  </div>
  <div class="widget-body">
    <!-- content goes here -->
  </div>
</div>
```

---

## JavaScript Features

The JS in this project is intentionally minimal and beginner-readable:

### Live date display
```js
const opts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
document.getElementById('live-date').textContent = new Date().toLocaleDateString('en-US', opts);
```

### Sparklines (mini bar charts from data arrays)
```js
function buildSparkline(containerId, values) {
  const max = Math.max(...values);
  values.forEach(v => {
    const bar = document.createElement('div');
    bar.style.height = (v / max * 100) + '%';  // height = proportion of max
    container.appendChild(bar);
  });
}
```

### Animated value updates (period selector)
```js
function animateValue(id, newVal) {
  const el = document.getElementById(id);
  el.style.opacity = '0';                        // fade out
  setTimeout(() => {
    el.textContent = newVal;                     // swap value
    el.style.opacity = '1';                      // fade in
  }, 200);
}
```

### Bar chart (from parallel arrays)
```js
const current  = [52, 68, 61, 74, 70, 84, 78, 90, 82, 84]; // this period
const previous = [44, 56, 50, 63, 58, 72, 65, 79, 70, 72]; // last period

// Bar height = value / max * 100 (as a percentage of container height)
bar.style.height = `${(value / maxVal) * 100}%`;
```

---

## Project Structure

```
096-simple-dashboard.html
├── sidebar
│   ├── Logo + role label
│   ├── Nav: Overview, Analytics, Orders (badge), Customers, Products
│   ├── Nav: Notifications (badge), Settings, Help
│   └── User profile strip
├── main
│   ├── topbar          — greeting, live date, search, notifications, period select
│   └── content
│       ├── stat-grid   — 4 cards: Revenue, Active Users, New Orders, Conversion
│       ├── mid-grid
│       │   ├── chart   — grouped bar chart (current vs previous, 10 months)
│       │   └── goals   — 4 progress bars with targets
│       └── bottom-grid
│           ├── table   — 5 recent orders with status chips
│           └── feed    — 5 activity items with icons and timestamps
```

---

## Features

- **Sticky sidebar** with active nav state that updates on click
- **4 stat cards** with type-colored accents, delta indicators, and sparkline charts
- **Revenue bar chart** — grouped bars showing current vs previous period with hover tooltips
- **Goals widget** — animated CSS progress bars with target labels
- **Orders table** — avatar initials, amounts, and color-coded status chips (Paid / Pending / Failed / Refunded)
- **Activity feed** — timestamped events with category icons
- **Period selector** — switching between 7, 30, 90 days updates all four stat values with a smooth fade animation
- **Notification dot** — click the bell icon to toggle the unread indicator
- **Responsive** — sidebar hides on small screens, grid collapses to single column

---

## Status Chip Reference

| Status | Color | Meaning |
|--------|-------|---------|
| Paid | Green | Transaction completed |
| Pending | Amber | Awaiting payment confirmation |
| Failed | Red | Payment declined or errored |
| Refunded | Grey | Transaction reversed |

---

## How to Run

Open `096-simple-dashboard.html` in any modern browser. No server, no build step, no dependencies.

```bash
open 096-simple-dashboard.html   # macOS
start 096-simple-dashboard.html  # Windows
```

---

## Concepts Practiced

CSS Flexbox layout · CSS Grid · Sticky positioning · CSS custom properties · `document.createElement()` · `style.height` manipulation · `Date` API · `toLocaleDateString()` · CSS transitions · `setTimeout()` · Event listeners · DOM querying · Array methods (`Math.max`, `forEach`, spread)

---

*Code Odyssey · Project 096 · Beginner Level*