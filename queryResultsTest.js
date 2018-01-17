const OSCNode = require('./lib/OSCNode.js');
const env = process.env;

var rn_client = OSCNode.Client({
	username: env['OSC_ADMIN'],
	password: env['OSC_PASSWORD'],
	interface: env['OSC_SITE'],
	demo_site:true
});

var options = {
	client: rn_client,
	query: `DESCRIBE Incidents`
	// query: `SELECT * FROM Incidents LIMIT 10`
}

OSCNode.QueryResults.query(options,(err,results) =>{
	if(err){
		// handle error
	}else if(results.status){
		console.log(results);
		console.log("Status");
	}else{
		results.map(function(result){
			console.log(result);
		})
	}
});