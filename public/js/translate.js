var request = require('request');
var APIkey = 'trnsl.1.1.20180919T092428Z.e002d2bf6d6203f9.5d700814ead3353b8f2b18ecb32708e79a195d10';
var url = 'https://translate.yandex.net/api/v1.5/tr.json/translate?key='+APIkey+'&text=Hello&lang=en-fr&[format=plain]';

// request({
// 	url:url,
// 	json:true
// },function(error,response,data){
// 	console.log(data.text[0]);
// });

  fetch(url).then(function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        console.log(data);
      });
    }
  ).catch(function(err) {
    console.log('Fetch Error :-S', err);
  });