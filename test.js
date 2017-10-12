const oscNode = require('./lib/oscNode.js');
const env = process.env;

// As it is today
// closer to https://github.com/rajangdavis/osc_ruby API

// Create an oscNode.Client object
var rnClient = oscNode.Client({
	username: env['OSC_ADMIN'],
	password: env['OSC_PASSWORD'],
	interface: env['OSC_SITE'],
	demo_site: true
});

// Use oscNode.Connect Method to pass in:
// 1. Client Credentials
// 2. Make a GET Request to a specified URL
// 3. Handle callback
oscNode.Connect.get(rnClient,'answers?q=ID < 100',(err,body,response) => {
	if(err){
		console.log(err);
	}else{
		console.log(response.statusCode);
		console.log(JSON.stringify(body.items, null, 4));
		return body;
	}
});