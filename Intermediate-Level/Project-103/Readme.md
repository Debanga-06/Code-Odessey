# 🔍 GitHub Profile Finder

A sleek, terminal-aesthetic React app for searching GitHub users and exploring their public profiles and repositories — powered by the GitHub REST API.

![Tech](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![API](https://img.shields.io/badge/GitHub_REST_API-v3-181717?style=flat-square&logo=github)
![License](https://img.shields.io/badge/license-MIT-39d353?style=flat-square)

---

## ✨ Features

- **User Search** — Look up any GitHub username instantly
- **Profile Overview** — Avatar, name, bio, location, company, website, Twitter, and join date
- **Stats Panel** — Followers, following, and public repo count
- **Activity Bar** — Animated contribution-style visualization
- **Repository List** — 20 most recently updated repos with language, stars, forks, and last updated
- **Error Handling** — Friendly messages for 404 (not found) and 403 (rate limit)
- **Loading State** — Animated spinner with live feedback
- **Responsive Layout** — Side-by-side on desktop, stacked on mobile

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/Debanga-06/github-profile-finder.git
cd github-profile-finder
npm install
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 (functional components + hooks) |
| Styling | CSS-in-JS (inline `<style>` tag) |
| Fonts | JetBrains Mono, Syne (Google Fonts) |
| Data | GitHub REST API v3 |
| HTTP | Fetch API (native browser) |

---

## 📡 API Reference

This app uses two public GitHub endpoints — no authentication required.

```
GET https://api.github.com/users/{username}
GET https://api.github.com/users/{username}/repos?sort=updated&per_page=20
```

> **Rate limit:** 60 requests/hour unauthenticated. To increase this, add a [personal access token](https://github.com/settings/tokens) as a `Authorization: Bearer <token>` header.

---

## 📁 Project Structure

```
github-profile-finder/
├── src/
│   └── App.jsx          # Main application (single-file component)
├── public/
│   └── index.html
├── package.json
└── README.md
```

---

## 🎨 Design System

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#080c10` | App background |
| `--surface` | `#0d1117` | Card backgrounds |
| `--accent` | `#39d353` | Primary green (GitHub-inspired) |
| `--accent2` | `#58a6ff` | Links & repo names |
| `--accent3` | `#f78166` | Error states |
| `--text` | `#e6edf3` | Primary text |
| `--muted` | `#7d8590` | Secondary text |

---

## 🧪 Try These Usernames

| Username | Who |
|---|---|
| `torvalds` | Creator of Linux & Git |
| `gaearon` | Dan Abramov — React core team |
| `addyosmani` | Google Chrome DevRel |
| `sindresorhus` | Prolific OSS author |
| `yyx990803` | Evan You — Vue.js creator |

---

## ⚙️ Extending the App

**Add GitHub token (raise rate limit):**
```js
headers: { Authorization: `Bearer ${YOUR_TOKEN}` }
```

**Show more repos:**
Change `per_page=20` to up to `per_page=100` in the fetch URL.

**Add pinned repos:**
Use the [GitHub GraphQL API](https://docs.github.com/en/graphql) — pinned repos aren't available in the REST API.

---

## 📄 License

MIT © 2026
