const ethers = require('ethers');
const isUrl = require('../../utils/url-utils').isUrl;

const PrivateKeyDeployer = require('../private-key-deployer');
const colors = require('../../utils/colors');

class JSONRPCDeployer extends PrivateKeyDeployer {

	/**
	 * 
	 * Instantiates new deployer based on the JSONRPC Provider Address (for example: 'http://localhost:8545/') and private key based deployment wallet
	 * 
	 * @param {*} privateKey the private key for the deployer wallet
	 * @param {*} nodeUrl url of the network to deploy on. This is the node url address that is given to the class
	 * @param {*} defaultOverrides [Optional] default deployment overrides
	 */
	constructor(privateKey, nodeUrl, defaultOverrides) {
		const localNodeProvider = new ethers.providers.JsonRpcProvider(nodeUrl, ethers.providers.networks.unspecified);
		super(privateKey, localNodeProvider, defaultOverrides);
		this._validation(nodeUrl);
		this.nodeUrl = nodeUrl;
		console.log(`Network: ${colors.colorNetwork(this.nodeUrl)}`)
	}

	toString() {
		const superString = super.toString();
		return `Network: ${colors.colorNetwork(this.nodeUrl)}\n${superString}`;
	}

	_validation(nodeUrl) {
		if (!(isUrl(nodeUrl))) {
			throw new Error(`Passed contract url (${isUrl}) is not valid url`);
		}
	}
}

module.exports = JSONRPCDeployer;