chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'translatePage') {
      const textToTranslate = document.body.innerText;
  
      chrome.runtime.sendMessage(
        { action: 'translate', text: textToTranslate, targetLang: request.targetLang },
        (response) => {
          if (response && response.translatedText) {
            document.body.innerHTML = document.body.innerHTML.replace(textToTranslate, response.translatedText);
          }
        }
      );
    }
  });
  