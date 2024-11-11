document.getElementById("translateBtn").addEventListener("click", () => {
    const targetLang = document.getElementById("languageSelect").value;
    const tone = document.getElementById("toneSelect").value;
    const theme = document.getElementById("themeSelect").value;
  
    chrome.storage.sync.set({ targetLang, theme, tone });
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: translatePageContent
      });
    });
  });
  
  chrome.storage.sync.get("theme", ({ theme }) => {
    document.body.classList.add(theme + "-theme");
  });
  