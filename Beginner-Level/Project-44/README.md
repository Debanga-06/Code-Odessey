# **Background Color Changer 🎨**

![Project Status](https://img.shields.io/badge/status-completed-success)
![Difficulty](https://img.shields.io/badge/difficulty-beginner-green)
![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5\&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3\&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript\&logoColor=black)

---

## **📌 Project Overview**

Background Color Changer is a simple web application that allows users to **change the background color** of the page with a single click.
It randomly generates **HEX colors** and updates the page background as well as displays the current color code.

**Live Demo:** 
**[View Project](https://background-color-changer-phi-one.vercel.app/)** 

---

## **✨ Features**

* Generate **random HEX colors**
* Change **background color dynamically**
* Display **current color code**
* Smooth **transition effect** for color changes
* Simple, responsive, and beginner-friendly

---

## **🛠️ Technologies Used**

* **HTML5** – Page structure
* **CSS3** – Styling, transitions, and responsive design
* **JavaScript** – Randomization, DOM manipulation, event handling

---

## **📁 Project Structure**

```text
Background-Color-Changer/
│
├── index.html      # Main HTML file
├── style.css       # CSS styling
└── script.js       # JavaScript logic
```

---

## **🚀 Installation & Usage**

1. Clone the repository:

```bash
git clone https://github.com/Jiban0507/Background-Color-Changer.git
cd Background-Color-Changer
```

2. Open `index.html` in your browser

3. Click **Change Background Color** to see a new random background color

---

## **🔧 How it Works**

* Generates a **random HEX color** using JavaScript:

```javascript
const hex = Math.floor(Math.random()*16777215).toString(16);
const color = `#${hex.padStart(6,'0')}`;
```

* Updates the **background color** of the page dynamically
* Displays the **current color code** below the button

---

## **🚀 Future Enhancements**

* Add **RGB color generation**
* Add **copy to clipboard** feature for color code
* Add **color history** to track previous colors
* Include **theme toggle** (light/dark mode)
* Add **animated color transitions**

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

Project Link: **[https://github.com/Jiban0507/background-colour-change](https://github.com/Jiban0507/Code-Odessey/tree/main/Beginner-Level/Project-44)**
---

**Happy Coding!** 🎨✨

