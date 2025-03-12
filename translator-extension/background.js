chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "translateSelection",
      title: "Translate Selected Text",
      contexts: ["selection"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId === "translateSelection") {
      const targetLanguage = "es"; // Default to Spanish; modify as needed
      const translatedText = await translateText(info.selectionText, targetLanguage);
  
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: (text) => alert(`Translated: ${text}`),
        args: [translatedText]
      });
    }
  });
  