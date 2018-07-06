const OSvCNode = require('./lib/OSvCNode.js');
const env = process.env;

var rn_client = OSvCNode.Client({
	username: env['OSC_ADMIN'],
	password: env['OSC_PASSWORD'],
	interface: env['OSC_SITE'],
	demo_site: true
});

// GET TEST
let options = {
	client: rn_client,
	url: 'incidents',
	schema: true
}

OSvCNode.Connect.get(options).then((res)=>{
	console.log(JSON.stringify(res, null, 4))
}).catch(function (error) {
	console.log(error);
});


// const {Client: osvcClient, Connect: osvcConnect} = require('./lib/OSvCNode.js');
// const env = process.env;

// var rnClient = new osvcClient({
// 	username: env['OSC_ADMIN'],
// 	password: env['OSC_PASSWORD'],
// 	interface: env['OSC_SITE'],
// 	demo_site: true,
// });

// let postUploadOptions = {
// 	client: rnClient,
// 	url: 'incidents',
// 	json: {
// 		"primaryContact": {
// 	    	"id": 2
// 		},
// 		"subject": "FishPhone not working"
// 	}, 
// 	files :[
// 		'./haQE7EIDQVUyzoLDha2SRVsP415IYK8_ocmxgMfyZaw.png',
// 	],
// }

// osvcConnect.post(postUploadOptions).then(function(res){
// 	console.log(res);
// }).catch(function(err){
// 	console.log(err);
// })

// // POST TEST
// var newProduct = {
//   'names': [{
//     'labelText': 'newProduct',
//     'language': {
//       'id': 1
//     }
//   }],
//   'displayOrder': 4,
//   'adminVisibleInterfaces': [{
//     'id': 1
//   }],
//   'endUserVisibleInterfaces': [{
//     'id': 1
//   }]
// };

// var options = {
// 	client: rn_client,
// 	url:'serviceProducts',
// 	json: newProduct
// }

// OSvCNode.Connect.post(options).then((res)=>{
// 	console.log(res)
// }).catch(function (error) {
// 	console.log(error);
// });

// PATCH TEST
// var data = {
// 	"primaryContact": {
//     	"id": 2
// 	},
// 	"subject": "FishPhone not working UPDATED"
// }

// var patchOptions = {
// 	client: rn_client,
// 	url: 'incidents/24922',
// 	json: data
// }

// OSvCNode.Connect.patch(patchOptions).then((res)=>{
// 	console.log(res)
// }).catch(function (error) {
// 	console.log(error);
// });

// // DELETE TEST
// var deleteOptions = {
// 	client: rn_client,
// 	url: "incidents/24922"
// }

// OSvCNode.Connect.delete(deleteOptions).then((res)=>{
// 	console.log(res)
// }).catch(function (error) {
// 	console.log(error);
// });


// OPTIONS TEST
// const {Client, Connect} = require('./lib/OSvCNode.js');
// const env = process.env;

// // Create an OSvCNode.Client object
// var rnClient = Client({
// 	username: env['OSC_ADMIN'],
// 	password: env['OSC_PASSWORD'],
// 	interface: env['OSC_SITE'],
// 	demo_site: true
// });

// var checkOptions = {
//  	client: rnClient,
//  	url: "incidents"
// }

// Connect.options(checkOptions).then((res)=>{
//  	console.log(res)
// }).catch(function (error) {
//  	console.log(error);
// });