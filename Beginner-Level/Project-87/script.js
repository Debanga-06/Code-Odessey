const board = document.getElementById('board');
const addBtn = document.getElementById('addBtn');
const clearBtn = document.getElementById('clearBtn');
const colorPicker = document.getElementById('colorPicker');
const noteCount = document.getElementById('noteCount');
const emptyHint = document.getElementById('emptyHint');

const NOTE_COLORS = [
  { name: 'Yellow', value: '#fff3a3' },
  { name: 'Pink', value: '#ffc4dd' },
  { name: 'Mint', value: '#b8f2d4' },
  { name: 'Sky', value: '#bfe3ff' },
  { name: 'Lavender', value: '#dcc9ff' },
  { name: 'Peach', value: '#ffd3ad' }
];

let selectedColor = NOTE_COLORS[0].value;
let notes = [];
let noteIdCounter = 0;
let topZIndex = 10;
let activeDrag = null;

function buildColorPicker() {
  colorPicker.innerHTML = '';

  NOTE_COLORS.forEach(color => {
    const dot = document.createElement('div');
    dot.classList.add('color-dot');
    if (color.value === selectedColor) dot.classList.add('active');
    dot.style.background = color.value;
    dot.title = color.name;

    dot.addEventListener('click', () => {
      selectedColor = color.value;
      buildColorPicker();
    });

    colorPicker.appendChild(dot);
  });
}

function getRandomPosition() {
  const boardWidth = board.clientWidth;
  const maxX = Math.max(boardWidth - 240, 40);
  const x = Math.floor(Math.random() * maxX) + 20;
  const y = Math.floor(Math.random() * 300) + 40;
  return { x, y };
}

function getRandomRotation() {
  return (Math.random() * 6 - 3).toFixed(1);
}

function createNote() {
  const position = getRandomPosition();

  const note = {
    id: noteIdCounter++,
    text: '',
    color: selectedColor,
    x: position.x,
    y: position.y,
    rotation: getRandomRotation(),
    zIndex: ++topZIndex,
    createdAt: new Date()
  };

  notes.push(note);
  renderNote(note);
  updateNoteCount();
  updateEmptyHint();
}

function renderNote(note) {
  const noteEl = document.createElement('div');
  noteEl.classList.add('sticky-note');
  noteEl.id = `note-${note.id}`;
  noteEl.style.background = note.color;
  noteEl.style.left = `${note.x}px`;
  noteEl.style.top = `${note.y}px`;
  noteEl.style.transform = `rotate(${note.rotation}deg)`;
  noteEl.style.zIndex = note.zIndex;

  noteEl.innerHTML = `
    <div class="note-header">
      <button class="delete-note-btn" aria-label="Delete note">×</button>
    </div>
    <textarea class="note-textarea" placeholder="Write something...">${note.text}</textarea>
    <span class="note-timestamp">${formatTime(note.createdAt)}</span>
  `;

  const textarea = noteEl.querySelector('.note-textarea');
  textarea.addEventListener('input', () => {
    note.text = textarea.value;
  });

  noteEl.querySelector('.delete-note-btn').addEventListener('click', (event) => {
    event.stopPropagation();
    deleteNote(note.id);
  });

  noteEl.addEventListener('mousedown', (event) => startDrag(event, note, noteEl));

  board.appendChild(noteEl);
}

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function startDrag(event, note, noteEl) {
  if (event.target.classList.contains('note-textarea') || event.target.classList.contains('delete-note-btn')) {
    return;
  }

  note.zIndex = ++topZIndex;
  noteEl.style.zIndex = note.zIndex;
  noteEl.classList.add('dragging');

  const boardRect = board.getBoundingClientRect();

  activeDrag = {
    note,
    noteEl,
    offsetX: event.clientX - boardRect.left - note.x,
    offsetY: event.clientY - boardRect.top - note.y
  };

  event.preventDefault();
}

function handleDragMove(event) {
  if (!activeDrag) return;

  const boardRect = board.getBoundingClientRect();
  const newX = event.clientX - boardRect.left - activeDrag.offsetX;
  const newY = event.clientY - boardRect.top - activeDrag.offsetY;

  activeDrag.note.x = newX;
  activeDrag.note.y = newY;

  activeDrag.noteEl.style.left = `${newX}px`;
  activeDrag.noteEl.style.top = `${newY}px`;
}

function handleDragEnd() {
  if (!activeDrag) return;

  activeDrag.noteEl.classList.remove('dragging');
  activeDrag = null;
}

function deleteNote(noteId) {
  notes = notes.filter(note => note.id !== noteId);

  const noteEl = document.getElementById(`note-${noteId}`);
  if (noteEl) noteEl.remove();

  updateNoteCount();
  updateEmptyHint();
}

function clearBoard() {
  notes = [];
  document.querySelectorAll('.sticky-note').forEach(el => el.remove());
  updateNoteCount();
  updateEmptyHint();
}

function updateNoteCount() {
  noteCount.textContent = `${notes.length} note${notes.length !== 1 ? 's' : ''}`;
}

function updateEmptyHint() {
  emptyHint.classList.toggle('hidden', notes.length > 0);
}

addBtn.addEventListener('click', createNote);
clearBtn.addEventListener('click', clearBoard);

document.addEventListener('mousemove', handleDragMove);
document.addEventListener('mouseup', handleDragEnd);

buildColorPicker();
updateEmptyHint();