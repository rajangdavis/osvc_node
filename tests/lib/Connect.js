const assert = require('chai').assert;
var client = require('../../lib/Client.js');
var connect = require('../../lib/Connect.js');

const env = process.env;

describe('connect.clientUrl',function(){

	var rnClient = new client({
		username: 'OSC_ADMIN',
		password: 'OSC_PASSWORD',
		interface: 'OSC_SITE'
	});	

	var options ={
		client: rnClient
	}

	it('should take a options object as a param and return a URL',function(){
	
		var clientUrl = connect.clientUrl(options);
		assert.strictEqual(clientUrl,"https://OSC_ADMIN:OSC_PASSWORD@OSC_SITE.custhelp.com/services/rest/connect/v1.3/");

	});


});

var createdID = 0;

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
		' with a response code of 201 and a body of JSON',function(){

		
		connect.post(options,function(err,body,response){
			console.log(err);
			console.log(body);
			createdID = body['id'];
			console.log(response);
			assert.strictEqual(answers.code,201);
			done();
		});
		

	});

});

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
		' with a response code of 200 and a body of JSON',function(){

		
		connect.get(options,function(err,body,response){
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
		' with a response code of 201 and an empty body',function(){

		
		connect.patch(options,function(err,body,response){
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

	var rnClient = new client({
		username: env['OSC_ADMIN'],
		password: env['OSC_PASSWORD'],
		interface: env['OSC_SITE'],
		demo_site: true
	});

	var options = {
		client: rnClient,
		url: `incident/${createdID}`
	}
	

	it('should take a url as a param and make a HTTP DELETE Request' + 
		' with a response code of 200 and an empty body',function(){
		connect.delete(options,function(err,body,results){
			console.log(results);
			assert.strictEqual(body,undefined);
			assert.strictEqual(results.statusCode,200);
			done();
		})
	});

});