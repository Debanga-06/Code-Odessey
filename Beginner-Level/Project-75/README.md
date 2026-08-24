# Feedback Form 📝

![Project Status](https://img.shields.io/badge/status-completed-success)
![Difficulty](https://img.shields.io/badge/difficulty-beginner-brightgreen)
![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

### Demo :- [Live Now](

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

A feedback collection form combining a 5-star rating, an emoji satisfaction scale, optional contact fields, and a character-limited comment box. Submitting validates that a star rating and a message were both provided before showing a confirmation screen, all handled client-side with no backend.

## ✨ Features

- ⭐ **5-star rating** with hover preview before clicking
- 😐 **Emoji satisfaction scale** — five selectable mood options from poor to great
- ✍️ **Character-limited textarea** — live counter, capped at 300 characters via `maxlength`
- ✅ **Form validation** — star rating and message are required; inline error messages appear only for the fields that are missing
- 🎉 **Success screen** — replaces the form after a valid submission, with an option to submit another response
- 🔄 **Full reset** — restarts the form to a completely blank state, including ratings and emoji selection

## 🎓 Learning Outcomes

This beginner project teaches:

1. **Form submit handling** — using `event.preventDefault()` to stop the default page reload and validate manually
2. **Custom rating widgets** — building a star rating from scratch with hover preview and click-to-select, similar to the earlier Star Rating Widget project but now inside a real form
3. **maxlength combined with a live counter** — pairing HTML's built-in character limit with a JS-driven counter display
4. **Simple validation logic** — checking required fields and toggling per-field error messages rather than one generic alert
5. **Screen switching after submission** — hiding the form and showing a confirmation view using the `hidden` class
6. **form.reset()** — using the native form reset method alongside manually clearing custom widget state (stars, emoji) that isn't part of the native form
7. **Object array for scale options** — defining the emoji scale as data (`EMOJI_OPTIONS`) and rendering it in a loop rather than hardcoding five elements

## 🛠️ Technologies Used

- **HTML5** — Semantic form structure, native input types (`email`, `maxlength`)
- **CSS3** — Flat neon-themed form UI
- **JavaScript ES6+** — Form events, DOM manipulation, array iteration

## 📁 Project Structure

```id="x32pl9"
feedback-form/
│
├── index.html      # Main structure
├── style.css       # Styling file
├── script.js       # JavaScript logic
├── README.md       # Documentation
```

## 💻 Usage Guide

1. Open `index.html` in a browser
2. Click stars to set a rating — hovering previews the selection before you click
3. Pick a mood from the emoji scale
4. Optionally fill in your name and email
5. Type your feedback in the message box (up to 300 characters, tracked live)
6. Click **Submit Feedback** — if the rating or message is missing, an inline error appears next to that field
7. On successful submission, a thank-you screen appears; click **Submit Another Response** to reset and try again

## 🔍 Code Walkthrough

### Validating required fields independently

```javascript
function validateForm() {
  let isValid = true;

  if (selectedStars === 0) {
    ratingError.classList.remove('hidden');
    isValid = false;
  }

  if (messageInput.value.trim().length === 0) {
    messageError.classList.remove('hidden');
    isValid = false;
  }

  return isValid;
}
```

Each required field is checked independently, showing its own specific error message rather than a single blanket alert — this gives the user clear, targeted feedback about exactly what's missing, and both checks run even if the first one fails, so all relevant errors show up at once.

### Resetting both native and custom form state

```javascript
function resetForm() {
  feedbackForm.reset();
  selectedStars = 0;
  selectedEmoji = null;
  previewStars(0);

  document.querySelectorAll('.emoji-option').forEach(option => {
    option.classList.remove('selected');
  });
  ...
}
```

`form.reset()` only clears native form controls (text inputs, textarea) — it has no effect on the custom star rating or emoji scale, which are just styled `<span>`/`<div>` elements with JS-tracked state. Both types of reset are necessary together for the form to truly return to a blank state.

### Building the emoji scale from data

```javascript
EMOJI_OPTIONS.forEach(option => {
  const item = document.createElement('div');
  item.classList.add('emoji-option');
  item.dataset.value = option.value;

  item.innerHTML = `${option.icon}<span class="emoji-label">${option.label}</span>`;

  item.addEventListener('click', () => selectEmoji(option.value));
  emojiScale.appendChild(item);
});
```

Keeping the five mood options as an array of objects means the visible order, icons, and labels can all be changed in one place, and the same rendering loop handles any number of options without editing the HTML directly.

## 🎨 Customization Guide

### Add a "Not applicable" skip option

Add an extra button that sets `selectedStars` to a sentinel value (e.g. `-1`) meaning "skip", and adjust validation to accept it as a valid submission state.

### Connect to a real backend

Replace the client-side-only `handleSubmit` with a `fetch()` POST request to a feedback API, showing the success screen only after a successful response.

### Add category tagging

Add a set of selectable tag chips (e.g. "Bug", "Feature request", "UI issue") that get included alongside the star rating and message.

## 🌐 Browser Compatibility

- ✅ Chrome, Firefox, Safari, Edge — all modern versions
- **Required Features:** Form events, `maxlength` attribute, `classList`

## 🚀 Future Enhancements

- [ ] Real backend submission via `fetch()`
- [ ] Category/tag selection for the feedback type
- [ ] File/screenshot attachment support
- [ ] Email confirmation sent after submission
- [ ] Star rating tied to a specific question set per rating level

---

**Part of the Code Odysseys Project Series** 🚀