# 055 - Star Rating Widget

![Project Status](https://img.shields.io/badge/status-completed-success)
![Difficulty](https://img.shields.io/badge/difficulty-beginner-green)
![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Responsive](https://img.shields.io/badge/Responsive-Yes-success?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

An interactive rating component with hover preview, click selection, and 6 switchable visual styles.
Part of the Code Odysseys series - JavaScript fundamentals practice.

## Concepts Covered
- Dynamic DOM element generation in a loop
- mouseenter / mouseleave / click event handling
- Data attributes (dataset) for storing values on elements
- classList.toggle driven by comparison logic
- Object lookups (labels, per-theme symbol sets)
- Re-rendering a component's markup when application state (theme) changes

## Features
- Hover to preview a rating before committing
- Click to lock in a rating
- Text feedback updates based on the selected value
- 6 selectable styles: Classic Stars, Hearts, Emoji Faces, Numbered Circles, Neon Glow, Minimal Dots
- Rating value and text feedback persist across theme switches

## File Structure

     star-rating-widget/
                 ├── index.html
                 ├── style.css
                 ├── script.js
                 └── README.md

## How to Run
Open `index.html` in any browser. No dependencies required.

## Possible Extensions
- Half-star / fractional rating support
- Store and average multiple users' ratings
- Persist selected rating with localStorage

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

