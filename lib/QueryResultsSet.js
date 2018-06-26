const Connect = require('./Connect.js')
const Normalize = require('./Normalize.js')
const Validations = require('./Validations.js')
const config = require('./Config');
const axios = require("axios");

module.exports = {
	query_set:(options) => {
		return new Promise(async (resolve,reject)=>{
			try{
				
				if(options.parallel && options.parallel === true){
					return resolve(_parallelQuery(options));
				}

				let keyAndQueryMaps = _parseQueries(options);
				let keys = keyAndQueryMaps[0];
				options.url = 'queryResults/?query=' + keyAndQueryMaps[1].join(";");

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
				
				if(options.debug == true || error.response === undefined){
					return reject(error);
				}

				let finalError = Normalize._printMetaCorrectly(options,error.response.data);

				return reject(finalError);

			}

		})
	}
}

const _parseQueries = (options) => {
	let validatedOptions = _validateQueries(options);
	let queryArr = [];
	let keyMap = [];
	validatedOptions.queries.map((queryHash)=>{
		keyMap.push(queryHash["key"]);
		queryArr.push(queryHash["query"]);
	});

	return [keyMap,queryArr];
}

const _validateQueries = options => {
	if(options.queries == undefined || (options.queries != undefined && options.queries.length <= 1)){
		let example = "\n\nconst {Client, QueryResultsSet} = require('osvc_node');\nconst env = process.env;\n\nvar rn_client = Client({\n\tusername: env['OSC_ADMIN'],\n\tpassword: env['OSC_PASSWORD'],\n\tinterface: env['OSC_SITE'],\n});\n\n\033[32mvar multipleQueries = [\n\t{\n\t\tquery:\"DESCRIBE ANSWERS\",\n\t\tkey: \"answerSchema\"\n\t},\n\t{\n\t\tquery:\"SELECT * FROM ANSWERS LIMIT 1\",\n\t\tkey: \"answers\"\n\t},\n\t{\n\t\tquery:\"DESCRIBE SERVICECATEGORIES\",\n\t\tkey: \"categoriesSchema\"\n\t},\n];\033[0m\n\nvar options = {\n\tclient: rn_client,\n\t\033[32mqueries: multipleQueries\033[0m\n}\n\nQueryResultsSet.query_set(options).then(data=>{\n\tconsole.log(data.answerSchema);\n\tconsole.log(data.answers);\n\tconsole.log(data.categoriesSchema);\n\tconsole.log(data.categories);\n\tconsole.log(data.productsSchema);\n\tconsole.log(data.products);\n})";
		return Validations.customError("QueryResultsSet must have a 'queries' property defined with a minimum of two queries in the options object",example);
	}
	return options;
}

const _parallelQuery = (options) =>{
	return new Promise( async (resolve,reject) =>{
		try{
			const keyAndQueryMaps = _parseQueries(options);
			
			const keys = keyAndQueryMaps[0];

			let parallelQueries = keyAndQueryMaps[1].map(query => {
				options.url = 'queryResults/?query=' + query;
				let axiosConfig = config.optionsFinalize("get",options);
				return axios(axiosConfig);
			});

			let results = await axios.all(parallelQueries);

			let finalResults = {};
			
			for(var i = 0; i < results.length; i ++){
				let returnedResults = options.debug === true ? results[i] : Normalize._printMetaCorrectly(options,results[i].data);
				finalResults[keys[i]] = returnedResults;
			} 

			return resolve(finalResults);

		}catch(err){
			return reject(err);
		}				
	})
}