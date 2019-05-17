const { colors, isNumber } = require('etherlime-utils');
const JSONRPCDeployer = require('./../jsonrpc-deployer/jsonrpc-private-key-deployer');
const ganacheSetupConfig = require('./../setup.json');
const EtherlimeGanacheWrapper = require('./../../deployed-contract/etherlime-ganache-wrapper');
const logger = require('./../../logger-service/logger-service').logger;

class EtherlimeGanacheDeployer extends JSONRPCDeployer {
	/**
	 *
	 * Instantiates new deployer based on the GanacheCli Provider; If no privateKey and nodeUrl are specified, the deployer will be instantiated with the default values from cli-commands/ganache/setup.json
	 *
	 * @param {*} privateKey the private key for the deployer wallet/signer instance
	 * @param {*} port port number of the network to deploy on. This is the port number that is given to the class
	 * @param {*} defaultOverrides [Optional] default deployment overrides
	 */
	constructor(privateKey = ganacheSetupConfig.accounts[0].secretKey, port = ganacheSetupConfig.defaultPort, defaultOverrides) {
		EtherlimeGanacheDeployer._validatePortInput(port);

		const nodeUrl = `http://localhost:${port}/`;

		super(privateKey, nodeUrl, defaultOverrides);
		this.nodeUrl = nodeUrl;
	}

	setPort(port) {
		EtherlimeGanacheDeployer._validatePortInput(port);
		const nodeUrl = `http://localhost:${port}/`;
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

	async _waitForDeployTransaction(transaction) {
		await this.provider.send('evm_mine');
		return this.provider.getTransactionReceipt(transaction.hash);
	}

	async _generateDeploymentResult(contract, transaction, transactionReceipt) {
		logger.log(`Contract ${colors.colorName(contract.contractName)} deployed at address: ${colors.colorAddress(transactionReceipt.contractAddress)}`);
		return new EtherlimeGanacheWrapper(contract, transactionReceipt.contractAddress, this.signer, this.provider);
	}

	wrapDeployedContract(contract, contractAddress) {
		logger.log(`Wrapping contract ${colors.colorName(contract.contractName)} at address: ${colors.colorAddress(contractAddress)}`);
		return new EtherlimeGanacheWrapper(contract, contractAddress, this.signer, this.provider);
	}
}

module.exports = EtherlimeGanacheDeployer;
