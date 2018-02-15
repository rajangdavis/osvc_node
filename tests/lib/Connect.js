const assert = require('chai').assert;
const oscNode = require('../../lib/oscNode.js');

const env = process.env;

describe('connect.post',function(){ 

	var rnClient = new oscNode.Client({
		username: env['OSC_ADMIN'],
		password: env['OSC_PASSWORD'],
		interface: env['OSC_SITE'],
		demo_site: true
	});

	var data = {
		"primaryContact": {
	    	"id": 2
		},
		"subject": "FishPhone not working"
	}

	var options = {
		client: rnClient,
		url: 'incidents',
		json: data
	}
	

	it('should take a url as a param and make a HTTP POST Request' + 
		' with a response code of 201 and a body of JSON',function(){

		
		oscNode.Connect.post(options,function(err,body,response){
			console.log(err);
			console.log(body);
			console.log(response);
			assert.strictEqual(answers.code,201);
			done();
		});
		

	});

});

describe('connect.get',function(){ 

	var rnClient = new oscNode.Client({
		username: env['OSC_ADMIN'],
		password: env['OSC_PASSWORD'],
		interface: env['OSC_SITE'],
		demo_site: true
	});

	options = {
		client: rnClient,
		url: ''
	}
	

	it('should take a url as a param and make a HTTP GET Request' + 
		' with a response code of 200 and a body of JSON',function(){

		
		oscNode.Connect.get(options,function(err,body,response){
			console.log(err);
			console.log(body);
			console.log(response);
			console.log(test);
			assert.strictEqual(answers.code,200);
			done();
		});
		

	});

});

// PATCH
describe('connect.patch',function(){ 

	var rnClient = new oscNode.Client({
		username: env['OSC_ADMIN'],
		password: env['OSC_PASSWORD'],
		interface: env['OSC_SITE'],
		demo_site: true
	});

	var data = {
		"subject": "FishPhone not working UPDATED"
	}

	var options = {
		client: rnClient,
		url: 'incidents/24790',
		json: data
	}
	

	it('should take a url as a param and make a HTTP PATCH Request' + 
		' with a response code of 201 and an empty body',function(){

		
		oscNode.Connect.patch(options,function(err,body,response){
			console.log(err);
			console.log(body);
			console.log(response);
			assert.strictEqual(answers.code,201);
			done();
		});
		

	});

});



// DELETE

describe('connect.delete',function(){ 

	var rnClient = new oscNode.Client({
		username: env['OSC_ADMIN'],
		password: env['OSC_PASSWORD'],
		interface: env['OSC_SITE'],
		demo_site: true
	});

	var options = {
		client: rnClient,
		query: `SELECT id FROM Incidents LIMIT 1`
	}
	

	it('should take a url as a param and make a HTTP DELETE Request' + 
		' with a response code of 200 and an empty body',function(){

		var deleteIncident = function(options,incidentID){
			var dupedOptions = options;
			dupedOptions.url = `incidents/${incidentID}`;
			oscNode.Connect.delete(dupedOptions,function(err,body,results){
				console.log(results);
				assert.strictEqual(body,undefined);
				assert.strictEqual(results.statusCode,200);
				done();
			})
		}

		oscNode.QueryResults.query(options,function(err,results){
			if(err){
				console.log("ERROR");
				console.log(err);
			}else{
				deleteIncident(options,results[0]['id']);
			}
		});	
		

	});

});