import { Wallet, ContractFactory, utils, providers } from 'ethers';
import { colors, isSigner, isValidContract, isValidLibrary, isValidBytecode, linkLibrary } from 'etherlime-utils';
import DeployedContractWrapper from './../deployed-contract/deployed-contract-wrapper';
import { logsStore, logger } from 'etherlime-logger';
import { TxParams, CompiledContract, Generic } from './../types/types';

declare var Verifier: any;

class Deployer {

	/**
	 *
	 * Instantiates new deployer. You probably should not use this class directly but use something inheriting this
	 *
	 * @param {*} signer ethers.Wallet instance
	 * @param {*} provider ethers.provider instance
	 * @param {*} defaultOverrides [Optional] default deployment overrides
	 */

	signer: Wallet;
	provider: providers.JsonRpcProvider | providers.Web3Provider;
	defaultOverrides: TxParams;

	constructor(signer: Wallet, provider: providers.JsonRpcProvider | providers.Web3Provider, defaultOverrides?: TxParams) {
		this._validateInput(signer);

		this.signer = signer;
		this.provider = provider;
		this.signer = this.signer.connect(this.provider);
		this.defaultOverrides = defaultOverrides;
		logsStore.initHistoryRecord();
	}

	setSigner(signer: Wallet): void {
		this._validateInput(signer);
		this.signer = signer;
		this.signer = this.signer.connect(this.provider);
	}

	setProvider(provider: providers.JsonRpcProvider): void {
		this.provider = provider;
		this.signer = this.signer.connect(this.provider);
	}

	setDefaultOverrides(defaultOverrides: TxParams): void {
		this.defaultOverrides = defaultOverrides;
	}

	setVerifierApiKey(etherscanApiKey: string): void {
		if (!this.defaultOverrides) {
			this.defaultOverrides = {}
		}

		this.defaultOverrides.etherscanApiKey = etherscanApiKey;
	}

	private _validateInput(signer): void {
		if (!(isSigner(signer))) {
			throw new Error('Passed signer is not valid signer instance of ethers Wallet');
		}
	}

	/**
	 *
	 * Use this function to deploy a contract.
	 *
	 * @return DeploymentResult object
	 *
	 * @param {*} contract the contract object to be deployed. Must have at least abi and bytecode fields. For now use the .json file generated from etherlime compile
	 */

	async deploy(contract: CompiledContract, libraries?: Generic<string>, ...args): Promise<DeployedContractWrapper> {
		const deploymentArguments = Array.prototype.slice.call(args);

		const { contractCopy, transaction, transactionReceipt, deploymentResult } = await this._prepareAndDeployTransaction(contract, libraries, deploymentArguments);
		await this._logAction(this.constructor.name, contractCopy.contractName, transaction.hash, 0, transaction.gasPrice.toString(), transactionReceipt.gasUsed.toString(), deploymentResult.contractAddress, deploymentResult._contract.compiler ? deploymentResult._contract.compiler.version : null, false);
		return deploymentResult;
	}


	async deployAndVerify(contract: CompiledContract, libraries?: Generic<string>, ...args): Promise<DeployedContractWrapper> {
		if (!this.defaultOverrides || !this.defaultOverrides.etherscanApiKey) {
			throw new Error('Please provide Etherscan API key!')
		}
		const deploymentArguments = Array.prototype.slice.call(args);

		const { contractCopy, transaction, transactionReceipt, deploymentResult } = await this._prepareAndDeployTransaction(contract, libraries, deploymentArguments);

		const verification = await Verifier.verifySmartContract(deploymentResult, deploymentArguments, libraries, this.defaultOverrides);

		await this._logAction(this.constructor.name, contractCopy.contractName, transaction.hash, 0, transaction.gasPrice.toString(), transactionReceipt.gasUsed.toString(), deploymentResult.contractAddress, deploymentResult._contract.compiler ? deploymentResult._contract.compiler.version : null, verification);

		return deploymentResult;
	}

