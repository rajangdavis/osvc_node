const OSCNode = require('./lib/OSCNode.js');
const env = process.env;

var rn_client = OSCNode.Client({
  username: env['OSC_ADMIN'],
  password: env['OSC_PASSWORD'],
  interface: env['OSC_SITE'],
  demo_site:true
});

var contactsQuery = `SELECT * 
					 FROM contacts
					 WHERE createdTime > '2005-01-10T04:00:00Z'`

var options = {
	client: rn_client,
	query: contactsQuery
}

OSCNode.QueryResults.query(options,(err,response,body) =>{
	console.log(err);
	console.log(response);
	console.log(body);
})