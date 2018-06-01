module.exports = {
	_resultsToArray: (responseObject) => {
		if (![200,201].includes(responseObject.status)){
			return responseObject.data;
		}else{
			
			if(responseObject.data.items){
				var resultsArray = responseObject.data.items;
			}else if(responseObject.data.columnNames){
				var resultsArray = responseObject.data;
			}
			return _checkForItemsAndRows(resultsArray);
		}
	},
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