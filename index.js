var fetch = require('node-fetch');

let interfaceURL = (username,password,interface,resource) => 'https://'+username+':'+password+'@'+interface+'.custhelp.com/services/rest/connect/v1.3/'+resource;

let pe = process.env;

const OSC_CONFIG = interfaceURL(pe.OSC_ADMIN,pe.OSC_PASSWORD,pe.OSC_TEST_SITE);

fetch(OSC_CONFIG, {
	method: 'get'
}).then(function(res) {
    return res.json();
}).then(function(json) {
    console.log(json);
}).catch(function(err) {
	console.log(err)
});