# 🎵 Spotify Homepage Clone (Static)

> A pixel-accurate static clone of the Spotify web player homepage — built with pure HTML, CSS & vanilla JavaScript. No frameworks, no npm, no build step.

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-1db954?style=flat)

---

## 📸 Preview

A faithful recreation of the Spotify Web Player featuring:
- Dark sidebar with logo, navigation & playlist library
- Hero banner with featured playlist and gradient background
- Horizontally scrollable card grids (Quick Picks, Artists, Charts, Made for You)
- Fully interactive bottom music player bar

---

## ✨ Features Cloned

| Feature | Status |
|---------|--------|
| Sticky dark sidebar with navigation | ✅ |
| Spotify logo & branding | ✅ |
| Your Library section with playlists | ✅ |
| Sticky topbar with Sign Up / Log In | ✅ |
| Topbar scroll effect (blur on scroll) | ✅ |
| Hero section with gradient overlay | ✅ |
| Floating hero art with animation | ✅ |
| Category filter pills (All / Music / Podcasts) | ✅ |
| Quick Picks card grid | ✅ |
| Featured podcast banner | ✅ |
| Popular Artists card grid (circular art) | ✅ |
| Charts card grid | ✅ |
| Made For You card grid | ✅ |
| Play FAB on card hover | ✅ |
| Bottom music player bar | ✅ |
| Play / Pause toggle | ✅ |
| Next / Previous track | ✅ |
| Shuffle & Repeat toggle | ✅ |
| Progress bar with scrubbing | ✅ |
| Volume bar with mute toggle | ✅ |
| Like / Heart button toggle | ✅ |
| Auto-advancing track | ✅ |
| Time-based greeting (Good morning / afternoon / evening) | ✅ |
| Fully responsive (mobile friendly) | ✅ |

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Debanga-06/Code-Odessey.git
cd Code-Odessey/Project-Spotify-Clone
```

### 2. Open in browser

No server required — just open the file directly:

```bash
open index.html
# or double-click index.html in your file explorer
```

> **Tip:** Use [VS Code Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) for the best experience with auto-reload.

---

## 📁 File Structure

```
Project-Spotify-Clone/
├── index.html      ← Everything in one file (HTML + CSS + JS)
└── README.md       ← This file
```

> This is an intentionally single-file project — great for beginners learning how HTML, CSS, and JS work together without tooling complexity.

---

## 🎨 Design Choices Replicated

| Element | Spotify Original | Clone |
|---------|-----------------|-------|
| Background | `#121212` | `#121212` ✅ |
| Accent green | `#1DB954` | `#1DB954` ✅ |
| Sidebar bg | `#000000` | `#000000` ✅ |
| Card bg | `#181818` | `#181818` ✅ |
| Card hover | `#282828` | `#282828` ✅ |
| Font | Circular (proprietary) | Figtree (closest free match) |
| Player height | 90px | 90px ✅ |
| Sidebar width | 240px | 240px ✅ |

---

## 🧠 What You'll Learn

Building this project teaches you:

- **CSS Grid** — 3-area app layout (sidebar / main / player)
- **CSS Custom Properties** — theming with `--variables`
- **`position: sticky`** — topbar that scrolls with effect
- **CSS transitions & animations** — hover reveals, floating art
- **Flexbox** — player bar, card footers, sidebar items
- **DOM Manipulation** — dynamic card rendering with JS
- **Event Listeners** — scroll, click, progress scrubbing
- **`setInterval`** — simulating a music progress bar
- **Responsive Design** — `@media` queries, `clamp()`, `auto-fill` grids
- **CSS `aspect-ratio`** — square cards without fixed heights
- **`-webkit-line-clamp`** — multi-line text truncation

---

## 🖱️ Interactive Controls

| Control | Action |
|---------|--------|
| ▶ Play button (hero or player) | Toggle play/pause |
| ⏭ Next / ⏮ Prev | Switch tracks |
| 🔀 Shuffle | Toggle shuffle (green = on) |
| 🔁 Repeat | Toggle repeat (green = on) |
| ♥ Heart | Like/unlike a track |
| Progress bar | Click anywhere to scrub |
| Volume bar | Click to adjust volume |
| 🔇 Volume icon | Toggle mute |
| Category pills | Switch filter (All / Music / Podcasts) |
| Card ▶ FAB | Click any card to "play" it |

---

## ⚠️ Limitations (Static Clone)

This is a **frontend-only** static clone. The following are not implemented:

- ❌ Real audio playback (no actual music)
- ❌ Authentication / user accounts
- ❌ Spotify API integration
- ❌ Search functionality
- ❌ Real playlist data

These would require a backend + Spotify Developer API keys, which is an intermediate/advanced level project.

---

## 🔗 Related Projects in Code Odyssey

| # | Project | Level |
|---|---------|-------|
| 003 | Landing Page | Beginner |
| 009 | Image Gallery | Beginner |
| 016 | Navbar Variations | Beginner |
| 028 | Dark Mode Toggle | Beginner |
| **This** | **Spotify Clone** | **Beginner** |

---

## 🤝 Contributing

Found a bug or want to improve the clone's accuracy?

1. **Fork** the repo
2. **Create** a branch: `git checkout -b fix/player-controls`
3. **Commit** changes: `git commit -m 'Improve player progress bar'`
4. **Open** a Pull Request

---

## 📄 License

MIT License — free to use, learn from, and modify.

---

## ⚠️ Disclaimer

This project is built **for educational purposes only**. Spotify™, its logo, name, and design are trademarks of Spotify AB. This clone is not affiliated with or endorsed by Spotify.

---

*Part of the [Code Odyssey](https://github.com/Debanga-06/Code-Odessey) — 300+ mini web projects from beginner to expert.*