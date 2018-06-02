const Connect = require('./Connect.js');
const Normalize = require('./Normalize.js');

module.exports = {

	query:(options,callback) => {
		options.url = 'queryResults/?query=' + options['query']
		Connect.get(options,(err,response,body) => {
			return callback(err, Normalize._resultsToArray(body));
		});
	}, 
	
}