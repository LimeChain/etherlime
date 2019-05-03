const ethers = require('ethers');
const colors = require('utils').colors;

const Deployer = require('./deployer');
const logger = require('logger').logger;

class PrivateKeyDeployer extends Deployer {

	/**
	 * Instantiates new deployer with deployer wallet/signer instance based on privateKey. You probably should not use this class directly but use something inheriting this as it gives you provider options too
	 * @param {*} privateKey the private key for the deployer wallet/signer instance
	 * @param {*} provider the ethers.provider instance
	 * @param {*} defaultOverrides [Optional] default deployment overrides
	 */
	constructor(privateKey, provider, defaultOverrides) {
		const sanitizedPrivateKey = (privateKey.startsWith('0x')) ? privateKey : `0x${privateKey}`;
		const signer = new ethers.Wallet(sanitizedPrivateKey, provider);

		super(signer, provider, defaultOverrides);

		logger.log(`Deployer set to deploy from address: ${colors.colorAddress(this.signer.address)}\n`);
	}

	setPrivateKey(privateKey) {
		const sanitizedPrivateKey = (privateKey.startsWith('0x')) ? privateKey : `0x${privateKey}`;
		const signer = new ethers.Wallet(sanitizedPrivateKey, this.provider);
		this.setSigner(signer);
	}

	toString() {
		return `Deployer set to deploy from address: ${colors.colorAddress(this.signer.address)}`;
	}
}

module.exports = PrivateKeyDeployer;
