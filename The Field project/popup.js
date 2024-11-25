document.addEventListener("DOMContentLoaded", () => {
    const notesTab = document.getElementById("notes-tab");
    const bookmarksTab = document.getElementById("bookmarks-tab");
    const notesSection = document.getElementById("notes-section");
    const bookmarksSection = document.getElementById("bookmarks-section");
    const saveNoteButton = document.getElementById("save-note");
    const notesList = document.getElementById("notes-list");
    const saveBookmarkButton = document.getElementById("save-bookmark");
    const bookmarksList = document.getElementById("bookmarks-list");
  
    // Switch between tabs
    notesTab.addEventListener("click", () => {
      notesTab.classList.add("active");
      bookmarksTab.classList.remove("active");
      notesSection.style.display = "block";
      bookmarksSection.style.display = "none";
    });
  
    bookmarksTab.addEventListener("click", () => {
      bookmarksTab.classList.add("active");
      notesTab.classList.remove("active");
      notesSection.style.display = "none";
      bookmarksSection.style.display = "block";
    });
  
    // Save a note
    saveNoteButton.addEventListener("click", () => {
      const newNote = document.getElementById("new-note").value.trim();
      if (newNote) {
        chrome.storage.local.get("notes", (data) => {
          const notes = data.notes || [];
          notes.push(newNote);
          chrome.storage.local.set({ notes }, () => {
            renderNotes(notes);
            document.getElementById("new-note").value = ""; // Clear the input
          });
        });
      }
    });
  
    // Render Notes
    function renderNotes(notes) {
      notesList.innerHTML = "";
      notes.forEach((note, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = note;
  
        // Add edit button
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => {
          const newNote = prompt("Edit your note:", note);
          if (newNote !== null && newNote.trim() !== "") {
            notes[index] = newNote.trim();
            chrome.storage.local.set({ notes }, () => renderNotes(notes));
          }
        });
  
        // Add delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
          notes.splice(index, 1);
          chrome.storage.local.set({ notes }, () => renderNotes(notes));
        });
  
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);
        notesList.appendChild(listItem);
      });
    }
  
    // Load notes on startup
    chrome.storage.local.get("notes", (data) => {
      renderNotes(data.notes || []);
    });
  
    // Save a bookmark
    saveBookmarkButton.addEventListener("click", () => {
      const bookmarkUrl = document.getElementById("bookmark-url").value.trim();
      const bookmarkTitle = document.getElementById("bookmark-title").value.trim();
      if (bookmarkUrl && bookmarkTitle) {
        chrome.bookmarks.create(
          { title: bookmarkTitle, url: bookmarkUrl },
          () => {
            document.getElementById("bookmark-url").value = "";
            document.getElementById("bookmark-title").value = ""; // Clear inputs
            loadBookmarks();
          }
        );
      }
    });
  
    // Render Bookmarks
    function renderBookmarks(bookmarks) {
      bookmarksList.innerHTML = "";
      bookmarks.forEach((bookmark) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${bookmark.title} - ${bookmark.url}`;
  
        // Add delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
          chrome.bookmarks.remove(bookmark.id, () => loadBookmarks());
        });
  
        // Add edit button
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => {
          const newTitle = prompt("Edit bookmark title:", bookmark.title);
          if (newTitle !== null && newTitle.trim() !== "") {
            chrome.bookmarks.update(bookmark.id, { title: newTitle.trim() }, () => loadBookmarks());
          }
        });
  
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);
        bookmarksList.appendChild(listItem);
      });
    }
  
    // Load bookmarks
    function loadBookmarks() {
      chrome.bookmarks.getTree((bookmarkTreeNodes) => {
        const bookmarks = [];
        function processBookmarks(nodes) {
          nodes.forEach((node) => {
            if (node.url) {
              bookmarks.push({ id: node.id, title: node.title, url: node.url });
            }
            if (node.children) {
              processBookmarks(node.children);
            }
          });
        }
        processBookmarks(bookmarkTreeNodes);
        renderBookmarks(bookmarks);
      });
    }
  
    // Load bookmarks on startup
    loadBookmarks();
  });
  