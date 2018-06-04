var assert = require('chai').assert;
var expect = require('chai').expect;
var QueryResultsSet = require('../../lib/QueryResultsSet.js');
var client = require('../../lib/Client.js');
var env = process.env;

// GET
describe('queryResultsSet.query_set',function(){ 

	const rnClient = new client({
		username: env['OSC_ADMIN'],
		password: env['OSC_PASSWORD'],
		interface: env['OSC_SITE'],
		demo_site: true
	});

	var multipleQueries = [
		{
			query:"DESCRIBE ANSWERS",
			key: "answerSchema"
		},
	 	{
	 		query:"SELECT * FROM ANSWERS LIMIT 10",
	 		key: "answers"
	 	},
	 	{
	 		query:"DESCRIBE SERVICECATEGORIES",
	 		key: "categoriesSchema"
	 	},
	 	{
	 		query:"SELECT * FROM SERVICECATEGORIES",
	 		key:"categories"
	 	},
	 	{
	 		query:"DESCRIBE SERVICEPRODUCTS",
	 		key: "productsSchema"
	 	},
	 	{
	 		query:"SELECT * FROM SERVICEPRODUCTS",
	 		key:"products"
	 	}
	];

	const options = {
		client: rnClient,
		queries: multipleQueries
	}
	

	it('should take an options object with multiple queries and make a HTTP GET Request',function(done){
		
		QueryResultsSet.query_set(options).then( data =>{
			assert.strictEqual(data.answerSchema[0].hasOwnProperty('Name'),true);
			assert.strictEqual(data.answerSchema[0].hasOwnProperty('Type'),true);
			assert.strictEqual(data.answerSchema[0].hasOwnProperty('Path'),true);
			done();
		}).catch( err =>{
			console.log("ERROR");
			
		});	

	});

	// const badOptions = {
	// 	client: rnClient,
	// 	query: "bad query"
	// }
	

	// it('should catch an error if there is an error',function(done){
		
	// 	QueryResultsSet.query_set(badOptions).catch( err =>{
	// 		assert.strictEqual(err.status,400);
	// 		done();
	// 	});	

	// });

	// const debugOptions = {
	// 	client: rnClient,
	// 	query:"DESCRIBE",
	// 	debug: true
	// }
	

	// it('should return a raw response object if the debug option is set to true',function(done){
		
	// 	QueryResultsSet.query_set(debugOptions).then( response =>{
	// 		assert.strictEqual(response.hasOwnProperty("data"),true);
	// 		done();
	// 	}).catch( err =>{
	// 		console.log(err)
	// 	});	

	// });

	// const badDebugOptions = {
	// 	client: rnClient,
	// 	query:"DESCRIBE incidentss",
	// 	debug: true
	// }
	

	// it('should return a raw error object if the debug option is set to true and a bad request is made',function(done){
		
	// 	QueryResultsSet.query_set(badDebugOptions).catch( err =>{
	// 		assert.isDefined(err);
	// 		assert.strictEqual(err.hasOwnProperty("response"),true);
	// 		done();
	// 	});	

	// });

	// const prettyPrintOptions = {
	// 	client: rnClient,
	// 	query:"DESCRIBE",
	// 	prettyPrint: true
	// }
	

	// it('should return a pretty printed JSON string if the prettyPrint option is set to true',function(done){
		
	// 	QueryResultsSet.query_set(prettyPrintOptions).then( response =>{
	// 		assert.strictEqual(typeof response,"string");
	// 		done();
	// 	}).catch( err =>{
	// 		console.log(err)
	// 	});	

	// });

});
