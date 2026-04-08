# 🌐 Portfolio v2

> An enhanced personal portfolio with smooth scroll animations, IntersectionObserver reveals, custom cursor, animated counters, project filtering, and a fully interactive contact form — built with pure HTML, CSS & vanilla JavaScript.

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Level](https://img.shields.io/badge/Level-Beginner%20%23097-22c55e?style=flat)

---

## 📸 Preview

A dark, animated developer portfolio with:
- Full-viewport hero with floating avatar card and live availability badge
- Scroll-triggered section reveals using `IntersectionObserver`
- Animated number counters
- Filterable projects grid
- Learning path timeline
- Contact form with simulated send state

---

## ✨ Features

| Feature | Technique Used |
|---------|---------------|
| Custom magnetic cursor | `mousemove` + `requestAnimationFrame` lerp |
| Floating gradient orbs | CSS `@keyframes` + `filter: blur()` |
| CRT noise overlay | Inline SVG `feTurbulence` filter |
| Nav blur on scroll | `IntersectionObserver` / scroll event + `backdrop-filter` |
| Staggered hero animations | CSS `animation-delay` sequence |
| Scroll reveal sections | `IntersectionObserver` API |
| Animated stat counters | `requestAnimationFrame` easing |
| Project filter | DOM re-render with `filter()` |
| Timeline | CSS `::before` pseudo-elements |
| Contact form feedback | Simulated async with `setTimeout` |
| Rotating card border | `conic-gradient` + `@keyframes rotate` |
| Responsive mobile nav | CSS transform slide-in menu |

---

## 🚀 Getting Started

```bash
git clone https://github.com/Debanga-06/Code-Odessey.git
cd Code-Odessey/Project-097
open index.html
```

No build tools. No dependencies. Just open in a browser.

---

## 📁 File Structure

```
Project-097/
├── index.html    ← Everything in one file
└── README.md
```

---

## 🧠 What You'll Learn

- **`IntersectionObserver` API** — triggering animations when elements enter the viewport
- **`requestAnimationFrame`** — smooth counter animations and cursor lerp
- **CSS Custom Properties** — full dark theme with `--variables`
- **CSS `@keyframes`** — floating orbs, rotating conic gradient, pulse effect
- **CSS `backdrop-filter`** — frosted glass navbar effect
- **`conic-gradient`** — animated rotating border on the avatar card
- **CSS `clamp()`** — fluid typography that scales between min and max
- **DOM filtering** — re-rendering card grids based on category selection
- **`mix-blend-mode`** — custom cursor that inverts the background
- **CSS Grid & Flexbox** — two-column hero, responsive skills grid, contact layout
- **Staggered animations** — `animation-delay` chaining for cinematic page load
- **Form UX patterns** — loading state, success state, reset behavior

---

## 🆚 Portfolio v1 vs v2

| Feature | v1 (Project #001) | v2 (Project #097) |
|---------|-------------------|-------------------|
| Animations | None / minimal | Scroll reveals, keyframes, lerp cursor |
| Layout | Simple single column | Two-column hero, grid sections |
| JavaScript | None | IntersectionObserver, counters, filtering |
| Project showcase | Static list | Filterable card grid |
| Interactivity | Basic links | Form states, mobile menu, filter |
| Design | Clean basic | Dark glassmorphism, floating orbs |

---

## ⚠️ Beginner Notes

This project sits at **#097 of 100** in the beginner level — the techniques used here represent the ceiling of what you should know before moving to intermediate:

- `IntersectionObserver` is a browser API (no jQuery needed)
- `requestAnimationFrame` is the right way to animate with JS
- `conic-gradient` is a modern CSS feature (supported in all major browsers)
- `backdrop-filter` may need `-webkit-` prefix for older Safari

---

**Live Demo:** 
**[View Project](https://portfolio-v2-gules-nu.vercel.app/)**

## 📄 License

MIT — Part of [Code Odyssey](https://github.com/Debanga-06/Code-Odessey)

*Project #097 of 300+ · Beginner Level Complete*
