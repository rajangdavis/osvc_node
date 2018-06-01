const osvcClient = require('./lib/OSvCNode.js').Client;
const osvcConnect = require('./lib/OSvCNode.js').Connect;
const env = process.env;

const rn_client = osvcClient({
	username: env['OSC_ADMIN'],
	password: env['OSC_PASSWORD'],
	interface: env['OSC_SITE'],
	demo_site: true
});

let options = {
	client: rn_client,
	url: 'incidents',
	prettyPrint: true
}

const getIncidents = async () =>{
	console.log(await osvcConnect.get(options))
	return "done";
}

getIncidents();