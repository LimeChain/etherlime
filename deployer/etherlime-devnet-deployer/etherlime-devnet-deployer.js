const colors = require('./../../utils/colors');
const JSONRPCDeployer = require('./../jsonrpc-deployer/jsonrpc-private-key-deployer');
const devnetSetupConfig = require('../../cli-commands/ganache/devnet-setup-privatekeys.json');
const isNumber = require('./../../utils/number-utils').isNumber;
const EtherlimeDevnetWrapper = require('./../../deployed-contract/etherlime-devnet-wrapper');
const logger = require('./../../logger-service/logger-service').logger;

class EtherlimeDevnetDeployer extends JSONRPCDeployer {
	/**
	 *
	 * Instantiates new deployer based on the GanacheCli Provider; If no privateKey and nodeUrl are specified, the deployer will be instantiated with the default values from cli-commands/ganache/setup.json
	 *
	 * @param {*} privateKey the private key for the deployer wallet
	 * @param {*} port port number of the network to deploy on. This is the port number that is given to the class
	 * @param {*} defaultOverrides [Optional] default deployment overrides
	 */
	// = ganacheSetupConfig.accounts[0].secretKey
	constructor(privateKey, port = devnetSetupConfig.defaultPort, defaultOverrides) {
		EtherlimeDevnetDeployer._validatePortInput(port);
		const nodeUrl = `${devnetSetupConfig.defaultHost}:${port}/`;

		super(privateKey, nodeUrl, defaultOverrides);
		this.nodeUrl = nodeUrl;
	}

	setPort(port) {
		EtherlimeDevnetDeployer._validatePortInput(port);
		const nodeUrl = `${devnetSetupConfig.defaultHost}:${port}/`;
		this.setNodeUrl(nodeUrl);
	}

	static _validatePortInput(port) {
		if (!isNumber(port)) {
			throw new Error(`Passed port (${port}) is not valid port`);
		}
	}

	toString() {
		const superString = super.toString();
		return `Network: ${colors.colorNetwork(this.nodeUrl)}\n${superString}`;
	}

	async _generateDeploymentResult(contract, transaction, transactionReceipt) {
		logger.log(`Contract ${colors.colorName(contract.contractName)} deployed at address: ${colors.colorAddress(transactionReceipt.contractAddress)}`);
		return await new EtherlimeDevnetWrapper(contract, transactionReceipt.contractAddress, this.wallet, this.provider);
	}

	wrapDeployedContract(contract, contractAddress) {
		logger.log(`Wrapping contract ${colors.colorName(contract.contractName)} at address: ${colors.colorAddress(contractAddress)}`);
		return new EtherlimeDevnetWrapper(contract, contractAddress, this.wallet, this.provider);
	}
}

module.exports = EtherlimeDevnetDeployer;
