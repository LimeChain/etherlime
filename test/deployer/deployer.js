const ethploy = require('../../index.js');
const ethers = require('ethers')
const assert = require('assert');

const config = require('../config.json');
const ICOTokenContract = require('../testContracts/ICOToken.json');

const defaultConfigs = {
	gasPrice: config.defaultGasPrice,
	gasLimit: config.defaultGasLimit
}

describe('Deployer tests', () => {

	describe('Initialization', async () => {
		it('Should initialize the wallet with correct values', () => {
			const wallet = ethers.Wallet.createRandom();
			const infuraProvider = new ethers.providers.InfuraProvider(ethers.providers.networks[config.infuraNetwork], config.infuraAPIKey);
			const deployer = new ethploy.Deployer(wallet, infuraProvider, defaultConfigs);

			assert.deepEqual(wallet, deployer.wallet, "The stored wallet does not match the inputted one");
			assert.deepEqual(infuraProvider, deployer.provider, "The stored provider does not match the inputted one");
			assert.deepEqual(defaultConfigs, deployer.defaultOverrides, "The stored default overrides does not match the inputted one");
			assert.deepEqual(infuraProvider, deployer.wallet.provider, "The provider of the wallet does not match the inputted provider");
		})

		it('Should throw on incorrect wallet string', () => {
			const infuraProvider = new ethers.providers.InfuraProvider(ethers.providers.networks[config.infuraNetwork], config.infuraAPIKey);
			const throwingFunction = () => {
				new ethploy.Deployer('Random Things Here', infuraProvider, defaultConfigs)
			}

			assert.throws(throwingFunction, "The deployer did not throw with invalid wallet");
		})

		it('Should throw on incorrect wallet string', () => {
			const infuraProvider = new ethers.providers.InfuraProvider(ethers.providers.networks[config.infuraNetwork], config.infuraAPIKey);
			const throwingFunction = () => {
				new ethploy.Deployer(69, infuraProvider, defaultConfigs)
			}

			assert.throws(throwingFunction, "The deployer did not throw with invalid wallet");
		})
	})

	describe('Deploying contract', async () => {
		// TODO write the tests for deployment
	})

	describe('Wrapping deployed contract', async () => {
		// TODO write the tests for wrapping
	})
});