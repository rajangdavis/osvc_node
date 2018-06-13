const OSvCNode = require('./lib/osvcNode.js');
const env = process.env;

var rn_client = OSvCNode.Client({
	username: env['OSC_ADMIN'],
	password: env['OSC_PASSWORD'],
	interface: env['OSC_SITE'],
	demo_site: true
});


// // GET TEST
// let options = {
// 	client: rn_client,
// 	url: 'incidents/4268',
// 	exclude_null: true,
// 	// debug: true
// }

// OSvCNode.Connect.get(options).then((res)=>{
// 	console.log(JSON.stringify(res, null, 4))
// }).catch(function (error) {
// 	console.log(error);
// });
const {Client, Connect} = require('./lib/osvcNode.js');

var rnClient = new Client({
	username: env['OSC_ADMIN'],
	password: env['OSC_PASSWORD'],
	interface: env['OSC_SITE'],
	demo_site: true
});

let postUploadOptions = {
	client: rnClient,
	url: 'incidents',
	json: {
		"primaryContact": {
	    	"id": 2
		},
		"subject": "FishPhone not working"
	}, files :[
		'./haQE7EIDQVUyzoLDha2SRVsP415IYK8_ocmxgMfyZaw.png',
		'./DhaQE7EIDQVUyzoLDha2SRVsP415IYK8_ocmxgMfyZaw.png',
	],
}

Connect.post(postUploadOptions).then(function(res){
	console.log(res);
}).catch(function(err){
	console.log(err);
})

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

// let options = {
// 	client: rn_client,
// 	url: 'incidents',
// }

// OSvCNode.Connect.options(options).then((res)=>{
// 	console.log(res.osvcstatus)
// }).catch(function (error) {
// 	console.log(error);
// });