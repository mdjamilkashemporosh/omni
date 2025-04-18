import { API_URL } from '../config/config.js';

async function sendPrompt() {
  const prompt = document.getElementById('prompt').value;
  const responseDiv = document.getElementById('response');
  responseDiv.innerHTML = '⏳ Waiting for response...\n';

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    });

    if (!response.ok) {
      responseDiv.innerHTML = `❌ Error: ${response.status}`;
      return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    responseDiv.innerHTML = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      responseDiv.innerHTML += chunk;
    }
  } catch (error) {
    responseDiv.innerHTML = `⚠️ An error occurred: ${error.message}`;
  }
}

window.sendPrompt = sendPrompt;