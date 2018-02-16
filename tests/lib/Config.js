var assert = require('chai').assert;
var config = require('../../lib/Config.js');
var client = require('../../lib/Client.js');

describe('connect.headersHash', function(){ 

	var oscConfigHeaders = {
		username: 'username',
		password: 'password',
		interface: 'interface',
		no_ssl_verify: true,
		suppress_rules: true
	}

	var rnClient = new client(oscConfigHeaders); 
	var oncHeaders = config.headersHash(rnClient,true);

	it('should take a client object and return a hash of header settings; ' +
		'the "suppress_rules" setting should return ' +
		'headers["OSvC-CREST-Suppress-All"] as true',function(){
		assert.strictEqual(oncHeaders["OSvC-CREST-Suppress-All"],true);
	});

	it('should take a boolean param for making PATCH requests; ' +
		'headers["X-HTTP-Method-Override"] as "PATCH"',function(){
		assert.strictEqual(oncHeaders["X-HTTP-Method-Override"],'PATCH');
	});

	var defaultConfigHeaders = {
		username: 'username',
		password: 'password',
		interface: 'interface'
	}

	var defaultClient = new client(defaultConfigHeaders); 
	var defaultHeaders = config.headersHash(defaultClient);

	it('should have headers set to undefined as a default',function(){
		assert.strictEqual(defaultHeaders["OSvC-CREST-Suppress-All"],undefined);
		assert.strictEqual(defaultHeaders["X-HTTP-Method-Override"],undefined);
	});

});

describe('config.clientUrl',function(){

	var oscConfigURL = {
		username: 'username123',
		password: 'password456',
		interface: 'interface789',
		demo_site: true,
		version: 'v1.4',
		no_ssl_verify: true,
		suppress_rules: true
	}

	var rnClient = new client(oscConfigURL); 
	
	var oncURL = config.clientUrl(rnClient,"incidents");

	it('should always use "https" and "/services/rest/connect" in the url',function(){
		assert.match(oncURL,/\/services\/rest\/connect/);
		assert.match(oncURL,/https/);
	});

	it('should take a client object and change the url to include "rightnowdemo" if '+
		'the "demo_site" setting is set to true',function(){
		assert.match(oncURL,/rightnowdemo\.com/);

	});

	it('should take a username,password,and interface and change the url to include the username',function(){
		assert.match(oncURL,/username123/);
		assert.match(oncURL,/password456/);
		assert.match(oncURL,/interface789/);
	});


	it('should take a client object and change the url to include a different verions if '+
		'the "version" setting is changed',function(){
		assert.match(oncURL,/v1\.4/);
	});

	it('should take a resource URL and change the url',function(){
		assert.match(oncURL,/incidents/);
	});
	
	it('should equal "https://username123:password456@interface789.rightnowdemo.com/services/rest/connect/v1.4/incidents"',function(){
		assert.strictEqual(oncURL,"https://username123:password456@interface789.rightnowdemo.com/services/rest/connect/v1.4/incidents")
	});

	
	var defaultConfigURL = {
		username: 'username123',
		password: 'password456',
		interface: 'interface789'
	}

	var defaultClient = new client(defaultConfigURL);

	var defaultResourceUrl = config.clientUrl(defaultClient);

	it('should take a not match incidents if the resource URL is not specified',function(){
		assert.notMatch(defaultResourceUrl,/incidents/);
	});

	it('"version" should be "v1.3/" if not specified',function(){
		assert.match(defaultResourceUrl,/v1\.3\//);
	});

	it('"custhelp" domain will be used if not specified',function(){
		assert.match(defaultResourceUrl,/custhelp.com/);
	});

	it('should equal "https://username123:password456@interface789.custhelp.com/services/rest/connect/v1.3/"',function(){
		assert.strictEqual(defaultResourceUrl,"https://username123:password456@interface789.custhelp.com/services/rest/connect/v1.3/")
	});

});