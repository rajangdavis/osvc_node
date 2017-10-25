const OSCNode = require('./lib/OSCNode.js');
const env = process.env;

var rn_client = OSCNode.Client({
	username: env['OSC_ADMIN'],
	password: env['OSC_PASSWORD'],
	interface: env['OSC_SITE'],
	demo_site:true
});

var contactsQuery = `DESC`

var options = {
	client: rn_client,
	query: contactsQuery
}

OSCNode.QueryResults.query(options,(err,results) =>{
	if(err){
		// handle error
	}else if(results.status){
		console.log(results);
	}else{
		results.map(function(result){
			console.log(result);
		})
	}
});