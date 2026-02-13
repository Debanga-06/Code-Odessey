// State
let todos = [];
let currentFilter = 'all';
let currentPriority = 'low';
let editingId = null;

// DOM Elements
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const emptyState = document.getElementById('emptyState');
const totalCount = document.getElementById('totalCount');
const activeCount = document.getElementById('activeCount');
const completedCount = document.getElementById('completedCount');
const priorityBtns = document.querySelectorAll('.priority-btn');
const filterTabs = document.querySelectorAll('.filter-tab');

// Initialize
function init() {
  addBtn.addEventListener('click', handleAddTodo);
  todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleAddTodo();
  });

  priorityBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      priorityBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentPriority = btn.dataset.priority;
    });
  });

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentFilter = tab.dataset.filter;
      renderTodos();
    });
  });

  renderTodos();
}

// Create Todo
function handleAddTodo() {
  const text = todoInput.value.trim();
  
  if (!text) {
    alert('Please enter a task');
    return;
  }

  if (editingId !== null) {
    // Update existing todo
    updateTodo(editingId, text);
  } else {
    // Create new todo
    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false,
      priority: currentPriority,
      createdAt: new Date().toISOString()
    };

    todos.push(newTodo);
  }

  todoInput.value = '';
  editingId = null;
  addBtn.textContent = 'Add Task';
  renderTodos();
}

// Read/Render Todos
function renderTodos() {
  // Filter todos
  let filteredTodos = todos;
  
  if (currentFilter === 'active') {
    filteredTodos = todos.filter(todo => !todo.completed);
  } else if (currentFilter === 'completed') {
    filteredTodos = todos.filter(todo => todo.completed);
  }

  // Clear list
  todoList.innerHTML = '';

  // Show empty state
  if (filteredTodos.length === 0) {
    emptyState.style.display = 'block';
    todoList.style.display = 'none';
  } else {
    emptyState.style.display = 'none';
    todoList.style.display = 'flex';

    // Render each todo
    filteredTodos.forEach(todo => {
      const todoEl = createTodoElement(todo);
      todoList.appendChild(todoEl);
    });
  }

  // Update stats
  updateStats();
}

// Create Todo Element
function createTodoElement(todo) {
  const div = document.createElement('div');
  div.className = `todo-item ${todo.completed ? 'completed' : ''}`;
  
  const timeAgo = getTimeAgo(new Date(todo.createdAt));

  div.innerHTML = `
    <div class="todo-checkbox ${todo.completed ? 'checked' : ''}" onclick="toggleTodo(${todo.id})"></div>
    <div class="todo-content">
      <div class="todo-text">${todo.text}</div>
      <div class="todo-meta">
        <span class="priority-badge ${todo.priority}">${todo.priority}</span>
        <span class="todo-time">${timeAgo}</span>
      </div>
    </div>
    <div class="todo-actions">
      <button class="action-btn edit-btn" onclick="editTodo(${todo.id})">✏️</button>
      <button class="action-btn delete-btn" onclick="deleteTodo(${todo.id})">🗑️</button>
    </div>
  `;

  return div;
}

// Update Todo
function updateTodo(id, newText) {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.text = newText;
    todo.priority = currentPriority;
  }
}

// Delete Todo
function deleteTodo(id) {
  if (confirm('Delete this task?')) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
  }
}

// Toggle Complete
function toggleTodo(id) {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    renderTodos();
  }
}

// Edit Todo
function editTodo(id) {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todoInput.value = todo.text;
    editingId = id;
    addBtn.textContent = 'Update Task';
    currentPriority = todo.priority;
    
    // Update priority button
    priorityBtns.forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.priority === todo.priority) {
        btn.classList.add('active');
      }
    });

    todoInput.focus();
  }
}

// Update Stats
function updateStats() {
  const total = todos.length;
  const active = todos.filter(t => !t.completed).length;
  const completed = todos.filter(t => t.completed).length;

  totalCount.textContent = total;
  activeCount.textContent = active;
  completedCount.textContent = completed;
}

// Time Ago Helper
function getTimeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  
  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

// Initialize app
init();