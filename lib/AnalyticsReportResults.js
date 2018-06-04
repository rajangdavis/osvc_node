const Connect = require('./Connect.js');
const Normalize = require('./Normalize.js');

module.exports = {

	run:(options) => {
		options.url = 'analyticsReportResults';
		return new Promise(async (resolve,reject)=>{
			try{

				var response = await Connect.post(options);

				if(options.debug == true){
					return resolve(response);
				}else{
					if(options.prettyPrint == true){
						let finalResponse = Normalize._resultsToArray(JSON.parse(response))
						return resolve(JSON.stringify(finalResponse,null,4));
					}else{
						return resolve(Normalize._resultsToArray(response));
					}
				}
			}catch(error){
				if(options.debug == true){
					return reject(error);
				}else{
					if(options.prettyPrint == true){
						return reject(JSON.stringify(error.response.data,null,4));
					}else{
						return reject(error.response.data);
					}
				}
			}
		})
	}
}