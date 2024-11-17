async function recordAndTranslate(targetLang) {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US"; // Default language for input
    recognition.interimResults = false;
  
    return new Promise((resolve, reject) => {
      recognition.start();
  
      recognition.onresult = async (event) => {
        const spokenText = event.results[0][0].transcript;
        console.log("Recognized Speech:", spokenText);
  
        // Translate the spoken text
        const translatedText = await translateText(spokenText, targetLang);
        resolve({ original: spokenText, translated: translatedText });
      };
  
      recognition.onerror = (error) => reject(error);
    });
  }
  