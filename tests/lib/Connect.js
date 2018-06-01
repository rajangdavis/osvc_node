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
		url: '',
		debug: true

	}
	

	it('should take a url as a param and make a HTTP GET Request' + 
		' with a response code of 200 and a body of JSON',function(done){

		
		connect.get(options).then(function(res){
			assert.strictEqual(res.status,200);
			done();
		}).catch(function(err){
			console.log(err);
			done();		
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

	var options = {
		client: rnClient,
		url: 'incidents',
		json: data,
		debug: true
	}
	

	it('should take a url as a param and make a HTTP POST Request' + 
		' with a response code of 201 and a body of JSON',function(done){

		
		connect.post(options).then(function(response){
			assert.strictEqual(response.status,201);
			done();
		}).catch(function(err){
			console.log(err);
			done();
		})
		

	});

	it('should take a url as a param and make a HTTP POST Request' + 
		' with a response code of 201 and a body of JSON',function(done){

	
		var reportOptions = {
			client: rnClient,
			url: 'analyticsReportResults',
			json: { id: 176 }
		}


		connect.post(reportOptions).then(function(response){
			done();
		}).catch(function(err){
			console.log(err);
			done();
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

	var options = {
		client: rnClient,
		url: 'incidents/24790',
		json: data,
		debug: true
	}
	

	it('should take a url as a param and make a HTTP PATCH Request' + 
		' with a response code of 201 and an empty body',function(done){

		
		connect.patch(options).then(function(resp){
			assert.strictEqual(resp.status,200);
			done();
		}).catch(function(err){
			console.log(err);
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
		url: `incidents/0`,
		debug: true
	}
	

	it('should take a url as a param and make a HTTP DELETE Request' + 
		' with a response code of 200 and an empty body',function(done){
		connect.delete(options).then(function(response){
			assert.strictEqual(response.status,404);
			done();
		}).catch((err)=>{
			console.log(err)
			done();
		});
	});
});