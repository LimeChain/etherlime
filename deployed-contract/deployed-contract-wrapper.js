const ethers = require('ethers');
const isAddress = require('./../utils/address-utils').isAddress;
const isValidContract = require('./../utils/contract-utils').isValidContract;
const colors = require('./../utils/colors');
const logsStore = require('./../logs-store/logs-store');
const logger = require('./../logger-service/logger-service').logger;

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
	constructor(contract, contractAddress, wallet, provider) {
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
	async verboseWaitForTransaction(transaction, transactionLabel) {

		let labelPart = (transactionLabel) ? `labeled ${colors.colorName(transactionLabel)} ` : '';
		logger.log(`Waiting for transaction ${labelPart}to be included in a block and mined: ${colors.colorTransactionHash(transaction.hash)}`);

		const gasPrice = await this.provider.getGasPrice();
		const transactionReceipt = await this._postValidateTransaction(transaction);
		const actionLabel = (transactionLabel) ? transactionLabel : this.constructor.name;
		await this._logAction(this.constructor.name, actionLabel, transaction.hash, 0, gasPrice.toString(), transactionReceipt.gasUsed.toString(), 'Successfully Waited For Transaction');
		return transactionReceipt;
	}

	async _postValidateTransaction(transaction) {
		return await this.provider.getTransactionReceipt(transaction.hash);
	}

	/**
	 *
	 * Override this for custom logging functionality
	 *
	 * @param {*} deployerType type of deployer
	 * @param {*} nameOrLabel name of the contract or label of the transaction
	 * @param {*} transactionHash transaction hash if available
	 * @param {*} status 0 - success, 1 - failure
	 * @param {*} gasPrice the gas price param that was used by this transaction
	 * @param {*} gasUsed the gas used by this transaction
	 * @param {*} result arbitrary result text
	 */
	async _logAction(deployerType, nameOrLabel, transactionHash, status, gasPrice, gasUsed, result) {
		logsStore.logAction(deployerType, nameOrLabel, transactionHash, status, gasPrice, gasUsed, result);
	}
}

module.exports = DeployedContractWrapper;