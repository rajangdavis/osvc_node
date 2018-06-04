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

	getOptions = {
		client: rnClient,
		url: '',
		debug: true

	}
	

	it('should take a url as a param and make a HTTP GET Request' + 
		' with a response code of 200 and a body of JSON',function(done){

		
		connect.get(getOptions).then(function(res){
			assert.strictEqual(res.status,200);
			done();
		}).catch(function(err){
			console.log(err);
			
		})
		

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

	var postOptions = {
		client: rnClient,
		url: 'incidents',
		json: data,
		debug: true
	}
	

	it('should take a url and debug parameters and make a HTTP POST Request' + 
		' with a response code of 201 and a body of JSON object',function(done){

		
		connect.post(postOptions).then(function(response){
			assert.strictEqual(response.status, 201);
			assert.strictEqual(typeof response.data,'object');
			done();
		}).catch(function(err){
			console.log(err);
			
		})
		

	});

	var optionsNoDebug = {
		client: rnClient,
		url: 'incidents',
		json: data,
	}

	it('should take a url as a param and make a HTTP POST Request' + 
		' and return a JSON object',function(done){
		
		connect.post(optionsNoDebug).then(function(response){
			assert.strictEqual(typeof response,'object');
			done();
		}).catch(function(err){
			console.log(err);
			
		})
		

	});

	it('should take a url as a param and make a HTTP POST Request' + 
		' and be able to prettyPrint the JSON if specified',function(done){

	
		var reportOptions = {
			client: rnClient,
			url: 'analyticsReportResults',
			json: { id: 176 },
			prettyPrint: true
		}


		connect.post(reportOptions).then(function(response){
			assert.strictEqual(response.data,undefined);
			done();
		}).catch(function(err){
			console.log(err);
			
		})
		

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

	var patchOptions = {
		client: rnClient,
		url: 'incidents/24790',
		json: data,
		debug: true
	}
	

	it('should take a url as a param and make a HTTP PATCH Request' + 
		' with a response code of 201 and an empty body',function(done){

		
		connect.patch(patchOptions).then(function(resp){
			assert.strictEqual(resp.status,200);
			done();
		}).catch(function(err){
			console.log(err);
			
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

	var deleteOptions = {
		client: rnClient,
		url: `incidents/0`,
		debug: true
	}
	

	it('should take a url as a param and make a HTTP DELETE Request' + 
		' with a response code of 404 because the incident with ID of 0 does not exist',function(done){
		connect.delete(deleteOptions).then(function(response){
			// assert.strictEqual(response.status,404);
			done();
		}).catch((err)=>{
			assert.strictEqual(err.response.status,404);
			done();
		});
	});
});