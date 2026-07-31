# Alert Notification UI 🔔

![Project Status](https://img.shields.io/badge/status-completed-success)
![Difficulty](https://img.shields.io/badge/difficulty-intermediate-orange)
![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

### Demo :- [Live Now](https://alert-notification.vercel.app/)

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

A toast-style notification system supporting four alert types (success, error, warning, info), each with its own icon, color, and message. Notifications stack in the corner of the screen, auto-dismiss after a countdown shown as a shrinking progress bar, and can also be dismissed manually or all at once.

## ✨ Features

- 🔔 **Four notification types** — success, error, warning, info — each with distinct styling
- ⏱️ **Auto-dismiss with visual countdown** — a progress bar shrinks in sync with the dismiss timer
- ✋ **Manual dismiss** — close button on every toast
- 📌 **Persist mode** — checkbox to disable auto-dismiss for testing or accessibility
- 🧹 **Clear all** — dismiss every active toast at once
- 🥞 **Stacking** — multiple toasts stack vertically without overlapping
- 🎬 **Enter/exit animations** — toasts slide in from the right and slide out on dismiss

## 🎓 Learning Outcomes

This intermediate project teaches:

1. **Dynamic component creation** — building each toast's markup with `innerHTML` and unique IDs
2. **setTimeout for auto-dismiss** — scheduling removal after a fixed delay
3. **CSS animation synced to JS timing** — the progress bar's `animation-duration` matches `AUTO_DISMISS_DELAY` exactly
4. **animationend event** — waiting for an exit animation to finish before removing an element from the DOM
5. **Object lookup tables** — mapping a notification type to its icon/title/message via `TOAST_CONFIG`
6. **Unique ID generation** — using an incrementing counter so multiple toasts can be tracked and dismissed independently
7. **{ once: true } listener option** — auto-removing an event listener after it fires once, avoiding manual cleanup

## 🛠️ Technologies Used

- **HTML5** — Semantic structure
- **CSS3** — Flat neon-themed UI, keyframe animations for slide and progress-bar shrink
- **JavaScript ES6+** — Template literals, dataset attributes, DOM event handling

## 📁 Project Structure

```id="x32pl9"
Alert-notification/
│
├── index.html      # Main structure
├── style.css       # Styling file
├── script.js       # JavaScript logic
├── README.md       # Documentation
```

## 💻 Usage Guide

1. Open `index.html` in a browser
2. Click any of the four trigger buttons (Success, Error, Warning, Info) to spawn a toast
3. Watch the progress bar shrink as the auto-dismiss timer counts down (4 seconds by default)
4. Click the **×** on any toast to dismiss it immediately
5. Check **Persist** before triggering a toast to disable auto-dismiss on that toast
6. Click **Clear All** to dismiss every visible toast at once

## 🔍 Code Walkthrough

### Building a toast dynamically

```javascript
const toast = document.createElement('div');
toast.classList.add('toast', type);
toast.id = toastId;

toast.innerHTML = `
  <span class="toast-icon">${config.icon}</span>
  <div class="toast-body">
    <p class="toast-title">${config.title}</p>
    <p class="toast-message">${config.message}</p>
  </div>
  <button class="toast-close" aria-label="Dismiss">&times;</button>
  ${isPersistent ? '' : '<div class="toast-progress"></div>'}
`;
```

Each toast gets a unique ID from an incrementing counter, so it can be located and removed independently even while other toasts exist on screen.

### Syncing the progress bar with the dismiss timer

```javascript
progressBar.style.animation = `shrinkWidth ${AUTO_DISMISS_DELAY}ms linear forwards`;

setTimeout(() => {
  dismissToast(toastId);
}, AUTO_DISMISS_DELAY);
```

The CSS animation duration is set inline from the same `AUTO_DISMISS_DELAY` constant used by `setTimeout`, so the visual countdown always matches the actual dismiss timing exactly — changing the constant updates both automatically.

### Waiting for the exit animation before removal

```javascript
function dismissToast(toastId) {
  const toast = document.getElementById(toastId);
  if (!toast) return;

  toast.classList.add('leaving');

  toast.addEventListener('animationend', () => {
    toast.remove();
  }, { once: true });
}
```

Adding the `leaving` class triggers the slide-out CSS animation. Removing the element immediately would cut the animation short, so removal happens inside an `animationend` listener instead, and `{ once: true }` ensures the listener cleans itself up without needing a manual `removeEventListener` call.

## 🎨 Customization Guide

### Add different toast positions

Offer top-left, bottom-right, or bottom-center stacking by adding position variants to `.toast-stack` and letting the user pick.

### Queue toasts instead of stacking

Cap the number of visible toasts and hold extras in a JavaScript array, releasing the next one only when a slot frees up.

### Add action buttons

Extend `TOAST_CONFIG` with an optional action label and callback, rendering an extra button inside the toast for things like "Undo".

## 🌐 Browser Compatibility

- ✅ Chrome, Firefox, Safari, Edge — all modern versions
- **Required Features:** CSS animations, `animationend` event, template literals

## 🚀 Future Enhancements

- [ ] Configurable toast position (corner selection)
- [ ] Maximum visible toast limit with a queue for the rest
- [ ] Action buttons (e.g. "Undo", "View details")
- [ ] Sound effect per notification type
- [ ] Pause auto-dismiss timer on hover

---

**Part of the Code Odysseys Project Series** 🚀