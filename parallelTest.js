const axios = require('axios');
const env = process.env

let queries = [
	{query: "DESCRIBE ANSWERS", key: "answersDesc"},
	{query: "SELECT * FROM ANSWERS LIMIT 10", key: "firstTenAnswers"},
	{query: "SELECT * FROM SERVICEPRODUCTS LIMIT 10", key: "firstTenProducts"},
	{query: "SELECT * FROM SERVICECATEGORIES LIMIT 10", key: "categories"},
	{query: "SELECT * FROM SERVICECATEGORIES LIMIT 10 OFFSET 10", key: "categories"},
	{query: "SELECT * FROM SERVICECATEGORIES LIMIT 10 OFFSET 20", key: "categories"},
	{query: "SELECT * FROM SERVICECATEGORIES LIMIT 10 OFFSET 30", key: "categories"},
]

let parallelQueries = queries.map(q => {
	return axios({ method: 'get',
		url: `https://${ env['OSC_SITE'] }.rightnowdemo.com/services/rest/connect/v1.3/queryResults/?query=${q.query}`,
		headers: { Authorization: `Basic ${ env['OSC_BASE_64'] }` }
	});
})

axios.all(parallelQueries)
	.then(function (results) {
		
		let finalResult = {};
		
		results.map((result,i) => {
			if(finalResult[queries[i].key] == undefined){
				finalResult[queries[i].key] = result.data;
			} else {
				if(finalResult[queries[i].key].length == undefined){
					let objCopy = JSON.parse(JSON.stringify(finalResult[queries[i].key]));
					finalResult[queries[i].key] = [];
				}
				finalResult[queries[i].key].push(result.data);
			}
		});

		console.log(finalResult.categories);
	}).catch(err => {

		console.log(err.response.data);
	});