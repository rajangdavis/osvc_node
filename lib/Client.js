module.exports = function(obj){

	////// optional configuration
	// Turns off SSL verification; don't use in production
	this.no_ssl_verify = obj.no_ssl_verify || false // Defaults to false. 
	
	// Sets the version of the REST API to use
	this.version =  obj.version === undefined ? 'v1.3' : obj.version;
	
	// Let's you supress business rules
	this.suppress_rules = obj.suppress_rules || false;
	
	// Use 'rightnowdemo' namespace instead of 'custhelp'
	this.demo_site = obj.demo_site || false;
	
	_setAuth(this,obj);
	
	this.interface = obj.interface;

	['access_token'].map((optionalHeader) => {
		if(obj.hasOwnProperty(optionalHeader)){
			this[optionalHeader] = obj[optionalHeader];
		}
	});

	return this;
}

const _setAuth = (thisObject,obj)=>{
	if(obj.session){
		thisObject.session = obj.session;
	}else if(obj.oauth){
		thisObject.oauth = obj.oauth;
	}else{
		thisObject.username = _checkClient(obj).username;
		thisObject.password = _checkClient(obj).password;
	}
}

const _checkClient = (object)=>{

	if(object.interface === undefined){
		throw new TypeError("Client '" + prop + "' cannot be undefined");
	}

	let propertiesToCheck = ['username','password'];

	for (var i = propertiesToCheck.length - 1; i >= 0; i--) {
		let prop = propertiesToCheck[i];
		if(object[prop] === undefined){
			throw new TypeError("Client '" + prop + "' cannot be undefined");
		}
	}
	return object;
}