# Memory Flip Game (Basic) 🧠

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

A classic card-matching memory game built with vanilla JavaScript. A 4x4 grid holds 8 pairs of hidden icons; the player flips two cards at a time trying to find matches, with moves counted and time tracked until every pair is found.

## ✨ Features

- 🃏 **4x4 grid** of 8 icon pairs, shuffled on every game
- 🖱️ **Two-card flip logic** — only two cards can be face-up at once
- ⏱️ **Live timer** that starts on the first flip
- 🔢 **Move counter** incremented on every pair of flips
- ✅ **Match detection** with a locked board during mismatches so the player can register both cards
- 🎉 **Win state** once all 8 pairs are found
- 🔁 **Restart button** to reshuffle and reset all state

## 🎓 Learning Outcomes

This beginner project teaches:

1. **CSS Grid layout** — arranging cards in a fixed 4-column grid
2. **Fisher-Yates shuffle** — a proper unbiased array-shuffling algorithm
3. **Game state management** — tracking flipped cards, match count, and a lock flag with plain variables
4. **Guard clauses** — preventing invalid clicks (already matched, board locked, two cards already flipped)
5. **setTimeout for delayed UI** — briefly showing a wrong pair before flipping back
6. **setInterval for timing** — running and stopping a game clock
7. **Dataset attributes** — storing each card's hidden icon value on the DOM element itself

## 🛠️ Technologies Used

- **HTML5** — Semantic structure
- **CSS3** — Flat neon-themed UI, CSS Grid for the card layout
- **JavaScript ES6+** — Array destructuring, spread syntax, arrow functions

## 📁 Project Structure

```id="x32pl9"
Memory-Flip-Game/
│
├── index.html      # Main structure
├── style.css       # Styling file
├── script.js       # JavaScript logic
├── README.md       # Documentation
```

## 💻 Usage Guide

1. Open `index.html` in a browser
2. Click any card to flip it face-up
3. Click a second card — if the icons match, both stay revealed; if not, they flip back after a short delay
4. Keep matching pairs until the board is cleared
5. Click **Restart Game** to shuffle a new board and reset moves/timer

## 🔍 Code Walkthrough

### Fisher-Yates shuffle

```javascript
function shuffleArray(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
```

Swaps each element with a random earlier (or same) index, working backward from the end — this gives a genuinely uniform shuffle, unlike sorting with a random comparator.

### Preventing invalid moves

```javascript
function handleCardClick(card) {
  if (isBoardLocked) return;
  if (card.classList.contains('flipped') || card.classList.contains('matched')) return;
  if (flippedCards.length === 2) return;
  ...
}
```

Three guard clauses stop a click from being processed while a mismatch is being shown, on cards already dealt with, or when two cards are already face-up awaiting comparison.

### Delayed mismatch handling

```javascript
isBoardLocked = true;
setTimeout(() => {
  unflipCard(firstCard);
  unflipCard(secondCard);
  flippedCards = [];
  isBoardLocked = false;
}, 800);
```

The board locks for 800ms on a mismatch so the player has time to see and remember both cards before they flip back.

## 🎨 Customization Guide

### Add difficulty levels

Swap the `ICONS` array length and adjust `grid-template-columns` to offer 3x4 (easy) or 6x6 (hard) boards.

### Persist best scores

Store the lowest move count and fastest time in `localStorage`, comparing against the current run when a game ends.

### Add sound effects

Attach short audio clips to `flipCard`, a successful match, and the win state using the `Audio` constructor.

## 🌐 Browser Compatibility

- ✅ Chrome, Firefox, Safari, Edge — all modern versions
- **Required Features:** CSS Grid, ES6 destructuring/spread, `classList`

## 🚀 Future Enhancements

- [ ] Selectable difficulty levels (grid size)
- [ ] Best time / fewest moves saved to localStorage
- [ ] Sound effects on flip, match, and win
- [ ] Card flip animation using CSS 3D transforms

---

**Part of the Code Odysseys Project Series** 🚀