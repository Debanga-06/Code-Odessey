# 052 - Image Slider

![Project Status](https://img.shields.io/badge/status-completed-success)
![Difficulty](https://img.shields.io/badge/difficulty-beginner-green)
![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

An image slider/gallery with navigation, thumbnails, and autoplay.
Part of the Code Odysseys series - JavaScript fundamentals practice.

### Demo :- [Live Now](https://image-slider-kappa-bice.vercel.app)

## Concepts Covered
- Image rotation using `classList.toggle` instead of transforms
- Dynamic thumbnail generation from existing image sources
- Event handling on generated elements
- `setInterval` / `clearInterval` for autoplay
- Modulo operator for circular navigation
- Keeping multiple UI pieces (main image, thumbnails, counter) in sync from one state variable

## Features
- Next / Previous navigation
- Clickable thumbnail strip synced with the main image
- Live counter (e.g. "2 / 4")
- Autoplay every 4 seconds, resets on manual navigation

## File Structure

image-slider/

├── index.html

├── style.css

├── script.js

└── README.md

## How to Run
Open `index.html` in any browser. Requires an internet connection since images are loaded from picsum.photos — replace the `src` values with local images if needed offline.

## Possible Extensions
- Lazy-load images for performance
- Swipe gestures for touch devices
- Pause on hover

  ## 📖 Resources for Learning

### HTML Forms
- [MDN - HTML Form Elements](https://developer.mozilla.org/en-US/docs/Learn/Forms)
- [MDN - Input Types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)

### CSS
- [MDN - CSS Flexbox](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox)
- [CSS-Tricks - A Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

### JavaScript
- [MDN - JavaScript Events](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events)
- [MDN - Form Validation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation)
- [JavaScript.info - Form Properties & Methods](https://javascript.info/form-elements)

### Security
- [OWASP - Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [MDN - Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)

## 🤝 Contributing

To improve this project:
- Test across different browsers and devices
- Report bugs and issues
- Suggest UI/UX improvements
- Share your enhancements with the community
- Create variations for learning purposes

## 📄 License

This project is provided as an educational resource. Check the repository's main [LICENSE](LICENSE) file for specific usage terms.

## 🎓 Getting Help

If you get stuck:
1. Check the browser console (F12) for JavaScript errors
2. Review the validation logic in the comments
3. Test each field individually to identify issues
4. Refer to the MDN documentation links above
5. Start with simpler changes before advanced customizations

---

**Happy Coding!** 🎉

Remember: Every expert was once a beginner. Take your time to understand each part of the code, experiment with changes, and build your skills step by step. Good luck with your web development journey!




