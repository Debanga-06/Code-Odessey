# Video Player UI 🎬

![Project Status](https://img.shields.io/badge/status-completed-success)
![Difficulty](https://img.shields.io/badge/difficulty-intermediate-orange)
![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

### Demo :- [Live Now](https://video-player-ui-three.vercel.app/)

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

A fully custom video player UI built around a real HTML5 `<video>` element with the native controls hidden. Unlike the Music Player project, this one drives an actual media element — every control (play, seek, volume, playback speed, fullscreen) maps to a real browser media API rather than a simulated timer.

## ✨ Features

- ▶️ **Play / pause** — via the control bar, a center overlay icon, or clicking the video itself
- 📊 **Seekable progress bar** — click or drag to jump to any point in the video
- 🌫️ **Buffered range indicator** — a separate fill shows how much of the video has downloaded
- 🔊 **Volume control** — slider plus a mute toggle button, with the icon reflecting current level
- ⚡ **Playback speed selector** — 0.5x to 2x using the video's native `playbackRate`
- ⛶ **Real fullscreen** — uses the Fullscreen API, not a CSS trick
- 👻 **Auto-hiding controls** — the control bar fades out during playback when the mouse is idle, and reappears on movement

## 🎓 Learning Outcomes

This intermediate project teaches:

1. **HTML5 `<video>` element and its API** — `play()`, `pause()`, `currentTime`, `duration`, `volume`, `muted`, `playbackRate`
2. **Media events** — `play`, `pause`, `timeupdate`, `progress`, `loadedmetadata`, each firing at a different, specific moment
3. **Drag-to-seek with document-level listeners** — `mousedown` on the seek bar, then `mousemove`/`mouseup` on `document` so dragging still works even if the cursor leaves the seek bar itself
4. **The `buffered` TimeRanges object** — reading how much of the video has loaded to render a separate buffered indicator
5. **The Fullscreen API** — `requestFullscreen()` and `exitFullscreen()`, checked against `document.fullscreenElement`
6. **Auto-hide UI pattern** — using `setTimeout` combined with `clearTimeout` on every mouse movement to hide controls only after a period of inactivity
7. **Hiding native browser UI** — omitting the `controls` attribute entirely and building every control from scratch

## 🛠️ Technologies Used

- **HTML5** — `<video>` element, semantic control structure
- **CSS3** — Flat neon-themed overlay controls, gradient scrim behind the control bar
- **JavaScript ES6+** — Media element API, Fullscreen API, drag event handling

## 📁 Project Structure

```id="x32pl9"
music-ui/
│
├── index.html      # Main structure
├── style.css       # Styling file
├── script.js       # JavaScript logic
├── README.md       # Documentation
```

## 💻 Usage Guide

1. Open `index.html` in a browser (requires an internet connection to load the sample video)
2. Click the video or the play button to start playback
3. Drag the pink handle on the seek bar, or click anywhere on it, to jump to a specific point
4. Adjust volume with the slider, or click the speaker icon to mute/unmute
5. Change playback speed using the dropdown (0.5x to 2x)
6. Click the fullscreen icon to enter/exit true fullscreen mode
7. Move the mouse away during playback — the control bar fades out after 2.5 seconds of inactivity, and reappears on movement

## 🔍 Code Walkthrough

### Driving controls from real media events

```javascript
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('progress', updateBuffered);
```

`timeupdate` fires repeatedly as the video plays and drives the seek bar position and time text. `progress` fires as data downloads and is unrelated to playback position — used here specifically to update the separate buffered-range indicator.

### Drag-to-seek across the whole document

```javascript
seekTrack.addEventListener('mousedown', (event) => {
  isDraggingSeek = true;
  seekToPosition(event.clientX);
});

document.addEventListener('mousemove', (event) => {
  if (isDraggingSeek) seekToPosition(event.clientX);
});

document.addEventListener('mouseup', () => {
  isDraggingSeek = false;
});
```

Listening for `mousemove` and `mouseup` on `document` — not just the seek bar — means dragging keeps working smoothly even if the cursor moves outside the narrow seek bar area mid-drag, which is standard behavior for any custom slider.

### Auto-hiding the control bar

```javascript
function showControls() {
  controlsBar.style.opacity = '1';
  clearTimeout(controlsHideTimeoutId);

  if (!video.paused) {
    controlsHideTimeoutId = setTimeout(() => {
      controlsBar.style.opacity = '0';
    }, 2500);
  }
}
```

Every mouse movement resets the hide timer via `clearTimeout` before starting a fresh one — so the controls only fade out after a genuine 2.5-second pause in mouse activity, and only while the video is actually playing.

## 🎨 Customization Guide

### Add keyboard shortcuts

Listen for `keydown` on `document` to support space (play/pause), arrow keys (seek ±5s), and `m` (mute), common conventions across video platforms.

### Add multiple quality/source options

Extend the speed dropdown pattern to a quality selector that swaps `video.src` and restores `currentTime` afterward.

### Add a custom loading spinner

Listen for the `waiting` and `canplay` events to show/hide a buffering spinner when the video stalls mid-playback.

## 🌐 Browser Compatibility

- ✅ Chrome, Firefox, Safari, Edge — all modern versions
- **Required Features:** HTML5 `<video>`, Fullscreen API, media events
- ⚠️ Autoplay with sound is blocked by most browsers until the user interacts with the page — expected default behavior, not a bug

## 🚀 Future Enhancements

- [ ] Keyboard shortcuts (space, arrow keys, `m` for mute, `f` for fullscreen)
- [ ] Picture-in-picture support via the PiP API
- [ ] Quality/resolution selector
- [ ] Subtitle/caption track toggle
- [ ] Custom loading spinner during buffering

---

**Part of the Code Odysseys Project Series** 🚀