module.exports ={
	
	optionsFinalize : (verb,obj,patchRequest = false) => {
		if(obj.url == undefined){
			obj.url = '';
		}
		
		return {
			method:verb,
			url: clientUrl(obj.client, obj.url),
			headers: headersHash(obj.client, patchRequest),
			data: obj.json
		}
	}

}

const clientUrl = (obj, resourceUrl = undefined) => {

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

const headersHash = (obj, patchRequest = false) => {

	let headersHash = {};
	
	if(obj.username != undefined && obj.password != undefined ){
		let encryptedCred = Buffer.from(obj.username + ":" + obj.password).toString("base64");
		headersHash['Authorization'] = `Basic ${encryptedCred}`
	}

	if(obj.suppress_rules === true){
		headersHash['OSvC-CREST-Suppress-All'] = true;
	}

	if (patchRequest === true){
		headersHash['X-HTTP-Method-Override'] = 'PATCH';
	}

	if(obj.session != undefined){
		headersHash['Authorization'] = `Session ${obj.session}`
	}

	if(obj.oauth != undefined){
		headersHash['Authorization'] = `Bearer ${obj.oauth}`
	}
	
	return headersHash;
}