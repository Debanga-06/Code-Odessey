# Music Player UI 🎧

![Project Status](https://img.shields.io/badge/status-completed-success)
![Difficulty](https://img.shields.io/badge/difficulty-intermediate-orange)
![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

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

A music player interface with play/pause, next/previous track, shuffle, repeat, a seekable progress bar, volume control, and a clickable playlist. No actual audio plays — playback is simulated with a timer that advances a fake "current time" — but every control behaves as it would in a real player, making this a solid exercise in managing interconnected UI and timing state.

## ✨ Features

- ▶️ **Play / pause** toggle with icon swap
- ⏭️ **Next / previous track**, wrapping around the playlist at both ends
- 🔀 **Shuffle mode** — next track is picked randomly instead of sequentially
- 🔁 **Repeat mode** — restarts the current track instead of advancing when it ends
- 📊 **Seekable progress bar** — click anywhere on the track to jump to that position
- 🔊 **Volume slider** with a dynamically updating icon (mute/low/high)
- 📃 **Clickable playlist** — select any track directly, highlighting the currently playing one

## 🎓 Learning Outcomes

This intermediate project teaches:

1. **Simulated playback with setInterval** — advancing a "current time" value once per second to mimic real audio progress
2. **State synchronization across UI pieces** — the progress bar, time labels, playlist highlight, and play button icon all stay in sync from a small set of shared state variables
3. **Percentage-based positioning** — converting elapsed time into a progress bar width and handle position
4. **Click-to-seek calculation** — using `getBoundingClientRect()` and click X-coordinate to compute a seek percentage
5. **Modulo arithmetic for track wraparound** — next/previous looping seamlessly at playlist boundaries
6. **Toggle-based modes** — shuffle and repeat as independent boolean flags that alter playback behavior
7. **Time formatting** — converting raw seconds into a `M:SS` display format with zero-padding

## 🛠️ Technologies Used

- **HTML5** — Semantic structure
- **CSS3** — Flat neon-themed player UI, flexbox layout for controls
- **JavaScript ES6+** — `setInterval`, array methods, event handling, Math methods

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

1. Open `index.html` in a browser
2. Click the center **play** button to start simulated playback — the progress bar advances automatically
3. Use **⏮ / ⏭** to move between tracks, or click any track in the playlist to jump straight to it
4. Toggle **🔀 Shuffle** so "next" picks a random track instead of the next one in order
5. Toggle **🔁 Repeat** so a finished track restarts instead of advancing
6. Click anywhere on the progress bar to seek to that position in the current track
7. Drag the volume slider — the speaker icon updates to reflect mute/low/high levels

## 🔍 Code Walkthrough

### Simulating playback progress

```javascript
function startPlaybackTimer() {
  playbackIntervalId = setInterval(() => {
    const track = PLAYLIST[currentTrackIndex];
    currentSeconds++;

    if (currentSeconds >= track.duration) {
      handleTrackEnd();
      return;
    }

    updateProgressDisplay();
  }, 1000);
}
```

Every second, `currentSeconds` increments by one, standing in for real audio playback position. Once it reaches the track's duration, `handleTrackEnd()` decides whether to repeat or advance, rather than letting the counter run past the track length.

### Calculating seek position from a click

```javascript
function seekTo(event) {
  const rect = progressTrack.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const percentage = Math.min(Math.max(clickX / rect.width, 0), 1);

  const track = PLAYLIST[currentTrackIndex];
  currentSeconds = Math.floor(percentage * track.duration);
  updateProgressDisplay();
}
```

The click's horizontal position relative to the progress bar is converted into a 0-1 percentage, then multiplied by the track's total duration to get the new "current time" — the same pattern used for real HTML5 `<audio>` seeking, just applied to a simulated timer instead of an actual media element.

### Shuffle vs. sequential next track

```javascript
function playNext() {
  if (isShuffleOn) {
    currentTrackIndex = Math.floor(Math.random() * PLAYLIST.length);
  } else {
    currentTrackIndex = (currentTrackIndex + 1) % PLAYLIST.length;
  }
  loadTrack(currentTrackIndex);
}
```

The same function handles both modes by branching on the `isShuffleOn` flag — shuffle picks any random index, while normal mode uses modulo to wrap back to the first track after the last one.

## 🎨 Customization Guide

### Connect real audio playback

Swap the simulated timer for an actual `<audio>` element, using its `timeupdate`, `ended`, and `loadedmetadata` events instead of `setInterval` and a hardcoded `duration` value.

### Add a queue system

Maintain a separate "up next" array that users can add tracks to, checked before falling back to the main playlist order.

### Persist volume and last-played track

Save volume level and `currentTrackIndex` to `localStorage` so the player resumes where the user left off on their next visit.

## 🌐 Browser Compatibility

- ✅ Chrome, Firefox, Safari, Edge — all modern versions
- **Required Features:** `setInterval`, `getBoundingClientRect`, range inputs

## 🚀 Future Enhancements

- [ ] Real audio playback with an `<audio>` element
- [ ] Drag-to-seek on the progress handle (not just click)
- [ ] Queue / "up next" system separate from the main playlist
- [ ] Lyrics panel synced to playback time
- [ ] Keyboard shortcuts (space to play/pause, arrow keys to seek)

---

**Part of the Code Odysseys Project Series** 🚀