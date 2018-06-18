// let contracts = require('./filehandling').contracts;
const {
	contractsNames
} = require('./filehandling');

let readlineSync = require('readline-sync');
var ethers = require('ethers')
const providers = ethers.providers;
const Wallet = ethers.Wallet;



let networksToDeploy = ['testrpc', 'ropsten'];

let networkForDeploy = () => {
	const apiKey = 'H4UAAWyThMPs2WB9LsHD';
	const index = readlineSync.keyInSelect(networksToDeploy, 'Please choose a network to deploy:');
	if (networksToDeploy[index] == 'ropsten') {
		const localNodeProvider = new providers.InfuraProvider(ethers.providers.networks.ropsten, apiKey);
		provider = new providers.FallbackProvider([
			localNodeProvider
		]);
	} else if (networksToDeploy[index] == 'testrpc') {
		const localNodeProvider = new providers.JsonRpcProvider('http://localhost:8545', providers.networks.unspecified);
		provider = new providers.FallbackProvider([
			localNodeProvider
		]);
	}
}


let deploymentWalletAddress = async () => {
	const deploymentPrivateKey = readlineSync.question('Enter your private key here: ');
	const wallet = new Wallet('0x' + deploymentPrivateKey);
	wallet.provider = provider;
	return wallet;
}

let deploymentContractNameToRequire = function () {
	const contractNames = contractsNames();
	// const deploymentContractName = readlineSync.question('Enter your deployment contract name from /build/contracts: ');
	// return deploymentContractName;

	index = readlineSync.keyInSelect(contractNames, 'Which contract?');
	if (index == -1) {
		process.exit();
	}
	return contractNames[index]
}

let runDeployment = async (contractName, wallet) => {

	const contractJson = require(`./build/contracts/${contractName}`);
	let deployTransaction = ethers.Contract.getDeployTransaction(contractJson.bytecode, contractJson.abi);
	// deployTransaction.gasLimit = 20000000000;
	// deployTransaction.gasPrice = 4700000;

	let transaction = await wallet.sendTransaction(deployTransaction);
	console.log(`${contractName} Deployment Transaction is: ${transaction.hash}`);
	const result = await provider.waitForTransaction(transaction.hash);
	console.log(`The transaction is ${result}`);
	console.log(`Contract address is: ${ethers.utils.getContractAddress(transaction)}`);

	let contractAddress = ethers.utils.getContractAddress(transaction);
	return contractAddress;

}


module.exports = {
	networkForDeploy,
	deploymentWalletAddress,
	deploymentContractNameToRequire,
	runDeployment
};