const axios = require('axios');

const config = require('./Config.js')

module.exports = { 
	
	get: async (options) => {
		let optionsFinal = config.optionsFinalize("get",options);
		return _makeRequest(optionsFinal,options);
	},

	post: async(options) => {
		let optionsFinal = config.optionsFinalize("post",options);
		return _makeRequest(optionsFinal,options);
	},

	patch: async(options) => {
		let optionsFinal = config.optionsFinalize("post",options, true);
		return _makeRequest(optionsFinal,options);
	},

	delete: async(options) => {
		let optionsFinal = config.optionsFinalize("delete",options, true);
		return _makeRequest(optionsFinal,options);
	},

}

const _makeRequest = async (optionsFinal, printingOptions) => {
	
	let returnJson = (printingOptions.debug != undefined && printingOptions.debug == true) ? false : true;
	
	let prettyPrint = (printingOptions.prettyPrint != undefined && printingOptions.prettyPrint == true) ? true : false;
	
	let response = await axios(optionsFinal);
	
	if(returnJson == true){
		if (prettyPrint== true){
			return JSON.stringify(response.data, null , 4)
		}else{
			return response.data;
		}
	}else{
		return response;
	}
}