const ethers = require('ethers');
const colors = require('../utils/colors');

const Deployer = require('./Deployer');

class PrivateKeyDeployer extends Deployer {
	constructor(privateKey, provider, defaultOverrides) {
		const sanePrivateKey = (privateKey.startsWith('0x')) ? privateKey : `0x${privateKey}`;
		const wallet = new ethers.Wallet(sanePrivateKey);
		super(wallet, provider, defaultOverrides);

		console.log(`Deployer set to deploy from address: ${colors.colorAddress(wallet.address)}\n`)
	}
	toString() {
		const baseString = super.toString();
		return `Private Key Deployer : ${baseString}`;
	}
}

module.exports = PrivateKeyDeployer;