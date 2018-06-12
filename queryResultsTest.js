const OSvCNode = require('./lib/OSvCNode.js');
const env = process.env;

var rn_client = OSvCNode.Client({
	username: env['OSC_ADMIN'],
	password: env['OSC_PASSWORD'],
	interface: env['OSC_SITE'],
	demo_site:true
});

var options = {
	client: rn_client,
	// query: `SELECT id as inc_id, fileAttachments.fileAttachmentlist.* from Incidents where fileAttachments.fileAttachmentlist.id IS NOT NULL`,
}

OSvCNode.QueryResults.query(options).then(data =>{
	console.log(data)
}).catch(err => {
	console.log(err);
});