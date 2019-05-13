const etherlime = require('./../../../packages/etherlime/index');
const assert = require('assert');

const config = require('./../../config.json');
const ProviderEngine = require("web3-provider-engine");
const { CoverageSubprovider } = require("@0x/sol-coverage");
const RpcProvider = require("web3-provider-engine/subproviders/rpc.js");




const defaultConfigs = {
	gasPrice: config.defaultGasPrice,
	gasLimit: config.defaultGasLimit
}

describe('JSONRPC-Private-Key-Deployer tests', () => {

	describe('Initialization', async () => {
		it('Should initialize the signer with correct values', () => {
			const deployer = new etherlime.JSONRPCPrivateKeyDeployer(config.randomPrivateKey, config.nodeUrl, defaultConfigs);
			assert.deepEqual(config.nodeUrl, deployer.provider.connection.url, "The stored provider url does not match the inputted one");
			assert.deepEqual(defaultConfigs, deployer.defaultOverrides, "The stored default overrides does not match the inputted one");
		})

		it('Should throw on empty nodeUrl', () => {
			const throwingFunction = () => {
				new etherlime.JSONRPCPrivateKeyDeployer(config.randomPrivateKey, '', defaultConfigs)
			}

			assert.throws(throwingFunction, "The deployer did not throw with invalid nodeUrl");
		})

		it('Should throw on number for nodeUrl', () => {
			const throwingFunction = () => {
				new etherlime.JSONRPCPrivateKeyDeployer(config.randomPrivateKey, 69, defaultConfigs)
			}

			assert.throws(throwingFunction, "The deployer did not throw with invalid nodeUrl");
		})

		it('Provider method toString should return string', () => {
			const deployer = new etherlime.JSONRPCPrivateKeyDeployer(config.randomPrivateKey, config.nodeUrl, defaultConfigs);
			const returnedString = deployer.toString();
			assert(typeof returnedString === 'string', "The returned toString method did not return string");
			assert(returnedString.includes(config.nodeUrl), `The returned toString method did not contain ${config.nodeUrl}`)
		})

		it('Should set the right localNodeProvider if the deployer is runned from coverage command', () => {
			const provider = new ProviderEngine();
			global.coverageSubprovider = new CoverageSubprovider();
			provider.addProvider(global.coverageSubprovider);
			provider.addProvider(new RpcProvider({ rpcUrl: `http://localhost:${config.alternativePort}` }));
			global.provider = provider;
			const deployer = new etherlime.JSONRPCPrivateKeyDeployer(config.randomPrivateKey, config.alternativeNodeUrl, defaultConfigs);
			assert.deepEqual(global.provider._providers[1].rpcUrl, config.alternativeNodeUrl, "The stored provider url does not match the inputted one");
			assert.deepEqual(global.provider._providers[1].rpcUrl, deployer.provider.connection.url, "The stored connection url does not match the inputted one");

		})

		after('Normalize global.coverageSubprovider', () => {
			global.coverageSubprovider = undefined;
		})

	});

	describe('Setters', () => {
		it('should set nodeUrl', () => {
			const deployer = new etherlime.JSONRPCPrivateKeyDeployer(config.randomPrivateKey, config.nodeUrl, defaultConfigs);

			const newNodeUrl = config.alternativeNodeUrl;
			deployer.setNodeUrl(newNodeUrl);

			assert.deepEqual(newNodeUrl, deployer.provider.connection.url, "The stored provider url does not match the inputted one");
			assert.deepEqual(defaultConfigs, deployer.defaultOverrides, "The stored default overrides does not match the inputted one");
		});

		it('Should throw on empty nodeUrl', () => {
			const deployer = new etherlime.JSONRPCPrivateKeyDeployer(config.randomPrivateKey, config.nodeUrl, defaultConfigs);

			const throwingFunction = () => {
				deployer.setNodeUrl('');
			}

			assert.throws(throwingFunction, "The deployer did not throw with invalid nodeUrl");
		});

		it('Should throw on number for nodeUrl', () => {
			const deployer = new etherlime.JSONRPCPrivateKeyDeployer(config.randomPrivateKey, config.nodeUrl, defaultConfigs);

			const throwingFunction = () => {
				deployer.setNodeUrl(69);
			}

			assert.throws(throwingFunction, "The deployer did not throw with invalid nodeUrl");
		});
	});
});
