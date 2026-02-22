# ⏳ Countdown Timer Web App

![Status](https://img.shields.io/badge/status-completed-success)
![Difficulty](https://img.shields.io/badge/difficulty-beginner--intermediate-orange)
![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5\&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3\&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript\&logoColor=black)

---

## 📋 Table of Contents

* [Overview](#overview)
* [Features](#features)
* [How It Works](#how-it-works)
* [Technologies Used](#technologies-used)
* [Project Structure](#project-structure)
* [Installation](#installation)
* [Usage Guide](#usage-guide)
* [Code Explanation](#code-explanation)
* [Future Improvements](#future-improvements)
* [Author](#author)
* [License](#license)

---
## 🌐 Live Demo

🔗 **View Live Project Here:**
👉 [View Project](https://countdown-timer-seven-roan.vercel.app/)

*(Replace this link with your GitHub Pages / Vercel / Netlify link)*

---
## 🎯 Overview

A simple and interactive **Countdown Timer Web Application** built using HTML, CSS, and JavaScript.

This project allows users to:

* Enter time in minutes
* Start a countdown
* Reset the timer
* Hear a beep sound when time ends

It demonstrates DOM manipulation, timer functions, and Web Audio API usage.

---

## ✨ Features

* ⏱️ Set countdown in minutes
* ▶️ Start timer functionality
* 🔄 Reset timer functionality
* 🔔 Automatic beep sound when time ends
* 📱 Responsive and clean UI design
* 🎨 Gradient background styling
* 🧠 Input validation for user safety

---

## ⚙️ How It Works

1. User enters time in minutes.
2. When **Start** button is clicked:

   * Minutes are converted to seconds.
   * `setInterval()` runs every second.
   * Time updates dynamically in `HH:MM:SS` format.
3. When time reaches zero:

   * Timer stops automatically.
   * A beep sound plays using **Web Audio API**.
   * An alert shows: `"⏰ Time's up!"`
4. Reset button clears everything.

---

## 🛠️ Technologies Used

* **HTML5** – Structure
* **CSS3** – Styling & layout
* **JavaScript (ES6)** – Logic and functionality
* **Web Audio API** – Beep sound generation

---

## 📁 Project Structure

```
Countdown-Timer/
│
├── index.html     # Main HTML file
├── style.css      # Styling file
├── script.js      # JavaScript logic
└── README.md      # Project documentation
```

---

## 🚀 Installation

### Method 1: Direct Download

1. Download or clone the repository:

```bash
git clone https://github.com/Jiban0507/your-repository-name.git
```

2. Open the project folder.
3. Double-click `index.html` to run in browser.

---

### Method 2: Using Local Server (Recommended)

```bash
# Using Python
python -m http.server 8000
```

Then open:

```
http://localhost:8000
```

---

## 💻 Usage Guide

1. Enter minutes in the input field.
2. Click **Start**.
3. Timer will begin countdown.
4. When time finishes:

   * Sound plays for 1 second.
   * Alert message appears.
5. Click **Reset** to clear timer.

---

## 🔍 Code Explanation

### 1️⃣ Timer Logic

```javascript
countdownInterval = setInterval(() => {
```

Runs every 1 second and updates the remaining time.

---

### 2️⃣ Time Formatting

```javascript
String(hours).padStart(2, '0')
```

Ensures two-digit format like `01:05:09`.

---

### 3️⃣ Beep Sound

Uses **Web Audio API**:

```javascript
const context = new (window.AudioContext || window.webkitAudioContext)();
```

Creates a sound oscillator that plays for 1 second when time ends.

---

### 4️⃣ Reset Function

Stops timer and restores default display:

```javascript
clearInterval(countdownInterval);
```

---

## 🎨 UI Preview

* Gradient background
* Centered timer container
* Clean white card design
* Smooth button hover effect

---

## 🚀 Future Improvements

* ⏸️ Add Pause/Resume button
* 🔊 Custom alarm sound upload
* 🌙 Dark/Light mode toggle
* 📱 Better mobile optimization
* ⌨️ Start timer with Enter key
* 💾 Save last used time using localStorage

---

## 👨‍💻 Author

**Jiban Maji**
GitHub: [@Jiban0507](https://github.com/Jiban0507)

---

## 📜 License

This project is licensed under the MIT License.
