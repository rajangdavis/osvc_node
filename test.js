const oscNode = require('./lib/oscNode.js');
const env = process.env;

// As it is today
// closer to https://github.com/rajangdavis/osc_ruby API

// Create an configuration object
var oscConfigTest = {
	username: env['OSC_ADMIN'],
	password: env['OSC_PASSWORD'],
	interface: env['OSC_SITE'],
	// optional setting to change
	// 'custhelp' domain to
	// 'rightnowdemo'
	demo_site: true
}

// Pass object into oscNode.Client Object
var rnClient = new oscNode.Client(oscConfigTest); 

// Use oscNode.Connect Method to pass in:
// 1. Client Credentials
// 2. Make a GET Request to a specified URL
// 3. Handle callback
oscNode.Connect
	.get(rnClient,'answers?q=ID < 100',(err,body,response) => {
		if(err){
			console.log(err);
		}else{
			console.log(response.statusCode);
			console.log(JSON.stringify(body.items, null, 4));
			return body;
		}
	});



//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//	// Create an oscNode.Client object
//		var rnClient = oscNode.Client({
//			username: env['OSC_ADMIN'],
//			password: env['OSC_PASSWORD'],
//			interface: env['OSC_SITE']
//		});
//
//	// Use oscNode.Connect.get Method to pass
//	// 1. Make a GET Request to a specified URL
//	// 2. Handle callback
//	
//		oscNode.Connect.get(rnClient,'answers?q=ID < 100',(err,body,response) => {
//			if(err){
//				console.log(err);
//			}else{
//				console.log(response.statusCode);
//				console.log(JSON.stringify(body.items, null, 4));
//				return body;
//			}
//		});