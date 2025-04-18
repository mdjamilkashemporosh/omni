import { API_URL } from '../config/config.js';

async function streamRequest(prompt, index) {
  const start = performance.now();
  const responseBox = document.createElement('div');
  responseBox.className = 'response';

  const header = document.createElement('div');
  header.className = 'response-header';
  header.textContent = `Request #${index} (streaming...)`;
  responseBox.appendChild(header);

  const content = document.createElement('div');
  responseBox.appendChild(content);

  document.getElementById('results').appendChild(responseBox);

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullText = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      fullText += chunk;
      content.textContent += chunk;
    }

    const end = performance.now();
    header.textContent = `✅ Request #${index} - ${Math.round(end - start)} ms`;
  } catch (err) {
    header.textContent = `❌ Request #${index} Failed`;
    content.textContent = err.message;
  }
}

async function runConcurrentTest() {
  const prompt = document.getElementById('prompt').value;
  const count = parseInt(document.getElementById('count').value, 10);
  const results = document.getElementById('results');
  results.innerHTML = `<p>⏳ Launching ${count} concurrent requests...</p>`;

  const requests = Array.from({ length: count }, (_, i) =>
    streamRequest(prompt, i + 1)
  );

  await Promise.all(requests);
}

window.runConcurrentTest = runConcurrentTest;