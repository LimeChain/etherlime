const ethploy = require('../../index.js');
const assert = require('assert');

const config = require('../config.json');

const defaultConfigs = {
	gasPrice: config.defaultGasPrice,
	gasLimit: config.defaultGasLimit
}

describe('JSONRPC-Private-Key-Deployer tests', () => {

	describe('Initialization', async () => {
		it('Should initialize the wallet with correct values', () => {
			const deployer = new ethploy.JSONRPCPrivateKeyDeployer(config.randomPrivateKey, config.nodeUrl, defaultConfigs);
			assert.deepEqual(config.nodeUrl, deployer.provider.url, "The stored provider url does not match the inputted one");
			assert.deepEqual(defaultConfigs, deployer.defaultOverrides, "The stored default overrides does not match the inputted one");
		})

		it('Should throw on empty nodeUrl', () => {
			const throwingFunction = () => {
				new ethploy.JSONRPCPrivateKeyDeployer(config.randomPrivateKey, '', defaultConfigs)
			}

			assert.throws(throwingFunction, "The deployer did not throw with invalid nodeUrl");

		})

		it('Should throw on number for nodeUrl', () => {
			const throwingFunction = () => {
				new ethploy.JSONRPCPrivateKeyDeployer(config.randomPrivateKey, 69, defaultConfigs)
			}

			assert.throws(throwingFunction, "The deployer did not throw with invalid nodeUrl");

		})

		it('Provider method toString should return string', () => {
			const deployer = new ethploy.JSONRPCPrivateKeyDeployer(config.randomPrivateKey, config.nodeUrl, defaultConfigs);
			const returnedString = deployer.toString();
			assert(typeof returnedString === 'string', "The returned toString method did not return string");
			assert(returnedString.includes(config.nodeUrl), `The returned toString method did not contain ${config.nodeUrl}`)
		})
	})
});