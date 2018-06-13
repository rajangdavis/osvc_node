const Connect = require('./Connect.js')
const Normalize = require('./Normalize.js')

module.exports = {
	query_set:(options,callback) => {
		return new Promise(async (resolve,reject)=>{
			try{
				
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
	_validateQueries(options);
	let queryArr = [];
	let keyMap = [];
	options.queries.map((queryHash)=>{
		keyMap.push(queryHash["key"]);
		queryArr.push(queryHash["query"]);
	});

	return [keyMap,queryArr];
}

const _validateQueries = options => {
	if(options.queries == undefined || (options.queries != undefined && options.queries.length <= 1)){
		throw "\n\033[31mError: QueryResultsSet must have a 'queries' property defined with a minimum of two queries in the options object.\033[0m \n\n\033[33mExample:\033[0m \n\nconst OSvCNode = require('osvc_node');\nconst env = process.env;\n\nvar rn_client = OSvCNode.Client({\n\tusername: env['OSC_ADMIN'],\n\tpassword: env['OSC_PASSWORD'],\n\tinterface: env['OSC_SITE'],\n});\n\n\033[32mvar multipleQueries = [\n\t{\n\t\tquery:\"DESCRIBE ANSWERS\",\n\t\tkey: \"answerSchema\"\n\t},\n\t{\n\t\tquery:\"SELECT * FROM ANSWERS LIMIT 1\",\n\t\tkey: \"answers\"\n\t},\n\t{\n\t\tquery:\"DESCRIBE SERVICECATEGORIES\",\n\t\tkey: \"categoriesSchema\"\n\t},\n];\033[0m\n\nvar options = {\n\tclient: rn_client,\n\t\033[32mqueries: multipleQueries\033[0m\n}\n\nOSvCNode.QueryResultsSet.query_set(options).then(data=>{\n\tconsole.log(data.answerSchema);\n\tconsole.log(data.answers);\n\tconsole.log(data.categoriesSchema);\n\tconsole.log(data.categories);\n\tconsole.log(data.productsSchema);\n\tconsole.log(data.products);\n})";
	}
}