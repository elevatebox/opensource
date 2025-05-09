document.addEventListener("DOMContentLoaded", () => {
    const notesTab = document.getElementById("notes-tab");
    const bookmarksTab = document.getElementById("bookmarks-tab");
    const notesSection = document.getElementById("notes");
    const bookmarksSection = document.getElementById("bookmarks");
  
    const notesList = document.getElementById("notes-list");
    const bookmarksList = document.getElementById("bookmarks-list");
  
    // Toggle tabs
    notesTab.addEventListener("click", () => {
      notesTab.classList.add("active");
      bookmarksTab.classList.remove("active");
      notesSection.classList.add("active");
      bookmarksSection.classList.remove("active");
    });
  
    bookmarksTab.addEventListener("click", () => {
      bookmarksTab.classList.add("active");
      notesTab.classList.remove("active");
      bookmarksSection.classList.add("active");
      notesSection.classList.remove("active");
    });
  
    // Add new notes
    const noteInput = document.getElementById("note-input");
    const addNoteBtn = document.getElementById("add-note");
  
    addNoteBtn.addEventListener("click", () => {
      const noteText = noteInput.value.trim();
      if (noteText) {
        const li = document.createElement("li");
        li.textContent = noteText;
        notesList.appendChild(li);
        noteInput.value = "";
  
        // Allow removing notes on click
        li.addEventListener("click", () => {
          notesList.removeChild(li);
        });
      }
    });
  
    // Add new bookmarks
    const bookmarkInput = document.getElementById("bookmark-input");
    const addBookmarkBtn = document.getElementById("add-bookmark");
  
    addBookmarkBtn.addEventListener("click", () => {
      const bookmarkURL = bookmarkInput.value.trim();
      if (bookmarkURL) {
        const li = document.createElement("li");
        const link = document.createElement("a");
        link.href = bookmarkURL;
        link.target = "_blank";
        link.textContent = bookmarkURL;
  
        li.appendChild(link);
        bookmarksList.appendChild(li);
        bookmarkInput.value = "";
  
        // Allow removing bookmarks on click
        li.addEventListener("click", () => {
          bookmarksList.removeChild(li);
        });
      }
    });
  });
  