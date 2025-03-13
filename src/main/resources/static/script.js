const BASE_URL = ''; //http://localhost:7070';

async function start() {
  let debounceTimer;
  const elmLoader = document.getElementById('sr_ldr');
  const searchInput = document.getElementById('search');
  const resultElm = document.getElementById('result');

  searchInput.addEventListener('keyup', (e) => {
    resultElm.classList.remove('on');

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(async () => {

      const val = e.target.value;

      if (val && val.length > 2) {
        elmLoader.classList.add('load');
        const result = await callSearch(e.target.value);

        setTimeout(async () => {
          elmLoader.classList.remove('load');
          await receiveResult(result);
        }, 1000);

      }
    }, 1000);
  });
}

async function callSearch(val) {
  try {
    const response = await fetch(`${BASE_URL}/similarity?text=` + encodeURIComponent(val), {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

async function receiveResult(val) {

  if (val && val.length > 0) {
    const items = val.map(v =>
        `<li><span>${v.text}</span> <i class="${getConfCls(v.score)}">${Math.round(v.score * 100)}%</i></li>`
    );

    const resultElm = document.getElementById('result');

    resultElm.innerHTML = items.join('');
    resultElm.classList.add('on');
  }
}

function getConfCls(conf) {
  if (conf > .5) {
    return 'top';
  } else if (conf > .3) {
    return 'middle';
  }

  return 'low';
}

async function startSpeechRecognition() {
  if ('webkitSpeechRecognition' in window && 'SpeechRecognition' in window) {

    const recognition = new (window.SpeechRecognition
                          || window.webkitSpeechRecognition)();
    recognition.lang = 'en-GB';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      document.getElementById('output').textContent = "🗣 " + transcript;
    };

    recognition.onerror = (event) => {
      document.getElementById('output').textContent = "Fehler: " + event.error;
    };
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  await start();
});