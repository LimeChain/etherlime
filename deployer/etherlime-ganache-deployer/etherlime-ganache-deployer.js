const colors = require('./../../utils/colors');
const JSONRPCDeployer = require('./../jsonrpc-deployer/jsonrpc-private-key-deployer');
const ganacheSetupConfig = require('./../../cli-commands/ganache/setup');
const isNumber = require('./../../utils/number-utils').isNumber;
const EtherlimeGanacheWrapper = require('./../../deployed-contract/etherlime-ganache-wrapper');
const logger = require('./../../logger-service/logger-service').logger;
const setPrivateKey = require('./../../utils/default-utils').setPrivateKey;
const setPort = require('./../../utils/default-utils').setPort;
const setDefaultOverrides = require('./../../utils/default-utils').setDefaultOverrides;

class EtherlimeGanacheDeployer extends JSONRPCDeployer {
	/**
	 *
	 * Instantiates new deployer based on the GanacheCli Provider; If no privateKey and nodeUrl are specified, the deployer will be instantiated with the default values from cli-commands/ganache/setup.json
	 *
	 * @param {*} privateKey the private key for the deployer wallet
	 * @param {*} port port number of the network to deploy on. This is the port number that is given to the class
	 * @param {*} defaultOverrides [Optional] default deployment overrides
	 */
	constructor(privateKey = this.privateKey, port = this.port, defaultOverrides = this.defaultOverrides) {
		if (!(isNumber(setPort(port)))) {
			throw new Error(`Passed port (${port}) is not valid port`);
		}
		
		const nodeUrl = `http://localhost:${setPort(port)}/`;

		super(setPrivateKey(privateKey), nodeUrl, setDefaultOverrides(defaultOverrides));
		this.nodeUrl = nodeUrl;
	}

	set privateKey(privateKey) {
		this.privateKey = (privateKey) ? privateKey : ganacheSetupConfig.accounts[0].secretKey;
	}

	set port(port) {
		this.port = (port) ? port : ganacheSetupConfig.defaultPort;
	}

	set defaultOverrides(defaultOverrides) {
		this.port = (defaultOverrides) ? defaultOverrides : undefined;
	}

	toString() {
		const superString = super.toString();
		return `Network: ${colors.colorNetwork(this.nodeUrl)}\n${superString}`;
	}


	async _waitForDeployTransaction(transaction) {
		await this.provider.send('evm_mine');
		return this.provider.getTransactionReceipt(transaction.hash);
	}

	async _generateDeploymentResult(contract, transaction, transactionReceipt) {
		logger.log(`Contract ${colors.colorName(contract.contractName)} deployed at address: ${colors.colorAddress(transactionReceipt.contractAddress)}`);
		return new EtherlimeGanacheWrapper(contract, transactionReceipt.contractAddress, this.wallet, this.provider);
	}

	wrapDeployedContract(contract, contractAddress) {
		logger.log(`Wrapping contract ${colors.colorName(contract.contractName)} at address: ${colors.colorAddress(contractAddress)}`);
		return new EtherlimeGanacheWrapper(contract, contractAddress, this.wallet, this.provider);
	}
}

module.exports = EtherlimeGanacheDeployer;