const bellBtn = document.getElementById('bellBtn');
const badge = document.getElementById('badge');
const dropdown = document.getElementById('dropdown');
const notifList = document.getElementById('notifList');
const emptyState = document.getElementById('emptyState');
const markAllBtn = document.getElementById('markAllBtn');
const addNotifBtn = document.getElementById('addNotifBtn');

const SAMPLE_MESSAGES = [
  'Your order has been shipped.',
  'New comment on your post.',
  'Server backup completed successfully.',
  'Someone mentioned you in a thread.',
  'Your subscription renews in 3 days.',
  'New follower: Alex Chen.'
];

let notifications = [
  { id: 1, text: 'Welcome to the dashboard!', time: '2m ago', read: false },
  { id: 2, text: 'Your profile was updated.', time: '1h ago', read: false },
  { id: 3, text: 'Weekly report is ready to view.', time: 'Yesterday', read: true }
];

let notifIdCounter = 4;
let isDropdownOpen = false;

function getUnreadCount() {
  return notifications.filter(notif => !notif.read).length;
}

function updateBadge() {
  const unreadCount = getUnreadCount();

  if (unreadCount > 0) {
    badge.textContent = unreadCount > 9 ? '9+' : unreadCount;
    badge.classList.remove('hidden');
  } else {
    badge.classList.add('hidden');
  }
}

function renderNotifications() {
  notifList.innerHTML = '';

  if (notifications.length === 0) {
    emptyState.classList.remove('hidden');
    updateBadge();
    return;
  }

  emptyState.classList.add('hidden');

  notifications.forEach(notif => {
    const item = document.createElement('li');
    item.classList.add('notif-item');
    if (notif.read) item.classList.add('read');

    item.innerHTML = `
      <span class="notif-dot"></span>
      <div class="notif-content">
        <p class="notif-text">${notif.text}</p>
        <span class="notif-time">${notif.time}</span>
      </div>
    `;

    item.addEventListener('click', () => markAsRead(notif.id));
    notifList.appendChild(item);
  });

  updateBadge();
}

function markAsRead(notifId) {
  const notif = notifications.find(n => n.id === notifId);
  if (notif) {
    notif.read = true;
    renderNotifications();
  }
}

function markAllAsRead() {
  notifications.forEach(notif => notif.read = true);
  renderNotifications();
}

function addRandomNotification() {
  const randomIndex = Math.floor(Math.random() * SAMPLE_MESSAGES.length);

  const newNotif = {
    id: notifIdCounter++,
    text: SAMPLE_MESSAGES[randomIndex],
    time: 'Just now',
    read: false
  };

  notifications.unshift(newNotif);
  renderNotifications();
}

function toggleDropdown() {
  isDropdownOpen = !isDropdownOpen;
  dropdown.classList.toggle('hidden', !isDropdownOpen);
}

function closeDropdown(event) {
  if (!event.target.closest('.bell-wrapper')) {
    isDropdownOpen = false;
    dropdown.classList.add('hidden');
  }
}

bellBtn.addEventListener('click', (event) => {
  event.stopPropagation();
  toggleDropdown();
});

markAllBtn.addEventListener('click', markAllAsRead);
addNotifBtn.addEventListener('click', addRandomNotification);
document.addEventListener('click', closeDropdown);

renderNotifications();