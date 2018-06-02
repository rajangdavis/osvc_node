const Connect = require('./Connect.js');
const Normalize = require('./Normalize.js');

module.exports = {

	query:(options,callback) => {
		options.url = 'queryResults/?query=' + options['query']
		options.debug = true;
		return new Promise((resolve,reject)=>{
			Connect.get(options).then(response => {
				return resolve(Normalize._resultsToArray(response));
			}).catch(error => {
				return reject(error);
			});
		})
	}, 
	
}