const ethers = require('ethers');
const isAddress = require('../utils/address-utils').isAddress;
const isValidContract = require('../utils/contract-utils').isValidContract;
const colors = require('../utils/colors');
const logsStore = require('../logs-store/logs-store');

class DeployedContractWrapper {


	/**
	 * 
	 * Object representing deployed contract allowing user to interact with deployed contracts
	 * 
	 * @param {*} contract The deployed contract descriptor
	 * @param {*} contractAddress The address of the deployed contract
	 * @param {*} wallet The wallet that has deployed this contract
	 * @param {*} provider ethers provider
	 */
	constructor(contract, contractAddress, wallet, provider, transactionHash) {
		this._validateInput(contract, contractAddress, wallet, provider);
		this.contractAddress = contractAddress;
		this.wallet = wallet;
		this.provider = provider;
		this._contract = contract;
		this.contract = new ethers.Contract(contractAddress, contract.abi, wallet);
	}

	_validateInput(contract, contractAddress, wallet, provider) {
		if (!(wallet instanceof ethers.Wallet)) {
			throw new Error('Passed wallet is not instance of ethers Wallet');
		}

		if (!(isAddress(contractAddress))) {
			throw new Error(`Passed contract address (${contractAddress}) is not valid address`);
		}

		if (!(isValidContract(contract))) {
			throw new Error(`Passed contract is not a valid contract object. It needs to have bytecode, abi and contractName properties`);
		}
	}

	/**
	 * 
	 * Use this method to wait for transaction and print verbose logs
	 * 
	 * @param {*} transactionHash The transaction hash you are waiting for
	 * @param {*} transactionLabel [Optional] A human readable label to help you differentiate you transaction
	 */
	async verboseWaitForTransaction(transactionHash, transactionLabel) {

		let labelPart = (transactionLabel) ? `labeled ${colors.colorName(transactionLabel)} ` : '';
		console.log(`Waiting for transaction ${labelPart}to be included in a block and mined: ${colors.colorTransactionHash(transactionHash)}`);

		const transactionResult = await this.provider.waitForTransaction(transactionHash);
		const transactionReceipt = await this._postValidateTransaction(transactionHash, transactionResult);
		const actionLabel = (transactionLabel) ? transactionLabel : this.constructor.name;
		await this._logAction(this.constructor.name, actionLabel, transactionHash, 0, transactionResult.gasPrice.toString(), transactionReceipt.gasUsed.toString(), 'Successfully Waited For Transaction');
		return transactionResult;
	}

	async _postValidateTransaction(transactionHash, transactionResult) {
		const transactionReceipt = await this.provider.getTransactionReceipt(transactionHash);
		if (transactionReceipt.status === 0) {
			await this._logAction(this.constructor.name, this._contract.contractName, transactionHash, 1, transactionResult.gasPrice.toString(), transactionReceipt.gasUsed.toString(), 'Transaction failed');
			throw new Error(`Transaction ${colors.colorTransactionHash(transactionReceipt.transactionHash)} ${colors.colorFailure('failed')}. Please check etherscan for better reason explanation.`);
		}
		return transactionReceipt;
	}

	/**
	 * 
	 * Override this for custom logging functionality
	 * 
	 * @param {*} deployerType type of deployer
	 * @param {*} nameOrLabel name of the contract or label of the transaction
	 * @param {*} transactionHash transaction hash if available
	 * @param {*} status 0 - success, 1 - failure
	 * @param {*} result arbitrary result text
	 */
	async _logAction(deployerType, nameOrLabel, transactionHash, status, gasPrice, gasUsed, result) {
		logsStore.logAction(deployerType, nameOrLabel, transactionHash, status, gasPrice, gasUsed, result);
	}
}

module.exports = DeployedContractWrapper;