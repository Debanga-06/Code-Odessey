# Survey Page 📋

![Project Status](https://img.shields.io/badge/status-completed-success)
![Difficulty](https://img.shields.io/badge/difficulty-intermediate-orange)
![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

### Demo :- [Live Now](

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Learning Outcomes](#learning-outcomes)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Usage Guide](#usage-guide)
- [Code Walkthrough](#code-walkthrough)
- [Customization Guide](#customization-guide)
- [Browser Compatibility](#browser-compatibility)
- [Future Enhancements](#future-enhancements)

## 🎯 Overview

A multi-step survey combining four different question types — single-choice radio, multi-choice checkboxes, a numeric 1-10 recommendation scale, and an open-ended comment box — presented one question at a time with a progress bar and per-step validation, ending in a completion screen.

## ✨ Features

- 📻 **Custom-styled radio buttons** for single-choice questions
- ☑️ **Custom-styled checkboxes** for multi-select questions
- 🔢 **1-10 recommendation scale** with click-to-select buttons
- 📈 **Progress bar and step counter** that update as the user advances
- ⛔ **Per-step validation** — required questions block progress with an inline error; the optional comments step has none
- ⬅️➡️ **Back and Next navigation** — previous answers are preserved when moving between steps
- 🎉 **Completion screen** with a restart option that fully resets the survey

## 🎓 Learning Outcomes

This intermediate project teaches:

1. **Multi-step form flow** — showing/hiding question blocks based on a `currentStep` variable rather than using separate pages
2. **Custom form control styling** — hiding native `radio`/`checkbox` inputs and styling a sibling element based on the `:checked` pseudo-class
3. **CSS sibling combinator (`~`)** — styling `.custom-radio`/`.custom-checkbox` based on the checked state of the hidden native input right before it in the DOM
4. **Per-step validation logic** — a single `validateStep()` function branching by step number, checking a different condition for each question type
5. **Querying checked form controls** — `:checked` selectors combined with `querySelector` (single answer) vs. `querySelectorAll` (multiple answers)
6. **Progress calculation** — deriving progress bar width as a percentage of steps completed
7. **Full form reset across custom and native controls** — combining `form.reset()` with manually clearing the custom scale selection, matching the same pattern used in the Feedback Form project

## 🛠️ Technologies Used

- **HTML5** — Semantic form structure with grouped radio/checkbox inputs
- **CSS3** — Flat neon-themed UI, custom radio/checkbox styling via sibling selectors
- **JavaScript ES6+** — Form validation, DOM querying, dataset attributes

## 📁 Project Structure

```id="x32pl9"
survey-page/
│
├── index.html      # Main structure
├── style.css       # Styling file
├── script.js       # JavaScript logic
├── README.md       # Documentation
```


## 💻 Usage Guide

1. Open `index.html` in a browser
2. Answer each question and click **Next** to advance
3. Required questions (source, features, scale) show an inline error if left blank when you try to continue
4. Use **Back** to revisit and change a previous answer — your selection is preserved
5. The final step's comments box is optional; click **Submit** to finish
6. On the completion screen, click **Take Survey Again** to reset everything and start over

## 🔍 Code Walkthrough

### Styling custom controls from hidden native inputs

```css
.radio-option input {
  display: none;
}

.radio-option input:checked ~ .custom-radio::after {
  content: '';
  ...
  background: #ff2bd6;
}
```

The actual `<input type="radio">` is hidden with `display: none`, but it's still fully functional and accessible to click (the `<label>` wraps both the input and its custom visual). The `~` sibling combinator lets `.custom-radio` react to the hidden input's `:checked` state without any JavaScript needed for the visual toggle itself.

### Branching validation by step

```javascript
function validateStep(step) {
  if (step === 1) {
    const selected = surveyForm.querySelector('input[name="source"]:checked');
    if (!selected) { showError(1); return false; }
    return true;
  }

  if (step === 2) {
    const selected = surveyForm.querySelectorAll('input[name="features"]:checked');
    if (selected.length === 0) { showError(2); return false; }
    return true;
  }
  ...
}
```

Radio questions only ever have zero or one checked input, so `querySelector` with `:checked` is enough. Checkbox questions can have multiple checked inputs at once, so `querySelectorAll` returns a list, and the check becomes "is the list empty?" rather than "does one exist?".

### Advancing only after validation passes

```javascript
function goNext() {
  if (!validateStep(currentStep)) return;

  if (currentStep === TOTAL_STEPS) {
    submitSurvey();
    return;
  }

  currentStep++;
  showStep(currentStep);
}
```

The guard clause at the top means the step counter never advances and no UI changes happen if the current step's answer is missing — the error message becomes the only visible change until the user provides a valid answer.

## 🎨 Customization Guide

### Add conditional branching

Show or skip certain steps based on an earlier answer (e.g. skip a "which feature" question if the user selected "I don't use this product yet").

### Add answer summary before submit

Insert a review step before the final submit that lists all answers given so far, letting the user jump back to fix anything.

### Persist progress

Save `currentStep` and all answers to `sessionStorage` so an accidental page refresh doesn't lose progress partway through.

## 🌐 Browser Compatibility

- ✅ Chrome, Firefox, Safari, Edge — all modern versions
- **Required Features:** `:checked` pseudo-class, sibling combinator, form query selectors

## 🚀 Future Enhancements

- [ ] Conditional/branching questions based on previous answers
- [ ] Review step summarizing all answers before final submit
- [ ] Progress persistence with sessionStorage
- [ ] Real backend submission via `fetch()`
- [ ] Required/optional indicator shown per question

---

**Part of the Code Odysseys Project Series** 🚀