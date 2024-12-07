document.addEventListener('DOMContentLoaded', () => {
    const languageSelect = document.getElementById('language-select');
    const themeToggle = document.getElementById('theme-toggle');
  
    chrome.storage.sync.get(['defaultLang', 'darkMode'], (result) => {
      if (result.defaultLang) languageSelect.value = result.defaultLang;
      if (result.darkMode) themeToggle.checked = result.darkMode;
    });
  
    document.getElementById('translate-btn').addEventListener('click', () => {
      const selectedLang = languageSelect.value;
      chrome.storage.sync.set({ defaultLang: selectedLang });
  
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: 'translatePage',
          targetLang: selectedLang
        });
      });
    });
  
    themeToggle.addEventListener('change', () => {
      const isDarkMode = themeToggle.checked;
      chrome.storage.sync.set({ darkMode: isDarkMode });
      document.body.classList.toggle('dark', isDarkMode);
    });
  });
  