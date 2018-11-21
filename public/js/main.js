

const speechSynthesisSupported = 'speechSynthesis' in window;

	let isPaused = false;
	let isPlaying = false

const textForm = document.querySelector("form");
const textInput = document.querySelector("#text-input");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector("#rate-value");
const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector("#pitch-value");
const voiceSelect = document.querySelector("#select-voice");
const body = document.querySelector("body");

let voices = [];
var translatedVoice = '';

const displayVoice = function (voices) {

	voices.forEach((voice) => {
     
    const option = document.createElement('option');
      option.textContent = voice.name +'('+voice.lang+')';
                option.setAttribute('data-lang',voice.lang);
    
                option.setAttribute('data-name',voice.name);

                voiceSelect.appendChild(option);

	});

}

const getVoices = () => {
	const voices  = speechSynthesis.getVoices();

	if (voices.length > 0) {
		displayVoice(voices);
	}
}
    const translate = function(text,lang) {
	               const Http = new XMLHttpRequest();
                   XMLHttpRequest.responseType = "json";
                   var APIkey = 'trnsl.1.1.20180919T092428Z.e002d2bf6d6203f9.5d700814ead3353b8f2b18ecb32708e79a195d10';
                   var url = 'https://translate.yandex.net/api/v1.5/tr.json/translate?key='+APIkey+'&text='+text+'&lang=en-'+lang+'&[format=plain]';
                    console.log(text);
                        Http.open("GET", url,false);
                        Http.onreadystatechange=(e)=>{
                        	 if (Http.readyState == 4 && Http.status == 200) {
                        	 	   var count = 0;
                                    var responseBody = Http.responseText;
                                      var data = JSON.parse(responseBody);
                                        translatedVoice = data.text[0];
                                    
                                 }

                             }
                             Http.send();
   }

 function speak(TextToSpeech) {

    if (TextToSpeech !=='') {

    textForm.style.background = "#FF7417 url('../img/wave.gif')";

		const utterence = new SpeechSynthesisUtterance();
		
	            const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');
                console.log('Selected voice is '+selectedVoice);
                const selectedLang =  voiceSelect.selectedOptions[0].getAttribute('data-lang').substring(0,2);
                console.log('selected lang is '+selectedLang);

                // Translation part goes here
          
                translate(TextToSpeech,selectedLang);
            
                 				                 
					                utterence.text = translatedVoice;

					                utterence.voice = speechSynthesis
									.getVoices()
									.filter(function (voice) {
										return voice.name === selectedVoice ;
									})[0];;
					        utterence.lang = selectedLang;
					        utterence.rate = rate.value;
                        utterence.pitch = pitch.value;

					        window.speechSynthesis.speak(utterence);
			    utterence.onend = e => {
			    	textForm.style.background = '#FF7417';
			    }
                  //}
        }
    }

	

	if (speechSynthesisSupported) {
		getVoices();

		// Chrome loads voices asynchronously.
		window.speechSynthesis.onvoiceschanged = () => {
			getVoices();
		};
	}
   
    if (speechSynthesisSupported) {

     textForm.addEventListener('submit',e =>{
     	e.preventDefault();

    	if (textInput.value.length >0 ) {

    		speak(textInput.value);
    	} 
   });


     rate.addEventListener('change',e=> rateValue.textContent = rate.value);
    pitch.addEventListener('change',e=> pitchValue.textContent = pitch.value);

    voiceSelect.addEventListener('change',e =>  speak(textInput.value));
    }