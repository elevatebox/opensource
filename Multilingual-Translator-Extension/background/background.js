chrome.runtime.onInstalled.addListener(() => {
    console.log('Translator Extension Installed');
  });
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'translate') {
      const { text, targetLang } = request;
  
      // Dynamically import translation function
      import('./api.js').then(({ translateText }) => {
        translateText(text, targetLang).then((translatedText) => {
          sendResponse({ translatedText });
        });
      }).catch(error => console.error('Error in translation:', error));
  
      return true;  // Keeps the message channel open for async response
    }
  });
  