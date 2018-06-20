const ethers = require('ethers');

const PrivateKeyDeployer = require('../deployer/PrivateKeyDeployer');
const colors = require('../utils/colors');

class JSONrpcDeployer extends PrivateKeyDeployer {

	/**
	 * 
	 * Instantiates new deployer based on the Local Node Provider Address (for example: 'http://localhost:8545/') and private key based deployment wallet
	 * 
	 * @param {*} privateKey the private key for the deployer wallet
	 * @param {*} nodeLink network to deploy on. This is the local node address that is given to the class
	 * @param {*} defaultOverrides [Optional] default deployment overrides
	 */
	constructor(privateKey, nodeLink, defaultOverrides) {
		const localNodeProvider = new providers.JsonRpcProvider(nodeLink, providers.networks.unspecified);
		super(privateKey, localNodeProvider, defaultOverrides);
		this.nodeLink = nodeLink;
		console.log(`Deployer set to ${this.nodeLink}. Network: ${colors.colorNetwork(this.nodeLink)}`)

	}

	toString() {
		const superString = super.toString();
		return `Deployer set to ${this.nodeLink}. Network: ${colors.colorNetwork(this.nodeLink)}\n${superString}`;
	}
}

module.exports = JSONrpcDeployer;