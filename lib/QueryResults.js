const Connect = require('./Connect.js');
const Normalize = require('./Normalize.js');

module.exports = {

	query:(options,callback) => {
		options.url = 'queryResults/?query=' + options['query']
		return new Promise(async (resolve,reject)=>{
			try{
				var response = await Connect.get(options);

				if(options.debug == true){
					return resolve(response);
				}
				
				let finalResponse = Normalize._printMetaCorrectly(options,response);

				return resolve(finalResponse);

			}catch(error){
				
				if(options.debug == true){
					return reject(error);
				}

				let finalError = Normalize._printMetaCorrectly(options,error.response.data);

				return reject(finalError);
				
			}
		})
		
	}, 
	
}