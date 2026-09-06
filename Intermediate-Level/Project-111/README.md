# Meme Generator - API Integration 😂

![Project Status](https://img.shields.io/badge/status-completed-success)
![Difficulty](https://img.shields.io/badge/difficulty-intermediate-orange)
![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![API](https://img.shields.io/badge/API-Imgflip-8e44ad)

## Live Demo :- [Link](https://meme-generator-beta-lac.vercel.app/)

## ⚠️ A Heads-Up on Exporting Templates (Tainted Canvas)

This app draws memes onto an HTML `<canvas>` so it can export a real PNG file — not just a
screenshot. That means it runs into a classic browser security rule: **once you draw a
cross-origin image onto a canvas, the browser won't let you read pixels back out of that
canvas** (`toDataURL()` throws a `SecurityError`) unless the image's server sent the right CORS
headers. Some Imgflip template images cooperate with this; if one doesn't, you'll see a clear
error message telling you to try uploading your own image instead — uploaded images are loaded
via `FileReader` as a `data:` URL, which is same-origin by definition and **always** exports
successfully. See [Error Handling](#error-handling) for the full explanation.

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Learning Outcomes](#learning-outcomes)
- [Technologies Used](#technologies-used)
- [API Setup](#api-setup)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage Guide](#usage-guide)
- [API Integration Details](#api-integration-details)
- [Code Walkthrough](#code-walkthrough)
- [Error Handling](#error-handling)
- [Customization Guide](#customization-guide)
- [Deployment](#deployment)
- [Browser Compatibility](#browser-compatibility)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

A **production-ready meme generator** that pulls popular templates from
[Imgflip](https://imgflip.com/api) and lets you add fully draggable, styleable text directly
on top — all rendered and composited client-side with the Canvas API, no server-side image
processing involved. Unlike relying on Imgflip's paid captioning endpoint, this app does the
actual "image manipulation, text overlay" itself: positioning, styling, and finally baking
text into the image pixel-for-pixel for a downloadable PNG.

**Live Demo:** *(add your deployed link here once hosted)*

## ✨ Features

### Core Functionality
- 🖼️ **Template Gallery** - Browse Imgflip's popular meme templates, searchable by name
- 📁 **Custom Image Upload** - Use your own image instead of a template
- ✍️ **Draggable Text Boxes** - Click to add text, drag anywhere on the image to reposition
- 🎨 **Per-Box Styling** - Font size, text color, and outline color, controlled independently per text box
- ➕ **Multiple Text Boxes** - Templates start with sensible defaults (top/bottom for 2-box memes) but you can add or remove freely
- ⬇️ **PNG Export** - Download the finished meme at the template's full original resolution, not just what's visible on screen

### Technical Features
- ⚡ **Async/Await** - Modern asynchronous JavaScript patterns
- 🔓 **No API Key Required** - Nothing to configure, gitignore, or sign up for
- 🖱️ **Click-vs-Drag Disambiguation** - Pointer Events distinguish "click to edit text" from "drag to reposition" using a movement threshold, so both gestures feel natural on the same element
- 📝 **contentEditable Text Boxes** - Real inline text editing directly on the image, no separate input field needed
- 🖼️ **FileReader for Local Images** - Reads an uploaded file as a `data:` URL entirely client-side
- 🎨 **Canvas Image Composition** - Final export draws the image and every text box onto a hidden canvas at full resolution, scaling font size proportionally so exports never look blurry or mis-sized
- 🛡️ **Tainted-Canvas Handling** - Catches and clearly explains the CORS-related export failure that cross-origin template images can trigger
- 🎯 **Loading Skeletons** - Placeholder tiles while the template gallery loads
- 🎨 **Theme Switcher** - Dark, light, and retro themes, persisted in localStorage

## 🎓 Learning Outcomes

This intermediate project teaches:

1. **Fetch API** - Making HTTP requests to a keyless external API
2. **Async/Await** - Modern asynchronous JavaScript syntax
3. **Fetch-Once, Filter-Client-Side** - Loading the template list once and searching it in memory (same pattern as project 105)
4. **Pointer Events** - Using `pointerdown`/`pointermove`/`pointerup` with `setPointerCapture()` for reliable dragging, including on touch devices
5. **Click vs. Drag Disambiguation** - Using a small movement threshold to decide whether a gesture was a tap (select/edit) or a drag (reposition)
6. **contentEditable** - Building in-place text editing without a separate `<input>` overlay
7. **FileReader API** - Reading a locally selected file into a usable image source
8. **Canvas Image Composition** - `drawImage()` for the base image, then `fillText()`/`strokeText()` for styled, outlined text, all at full source resolution
9. **Coordinate Scaling** - Converting on-screen percentage-based positions into full-resolution canvas coordinates so the export always matches what you see, at any window size
10. **CORS and the Tainted Canvas Restriction** - A genuinely important browser security concept that only shows up once you try to *export* canvas pixel data, not just display it
11. **Dataset Attributes** - Using `data-*` attributes as a lightweight per-element state store instead of a separate JS object to track
12. **CSS Custom Properties** - Reusing a multi-theme system across projects

## 🛠️ Technologies Used

- **HTML5** - Semantic markup structure, `<canvas>` for export
- **CSS3** - Custom properties for theming, absolutely-positioned draggable overlays
- **JavaScript ES6+** - Async/await, Fetch API, Pointer Events, FileReader, Canvas 2D API
- **Imgflip API** - Popular meme template list, keyless and free

## 🔑 API Setup

No setup needed — Imgflip's `get_memes` endpoint is **open and requires no authentication**.
There's no key to generate, no account to create, and nothing to gitignore.

```javascript
const TEMPLATES_URL = "https://api.imgflip.com/get_memes";
```

> Note: this app deliberately does **not** use Imgflip's `/caption_image` endpoint, which
> requires a username/password and only returns a hosted image URL rather than teaching any
> image manipulation. Doing the compositing ourselves with Canvas is both keyless and a much
> better fit for what this project is meant to teach.

## 📁 Project Structure

```
Meme-Generator/
│
├── index.html          # Markup, includes the hidden export <canvas>
├── style.css             # CSS-variable-based theming, template grid, draggable text boxes
├── script.js              # API calls, dragging, styling, canvas export
└── README.md              # This file
```

## 🚀 Installation

### Method 1: Direct Download

1. **Download the files**
   ```bash
   git clone https://github.com/your-username/Code-Odysseys.git
   cd Code-Odysseys/Meme-Generator
   ```

2. **Open in browser** — no configuration needed
   ```bash
   open index.html
   ```

### Method 2: Local Server (Recommended)

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000`

## 💻 Usage Guide

### Picking a Template

1. Browse or search the template gallery (try "drake" or "doge")
2. Click a template — the editor appears below with default TOP/BOTTOM text boxes already placed

### Using Your Own Image

Click **📁 Upload Image** instead of picking a template. Your image loads into the same editor, and — unlike templates — is guaranteed to export without any CORS issues.

### Editing Text

- **Click** any text box to select it and edit its content directly (it's editable right there on the image)
- **Drag** any text box to reposition it anywhere on the image
- Use the panel on the right to adjust the selected box's font size, text color, and outline color
- Click **➕ Add Text** for additional text boxes beyond the defaults

### Downloading

Click **⬇️ Download PNG** once you're happy with it. The exported file matches the template's original resolution, not just what's visible in your browser window.

## 🔗 API Integration Details

### Endpoint Used

```
GET https://api.imgflip.com/get_memes
```

**Response Example (trimmed):**
```json
{
  "success": true,
  "data": {
    "memes": [
      {
        "id": "181913649",
        "name": "Drake Hotline Bling",
        "url": "https://i.imgflip.com/30b1gx.jpg",
        "width": 1200,
        "height": 1200,
        "box_count": 2
      }
    ]
  }
}
```

`box_count` is used to decide how many default text boxes to place — 2 or more gets a
top/bottom pair, anything else gets a single centered box.

### Data Flow

```
Page loads → fetch the full template list once → cache in memory
        ↓
User searches → filter the cached list client-side (no re-fetch)
        ↓
User picks a template or uploads a file → load it into the stage
        ↓
Default text boxes placed based on box_count (templates) or 1 (uploads)
        ↓
User drags/edits/styles text boxes directly on the image
        ↓
User clicks Download → compose everything onto a hidden canvas at full
resolution → export as PNG (or show a clear CORS error for templates
whose host doesn't cooperate)
```

## 🔍 Code Walkthrough

### 1. Click vs. Drag Disambiguation with Pointer Events

```javascript
box.addEventListener("pointerdown", (event) => {
  dragging = true;
  moved = false;
  startX = event.clientX;
  startY = event.clientY;
  box.setPointerCapture(event.pointerId);
});

box.addEventListener("pointermove", (event) => {
  if (!dragging) return;
  const dx = event.clientX - startX;
  const dy = event.clientY - startY;
  if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
    moved = true; // only now do we treat this as a real drag
    // ...reposition the box
  }
});

box.addEventListener("pointerup", (event) => {
  dragging = false;
  if (!moved) selectTextBox(box); // small/no movement = a tap, not a drag
});
```

### 2. Scaling On-Screen Positions to Full Export Resolution

```javascript
const scale = memeImage.naturalWidth / memeImage.getBoundingClientRect().width;
const fontSize = Number(box.dataset.fontSize) * scale; // keeps text proportionally correct at any window size
```

### 3. The Tainted Canvas Error, Caught and Explained

```javascript
try {
  composeExportCanvas();
  triggerDownload(); // toDataURL() is where a tainted canvas actually throws
} catch (err) {
  alert(
    "This template's image couldn't be exported due to a browser security restriction (CORS). " +
    "Try uploading your own image instead — uploaded images always export fine."
  );
}
```

### 4. Why Uploaded Images Never Have This Problem

```javascript
reader.onload = () => {
  // A data: URL is generated locally and is same-origin by definition —
  // there's no cross-origin server involved, so no CORS headers are needed.
  loadImageIntoStage(reader.result, false);
};
reader.readAsDataURL(file);
```

## 🛡️ Error Handling

### Error Types & Messages

| Error | User Message | Technical Cause |
|---|---|---|
| Template gallery fails to load | "Couldn't load templates. You can still upload your own image below." | Network failure — upload still works independently |
| Export fails on a template image | "This template's image couldn't be exported due to a browser security restriction (CORS)..." | `toDataURL()` throws `SecurityError` because the image's host didn't send CORS headers, even with `crossOrigin="anonymous"` set |
| Image not finished loading | "Please wait for the image to finish loading." | User clicked Download before the `<img>` fully loaded |
| Search with no matches | "No templates match your search." | Client-side filter of the cached template list returned nothing |

### Why This Error Can't Always Be "Fixed" in the App

The tainted-canvas restriction is enforced by the *browser*, based on whether the *image's
server* (in this case, Imgflip's CDN) chooses to send CORS headers. There's no client-side
workaround beyond routing the image through your own backend as a proxy — which is out of
scope for a static frontend project. Falling back to "just upload your own image" is the
honest, always-working solution here, not a hack.

## 🎨 Customization Guide

### Add Text Rotation

Store a `rotation` value in each box's dataset, apply it via `transform: rotate()` on screen, and mirror it with `ctx.rotate()` (around the box's own center) during export.

### Add a Font Picker

Swap `Impact` for a Google Font loaded via `<link>`, and expose a `<select>` in the controls panel that updates `box.style.fontFamily` and the export's `ctx.font` together.

### Save Drafts

Serialize the current image source (if it's a `data:` URL) plus each text box's position/text/style to `localStorage`, and restore it on load — a nice pairing with the favorites pattern used in other projects in this series.

### Change Color Theme

Add a new theme block in `style.css` and a matching button in `index.html`:

```css
body[data-theme="neon"] {
  --bg: #0a0014;
  --bg-elevated: #150022;
  --text: #f0e6ff;
  --accent: #ff2e88;
  --accent-text: #0a0014;
  --border: #2a0040;
}
```

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub** — no secrets to worry about, since there's no API key

2. **Import in Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your repository
   - Click "Deploy"

No environment variables needed. The CORS/tainted-canvas behavior is unaffected by deployment — it depends entirely on Imgflip's server, not yours.

## 🌐 Browser Compatibility

- ✅ Chrome 55+ (Pointer Events, Canvas)
- ✅ Firefox 59+
- ✅ Safari 13+ (note the crossOrigin-before-src ordering requirement)
- ✅ Edge 79+
- ✅ Opera 42+

**Required Features:**
- Fetch API
- Async/Await
- Pointer Events (`setPointerCapture`)
- `contentEditable`
- Canvas 2D API
- FileReader API

## 🚀 Future Enhancements

- [ ] Text rotation and multi-line auto-sizing
- [ ] Font family picker
- [ ] Save/restore draft memes via localStorage
- [ ] Undo/redo for text box edits
- [ ] Sticker/emoji overlays in addition to text
- [ ] Share button (Web Share API) for the exported PNG
- [ ] "Recent memes I've made" gallery, saved locally
- [ ] Light/dark auto-detection via `prefers-color-scheme`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Commit and push
6. Open a Pull Request

## 📝 License

This project is licensed under the AGPL-3.0 License.

---

## 🎓 Learning Resources

- [Imgflip API Documentation](https://imgflip.com/api)
- [MDN - Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [MDN - Pointer Events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events)
- [MDN - Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [MDN - Using Cross-Origin Images in a Canvas (the tainted canvas explainer)](https://developer.mozilla.org/en-US/docs/Web/HTML/How_to/CORS_enabled_image)
- [MDN - FileReader](https://developer.mozilla.org/en-US/docs/Web/API/FileReader)

---

**Part of the Code Odysseys Project Series** 🚀

*Intermediate-level project demonstrating client-side canvas image composition and the CORS tainted-canvas restriction*

**Happy Coding!** 😂✨