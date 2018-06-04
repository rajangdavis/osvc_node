module.exports = {
	_resultsToArray: (responseObject) => {
		
		if(responseObject.items){
			var resultsArray = responseObject.items;
		}else if(responseObject.columnNames){
			var resultsArray = responseObject;
		}
		return _checkForItemsAndRows(resultsArray);
	},

	_printCorrectly: (printingOptions,response) => {

		if(printingOptions.debug == true){
			return response;
		}

		if (printingOptions.prettyPrint == true){
			return JSON.stringify(response.data, null , 4)
		}else{
			return response.data;
		}
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