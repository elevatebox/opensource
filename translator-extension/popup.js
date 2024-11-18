document.getElementById('translateBtn').addEventListener('click', () => {
    const language = document.getElementById('languageSelect').value;
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "translate", language });
    });
  });
  
  document.getElementById('playAudioBtn').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "playAudio" });
    });
  });
  
  document.getElementById('writeAssistantBtn').addEventListener('click', async () => {
    const language = document.getElementById('languageSelect').value;
    const userText = document.getElementById('textInput').value;
    const aiGeneratedText = await generateTextUsingAI(userText, language);
    alert(`AI Suggested: ${aiGeneratedText}`);
  });
  
  async function generateTextUsingAI(inputText, language) {
    const apiKey = "YOUR_API_KEY"; // Use OpenAI API or similar
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: `Write content in ${language}: ${inputText}`,
        max_tokens: 100,
      }),
    });
    const data = await response.json();
    return data.choices[0].text;
  }
  
  document.getElementById('recordSpeechBtn').addEventListener('click', async () => {
    const language = document.getElementById('languageSelect').value;
    const { original, translated } = await recordAndTranslate(language);
    alert(`Original: ${original}\nTranslated: ${translated}`);
  });
  
  document.getElementById('viewHistoryBtn').addEventListener('click', () => {
    chrome.storage.local.get('history', (result) => {
      const history = result.history || [];
      const historyDiv = document.getElementById('history');
      historyDiv.innerHTML = '';
      history.forEach(item => {
        const p = document.createElement('p');
        p.innerText = `${item.original} -> ${item.translated}`;
        historyDiv.appendChild(p);
      });
    });
  });
  
  document.getElementById('exportHistoryBtn').addEventListener('click', () => {
    chrome.storage.local.get('history', (result) => {
      exportTranslations(result.history || []);
    });
  });
  
  document.getElementById('darkModeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });
  