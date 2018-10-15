const etherlime = require('./../../index.js');
const ethers = require('ethers');
const assert = require('assert');
const store = require('./../../logs-store/logs-store');

const isAddress = require('./../../utils/address-utils').isAddress;
const config = require('./../config.json');
const ICOTokenContract = require('./../testContracts/ICOToken.json');
const DataContract = require('./../testContracts/DataContract.json');
const VestingContract = require('./../testContracts/Vesting.json');
const Greetings = require('./../testContracts/Greetings.json');

const defaultConfigs = {
	gasPrice: config.defaultGasPrice,
	gasLimit: config.defaultGasLimit
}

describe('Deployer tests', () => {

	describe('Initialization', async () => {
		it('should initialize the wallet with correct values', () => {
			const wallet = new ethers.Wallet('0x' + config.randomPrivateKey);
			const provider = new ethers.providers.JsonRpcProvider(config.nodeUrl, ethers.providers.networks.unspecified);
			const deployer = new etherlime.Deployer(wallet, provider, defaultConfigs);

			assert.deepEqual(wallet, deployer.wallet, "The stored wallet does not match the inputted one");
			assert.deepEqual(provider, deployer.provider, "The stored provider does not match the inputted one");
			assert.deepEqual(defaultConfigs, deployer.defaultOverrides, "The stored default overrides does not match the inputted one");
			assert.deepEqual(provider, deployer.wallet.provider, "The provider of the wallet does not match the inputted provider");
		})

		it('should throw on incorrect wallet string', () => {
			const provider = new ethers.providers.JsonRpcProvider(config.nodeUrl, ethers.providers.networks.unspecified);
			const throwingFunction = () => {
				new etherlime.Deployer('Random Things Here', provider, defaultConfigs)
			};

			assert.throws(throwingFunction, "The deployer did not throw with invalid wallet");
		});

		it('should throw on incorrect wallet input type', () => {
			const provider = new ethers.providers.JsonRpcProvider(config.nodeUrl, ethers.providers.networks.unspecified);
			const throwingFunction = () => {
				new etherlime.Deployer(69, provider, defaultConfigs)
			};

			assert.throws(throwingFunction, "The deployer did not throw with invalid wallet");
		})
	});

	describe('Deploying contract', async () => {

		let wallet;
		let provider;
		let deployer;

		describe('Positive Cases', () => {

			beforeEach(async () => {
				wallet = new ethers.Wallet('0x' + config.randomPrivateKey);
				provider = new ethers.providers.JsonRpcProvider(config.nodeUrl, ethers.providers.networks.unspecified);
				deployer = new etherlime.Deployer(wallet, provider, defaultConfigs);

			});

			it('should deploy contract without params correctly', async () => {
				const contractWrapper = await deployer.deploy(Greetings);

				assert.ok(isAddress(contractWrapper.contractAddress), 'The deployed address is incorrect');
				assert.deepEqual(wallet, contractWrapper.wallet, "The stored wallet does not match the inputted one");
				assert.deepEqual(provider, contractWrapper.provider, "The stored provider does not match the inputted one");
				assert.strictEqual(contractWrapper.contractAddress, contractWrapper.contract.address, "The returned address does not match the address in the instantiated ethers contract");
				const currentRecord = store.getCurrentWorkingRecord();
				const lastAction = currentRecord.actions[currentRecord.actions.length - 1];
				assert.strictEqual(lastAction.deployerType, 'Deployer', 'Deployer Type not set correctly');
				assert.strictEqual(lastAction.nameOrLabel, 'Greetings', 'Label not set correctly');
				assert(lastAction.status == 0, 'status not set correctly');
			});

			it('should deploy contract without default configs', async () => {
				deployer = new etherlime.Deployer(wallet, provider);
				const contractWrapper = await deployer.deploy(Greetings);

				assert.ok(isAddress(contractWrapper.contractAddress), 'The deployed address is incorrect');
				assert.deepEqual(wallet, contractWrapper.wallet, "The stored wallet does not match the inputted one");
				assert.deepEqual(provider, contractWrapper.provider, "The stored provider does not match the inputted one");
				assert.strictEqual(contractWrapper.contractAddress, contractWrapper.contract.address, "The returned address does not match the address in the instantiated ethers contract");
			});

			it('should deploy contract without gasPrice correctly', async () => {
				const defaultConfigsCopy = JSON.parse(JSON.stringify(defaultConfigs));
				delete defaultConfigsCopy.gasPrice;
				deployer.defaultOverrides = defaultConfigsCopy;
				const contractWrapper = await deployer.deploy(Greetings);

				assert.ok(isAddress(contractWrapper.contractAddress), 'The deployed address is incorrect');
				assert.deepEqual(wallet, contractWrapper.wallet, "The stored wallet does not match the inputted one");
				assert.deepEqual(provider, contractWrapper.provider, "The stored provider does not match the inputted one");
				assert.strictEqual(contractWrapper.contractAddress, contractWrapper.contract.address, "The returned address does not match the address in the instantiated ethers contract");
			});

			it('should deploy contract without gasLimit correctly', async () => {
				const defaultConfigsCopy = JSON.parse(JSON.stringify(defaultConfigs));
				delete defaultConfigsCopy.gasLimit;
				deployer.defaultOverrides = defaultConfigsCopy;
				const contractWrapper = await deployer.deploy(Greetings);

				assert.ok(isAddress(contractWrapper.contractAddress), 'The deployed address is incorrect');
				assert.deepEqual(wallet, contractWrapper.wallet, "The stored wallet does not match the inputted one");
				assert.deepEqual(provider, contractWrapper.provider, "The stored provider does not match the inputted one");
				assert.strictEqual(contractWrapper.contractAddress, contractWrapper.contract.address, "The returned address does not match the address in the instantiated ethers contract");
			});

			it('should deploy contract with params correctly', async () => {
				const contractWrapper = await deployer.deploy(VestingContract, {}, config.randomAddress, 1569426974);

				assert.ok(isAddress(contractWrapper.contractAddress), 'The deployed address is incorrect');
				assert.deepEqual(wallet, contractWrapper.wallet, "The stored wallet does not match the inputted one");
				assert.deepEqual(provider, contractWrapper.provider, "The stored provider does not match the inputted one");
				assert.strictEqual(contractWrapper.contractAddress, contractWrapper.contract.address, "The returned address does not match the address in the instantiated ethers contract");
			})

		});

		describe('Negative Cases', () => {

			let wallet;
			let provider;
			let deployer;

			beforeEach(async () => {
				wallet = new ethers.Wallet('0x' + config.randomPrivateKey);
				provider = new ethers.providers.JsonRpcProvider(config.nodeUrl, ethers.providers.networks.unspecified);
				deployer = new etherlime.Deployer(wallet, provider, defaultConfigs);

			});

			it('should throw on incorrect contract object', async () => {
				const contractCopy = JSON.parse(JSON.stringify(ICOTokenContract));
				delete contractCopy.abi;

				try {
					await deployer.deploy(contractCopy);
					assert.fails("The deployer did not throw on broken contract passed");
				} catch (e) {
					console.log(e.message);
				}

			});

			it('should throw on incorrect bytecode', async () => {
				const contractCopy = JSON.parse(JSON.stringify(ICOTokenContract));
				contractCopy.bytecode = 100;

				try {
					await deployer.deploy(contractCopy);
					assert.fails("The deployer did not throw on broken bytecode passed");
				} catch (e) {
					console.log(e.message);
				}
			});

			// This test can only be executed on infura as ganache-cli reverts directly
			it('should throw error on transaction receipt status 0', async () => {
				const wallet = new ethers.Wallet('0x' + config.infuraPrivateKey);
				const infuraProvider = new ethers.providers.InfuraProvider(ethers.providers.networks[config.infuraNetwork], config.infuraAPIKey);
				const deployer = new etherlime.Deployer(wallet, infuraProvider, defaultConfigs);

				try {
					await deployer.deploy(VestingContract, {}, config.randomAddress, 69)
					assert.fails("The deployment did not throw");
				} catch (e) {
					console.log(e.message);
					assert(e.message.includes("failed"), "Incorrect error was thrown");
				}
			})
		})

	});

	describe('Wrapping deployed contract', async () => {

		let wallet;
		let provider;
		let deployer;

		beforeEach(async () => {
			wallet = new ethers.Wallet('0x' + config.randomPrivateKey);
			provider = new ethers.providers.JsonRpcProvider(config.nodeUrl, ethers.providers.networks.unspecified);
			deployer = new etherlime.Deployer(wallet, provider, defaultConfigs);
		});

		it('should wrap contracts correctly', async () => {
			const contractWrapper = await deployer.wrapDeployedContract(ICOTokenContract, config.randomAddress);

			assert.ok(isAddress(contractWrapper.contractAddress), 'The wrapped address is incorrect');
			assert.strictEqual(contractWrapper.contractAddress, config.randomAddress, 'The wrapped address is no the inputted one');
			assert.deepEqual(wallet, contractWrapper.wallet, "The stored wallet does not match the inputted one");
			assert.deepEqual(provider, contractWrapper.provider, "The stored provider does not match the inputted one");
		})
	});

	describe('Estimating gas of deployment', async () => {

		let wallet;
		let provider;
		let deployer;

		beforeEach(async () => {
			wallet = new ethers.Wallet('0x' + config.infuraPrivateKey);
			infuraProvider = new ethers.providers.InfuraProvider(ethers.providers.networks[config.infuraNetwork], config.infuraAPIKey);
			deployer = new etherlime.Deployer(wallet, infuraProvider, defaultConfigs);
		});

		it('should wrap contracts correctly', async () => {
			const gas = 2470692;

			const estimateGas = await deployer.estimateGas(ICOTokenContract);

			assert.equal(gas, estimateGas.toString())
		});

		it('should wrap contracts correctly', async () => {
			const gas = 1629070;

			let libraries = { "LinkedList": "0x2Be52D5d7A73FC183cF40053B95beD572519EBbC" };
			const estimateGas = await deployer.estimateGas(DataContract, libraries);

			assert.equal(gas, estimateGas.toString())
		})
	});

	describe('Preparing bytecode', async () => {
		let wallet;
		let provider;
		let deployer;

		beforeEach(async () => {
			wallet = new ethers.Wallet('0x' + config.randomPrivateKey);
			provider = new ethers.providers.JsonRpcProvider(config.nodeUrl, ethers.providers.networks.unspecified);
			deployer = new etherlime.Deployer(wallet, provider, defaultConfigs);

		});

		it('should not update the bytecode when an invalid library is used', async () => {
			let invalidLibrary = 100;
			let bytecode = await deployer._prepareBytecode(invalidLibrary, ICOTokenContract.bytecode);

			assert.equal(ICOTokenContract.bytecode, bytecode);
		});
	})
});