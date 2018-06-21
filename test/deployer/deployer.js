const ethploy = require('../../index.js');
const ethers = require('ethers')
const assert = require('assert');

const isAddress = require('../../utils/address-utils').isAddress;
const config = require('../config.json');
const ICOTokenContract = require('../testContracts/ICOToken.json');
const VestingContract = require('../testContracts/Vesting.json');

const defaultConfigs = {
	gasPrice: config.defaultGasPrice,
	gasLimit: config.defaultGasLimit
}

describe('Deployer tests', () => {

	describe('Initialization', async () => {
		it('should initialize the wallet with correct values', () => {
			const wallet = new ethers.Wallet('0x' + config.randomPrivateKey);
			const nodeUrl = 'http://localhost:8545/'; // TODO - get this from ogi config
			const provider = new ethers.providers.JsonRpcProvider(nodeUrl, ethers.providers.networks.unspecified);
			const deployer = new ethploy.Deployer(wallet, provider, defaultConfigs);

			assert.deepEqual(wallet, deployer.wallet, "The stored wallet does not match the inputted one");
			assert.deepEqual(provider, deployer.provider, "The stored provider does not match the inputted one");
			assert.deepEqual(defaultConfigs, deployer.defaultOverrides, "The stored default overrides does not match the inputted one");
			assert.deepEqual(provider, deployer.wallet.provider, "The provider of the wallet does not match the inputted provider");
		})

		it('should throw on incorrect wallet string', () => {
			const nodeUrl = 'http://localhost:8545/'; // TODO - get this from ogi config
			const provider = new ethers.providers.JsonRpcProvider(nodeUrl, ethers.providers.networks.unspecified);
			const throwingFunction = () => {
				new ethploy.Deployer('Random Things Here', infuraProvider, defaultConfigs)
			}

			assert.throws(throwingFunction, "The deployer did not throw with invalid wallet");
		})

		it('should throw on incorrect wallet input type', () => {
			const nodeUrl = 'http://localhost:8545/'; // TODO - get this from ogi config
			const provider = new ethers.providers.JsonRpcProvider(nodeUrl, ethers.providers.networks.unspecified);
			const throwingFunction = () => {
				new ethploy.Deployer(69, infuraProvider, defaultConfigs)
			}

			assert.throws(throwingFunction, "The deployer did not throw with invalid wallet");
		})
	})

	describe('Deploying contract', async () => {

		let wallet
		let provider;
		let deployer;

		describe('Positive Cases', () => {

			beforeEach(async () => {
				wallet = new ethers.Wallet('0x' + config.randomPrivateKey);
				const nodeUrl = 'http://localhost:8545/'; // TODO - get this from ogi config
				provider = new ethers.providers.JsonRpcProvider(nodeUrl, ethers.providers.networks.unspecified);
				deployer = new ethploy.Deployer(wallet, provider, defaultConfigs);

			})

			it('should deploy contract without params correctly', async () => {
				const contractWrapper = await deployer.deploy(ICOTokenContract);

				assert.ok(isAddress(contractWrapper.contractAddress), 'The deployed address is incorrect');
				assert.deepEqual(wallet, contractWrapper.wallet, "The stored wallet does not match the inputted one");
				assert.deepEqual(provider, contractWrapper.provider, "The stored provider does not match the inputted one");
				assert.strictEqual(contractWrapper.contractAddress, contractWrapper.contract.address, "The returned address does not match the address in the instantiated ethers contract");
				assert.deepEqual(ICOTokenContract.abi, contractWrapper.contract.interface.abi, "The stored contract abi differs from the inputed one");
			})

			it('should deploy contract with params correctly', async () => {
				const contractWrapper = await deployer.deploy(VestingContract, config.randomAddress, 1569426974);

				assert.ok(isAddress(contractWrapper.contractAddress), 'The deployed address is incorrect');
				assert.deepEqual(wallet, contractWrapper.wallet, "The stored wallet does not match the inputted one");
				assert.deepEqual(provider, contractWrapper.provider, "The stored provider does not match the inputted one");
				assert.strictEqual(contractWrapper.contractAddress, contractWrapper.contract.address, "The returned address does not match the address in the instantiated ethers contract");
			})

		})

		describe('Negative Cases', () => {


			// This test can only be executed on infura as ganache-cli reverts directly
			it('should throw error on transaction receipt status 0', async () => {
				const wallet = new ethers.Wallet('0x' + config.infuraPrivateKey);
				const infuraProvider = new ethers.providers.InfuraProvider(ethers.providers.networks[config.infuraNetwork], config.infuraAPIKey);
				const deployer = new ethploy.Deployer(wallet, infuraProvider, defaultConfigs);

				try {
					await deployer.deploy(VestingContract, config.randomAddress, 69)
					assert.fails("The deployment did not throw");
				} catch (e) {
					console.log(e.message);
					assert(e.message.includes("failed"), "Incorrect error was thrown");
				}
			})
		})

	})

	describe('Wrapping deployed contract', async () => {
		// TODO write the tests for wrapping
	})
});