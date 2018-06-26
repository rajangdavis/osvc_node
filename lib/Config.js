const Validations = require('./Validations');

module.exports ={
	
	optionsFinalize : (verb,obj,patchRequest = false) => {
		if(obj.url == undefined){
			obj.url = '';
		}
		_checkAnnotation(obj);
		return _optionsObject(verb, obj, patchRequest);
	},
}

const _optionsObject = (verb, obj, patchRequest) =>{
	let optionsHash = {
		method:verb,
		url: _clientUrl(obj.client, obj.url),
		headers: _headersHash(obj, patchRequest),
		data: obj.json
	};
	return _noSSLCheck(obj, optionsHash);
}

const _noSSLCheck = function(object,optionsHash){
	if(object.client.no_ssl_verify === true){
		const https = require("https");
		optionsHash.httpsAgent = new https.Agent({  
		  rejectUnauthorized: false
		});
	}
	return optionsHash;
}

const _clientUrl = (obj, resourceUrl = undefined) => {

	let urlString = 'https://';

	let host = obj.interface +".";
	let path = '/services/rest/connect/'


	if(obj['demo_site'] === true){
		host += "rightnowdemo.com";
	}else{
		host += "custhelp.com";
	}

	urlString += host;
	path += (obj['version'] + "/");
	urlString += path;

	if(resourceUrl != undefined)
		urlString += resourceUrl;

	return urlString;
}

const _optionalHeaders = (obj, headersHash) =>{

	if(obj.exclude_null === true){
		headersHash['prefer'] = 'exclude-null-properties';
	}

	if(obj.next_request != undefined && obj.next_request > 0 && typeof obj.next_request == "number"){
		headersHash['osvc-crest-next-request-after'] = obj.next_request;
	}

	if(obj.schema === true){
		headersHash['Accept'] = 'application/schema+json';
	}

	if(obj.utc_time === true){
		headersHash['OSvC-CREST-Time-UTC'] = 'yes';
	}

	if(obj.annotation != undefined){
		_checkAnnotation(obj);
		headersHash['OSvC-CREST-Application-Context'] = obj.annotation;
	}

	return headersHash;
}

const _headersHash = (obj, patchRequest = false) => {

	let client = obj.client;
	let headersHash	= _setConfigAuth(client);

	if(client.suppress_rules === true){
		headersHash['OSvC-CREST-Suppress-All'] = true;
	}

	if (client.access_token != undefined){
		headersHash['osvc-crest-api-access-token'] = client.access_token;
	}

	if (patchRequest === true){
		headersHash['X-HTTP-Method-Override'] = 'PATCH';
	}
	
	return _optionalHeaders(obj, headersHash);
}

const _setConfigAuth = (obj) => {
	
	let headersHash = {};

	if(obj.username != undefined && obj.password != undefined ){
		let encryptedCred = Buffer.from(obj.username + ":" + obj.password).toString("base64");
		headersHash['Authorization'] = `Basic ${encryptedCred}`
	}
	if(obj.session != undefined){
		headersHash['Authorization'] = `Session ${obj.session}`
	}

	if(obj.oauth != undefined){
		headersHash['Authorization'] = `Bearer ${obj.oauth}`
	}

	return headersHash;
}

const _checkAnnotation = obj =>{
	if((obj.client.version == "v1.4" || obj.client.version == "latest") && obj.annotation == undefined){
		let example = "\n\nconst Client = require('osvc_node');\nconst env = process.env;\n\nconst rn_client = Client({\n\tusername: env['OSC_ADMIN'],\n\tpassword: env['OSC_PASSWORD'],\n\tinterface: env['OSC_SITE'],\n\tversion: 'latest',\n});\n\nvar options = {\n\tclient: rn_client,\n\t\033[32mannotation: 'Annotation to describe this HTTP request'\033[0m\n}\n";
		return Validations.customError("An annotation property must be set in the options object when CCOM version is set to 'v1.4' or 'latest'.", example);
	}else if(obj.annotation != undefined && (obj.annotation.length > 40 || obj.annotation.length == 0)){
		let example = "\n\nconst Client = require('osvc_node');\nconst env = process.env;\n\nconst rn_client = Client({\n\tusername: env['OSC_ADMIN'],\n\tpassword: env['OSC_PASSWORD'],\n\tinterface: env['OSC_SITE'],\n\tversion: 'latest',\n});\n\nvar options = {\n\tclient: rn_client,\n\t\033[32mannotation: 'Annotation to describe this HTTP request'\033[0m\n}\n";
		return Validations.customError("An annotation must be between 0 and 40 characters.", example);
	}
}