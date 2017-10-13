const OSCNode = require('./lib/OSCNode.js');
const env = process.env;

// Create an OSCNode.Client object
var rn_client = OSCNode.Client({
	username: env['OSC_ADMIN'],
	password: env['OSC_PASSWORD'],
	interface: env['OSC_SITE'],
	demo_site: true
});


// CREATE/POST example
var newProduct = {};
newProduct['names'] = []
newProduct['names'].push({'labelText':'newProduct', 'language':{'id':1}})
newProduct['displayOrder'] = 4
newProduct['adminVisibleInterfaces'] = []
newProduct['adminVisibleInterfaces'].push({'id':1})
newProduct['endUserVisibleInterfaces'] = []
newProduct['endUserVisibleInterfaces'].push({'id':1})


OSCNode.Connect.post(rn_client,'serviceProducts',newProduct,(err,body,response) => {
	if(err){
		console.log(err);
	}else{
		console.log(response.statusCode);
		console.log(JSON.stringify(body, null, 4));
		return body;
	}
});


// READ/GET example
OSCNode.Connect.get(rn_client,'serviceProducts/170',(err,body,response) => {
	if(err){
		console.log(err);
	}else{
		console.log(response.statusCode);
		console.log(JSON.stringify(body, null, 4));
		return body;
	}
});



// UPDATE/PATCH example

// JSON Object
// With data for updating
var productUpdated = {
  'name': [{
    'labelText': 'newProduct UPDATED',
    'language': {
      'id': 1
    }
  }]
};

// Proposed API
//
//	var options = {
//		client: rn_client,
//		url:'serviceProducts/170',
//		json: productUpdated
//	}
//
//
//	OSCNode.Connect.patch(options,(err,body,response) => {
//		if(err){
//			console.log(err);
//		}else{
//			console.log(response.statusCode);
//			console.log(JSON.stringify(body, null, 4));
//			return body;
//		}
//	});


// Current API

OSCNode.Connect.patch(rn_client,'serviceProducts/170',productUpdatedHash,(err,body,response) => {
	if(err){
		console.log(err);
	}else{
		console.log(response.statusCode);
		console.log(JSON.stringify(body, null, 4));
		return body;
	}
});



// DELETE example
OSCNode.Connect.delete(rn_client,'serviceProducts/169',(err,body,response) => {
	if(err){
		console.log(err);
	}else{
		console.log(response.statusCode);
		console.log(JSON.stringify(body, null, 4));
		return body;
	}
});