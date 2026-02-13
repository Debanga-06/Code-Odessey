   // State
    let notes = [];
    let editingNoteId = null;

    // DOM Elements
    const newNoteBtn = document.getElementById('newNoteBtn');
    const clearAllBtn = document.getElementById('clearAllBtn');
    const searchInput = document.getElementById('searchInput');
    const notesGrid = document.getElementById('notesGrid');
    const emptyState = document.getElementById('emptyState');
    const notesCount = document.getElementById('notesCount');
    const noteModal = document.getElementById('noteModal');
    const modalTitle = document.getElementById('modalTitle');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const noteForm = document.getElementById('noteForm');
    const noteTitle = document.getElementById('noteTitle');
    const noteCategory = document.getElementById('noteCategory');
    const noteContent = document.getElementById('noteContent');
    const cancelBtn = document.getElementById('cancelBtn');

    // LocalStorage Keys
    const STORAGE_KEY = 'notes_app_data';

    // Initialize
    function init() {
      loadNotes();
      renderNotes();

      newNoteBtn.addEventListener('click', openModal);
      clearAllBtn.addEventListener('click', clearAllNotes);
      closeModalBtn.addEventListener('click', closeModal);
      cancelBtn.addEventListener('click', closeModal);
      noteForm.addEventListener('submit', saveNote);
      searchInput.addEventListener('input', handleSearch);
      noteModal.addEventListener('click', (e) => {
        if (e.target === noteModal) closeModal();
      });
    }

    // Load Notes from LocalStorage
    function loadNotes() {
      const stored = localStorage.getItem(STORAGE_KEY);
      notes = stored ? JSON.parse(stored) : [];
    }

    // Save Notes to LocalStorage
    function saveToStorage() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    }

    // Open Modal
    function openModal(noteId = null) {
      editingNoteId = noteId;

      if (noteId) {
        const note = notes.find(n => n.id === noteId);
        if (note) {
          modalTitle.textContent = 'Edit Note';
          noteTitle.value = note.title;
          noteCategory.value = note.category;
          noteContent.value = note.content;
        }
      } else {
        modalTitle.textContent = 'New Note';
        noteForm.reset();
      }

      noteModal.classList.add('active');
      noteTitle.focus();
    }

    // Close Modal
    function closeModal() {
      noteModal.classList.remove('active');
      noteForm.reset();
      editingNoteId = null;
    }

    // Save Note (Create or Update)
    function saveNote(e) {
      e.preventDefault();

      const title = noteTitle.value.trim();
      const category = noteCategory.value;
      const content = noteContent.value.trim();

      if (!title || !content) {
        alert('Please fill in all fields');
        return;
      }

      if (editingNoteId) {
        // Update existing note
        const note = notes.find(n => n.id === editingNoteId);
        if (note) {
          note.title = title;
          note.category = category;
          note.content = content;
          note.updatedAt = new Date().toISOString();
        }
      } else {
        // Create new note
        const newNote = {
          id: Date.now(),
          title,
          category,
          content,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        notes.unshift(newNote);
      }

      saveToStorage();
      renderNotes();
      closeModal();
    }

    // Delete Note
    function deleteNote(id) {
      if (confirm('Delete this note?')) {
        notes = notes.filter(note => note.id !== id);
        saveToStorage();
        renderNotes();
      }
    }

    // Clear All Notes
    function clearAllNotes() {
      if (notes.length === 0) {
        alert('No notes to clear');
        return;
      }

      if (confirm(`Delete all ${notes.length} notes? This cannot be undone.`)) {
        notes = [];
        localStorage.removeItem(STORAGE_KEY);
        renderNotes();
      }
    }

    // Search Notes
    function handleSearch() {
      const query = searchInput.value.toLowerCase();
      renderNotes(query);
    }

    // Render Notes
    function renderNotes(searchQuery = '') {
      let filteredNotes = notes;

      if (searchQuery) {
        filteredNotes = notes.filter(note => 
          note.title.toLowerCase().includes(searchQuery) ||
          note.content.toLowerCase().includes(searchQuery)
        );
      }

      notesGrid.innerHTML = '';

      if (filteredNotes.length === 0) {
        emptyState.style.display = 'block';
        notesGrid.style.display = 'none';
      } else {
        emptyState.style.display = 'none';
        notesGrid.style.display = 'grid';

        filteredNotes.forEach(note => {
          const noteCard = createNoteCard(note);
          notesGrid.appendChild(noteCard);
        });
      }

      updateNotesCount();
    }

    // Create Note Card
    function createNoteCard(note) {
      const div = document.createElement('div');
      div.className = 'note-card';
      
      const date = new Date(note.updatedAt);
      const formattedDate = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });

      div.innerHTML = `
        <div class="note-header">
          <div>
            <div class="note-title">${note.title}</div>
          </div>
          <div class="note-actions">
            <button class="action-btn edit-btn" onclick="openModal(${note.id})">✏️</button>
            <button class="action-btn delete-btn" onclick="deleteNote(${note.id})">🗑️</button>
          </div>
        </div>
        <div class="note-content">${note.content}</div>
        <div class="note-footer">
          <span class="note-date">${formattedDate}</span>
          <span class="note-category">${note.category}</span>
        </div>
      `;

      div.addEventListener('click', (e) => {
        if (!e.target.closest('.note-actions')) {
          openModal(note.id);
        }
      });

      return div;
    }

    // Update Notes Count
    function updateNotesCount() {
      const count = notes.length;
      notesCount.textContent = `${count} note${count !== 1 ? 's' : ''} saved in LocalStorage`;
    }

    // Initialize app
    init();