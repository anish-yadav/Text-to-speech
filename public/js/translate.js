var request = require('request');
var APIkey = 'trnsl.1.1.20180919T092428Z.e002d2bf6d6203f9.5d700814ead3353b8f2b18ecb32708e79a195d10';
var url = 'https://translate.yandex.net/api/v1.5/tr.json/translate?key='+APIkey+'&text=Hello&lang=en-ru&[format=plain]';

request({
	url:url,
	json:true
},function(error,response,data){
	console.log(data.text[0]);
});

module.exports = 