	private async _prepareAndDeployTransaction(contract: CompiledContract, libraries?: Generic<string>, deploymentArguments?: any[]):
		Promise<{ contractCopy: CompiledContract, transaction: providers.TransactionResponse, transactionReceipt: providers.TransactionReceipt, deploymentResult: DeployedContractWrapper }> {

		await this._preValidateArguments(contract, deploymentArguments);

		let contractCopy = JSON.parse(JSON.stringify(contract));

		contractCopy.bytecode = await this._prepareBytecode(libraries, contractCopy.bytecode);

		let deployTransaction = await this._prepareDeployTransaction(contractCopy, deploymentArguments);
		deployTransaction = await this._overrideDeployTransactionConfig(deployTransaction);

		const transaction = await this._sendDeployTransaction(deployTransaction);

		const transactionReceipt = await this._waitForDeployTransaction(transaction);

		await this._postValidateTransaction(contractCopy, transaction, transactionReceipt);

		const deploymentResult = await this._generateDeploymentResult(contractCopy, transaction, transactionReceipt);

		return { contractCopy, transaction, transactionReceipt, deploymentResult }
	}

	/**
	 *
	 * Override for custom pre-send validation
	 *
	 * @param {*} contract the contract to be deployed
	 * @param {*} deploymentArguments the deployment arguments
	 */
	protected async _preValidateArguments(contract: CompiledContract, deploymentArguments: any[]): Promise<void> {
		if (!(isValidContract(contract))) {
			await this._logAction(this.constructor.name, contract ? contract.contractName : 'No contract name', '', 1, '-', '-', 'Invalid contract object', '-', false);
			throw new Error(`Passed contract is not a valid contract object. It needs to have bytecode, abi and contractName properties`);
		}

		if (!isValidBytecode(contract.bytecode)) {
			throw new Error(`The bytecode is invalid. It should be of type string with length bigger than 0`);
		}

		const deployContractStart = `\nDeploying contract: ${colors.colorName(contract.contractName)}`;
		const argumentsEnd = (deploymentArguments.length === 0) ? '' : ` with parameters: ${colors.colorParams(deploymentArguments)}`;

		logger.log(`${deployContractStart}${argumentsEnd}`);
	}

	/**
	 *
	 * Override this to include custom logic for deploy transaction generation
	 *
	 * @param {*} contract the contract to be deployed
	 * @param {*} deploymentArguments the arguments to this contract
	 */
	private async _prepareDeployTransaction(contract: CompiledContract, deploymentArguments: any[]):
		Promise<utils.UnsignedTransaction> {
		let factory = new ContractFactory(contract.abi, contract.bytecode);
		return factory.getDeployTransaction(...deploymentArguments);
	}

	/**
	 *
	 * Override this for custom deploy transaction configuration
	 *
	 * @param {*} deployTransaction the transaction that is to be overridden
	 */
	protected async _overrideDeployTransactionConfig(deployTransaction: utils.UnsignedTransaction):
		Promise<utils.UnsignedTransaction> {
		if (this.defaultOverrides === undefined) {
			return deployTransaction;
		}

		if (this.defaultOverrides.gasPrice > 0) {
			deployTransaction.gasPrice = this.defaultOverrides.gasPrice;
		}

		if (this.defaultOverrides.gasLimit > 0) {
			deployTransaction.gasLimit = this.defaultOverrides.gasLimit;
		}
		if (this.defaultOverrides.chainId !== undefined) {
			deployTransaction.chainId = this.defaultOverrides.chainId;
		}
		return deployTransaction;

	}

	/**
	 *
	 * Override this to include custom logic for sending the deploy transaction
	 *
	 * @param {*} deployTransaction the transaction that is to be sent
	 */
	private async _sendDeployTransaction(deployTransaction: providers.TransactionRequest): Promise<providers.TransactionResponse> {
		return this.signer.sendTransaction(deployTransaction);
	}

	/**
	 *
	 * Override this to include custom logic for waiting for deployed transaction. For example you could trigger mined block for testrpc/ganache-cli
	 *
	 * @param {*} transaction The sent transaction object to be waited for
	 */
	protected async _waitForDeployTransaction(transaction: providers.TransactionResponse): Promise<providers.TransactionReceipt> {
		logger.log(`Waiting for transaction to be included in a block and mined: ${colors.colorTransactionHash(transaction.hash)}`);
		return transaction.wait();
	}

