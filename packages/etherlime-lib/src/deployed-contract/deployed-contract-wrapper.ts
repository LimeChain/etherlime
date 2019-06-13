import { ethers, Wallet, Contract, ContractFunction, EventFilter } from 'ethers';
import { isAddress, isSigner, isValidContract, colors } from 'etherlime-utils';
import { logsStore, logger } from 'etherlime-logger';
import { compiledContract, Generic } from '../types/types';
import { JsonRpcProvider, TransactionResponse, TransactionReceipt } from 'ethers/providers';
import { Interface, BigNumber } from 'ethers/utils';

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

	contract: Contract;
	contractAddress: string;
	signer: Wallet;
	provider: JsonRpcProvider;
	_contract: compiledContract;
	interface: Interface;
	estimate: Generic<(...params: Array<any>) => Promise<BigNumber>>;
	functions: Generic<ContractFunction>;
	filters: Generic<(...params: Array<any>) => EventFilter>;
	utils: Generic<(provider: JsonRpcProvider) => {}>;

	constructor(contract: compiledContract, contractAddress: string, signer?: Wallet, provider?: JsonRpcProvider) {
		this._validateInput(contract, contractAddress, signer);
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
		this.utils = this._generateUtils(provider)
	}

	private _generateUtils(provider: JsonRpcProvider) {
		return {
			getBalance: () => provider.getBalance(this.contractAddress)
		}
	}

	private _validateInput(contract: compiledContract, contractAddress: string, signer?: Wallet): void {
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
	async verboseWaitForTransaction(transaction: TransactionResponse, transactionLabel: string): Promise<TransactionReceipt> {

		let labelPart = (transactionLabel) ? `labeled ${colors.colorName(transactionLabel)} ` : '';
		logger.log(`Waiting for transaction ${labelPart}to be included in a block and mined: ${colors.colorTransactionHash(transaction.hash)}`);

		const transactionReceipt: TransactionReceipt = await transaction.wait();
		await this._postValidateTransaction(transaction, transactionReceipt);
		const actionLabel = (transactionLabel) ? transactionLabel : this.constructor.name;
		await this._logAction(this.constructor.name, actionLabel, transaction.hash, 0, transaction.gasPrice.toString(), transactionReceipt.gasUsed.toString(), 'Successfully Waited For Transaction');
		return transactionReceipt;
	}

	protected async _postValidateTransaction(transaction: TransactionResponse, transactionReceipt: TransactionReceipt): Promise<TransactionReceipt> {
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

	protected async _logAction(deployerType: string, nameOrLabel: string, transactionHash: string, status: number, gasPrice: string, gasUsed: string, result: string): Promise<void> {
		const network = await this.provider.getNetwork();
		logsStore.logAction(deployerType, nameOrLabel, transactionHash, status, gasPrice, gasUsed, network.chainId, result);
	}
}

export default DeployedContractWrapper;