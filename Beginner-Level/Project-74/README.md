# Poll Voting UI 📊

![Project Status](https://img.shields.io/badge/status-completed-success)
![Difficulty](https://img.shields.io/badge/difficulty-intermediate-orange)
![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)


### Demo :- [Live Now](https://poll-voting-ui.vercel.app/)

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

A single-question poll where each option shows a live vote count and percentage bar, and clicking an option casts (or changes) the user's vote. Percentages recalculate for every option whenever the vote totals change, since each option's share depends on the total across all of them, not just its own count.

## ✨ Features

- 🗳️ **Click to vote** on any option
- 🔄 **Change your vote** — selecting a different option moves your vote instead of adding an extra one
- 📊 **Live percentage bars** — each option's fill width reflects its share of total votes
- 🔢 **Vote counts and percentages** shown side by side per option
- ✅ **Selected state** — the option you voted for is visually distinguished from the rest
- 🧹 **Reset poll** — zeroes every option's vote count back to a blank slate

## 🎓 Learning Outcomes

This intermediate project teaches:

1. **Array.reduce for aggregation** — summing all option vote counts into a single total
2. **Percentage-of-total calculation** — deriving each option's share from its votes divided by the combined total, guarded against division by zero
3. **Vote-changing logic** — decrementing the previously selected option before incrementing the newly selected one, so switching votes doesn't inflate the total
4. **Re-rendering all options on any single change** — since one option's percentage depends on every other option's vote count, the whole list re-renders together rather than updating just the clicked item
5. **Array.find for locating a specific object** — retrieving the exact option to mutate by its `id`
6. **Non-mutating reset with map and spread** — `pollOptions.map(option => ({ ...option, votes: 0 }))` creates fresh option objects rather than mutating the existing ones in place
7. **Conditional class and content rendering** — showing a checkmark and different color only on the selected option

## 🛠️ Technologies Used

- **HTML5** — Semantic structure
- **CSS3** — Flat neon-themed UI, layered fill bars using absolute positioning
- **JavaScript ES6+** — `reduce`, `find`, `map`, spread syntax, template literals

## 📁 Project Structure

```id="x32pl9"
poll-voting-ui/
│
├── index.html      # Main structure
├── style.css       # Styling file
├── script.js       # JavaScript logic
├── README.md       # Documentation
```

## 💻 Usage Guide

1. Open `index.html` in a browser
2. Click any option to cast your vote — its percentage bar and count update immediately
3. Click a different option to move your vote there instead
4. Watch every option's percentage bar adjust, since they're all relative to the new total
5. Click **Reset Poll** to clear all votes and start over

## 🔍 Code Walkthrough

### Summing votes with reduce

```javascript
function getTotalVotes() {
  return pollOptions.reduce((sum, option) => sum + option.votes, 0);
}
```

`reduce` walks through every option, accumulating a running total starting from `0` — a cleaner alternative to a manual `for` loop with an external counter variable.

### Changing a vote without inflating the total

```javascript
function castVote(optionId) {
  if (selectedOptionId === optionId) return;

  if (selectedOptionId !== null) {
    const previousOption = pollOptions.find(option => option.id === selectedOptionId);
    previousOption.votes--;
  }

  const newOption = pollOptions.find(option => option.id === optionId);
  newOption.votes++;
  selectedOptionId = optionId;

  renderOptions();
}
```

Before adding a vote to the newly clicked option, the previously selected option (if any) has its vote count decremented first — this models a real single-choice poll where one person can only have one active vote at a time, rather than letting the total climb every time someone changes their mind.

### Guarding percentage calculation against zero votes

```javascript
function getPercentage(votes, total) {
  if (total === 0) return 0;
  return Math.round((votes / total) * 100);
}
```

Before any votes are cast, `total` is `0`, which would otherwise produce `NaN` from a division by zero — the guard clause keeps every option showing a clean `0%` instead.

## 🎨 Customization Guide

### Allow multiple selections (checkbox-style poll)

Change `selectedOptionId` to a `Set` of selected IDs, and adjust `castVote` to toggle membership instead of replacing a single value.

### Lock the poll after voting

Add a `hasVoted` flag that, once true, disables further option clicks — showing results only, similar to many real-world poll widgets.

### Animate the winning option

Add a "leading" badge or highlight color to whichever option currently has the highest percentage, recalculated on every render.

## 🌐 Browser Compatibility

- ✅ Chrome, Firefox, Safari, Edge — all modern versions
- **Required Features:** Array methods (`reduce`, `find`, `map`), CSS transitions

## 🚀 Future Enhancements

- [ ] Multi-select (checkbox) poll mode
- [ ] Lock voting after a choice is made
- [ ] Persist votes with localStorage so results survive a reload
- [ ] Multiple polls with a selector to switch between them
- [ ] Animated count-up effect on vote numbers

---

**Part of the Code Odysseys Project Series** 🚀