var assert = require('chai').assert;
var expect = require('chai').expect;
var config = require('../../lib/Config.js');
var client = require('../../lib/Client.js');
var env = process.env;

describe('connect.headersHash',function(){ 

	var oscConfigHeaders = {
		username: 'username',
		password: 'password',
		interface: 'interface',
		demo_site: true,
		version: 'v1.4',
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

	it('should take a username,password,and interface and change the url to include the username',function(){
		assert.match(oncURL,/username123/);
		assert.match(oncURL,/password456/);
		assert.match(oncURL,/interface789/);
	});

	it('should take a client object and change the url to include "rightnowdemo" if '+
		'the "demo_site" setting is set to true',function(){
		assert.match(oncURL,/rightnowdemo.com/);

	});

	it('should take a client object and change the url to include a different verions if '+
		'the "version" setting is changed',function(){
		assert.match(oncURL,/v1.4/);

	});

	it('should take a resource URL and change the url',function(){
		assert.match(oncURL,/incidents/);
	});

	// I know, this is not initial state
	// but let's use our imaginations, kay?
	rnClient.version = "v1.3";
	rnClient.demo_site = false;

	var noResourceUrl = config.clientUrl(rnClient);

	it('should take a not match incidents if the resource URL is not specified',function(){
		assert.notMatch(noResourceUrl,/incidents/);
	});

	it('"version" should be "v1.3" if not specified',function(){
		assert.match(noResourceUrl,/v1.3/);
	});

	it('"custhelp" domain will be used if not specified',function(){
		assert.match(noResourceUrl,/custhelp.com/);
	});

});