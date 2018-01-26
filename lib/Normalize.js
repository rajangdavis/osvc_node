module.exports = {
	_resultsToArray: (responseObject) => {
		if (![200,201].includes(responseObject.statusCode)){
			return responseObject.body;
		}else{
			
			if(responseObject.body.items){
				var resultsArray = responseObject.body.items;
			}else if(responseObject.body.columnNames){
				var resultsArray = responseObject.body;
			}
			
			if(resultsArray.rows){
				return _iterateThroughRows(resultsArray);
			}else{
				let results = resultsArray.map(function(item){
					return _iterateThroughRows(item);
				});
				return _resultsAdjustment(results);
			}

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