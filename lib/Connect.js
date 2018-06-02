const axios = require('axios');

const config = require('./Config.js')

module.exports = { 
	
	get: async  function(options){
		let optionsFinal = config.optionsFinalize("get",options);
		return _makeRequest(optionsFinal,options);
	},

	post: async function(options){
		let optionsFinal = config.optionsFinalize("post",options);
		return _makeRequest(optionsFinal,options);
	},

	patch: async function(options){
		let optionsFinal = config.optionsFinalize("post",options, true);
		return _makeRequest(optionsFinal,options);
	},

	delete: async function(options){
		let optionsFinal = config.optionsFinalize("delete",options, true);
		return _makeRequest(optionsFinal,options);
	},

}

const _setOptions = function(printingOptions){
	
	let returnJson = (printingOptions.debug != undefined && printingOptions.debug == true) ? false : true;
	
	let prettyPrint = (printingOptions.prettyPrint != undefined && printingOptions.prettyPrint == true) ? true : false;
	
	return [returnJson,prettyPrint];
}

const _makeRequest = async function(optionsFinal, printingOptions){
	
	let printingOptionsFinal = _setOptions(printingOptions)
	
	let response = await axios(optionsFinal);
	
	if(printingOptionsFinal[0] == true){
		if (printingOptionsFinal[1] == true){
			return JSON.stringify(response.data, null , 4)
		}else{
			return response.data;
		}
	}else{
		return response;
	}
}