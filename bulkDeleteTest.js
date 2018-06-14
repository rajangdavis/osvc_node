const {Client, QueryResults} = require('./lib/OSvCNode');
const env = process.env;

var rnClient = Client({
	username: env['OSC_ADMIN'],
	password: env['OSC_PASSWORD'],
	interface: env['OSC_SITE'],
	demo_site: true,
	version: "latest"
});

var options = {
	client: rnClient,
	query: `DELETE FROM INCIDENTS LIMIT 10`,
	annotation: "Delete example"
}

QueryResults.query(options).then(data =>{
	console.log(data)
}).catch(err => {
	console.log(err);
});