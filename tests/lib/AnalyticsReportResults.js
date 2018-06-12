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

	const worseOptions = {
		client: rnClient,
	}
	

	it('should display an error if the ID is not set',function(done){
		
		analyticsReportResults.run(worseOptions).then( data =>{
			done();
		}).catch( err =>{
			assert.strictEqual(err,"\033[31mError: AnalyticsReportResults must have an 'id' set within the json data.\033[0m \n\nExample: \n\nconst OSvCNode = require('osvc_node');\nconst env = process.env;\n\nconst rn_client = OSvCNode.Client({\n\tusername: env['OSC_ADMIN'],\n\tpassword: env['OSC_PASSWORD'],\n\tinterface: env['OSC_SITE'],\n});\n\nvar options\n\tclient: rn_client,\n\tjson: {id: 176},\n}\n\nOSvCNode.AnalyticsReportResults.run(options).then((results) => {\n\tresults.map((result)=>{\n\t\tconsole.log(`Columns: ${Object.keys(result).join(\", \")}`);\n\t\tconsole.log(`Values: ${Object.values(result).join(\", \")}`);\n\t})n}).catch((error)=>{\n\tconsole.log(error);\n})");
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
	

	it('should return a raw error object if the debug option is set to true and a bad request is made; the promise is rejected',function(done){
		
		analyticsReportResults.run(badDebugOptions).catch( err =>{
			assert.isDefined(err);
			assert.strictEqual(err.hasOwnProperty("response"),true);
			done();
		});	

	});

});
