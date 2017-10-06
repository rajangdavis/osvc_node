module.exports = function(obj){
	this.username = _checkClient(obj).username;
	this.password = _checkClient(obj).password;
	this.interface = _checkClient(obj).interface;

	////// optional configuration
	// Turns off SSL verification; don't use in production
	this.no_ssl_verify = obj.no_ssl_verify || false // Defaults to false. 
	
	// Sets the version of the REST API to use
	this.version =  obj.version === undefined ? 'v1.3' : obj.version;
	
	// Let's you supress business rules
	this.suppress_rules = obj.suppress_rules || false;
	
	// Use 'rightnowdemo' namespace instead of 'custhelp'
	this.demo_site = obj.demo_site || false;

	return this;
}

const _checkClient = (object)=>{
	let propertiesToCheck = ['username','password','interface'];

	for (var i = propertiesToCheck.length - 1; i >= 0; i--) {
		let prop = propertiesToCheck[i];
		if(object[prop] === undefined){
			throw new TypeError("Client '" + prop + "' cannot be undefined");
		}
	}
	return object;
}