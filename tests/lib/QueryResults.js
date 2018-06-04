var assert = require('chai').assert;
var expect = require('chai').expect;
var QueryResults = require('../../lib/QueryResults.js');
var client = require('../../lib/Client.js');
var env = process.env;

// GET
describe('queryResults.query',function(){ 

	const rnClient = new client({
		username: env['OSC_ADMIN'],
		password: env['OSC_PASSWORD'],
		interface: env['OSC_SITE'],
		demo_site: true
	});

	const options = {
		client: rnClient,
		query: "DESCRIBE"
	}
	

	it('should take an options object with a query and make a HTTP GET Request',function(done){
		
		QueryResults.query(options).then( data =>{
			assert.strictEqual(data[0].hasOwnProperty('Name'),true);
			assert.strictEqual(data[0].hasOwnProperty('Type'),true);
			assert.strictEqual(data[0].hasOwnProperty('Path'),true);
			done();
		}).catch( err =>{
			console.log("ERROR");
			
		});	

	});

	const badOptions = {
		client: rnClient,
		query: "bad query"
	}
	

	it('should catch an error if there is an error',function(done){
		
		QueryResults.query(badOptions).then( data =>{

		}).catch( err =>{
			assert.strictEqual(err.status,400);
			done();
		});	

	});

	const debugOptions = {
		client: rnClient,
		query:"DESCRIBE",
		debug: true
	}
	

	it('should return a raw response object if the debug option is set to true',function(done){
		
		QueryResults.query(debugOptions).then( response =>{
			assert.strictEqual(response.hasOwnProperty("data"),true);
			done();
		}).catch( err =>{
			console.log(err)
		});	

	});

	const badDebugOptions = {
		client: rnClient,
		query:"DESCRIBE incidentss",
		debug: true
	}
	

	it('should return a raw error object if the debug option is set to true and a bad request is made',function(done){
		
		QueryResults.query(badDebugOptions).catch( err =>{
			assert.strictEqual(err.hasOwnProperty("response"),true);
			done();
		});	

	});

	const prettyPrintOptions = {
		client: rnClient,
		query:"DESCRIBE",
		prettyPrint: true
	}
	

	it('should return a pretty printed JSON string if the prettyPrint option is set to true',function(done){
		
		QueryResults.query(prettyPrintOptions).then( response =>{
			assert.strictEqual(typeof response,"string");
			done();
		}).catch( err =>{
			console.log(err)
		});	

	});

});
