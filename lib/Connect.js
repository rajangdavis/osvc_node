const request = require('request');

module.exports = { 
	
	get:(options,callback) => {
		return _get(_clientUrl(options['client'],options['url']),callback)
	},

	post:(options,requestData,callback) => {
		let headers = _headersHash(clientObj);
		return _post(_clientUrl(options['client'],options['url']),requestData,headers,callback)
	},

	patch:(options,requestData,callback) => {
		let headers = _headersHash(clientObj,true);
		return _post(_clientUrl(options['client'],options['url']),requestData,headers,callback)
	},

	delete:(options,callback) => {
		let headers = _headersHash(clientObj,true);
		return _delete(_clientUrl(options['client'],options['url']),headers,callback)
	},

	clientUrl:(options) => {return _clientUrl(options['client'],options['url'])}
}


const _post = (clientUrl,requestData,headers,callback) => {
	request.post({url:clientUrl,json:requestData,headers:headers},function(error, response, body){
		if(error){
			return callback(error,body,response);		
		}else{
			return callback(null,body,response);
		}
	});	
}

const _delete = (clientUrl,headers,callback) => {
	request.delete({url:clientUrl,json:true,headers:headers},function(error, response, body){
		if(error){
			return callback(error,body,response);		
		}else{
			return callback(null,body,response);
		}
	});
	
}

const _get = (clientUrl,callback) => {
	request.get({url:clientUrl,json:true},function(error, response, body){
		if(error){
			return callback(error,body,response);		
		}else{
			return callback(null,body,response);
		}
	});
	
}

const _clientUrl = function(obj, resourceUrl = undefined){
	let urlString = 'https://';

	urlString += obj.username + ':' + obj.password +"@";

	let host = obj.interface +".";
	let path = '/services/rest/connect/'


	if(obj['demo_site'] === true){
		host += "rightnowdemo.com";
	}else{
		host += "custhelp.com";
	}

	urlString += host;

	if(obj['version'] != undefined){
		path += (obj['version'] + "/");
	}else{
		path += "v1.3/";
	}

	urlString += path;

	if(resourceUrl != undefined)
		urlString += resourceUrl;

	return urlString;
}

const _headersHash = function(obj, patchRequest = false){
	
	let headersHash = {};

	if (patchRequest === true){
		headersHash['X-HTTP-Method-Override'] = 'PATCH';
	}else if(obj.suppress_rules === true){
		headersHash['OSvC-CREST-Suppress-All'] = true;
	}
	return headersHash;
}