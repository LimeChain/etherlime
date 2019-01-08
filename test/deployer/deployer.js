const etherlime = require('./../../index.js');
const ethers = require('ethers');
const assert = require('assert');
const store = require('./../../logs-store/logs-store');
const sinon = require('sinon');

const isAddress = require('./../../utils/address-utils').isAddress;
const config = require('./../config.json');
const ICOTokenContract = require('./../testContracts/ICOToken.json');
const DataContract = require('./../testContracts/DataContract.json');
const VestingContract = require('./../testContracts/Vesting.json');
const Greetings = require('./../testContracts/Greetings.json');

const defaultConfigs = {
	gasPrice: config.defaultGasPrice,
	gasLimit: config.defaultGasLimit
};

let sandbox = sinon.createSandbox();

const GAS_DEPLOY_TX = 2455692;
const GAS_DEPLOY_WITH_LINK = 1629070;

describe('Deployer tests', () => {

	describe('Initialization', async () => {
		it('should initialize the wallet with correct values', () => {
			const provider = new ethers.providers.JsonRpcProvider(config.nodeUrl);
			const wallet = new ethers.Wallet('0x' + config.randomPrivateKey);
			const deployer = new etherlime.Deployer(wallet, provider, defaultConfigs);

			assert.deepEqual(wallet.signingKey, deployer.wallet.signingKey, "The stored wallet does not match the inputted one");
			assert.deepEqual(provider, deployer.provider, "The stored provider does not match the inputted one");
			assert.deepEqual(defaultConfigs, deployer.defaultOverrides, "The stored default overrides does not match the inputted one");
			assert.deepEqual(provider, deployer.wallet.provider, "The provider of the wallet does not match the inputted provider");
		});

		it('should throw on incorrect wallet string', () => {
			const provider = new ethers.providers.JsonRpcProvider(config.nodeUrl);
			const throwingFunction = () => {
				new etherlime.Deployer('Random Things Here', provider, defaultConfigs)
			};

			assert.throws(throwingFunction, "The deployer did not throw with invalid wallet");
		});

		it('should throw on incorrect wallet input type', () => {
			const provider = new ethers.providers.JsonRpcProvider(config.nodeUrl);
			const throwingFunction = () => {
				new etherlime.Deployer(69, provider, defaultConfigs)
			};

			assert.throws(throwingFunction, "The deployer did not throw with invalid wallet");
		})
	});

	describe('Setters', () => {
		it('should set wallet', () => {
			const provider = new ethers.providers.JsonRpcProvider(config.nodeUrl);
			const initialWallet = new ethers.Wallet('0x' + config.randomPrivateKey);
			const deployer = new etherlime.Deployer(initialWallet, provider, defaultConfigs);

			const newWallet = new ethers.Wallet('0x' + config.ganacheCliPrivateKey);
			deployer.setWallet(newWallet);

			assert.deepEqual(newWallet.signingKey, deployer.wallet.signingKey, "The stored wallet does not match the new one");

			assert.deepEqual(provider, deployer.provider, "The stored provider does not match the inputted one");
			assert.deepEqual(defaultConfigs, deployer.defaultOverrides, "The stored default overrides does not match the inputted one");
			assert.deepEqual(provider, deployer.wallet.provider, "The provider of the wallet does not match the inputted provider");
		});

		it('should throw on incorrect wallet string', () => {
			const provider = new ethers.providers.JsonRpcProvider(config.nodeUrl);
			const initialWallet = new ethers.Wallet('0x' + config.randomPrivateKey);
			const deployer = new etherlime.Deployer(initialWallet, provider, defaultConfigs);

			const throwingFunction = () => {
				deployer.setWallet('Random Things Here');
			};

			assert.throws(throwingFunction, "The deployer did not throw with invalid wallet");
		});

		it('should throw on incorrect wallet input type', () => {
			const provider = new ethers.providers.JsonRpcProvider(config.nodeUrl);
			const initialWallet = new ethers.Wallet('0x' + config.randomPrivateKey);
			const deployer = new etherlime.Deployer(initialWallet, provider, defaultConfigs);

			const throwingFunction = () => {
				deployer.setWallet(69);
			};

			assert.throws(throwingFunction, "The deployer did not throw with invalid wallet");
		})

		it('should set provider', () => {
			const initialProvider = new ethers.providers.JsonRpcProvider(config.nodeUrl);
			const wallet = new ethers.Wallet('0x' + config.randomPrivateKey);
			const deployer = new etherlime.Deployer(wallet, initialProvider, defaultConfigs);

			const newProvider = new ethers.providers.JsonRpcProvider(config.alternativeNodeUrl);
			deployer.setProvider(newProvider);

			assert.deepEqual(newProvider, deployer.provider, "The stored provider does not match the new one");
			assert.deepEqual(newProvider, deployer.wallet.provider, "The provider of the wallet does not match the new provider");

			assert.deepEqual(wallet.signingKey, deployer.wallet.signingKey, "The stored wallet does not match the inputted one");
			assert.deepEqual(defaultConfigs, deployer.defaultOverrides, "The stored default overrides does not match the inputted one");
		});

		it('should set defaultOverrides', () => {
			const provider = new ethers.providers.JsonRpcProvider(config.nodeUrl);
			const wallet = new ethers.Wallet('0x' + config.randomPrivateKey);
			const deployer = new etherlime.Deployer(wallet, provider);

			deployer.setDefaultOverrides(defaultConfigs);

			assert.deepEqual(defaultConfigs, deployer.defaultOverrides, "The stored default overrides does not match the inputted one");
		});
	});

	describe('Deploying contract', async () => {

		let wallet;
		let provider;
		let deployer;

		describe('Positive Cases', () => {

			beforeEach(async () => {
				provider = new ethers.providers.JsonRpcProvider(config.nodeUrl);
				wallet = new ethers.Wallet('0x' + config.randomPrivateKey);
				deployer = new etherlime.Deployer(wallet, provider, defaultConfigs);

			});

			it('should deploy contract without params correctly', async () => {
				const contractWrapper = await deployer.deploy(Greetings);

				assert.ok(isAddress(contractWrapper.contractAddress), 'The deployed address is incorrect');
				assert.deepEqual(wallet.signingKey, contractWrapper.wallet.signingKey, "The stored wallet does not match the inputted one");
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
				assert.deepEqual(wallet.signingKey, contractWrapper.wallet.signingKey, "The stored wallet does not match the inputted one");
				assert.deepEqual(provider, contractWrapper.provider, "The stored provider does not match the inputted one");
				assert.strictEqual(contractWrapper.contractAddress, contractWrapper.contract.address, "The returned address does not match the address in the instantiated ethers contract");
			});

			it('should deploy contract without gasPrice correctly', async () => {
				const defaultConfigsCopy = JSON.parse(JSON.stringify(defaultConfigs));
				delete defaultConfigsCopy.gasPrice;
				deployer.defaultOverrides = defaultConfigsCopy;
				const contractWrapper = await deployer.deploy(Greetings);

				assert.ok(isAddress(contractWrapper.contractAddress), 'The deployed address is incorrect');
				assert.deepEqual(wallet.signingKey, contractWrapper.wallet.signingKey, "The stored wallet does not match the inputted one");
				assert.deepEqual(provider, contractWrapper.provider, "The stored provider does not match the inputted one");
				assert.strictEqual(contractWrapper.contractAddress, contractWrapper.contract.address, "The returned address does not match the address in the instantiated ethers contract");
			});

			it('should deploy contract without gasLimit correctly', async () => {
				const defaultConfigsCopy = JSON.parse(JSON.stringify(defaultConfigs));
				delete defaultConfigsCopy.gasLimit;
				deployer.defaultOverrides = defaultConfigsCopy;
				const contractWrapper = await deployer.deploy(Greetings);

				assert.ok(isAddress(contractWrapper.contractAddress), 'The deployed address is incorrect');
				assert.deepEqual(wallet.signingKey, contractWrapper.wallet.signingKey, "The stored wallet does not match the inputted one");
				assert.deepEqual(provider, contractWrapper.provider, "The stored provider does not match the inputted one");
				assert.strictEqual(contractWrapper.contractAddress, contractWrapper.contract.address, "The returned address does not match the address in the instantiated ethers contract");
			});

			it('should deploy contract with params correctly', async () => {
				const contractWrapper = await deployer.deploy(Greetings);

				assert.ok(isAddress(contractWrapper.contractAddress), 'The deployed address is incorrect');
				assert.deepEqual(wallet.signingKey, contractWrapper.wallet.signingKey, "The stored wallet does not match the inputted one");
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
				provider = new ethers.providers.JsonRpcProvider(config.nodeUrl);
				deployer = new etherlime.Deployer(wallet, provider, defaultConfigs);
			});

			afterEach(() => {
				sandbox.restore();
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
			it('should throw error on failed transaction execution', async () => {
				const network = ethers.utils.getNetwork(config.infuraNetwork);
				const infuraProvider = new ethers.providers.InfuraProvider(network, config.infuraAPIKey);
				const wallet = new ethers.Wallet('0x' + config.infuraPrivateKey, infuraProvider);
				const deployer = new etherlime.Deployer(wallet, infuraProvider, defaultConfigs);

				const mockedFailedTransaction = await mockFailedSendTransaction(deployer.wallet);

				try {
					await deployer.deploy(VestingContract, {}, config.randomAddress, 69);
					assert.fails("The deployment did not throw");
				} catch (e) {
					console.log(e.message);
					assert(e.message.includes("failed"), "Incorrect error was thrown");
				}

				sandbox.assert.calledOnce(mockedFailedTransaction);
			});

			it('should throw error on transaction receipt status 0', async () => {
				const dummyTransaction = { gasPrice: 2000000 };
				const dummyTransactionReceipt = { status: 0, gasUsed: 300000 };

				try {
					await deployer._postValidateTransaction(VestingContract, dummyTransaction, dummyTransactionReceipt);
					assert.fails("The deployment did not throw");
				} catch (e) {
					console.log(e.message);
					assert(e.message.includes("failed"), "Incorrect error was thrown");
				}
			});
		})

	});

	describe('Wrapping deployed contract', async () => {

		let wallet;
		let provider;
		let deployer;

		beforeEach(async () => {
			wallet = new ethers.Wallet('0x' + config.randomPrivateKey);
			provider = new ethers.providers.JsonRpcProvider(config.nodeUrl);
			deployer = new etherlime.Deployer(wallet, provider, defaultConfigs);
		});

		it('should wrap contracts correctly', async () => {
			const contractWrapper = await deployer.wrapDeployedContract(ICOTokenContract, config.randomAddress);

			assert.ok(isAddress(contractWrapper.contractAddress), 'The wrapped address is incorrect');
			assert.strictEqual(contractWrapper.contractAddress, config.randomAddress, 'The wrapped address is no the inputted one');
			assert.deepEqual(wallet.signingKey, contractWrapper.wallet.signingKey, "The stored wallet does not match the inputted one");
			assert.deepEqual(provider, contractWrapper.provider, "The stored provider does not match the inputted one");
		})
	});

	describe('Estimating gas of deployment', async () => {

		let wallet;
		let deployer;
		let infuraProvider;

		beforeEach(async () => {
			wallet = new ethers.Wallet('0x' + config.infuraPrivateKey);
			const network = ethers.utils.getNetwork(config.infuraNetwork);
			infuraProvider = new ethers.providers.InfuraProvider(network, config.infuraAPIKey);
			deployer = new etherlime.Deployer(wallet, infuraProvider, defaultConfigs);
		});

		afterEach(() => {
			sandbox.restore();
		});


		it('should wrap contracts correctly', async () => {
			const mockedEstimateGas = await mockEstimateGas(infuraProvider, GAS_DEPLOY_TX);
			const estimateGas = await deployer.estimateGas(ICOTokenContract);

			assert.equal(GAS_DEPLOY_TX, estimateGas.toString());
			sandbox.assert.calledOnce(mockedEstimateGas);
		});

		it('should wrap contracts correctly', async () => {
			const mockedEstimateGas = await mockEstimateGas(infuraProvider, GAS_DEPLOY_WITH_LINK);

			let libraries = { "LinkedList": "0x2Be52D5d7A73FC183cF40053B95beD572519EBbC" };
			const estimateGas = await deployer.estimateGas(DataContract, libraries);

			assert.equal(GAS_DEPLOY_WITH_LINK, estimateGas.toString());
			sandbox.assert.calledOnce(mockedEstimateGas);
		})
	});

	describe('Preparing bytecode', async () => {
		let wallet;
		let provider;
		let deployer;

		beforeEach(async () => {
			wallet = new ethers.Wallet('0x' + config.randomPrivateKey);
			provider = new ethers.providers.JsonRpcProvider(config.nodeUrl);
			deployer = new etherlime.Deployer(wallet, provider, defaultConfigs);

		});

		it('should not update the bytecode when an invalid library is used', async () => {
			let invalidLibrary = 100;
			let bytecode = await deployer._prepareBytecode(invalidLibrary, ICOTokenContract.bytecode);

			assert.equal(ICOTokenContract.bytecode, bytecode);
		});
	})
});

function mockEstimateGas(provider, gas) {
	const GAS = ethers.utils.bigNumberify(gas);
	let estimateGasStub = sandbox.stub(provider, 'estimateGas');
	estimateGasStub.callsFake(() => {
		return new Promise((resolve, reject) => {
			resolve(GAS);
		});
	});
	return estimateGasStub;
}

function mockFailedSendTransaction(wallet) {
	let sendTransactionStub = sandbox.stub(wallet, 'sendTransaction');
	sendTransactionStub.callsFake(() => {
		return new Promise((resolve, reject) => {
			resolve({
				wait: () => {
					return new Promise((resolve, reject) => {
						reject(new Error('error on failed transaction execution'))
					});
				}
			});
		});
	});
	return sendTransactionStub;
}
