const ethers = require('ethers');

const PrivateKeyDeployer = require('../deployer/PrivateKeyDeployer');
const colors = require('../utils/colors');

class JSONrpcDeployer extends PrivateKeyDeployer {

	/**
	 * 
	 * Instantiates new deployer based on the Infura service and private key based deployment wallet
	 * 
	 * @param {*} privateKey the private key for the deployer wallet
	 * @param {*} network network to deploy on. This is the local node address that is given to the class
	 * @param {*} defaultOverrides [Optional] default deployment overrides
	 */
	constructor(privateKey, network, defaultOverrides) {
		const localNodeProvider = new providers.JsonRpcProvider(network, providers.networks.unspecified);
		super(privateKey, localNodeProvider, defaultOverrides);
		this.network = network;
		console.log(`Deployer set to ${this.network}. Network: ${colors.colorNetwork(this.network)}`)

	}

	toString() {
		const superString = super.toString();
		return `Deployer set to ${this.network}. Network: ${colors.colorNetwork(this.network)} with API Key: ${colors.colorAPIKey(this.apiKey)}\n${superString}`;
	}
}

module.exports = JSONrpcDeployer;