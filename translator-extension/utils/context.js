async function translateWithContext(text, targetLang) {
    const detectedContext = await analyzeTextContext(text);
    const translatedText = await translateText(text, targetLang, detectedContext);
    return translatedText;
  }
  
  async function analyzeTextContext(text) {
    if (text.includes("apple")) {
      return "fruit";
    }
    return "general";
  }
  