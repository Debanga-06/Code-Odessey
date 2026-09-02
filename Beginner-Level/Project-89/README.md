# CSS Art Project 🎨

![Project Status](https://img.shields.io/badge/status-completed-success)
![Difficulty](https://img.shields.io/badge/difficulty-advanced-red)
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

Two full-screen illustrations built entirely from styled `<div>` elements — no images, no SVG, no canvas. A floating astronaut drifting past a ringed planet in a twinkling starfield, and a layered mountain sunset with drifting clouds, birds in flight, and a shimmering lake reflection. JavaScript's only responsibilities are generating a randomized starfield and switching between the two scenes — every visual element is pure CSS: gradients, `border-radius`, `box-shadow`, `clip-path`, and CSS triangles built from borders.

## ✨ Features

- 🚀 **Deep Space scene** — a shaded 3D-looking planet with a ring passing both behind and in front of it, a gently floating astronaut built from a dozen individually shaped divs, and a tether line rendered with a repeating gradient
- 🌄 **Mountain Sunset scene** — a five-stop gradient sky, a glowing sun with layered `box-shadow` bloom, three-layer parallax-style mountain silhouettes built from CSS triangles, drifting clouds made from overlapping circles, birds animated across the sky using pseudo-element wing shapes, and a shimmering lake reflection
- ⭐ **Randomized starfield** — 120 stars with randomized size, position, twinkle duration, and delay, regenerated fresh on page load
- 🔄 **Scene switcher** — toggle between both artworks without a page reload
- 🎭 **Zero images** — every shape, shadow, and gradient is hand-built with CSS properties alone

## 🎓 Learning Outcomes

This advanced project teaches:

1. **Radial and linear gradients for shading** — simulating a 3D sphere (the planet) and atmospheric depth (the sunset sky) using multiple layered gradients rather than flat colors
2. **CSS triangles from borders** — the classic trick of giving an element zero width/height and large transparent side borders with one colored border, producing a clean triangular mountain shape
3. **Layered box-shadow for glow and depth** — stacking multiple shadow values with different blur/spread to create soft light bloom (the sun) and grounded depth (the astronaut's suit folds)
4. **clip-path for partial occlusion** — clipping the front half of the planet's ring to only its bottom portion, so it visually passes in front of the planet while the back half stays behind it
5. **Compound characters from primitive shapes** — the astronaut is a dozen absolutely-positioned divs (helmet, visor, body, arms, legs, backpack, antenna) assembled and layered with `z-index` into a single coherent character
6. **Pseudo-elements for shape complexity without extra markup** — clouds and bird wings are built using `::before`/`::after` on a single parent div, avoiding extra HTML nodes for purely decorative sub-shapes
7. **Programmatic randomization for organic variation** — generating the starfield in JavaScript with randomized size/position/timing per star, since 120 uniquely hand-placed stars in CSS would be impractical to author by hand
8. **repeating-linear-gradient for pattern textures** — both the tether cable's dashed look and the lake's shimmering reflection use repeating gradients instead of multiple separate elements

## 🛠️ Technologies Used

- **HTML5** — Purely structural; every visual detail comes from CSS
- **CSS3** — Gradients (linear, radial, repeating), `clip-path`, CSS border-triangles, layered `box-shadow`, pseudo-elements, `@keyframes` animation
- **JavaScript ES6+** — DOM generation for the randomized starfield, scene-switching logic

## 📁 Project Structure

```id="x32pl9"
css-art/
│
├── index.html      # Main structure
├── style.css       # Styling file
├── script.js       # JavaScript logic
├── README.md       # Documentation
```


## 💻 Usage Guide

1. Open `index.html` in a browser
2. The **Deep Space** scene loads by default — watch the astronaut drift, the stars twinkle, and the ring pass in front of and behind the planet
3. Click **Mountain Sunset** in the top tab bar to switch scenes — watch the birds fly across, clouds drift subtly, and the lake shimmer
4. Switch back and forth freely; the starfield stays randomized per page load, not per switch

## 🔍 Code Walkthrough

### Making a ring pass both behind and in front of a planet

```html
<div class="ring ring-back"></div>
<div class="planet-body"></div>
<div class="ring ring-front"></div>
```
```css
.ring-front {
  clip-path: polygon(0 50%, 100% 50%, 100% 100%, 0 100%);
}
```

Two copies of the same ring element are stacked with the planet body between them via `z-index`. The front copy is clipped with `clip-path` to only show its bottom half — the half that should visually appear in front of the sphere — while the back copy renders in full behind the planet. Together they create the illusion of one continuous ring threading through the planet, a classic trick for faux-3D CSS scenes.

### Building a mountain from border triangles

```css
.mountain {
  width: 0;
  height: 0;
  border-left: 160px solid transparent;
  border-right: 160px solid transparent;
  border-bottom: 220px solid #39243f;
}
```

When an element has zero width and height, its border corners meet at points instead of forming a rectangle frame. Making the left and right borders transparent and only the bottom border colored leaves just a colored triangle — no `clip-path` or SVG needed, just a very old but still effective CSS trick.

### Randomizing an organic-feeling starfield

```javascript
for (let i = 0; i < STAR_COUNT; i++) {
  const star = document.createElement('div');
  const size = Math.random() * 2 + 1;
  const top = Math.random() * 100;
  const left = Math.random() * 100;
  const duration = Math.random() * 3 + 2;
  const delay = Math.random() * 4;
  ...
}
```

Hand-authoring 120 uniquely positioned and timed stars in CSS would mean 120 nearly-identical CSS rules. Instead, JavaScript generates each star's size, position, and twinkle timing from randomized values within a sensible range — different every page load, but always visually consistent with the scene's style since the *animation itself* (defined once in CSS) stays the same.

## 🎨 Customization Guide

### Add parallax on mouse move

Listen for `mousemove` on the space scene and apply a small `translate` offset to the planet and astronaut at different magnitudes, creating a layered parallax depth effect as the cursor moves.

### Add a day/night cycle to the sunset scene

Animate the sky's gradient `background` property slowly over a longer duration, cycling from sunrise colors through sunset colors and into night, using CSS custom properties interpolated via JS or a long `@keyframes` sequence.

### Add more scenes

Following the same "single parent + absolutely positioned pseudo-shaped children" pattern used for the astronaut and mountains, additional scenes (a city skyline, an underwater reef) could be added as new `<section class="scene">` blocks with matching tab buttons.

## 🌐 Browser Compatibility

- ✅ Chrome, Firefox, Safari, Edge — all modern versions
- **Required Features:** `clip-path`, CSS gradients, `backdrop-filter` (tab bar only — degrades gracefully without it)

## 🚀 Future Enhancements

- [ ] Mouse-driven parallax depth effect
- [ ] Animated day/night sky cycle
- [ ] Additional pure-CSS scenes (city skyline, underwater reef)
- [ ] Shooting stars crossing the space scene at random intervals
- [ ] `prefers-reduced-motion` support to pause ambient animations

---

**Part of the Code Odysseys Project Series** 🚀