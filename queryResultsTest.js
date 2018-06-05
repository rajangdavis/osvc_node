const OSvCNode = require('./lib/OSvCNode.js');
const env = process.env;

var rn_client = OSvCNode.Client({
	username: env['OSC_ADMIN'],
	password: env['OSC_PASSWORD'],
	interface: env['OSC_SITE'],
	demo_site:true
});

var options = {
	client: rn_client,
	query: `DESCRIBE Incidents`,
}

OSvCNode.QueryResults.query(options).then(data =>{
	console.log(data)
}).catch(err => {
	console.log(err);
});