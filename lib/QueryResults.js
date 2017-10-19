const Connect = require('./Connect.js')
const config = require('./Config.js')


module.exports = { 
	
	query:(options,callback) => {
		options.url = 'queryResults/?query=' + options['query']
		return Connect.get(options,callback)
	}

}