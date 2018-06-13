const Validations = require('./Validations.js')

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

	
	if(obj.hasOwnProperty('access_token')){
		this.access_token = obj.access_token;
	}

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

const _authError = (err, clientHighlight) => {
	let clientExample = "\033[0m\n\nconst {Client, Connect} = require('osvc_node');\nconst env = process.env;\n\nvar rnClient = " + clientHighlight + "\n";
	return Validations.customError(err,clientExample);
}

const _checkClient = (object)=>{

	if(object.interface === undefined){
		return _authError("Client interface cannot be undefined.", "new Client({\n\tusername: env['OSC_ADMIN'],\n\tpassword: env['OSC_PASSWORD'],\n\t\033[32minterface: env['OSC_SITE']\033[0m,\n\tdemo_site: true,\n});");
	}

	if(object.password != undefined && object.username === undefined){
		return _authError("Password is set but username is not.", "new Client({\n\t\033[32musername: env['OSC_ADMIN']\033[0m,\n\tpassword: env['OSC_PASSWORD'],\n\tinterface: env['OSC_SITE'],\n\tdemo_site: true,\n});");
	}

	if(object.username != undefined && object.password === undefined){
		return _authError("Username is set but password is not.", "new Client({\n\tusername: env['OSC_ADMIN'],\n\t\033[32mpassword: env['OSC_PASSWORD']\033[0m,\n\tinterface: env['OSC_SITE'],\n\tdemo_site: true,\n});");
	}

	if(object.password === undefined && object.username === undefined && object.session === undefined && object.oauth === undefined){
		return _authError("Some form of authentication must be set within the Client object.", "new Client({\n\t\033[32musername: env['OSC_ADMIN']\033[0m,\n\t\033[32mpassword: env['OSC_PASSWORD']\033[0m,\n\tinterface: env['OSC_SITE'],\n\tdemo_site: true,\n});");
	}

	return object;
}