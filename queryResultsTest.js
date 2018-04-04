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
	query: `DESCRIBE Incidents`
	// query: `SELECT * FROM Incidents LIMIT 10`
}

OSvCNode.QueryResults.query(options,(err,results) =>{
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