# Social Media Post UI 💬

![Project Status](https://img.shields.io/badge/status-completed-success)
![Difficulty](https://img.shields.io/badge/difficulty-advanced-red)
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

A social feed of interactive post cards — like, comment, share, and save, all fully wired up against local state. Visually, this project goes for a premium dark "social app" aesthetic distinct from earlier projects: frosted glass cards, gradient avatar rings for verified accounts, a violet-to-pink brand gradient, and icon-swap micro-interactions on like/save rather than static icons.

## ✨ Features

- ❤️ **Like toggle** — heart fills and pops with a spring easing curve, live count updates immediately
- ⭐ **Save toggle** — independent from likes, star fills in gold
- 🔁 **Share counter** — increments on click with a brief color flash for feedback
- 💬 **Expandable comments** — toggle a comment thread open/closed per post
- ✍️ **Add your own comment** — typed comments append to the thread and update the comment count live, attributed to "You"
- ✅ **Verified badge** — a gradient ring around the avatar and a checkmark badge for verified accounts, driven by a single data flag
- 🎨 **Distinct premium-dark visual identity** — frosted glass post cards, gradient brand accents, per-user gradient avatar colors generated from a palette

## 🎓 Learning Outcomes

This advanced project teaches:

1. **Per-card independent state closures** — each post's `isLiked` variable lives inside `wirePostInteractions()`, scoped to that specific post's DOM elements via closure, so multiple posts never interfere with each other's like state
2. **CSS `::before` content swapping via class** — the like/save icons switch between filled and outline glyphs purely by toggling a class, with the actual character defined in CSS `content`, keeping the JS free of icon-string logic
3. **Mask-based gradient borders** — the verified avatar ring uses a `background` gradient combined with `mask-composite: exclude` to create a gradient *ring* (not a filled circle), a genuinely advanced CSS border technique
4. **Rendering nested dynamic content** — each post renders its own independent list of comments, and adding a new comment re-renders just that post's comment list without touching the others
5. **Object mutation driving UI updates** — liking a post directly increments `post.likes` in the data object, and the display re-reads from that same object, keeping data and UI from drifting apart
6. **Deterministic pseudo-random styling** — avatar gradient colors are picked via `index % AVATAR_GRADIENTS.length`, giving consistent, evenly-distributed colors without true randomness (so the same user always gets the same color)
7. **Number formatting for large counts** — a small `formatCount()` helper converts `1500` into `1.5k`, a common real-world UI detail for social apps

## 🛠️ Technologies Used

- **HTML5** — Minimal static shell; posts are fully generated
- **CSS3** — `backdrop-filter` glassmorphism, `mask-composite` gradient border rings, gradient text via `background-clip: text`, spring-style cubic-bezier icon animation
- **JavaScript ES6+** — Closures for per-instance state, dynamic rendering, array mutation

## 📁 Project Structure


```id="x32pl9"
socieal-media-ui/
│
├── index.html      # Main structure
├── style.css       # Styling file
├── script.js       # JavaScript logic
├── README.md       # Documentation
```

## 💻 Usage Guide

1. Open `index.html` in a browser
2. Click the heart to like/unlike a post — the count updates and the icon pops
3. Click the star to save a post independently of liking it
4. Click **Share** to bump the share count with a brief highlight flash
5. Click **Comment** to expand that post's comment thread
6. Type in the comment box and press **Enter** or click the send button to add your own comment to the thread

## 🔍 Code Walkthrough

### Scoping like-state per post with closures

```javascript
function wirePostInteractions(postEl, post, index) {
  let isLiked = false;

  likeBtn.addEventListener('click', () => {
    isLiked = !isLiked;
    likeBtn.classList.toggle('liked', isLiked);
    post.likes += isLiked ? 1 : -1;
    likesCountEl.textContent = `${formatCount(post.likes)} likes`;
  });
}
```

`isLiked` is declared fresh inside `wirePostInteractions()`, called once per post. Each call creates its own independent closure over that post's specific `likeBtn` and `post` object — clicking one post's like button can never accidentally affect another post's state, even though the function itself is reused for every post in the feed.

### A gradient ring using mask-composite

```css
.avatar::after {
  border: 2px solid transparent;
  background: linear-gradient(135deg, #a78bfa, #ff8fc3) border-box;
  -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}
```

A plain gradient `border` isn't possible directly in CSS — borders only accept solid colors. This technique paints the gradient into the *background* of a pseudo-element sized to the border area, then uses two overlapping masks combined with `exclude` to punch out everything except the thin ring where the border would be, leaving only a gradient-colored ring shape.

### Re-rendering just one post's comments

```javascript
function submitComment() {
  const text = commentInput.value.trim();
  if (text.length === 0) return;

  post.comments.push({ author: 'You', text });
  renderComments(postEl, post, index);
  updateStatsLine(postEl, post);
}
```

Adding a comment pushes directly onto that specific post's `comments` array, then calls `renderComments()` scoped to that post's own `postEl` — only that one card's comment list is rebuilt, leaving every other post on the feed completely untouched.

## 🎨 Customization Guide

### Add image upload for posts

Replace the emoji placeholder in `post.media` with a real `<img>`, using `FileReader` if allowing local uploads, or a URL field for linked images.

### Add reply threading

Extend each comment object with a nested `replies` array, and add a "Reply" action per comment that reveals a mini input scoped to that specific comment.

### Persist likes and comments

Save the entire `POSTS_DATA` array to `localStorage` after any mutation, so likes/saves/comments survive a page reload.

## 🌐 Browser Compatibility

- ✅ Chrome, Firefox, Safari, Edge — all modern versions
- **Required Features:** `backdrop-filter`, `mask-composite` (Safari requires the `-webkit-` prefixed versions, included here)
- ⚠️ The gradient avatar ring degrades to no ring (not a broken ring) in browsers without mask support — graceful fallback

## 🚀 Future Enhancements

- [ ] Real image upload support for posts
- [ ] Nested comment replies
- [ ] Persisted state via localStorage
- [ ] Infinite scroll loading more posts
- [ ] Post composer to create new posts from within the feed

---

**Part of the Code Odysseys Project Series** 🚀
