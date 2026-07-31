const triggerButtons = document.querySelectorAll('.trigger-btn');
const toastStack = document.getElementById('toastStack');
const persistToggle = document.getElementById('persistToggle');
const clearAllBtn = document.getElementById('clearAllBtn');

const AUTO_DISMISS_DELAY = 4000;

const TOAST_CONFIG = {
  success: { icon: '✓', title: 'Success', message: 'Your action completed successfully.' },
  error: { icon: '✕', title: 'Error', message: 'Something went wrong. Please try again.' },
  warning: { icon: '!', title: 'Warning', message: 'Please double-check before continuing.' },
  info: { icon: 'i', title: 'Info', message: 'Here is something worth knowing.' }
};

let toastIdCounter = 0;

function createToast(type) {
  const config = TOAST_CONFIG[type];
  const toastId = `toast-${toastIdCounter++}`;
  const isPersistent = persistToggle.checked;

  const toast = document.createElement('div');
  toast.classList.add('toast', type);
  toast.id = toastId;

  toast.innerHTML = `
    <span class="toast-icon">${config.icon}</span>
    <div class="toast-body">
      <p class="toast-title">${config.title}</p>
      <p class="toast-message">${config.message}</p>
    </div>
    <button class="toast-close" aria-label="Dismiss">&times;</button>
    ${isPersistent ? '' : '<div class="toast-progress"></div>'}
  `;

  toastStack.appendChild(toast);

  const closeBtn = toast.querySelector('.toast-close');
  closeBtn.addEventListener('click', () => dismissToast(toastId));

  if (!isPersistent) {
    const progressBar = toast.querySelector('.toast-progress');
    progressBar.style.animation = `shrinkWidth ${AUTO_DISMISS_DELAY}ms linear forwards`;

    setTimeout(() => {
      dismissToast(toastId);
    }, AUTO_DISMISS_DELAY);
  }
}

function dismissToast(toastId) {
  const toast = document.getElementById(toastId);
  if (!toast) return;

  toast.classList.add('leaving');

  toast.addEventListener('animationend', () => {
    toast.remove();
  }, { once: true });
}

function clearAllToasts() {
  const activeToasts = document.querySelectorAll('.toast');
  activeToasts.forEach(toast => dismissToast(toast.id));
}

triggerButtons.forEach(button => {
  button.addEventListener('click', () => {
    createToast(button.dataset.type);
  });
});

clearAllBtn.addEventListener('click', clearAllToasts);