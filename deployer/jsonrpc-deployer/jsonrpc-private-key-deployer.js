const ethers = require('ethers');

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
		const localNodeProvider = new providers.JsonRpcProvider(nodeUrl, providers.networks.unspecified);
		super(privateKey, localNodeProvider, defaultOverrides);
		this.nodeUrl = nodeUrl;
		console.log(`Deployer set to ${this.nodeUrl}. Network: ${colors.colorNetwork(this.nodeUrl)}`)

	}

	toString() {
		const superString = super.toString();
		return `Deployer set to ${this.nodeUrl}. Network: ${colors.colorNetwork(this.nodeUrl)}\n${superString}`;
	}
}

module.exports = JSONRPCDeployer;