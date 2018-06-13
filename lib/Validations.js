module.exports = {
	customError: (err, example) => {
		console.log("\n\033[31mError: "+ err + "\033[0m\n\n\033[33mExample:\033[0m" + example +"\n");
		throw Error(err);
	}
}