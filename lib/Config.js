module.exports ={
	
	optionsFinalize : (verb,obj,patchRequest = false) => {
		if(obj.url == undefined){
			obj.url = '';
		}
		
		return {
			method:verb,
			url: _clientUrl(obj.client, obj.url),
			headers: _headersHash(obj, patchRequest),
			data: obj.json
		}
	},
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

	if(obj.next_request != undefined && obj.next_request > 0){
		headersHash['osvc-crest-next-request-after'] = obj.next_request;
	}

	if(obj.schema === true){
		headersHash['Accept'] = 'application/schema+json';
	}

	if(obj.utc_time === true){
		headersHash['OSvC-CREST-Time-UTC'] = 'yes';
	}

	if(obj.annotation != undefined){
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