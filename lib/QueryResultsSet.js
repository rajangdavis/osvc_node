const Connect = require('./Connect.js')
const Normalize = require('./Normalize.js')

module.exports = {
	query_set:(options,callback) => {
		let keyAndQueryMaps = _parseQueries(options);
		let keys = keyAndQueryMaps[0];
		options.url = 'queryResults/?query=' + keyAndQueryMaps[1].join(";");
		return new Promise(async (resolve,reject)=>{
			try{
				var response = await Connect.get(options);

				if(options.debug == true){
					return resolve(response);
				}
				
				let hash = {};

				let finalResponse = Normalize._printMetaCorrectly(options,response).map((arr, i) => {
					hash[keys[i]] = arr;
				});

				return resolve(hash);

			}catch(error){
				
				if(options.debug == true){
					return reject(error);
				}

				let finalError = Normalize._printMetaCorrectly(options,error.response.data);

				return reject(finalError);

			}

		})
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