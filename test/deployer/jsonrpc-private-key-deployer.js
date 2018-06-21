const ethploy = require('../../index.js');
const ethers = require('ethers')
const assert = require('assert');

const config = require('../config.json');
const ICOTokenContract = require('../testContracts/ICOToken.json');
// const nodeUrl = 'http://localhost:8545/';
const defaultConfigs = {
	gasPrice: config.defaultGasPrice,
	gasLimit: config.defaultGasLimit
}

describe('Deployer tests', () => {

	describe('Initialization', async () => {
		it('Should initialize the wallet with correct values', () => {
			const wallet = ethers.Wallet.createRandom();
			const privateKey = wallet.privateKey;
			const localNodeProvider = new ethers.providers.JsonRpcProvider(config.nodeUrl, ethers.providers.networks.unspecified);
			const deployer = new ethploy.JSONRPCPrivateKeyDeployer(privateKey, config.nodeUrl, defaultConfigs);
			assert.deepEqual(privateKey, deployer.wallet.privateKey, "The stored wallet does not match the inputted one");
			assert.deepEqual(localNodeProvider.url, deployer.provider.url, "The stored provider url does not match the inputted one");
			assert.deepEqual(defaultConfigs, deployer.defaultOverrides, "The stored default overrides does not match the inputted one");
			assert.deepEqual(localNodeProvider.url, deployer.wallet.provider.url, "The provider url of the wallet does not match the inputted provider url");
		})

		it('Should throw on incorrect wallet', () => {
			const localNodeProvider = new ethers.providers.JsonRpcProvider(config.nodeUrl, ethers.providers.networks.unspecified);
			const throwingFunction = () => {
				new ethploy.JSONRPCPrivateKeyDeployer('Random Things Here', localNodeProvider, defaultConfigs)
			}

			assert.throws(throwingFunction, "The deployer did not throw with invalid wallet");
		})

		it('Should throw on empty nodeUrl', () => {
			const throwingFunction = () => {
				new ethploy.JSONRPCPrivateKeyDeployer(privateKey, '', defaultConfigs)
			}

			assert.throws(throwingFunction, "The deployer did not throw with invalid nodeUrl");

		})
	})

	describe('Deploying contract', async () => {
		// TODO write the tests for deployment
	})

	describe('Wrapping deployed contract', async () => {
		// TODO write the tests for wrapping
	})
});