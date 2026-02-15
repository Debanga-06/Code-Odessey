# To-Do List - Basic CRUD Operations ✅

![Project Status](https://img.shields.io/badge/status-completed-success)
![Difficulty](https://img.shields.io/badge/difficulty-beginner-green)
![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Learning Outcomes](#learning-outcomes)
- [CRUD Operations](#crud-operations)
- [Array Methods Used](#array-methods-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage Guide](#usage-guide)
- [Code Walkthrough](#code-walkthrough)
- [Customization](#customization)
- [Browser Compatibility](#browser-compatibility)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

A fully-functional **To-Do List application** demonstrating CRUD (Create, Read, Update, Delete) operations with JavaScript array methods. Features task prioritization, filtering, real-time statistics, and a modern dark-themed UI. Perfect for learning state management and array manipulation.

**Live Demo:**

**[View Project](https://to-do-list-basic-two.vercel.app/)**

## ✨ Features

### Core Functionality
- ✅ **Create Tasks** - Add new tasks with priority levels
- 📖 **Read Tasks** - View all tasks with filtering
- ✏️ **Update Tasks** - Edit existing tasks
- 🗑️ **Delete Tasks** - Remove completed or unwanted tasks

### Additional Features
- 🎯 **Priority Levels** - Low, Medium, High priority tags
- 🔍 **Filter Tasks** - All, Active, Completed views
- 📊 **Live Statistics** - Total, Active, Completed counts
- ⏱️ **Time Tracking** - Shows when tasks were created
- 🎨 **Modern UI** - Dark theme with smooth animations
- 📱 **Responsive** - Works on all devices

### Technical Features
- 💾 **In-Memory State** - Uses JavaScript arrays
- 🔄 **Real-Time Updates** - Instant UI refresh
- 🎭 **Smooth Animations** - Slide-in effects
- ♿ **Accessible** - Keyboard navigation support

## 🎓 Learning Outcomes

1. **CRUD Operations** - Create, Read, Update, Delete data
2. **Array Methods** - `.push()`, `.filter()`, `.find()`, `.map()`
3. **State Management** - Managing application state
4. **Event Handling** - Click events and form submission
5. **DOM Manipulation** - Creating and updating elements
6. **Dynamic Rendering** - Building UI from data
7. **Data Filtering** - Filtering arrays by condition
8. **Time Formatting** - Working with dates
9. **Conditional Rendering** - Showing/hiding elements
10. **User Input Validation** - Form validation

## 🔄 CRUD Operations

### **Create** - Add New Task

```javascript
function handleAddTodo() {
  const newTodo = {
    id: Date.now(),
    text: text,
    completed: false,
    priority: currentPriority,
    createdAt: new Date().toISOString()
  };
  
  todos.push(newTodo);  // Add to array
  renderTodos();         // Update UI
}
```

### **Read** - Display Tasks

```javascript
function renderTodos() {
  // Filter todos based on current filter
  let filteredTodos = todos;
  
  if (currentFilter === 'active') {
    filteredTodos = todos.filter(todo => !todo.completed);
  }
  
  // Render each todo
  filteredTodos.forEach(todo => {
    const todoEl = createTodoElement(todo);
    todoList.appendChild(todoEl);
  });
}
```

### **Update** - Edit Existing Task

```javascript
function updateTodo(id, newText) {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.text = newText;
    todo.priority = currentPriority;
  }
}
```

### **Delete** - Remove Task

```javascript
function deleteTodo(id) {
  if (confirm('Delete this task?')) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
  }
}
```

## 📚 Array Methods Used

| Method | Purpose | Example |
|---|---|---|
| `.push()` | Add item to end | `todos.push(newTodo)` |
| `.filter()` | Create filtered array | `todos.filter(t => !t.completed)` |
| `.find()` | Find single item | `todos.find(t => t.id === id)` |
| `.forEach()` | Iterate over items | `todos.forEach(todo => ...)` |
| `.map()` | Transform array | `todos.map(t => t.text)` |

## 📁 Project Structure

```
To-Do-List-Basic/
│
├── index.html          # Complete to-do app
└── README.md           # This documentation
```

## 🚀 Installation

```bash
# Clone repository
git clone https://github.com/Debanga-06/Code-Odessey.git
cd Code-Odessey/To-Do-List-Basic

# Open in browser
open index.html
```

## 💻 Usage Guide

### Adding a Task

1. Type task in input field
2. Select priority (Low/Medium/High)
3. Click "Add Task" or press Enter
4. Task appears in list instantly

### Editing a Task

1. Click ✏️ edit icon on any task
2. Task text appears in input field
3. Modify text and/or priority
4. Click "Update Task" to save

### Completing a Task

1. Click checkbox next to task
2. Task gets strikethrough
3. Moves to "Completed" filter

### Deleting a Task

1. Click 🗑️ delete icon
2. Confirm deletion
3. Task is removed

### Filtering Tasks

- **All Tasks** - Shows everything
- **Active** - Shows incomplete tasks only
- **Completed** - Shows finished tasks only

## 🔍 Code Walkthrough

### State Management

```javascript
let todos = [];              // Main data array
let currentFilter = 'all';   // Active filter
let currentPriority = 'low'; // Selected priority
let editingId = null;        // ID being edited
```

### Creating Todo Element

```javascript
function createTodoElement(todo) {
  const div = document.createElement('div');
  div.className = `todo-item ${todo.completed ? 'completed' : ''}`;
  
  div.innerHTML = `
    <div class="todo-checkbox" onclick="toggleTodo(${todo.id})"></div>
    <div class="todo-content">
      <div class="todo-text">${todo.text}</div>
      <span class="priority-badge ${todo.priority}">${todo.priority}</span>
    </div>
    <button onclick="editTodo(${todo.id})">✏️</button>
    <button onclick="deleteTodo(${todo.id})">🗑️</button>
  `;
  
  return div;
}
```

### Toggle Complete

```javascript
function toggleTodo(id) {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    renderTodos();
  }
}
```

## 🎨 Customization

### Change Colors

```css
:root {
  --accent: #10b981;      /* Primary color */
  --danger: #ef4444;      /* Delete button */
  --warning: #f59e0b;     /* Medium priority */
}
```

### Add New Priority Level

```javascript
// In HTML, add button:
<button class="priority-btn urgent" data-priority="urgent">Urgent</button>

// Add CSS:
.priority-badge.urgent {
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
}
```

### Change Time Format

```javascript
function getTimeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  
  // Custom formats:
  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
  // etc...
}
```

## 🌐 Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Opera 76+

## 🚀 Future Enhancements

### Phase 1 - Basic Improvements
- [ ] Add due dates
- [ ] Add task categories/tags
- [ ] Add task notes/description
- [ ] Implement drag-and-drop reordering
- [ ] Add keyboard shortcuts

### Phase 2 - Data Persistence
- [ ] Save to LocalStorage
- [ ] Import/Export tasks (JSON)
- [ ] Add undo/redo functionality
- [ ] Implement task history

### Phase 3 - Advanced Features
- [ ] Add subtasks
- [ ] Create recurring tasks
- [ ] Add task reminders
- [ ] Implement dark/light mode toggle
- [ ] Add task statistics dashboard

## 🎯 Key Differences vs Notes App

| Feature | To-Do List | Notes App |
|---|---|---|
| **Storage** | In-memory (no persistence) | LocalStorage (persistent) |
| **Data Structure** | Simple objects | Rich objects with categories |
| **Primary Action** | Toggle complete | Edit content |
| **View** | List view | Grid/card view |
| **Filtering** | Status-based | Search-based |

## 🤝 Contributing

Contributions welcome! Please read [CONTRIBUTING.md](../../CONTRIBUTING.md).

## 📝 License

MIT License - see [LICENSE](../../LICENSE) file.

---

## 🎓 Learning Resources

- [MDN - Array Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [JavaScript.info - Arrays](https://javascript.info/array-methods)
- [MDN - DOM Manipulation](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents)

## 📞 Contact

**Code-Odessey Project**

- GitHub: [@Debanga-06](https://github.com/Debanga-06)
- Repository: [Code-Odessey](https://github.com/Debanga-06/Code-Odessey)

---

**Part of the Code-Odessey Project Series** 🚀

**Happy Coding!** ✅✨
