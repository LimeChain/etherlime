const colors = require('../../utils/colors');
const JSONRPCDeployer = require('../jsonrpc-deployer/jsonrpc-private-key-deployer');
const ganacheSetupConfig = require('../../cli-commands/ganache/setup');
const isNumber = require('../../utils/number-utils').isNumber;



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
		const nodeUrl = `http://localhost:${port}/`;
		super(privateKey, nodeUrl, defaultOverrides);
		this._validateNodePort(port);
		this.nodeUrl = nodeUrl;
		console.log(`GanacheCLi Deployer Network: ${colors.colorNetwork(this.nodeUrl)}`)
	}

	toString() {
		const superString = super.toString();
		return `Network: ${colors.colorNetwork(this.nodeUrl)}\n${superString}`;
	}

	_validateNodePort(port) {
		if (!(isNumber(port))) {
			throw new Error(`Passed port (${port}) is not valid port`);
		}
	}
}

module.exports = EtherlimeGanacheDeployer;