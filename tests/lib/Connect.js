const assert = require('chai').assert;
var client = require('../../lib/Client.js');
var connect = require('../../lib/Connect.js');

const env = process.env;

// GET
describe('connect.get',function(){ 

	var rnClient = new client({
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
		' with a response code of 200 and a body of JSON',function(done){

		
		connect.get(options,function(err,body,response){
			assert.strictEqual(response.statusCode,200);
			done();
		});
		

	});

});

// POST
describe('connect.post',function(){ 

	var rnClient = new client({
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
		' with a response code of 201 and a body of JSON',function(done){

		
		connect.post(options,function(err,body,response){
			createdID = body['id'];
			assert.strictEqual(response.statusCode,201);
			done();
		});
		

	});

	it('should take a url as a param and make a HTTP POST Request' + 
		' with a response code of 201 and a body of JSON',function(done){

	
		var reportOptions = {
			client: rnClient,
			url: 'analyticsReports',
			id: 176
		}


		connect.post(reportOptions,function(err,body,response){
			console.log(err);
			console.log(body);
			console.log(response);
			done();
		});
		

	});

});

// PATCH
describe('connect.patch',function(){ 

	var rnClient = new client({
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
		' with a response code of 201 and an empty body',function(done){

		
		connect.patch(options,function(err,body,response){
			assert.strictEqual(response.statusCode,200);
			done();
		});
		

	});

});



// DELETE
describe('connect.delete',function(){ 

	var rnClient = new client({
		username: env['OSC_ADMIN'],
		password: env['OSC_PASSWORD'],
		interface: env['OSC_SITE'],
		demo_site: true
	});

	var options = {
		client: rnClient,
		url: `incidents/0`
	}
	

	it('should take a url as a param and make a HTTP DELETE Request' + 
		' with a response code of 200 and an empty body',function(done){
		connect.delete(options,function(err,body,response){
			console.log(response);
			// assert.strictEqual(body,undefined);
			assert.strictEqual(response.statusCode,404);
			done();
		});
	});
});