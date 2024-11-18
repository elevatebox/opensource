document.getElementById("analyze-button").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0].id;
        chrome.scripting.executeScript({
            target: { tabId: activeTab },
            files: ["content.js"]
        });
    });
});
