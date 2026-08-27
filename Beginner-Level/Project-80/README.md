# Badge Generator 🏷️

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
- [Browser Compatibility](#browser-compatibility)
- [Future Enhancements](#future-enhancements)

## 🎯 Overview

A tool for building shields.io-style status badges (the small "build: passing" pills seen in GitHub READMEs) entirely with generated SVG markup. Users customize the label text, message text, colors, and corner style, then copy a ready-to-paste Markdown image tag pointing to a self-contained data URL — no external badge service required.

## ✨ Features

- 🔤 **Custom label and message text**, live-updating as you type
- 🎨 **Independent color pickers** for the label and message halves of the badge
- 📐 **Three corner styles** — flat, rounded, square
- ⚡ **Quick presets** — one-click common badge combinations (build passing, license, version, coverage)
- 🖼️ **Live SVG preview** rendered directly in the page
- 📋 **Copy-ready Markdown** — outputs a `![badge](data:image/svg+xml,...)` tag using an inline data URL, so the badge works without hosting an image anywhere

## 🎓 Learning Outcomes

This intermediate project teaches:

1. **Generating SVG from a JavaScript template literal** — building valid SVG markup as a string based on current input values
2. **Rendering SVG via innerHTML** — inserting generated SVG markup directly into the DOM and having the browser render it as a real image
3. **Estimating text width for dynamic sizing** — approximating pixel width from character count so badge segments size themselves to fit their text
4. **SVG clipPath for rounded corners on a two-color shape** — using a shared `<clipPath>` so both color rectangles get clipped to one consistent rounded outline instead of each needing its own radius logic
5. **Data URLs and URL encoding** — converting raw SVG markup into a `data:image/svg+xml,...` URL using `encodeURIComponent`, with extra replacements for characters Markdown/URL contexts handle awkwardly
6. **Reusable UI-building functions** — a single `buildColorSwatches()` function parameterized by container, color list, and selection handler, used identically for both the label and message color pickers
7. **Preset objects as configuration** — reading `data-*` attributes off preset buttons to apply a full badge configuration in one click

## 🛠️ Technologies Used

- **HTML5** — Semantic structure, `data-*` attributes for presets
- **CSS3** — Flat neon-themed two-panel layout
- **JavaScript ES6+** — Template literals, `encodeURIComponent`, Clipboard API

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
2. Type your label and message text — the badge preview updates instantly
3. Pick colors for the label and message halves independently
4. Choose a corner style: flat, rounded, or square
5. Or click a quick preset to apply a common badge configuration in one click
6. Click **Copy** under the Markdown box to copy the ready-to-use image tag to your clipboard, then paste it into any README or Markdown file

## 🔍 Code Walkthrough

### Building SVG markup as a string

```javascript
function buildBadgeSVG() {
  const labelWidth = estimateTextWidth(labelText);
  const messageWidth = estimateTextWidth(messageText);
  const totalWidth = labelWidth + messageWidth;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="20">
    ...
  </svg>`;
}
```

SVG is just XML text, so it can be constructed the same way as any other HTML string — template literals interpolate the calculated widths and colors directly into valid SVG attributes and elements.

### Clipping two rectangles to one rounded outline

```javascript
<clipPath id="clip">
  <rect width="${totalWidth}" height="20" rx="${radius}"/>
</clipPath>
<g clip-path="url(#clip)">
  <rect width="${labelWidth}" height="20" fill="${selectedLabelColor}"/>
  <rect x="${labelWidth}" width="${messageWidth}" height="20" fill="${selectedMessageColor}"/>
</g>
```

Without the shared clip path, giving each rectangle its own `rx` would round all four corners of *both* rectangles — including the two inner corners that meet in the middle, which should stay sharp. Wrapping both rectangles in a `<g>` clipped to a single rounded outline solves this in one step instead of manually drawing separate rounded/square corners per rectangle.

### Converting SVG markup into a usable data URL

```javascript
function updateMarkdownOutput(svgMarkup) {
  const encoded = encodeURIComponent(svgMarkup)
    .replace(/'/g, '%27')
    .replace(/"/g, '%22');

  const dataUrl = `data:image/svg+xml,${encoded}`;
  markdownOutput.textContent = `![badge](${dataUrl})`;
}
```

`encodeURIComponent` handles most special characters, but leaves single and double quotes unescaped by default — since the SVG markup itself contains attribute quotes, those are manually replaced afterward to keep the resulting data URL valid inside a Markdown image tag.

## 🎨 Customization Guide

### Add icon support

Extend the SVG template with an optional `<image>` or inline icon path element positioned before the label text, similar to how shields.io supports a `logo` parameter.

### Add gradient fills

Replace the flat `fill="${color}"` rectangles with `<linearGradient>` definitions for a more polished look.

### Export as a downloadable SVG file

Add a "Download SVG" button that creates a `Blob` from the generated markup and triggers a file download, instead of only offering the Markdown copy option.

## 🌐 Browser Compatibility

- ✅ Chrome, Firefox, Safari, Edge — all modern versions
- **Required Features:** Inline SVG rendering, Clipboard API, template literals

## 🚀 Future Enhancements

- [ ] Icon/logo support inside the badge
- [ ] Gradient fill option
- [ ] Downloadable SVG file export
- [ ] More corner and style presets (e.g. "for-the-badge" flat style)
- [ ] HTML `<img>` tag output alongside Markdown

---

**Part of the Code Odysseys Project Series** 🚀