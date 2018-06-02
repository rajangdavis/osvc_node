var assert = require('chai').assert;
var config = require('../../lib/Config.js');
var client = require('../../lib/Client.js');

describe('Config.optionsFinalize', function(){ 

	var rnClient = new client({
		username: 'username',
		password: 'password',
		interface: 'interface',
		no_ssl_verify: true,
		suppress_rules: true
	});

	var options = {
		client: rnClient
	}

	var finalOptions = config.optionsFinalize("post",options,true);

	it('should take an HTTP verb and set the method property to match that verb',function(){
		assert.strictEqual(finalOptions.method,"post");
	});

	it('should take a client object and return a hash of options settings; ' +
		'the "suppress_rules" setting should return ' +
		'headers["OSvC-CREST-Suppress-All"] as true',function(){
		assert.strictEqual(finalOptions.headers["OSvC-CREST-Suppress-All"],true);
	});

	it('should take a boolean param for making PATCH requests; ' +
		'headers["X-HTTP-Method-Override"] as "PATCH"',function(){
		assert.strictEqual(finalOptions.headers["X-HTTP-Method-Override"],'PATCH');
	});

	var defaultConfigHeaders = new client({
		username: 'username',
		password: 'password',
		interface: 'interface'
	});

	var defaultOptions = {
		client: rnClient
	}

	var defaultHeaders = config.optionsFinalize("get", defaultOptions);

	it('should have headers set to undefined as a default',function(){
		assert.strictEqual(defaultHeaders["OSvC-CREST-Suppress-All"],undefined);
		assert.strictEqual(defaultHeaders["X-HTTP-Method-Override"],undefined);
	});

	var oscConfigURL = {
		client: new client({
			username: 'username123',
			password: 'password456',
			interface: 'interface789',
			demo_site: true,
			version: 'v1.4',
			no_ssl_verify: true,
			suppress_rules: true
		}),
		url: "incidents"
	}

	var osvcURL = config.optionsFinalize("get", oscConfigURL);	

	it('should always use "https" and "/services/rest/connect" in the url',function(){
		assert.match(osvcURL.url,/\/services\/rest\/connect/);
		assert.match(osvcURL.url,/https/);
	});

	it('should take a client object and change the url to include "rightnowdemo" if '+
		'the "demo_site" setting is set to true',function(){
		assert.match(osvcURL.url,/rightnowdemo\.com/);
	});

	it('should take a username,password,and interface and change the url to include the interface',function(){
		assert.match(osvcURL.url,/interface789/);
	});

	it('should take a username,password and return an authorization header for basic auth',function(){
		let encryptedCred = "Basic " + Buffer.from("username123:password456").toString("base64");
		assert.strictEqual(osvcURL.headers["Authorization"], encryptedCred);
	});	


	it('should take a client object and change the url to include a different verions if '+
		'the "version" setting is changed',function(){
		assert.match(osvcURL.url,/v1\.4/);
	});

	it('should take a resource URL and change the url',function(){
		assert.match(osvcURL.url,/incidents/);
	});
	
	it('should equal "https://interface789.rightnowdemo.com/services/rest/connect/v1.4/incidents"',function(){
		assert.strictEqual(osvcURL.url,"https://interface789.rightnowdemo.com/services/rest/connect/v1.4/incidents")
	});

	
	var defaultConfigURL = {
		client: client({
			username: 'username123',
			password: 'password456',
			interface: 'interface789'
		})
	}
	
	var defaultResourceUrl = config.optionsFinalize("get", defaultConfigURL);

	it('should take a not match incidents if the resource URL is not specified',function(){
		assert.notMatch(defaultResourceUrl.url,/incidents/);
	});

	it('"version" should be "v1.3/" if not specified',function(){
		assert.match(defaultResourceUrl.url,/v1\.3\//);
	});

	it('"custhelp" domain will be used if not specified',function(){
		assert.match(defaultResourceUrl.url,/custhelp.com/);
	});

	it('should equal "https://interface789.custhelp.com/services/rest/connect/v1.3/"',function(){
		assert.strictEqual(defaultResourceUrl.url,"https://interface789.custhelp.com/services/rest/connect/v1.3/")
	});

});