const OSCNode = require('./lib/OSCNode.js');
const env = process.env;

var rn_client = OSCNode.Client({
	username: env['OSC_ADMIN'],
	password: env['OSC_PASSWORD'],
	interface: env['OSC_SITE'],
	demo_site: true
});


// GET TEST
options = {
	client: rn_client,
	url: ''
}

OSCNode.Connect.get(options,function(err,body,response){
	console.log(err);
	console.log(body);
	console.log(response.toJSON());
})


// POST TEST
var data = {
	"primaryContact": {
    	"id": 2
	},
	"subject": "FishPhone not working"
}

var options = {
	client: rn_client,
	url: 'incidents',
	json: data
}

OSCNode.Connect.post(options,function(err,body,response){
	console.log(err);
	console.log(body);
	console.log(response.toJSON());
});


// PATCH TEST
var data = {
	"primaryContact": {
    	"id": 2
	},
	"subject": "FishPhone not working UPDATED"
}

var options = {
	client: rn_client,
	url: 'incidents/24790',
	json: data
}

OSCNode.Connect.patch(options,function(err,body,response){
	console.log(err);
	console.log(body);
	console.log(response.toJSON());
});

// DELETE TEST

var options = {
	client: rn_client,
	query: `SELECT id FROM Incidents LIMIT 1`
}

var deleteIncident = function(options,incidentID){
	var dupedOptions = options;
	dupedOptions.url = `incidents/${incidentID}`;
	OSCNode.Connect.delete(dupedOptions,function(err,body,results){
		console.log(err);
		console.log(body);
		console.log(results);
	})
}

OSCNode.QueryResults.query(options,function(err,results){
	if(err){
		console.log("ERROR");
		console.log(err);
	}else{
		deleteIncident(options,results[0]['id']);
	}
});