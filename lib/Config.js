module.exports ={
	
	clientUrl: function(obj, resourceUrl = undefined){

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
		urlString += (obj['version'] + "/");

		if(resourceUrl != undefined)
			urlString += resourceUrl;

		return urlString;
	},

	headersHash: function(obj, patchRequest = false){
	
		let headersHash = {};

		if (patchRequest === true){
			headersHash['X-HTTP-Method-Override'] = 'PATCH';
		}

		if(obj.suppress_rules === true){
			headersHash['OSvC-CREST-Suppress-All'] = true;
		}
		return headersHash;
	}

}