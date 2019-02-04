const ethers = require('ethers');
const isAddress = require('./../utils/address-utils').isAddress;
const isSigner = require('./../utils/signer-utils').isSigner;
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
	 * @param {*} signer The signer that has deployed this contract
	 * @param {*} provider ethers provider
	 */
	constructor(contract, contractAddress, signer, provider) {
		this._validateInput(contract, contractAddress, signer, provider);
		this.contractAddress = contractAddress;
		this.signer = signer;
		this.provider = provider;
		this._contract = contract;
		this.contract = new ethers.Contract(contractAddress, contract.abi, signer);
		Object.assign(this, this.contract.functions);
		this.interface = this.contract.interface
		this.estimate = this.contract.estimate
		this.functions = this.contract.functions
		this.filters = this.contract.filters
	}

	_validateInput(contract, contractAddress, signer, provider) {
		if (!(isSigner(signer))) {
			throw new Error('Passed signer is not a valid signer instance of ethers Wallet');
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

		const transactionReceipt = await transaction.wait();
		await this._postValidateTransaction(transaction, transactionReceipt);
		const actionLabel = (transactionLabel) ? transactionLabel : this.constructor.name;
		await this._logAction(this.constructor.name, actionLabel, transaction.hash, 0, transaction.gasPrice.toString(), transactionReceipt.gasUsed.toString(), 'Successfully Waited For Transaction');
		return transactionReceipt;
	}

	async _postValidateTransaction(transaction, transactionReceipt) {
		if (transactionReceipt.status === 0) {
			await this._logAction(this.constructor.name, this._contract.contractName, transaction.hash, 1, transaction.gasPrice.toString(), transactionReceipt.gasUsed.toString(), 'Transaction failed');
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
	 * @param {*} gasPrice the gas price param that was used by this transaction
	 * @param {*} gasUsed the gas used by this transaction
	 * @param {*} result arbitrary result text
	 */
	async _logAction(deployerType, nameOrLabel, transactionHash, status, gasPrice, gasUsed, result) {
		logsStore.logAction(deployerType, nameOrLabel, transactionHash, status, gasPrice, gasUsed, result);
	}
}

module.exports = DeployedContractWrapper;