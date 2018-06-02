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
		json: {id: 176}
	}
	

	it('should take a url as a param and make a HTTP GET Request',function(done){
		
		analyticsReportResults.run(options).then( data =>{
			assert.strictEqual(data[0].hasOwnProperty('Summary'),true);
			done();
		}).catch( err =>{
			console.log("ERROR");
			done();
		});	

	});

	const badOptions = {
		client: rnClient,
		json: {id: 0}
	}
	

	it('should catch an error if there is an error',function(done){
		
		analyticsReportResults.run(badOptions).then( data =>{

		}).catch( err =>{
			assert.strictEqual(err.response.status,400);
			done();
		});	

	});

});
