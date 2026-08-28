# CSS Animation Showcase 🎞️

![Project Status](https://img.shields.io/badge/status-completed-success)
![Difficulty](https://img.shields.io/badge/difficulty-intermediate-orange)
![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

### Demo :- [Live Now](https://css-animation-zeta-opal.vercel.app/)

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

A gallery of nine distinct CSS `@keyframes` animations — bounce, spin, pulse, shake, flip, slide, fade, elastic pop, and wobble — each replayable on click. JavaScript's role here is intentionally small: it triggers, resets, and re-triggers CSS animations (which do all the actual visual work), and offers a speed multiplier that scales every animation's duration together.

## ✨ Features

- 🎬 **9 distinct keyframe animations** covering common UI motion patterns
- 🖱️ **Click-to-replay** — clicking a card re-triggers its animation from the start, even mid-animation
- ⏱️ **Speed control** — Slow / Normal / Fast multiplier applied to every animation's duration
- 🔁 **Replay All** — retriggers every animation in the grid simultaneously
- 🧱 **Reusable animation trigger pattern** — the same replay logic works identically for all nine animations

## 🎓 Learning Outcomes

This intermediate project teaches:

1. **CSS `@keyframes`** — defining multi-step animations with percentage-based or `from`/`to` waypoints
2. **Animation triggering via class toggling** — CSS animations only run when their triggering class is present; JavaScript's entire job is adding/removing that class at the right moments
3. **Forcing a DOM reflow to restart an animation** — the `void element.offsetWidth` trick, needed because removing and immediately re-adding the same class doesn't restart a CSS animation without the browser recalculating layout in between
4. **Dynamically overriding animation-duration from JS** — setting `element.style.animationDuration` to scale a fixed keyframe animation's speed without duplicating the `@keyframes` rule itself
5. **3D transforms and perspective** — the flip animation uses `rotateY()` combined with a `perspective` on its container for a believable 3D effect
6. **Data-driven card generation** — building all nine cards from one `ANIMATIONS` array instead of writing nine near-identical HTML blocks by hand
7. **Reusable trigger functions** — one `playAnimation()` function used identically whether triggered by a single card click or the "Replay All" button

## 🛠️ Technologies Used

- **HTML5** — Semantic structure
- **CSS3** — Nine distinct `@keyframes` animations, 3D transforms with perspective
- **JavaScript ES6+** — classList manipulation, forced reflow, dynamic inline styles

## 📁 Project Structure


```id="x32pl9"
badge-generator/
│
├── index.html      # Main structure
├── style.css       # Styling file
├── script.js       # JavaScript logic
├── README.md       # Documentation
```

## 💻 Usage Guide

1. Open `index.html` in a browser
2. Click any animation card to play its effect
3. Click the same card again — even while it's still mid-animation — to replay it from the start
4. Change the **Speed** dropdown to slow down or speed up every animation's duration
5. Click **Replay All** to trigger every animation in the grid at once

## 🔍 Code Walkthrough

### Restarting a CSS animation with a forced reflow

```javascript
function playAnimation(card) {
  card.classList.remove('play');
  void card.offsetWidth;
  card.classList.add('play');
}
```

Simply removing and re-adding the same class in the same tick doesn't restart a CSS animation, because the browser batches both class changes together before repainting — as far as the animation engine is concerned, nothing changed. Reading `offsetWidth` in between forces the browser to recalculate layout immediately, "flushing" the removal before the class is re-added, which is what actually allows the animation to restart from its first frame.

### Scaling animation speed without touching @keyframes

```javascript
function applySpeed(card) {
  const box = card.querySelector('.anim-box');
  const speed = Number(speedSelect.value);
  const baseDuration = getComputedDurationSeconds(card);

  box.style.animationDuration = `${baseDuration * speed}s`;
}
```

Each animation's natural duration is defined once (both in the CSS `animation` shorthand and mirrored in the `durations` lookup object here). Rather than duplicating each `@keyframes` rule at multiple speeds, a single multiplier scales the inline `animation-duration` — 2x for slow, 1x for normal, 0.4x for fast — leaving the keyframe steps themselves untouched.

### Building the flip effect with perspective

```css
.anim-flip .anim-stage {
  perspective: 400px;
}
.anim-flip.play .anim-box {
  animation: flip 0.8s ease;
}
```

`rotateY()` alone on a 2D-styled element looks like it's simply squashing horizontally, not truly rotating in 3D space. Adding `perspective` to the *parent* container gives the browser a vanishing point to render the rotation against, producing a believable 3D flip rather than a flat squeeze.

## 🎨 Customization Guide

### Add hover-triggered animations

Add a toggle that switches some cards from click-triggered to `:hover`-triggered CSS animations, demonstrating the difference between JS-controlled and pure-CSS triggering.

### Add animation-fill-mode variations

Experiment with `animation-fill-mode: forwards` on select animations (like slide-in) so the element stays in its final state instead of snapping back after the animation completes.

### Export animation code snippets

Add a "View CSS" button per card that reveals the exact `@keyframes` rule and animation shorthand used, turning the showcase into a copyable reference.

## 🌐 Browser Compatibility

- ✅ Chrome, Firefox, Safari, Edge — all modern versions
- **Required Features:** CSS `@keyframes`, CSS 3D transforms, `animation-duration` scripting

## 🚀 Future Enhancements

- [ ] Hover-triggered animation variants
- [ ] "View CSS" snippet reveal per card
- [ ] animation-fill-mode exploration (forwards/backwards)
- [ ] Custom easing curve picker (ease, ease-in-out, cubic-bezier)
- [ ] Drag-and-drop animation sequencing (chain multiple animations)

---

**Part of the Code Odysseys Project Series** 🚀