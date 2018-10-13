const etherlime = require('./../../index.js');
const assert = require('assert');

const config = require('./../config.json');
const ICOTokenContract = require('./../testContracts/ICOToken.json');
const Greetings = require('./../testContracts/Greetings.json');
const store = require('./../../logs-store/logs-store');

const defaultConfigs = {
	gasPrice: config.defaultGasPrice,
	gasLimit: config.defaultGasLimit
}

describe('EtherlimeGanacheWrapper tests', () => {
	store.initHistoryRecord();

	describe('Initialization', async () => {
		let deployer;

		beforeEach(async () => {
			deployer = new etherlime.EtherlimeGanacheDeployer();
		})

		it('should create correct wrapper', () => {
			const wrapper = new etherlime.EtherlimeGanacheWrapper(Greetings, config.randomAddress, deployer.wallet, deployer.provider);

			assert(wrapper.contract.hasOwnProperty('setGreetings'), 'The newly created wrapper does not have ethers.Contract function setGreetings');
			assert(wrapper.contract.hasOwnProperty('getGreetings'), 'The newly created wrapper does not have ethers.Contract function setGreetings');
			assert.deepEqual(wrapper.wallet, deployer.wallet, "The stored wallet was not the inputted one")
			assert.deepEqual(wrapper.provider, deployer.provider, "The stored provider was not the inputted one")
			assert.deepEqual(wrapper.contractAddress, config.randomAddress, "The stored contract address was not the inputted one")
		})

	})

	describe('Verbose waiting for transaction', async () => {

		let deployer;
		let contractWrapper;

		beforeEach(async () => {
			deployer = new etherlime.EtherlimeGanacheDeployer(undefined, undefined, defaultConfigs);
			contractWrapper = await deployer.deploy(ICOTokenContract);
		});

		it('should wait for transaction correctly', async () => {
			const label = 'Transfer Ownership';
			const transferTransaction = await contractWrapper.contract.transferOwnership(config.randomAddress, defaultConfigs);
			const result = await contractWrapper.verboseWaitForTransaction(transferTransaction, label);
			assert(result.hasOwnProperty('transactionHash'), 'There is no transactionHash property of the result');
			assert(result.hasOwnProperty('blockHash'), 'There is no blockHash property of the result');
			assert(result.hasOwnProperty('logs'), 'There is no logs property of the result');
			assert(result.hasOwnProperty('status'), 'There is no status property of the result');
			const currentRecord = store.getCurrentWorkingRecord();
			const lastAction = currentRecord.actions[currentRecord.actions.length - 1];
			assert.strictEqual(lastAction.deployerType, 'EtherlimeGanacheWrapper', 'Deployer Type not set correctly');
			assert.strictEqual(lastAction.nameOrLabel, label, 'Label not set correctly');
			assert.strictEqual(lastAction.transactionHash, transferTransaction.hash, 'Transaction hash not set correctly');
			assert(lastAction.status == 0, 'status not set correctly');
		});

		it('should wait for transaction without label correctly', async () => {
			const label = 'Transfer Ownership';
			const transferTransaction = await contractWrapper.contract.transferOwnership(config.randomAddress, defaultConfigs);
			const result = await contractWrapper.verboseWaitForTransaction(transferTransaction);
			assert(result.hasOwnProperty('transactionHash'), 'There is no transactionHash property of the result');
			assert(result.hasOwnProperty('blockHash'), 'There is no blockHash property of the result');
			assert(result.hasOwnProperty('logs'), 'There is no logs property of the result');
			assert(result.hasOwnProperty('status'), 'There is no status property of the result');
			const currentRecord = store.getCurrentWorkingRecord();
			const lastAction = currentRecord.actions[currentRecord.actions.length - 1];
			assert.strictEqual(lastAction.deployerType, 'EtherlimeGanacheWrapper', 'Deployer Type not set correctly');
			assert.strictEqual(lastAction.nameOrLabel, 'EtherlimeGanacheWrapper', 'Label not set correctly');
			assert.strictEqual(lastAction.transactionHash, transferTransaction.hash, 'Transaction hash not set correctly');
			assert(lastAction.status == 0, 'status not set correctly');
		})

	})

});