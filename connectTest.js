const OSvCNode = require('./lib/osvcNode.js');
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
	url: 'incidents/24900/fileAttachments/256',
}

OSvCNode.Connect.get(options).then((res)=>{
	console.log(res)
}).catch(function (error) {
	console.log(error);
});

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