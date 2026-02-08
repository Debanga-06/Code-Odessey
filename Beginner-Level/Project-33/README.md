# ⏱️ Stopwatch with FIFO Records & Clear Button

![Project Status](https://img.shields.io/badge/status-completed-success)
![Difficulty](https://img.shields.io/badge/difficulty-beginner-green)
![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

> A simple **Stopwatch** built with **JavaScript** featuring **Start/Stop/Reset**, **FIFO record of last 5 times**, and a **Clear Records** button.

---

## 📋 Table of Contents

- [Demo Link](#demo-link)
- [Features](#features)
- [Installation & Setup](#installation--setup)
- [How to Use](#how-to-use)
- [Customization Guide](#customization-guide)
- [Browser Support](#browser-support)
- [File Structure](#file-structure)
- [Learning Outcomes](#learning-outcomes)
- [Future Enhancements](#future-enhancements)
- [License](#license)
- [Author](#author)

---

## 🎯 Demo Link

**[View Project](https://stopwatch-three-rho.vercel.app/)** 

---

## 🌟 Features

✨ **Stopwatch Functions:**  
- Start, Stop, Reset timer  
- Hours, minutes, seconds display  
- Timer resets without deleting recorded times  

✅ **FIFO Records:**  
- Record current time with **Record button**  
- Stores **last 5 times only**  
- When 6th time is recorded, the **oldest time is removed** (FIFO logic)  

🎨 **Clear Records Button:**  
- Deletes all recorded times  
- Stopwatch timer remains unaffected  

📱 **Responsive & Stylish:**  
- Neon-style display  
- Buttons with hover effects  
- Works on desktop and mobile  

---

## 🚀 Installation & Setup

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

**Step 1: Download/Clone the Project**
```bash
git clone https://github.com/Jiban0507/stopwatch.git
cd stopwatch
````

**Step 2: Open in Browser**

* Open `index.html` in your browser

**Step 3: Verify Installation**
✅ You should see:

* Stopwatch displaying `00:00:00`
* Buttons: Start, Stop, Reset, Record, Clear Records
* Empty record list

---

## 📖 How to Use

1. **Start Timer:** Click **Start** → stopwatch begins counting.
2. **Stop Timer:** Click **Stop** → pauses stopwatch.
3. **Reset Timer:** Click **Reset** → stopwatch returns to `00:00:00`, **records stay intact**.
4. **Record Time:** Click **Record** → current time saved.

   * Only last 5 records are kept
   * FIFO: old records removed automatically if limit exceeded
5. **Clear All Records:** Click **Clear Records** → removes all saved times, timer unaffected.

**Example Scenario:**

* Competitor 1 runs 5 sec → Record → 5 sec stored
* Reset timer → Timer back to 0, 5 sec remains in records
* Competitor 2 runs 10 sec → Record → Records show 5 sec and 10 sec
* Repeat → Only last 5 records are displayed

---

## 🎨 Customization Guide

### Change Display Color

```css
#display {
  color: #ff6f61;
}
```

### Change Button Colors

```css
#start { background-color: #28a745; }
#stop { background-color: #dc3545; }
#reset { background-color: #007bff; }
#record { background-color: #ffc107; }
#clear-records { background-color: #6c757d; }
```

### Adjust Max Records

```js
if (records.length > 5) { // change 5 to any number
  records.shift();
}
```

---

## 🌐 Browser Support

| Browser       | Version | Status         |
| ------------- | ------- | -------------- |
| Chrome        | Latest  | ✅ Full Support |
| Firefox       | Latest  | ✅ Full Support |
| Safari        | Latest  | ✅ Full Support |
| Edge          | Latest  | ✅ Full Support |
| Mobile Chrome | Latest  | ✅ Full Support |
| Mobile Safari | Latest  | ✅ Full Support |

---

## 📁 File Structure

```
stopwatch/
├── index.html        # Main HTML file
├── style.css         # Stylesheet
├── script.js         # JavaScript logic with FIFO & Clear Records
└── README.md         # Documentation
```

---

## 🎓 Learning Outcomes

### HTML

* ✅ Semantic container and buttons
* ✅ Display area for time
* ✅ List for recorded times

### CSS

* ✅ Styling text, buttons, hover effects
* ✅ Centered, responsive layout

### JavaScript

* ✅ `setInterval` for stopwatch
* ✅ Start / Stop / Reset logic
* ✅ Record functionality with **FIFO**
* ✅ Clear Records feature

---

## 🚀 Future Enhancements

* [ ] Add Player Name input for competitions
* [ ] Millisecond precision
* [ ] Keyboard shortcuts for Start/Stop/Reset/Record
* [ ] Dark / Light mode toggle

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

Created by **Jiban Maji**

* GitHub: [https://github.com/Jiban0507](https://github.com/Jiban0507)

---

**Happy Coding! 🚀** Feel free to enhance, style, and use this stopwatch for competitions or learning.