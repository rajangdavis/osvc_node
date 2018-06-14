const Connect = require('./Connect.js');
const Normalize = require('./Normalize.js');

module.exports = {

	query:(options) => {
		options.url = 'queryResults/?query=' + options['query']
		return new Promise(async (resolve,reject)=>{
			try{
				_validateQuery(options);
				var response = await Connect.get(options);

				if(options.debug == true){
					return resolve(response);
				}
				
				let finalResponse = Normalize._printMetaCorrectly(options,response);

				return resolve(finalResponse);

			}catch(error){
				
				if(options.debug == true || error.response === undefined){
					return reject(error);
				}

				let finalError = Normalize._printMetaCorrectly(options,error.response.data);

				return reject(finalError);

			}

		})
		
	}, 
	
}

const _validateQuery = options => {
	if(options.query == undefined){
		let example = "\n\nconst OSvCNode = require('osvc_node');\nconst env = process.env;\n\nconst rn_client = OSvCNode.Client({\n\tusername: env['OSC_ADMIN'],\n\tpassword: env['OSC_PASSWORD'],\n\tinterface: env['OSC_SITE'],\n});\n\nvar options = {\n\tclient: rn_client,\n\t\033[32mquery: \"DESCRIBE CONTACTS\"\033[0m\n}\n\nOSvCNode.QueryResults.query(options).then(data =>{\n\tconsole.log(data)\n}).catch(err => {\n\tconsole.log(err);\n});";
		return Validations.customError("QueryResults must have a query set within the options.",example); 
	}
}