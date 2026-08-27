# Profile Card Generator 🪪

![Project Status](https://img.shields.io/badge/status-completed-success)
![Difficulty](https://img.shields.io/badge/difficulty-intermediate-orange)
![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

### Demo :- [Live Now](https://profile-card-generator-three.vercel.app/)

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

A live profile card builder — type into a form on the left and watch a styled card update in real time on the right. Covers name, role, a character-limited bio, an accent color picker, and optional social links, with a "Copy Card Summary" button that copies a plain-text version of the card to the clipboard.

## ✨ Features

- ⚡ **Live preview** — every field updates the card instantly as you type, no submit button needed
- 🔤 **Auto-generated initials avatar** — derived from the entered name, no image upload required
- 🎨 **Accent color picker** — 6 selectable colors that theme the banner, avatar text, and role text together
- ✍️ **Character-limited bio** — capped at 120 characters with a live counter
- 🔗 **Optional social link chips** — only rendered for platforms the user actually filled in
- 📋 **Copy card summary** — generates a plain-text version of the card details and copies it to the clipboard

## 🎓 Learning Outcomes

This intermediate project teaches:

1. **Live two-way UI sync** — every input's `input` event triggers the same `updatePreview()` function, keeping the card and form in sync without a submit step
2. **Deriving initials from a full name** — splitting on whitespace, filtering out extra spaces, and handling single-word vs. multi-word names differently
3. **Filtering an array of optional fields** — building a socials array with `null` placeholders for empty fields, then using `.filter(Boolean)` to drop the empty ones cleanly
4. **Dynamic inline styling** — applying a user-selected color to multiple elements (`banner`, `avatar`, `role text`) by setting `style.background`/`style.color` in JavaScript
5. **Regex for whitespace splitting** — `split(/\s+/)` handling names with multiple or irregular spaces between words
6. **Clipboard API** — writing a generated plain-text summary to the clipboard with `navigator.clipboard.writeText()`
7. **Sensible fallback text** — showing placeholder copy ("Your Name", "Your Role") when a field is empty, so the card preview never looks broken

## 🛠️ Technologies Used

- **HTML5** — Semantic structure with a two-panel form/preview layout
- **CSS3** — Flat neon-themed UI, circular avatar with negative margin overlap on the banner
- **JavaScript ES6+** — Array methods (`filter`, `join`), regex, Clipboard API

## 📁 Project Structure


```id="x32pl9"
profile-generator/
│
├── index.html      # Main structure
├── style.css       # Styling file
├── script.js       # JavaScript logic
├── README.md       # Documentation
```

## 💻 Usage Guide

1. Open `index.html` in a browser
2. Type a name, role, and short bio — the card on the right updates as you type
3. Pick an accent color — it applies to the card's banner, avatar initials, and role text together
4. Optionally fill in GitHub, Twitter, and LinkedIn usernames — chips appear on the card only for the ones you fill in
5. Click **Copy Card Summary** to copy a plain-text version of the profile to your clipboard

## 🔍 Code Walkthrough

### Generating initials from a name

```javascript
function getInitials(fullName) {
  const words = fullName.trim().split(/\s+/).filter(word => word.length > 0);

  if (words.length === 0) return '?';
  if (words.length === 1) return words[0].charAt(0).toUpperCase();

  return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
}
```

`split(/\s+/)` handles any number of spaces between words (not just single spaces), and the `.filter()` afterward removes any empty strings that could result from leading/trailing whitespace. The function then branches on how many words remain: no name gives a `?` placeholder, a single word uses just its first letter, and multiple words combine the first and last word's initials — the standard two-letter avatar convention.

### Filtering out empty optional fields

```javascript
const socials = [
  { label: 'GitHub', value: githubInput.value.trim() },
  { label: 'Twitter', value: twitterInput.value.trim() },
  { label: 'LinkedIn', value: linkedinInput.value.trim() }
].filter(social => social.value.length > 0);
```

All three social fields are optional. Rather than three separate `if` checks, they're built into one array and filtered down to just the ones with actual content — the rendering loop afterward doesn't need to know or care which specific platforms were filled in.

### Applying a shared accent color to multiple elements

```javascript
cardBanner.style.background = selectedColor;
avatar.style.color = selectedColor;
cardRole.style.color = selectedColor;
```

A single `selectedColor` variable, updated when a swatch is clicked, is applied to three visually distinct parts of the card in one pass — keeping the card's theme consistent without needing three separate color state variables.

## 🎨 Customization Guide

### Add real image upload

Replace the initials avatar with a `<input type="file">` that reads the selected image using `FileReader` and sets it as the avatar's background image.

### Export as a downloadable image

Use a library like `html2canvas` to convert the rendered `.profile-card` element into a PNG the user can download, instead of just copying text.

### Add more social platforms

Extend the `socials` array pattern with additional platforms (Instagram, personal website, etc.), each following the same optional-field-with-fallback structure.

## 🌐 Browser Compatibility

- ✅ Chrome, Firefox, Safari, Edge — all modern versions
- **Required Features:** Clipboard API (requires HTTPS or localhost), regex, array methods

## 🚀 Future Enhancements

- [ ] Real image upload for the avatar instead of initials
- [ ] Export card as a downloadable PNG image
- [ ] More social platform options with matching icons
- [ ] Multiple card layout templates to choose from
- [ ] Save/load profile data with localStorage

---

**Part of the Code Odysseys Project Series** 🚀