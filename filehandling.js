var fs = require('fs');
var exec = require('child_process').exec;

// run truffle compile if there is contracts in the contracts folder
let truffleCompile = async () => {
	if (fs.existsSync('./contracts')) {
		var child;
		// executes `pwd`
		child = exec("truffle compile", function (error, stdout, stderr) {

			if (error !== null) {
				console.log('exec error: ' + error);
			}
			console.log(stdout);
			console.log(stderr);
		});
	} else {
		console.log('No Smart Contracts Found');
		return;
	}
}


// return the name of the contracts in the build folder

let contracts = [];
let contractsNames = () => {
	const buildFolder = './build/contracts';
	fs.readdirSync(buildFolder).forEach(file => {
		contracts.push(file.split('.')[0]);
	})
	return contracts;
}



// exports.contracts = contracts;
module.exports = {
	truffleCompile,
	contractsNames
};