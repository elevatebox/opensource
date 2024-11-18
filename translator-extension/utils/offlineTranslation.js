function translateOffline(text, targetLang) {
    const translations = {
      "hello": {
        "es": "hola",
        "fr": "bonjour",
        "de": "hallo"
      }
    };
  
    return translations[text.toLowerCase()]?.[targetLang] || "Translation not available offline";
  }
  