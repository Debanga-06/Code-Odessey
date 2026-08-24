const surveyCard = document.getElementById('surveyCard');
const completeScreen = document.getElementById('completeScreen');
const stepLabel = document.getElementById('stepLabel');
const progressFill = document.getElementById('progressFill');
const backBtn = document.getElementById('backBtn');
const nextBtn = document.getElementById('nextBtn');
const scaleRow = document.getElementById('scaleRow');
const restartBtn = document.getElementById('restartBtn');
const surveyForm = document.getElementById('surveyForm');

const TOTAL_STEPS = 4;
let currentStep = 1;
let selectedScaleValue = null;

function buildScale() {
  scaleRow.innerHTML = '';

  for (let i = 1; i <= 10; i++) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.classList.add('scale-btn');
    btn.textContent = i;
    btn.dataset.value = i;

    btn.addEventListener('click', () => {
      selectedScaleValue = i;
      document.querySelectorAll('.scale-btn').forEach(b => {
        b.classList.toggle('selected', Number(b.dataset.value) === i);
      });
      hideError(3);
    });

    scaleRow.appendChild(btn);
  }
}

function showStep(step) {
  document.querySelectorAll('.question-block').forEach(block => {
    block.classList.toggle('hidden', Number(block.dataset.step) !== step);
  });

  stepLabel.textContent = `Step ${step} of ${TOTAL_STEPS}`;
  progressFill.style.width = `${(step / TOTAL_STEPS) * 100}%`;

  backBtn.classList.toggle('hidden', step === 1);
  nextBtn.textContent = step === TOTAL_STEPS ? 'Submit' : 'Next';
}

function hideError(step) {
  const errorEl = document.querySelector(`[data-error="${step}"]`);
  if (errorEl) errorEl.classList.add('hidden');
}

function showError(step) {
  const errorEl = document.querySelector(`[data-error="${step}"]`);
  if (errorEl) errorEl.classList.remove('hidden');
}

function validateStep(step) {
  if (step === 1) {
    const selected = surveyForm.querySelector('input[name="source"]:checked');
    if (!selected) {
      showError(1);
      return false;
    }
    return true;
  }

  if (step === 2) {
    const selected = surveyForm.querySelectorAll('input[name="features"]:checked');
    if (selected.length === 0) {
      showError(2);
      return false;
    }
    return true;
  }

  if (step === 3) {
    if (selectedScaleValue === null) {
      showError(3);
      return false;
    }
    return true;
  }

  return true;
}

function goNext() {
  if (!validateStep(currentStep)) return;

  if (currentStep === TOTAL_STEPS) {
    submitSurvey();
    return;
  }

  currentStep++;
  showStep(currentStep);
}

function goBack() {
  if (currentStep === 1) return;
  currentStep--;
  showStep(currentStep);
}

function submitSurvey() {
  surveyCard.classList.add('hidden');
  completeScreen.classList.remove('hidden');
}

function restartSurvey() {
  surveyForm.reset();
  selectedScaleValue = null;
  currentStep = 1;

  document.querySelectorAll('.scale-btn').forEach(btn => btn.classList.remove('selected'));
  document.querySelectorAll('.error-text').forEach(err => err.classList.add('hidden'));

  showStep(currentStep);
  completeScreen.classList.add('hidden');
  surveyCard.classList.remove('hidden');
}

nextBtn.addEventListener('click', goNext);
backBtn.addEventListener('click', goBack);
restartBtn.addEventListener('click', restartSurvey);

buildScale();
showStep(currentStep);