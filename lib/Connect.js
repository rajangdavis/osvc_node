const axios = require('axios');

const config = require('./Config.js')

module.exports = { 
	
	get: function(options){
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
		let optionsFinal = config.optionsFinalize("delete",options, true);
		return _makeRequest(optionsFinal,options);
	},

}

const _makeRequest = async function(optionsFinal, printingOptions){
	
	let response = await axios(optionsFinal);
	
	if(printingOptions.debug == true){
		return response;
	}else{
		if (printingOptions.prettyPrint == true){
			return JSON.stringify(response.data, null , 4)
		}else{
			return response.data;
		}
	}
}