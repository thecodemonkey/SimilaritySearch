const BASE_URL = ''; //http://localhost:7070';

var LANGUAGE = 'en';

async function start() {
  initText2Speech(async (term) => {
    if (term && term.trim().length > 0) {
      await onSearchTerm(term);
    }
  });

  await registerLang();


  let debounceTimer;
  const elmLoader = document.getElementById('sr_ldr');
  const searchInput = document.getElementById('search');
  const resultElm = document.getElementById('result');

  const onSearch = (e) => {
    e.stopPropagation();
    e.preventDefault();

    resultElm.classList.remove('on');

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(async () => {

      const val = e.target.value;

      if (val && val.length > 2) {
        await onSearchTerm(e.target.value)
      }
    }, 1000);
  }

  searchInput.addEventListener('keyup', onSearch);
  searchInput.addEventListener('blur', onSearch);
}

async function registerLang(){
  document.querySelectorAll('.lang span').forEach((e) => {
    e.addEventListener('click', (lem) => {

      LANGUAGE = lem.target.textContent.trim();

      console.log('select: ' + LANGUAGE);
      console.log('select: ' + lem.target.classList);

      if (LANGUAGE === 'en') {
        document.querySelector('.lang span.de').classList.remove('active');
      } else {
        document.querySelector('.lang span.en').classList.remove('active');
      }

      console.log('sent lang to: ' + LANGUAGE);

      recognition.stop();

      initText2Speech(async (term) => {
        if (term && term.trim().length > 0) {
          await onSearchTerm(term);
        }
      });

      lem.target.classList.add('active');
    })
  })
}

async function onSearchTerm(term){
  const elmLoader = document.getElementById('sr_ldr');

  elmLoader.classList.add('load');
  const result = await callSearch(term);

  setTimeout(async () => {
    elmLoader.classList.remove('load');
    await receiveResult(result);
  }, 1000);
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

  const relMultiplier = 1.2;

  if (val && val.length > 0) {
    const items = val.map(v => {
      // the score should be artificially increased with a multiplier to make
      // the relevance more user-friendly
      let score = Math.round(v.score * relMultiplier * 100);
      if (score > 100) score = 100;

      return `<li><span>${v.text}</span> <i class="${getConfCls(
          v.score)}">${score}%</i></li>`
    });

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