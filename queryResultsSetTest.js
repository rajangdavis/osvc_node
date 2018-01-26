const OSCNode = require('./lib/OSCNode.js');
const env = process.env;

var rn_client = OSCNode.Client({
	username: env['OSC_ADMIN'],
	password: env['OSC_PASSWORD'],
	interface: env['OSC_SITE'],
	demo_site:true
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

var options = {
	client: rn_client,
	queries: multipleQueries
}

OSCNode.QueryResultsSet.query_set(options,(err,data) =>{
	if(err){
		// handle error
	}else if(data.status){
		// HTTP error
		console.log(data);
	}else{
		// HTTP OK
		console.log("ANSWER SCHEMA:");
		console.log(data.answerSchema);
		console.log(data.answers.map((a)=>{return [a.id,a.summary]}).join("\n"));
		console.log(data.categoriesSchema);
		console.log(data.categories);
		console.log(data.productsSchema);
		console.log(data.products);
	}
});