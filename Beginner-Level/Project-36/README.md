# 🎯 Number Guessing Game

![Status](https://img.shields.io/badge/status-completed-success)
![Difficulty](https://img.shields.io/badge/difficulty-beginner--intermediate-orange)
![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5\&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3\&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript\&logoColor=black)

---

## 📋 Table of Contents

* [Live Demo](#live-demo)
* [Overview](#overview)
* [Features](#features)
* [Game Logic](#game-logic)
* [Technologies Used](#technologies-used)
* [Project Structure](#project-structure)
* [Installation](#installation)
* [Usage Guide](#usage-guide)
* [Future Enhancements](#future-enhancements)
* [Author](#author)

---

## 🌐 Live Demo

👉 **[View Project](https://number-guessing-game-bice-one.vercel.app/)**

---

## 🎯 Overview

A simple interactive **Number Guessing Game** built using HTML, CSS, and JavaScript.

The player must guess a randomly generated number between 1 and 100.

This project demonstrates:

* Random number generation
* Conditional statements
* User input handling
* DOM manipulation
* Game logic implementation

---

## ✨ Features

* 🎲 Random number between 1–100
* 🧠 Conditional logic (if/else)
* 📊 Attempt counter
* 🔄 Reset game option
* ⚡ Instant feedback (Too high / Too low / Correct)
* 🎨 Clean responsive UI

---

## 🧠 Game Logic

1. Generate random number:

```javascript
Math.floor(Math.random() * 100) + 1
```

2. User enters guess.
3. Program checks:

   * If equal → Correct
   * If greater → Too high
   * If smaller → Too low
4. Attempts increase each time.
5. Reset creates new random number.

---

## 🛠️ Technologies Used

* HTML5
* CSS3
* JavaScript (ES6)

---

## 📁 Project Structure

```id="x09ap1"
Number-Guessing-Game/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

---

## 🚀 Installation

```bash
git clone https://github.com/Jiban0507/your-repository-name.git
```

Open `index.html` in your browser.

---

## 💻 Usage Guide

1. Enter a number between 1–100.
2. Click Submit.
3. Get feedback:

   * Too High
   * Too Low
   * Correct
4. Click Reset to play again.

---

## 🚀 Future Enhancements

* ⏱️ Add timer
* 🏆 Add score system
* 🎚️ Add difficulty levels
* 🎨 Add animations
* 💾 Save high score in localStorage

---

## 👨‍💻 Author

**Jiban Maji**
GitHub: [https://github.com/Jiban0507](https://github.com/Jiban0507)
