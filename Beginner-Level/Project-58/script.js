const emailInput = document.getElementById('emailInput');
const statusIcon = document.getElementById('statusIcon');
const feedbackMsg = document.getElementById('feedbackMsg');
const checkBtn = document.getElementById('checkBtn');
const themeButtons = document.querySelectorAll('.theme-btn');
const body = document.body;

const ruleAt = document.getElementById('ruleAt');
const ruleDomain = document.getElementById('ruleDomain');
const ruleNoSpaces = document.getElementById('ruleNoSpaces');
const ruleChars = document.getElementById('ruleChars');

const FULL_EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const LOCAL_PART_REGEX = /^[a-zA-Z0-9._%+-]+$/;
const DOMAIN_REGEX = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function setRuleState(element, passed) {
  element.classList.remove('passed', 'failed');
  if (passed) {
    element.classList.add('passed');
  } else {
    element.classList.add('failed');
  }
}

function validateEmail(email) {
  const hasAt = email.includes('@');
  const hasSpaces = /\s/.test(email);
  const [localPart, domainPart] = email.split('@');

  const noSpacesPassed = !hasSpaces && email.length > 0;
  const atPassed = hasAt;
  const charsPassed = hasAt ? LOCAL_PART_REGEX.test(localPart || '') : false;
  const domainPassed = hasAt ? DOMAIN_REGEX.test(domainPart || '') : false;

  setRuleState(ruleAt, atPassed);
  setRuleState(ruleDomain, domainPassed);
  setRuleState(ruleNoSpaces, noSpacesPassed);
  setRuleState(ruleChars, charsPassed);

  const isFullyValid = FULL_EMAIL_REGEX.test(email);
  return isFullyValid;
}

function handleInput() {
  const email = emailInput.value.trim();

  if (email.length === 0) {
    statusIcon.textContent = '';
    feedbackMsg.textContent = 'Start typing to check your email';
    [ruleAt, ruleDomain, ruleNoSpaces, ruleChars].forEach(rule => {
      rule.classList.remove('passed', 'failed');
    });
    return;
  }

  const isValid = validateEmail(email);

  if (isValid) {
    statusIcon.textContent = '✅';
    feedbackMsg.textContent = 'This looks like a valid email address.';
  } else {
    statusIcon.textContent = '⚠️';
    feedbackMsg.textContent = 'This email address is not valid yet.';
  }
}

emailInput.addEventListener('input', handleInput);

checkBtn.addEventListener('click', () => {
  const email = emailInput.value.trim();

  if (email.length === 0) {
    feedbackMsg.textContent = 'Please enter an email address first.';
    return;
  }

  const isValid = validateEmail(email);
  feedbackMsg.textContent = isValid
    ? 'Confirmed: this is a properly formatted email address.'
    : 'Invalid format. Check the rules above.';
});

themeButtons.forEach(button => {
  button.addEventListener('click', () => {
    body.className = button.dataset.theme;
    themeButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
  });
});