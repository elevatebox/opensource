document.addEventListener("DOMContentLoaded", () => {
  const notesTab = document.getElementById("notes-tab");
  const bookmarksTab = document.getElementById("bookmarks-tab");
  const notesSection = document.getElementById("notes-section");
  const bookmarksSection = document.getElementById("bookmarks-section");

  const notesList = document.getElementById("notes-list");
  const bookmarksList = document.getElementById("bookmarks-list");
  const saveNoteButton = document.getElementById("save-note");
  const saveBookmarkButton = document.getElementById("save-bookmark");

  const newNoteInput = document.getElementById("new-note");
  const bookmarkTitleInput = document.getElementById("bookmark-title");
  const bookmarkUrlInput = document.getElementById("bookmark-url");

  // Toggle between Notes and Bookmarks tabs
  notesTab.addEventListener("click", () => {
    notesSection.classList.remove("hidden");
    bookmarksSection.classList.add("hidden");
    notesTab.classList.add("active");
    bookmarksTab.classList.remove("active");
  });

  bookmarksTab.addEventListener("click", () => {
    bookmarksSection.classList.remove("hidden");
    notesSection.classList.add("hidden");
    bookmarksTab.classList.add("active");
    notesTab.classList.remove("active");
  });

  // Save a new note
  saveNoteButton.addEventListener("click", () => {
    const note = newNoteInput.value.trim();
    if (note) {
      chrome.storage.local.get({ notes: [] }, (result) => {
        const notes = result.notes;
        notes.push(note);
        chrome.storage.local.set({ notes }, () => {
          renderNotes(notes);
          newNoteInput.value = "";
        });
      });
    }
  });

  // Save a new bookmark
  saveBookmarkButton.addEventListener("click", () => {
    const title = bookmarkTitleInput.value.trim();
    const url = bookmarkUrlInput.value.trim();

    if (title && url) {
      chrome.bookmarks.create({ title, url }, (bookmark) => {
        if (bookmark) {
          renderBookmarks();
          bookmarkTitleInput.value = "";
          bookmarkUrlInput.value = "";
        } else {
          alert("Failed to create bookmark, Please enter a valid URL.");
        }
      });
    } else {
      alert("Please provide both a title and a valid URL.");
    }
  });

  // Render saved notes
  function renderNotes(notes) {
    notesList.innerHTML = "";
    notes.forEach((note, index) => {
      const li = document.createElement("li");
      li.textContent = note;

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => {
        notes.splice(index, 1);
        chrome.storage.local.set({ notes }, () => renderNotes(notes));
      });

      li.appendChild(deleteButton);
      notesList.appendChild(li);
    });
  }

  // Render saved bookmarks
  function renderBookmarks() {
    bookmarksList.innerHTML = "";
    chrome.bookmarks.getTree((nodes) => {
      const bookmarks = flattenBookmarks(nodes);
      bookmarks.forEach((bookmark) => {
        if (bookmark.url) {
          const li = document.createElement("li");

          const link = document.createElement("a");
          link.textContent = bookmark.title || bookmark.url;
          link.href = bookmark.url;
          link.target = "_blank";
          link.style.flex = "1";

          const deleteButton = document.createElement("button");
          deleteButton.textContent = "Delete";
          deleteButton.addEventListener("click", () => {
            chrome.bookmarks.remove(bookmark.id, () => renderBookmarks());
          });

          li.appendChild(link);
          li.appendChild(deleteButton);
          bookmarksList.appendChild(li);
        }
      });
    });
  }

  // Flatten bookmark nodes into a simple array
  function flattenBookmarks(nodes) {
    let bookmarks = [];
    nodes.forEach((node) => {
      if (node.children) {
        bookmarks = bookmarks.concat(flattenBookmarks(node.children));
      } else {
        bookmarks.push(node);
      }
    });
    return bookmarks;
  }

  // Load existing data on startup
  chrome.storage.local.get({ notes: [] }, (result) => {
    renderNotes(result.notes);
  });
  renderBookmarks();
});
