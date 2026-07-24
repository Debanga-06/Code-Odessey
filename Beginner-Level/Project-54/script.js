const questions = document.querySelectorAll('.faq-question');
const themeButtons = document.querySelectorAll('.theme-btn');
const body = document.body;

questions.forEach(question => {
  question.addEventListener('click', () => {
    const item = question.parentElement;
    const isActive = item.classList.contains('active');

    document.querySelectorAll('.faq-item').forEach(faq => faq.classList.remove('active'));

    if (!isActive) {
      item.classList.add('active');
    }
  });
});

themeButtons.forEach(button => {
  button.addEventListener('click', () => {
    const theme = button.dataset.theme;

    body.className = theme;

    themeButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
  });
});