const Connect = require('./Connect.js')

module.exports = {

	query:(options,callback) => {
		options.url = 'queryResults/?query=' + options['query']
		Connect.get(options,(err,response,body) => {
			return callback(err,_resultsToArray(body));
		});
	}, 
	
	query_unsorted:(options,callback) => {
		options.url = 'queryResults/?query=' + options['query'];
		return Connect.get(options,callback);
	}

}

const _resultsToArray = (responseObject) => {
	if (![200,201].includes(responseObject.statusCode)){
		return responseObject.body;
	}else{
		let results = responseObject.body.items.map(function(item){
			return _iterateThroughRows(item);
		});
		return _resultsAdjustment(results);
	}
}

const _resultsAdjustment = (finalArr)=>{
	if(finalArr.length == 1 && finalArr instanceof Array ){
		return finalArr[0];
	}else{
		return finalArr;
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