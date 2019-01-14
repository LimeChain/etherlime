const etherlime = require('./../../index.js');
const ethers = require('ethers')
const assert = require('assert');

const isAddress = require('./../../utils/address-utils').isAddress;
const config = require('./../config.json');
const ICOTokenContract = require('./../testContracts/ICOToken.json');
const VestingContract = require('./../testContracts/Vesting.json');
const Greetings = require('./../testContracts/Greetings.json');

const defaultConfigs = {
	gasPrice: config.defaultGasPrice,
	gasLimit: config.defaultGasLimit
}

describe('Private key deployer tests', () => {

	let provider;

	beforeEach(() => {
		provider = new ethers.providers.JsonRpcProvider(config.nodeUrl);
	})

	describe('Initialization', async () => {

		it('should initialize the wallet with correct private key without 0x', () => {

			const deployer = new etherlime.PrivateKeyDeployer(config.randomPrivateKey, provider, defaultConfigs);

			assert.deepEqual('0x' + config.randomPrivateKey, deployer.wallet.privateKey, "The stored wallet does not match the inputted one");
			assert.deepEqual(provider, deployer.provider, "The stored provider does not match the inputted one");
			assert.deepEqual(defaultConfigs, deployer.defaultOverrides, "The stored default overrides does not match the inputted one");
			assert.deepEqual(provider, deployer.wallet.provider, "The provider of the wallet does not match the inputted provider");
		})

		it('should initialize the wallet with correct private key with 0x', () => {
			const deployer = new etherlime.PrivateKeyDeployer('0x' + config.randomPrivateKey, provider, defaultConfigs);

			assert.deepEqual('0x' + config.randomPrivateKey, deployer.wallet.privateKey, "The stored wallet does not match the inputted one");
			assert.deepEqual(provider, deployer.provider, "The stored provider does not match the inputted one");
			assert.deepEqual(defaultConfigs, deployer.defaultOverrides, "The stored default overrides does not match the inputted one");
			assert.deepEqual(provider, deployer.wallet.provider, "The provider of the wallet does not match the inputted provider");
		})

		it('should throw on incorrect private key', () => {
			const throwingFunction = () => {
				new etherlime.PrivateKeyDeployer('Random Things Here', provider, defaultConfigs)
			}

			assert.throws(throwingFunction, "The deployer did not throw with invalid wallet");
		})

		it('Provider method toString should return string', () => {
			const deployer = new etherlime.PrivateKeyDeployer(config.randomPrivateKey, provider, defaultConfigs);
			const returnedString = deployer.toString();
			assert(typeof returnedString === 'string', "The returned toString method did not return string");
			assert(returnedString.includes(deployer.wallet.address), `The returned toString method did not contain ${config.nodeUrl}`)
		})
	})

	describe('Setters', () => {
		it('should set private key without 0x', () => {
			const privateKey = config.ganacheCliPrivateKey;

			const deployer = new etherlime.PrivateKeyDeployer(config.randomPrivateKey, provider, defaultConfigs);
			deployer.setPrivateKey(privateKey);

			assert.deepEqual('0x' + privateKey, deployer.wallet.privateKey, "The stored wallet does not match the inputted one");

			assert.deepEqual(provider, deployer.provider, "The stored provider does not match the inputted one");
			assert.deepEqual(defaultConfigs, deployer.defaultOverrides, "The stored default overrides does not match the inputted one");
			assert.deepEqual(provider, deployer.wallet.provider, "The provider of the wallet does not match the inputted provider");
		});

		it('should set private key with 0x', () => {
			const privateKey = '0x' + config.ganacheCliPrivateKey;

			const deployer = new etherlime.PrivateKeyDeployer(config.randomPrivateKey, provider, defaultConfigs);
			deployer.setPrivateKey(privateKey);

			assert.deepEqual(privateKey, deployer.wallet.privateKey, "The stored wallet does not match the inputted one");

			assert.deepEqual(provider, deployer.provider, "The stored provider does not match the inputted one");
			assert.deepEqual(defaultConfigs, deployer.defaultOverrides, "The stored default overrides does not match the inputted one");
			assert.deepEqual(provider, deployer.wallet.provider, "The provider of the wallet does not match the inputted provider");
		});
	});
});
