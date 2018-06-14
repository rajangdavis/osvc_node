const {Client, AnalyticsReportResults} = require('./lib/OSvCNode.js');
const env = process.env;

var rnClient = Client({
	username: env['OSC_ADMIN'],
	password: env['OSC_PASSWORD'],
	interface: env['OSC_SITE'],
	demo_site: true
});

var options = {
	client: rnClient,
	json: {id: 176, limit: 2, filters:[{ name: "search_ex", values: ['returns']}]},
}

AnalyticsReportResults.run(options).then((results) => {
	results.map((result)=>{
		console.log(`Columns: ${Object.keys(result).join(", ")}`);
		console.log(`Values: ${Object.values(result).join(", ")}`);
	})
}).catch((error)=>{
	console.log(error);
})