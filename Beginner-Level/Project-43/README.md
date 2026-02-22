# **Random Color Generator 🎨**

![Project Status](https://img.shields.io/badge/status-completed-success)
![Difficulty](https://img.shields.io/badge/difficulty-beginner-green)
![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5\&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3\&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript\&logoColor=black)

---

## **📌 Project Overview**

Random Color Generator is a simple web application that generates **random colors** in either **HEX** or **RGB** format.
It dynamically updates a colored box and displays the color code for users to use in design, web projects, or learning purposes.

**Live Demo:** 
**[View Project](https://background-color-changer-6wfj.vercel.app/)** 

---

## **✨ Features**

* Generates **random HEX and RGB colors**
* Updates the **background color** of the display box in real-time
* Displays **color code** below the box for reference
* **Responsive design** works on mobile and desktop
* **Lightweight** and beginner-friendly

---

## **🛠️ Technologies Used**

* **HTML5** – Structure and layout
* **CSS3** – Styling, flexbox, responsive design
* **JavaScript** – Randomization, DOM manipulation, event handling

---

## **📁 Project Structure**

```text
Random-Color-Generator/
│
├── index.html      # Main HTML file
├── style.css       # CSS styles
└── script.js       # JavaScript logic
```

---

## **🚀 Installation & Usage**

1. Clone the repository:

```bash
git clone https://github.com/Jiban0507/Random-Color-Generator.git
cd Random-Color-Generator
```

2. Open `index.html` in your browser

3. Click **Generate Color** to see a new random color

---

## **🔧 How it Works**

* Generates a **random HEX color** using:

```javascript
const hex = Math.floor(Math.random()*16777215).toString(16);
```

* Generates a **random RGB color** using:

```javascript
const r = Math.floor(Math.random()*256);
const g = Math.floor(Math.random()*256);
const b = Math.floor(Math.random()*256);
const rgbColor = `rgb(${r}, ${g}, ${b})`;
```

* Randomly selects either HEX or RGB on each button click and updates the **color display** and **color code text**.

---

## **🚀 Future Enhancements**

* Add **copy to clipboard** button for color code
* Add **color history** of generated colors
* Include **HSL color format**
* Add **theme toggle** (light/dark mode)
* Include **animation on color change**

---

## **🤝 Contributing**

1. Fork the repository
2. Create a branch (`git checkout -b feature/YourFeature`)
3. Make your changes
4. Commit your work (`git commit -m "Add new feature"`)
5. Push to branch (`git push origin feature/YourFeature`)
6. Open a Pull Request

---

## **📝 License**

This project is licensed under the **MIT License** — see the [LICENSE](../../LICENSE) file for details.

---

## **📞 Contact**

**Jiban Maji** — [@Jiban0507](https://github.com/Jiban0507)
Project Link: [https://github.com/Jiban0507/Random-Color-Generator](https://github.com/Jiban0507/Random-Color-Generator)

---

**Happy Coding!** 🎨✨

