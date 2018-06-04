var assert = require('chai').assert;
var expect = require('chai').expect;
var analyticsReportResults = require('../../lib/AnalyticsReportResults.js');
var client = require('../../lib/Client.js');
var env = process.env;

// GET
describe('analyticsReportResults.run',function(){ 

	const rnClient = new client({
		username: env['OSC_ADMIN'],
		password: env['OSC_PASSWORD'],
		interface: env['OSC_SITE'],
		demo_site: true
	});

	const options = {
		client: rnClient,
		json: {id: 176, limit: 1, filters: { name: "search_ex", values: ['returns']}},
	}
	

	it('should take an options object with filters and a limit and  make a HTTP POST Request',function(done){
		

		analyticsReportResults.run(options).then( data =>{

			assert.strictEqual(data[0].hasOwnProperty('Summary'),true);
			assert.match(data[0]['Summary'],/return/);
			assert.strictEqual(data.length,1);
			done();
		}).catch( err =>{
			console.log("ERROR");
			console.log(err);
		});	

	});

	const badOptions = {
		client: rnClient,
		json: {id: 0}
	}
	

	it('should catch an error if there is an error',function(done){
		
		analyticsReportResults.run(badOptions).then( data =>{

		}).catch( err =>{
			assert.strictEqual(err.status,400);
			done();
		});	

	});

	const debugOptions = {
		client: rnClient,
		json: {id: 176},
		debug: true
	}
	

	it('should return a raw response object if the debug option is set to true',function(done){
		
		analyticsReportResults.run(debugOptions).then( response =>{
			assert.strictEqual(response.hasOwnProperty("data"),true);
			done();
		}).catch( err =>{
			console.log(err)
		});	

	});


	const badDebugOptions = {
		client: rnClient,
		json: {id: 0},
		debug: true
	}
	

	it('should return a raw error object if the debug option is set to true and a bad request is made',function(done){
		
		analyticsReportResults.run(badDebugOptions).then( response =>{

		}).catch( err =>{
			assert.strictEqual(err.hasOwnProperty("response"),true);
			done();
		});	

	});

	const prettyPrintOptions = {
		client: rnClient,
		json: {id: 176},
		prettyPrint: true
	}
	

	it('should return a pretty printed JSON string if the prettyPrint option is set to true',function(done){
		
		analyticsReportResults.run(prettyPrintOptions).then( response =>{
			assert.strictEqual(typeof response,"string");
			done();
		}).catch( err =>{
			console.log(err)
		});	

	});

});
