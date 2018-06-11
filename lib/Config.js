module.exports ={
	
	optionsFinalize : (verb,obj,patchRequest = false) => {
		if(obj.url == undefined){
			obj.url = '';
		}
		
		return {
			method:verb,
			url: _clientUrl(obj.client, obj.url),
			headers: _headersHash(obj.client, patchRequest),
			data: obj.json
		}
	},
	optionalHeaders:()=>{

	}

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

const _headersHash = (obj, patchRequest = false) => {

	let headersHash	= _setConfigAuth(obj);

	if(obj.suppress_rules === true){
		headersHash['OSvC-CREST-Suppress-All'] = true;
	}

	if (obj.access_token != undefined){
		headersHash['osvc-crest-api-access-token'] = obj.access_token;
	}

	if (patchRequest === true){
		headersHash['X-HTTP-Method-Override'] = 'PATCH';
	}
	
	return headersHash;
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