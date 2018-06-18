const {
	networkForDeploy,
	deploymentWalletAddress,
	deploymentContractNameToRequire,
	runDeployment
} = require('./provider');

// const {
// 	truffleCompile
// } = require('./filehandling');
// run = async () => {
// 	const truffle = await truffleCompile();
// 	const wallet = deploymentWalletAddress();

// 	const contractName = await deploymentContractNameToRequire();

// 	const contractJson = require(`./build/contracts/${contractName}`);

// 	console.log(contractJson)
// }

// run();
var fs = require('fs');
var exec = require('child_process').exec;

let truffleCompile = () => {
	if (fs.existsSync('./contracts')) {
		var child;
		// executes `truffle compile`
		child = exec("truffle compile", async function (error) {
			if (error !== null) {
				throw new Error(error.message);

			}
			networkForDeploy();
			const wallet = await deploymentWalletAddress();

			const contractName = deploymentContractNameToRequire();

			// const contractJson = require(`./build/contracts/${contractName}`);

			// console.log(contractJson)

			// const deployedTransaction = deployTransaction(contractJson.bytecode, contractJson.abi);

			const result = await runDeployment(contractName, wallet);
			console.log(result);
		});
	} else {
		console.log('No Smart Contracts Found');
		return;
	}
}

module.exports = {
	truffleCompile
}