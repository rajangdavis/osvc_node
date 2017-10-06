const axios = require('axios');
const assert = require('chai').assert;
// var expect = require('chai').expect;

const env = process.env;



describe('connect.get',function(){ 
	
	var Connect = require('../../lib/Connect.js');
	var Client = require('../../lib/Client.js');

	var oscConfigTest = {
		username: env['OSC_ADMIN'],
		password: env['OSC_PASSWORD'],
		interface: env['OSC_SITE'],
		demo_site: true
	}

	var rnClientWithHTTP = new Client(oscConfigTest); 

	var oncGet = Connect(rnClientWithHTTP);

	it('should take a url as a param and make a HTTP GET Request' + 
		' with a response code of 200 and a body of JSON',function(){
		
		test = oncGet.get('answers');

		console.log(test);
		// assert.strictEqual(answers.code,200);

	});

});

// describe('connect.headersCheck',function(){ 

// 	let Connect = require('../../lib/Connect.js');
// 	let Client = require('../../lib/Client.js');

// 	var oscConfigHeaders = {
// 		username: 'username',
// 		password: 'password',
// 		interface: 'interface',
// 		demo_site: true,
// 		version: 'v1.4',
// 		no_ssl_verify: true,
// 		suppress_rules: true
// 	}

// 	var rnClient = new Client(oscConfigHeaders); 

// 	var oncHeaders = Connect(rnClient);

// 	it('should take a client object and return a hash of header settings; ' +
// 		'the "suppress_rules" setting should return ' +
// 		'headers["OSvC-CREST-Suppress-All"] as true',function(){
// 		assert.strictEqual(oncHeaders.headersHash["OSvC-CREST-Suppress-All"],true);
// 	});

// });

// describe('connect.clientUrl',function(){
	
// 	let Connect = require('../../lib/Connect.js');
// 	let Client = require('../../lib/Client.js');

// 	var oscConfigURL = {
// 		username: 'username',
// 		password: 'password',
// 		interface: 'interface',
// 		demo_site: true,
// 		version: 'v1.4',
// 		no_ssl_verify: true,
// 		suppress_rules: true
// 	}

// 	var rnClient = new Client(oscConfigURL); 
	
// 	var oncURL = Connect(rnClient);

// 	it('should take a client object and change the url to include "rightnowdemo" if '+
// 		'the "demo_site" setting is set to true',function(){
// 		assert.match(oncURL.clientUrl,/rightnowdemo/);

// 	});

// 	it('should take a client object and change the url to include a different verions if '+
// 		'the "version" setting is changed',function(){
// 		assert.match(oncURL.clientUrl,/v1.4/);

// 	});

// });