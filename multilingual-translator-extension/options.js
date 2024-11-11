document.getElementById("addGlossaryEntry").addEventListener("click", () => {
    const term = document.getElementById("glossaryTerm").value;
    const translation = document.getElementById("glossaryTranslation").value;
  
    chrome.storage.sync.get("glossary", ({ glossary = [] }) => {
      glossary.push({ term, translation });
      chrome.storage.sync.set({ glossary });
      displayGlossary();
    });
  });
  
  function displayGlossary() {
    chrome.storage.sync.get("glossary", ({ glossary = [] }) => {
      const list = document.getElementById("glossaryList");
      list.innerHTML = "";
      glossary.forEach(entry => {
        const li = document.createElement("li");
        li.textContent = `${entry.term}: ${entry.translation}`;
        list.appendChild(li);
      });
    });
  }
  
  document.addEventListener("DOMContentLoaded", displayGlossary);
  