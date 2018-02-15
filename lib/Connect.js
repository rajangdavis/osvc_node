const request = require('request');
const config = require('./Config.js')

module.exports = { 
	
	get:(options,callback) => {
		return _get(config.clientUrl(options['client'],options['url']),callback)
	},

	post:(options,callback) => {
		let headers = config.headersHash(options.client);
		let requestData = options["json"] ? options["json"] : {"id": options["id"]};
		return _post(config.clientUrl(options['client'],options['url']),requestData,headers,callback);
	},

	patch:(options,callback) => {
		let headers = config.headersHash(options.client,true);
		let requestData = options["json"];
		return _post(config.clientUrl(options['client'],options['url']),requestData,headers,callback);
	},

	delete:(options,callback) => {
		let headers = config.headersHash(options.client,true);
		return _delete(config.clientUrl(options['client'],options['url']),headers,callback);
	},

	clientUrl:(options) => {return config.clientUrl(options['client'],options['url'])}
}


const _post = (clientUrl,requestData,headers,callback) => {
	request.post({url:clientUrl,json:requestData,headers:headers},function(error, response, body){
		return callback(error,body,response);
	});	
}

const _delete = (clientUrl,headers,callback) => {
	request.delete({url:clientUrl,json:true,headers:headers},function(error, response, body){
		return callback(error,body,response);
	});
	
}

const _get = (clientUrl,callback) => {
	request.get({url:clientUrl,json:true},function(error, response, body){
		return callback(error,body,response);
	});	
}