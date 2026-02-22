# 💬 Random Quote Generator

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
* [Learning Outcomes](#learning-outcomes)
* [Technologies Used](#technologies-used)
* [Project Structure](#project-structure)
* [Installation](#installation)
* [Usage Guide](#usage-guide)
* [Code Walkthrough](#code-walkthrough)
* [Customization Guide](#customization-guide)
* [Future Enhancements](#future-enhancements)
* [Author](#author)
* [License](#license)

---

## 🌐 Live Demo

🔗 **View Live Project Here:**
👉 [View Project](https://random-quote-generator-psi-sand.vercel.app/)

*(Replace this link with your GitHub Pages / Vercel / Netlify link)*

---

## 🎯 Overview

A clean and interactive **Random Quote Generator Web Application** built using HTML, CSS, and JavaScript.

This project demonstrates:

* Arrays and Objects
* Random selection using `Math.random()`
* DOM manipulation
* Event handling
* Dynamic content updates

Each time the user clicks the button, a new quote appears instantly on the screen.

---

## ✨ Features

* 🎲 Random quote generation
* 📦 Quotes stored in JavaScript array
* 🖥️ Dynamic DOM updates
* 🎨 Clean responsive UI
* 🧠 Beginner-friendly logic
* ⚡ Instant content change without page reload

---

## 🎓 Learning Outcomes

This project helps you understand:

1. JavaScript Arrays
2. JavaScript Objects
3. `Math.random()` function
4. `Math.floor()` usage
5. DOM manipulation (`getElementById`)
6. Event handling (button click)
7. Dynamic content rendering
8. Basic UI styling with CSS

---

## 🛠️ Technologies Used

* **HTML5** – Structure
* **CSS3** – Styling
* **JavaScript (ES6)** – Logic & Interactivity

---

## 📁 Project Structure

```id="x32pl9"
Random-Quote-Generator/
│
├── index.html      # Main structure
├── style.css       # Styling file
├── script.js       # JavaScript logic
├── README.md       # Documentation
```

---

## 🚀 Installation

### Method 1: Direct Download

```bash id="p09tss"
git clone https://github.com/Jiban0507/your-repository-name.git
```

Open `index.html` in your browser.

---

### Method 2: Using Local Server (Recommended)

```bash id="9dsk1e"
python -m http.server 8000
```

Then open:

```id="09k33s"
http://localhost:8000
```

---

## 💻 Usage Guide

1. Open the project in your browser.
2. Click the **"New Quote"** button.
3. A random quote will appear instantly.
4. Click again to generate another quote.

---

## 🔍 Code Walkthrough

### 1️⃣ Quotes Array

```javascript id="kweo12"
const quotes = [
  {
    text: "Dream big and dare to fail.",
    author: "Norman Vaughan"
  }
];
```

Quotes are stored as objects inside an array.

---

### 2️⃣ Generate Random Index

```javascript id="nqos77"
const randomIndex = Math.floor(Math.random() * quotes.length);
```

This selects a random quote from the array.

---

### 3️⃣ DOM Update

```javascript id="qwe778"
document.getElementById("quote").textContent = randomQuote.text;
```

This updates the webpage dynamically without reloading.

---

## 🎨 Customization Guide

### ➤ Add More Quotes

Add more objects inside the `quotes` array.

### ➤ Change Background Color

Edit the gradient in `style.css`.

### ➤ Improve UI

Add animations or transitions for smoother effects.

---

## 🚀 Future Enhancements

* 🔁 Prevent same quote twice in a row
* 🎨 Change background color on each click
* 🐦 Add Twitter share button
* 🌙 Dark/Light theme toggle
* 🌍 Fetch quotes from an API
* 💾 Save favorite quotes using localStorage
* ✨ Add animation effects

---

## 👨‍💻 Author

**Jiban Maji**
GitHub: [https://github.com/Jiban0507](https://github.com/Jiban0507)
Project Link: **[https://github.com/Jiban0507/Random Quote Generator](https://github.com/Jiban0507/Code-Odessey/tree/main/Beginner-Level/Project-35)**
---
---

## 📜 License

This project is licensed under the MIT License.

