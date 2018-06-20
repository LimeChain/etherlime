const ethers = require('ethers');

const PrivateKeyDeployer = require('../deployer/PrivateKeyDeployer');
const colors = require('../utils/colors');

class InfuraPrivateKeyDeployer extends PrivateKeyDeployer {

	/**
	 * 
	 * Instantiates new deployer based on the Infura service and private key based deployment wallet
	 * 
	 * @param {*} privateKey the private key for the deployer wallet
	 * @param {*} network network to deploy on. Check ethers for all networks. Examples: mainnet, rinkeby, ropsten
	 * @param {*} apiKey the apiKey given to you by Infura
	 * @param {*} defaultOverrides [Optional] default deployment overrides
	 */
	constructor(privateKey, network, apiKey, defaultOverrides) {
		const infuraProvider = new ethers.providers.InfuraProvider(ethers.providers.networks[network], apiKey);
		super(privateKey, infuraProvider, defaultOverrides);
		console.log(`Deployer set to Infura. Network: ${colors.colorNetwork(network)} with API Key: ${colors.colorAPIKey(apiKey)}\n`)
		this.network = network;
		this.apiKey = apiKey;
	}

	toString() {
		const superString = super.toString();
		return `Deployer set to Infura. Network: ${colors.colorNetwork(this.network)} with API Key: ${colors.colorAPIKey(this.apiKey)}\n${superString}`;
	}
}

module.exports = InfuraPrivateKeyDeployer;