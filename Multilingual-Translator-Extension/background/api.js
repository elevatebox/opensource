async function translateText(text, targetLang) {
    const apiKey = 'AIzaSyB9TEOiPJ7uAQt2klh7RmA1XlTMtruqipY';
    const apiUrl = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: text, target: targetLang })
      });
  
      if (!response.ok) throw new Error('Google Translate API error');
      const data = await response.json();
      return data.data.translations[0].translatedText;
    } catch (error) {
      console.warn('Primary API failed, attempting fallback.');
      return fallbackTranslate(text, targetLang);
    }
  }
  
  async function fallbackTranslate(text, targetLang) {
    const apiKey = 'YOUR_FALLBACK_TRANSLATE_API_KEY';
    const apiUrl = `https://api.fallbacktranslate.com/translate?key=${apiKey}`;
  
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, target_lang: targetLang })
    });
  
    const data = await response.json();
    return data.translatedText;
  }
  
  export { translateText };
  