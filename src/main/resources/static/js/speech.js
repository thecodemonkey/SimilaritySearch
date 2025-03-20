var recognition = null;
let isRecognitionRunning = false;

function initText2Speech(onSpeechResultClbk){
  const micBtn = document.getElementById("micBtn");
  const searchField = document.getElementById("search");

  isRecognitionRunning = false;

  if (!micBtn || !searchField) return;


  if (!('webkitSpeechRecognition' in window)) {
    alert("Your browser does not support speech recognition. Please use Google Chrome.");
  } else {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = LANGUAGE === 'de' ? "de-DE" : 'en-GB';

    // console.log('lang' + recognition.lang);


    var preContent = "";

    recognition.onstart = function() {
      //micBtn.disabled = true;
      //micBtn.textContent = "Listening...";
      isRecognitionRunning = true;

      preContent = searchField.value.trim();

      searchField.parentElement.classList.add('speech')
      searchField.focus()
    };

    recognition.onresult = function(event) {
      let interimTranscript = '';
      let finalTranscript = '';


      // console.log('event: ', event);

      for (let i = 0; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      searchField.value = preContent + finalTranscript + interimTranscript;

      // recognize end command.
      // const cmd = searchField.value.trim().toLowerCase();
      // const cm = ["ende", "over", "tu es", "finde jetzt"]
      // .find(c => cmd.endsWith(c));
      // if (cm) {
      //   searchField.value = searchField.value.replace( new RegExp(cm, 'gi'), '');
      //   recognition.stop();
      // }

    };

    recognition.onspeechend = function() {
      recognition.stop();
    };

    recognition.onend = function() {
      // micBtn.disabled = false;
      // micBtn.textContent = "Start Voice Input";
      searchField.value = searchField.value.trim();
      searchField.parentElement.classList.remove('speech');
      isRecognitionRunning = false;

      if (onSpeechResultClbk) {
        onSpeechResultClbk(searchField.value);
      }
    };

    recognition.onerror = function(event) {
      console.error("Speech recognition error detected: " + event.error);
      // micBtn.disabled = false;
      // micBtn.textContent = "Start Voice Input";
      searchField.parentElement.classList.remove('speech');
    };



    micBtn.addEventListener("click", function() {
      if (!isRecognitionRunning) {
        searchField.value = "";
        recognition.start();
      } else
        recognition.stop();
    });
  }
}