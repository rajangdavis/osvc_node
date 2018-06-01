const Connect = require('./Connect.js');
const Normalize = require('./Normalize.js');

module.exports = {

	run:(options) => {
		options.url = 'analyticsReportResults';
		options.debug = true;
		return new Promise((resolve,reject)=>{
			Connect.post(options).then(response => {
				return resolve(Normalize._resultsToArray(response));
			}).catch(error => {
				return reject(error);
			});
		})
	}, 
}