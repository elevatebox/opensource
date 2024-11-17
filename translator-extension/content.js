chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "translate") {
      const { language } = message;
      const selection = window.getSelection();
      const selectedText = selection.toString().trim();
  
      if (selectedText) {
        translateText(selectedText, language).then((translatedText) => {
          alert(`Translated: ${translatedText}`);
          saveTranslation(selectedText, translatedText);
        });
      }
    }
  
    if (message.action === "playAudio") {
      const text = "Hello, this is a test."; // Example text
      speakText(text);
    }
  });
  
  function speakText(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  }
  