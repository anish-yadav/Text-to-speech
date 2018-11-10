const synth = window.speechSynthesis;

const textForm = document.querySelector("form");
const textInput = document.querySelector("#text-input");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector("#rate-value");
const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector("#pitch-value");
const voiceSelect = document.querySelector("#select-voice");
const body = document.querySelector("body");
 var request = require('request');
//Browser identifier
// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined';

// Chrome 1+
var isChrome = !!window.chrome && !!window.chrome.webstore;

// translate text function
function translateText(text,to) {
    var encodedText = encodeURIComponent(text);
    var APIkey = 'trnsl.1.1.20180919T092428Z.e002d2bf6d6203f9.5d700814ead3353b8f2b18ecb32708e79a195d10';
     var url = 'https://translate.yandex.net/api/v1.5/tr.json/translate?key='+APIkey+'&text='+encodedText'&lang=en-'+to+'&[format=plain]';
    request({
        url:url,
        json:true
    },function(error,response,data){
        return data.text[0];
    })
}



// Init voices array


let voices =[];

const getVoices = () => {

            voices = synth.getVoices();

            voices.forEach(voice => {
                const option = document.createElement('option');
                option.textContent = voice.name +'('+voice.lang+')';
                option.setAttribute('data-lang',voice.lang);
    
                option.setAttribute('data-name',voice.name);

                voiceSelect.appendChild(option);
    
    
              });


};

if (isFirefox) {
    getVoices();
}
if (isChrome) {
    if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = getVoices;
    }
}


const speak = () => {

   

if(synth.speaking) {
    
   console.error("Already speaking ....");
    return;
}
if(textInput.value !== "") {
    body.style.background = '#141414 url(img/wave.gif)';
    body.style.backgroundRepeat = 'repeat-x';
    body.style.backgroundSize = '100% 100%';


    const speakText = new SpeechSynthesisUtterance(textInput.value);

    speakText.onend = e =>{

        body.style.background = 'black';

        console.log("Done Speaking ....");

    }

    speakText.onerror = e => {
        console.error("Something is wrong ...");
    }

    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');
    const selectedLang =  voiceSelect.selectedOptions[0].getAttribute('data-lang').substring(0,2);
    console.log(selectedLang);
      voices.forEach(voice => {
        if( voice.name === selectedVoice){
            speakText.voice = voice;
        }

  });


  //set pitch and rate
  speakText.rate = rate.value;
  speakText.pitch = pitch.value;

  synth.speak(speakText);


}

};



textForm.addEventListener('submit',e =>{
    e.preventDefault();
    speak();
    textInput.blur();
});
rate.addEventListener('change',e=> rateValue.textContent = rate.value);
pitch.addEventListener('change',e=> pitchValue.textContent = pitch.value);

voiceSelect.addEventListener('change',e =>  speak());
