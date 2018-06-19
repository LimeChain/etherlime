const ethers = require('ethers');
const colors = require('../utils/colors');
const Wallet = ethers.Wallet;

class Deployer {
	constructor(wallet, provider, defaultOverrides) {
		if (!(wallet instanceof Wallet)) {
			throw new Error('Passed wallet is not instance of ethers Wallet');
		}

		this.wallet = wallet;
		this.provider = provider;
		this.wallet.provider = provider;

		this.defaultOverrides = defaultOverrides;
	}

	toString() {
		return this.network + this.wallet;
	}

	async deploy(contract) {

		const deploymentArguments = Array.prototype.slice.call(arguments);
		deploymentArguments.splice(0, 1);

		if (deploymentArguments.length > 0) {
			console.log(`Deploying contract: ${colors.colorName(contract.contractName)} with arguments: ${colors.colorParams(deploymentArguments)}`);
		} else {
			console.log(`Deploying contract: ${colors.colorName(contract.contractName)}`);
		}

		const deployTransaction = ethers.Contract.getDeployTransaction(contract.bytecode, contract.abi, ...deploymentArguments);

		const transaction = await this.wallet.sendTransaction(this._overrideDeployTransactionConfig(deployTransaction));

		console.log(`Waiting for transaction to be included in block and mined: ${colors.colorTransactionHash(transaction.hash)}`);
		await this.provider.waitForTransaction(transaction.hash);

		const receipt = await this.provider.getTransactionReceipt(transaction.hash);

		if (receipt.status === 0) {
			throw new Error(`Transaction ${colors.colorTransactionHash(receipt.transactionHash)} ${colors.colorFailure('failed')}. Please check etherscan for better reason explanation.`);
		}

		console.log(`Contract ${colors.colorName(contract.contractName)} deployed at address: ${colors.colorAddress(receipt.contractAddress)}`);

		return receipt.contractAddress;

	}

	_overrideDeployTransactionConfig(deployTransaction) {
		if (this.defaultOverrides === undefined) {
			return deployTransaction;
		}

		if (this.defaultOverrides.gasPrice > 0) {
			deployTransaction.gasPrice = this.defaultOverrides.gasPrice;
		}

		if (this.defaultOverrides.gasLimit > 0) {
			deployTransaction.gasLimit = this.defaultOverrides.gasLimit;
		}

		return deployTransaction;
	}
}

module.exports = Deployer;