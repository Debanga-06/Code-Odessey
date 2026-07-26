# Email Validator

![Project Status](https://img.shields.io/badge/status-completed-success)
![Difficulty](https://img.shields.io/badge/difficulty-beginner-green)
![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Responsive](https://img.shields.io/badge/Responsive-Yes-success?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

A real-time email format checker that validates structure using regular expressions and shows rule-by-rule feedback. Includes 5 switchable visual themes.
Part of the Code Odysseys series - JavaScript fundamentals practice.

### Demo :- [Live Now](https://email-validator-chi-silk.vercel.app/)

## Concepts Covered
- Regular expressions for pattern matching (`test()`)
- String methods: `includes`, `split`, `trim`
- Array destructuring (`const [localPart, domainPart] = email.split('@')`)
- Conditional logic combining multiple boolean checks
- classList manipulation to reflect per-rule pass/fail state
- Separating a "live typing" check from an explicit "validate" button action

## Features
- Live validation feedback as the user types
- Individual rule checklist: contains @, valid domain, no spaces, allowed characters
- Status icon (✅ / ⚠️) reflecting overall validity
- Explicit "Validate Email" button for a final confirmation message
- 5 selectable styles: Classic, Minimal, Dark, Gradient, Neon

## File Structure

    email-validator/
         ├── index.html
         ├── style.css
         ├── script.js
         └── README.md

## How to Run
Open `index.html` in any browser. No dependencies required.

## Possible Extensions
- Check against a list of common typo domains (e.g. gmial.com)
- Support multiple emails separated by commas
- Async check against a real DNS/MX lookup (would require a backend)

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
