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
	 	// {
	 	// 	query:"DESCRIBE SERVICECATEGORIES",
	 	// 	key: "categoriesSchema"
	 	// },
	 	// {
	 	// 	query:"SELECT * FROM SERVICECATEGORIES LIMIT 10",
	 	// 	key:"categories"
	 	// },
	 	// {
	 	// 	query:"DESCRIBE SERVICEPRODUCTS",
	 	// 	key: "productsSchema"
	 	// },
	 	// {
	 	// 	query:"SELECT * FROM SERVICEPRODUCTS LIMIT 10",
	 	// 	key:"products"
	 	// }
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

	var badQueries = [
		{
			query:"DESCRIBE ANSWERS",
			key: "answerSchema"
		},
	 	{
	 		query:"SELECT * FROM ANSWERSS LIMIT 10",
	 		key: "answers"
	 	},
	];

	const badOptions = {
		client: rnClient,
		queries: badQueries
	}
	

	it('should catch an error if there is an error',function(done){
		
		QueryResultsSet.query_set(badOptions).catch( err =>{
			assert.strictEqual(err.status,400);
			done();
		});	

	});

	const worseOptions = {
		client: rnClient,
	}

	it('should return an error if the queries are not defined or if there is only one',function(done){
		
		QueryResultsSet.query_set(worseOptions).catch(err => {
			assert.notEqual(err,undefined);
			done();
		})

	});
	
	const oneQueryOptions = {
		client: rnClient,
		queries: [
			{
				query:"SELECT * FROM ANSWERSS LIMIT 10",
	 			key: "answers"
	 		}
		]
	}
	
	it('should return an error if there is only one query',function(done){
		QueryResultsSet.query_set(oneQueryOptions).catch(err => {
			assert.notEqual(err,undefined);
			done();
		})
	});

	const debugOptions = {
		client: rnClient,
		queries: multipleQueries,
		debug: true
	}
	

	it('should return a raw response object if the debug option is set to true',function(done){
		
		QueryResultsSet.query_set(debugOptions).then( response =>{
			assert.strictEqual(response.hasOwnProperty("data"),true);
			done();
		}).catch( err =>{
			console.log(err)
		});	

	});

	const badDebugOptions = {
		client: rnClient,
		queries: badQueries,
		debug: true
	}
	

	it('should return a raw error object if the debug option is set to true and a bad request is made',function(done){
		
		QueryResultsSet.query_set(badDebugOptions).catch( err =>{
			assert.isDefined(err);
			assert.strictEqual(err.hasOwnProperty("response"),true);
			done();
		});	

	});


	const parallelOptions = {
		client: rnClient,
		queries: multipleQueries,
		parallel: true
	}

	it('should make queries in parallel if a parallel option is selected',function(done){
		
		QueryResultsSet.query_set(parallelOptions).then( results =>{
			assert.isDefined(results.answerSchema);
			assert.isDefined(results.answers);
			assert.isDefined(results.answerSchema);
			assert.strictEqual(results.answerSchema[0]["Name"],"id");
			assert.strictEqual(results.answerSchema[0]["Type"],"Integer");
			assert.strictEqual(results.answerSchema[0]["Path"],"");
			done();
		});	

	});

});
