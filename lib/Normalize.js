module.exports = {

	_printCorrectly: (printingOptions,response) => {

		if(printingOptions.debug == true){
			return response;
		}

		if (printingOptions.prettyPrint == true){
			return JSON.stringify(response.data, null , 4)
		}else{
			return response.data;
		}
	},

	_printMetaCorrectly: (options, objToModify) =>{

		if(options.prettyPrint == true){

			let stringData = typeof objToModify == "string" ? objToModify : JSON.stringify(objToModify);
			let parsedJSON = JSON.parse(stringData);
			var parsedResponse = _resultsToArray(parsedJSON);
			if(options.queries == undefined){
				var finalObj = JSON.stringify(parsedResponse,null,4);
			}else{
				var finalObj = parsedResponse;			
			}
		}else{
			var finalObj = _resultsToArray(objToModify);
		}

		return finalObj;
	}
}

const _iterateThroughRows = (item) =>{
	let resultsArray = [];
	item.rows.map(function(row,rowIndex){
		let resultHash = {};
		item.columnNames.map(function(column,columnIndex){
			return resultHash[column] = row[columnIndex];
		})
		resultsArray.push(resultHash);
	});
	return resultsArray;
}

const _resultsAdjustment = (finalArr)=>{
	if(finalArr.length == 1 && finalArr instanceof Array ){
		return finalArr[0];
	}else{
		return finalArr;
	}
}

const _resultsToArray = (responseObject)=>{
	if(responseObject.status && ![200,201].includes(responseObject.status)){
		return responseObject;
	}
	if(responseObject.items){
		var resultsArray = responseObject.items;
	}else if(responseObject.columnNames){
		var resultsArray = responseObject;
	}
	return _checkForItemsAndRows(resultsArray);
}

const _checkForItemsAndRows = (resultsArray) =>{

	if(resultsArray.rows){
		return _iterateThroughRows(resultsArray);
	}else{
		let results = resultsArray.map(function(item){
			return _iterateThroughRows(item);
		});
		return _resultsAdjustment(results);
	}
}
