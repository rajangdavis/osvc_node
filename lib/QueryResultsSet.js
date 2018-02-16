const QueryResults = require('./QueryResults.js')

module.exports = {
	query_set:(options,callback) => {
		let keyAndQueryMaps = _parseQueries(options);
		let keys = keyAndQueryMaps[0];
		options.query = keyAndQueryMaps[1].join("; ");
		QueryResults.query(options,(err,results) =>{
			if(err){
				return callback(err,results);
			}else if(results.status){
				return callback(err,results);			
			}else{
				return callback(err,_matchResultsToKeys(keys,results));
			}
		});
	}
}

const _parseQueries = (options) => {
	let queryArr = [];
	let keyMap = [];
	options.queries.map((queryHash)=>{
		keyMap.push(queryHash["key"]);
		queryArr.push(queryHash["query"]);
	});

	return [keyMap,queryArr];
}

const _matchResultsToKeys = (keys,results) => {
	let resultsObject = {};
	keys.map((key,index)=>{
		resultsObject[key] = results[index];
	})
	return resultsObject;
}