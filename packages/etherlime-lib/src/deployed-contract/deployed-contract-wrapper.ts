import { Wallet, Contract, ContractFunction, EventFilter, providers, utils } from 'ethers';
import { isAddress, isSigner, isValidContract, colors } from 'etherlime-utils';
import { logsStore, logger } from 'etherlime-logger';
import { CompiledContract, Generic } from '../types/types';

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
	provider: providers.JsonRpcProvider;
	_contract: CompiledContract;
	interface: utils.Interface;
	estimate: Generic<(...params: Array<any>) => Promise<utils.BigNumber>>;
	functions: Generic<ContractFunction>;
	filters: Generic<(...params: Array<any>) => EventFilter>;
	utils: Generic<(provider: providers.JsonRpcProvider) => {}>;

	constructor(contract: CompiledContract, contractAddress: string, signer?: Wallet, provider?: providers.JsonRpcProvider) {
		this._validateInput(contract, contractAddress, signer);
		this.contractAddress = contractAddress;
		this.signer = signer;
		this.provider = provider;
		this._contract = contract;
		this.contract = new Contract(contractAddress, contract.abi, signer);
		Object.assign(this, this.contract.functions);
		this.interface = this.contract.interface
		this.estimate = this.contract.estimate
		this.functions = this.contract.functions
		this.filters = this.contract.filters
		this.utils = this._generateUtils(provider)
	}

	private _generateUtils(provider: providers.JsonRpcProvider) {
		return {
			getBalance: () => provider.getBalance(this.contractAddress)
		}
	}

	private _validateInput(contract: CompiledContract, contractAddress: string, signer?: Wallet): void {
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
	async verboseWaitForTransaction(transaction: providers.TransactionResponse, transactionLabel: string): Promise<providers.TransactionReceipt> {

		let labelPart = (transactionLabel) ? `labeled ${colors.colorName(transactionLabel)} ` : '';
		logger.log(`Waiting for transaction ${labelPart}to be included in a block and mined: ${colors.colorTransactionHash(transaction.hash)}`);

		const transactionReceipt: providers.TransactionReceipt = await transaction.wait();
		await this._postValidateTransaction(transaction, transactionReceipt);
		const actionLabel = (transactionLabel) ? transactionLabel : this.constructor.name;
		await this._logAction(this.constructor.name, actionLabel, transaction.hash, 0, transaction.gasPrice.toString(), transactionReceipt.gasUsed.toString(), 'Successfully Waited For Transaction');
		return transactionReceipt;
	}

	protected async _postValidateTransaction(transaction: providers.TransactionResponse, transactionReceipt: providers.TransactionReceipt): Promise<providers.TransactionReceipt> {
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