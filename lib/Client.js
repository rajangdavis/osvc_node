const Validations = require('./Validations.js')

module.exports = function(obj){
	////// optional configuration
	// Turns off SSL verification; don't use in production
	this.no_ssl_verify = obj.no_ssl_verify || false // Defaults to false. 
	
	// Sets the version of the REST API to use
	this.version =  obj.version === undefined ? 'v1.3' : obj.version;
	
	// Lets you supress business rules
	this.suppress_rules = obj.suppress_rules || false;

	// Lets you supress external events
	this.suppress_events = obj.suppress_events || false;
	
	// Lets you supress external events and business rules
	this.suppress_all = obj.suppress_all || false;
	
	// Use 'rightnowdemo' namespace instead of 'custhelp'
	this.demo_site = obj.demo_site || false;
	
	this.interface = obj.interface;
	
	if(obj.hasOwnProperty('access_token')){
		this.access_token = obj.access_token;
	}

	return _setAuth(this,obj);

}

const _setAuth = (thisObject,obj)=>{
	if(obj.session != undefined){
		thisObject.session = obj.session;
	}else if(obj.oauth != undefined){
		thisObject.oauth = obj.oauth;
	}else{
		thisObject.username = _checkClient(obj).username;
		thisObject.password = _checkClient(obj).password;
	}
	return thisObject;
}

const _authError = (err, clientHighlight) => {
	let clientExample = "\033[0m\n\nconst {Client, Connect} = require('osvc_node');\nconst env = process.env;\n\nvar rnClient = " + clientHighlight + "\n";
	return Validations.customError(err,clientExample);
}

const _clientError = (condition, error, example) =>{
	if(condition){
		return  _authError(error,example)
	}
}

const _checkClient = (object)=>{

	_clientError(object.interface === undefined,"Client interface cannot be undefined.","new Client({\n\tusername: env['OSC_ADMIN'],\n\tpassword: env['OSC_PASSWORD'],\n\t\033[32minterface: env['OSC_SITE']\033[0m,\n\tdemo_site: true,\n});");
	_clientError(object.password != undefined && object.username === undefined,"Password is set but username is not.", "new Client({\n\t\033[32musername: env['OSC_ADMIN']\033[0m,\n\tpassword: env['OSC_PASSWORD'],\n\tinterface: env['OSC_SITE'],\n\tdemo_site: true,\n});");
	_clientError(object.username != undefined && object.password === undefined,"Username is set but password is not.", "new Client({\n\tusername: env['OSC_ADMIN'],\n\t\033[32mpassword: env['OSC_PASSWORD']\033[0m,\n\tinterface: env['OSC_SITE'],\n\tdemo_site: true,\n});");
	_clientError(object.password === undefined && object.username === undefined && object.session === undefined && object.oauth === undefined,"Some form of authentication must be set within the Client object.", "new Client({\n\t\033[32musername: env['OSC_ADMIN']\033[0m,\n\t\033[32mpassword: env['OSC_PASSWORD']\033[0m,\n\tinterface: env['OSC_SITE'],\n\tdemo_site: true,\n});");

	return object;
}