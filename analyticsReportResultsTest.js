const OSvCNode = require('./lib/OSvCNode.js');
const env = process.env;

var rn_client = OSvCNode.Client({
	username: env['OSC_ADMIN'],
	password: env['OSC_PASSWORD'],
	interface: env['OSC_SITE'],
	demo_site: true
});

var options = {
	client: rn_client,
	json: {id: 176},
}

OSvCNode.AnalyticsReportResults.run(options).then((results) => {
	results.map((result)=>{
		console.log(`Columns: ${Object.keys(result).join(", ")}`);
		console.log(`Values: ${Object.values(result).join(", ")}`);
	})
}).catch((error)=>{
	console.log(error);
})