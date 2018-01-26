const OSCNode = require('./lib/OSCNode.js');
const env = process.env;

var rn_client = OSCNode.Client({
	username: env['OSC_ADMIN'],
	password: env['OSC_PASSWORD'],
	interface: env['OSC_SITE'],
	demo_site: true
});

var options = {
	client: rn_client,
	id: 176
}

OSCNode.AnalyticsReportResults.run(options,function(err,data){
	console.log(data);

	data.map((res)=>{
		console.log(`Columns: ${Object.keys(res).join(", ")}`);
		console.log(`Values: ${Object.values(res).join(", ")}`);
	})
})