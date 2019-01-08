const ethers = require('ethers');
const isUrl = require('./../../utils/url-utils').isUrl;

const PrivateKeyDeployer = require('./../private-key-deployer');
const colors = require('./../../utils/colors');
const logger = require('./../../logger-service/logger-service').logger;

class JSONRPCPrivateKeyDeployer extends PrivateKeyDeployer {

	/**
	 *
	 * Instantiates new deployer based on the JSONRPC Provider Address (for example: 'http://localhost:8545/') and private key based deployment wallet
	 *
	 * @param {*} privateKey the private key for the deployer wallet
	 * @param {*} nodeUrl url of the network to deploy on. This is the node url address that is given to the class
	 * @param {*} defaultOverrides [Optional] default deployment overrides
	 */
	constructor(privateKey, nodeUrl, defaultOverrides) {
		JSONRPCPrivateKeyDeployer._validateUrlInput(nodeUrl);

		const localNodeProvider = new ethers.providers.JsonRpcProvider(nodeUrl);
		super(privateKey, localNodeProvider, defaultOverrides);
		this.nodeUrl = nodeUrl;

		logger.log(`JSONRPC Deployer Network: ${colors.colorNetwork(this.nodeUrl)}`);
	}

	setNodeUrl(nodeUrl) {
		JSONRPCPrivateKeyDeployer._validateUrlInput(nodeUrl);

		const localNodeProvider = new ethers.providers.JsonRpcProvider(nodeUrl);
		this.setProvider(localNodeProvider);
		this.nodeUrl = nodeUrl;
	}

	static _validateUrlInput(nodeUrl) {
		if (!(isUrl(nodeUrl))) {
			throw new Error(`Passed contract url (${nodeUrl}) is not valid url`);
		}
	}

	toString() {
		const superString = super.toString();
		return `Network: ${colors.colorNetwork(this.nodeUrl)}\n${superString}`;
	}
}

module.exports = JSONRPCPrivateKeyDeployer;
