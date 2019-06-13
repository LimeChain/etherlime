const ethers = require('ethers');
const { isUrl, colors} = require('etherlime-utils');

const PrivateKeyDeployer = require('./../private-key-deployer');
const logger = require('etherlime-logger').logger;
const COVERAGE_PROVIDER_INDEX = 1; // This is the index of the desired provider located in global.providers. We have two providers there: one for coverage which is listening for blocks and one for deploying contracts
class JSONRPCPrivateKeyDeployer extends PrivateKeyDeployer {

	/**
	 *
	 * Instantiates new deployer based on the JSONRPC Provider Address (for example: 'http://localhost:8545/') and private key based deployment wallet/signer instance
	 *
	 * @param {*} privateKey the private key for the deployer wallet/signer instance
	 * @param {*} nodeUrl url of the network to deploy on. This is the node url address that is given to the class
	 * @param {*} defaultOverrides [Optional] default deployment overrides
	 */
	constructor(privateKey, nodeUrl, defaultOverrides) {
		let localNodeProvider;
		JSONRPCPrivateKeyDeployer._validateUrlInput(nodeUrl);
		if (global.coverageSubprovider) {
			global.provider._providers[COVERAGE_PROVIDER_INDEX].rpcUrl = nodeUrl;
			localNodeProvider = new ethers.providers.Web3Provider(global.provider);
			localNodeProvider.connection.url = nodeUrl;
		} else {
			localNodeProvider = new ethers.providers.JsonRpcProvider(nodeUrl);
		}
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
