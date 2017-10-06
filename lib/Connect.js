const https = require('https');

module.exports = function(clientObj,resourceURL){
	this.client = clientObj;
	this.clientUrl = _clientUrl(clientObj);
	this.headersHash = _headersHash(clientObj);
	this.get = function(resourceURL = undefined){
		let options = {
			host:this.clientUrl.host,
			path:this.clientUrl.path + (resourceURL == undefined ? '' : resourceURL),
			method:"GET", 
			headers:_headersHash(this.client)
		};

		let req = https.request(options, (response) =>{
			console.log(response);
			 response.on('data', (d) => {
			    return d;
			});
		}).on('error', (e) => {
		  	console.error(e);
		});
		req.end();
	};
	return this;
}

const _clientUrl = function(obj){
	let urlHash = {};
	let host = obj.interface +".";
	let path = '/services/rest/connect/'


	if(obj['demo_site'] === true){
		host += "rightnowdemo.com";
	}else{
		host += "custhelp.com";
	}

	if(obj['version'] != undefined){
		path += (obj['version'] + "/");
	}else{
		path += "v1.3/";
	}

	urlHash['host'] = host;
	urlHash['path'] = path;

	return urlHash;
}

const _headersHash = function(obj, patchRequest = false){
	
	let headersHash = {};

	let bufferedLogin = new Buffer(obj.username + ':' + obj.password);

	headersHash['Authorization'] = 'Basic ' + bufferedLogin.toString('base64');

	if (patchRequest === true){
		headersHash['X-HTTP-Method-Override'] = 'PATCH';
	}else if(obj.suppress_rules === true){
		headersHash['OSvC-CREST-Suppress-All'] = true;
	}
	return headersHash;
}