const OSvCNode = require('./lib/OSvCNode.js');
const env = process.env;

var rn_client = OSvCNode.Client({
	username: env['OSC_ADMIN'],
	password: env['OSC_PASSWORD'],
	interface: env['OSC_SITE'],
	demo_site:true,
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
];

var options = {
	client: rn_client,
	queries: multipleQueries,
	parallel: true
}

OSvCNode.QueryResultsSet.query_set(options).then(data=>{ 
	console.log(data.answerSchema);
	// console.log(data.answers.map((a)=>{return [a.id,a.summary]}).join("\n"));
}).catch(err => {
	console.log(err);
});