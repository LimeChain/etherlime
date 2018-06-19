const ethers = require('ethers');

const PrivateKeyDeployer = require('../deployer/PrivateKeyDeployer');
const colors = require('../utils/colors');

class InfuraPrivateKeyDeployer extends PrivateKeyDeployer {

	constructor(privateKey, network, apiKey, defaultOverrides) {
		const infuraProvider = new ethers.providers.InfuraProvider(ethers.providers.networks[network], apiKey);
		super(privateKey, infuraProvider, defaultOverrides);
		console.log(`Deployer set to Infura. Network: ${colors.colorNetwork(network)} with API Key: ${colors.colorAPIKey(apiKey)}\n`)
	}

	toString() {
		const baseString = super.toString();
		return `Infura ${baseString}`;
	}
}

module.exports = InfuraPrivateKeyDeployer;