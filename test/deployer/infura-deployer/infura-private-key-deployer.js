const etherlime = require('./../../../index.js');
const assert = require('assert');

const config = require('./../../config.json');

const defaultConfigs = {
	gasPrice: config.defaultGasPrice,
	gasLimit: config.defaultGasLimit
}

describe('Infura private key tests', () => {

	describe('Initialization', async () => {
		it('Should initialize the wallet with correct values', () => {
			const deployer = new etherlime.InfuraPrivateKeyDeployer(config.infuraPrivateKey, config.infuraNetwork, config.infuraAPIKey, defaultConfigs);
			assert.deepEqual(config.infuraNetwork, deployer.network, "The stored provider network does not match the inputted one");
			assert.deepEqual(config.infuraAPIKey, deployer.apiKey, "The stored provider api key does not match the inputted one");
			assert.deepEqual(defaultConfigs, deployer.defaultOverrides, "The stored default overrides does not match the inputted one");
			assert.deepEqual('0x' + config.infuraPrivateKey, deployer.wallet.privateKey, "The stored wallet does not match the inputted one");
		})

		it('Provider method toString should return string', () => {
			const deployer = new etherlime.InfuraPrivateKeyDeployer(config.infuraPrivateKey, config.infuraNetwork, config.infuraAPIKey, defaultConfigs);
			const returnedString = deployer.toString();
			assert(typeof returnedString === 'string', "The returned toString method did not return string");
			assert(returnedString.includes('Infura'), `The returned toString method did not contain Infura`)
		})
	})
});