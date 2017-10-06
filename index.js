const request = require('request');
const Client = require('./lib/Client.js');
const Connect = require('./lib/Connect.js');

let env = process.env;

const OSC_CONFIG = {
	username: env['OSC_ADMIN'],
	password: env['OSC_PASSWORD'],
	interface: env['OSC_SITE'],
	demo_site: true
}

const RN_CLIENT = new Client(OSC_CONFIG);
const onc = new Connect(RN_CLIENT);

var answers = onc.get('answers');

console.log(answers);

// const serialize = (object) =>{
// 	let objectArr = [];
// 	object['items'].forEach(item =>{
// 		objectArr.push(item)
// 	});
// 	return objectArr;
// }

// const get = (client,resource) =>{
// 	request.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', {
		
// 	}
// }


// results = get(OSC_CONFIG,'/answers')

// for(var i = 0; i < results.length; i++){
// 	console.log(results[i])
// }