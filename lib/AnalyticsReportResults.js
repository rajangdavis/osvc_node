const Connect = require('./Connect.js');
const Normalize = require('./Normalize.js');

module.exports = {

	run:(options,callback) => {
		options.url = 'analyticsReportResults/' + options['id']
		Connect.post(options,(err,response,body) => {
			return callback(err,Normalize._resultsToArray(body));
		});
	}, 
}