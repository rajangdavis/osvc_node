module.exports ={
	
	clientUrl: function(obj, resourceUrl = undefined){

		let urlString = 'https://';

		// console.log(obj.username);

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
	},

	headersHash: function(obj, patchRequest = false){
	
		let headersHash = {};

		if (patchRequest === true){
			headersHash['X-HTTP-Method-Override'] = 'PATCH';
		}else if(obj.suppress_rules === true){
			headersHash['OSvC-CREST-Suppress-All'] = true;
		}
		return headersHash;
	}

}