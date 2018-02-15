var assert = require('chai').assert;
var expect = require('chai').expect;
var client = require('../../lib/Client.js');
var env = process.env;

describe('client module',function(){

	const OSC_CONFIG = {
		username: env['OSC_ADMIN'],
		password: env['OSC_PASSWORD'],
		interface: env['OSC_SITE'],
		demo_site: true
	}

	const RN_CLIENT = new client(OSC_CONFIG);

	it('should take "username",' +
					'"password",' +
					'and "interface" values from and object and match them',function(){

		assert.strictEqual(RN_CLIENT.username,OSC_CONFIG.username);
		assert.strictEqual(RN_CLIENT.password,OSC_CONFIG.password);
		assert.strictEqual(RN_CLIENT.interface,OSC_CONFIG.interface);

	});

	it('should take a "demo_site" from an object and match it',function(){

		assert.strictEqual(RN_CLIENT.demo_site,OSC_CONFIG.demo_site);

	});

	const OSC_CONFIG_NO_DEFAULTS = {
		username: env['OSC_ADMIN'],
		password: env['OSC_PASSWORD'],
		interface: env['OSC_SITE'],
		demo_site: true,
		no_ssl_verify: true,
		version: 'v1.4',
		suppress_rules: false
	}

	const RN_CLIENT_NO_DEFAULTS = new client(OSC_CONFIG_NO_DEFAULTS);

	it('should take "no_ssl_verify",'+
					'"version", '+
					'and "suppress_rules" values from an object and match them',function(){

		assert.strictEqual(RN_CLIENT_NO_DEFAULTS.no_ssl_verify,OSC_CONFIG_NO_DEFAULTS.no_ssl_verify);
		assert.strictEqual(RN_CLIENT_NO_DEFAULTS.version,OSC_CONFIG_NO_DEFAULTS.version);
		assert.strictEqual(RN_CLIENT_NO_DEFAULTS.suppress_rules,OSC_CONFIG_NO_DEFAULTS.suppress_rules);

	});

	const BAD_USERNAME = {
		username: env['OSC_ADMIN1'],
		password: env['OSC_PASSWORD1'],
		interface: env['OSC_SITE1'],
	}

	var BAD_USERNAME_CONFIG = function(){
		new client(BAD_USERNAME);
	}

	it('should raise an error if the object username is blank',function(){
	
		expect(BAD_USERNAME_CONFIG).to.throw();

	});

	const BAD_PASSWORD = {
		username: env['OSC_ADMIN'],
		password: env['OSC_PASSWORD1'],
		interface: env['OSC_SITE1'],
	}

	var BAD_PASSWORD_CONFIG = function(){
		new client(BAD_PASSWORD);
	}

	it('should raise an error if the object password is blank',function(){
	
		expect(BAD_PASSWORD_CONFIG).to.throw();

	});

	const BAD_INTERFACE = {
		username: env['OSC_ADMIN'],
		password: env['OSC_PASSWORD'],
		interface: env['OSC_SITE1'],
	}

	var BAD_INTERFACE_CONFIG = function(){
		new client(BAD_INTERFACE);
	}

	it('should raise an error if the object interface is blank',function(){
	
		expect(BAD_INTERFACE_CONFIG).to.throw();

	});

	const VERSION_CHECK_INTERFACE = {
		username: env['OSC_ADMIN'],
		password: env['OSC_PASSWORD'],
		interface: env['OSC_SITE'],
	}

	var VERSION_CHECK_INTERFACE_CONFIG = new client(VERSION_CHECK_INTERFACE);

	it('should should have version set to "v1.3" if unspecified',function(){
	
		assert.strictEqual(VERSION_CHECK_INTERFACE_CONFIG.version,"v1.3");

	});

})