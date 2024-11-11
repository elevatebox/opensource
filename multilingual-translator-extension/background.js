chrome.runtime.onInstalled.addListener(() => {
    // Context menu for selected text translation
    chrome.contextMenus.create({
      id: "translateSelection",
      title: "Translate Selected Text",
      contexts: ["selection"]
    });
  
    // Context menu for dictionary lookup
    chrome.contextMenus.create({
      id: "dictionaryLookup",
      title: "Look up Dictionary",
      contexts: ["selection"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "translateSelection") {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: translateSelectedText,
        args: [info.selectionText]
      });
    } else if (info.menuItemId === "dictionaryLookup") {
      fetchDictionaryDefinition(info.selectionText);
    }
  });
  
  function translateSelectedText(selectedText) {
    chrome.storage.sync.get("targetLang", ({ targetLang }) => {
      // Placeholder: Add code for translating selected text with API
    });
  }
  
  function fetchDictionaryDefinition(word) {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then(response => response.json())
      .then(data => {
        const definition = data[0]?.meanings[0]?.definitions[0]?.definition || "Definition not found.";
        alert(`${word}: ${definition}`);
      });
  }
  