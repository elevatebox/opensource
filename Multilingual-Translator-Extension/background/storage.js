function savePreference(key, value) {
    chrome.storage.sync.set({ [key]: value });
  }
  
  function getPreference(key, callback) {
    chrome.storage.sync.get([key], (result) => {
      callback(result[key]);
    });
  }
  
  function cacheTranslation(originalText, translatedText) {
    const cacheKey = `cache_${btoa(originalText)}`;
    chrome.storage.local.set({ [cacheKey]: translatedText });
  }
  
  function getCachedTranslation(originalText, callback) {
    const cacheKey = `cache_${btoa(originalText)}`;
    chrome.storage.local.get([cacheKey], (result) => {
      callback(result[cacheKey]);
    });
  }
  
  export { savePreference, getPreference, cacheTranslation, getCachedTranslation };
  