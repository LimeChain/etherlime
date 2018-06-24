const isUrl = require('../../utils/url-utils').isUrl;
const ethers = require('ethers');
const colors = require('../../utils/colors');
const JSONRPCDeployer = require('../jsonrpc-deployer/jsonrpc-private-key-deployer');
const ganacheSetupConfig = require('../../cli-commands/ganache/setup');


class GanacheCliDeployer extends JSONRPCDeployer {
	/**
	 * 
	 * Instantiates new deployer based on the GanacheCli Provider; If no privateKey and nodeUrl are specified, the deployer will be instantiated with the default values from cli-commands/ganache/setup.json
	 * 
	 * @param {*} privateKey the private key for the deployer wallet
	 * @param {*} nodeUrl url of the network to deploy on. This is the node url address that is given to the class
	 * @param {*} defaultOverrides [Optional] default deployment overrides
	 */
	constructor(privateKey = ganacheSetupConfig.accounts[0].secretKey, nodeUrl = `http://localhost:${ganacheSetupConfig.defaultPort}`, defaultOverrides) {
		super(privateKey, nodeUrl, defaultOverrides);
		this._validateNodeUrl(nodeUrl);
		this.nodeUrl = nodeUrl;
		console.log(`GanacheCLi Deployer Network: ${colors.colorNetwork(this.nodeUrl)}`)
	}

	toString() {
		const superString = super.toString();
		return `Network: ${colors.colorNetwork(this.nodeUrl)}\n${superString}`;
	}

	_validateNodeUrl(nodeUrl) {
		return super._validateNodeUrl(nodeUrl);
	}
}

module.exports = GanacheCliDeployer;