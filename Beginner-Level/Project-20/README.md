🎨 Button Hover Effects

A clean and beginner-friendly project demonstrating multiple CSS hover effects and a simple JavaScript interaction using buttons. Ideal for learning UI animations, transitions, and basic DOM events.










📋 Table of Contents

Demo Link

Features

Button Effects Overview

Installation & Setup

How to Use

Customization Guide

File Structure

Learning Outcomes

Future Enhancements

License

🎯 Demo Link

Live Demo: Add your deployed project link here

You can host this project using GitHub Pages, Netlify, or Vercel.

🌟 Features

✨ Multiple Button Hover Effects

Smooth color transition

Scale and shadow animation

Sliding underline animation

Animated gradient hover

JavaScript click interaction

🎯 Beginner-Focused Project

Simple and clean HTML structure

Pure CSS animations (no libraries)

Minimal and easy-to-understand JavaScript

Perfect for UI/UX practice

📱 Responsive Layout

Flexbox-based button container

Buttons wrap automatically on smaller screens

Centered layout for better presentation

🎯 Button Effects Overview
1️⃣ Color Transition Button

Class: .btn1

Changes background color smoothly on hover

Uses CSS transition

Great introduction to hover effects

.btn1:hover {
  background: #ff6b6b;
}

2️⃣ Scale & Shadow Button

Class: .btn2

Button scales up on hover

Adds a shadow for depth

Uses transform and box-shadow

.btn2:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 15px rgba(0,0,0,0.3);
}

3️⃣ Sliding Underline Button

Class: .btn3

Animated underline slides in from left

Uses ::after pseudo-element

Clean and modern hover style

.btn3::after {
  width: 0%;
}
.btn3:hover::after {
  width: 100%;
}

4️⃣ Gradient Animation Button

Class: .btn4

Animated gradient background on hover

Uses background-size and background-position

Eye-catching modern UI effect

.btn4:hover {
  background-position: right center;
}

5️⃣ JavaScript Interaction Button

Class: .btn5

Triggers an alert when clicked

Demonstrates DOM selection and event handling

const btn5 = document.querySelector('.btn5');

btn5.addEventListener('click', () => {
  alert('You clicked the JS Interaction button!');
});

🚀 Installation & Setup
Prerequisites

Any modern web browser

No frameworks or libraries required

Steps
# Clone the repository
git clone https://github.com/yourusername/Code-Odessey.git
cd Code-Odessey/Beginner-Level/Button-Hover-Effects

Run the Project

Option 1: Open Directly

Open index.html in your browser

Option 2: Local Server (Recommended)

python -m http.server 8000


Open 👉 http://localhost:8000

📖 How to Use

Open the project in a browser

Hover over each button to see different effects

Click the JS Interaction button to trigger an alert

Inspect the code to understand how each effect is created

🎨 Customization Guide
Change Button Colors
.btn1 {
  background: #000;
}

Adjust Animation Speed
transition: all 0.5s ease;

Modify Alert Message
alert('Your custom message here!');

Add a New Button Effect

Add a new <button> in index.html

Create a new class in style.css

(Optional) Add JavaScript behavior in script.js

📁 File Structure
Button-Hover-Effects/
├── index.html        # Main HTML file
├── style.css         # Button styles & hover animations
├── script.js         # JavaScript click interaction
└── README.md         # Project documentation

🎓 Learning Outcomes
HTML

✅ Button elements

✅ Class-based styling

✅ Linking CSS and JS files

CSS

✅ Hover pseudo-classes

✅ Transitions and animations

✅ Transform and shadow effects

✅ Pseudo-elements (::after)

✅ Gradient backgrounds

✅ Flexbox layout

JavaScript

✅ DOM selection

✅ Event listeners

✅ User interaction handling

🚀 Future Enhancements

 Add ripple click effect

 Replace alert with modal popup

 Add icon-based buttons

 Add disabled and loading states

 Improve accessibility (ARIA labels)

 Convert buttons into reusable components

 Add sound or vibration feedback

📄 License

This project is licensed under the MIT License.

👨‍💻 Author

Created as part of Code-Odessey – Beginner Level Projects

Happy Coding! 🚀
Experiment with animations, tweak effects, and build your own button library 🎉