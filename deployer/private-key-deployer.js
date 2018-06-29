const ethers = require('ethers');
const colors = require('./../utils/colors');

const Deployer = require('./deployer');

class PrivateKeyDeployer extends Deployer {

	/**
	 * Instantiates new deployer with deployer wallet based on privateKey. You probably should not use this class directly but use something inheriting this as it gives you provider options too
	 * @param {*} privateKey the private key for the deployer wallet
	 * @param {*} provider the ethers.provider instance
	 * @param {*} defaultOverrides [Optional] default deployment overrides
	 */
	constructor(privateKey, provider, defaultOverrides) {
		const sanitizedPrivateKey = (privateKey.startsWith('0x')) ? privateKey : `0x${privateKey}`;
		const wallet = new ethers.Wallet(sanitizedPrivateKey);
		super(wallet, provider, defaultOverrides);

		console.log(`Deployer set to deploy from address: ${colors.colorAddress(this.wallet.address)}\n`)
	}
	toString() {
		return `Deployer set to deploy from address: ${colors.colorAddress(this.wallet.address)}`;
	}
}

module.exports = PrivateKeyDeployer;