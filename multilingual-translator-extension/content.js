chrome.storage.sync.get("targetLang", ({ targetLang }) => {
    translatePage(targetLang);
  });
  
  function translatePage(targetLang) {
    const textNodes = getTextNodes(document.body);
    textNodes.forEach(node => {
      const originalText = node.nodeValue;
      chrome.runtime.sendMessage(
        { action: "translateText", text: originalText, targetLang },
        response => {
          if (response.translation) {
            node.nodeValue = response.translation;
          }
        }
      );
    });
  }
  
  function getTextNodes(element) {
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );
    const textNodes = [];
    let node;
    while ((node = walker.nextNode())) {
      textNodes.push(node);
    }
    return textNodes;
  }
  