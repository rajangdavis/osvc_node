const axios = require('axios');
const env = process.env;
const normalize = require('./lib/Normalize');

let queries = [];

for (var i = 0; i < 26; i++) {
	let query = "SELECT * FROM INCIDENTS LIMIT 20000";
	if(i > 0){
		query += ` OFFSET ${20000 * i}`
	}
	queries.push(query);
}

let parallelQueries = queries.map(q => {
	return axios({ method: 'get',
		url: `https://${ env['OSC_SITE'] }.rightnowdemo.com/services/rest/connect/v1.3/queryResults/?query=${q}`,
		headers: { Authorization: `Basic ${ env['OSC_BASE_64'] }` }
	});
})


axios.all(parallelQueries)
.then(function (results) {
	
	let finalResult = {
		incidents: []
	};
	
	results.map((resultArray,i) => {
		normalize._printMetaCorrectly({},resultArray.data).map(result=>{
			finalResult.incidents.push(result);
		})
	});

	console.log(finalResult.incidents);
}).catch(err => {
	console.log(err);

	console.log(err.response.data);
});