const chatMessages = document.getElementById('chatMessages');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const typingIndicator = document.getElementById('typingIndicator');
const statusText = document.getElementById('statusText');

const REPLY_DELAY = 1400;

const CANNED_REPLIES = [
  "Got it, thanks!",
  "Sounds good to me.",
  "Let me check and get back to you.",
  "Sure, that works.",
  "Okay, noted."
];

function getCurrentTime() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const period = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  if (hours === 0) hours = 12;

  return `${hours}:${minutes} ${period}`;
}

function createMessageElement(text, type) {
  const message = document.createElement('div');
  message.classList.add('message', type);

  const bubble = document.createElement('div');
  bubble.classList.add('bubble');
  bubble.textContent = text;

  const timestamp = document.createElement('span');
  timestamp.classList.add('timestamp');
  timestamp.textContent = getCurrentTime();

  message.appendChild(bubble);
  message.appendChild(timestamp);

  return message;
}

function scrollToBottom() {
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendMessage() {
  const text = messageInput.value.trim();
  if (text.length === 0) return;

  const messageElement = createMessageElement(text, 'sent');
  chatMessages.insertBefore(messageElement, typingIndicator);

  messageInput.value = '';
  scrollToBottom();

  simulateReply();
}

function simulateReply() {
  statusText.textContent = 'Typing...';
  typingIndicator.classList.remove('hidden');
  scrollToBottom();

  setTimeout(() => {
    typingIndicator.classList.add('hidden');
    statusText.textContent = 'Online';

    const randomIndex = Math.floor(Math.random() * CANNED_REPLIES.length);
    const replyText = CANNED_REPLIES[randomIndex];

    const replyElement = createMessageElement(replyText, 'received');
    chatMessages.insertBefore(replyElement, typingIndicator);

    scrollToBottom();
  }, REPLY_DELAY);
}

sendBtn.addEventListener('click', sendMessage);

messageInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    sendMessage();
  }
});

scrollToBottom();