const request = require('request');

module.exports = { 
	
	get:(clientObj,resourceUrl,callback) => {
		return _get(_clientUrl(clientObj,resourceUrl),callback)
	},

	post:(clientObj,resourceUrl,requestData,callback) => {
		let headers = _headersHash(clientObj);
		return _post(_clientUrl(clientObj,resourceUrl),requestData,headers,callback)
	},

	patch:(clientObj,resourceUrl,requestData,callback) => {
		let headers = _headersHash(clientObj,true);
		return _post(_clientUrl(clientObj,resourceUrl),requestData,headers,callback)
	},

	delete:(clientObj,resourceUrl,callback) => {
		let headers = _headersHash(clientObj,true);
		return _delete(_clientUrl(clientObj,resourceUrl),headers,callback)
	},

	clientUrl:(clientObj,resourceUrl) => {return _clientUrl(clientObj,resourceUrl)}
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
	let urlHash = 'https://';

	urlHash += obj.username + ':' + obj.password +"@";

	let host = obj.interface +".";
	let path = '/services/rest/connect/'


	if(obj['demo_site'] === true){
		host += "rightnowdemo.com";
	}else{
		host += "custhelp.com";
	}

	urlHash += host;

	if(obj['version'] != undefined){
		path += (obj['version'] + "/");
	}else{
		path += "v1.3/";
	}

	urlHash += path;

	if(resourceUrl != undefined)
		urlHash += resourceUrl;

	return urlHash;
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