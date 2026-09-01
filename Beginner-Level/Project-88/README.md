# Scroll Reveal Animations ✨

![Project Status](https://img.shields.io/badge/status-completed-success)
![Difficulty](https://img.shields.io/badge/difficulty-intermediate-orange)
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
- [Browser Compatibility](#browser-compatibling)
- [Future Enhancements](#future-enhancements)

## 🎯 Overview

A long, editorial-style scrolling page demonstrating scroll-triggered reveal animations built on the Intersection Observer API — the modern, performant alternative to checking element positions on every `scroll` event. Sections fade up, slide in from the side, zoom in, and reveal in a staggered sequence as the user scrolls past them, with a small progress indicator tracking how far down the page they've gone. Visually, this project takes a warm editorial-magazine direction — serif display type, cream background, soft gradient blooms — distinct from the neon and cork-board styles used earlier in the series.

## ✨ Features

- 👁️ **Intersection Observer-driven reveals** — no scroll-position math, no `scroll` event listener for the animations themselves
- 🎬 **Four reveal styles** — fade-up, fade-left, fade-right, and zoom-in, chosen per section via a `data-reveal` attribute
- ⏱️ **Staggered group reveals** — a grid of cards reveals one after another using per-element delays, rather than all appearing simultaneously
- 🔂 **Reveal-once behavior** — each element stops being observed after its first reveal, so scrolling back up and down doesn't repeatedly re-trigger it
- 📊 **Live scroll progress bar** — a secondary, simpler progress indicator tracking overall page position
- 🎨 **Distinct visual direction** — Fraunces serif display type, Inter body text, warm cream background with soft radial gradient blooms, restrained shadows

## 🎓 Learning Outcomes

This intermediate project teaches:

1. **IntersectionObserver API** — creating an observer with a callback, a `threshold`, and a `rootMargin`, then calling `observe()` on target elements
2. **rootMargin for early/late triggering** — a negative bottom margin (`0px 0px -60px 0px`) makes elements reveal slightly before they'd otherwise cross the exact viewport edge, avoiding reveals that feel like they happen right at the screen's bottom edge
3. **unobserve for one-time effects** — calling `observerInstance.unobserve(entry.target)` after a successful reveal stops the observer from doing any further work on that element, which is both a performance win and the mechanism behind "reveal once" behavior
4. **Driving animation variants from a single attribute** — one `data-reveal="fade-up"` (or `fade-left`/`fade-right`/`zoom-in`) attribute selects which CSS starting-state rule applies, keeping the JS completely unaware of *which* visual effect each element uses
5. **Per-element stagger via data attributes** — reading `data-delay` off each element and passing it to `setTimeout` before adding the reveal class, letting a group of otherwise-identical elements reveal in a visually staggered sequence
6. **CSS transitions as the actual animation engine** — JavaScript's only job is toggling one class; every visual detail (timing, easing curve, distance) lives entirely in CSS
7. **`will-change` for animation performance** — hinting to the browser that opacity and transform are about to change, allowing it to optimize rendering ahead of time

## 🛠️ Technologies Used

- **HTML5** — Semantic sectioned structure with `data-reveal`/`data-delay` attributes
- **CSS3** — Custom easing curves (`cubic-bezier`), CSS Grid, radial gradients, Google Fonts (Fraunces + Inter)
- **JavaScript ES6+** — `IntersectionObserver`, `setTimeout`, `scroll` event for the secondary progress bar

## 📁 Project Structure

```id="x32pl9"
scroll-reveal/
│
├── index.html      # Main structure
├── style.css       # Styling file
├── script.js       # JavaScript logic
├── README.md       # Documentation
```


## 💻 Usage Guide

1. Open `index.html` in a browser
2. Scroll down slowly and watch each section animate into place as it enters the viewport
3. Notice the three-card grid reveals in a staggered left-to-right-feeling sequence rather than all at once
4. Watch the small progress bar near the bottom track overall scroll position
5. Scroll back to the top and down again — already-revealed sections stay visible (they don't re-hide), since each one only reveals once

## 🔍 Code Walkthrough

### Setting up the observer

```javascript
const observer = new IntersectionObserver((entries, observerInstance) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = Number(entry.target.dataset.delay) || 0;

      setTimeout(() => {
        entry.target.classList.add('revealed');
      }, delay);

      observerInstance.unobserve(entry.target);
    }
  });
}, {
  threshold: REVEAL_THRESHOLD,
  rootMargin: '0px 0px -60px 0px'
});
```

The callback receives an array of `entries` — one per observed element whose intersection status just changed. `entry.isIntersecting` is `true` once the element crosses the configured `threshold` (15% visible, in this case). `rootMargin` shrinks the effective viewport by 60px from the bottom, so the reveal fires a little before the element visually reaches the very edge of the screen, which reads as better timed than triggering exactly at the boundary.

### Letting CSS own the actual animation

```css
[data-reveal="fade-up"] {
  transform: translateY(36px);
}

[data-reveal].revealed {
  opacity: 1;
  transform: translate(0, 0) scale(1);
}
```

JavaScript never animates anything directly — it only adds the `revealed` class. Every visual detail of *how* that transition looks (duration, easing, distance) is defined entirely in CSS via `transition` and the paired before/after `transform` values. This separation means new reveal styles can be added purely in CSS without touching the observer logic at all.

### Staggering a group with per-element delay

```javascript
const delay = Number(entry.target.dataset.delay) || 0;
setTimeout(() => {
  entry.target.classList.add('revealed');
}, delay);
```

Each card in the staggered grid has its own `data-delay` (`0`, `120`, `240`). Even though the Intersection Observer likely reports all three cards as intersecting within the same callback batch (since they enter the viewport together), staggering the class addition with `setTimeout` per element creates the visual effect of a sequential reveal rather than a simultaneous one.

## 🎨 Customization Guide

### Add a re-triggering mode

Skip the `unobserve()` call and instead toggle the `revealed` class based on `entry.isIntersecting` directly (adding *and* removing it), so sections reveal every time they re-enter the viewport rather than just once.

### Add more reveal variants

Extend the `[data-reveal="..."]` CSS rules with additional named effects (e.g. `rotate-in`, `blur-in`) — the JavaScript needs no changes since it only reads and toggles classes generically.

### Combine with a scrollytelling narrative

Pair this reveal pattern with `sendPrompt`-style content or a horizontal-scroll section to build a more elaborate scroll-driven story, using the same Intersection Observer foundation.

## 🌐 Browser Compatibility

- ✅ Chrome, Firefox, Safari, Edge — all modern versions
- **Required Features:** `IntersectionObserver`, CSS transitions, CSS custom easing (`cubic-bezier`)

## 🚀 Future Enhancements

- [ ] Re-triggering reveal mode (animate every time, not just once)
- [ ] Additional reveal variants (rotate, blur, skew)
- [ ] Reduced-motion support via `prefers-reduced-motion` media query
- [ ] Parallax depth layers combined with reveal timing
- [ ] Reveal progress indicator showing how many sections have been viewed

---

**Part of the Code Odysseys Project Series** 🚀