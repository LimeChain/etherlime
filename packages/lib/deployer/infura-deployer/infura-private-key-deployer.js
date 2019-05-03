const ethers = require('ethers');

const PrivateKeyDeployer = require('./../private-key-deployer');
const colors = require('utils').colors;
const logger = require('logger').logger;

class InfuraPrivateKeyDeployer extends PrivateKeyDeployer {

	/**
	 *
	 * Instantiates new deployer based on the Infura service and private key based deployment wallet/signer instance
	 *
	 * @param {*} privateKey the private key for the deployer wallet/signer instance
	 * @param {*} network network to deploy on. Check ethers for all networks. Examples: mainnet, rinkeby, ropsten
	 * @param {*} apiKey the apiKey given to you by Infura
	 * @param {*} defaultOverrides [Optional] default deployment overrides
	 */
	constructor(privateKey, network, apiKey, defaultOverrides) {
		const infuraNetwork = ethers.utils.getNetwork(network);
		const infuraProvider = new ethers.providers.InfuraProvider(infuraNetwork, apiKey);
		super(privateKey, infuraProvider, defaultOverrides);

		logger.log(`Deployer set to Infura. Network: ${colors.colorNetwork(network)} with API Key: ${colors.colorAPIKey(apiKey)}\n`);

		this.network = network;
		this.apiKey = apiKey;
	}

	setNetwork(network) {
		const infuraNetwork = ethers.utils.getNetwork(network);
		const infuraProvider = new ethers.providers.InfuraProvider(infuraNetwork, this.apiKey);
		this.setProvider(infuraProvider);
		this.network = network;
	}

	setApiKey(apiKey) {
		const infuraProvider = new ethers.providers.InfuraProvider(this.infuraNetwork, apiKey);
		this.setProvider(infuraProvider);
		this.apiKey = apiKey;
	}

	toString() {
		const superString = super.toString();
		return `Deployer set to Infura. Network: ${colors.colorNetwork(this.network)} with API Key: ${colors.colorAPIKey(this.apiKey)}\n${superString}`;
	}
}

module.exports = InfuraPrivateKeyDeployer;