	/**
	 *
	 * @param {*} contract the contract being deployed
	 * @param {*} transaction the transaction object being sent
	 * @param {*} transactionReceipt the transaction receipt
	 */
	protected async _postValidateTransaction(contract: CompiledContract, transaction: providers.TransactionResponse, transactionReceipt: providers.TransactionReceipt):
		Promise<void> {
		if (transactionReceipt.status === 0) {
			await this._logAction(this.constructor.name, contract.contractName, transaction.hash, 1, transaction.gasPrice.toString(), transactionReceipt.gasUsed.toString(), 'Transaction failed', '-', false);
			throw new Error(`Transaction ${colors.colorTransactionHash(transactionReceipt.transactionHash)} ${colors.colorFailure('failed')}. Please check etherscan for better reason explanation.`);
		}
	}

	/**
	 *
	 * Override this for custom deployment result objects
	 *
	 * @param {*} contract the contract that has been deployed
	 * @param {*} transaction the transaction object that was sent
	 * @param {*} transactionReceipt the transaction receipt
	 */
	protected async _generateDeploymentResult(contract: CompiledContract, transaction: providers.TransactionResponse, transactionReceipt: providers.TransactionReceipt):
		Promise<DeployedContractWrapper> {
		logger.log(`Contract ${colors.colorName(contract.contractName)} deployed at address: ${colors.colorAddress(transactionReceipt.contractAddress)}`);
		return new DeployedContractWrapper(contract, transactionReceipt.contractAddress, this.signer, this.provider);
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

	protected async _logAction(deployerType: string, nameOrLabel: string, transactionHash: string, status: number, gasPrice: string, gasUsed: string, result: string, solcVersion: string, verification: boolean):
	Promise<void> {
		const network = await this.provider.getNetwork();
		logsStore.logAction(deployerType, nameOrLabel, transactionHash, status, gasPrice, gasUsed, network.chainId, result, solcVersion, verification);
	}

	/**
	 *
	 * Use this method to wrap an existing address in DeployedContractWrapper. You can use the goodies of the DeployedContractWrapper the same way you can do with a contract you've just deployed.
	 *
	 * @dev Useful for upgradability
	 *
	 * @param {*} contract
	 * @param {*} contractAddress
	 *
	 * @return
	 */
	wrapDeployedContract(contract: CompiledContract, contractAddress: string): DeployedContractWrapper {
		logger.log(`Wrapping contract ${colors.colorName(contract.contractName)} at address: ${colors.colorAddress(contractAddress)}`);
		return new DeployedContractWrapper(contract, contractAddress, this.signer, this.provider);
	}

	/**
	 *
	 * Use this estimate deployment gas cost for given transaction
	 *
	 * @return the gas it is going to cost
	 *
	 * @param {*} contract the contract object to be deployed. Must have at least abi and bytecode fields. For now use the .json file generated from etherlime compile. Add the deployment params as comma separated values
	 */
	async estimateGas(contract: CompiledContract, libraries?: Generic<string>, ...args): Promise<string> {
		const deploymentArguments = Array.prototype.slice.call(args);

		await this._preValidateArguments(contract, deploymentArguments);

		let contractCopy = JSON.parse(JSON.stringify(contract));

		contractCopy.bytecode = await this._prepareBytecode(libraries, contractCopy.bytecode);

		let deployTransaction = await this._prepareDeployTransaction(contractCopy, deploymentArguments);

		const gasBN = await this._estimateTransactionGas(deployTransaction);

		return gasBN.toString();

	}

	private async _estimateTransactionGas(transaction: providers.TransactionRequest): Promise<utils.BigNumber> {
		return this.provider.estimateGas(transaction);
	}

	/**
	 *
	 * Link a library or number of libraries to a contract
	 *
	 * @param {*} libraries The libraries which will be linked to the contract
	 * @param {*} bytecode The contract's bytecode which be used for linking
	 */
	private async _prepareBytecode(libraries: Generic<string>, bytecode: string): Promise<string> {
		if (isValidLibrary(libraries)) {
			return await linkLibrary(libraries, bytecode);
		}

		return bytecode;
	}
}

export default Deployer;
