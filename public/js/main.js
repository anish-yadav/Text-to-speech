const synth = window.speechSynthesis;

const textForm = document.querySelector("form");
const textInput = document.querySelector("#text-input");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector("#rate-value");
const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector("#pitch-value");
const voiceSelect = document.querySelector("#select-voice");
const body = document.querySelector("body");
//Browser identifier
// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined';

// Chrome 1+
var isChrome = !!window.chrome && !!window.chrome.webstore;

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
                textForm.style.background = '#141414 url(img/wave.gif)';
                textForm.style.backgroundRepeat = 'repeat-x';
                textForm.style.backgroundSize = '100% 100%';
                var count = 1;

                var translatedVoice;

                const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');
                console.log('Selected voice is '+selectedVoice);
                const selectedLang =  voiceSelect.selectedOptions[0].getAttribute('data-lang').substring(0,2);
                console.log('selected lang is '+selectedLang);
                           const Http = new XMLHttpRequest();
                           XMLHttpRequest.responseType = "json";
                           var APIkey = 'trnsl.1.1.20180919T092428Z.e002d2bf6d6203f9.5d700814ead3353b8f2b18ecb32708e79a195d10';
                           var url = 'https://translate.yandex.net/api/v1.5/tr.json/translate?key='+APIkey+'&text='+textInput.value+'&lang=en-'+selectedLang+'&[format=plain]';
                            console.log(textInput.value);
                        Http.open("GET", url);
                        Http.send();
                Http.onreadystatechange=(e)=>{
                                    var responseBody = Http.responseText;
                                    translatedVoice = JSON.parse(responseBody).text[0];
                                     console.log('translated text is '+translatedVoice);
                               



                        const speakText = new SpeechSynthesisUtterance(translatedVoice);
                        //set pitch and rate
                        speakText.lang = voiceSelect.selectedOptions[0].getAttribute('data-lang');
                        speakText.rate = rate.value;
                        speakText.pitch = pitch.value;

                        if(count == 1) {
                        synth.speak(speakText);
                        console.log(speakText);
                        console.log(count);
                        }

                        speakText.onend = e =>{

                        textForm.style.background = '#141414';

                        console.log("Done Speaking ....");
                       console.log(count);
                        count = 1;

                        }

                        speakText.onerror = e => {
                        console.error("Something is wrong ...");
                        }

                        voices.forEach(voice => {
                        if( voice.name === selectedVoice){
                            speakText.voice = voice;
                           console.log(voice);
                            return ;
                       }


                        });
                        count++;
                        return;
                }

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

