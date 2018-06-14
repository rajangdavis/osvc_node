const axios = require('axios');
const {Client, Connect} = require('./lib/OSvCNode');
const env = process.env;

const fetchSessionId = async () =>{
	let result = await axios.get(`https://${env['OSC_SITE']}.rightnowdemo.com/cgi-bin/${env['OSC_CONFIG']}.cfg/php/custom/login_test.php?username=${env['OSC_ADMIN']}&password=${env['OSC_PASSWORD']}`);
	return result.data.session_id;
}

const getRequest = async () => {
	let sessionID = await fetchSessionId();
	let options = {
		client: new Client({
			session: sessionID,
			interface: env['OSC_SITE'],
			demo_site: true,
			version: "latest",
			no_ssl_verify: true
		}),
		annotation: "TESTING session auth",
		debug: true
	};
	return await Connect.get(options);
}

getRequest().then( data=>{
	console.log(data);
}).catch( err=>{
	console.log(err);
})