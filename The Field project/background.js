// Listen for bookmark creation events
chrome.bookmarks.onCreated.addListener((id, bookmark) => {
    console.log(`Bookmark created: ${bookmark.title} (${bookmark.url})`);
  });
  
  // Listen for bookmark removal events
  chrome.bookmarks.onRemoved.addListener((id, removeInfo) => {
    console.log(`Bookmark removed: ID ${id}`);
  });
  
  // Optionally handle storage changes
  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === "local" && changes.notes) {
      console.log("Notes updated:", changes.notes.newValue);
    }
  });
    