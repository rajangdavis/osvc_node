const axios = require('axios');
const config = require('./Config.js')
const normalize = require('./Normalize.js')
const fs = require('fs');

module.exports = { 
	
	get: function(options){

		if(options.url.indexOf("?download") > -1){
			let optionsFinal = config.optionsFinalize("get",options);
			return _downloadCheck(optionsFinal,options);
		}
		let optionsFinal = config.optionsFinalize("get",options);
		return _makeRequest(optionsFinal,options);
	},

	post: function(options){
		let optionsFinal = config.optionsFinalize("post",options);
		return _makeRequest(optionsFinal,options);
	},

	patch: function(options){
		let optionsFinal = config.optionsFinalize("post",options, true);
		return _makeRequest(optionsFinal,options);
	},

	delete: function(options){
		let optionsFinal = config.optionsFinalize("delete",options);
		return _makeRequest(optionsFinal,options);
	},

	options: function(options){
		let optionsFinal = config.optionsFinalize("options",options);
		return _makeRequest(optionsFinal,options);
	},

}

const _makeRequest = async function(optionsFinal, printingOptions){
	let response = await axios(optionsFinal);
	return normalize._printCorrectly(printingOptions, response);
	
}

const _downloadCheck = async function(optionsFinal,printingOptions){
	return new Promise(async (resolve,reject)=>{
		try{

			if(optionsFinal.debug == true){
				return resolve(response);
			}

			let optionsCopy = JSON.parse(JSON.stringify(optionsFinal));

			optionsCopy.url = optionsFinal.url.replace("?download","")
			let fileResults = await _makeRequest(optionsCopy,printingOptions);
		
			let file, finalFileName;

			// one file
			if(fileResults.fileName != undefined){
				file = fs.createWriteStream(fileResults.fileName);
				finalFileName = fileResults.fileName;
			}else{
				file = fs.createWriteStream("downloadedAttachment.tgz");
				finalFileName = "downloadedAttachment.tgz";
			}
			let downloadfileObj = JSON.parse(JSON.stringify(optionsCopy));
			downloadfileObj.url += "?download";
			downloadfileObj.responseType = 'stream';
			let fileResponse = await _makeRequest(downloadfileObj,printingOptions);
			fileResponse.pipe(file);

			return resolve("Downloaded " + finalFileName);

		}catch(error){

			return reject(error);

		}

	})
	
}