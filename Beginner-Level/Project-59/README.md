# Password Generator

![Project Status](https://img.shields.io/badge/status-completed-success)
![Difficulty](https://img.shields.io/badge/difficulty-beginner-green)
![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Responsive](https://img.shields.io/badge/Responsive-Yes-success?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

A configurable password generator with strength meter and clipboard copy. Includes 5 switchable visual themes.
Part of the Code Odysseys series - JavaScript fundamentals practice.

### Demo :- [Live Now](https://password-generator-three-gilt-79.vercel.app/)

## Concepts Covered
- `Math.random()` for pseudo-random selection
- String building inside a `for` loop
- Object literals used as lookup tables (`CHAR_SETS`)
- Conditional pool building based on checkbox state
- Regular expressions to score password strength
- Async clipboard API (`navigator.clipboard.writeText`) with `.then` / `.catch`
- Range input synced with a live label

## Features
- Adjustable password length (4-32) via a slider
- Toggle uppercase, lowercase, numbers, and symbols
- One-click copy to clipboard with confirmation message
- Real-time strength meter (Very Weak to Very Strong)
- 5 selectable styles: Classic, Minimal, Dark, Gradient, Neon

## File Structure
    password-generator/
           ├── index.html
           ├── style.css
           ├── script.js
           └── README.md

## How to Run
Open `index.html` in any browser. Clipboard copy requires a secure context (localhost or HTTPS) in most browsers.

## Possible Extensions
- Exclude ambiguous characters (l, 1, O, 0)
- Generate multiple passwords at once
- Passphrase mode (word-based instead of character-based)

## Security Note
This generator uses `Math.random()`, which is fine for practice/demo purposes but is **not cryptographically secure**. For real security-sensitive applications, use `crypto.getRandomValues()` instead.

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
