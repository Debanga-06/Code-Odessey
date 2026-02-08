# 🌐 Digital Clock

![Project Status](https://img.shields.io/badge/status-completed-success)
![Difficulty](https://img.shields.io/badge/difficulty-beginner-green)
![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

> A simple, real-time **Digital Clock** built with **JavaScript**, demonstrating **Date object**, **setInterval**, and **time formatting**.

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

**[View Project](https://counter-app-m84h.vercel.app/)** 

---

## 🌟 Features

✨ **Real-Time Clock:**  
- Updates every second  
- 12-hour format with AM/PM  

✅ **Dynamic Time Formatting:**  
- Leading zeros for hours, minutes, seconds  
- Converts 24-hour to 12-hour format  

🎨 **Styled UI:**  
- Neon-style digital display  
- Responsive and clean design  
- Easy to read font and layout  

📱 **Beginner-Friendly:**  
- Great for learning **DOM manipulation, setInterval, and JavaScript Date object**

---

## 🚀 Installation & Setup

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

**Step 1: Download/Clone the Project**
```bash
git clone https://github.com/Jiban0507/digital-clock.git
cd digital-clock
````

**Step 2: Open in Browser**

* Open `index.html` in your preferred browser

**Step 3: Verify Installation**
✅ You should see:

* Real-time clock displaying hours:minutes:seconds AM/PM
* Clock updates every second

---

## 📖 How to Use

1. Open the page in a browser
2. Observe the time updating every second
3. Customize CSS for colors, font size, or background

---

## 🎨 Customization Guide

### Change Clock Color

```css
#clock {
  color: #ff00ff; /* Any color you like */
}
```

### 24-Hour Format

```js
// Replace hours % 12 with just hours for 24-hour format
let hours = now.getHours();
```

### Add Date Display

```js
let day = now.getDate();
let month = now.getMonth() + 1;
let year = now.getFullYear();
document.getElementById('clock').textContent += ` | ${day}/${month}/${year}`;
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
digital-clock/
├── index.html        # Main HTML file
├── style.css         # Stylesheet for clock UI
├── script.js         # JavaScript logic for updating clock
└── README.md         # Documentation
```

---

## 🎓 Learning Outcomes

After completing this project, you will understand:

### HTML Concepts

* ✅ Semantic container for clock
* ✅ Heading and div for display

### CSS Concepts

* ✅ Styling text, color, and layout
* ✅ Responsive and centered design
* ✅ Shadows, fonts, and neon effect

### JavaScript Techniques

* ✅ Date object to get current time
* ✅ setInterval to update time every second
* ✅ Time formatting (12-hour, leading zeros, AM/PM)
* ✅ DOM manipulation (`document.getElementById().textContent`)

---

## 🚀 Future Enhancements

* [ ] Add 24-hour format toggle button
* [ ] Include day of the week and full date
* [ ] Smooth transition animations for seconds
* [ ] Night mode toggle

---

## 📄 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2026 Jiban Maji

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👨‍💻 Author

Created by **Jiban Maji**

* GitHub: [https://github.com/Jiban0507](https://github.com/Jiban0507)

---

**Happy Coding! 🚀 Modify and customize your clock as you like.**
