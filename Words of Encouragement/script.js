function renderTTS(text) {
  var synthesis = window.speechSynthesis;

  console.log("Available Voices:");
  var voice = synthesis.getVoices().filter(function (voice) {
    console.log(voice.name + " " + voice.lang);
    return voice.name === 'Google UK English Female';
  })[0];

  var utterance = new SpeechSynthesisUtterance(text);

  utterance.voice = voice;
  utterance.pitch = 1;
  utterance.rate = 1;
  utterance.volume = 1;

  synthesis.speak(utterance);
}

function encourage() {
  let name = document.getElementById("name").value;
  let encouragement = document.getElementById("encouragement").value;
  
  let message = `Hello ${name}, I have something I would like to tell you. ${encouragement} Have a nice day!`;
  
  renderTTS(message);
}
