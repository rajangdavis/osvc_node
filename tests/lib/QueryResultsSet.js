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
		
		QueryResultsSet.query_set(worseOptions).catch( err =>{
			assert.strictEqual(err,"\n\033[31mError: QueryResultsSet must have a 'queries' property defined with a minimum of two queries in the options object.\033[0m \n\n\033[33mExample:\033[0m \n\nconst OSvCNode = require('osvc_node');\nconst env = process.env;\n\nvar rn_client = OSvCNode.Client({\n\tusername: env['OSC_ADMIN'],\n\tpassword: env['OSC_PASSWORD'],\n\tinterface: env['OSC_SITE'],\n});\n\n\033[32mvar multipleQueries = [\n\t{\n\t\tquery:\"DESCRIBE ANSWERS\",\n\t\tkey: \"answerSchema\"\n\t},\n\t{\n\t\tquery:\"SELECT * FROM ANSWERS LIMIT 1\",\n\t\tkey: \"answers\"\n\t},\n\t{\n\t\tquery:\"DESCRIBE SERVICECATEGORIES\",\n\t\tkey: \"categoriesSchema\"\n\t},\n];\033[0m\n\nvar options = {\n\tclient: rn_client,\n\t\033[32mqueries: multipleQueries\033[0m\n}\n\nOSvCNode.QueryResultsSet.query_set(options).then(data=>{\n\tconsole.log(data.answerSchema);\n\tconsole.log(data.answers);\n\tconsole.log(data.categoriesSchema);\n\tconsole.log(data.categories);\n\tconsole.log(data.productsSchema);\n\tconsole.log(data.products);\n})");
			done();
		});	


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

		QueryResultsSet.query_set(oneQueryOptions).catch( err =>{
			assert.strictEqual(err,"\n\033[31mError: QueryResultsSet must have a 'queries' property defined with a minimum of two queries in the options object.\033[0m \n\n\033[33mExample:\033[0m \n\nconst OSvCNode = require('osvc_node');\nconst env = process.env;\n\nvar rn_client = OSvCNode.Client({\n\tusername: env['OSC_ADMIN'],\n\tpassword: env['OSC_PASSWORD'],\n\tinterface: env['OSC_SITE'],\n});\n\n\033[32mvar multipleQueries = [\n\t{\n\t\tquery:\"DESCRIBE ANSWERS\",\n\t\tkey: \"answerSchema\"\n\t},\n\t{\n\t\tquery:\"SELECT * FROM ANSWERS LIMIT 1\",\n\t\tkey: \"answers\"\n\t},\n\t{\n\t\tquery:\"DESCRIBE SERVICECATEGORIES\",\n\t\tkey: \"categoriesSchema\"\n\t},\n];\033[0m\n\nvar options = {\n\tclient: rn_client,\n\t\033[32mqueries: multipleQueries\033[0m\n}\n\nOSvCNode.QueryResultsSet.query_set(options).then(data=>{\n\tconsole.log(data.answerSchema);\n\tconsole.log(data.answers);\n\tconsole.log(data.categoriesSchema);\n\tconsole.log(data.categories);\n\tconsole.log(data.productsSchema);\n\tconsole.log(data.products);\n})");
			done();
		});	

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

});
