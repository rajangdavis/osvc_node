const axios = require('axios');
const env = process.env

let queries = [
	{query: "DESCRIBE ANSWERS", key: "answersDesc"},
	{query: "SELECT * FROM ANSWERS LIMIT 10", key: "firstTenAnswers"},
	{query: "SELECT * FROM SERVICEPRODUCTS LIMIT 10", key: "firstTenProducts"},
	{query: "SELECT * FROM SERVICECATEGORIES LIMIT 10", key: "firstTenCategories"},
	{query: "SELECT * FROM SERVICECATEGORIES LIMIT 10 OFFSET 10", key: "secondTenCategories"},
	{query: "SELECT * FROM SERVICECATEGORIES LIMIT 10 OFFSET 20", key: "thirdTenCategories"},
	{query: "SELECT * FROM SERVICECATEGORIES LIMIT 10 OFFSET 30", key: "fourthTenCategories"},
]

let parallelQueries = queries.map(q => {
	return axios({ method: 'get',
		url: `https://opn-eventus4.rightnowdemo.com/services/rest/connect/v1.3/queryResults/?query=${q.query}`,
		headers: { Authorization: `Basic ${ env['OSC_BASE_64'] }` }
	});
})

axios.all(parallelQueries)
	.then(function (results) {
		
		let finalResult = {};
		
		results.map((result,i) => {
			finalResult[queries[i].key] = _resultsToArray(result.data);
		});

		console.log(finalResult);
	}).catch(err => {
		console.log(err.response.data);
	});