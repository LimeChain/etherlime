const colors = require('./../../utils/colors');
const JSONRPCDeployer = require('./../jsonrpc-deployer/jsonrpc-private-key-deployer');
const ganacheSetupConfig = require('./../../cli-commands/ganache/setup');
const isNumber = require('./../../utils/number-utils').isNumber;
const EtherlimeGanacheWrapper = require('./../../deployed-contract/etherlime-ganache-wrapper');
const loggerService = require('./../../logger-service/logger-service').loggerService;

let outputParameter;

class EtherlimeGanacheDeployer extends JSONRPCDeployer {
	/**
	 *
	 * Instantiates new deployer based on the GanacheCli Provider; If no privateKey and nodeUrl are specified, the deployer will be instantiated with the default values from cli-commands/ganache/setup.json
	 *
	 * @param {*} privateKey the private key for the deployer wallet
	 * @param {*} port port number of the network to deploy on. This is the port number that is given to the class
	 * @param {*} defaultOverrides [Optional] default deployment overrides
	 */
	constructor(privateKey = ganacheSetupConfig.accounts[0].secretKey, port = ganacheSetupConfig.defaultPort, defaultOverrides) {
		if (!(isNumber(port))) {
			throw new Error(`Passed port (${port}) is not valid port`);
		}
		const nodeUrl = `http://localhost:${port}/`;

		outputParameter = loggerService.getOutputParameterValue();

		super(privateKey, nodeUrl, defaultOverrides);
		this.nodeUrl = nodeUrl;
	}

	toString() {
		const superString = super.toString();
		return `Network: ${colors.colorNetwork(this.nodeUrl)}\n${superString}`;
	}


	async _waitForDeployTransaction(transaction) {
		return this.provider.send('evm_mine');
	}

	async _generateDeploymentResult(contract, transaction, transactionReceipt) {
		loggerService.record(`Contract ${colors.colorName(contract.contractName)} deployed at address: ${colors.colorAddress(transactionReceipt.contractAddress)}`, outputParameter);
		return new EtherlimeGanacheWrapper(contract, transactionReceipt.contractAddress, this.wallet, this.provider);
	}

	wrapDeployedContract(contract, contractAddress) {
		loggerService.record(`Wrapping contract ${colors.colorName(contract.contractName)} at address: ${colors.colorAddress(contractAddress)}`, outputParameter);
		return new EtherlimeGanacheWrapper(contract, contractAddress, this.wallet, this.provider);
	}
}

module.exports = EtherlimeGanacheDeployer;