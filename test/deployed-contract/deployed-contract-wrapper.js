const etherlime = require('./../../index.js');
const ethers = require('ethers')
const assert = require('assert');

const isAddress = require('./../../utils/address-utils').isAddress;
const config = require('./../config.json');
const ICOTokenContract = require('./../testContracts/ICOToken.json');
const VestingContract = require('./../testContracts/Vesting.json');
const Greetings = require('./../testContracts/Greetings.json');
const store = require('./../../logs-store/logs-store');

const defaultConfigs = {
	gasPrice: config.defaultGasPrice,
	gasLimit: config.defaultGasLimit
}

describe('Deployed Contracts Wrapper tests', () => {

	describe('Initialization', async () => {
		let deployer;

		beforeEach(async () => {
			deployer = new etherlime.JSONRPCPrivateKeyDeployer(config.randomPrivateKey, config.nodeUrl, defaultConfigs);
		})

		it('should create correct wrapper', () => {
			const wrapper = new etherlime.DeployedContractWrapper(Greetings, config.randomAddress, deployer.wallet, deployer.provider);

			assert(wrapper.contract.hasOwnProperty('setGreetings'), 'The newly created wrapper does not have ethers.Contract function setGreetings');
			assert(wrapper.contract.hasOwnProperty('getGreetings'), 'The newly created wrapper does not have ethers.Contract function setGreetings');
			assert.deepEqual(wrapper.wallet, deployer.wallet, "The stored wallet was not the inputted one")
			assert.deepEqual(wrapper.provider, deployer.provider, "The stored provider was not the inputted one")
			assert.deepEqual(wrapper.contractAddress, config.randomAddress, "The stored contract address was not the inputted one")
		})

		it('should throw on initialization invalid wallet', () => {
			const invalidWallet = 69;
			try {
				new etherlime.DeployedContractWrapper(Greetings, config.randomAddress, invalidWallet, deployer.provider);
				assert.fail('Creating wrapper with invalid wallet did not throw');
			} catch (e) {
				assert.strictEqual(e.message, 'Passed wallet is not instance of ethers Wallet');
			}
		})

		it('should throw on initialization invalid address', () => {
			const invalidAddress = 69;
			try {
				new etherlime.DeployedContractWrapper(Greetings, invalidAddress, deployer.wallet, deployer.provider);
				assert.fail('Creating wrapper with invalid address did not throw');
			} catch (e) {
				assert.strictEqual(e.message, `Passed contract address (${invalidAddress}) is not valid address`);
			}
		})

		it('should throw on initialization invalid contract', () => {
			const invalidContract = 69;
			try {
				new etherlime.DeployedContractWrapper(invalidContract, config.randomAddress, deployer.wallet, deployer.provider);
				assert.fail('Creating wrapper with invalid contract did not throw');
			} catch (e) {
				assert.strictEqual(e.message, `Passed contract is not a valid contract object. It needs to have bytecode, abi and contractName properties`);
			}
		})
	})

	describe('Verbose waiting for transaction', async () => {

		let deployer;
		let contractWrapper;

		beforeEach(async () => {
			deployer = new etherlime.InfuraPrivateKeyDeployer(config.infuraPrivateKey, config.infuraNetwork, config.infuraAPIKey, defaultConfigs);
			contractWrapper = await deployer.deploy(ICOTokenContract);
		})

		it('should wait for transaction correctly', async () => {
			const label = 'Transfer Ownership';
			const transferTransaction = await contractWrapper.contract.transferOwnership(config.randomAddress);
			const result = await contractWrapper.verboseWaitForTransaction(transferTransaction.hash, label);
			assert(result.hasOwnProperty('hash'), 'There is no hash property of the result');
			assert(result.hasOwnProperty('blockHash'), 'There is no blockHash property of the result');
			assert(result.hasOwnProperty('nonce'), 'There is no nonce property of the result');
			assert(result.hasOwnProperty('data'), 'There is no data property of the result');
			const currentRecord = store.getCurrentWorkingRecord();
			const lastAction = currentRecord.actions[currentRecord.actions.length - 1];
			assert.strictEqual(lastAction.deployerType, 'DeployedContractWrapper', 'Deployer Type not set correctly');
			assert.strictEqual(lastAction.nameOrLabel, label, 'Label not set correctly');
			assert.strictEqual(lastAction.transactionHash, transferTransaction.hash, 'Transaction hash not set correctly');
			assert(lastAction.status == 0, 'status not set correctly');
		})

		it('should wait for transaction without label', async () => {
			const transferTransaction = await contractWrapper.contract.transferOwnership(config.randomAddress);
			const result = await contractWrapper.verboseWaitForTransaction(transferTransaction.hash);
			assert(result.hasOwnProperty('hash'), 'There is no hash property of the result');
			assert(result.hasOwnProperty('blockHash'), 'There is no blockHash property of the result');
			assert(result.hasOwnProperty('nonce'), 'There is no nonce property of the result');
			assert(result.hasOwnProperty('data'), 'There is no data property of the result');
		})

		it('should throw on transaction receipt status being 0', async () => {

			const transferTransaction = await contractWrapper.contract.transfer(config.randomAddress, 69);
			try {
				await contractWrapper.verboseWaitForTransaction(transferTransaction.hash, 'Throwing transfer function');
				assert.fail('The transaction was supposed to throw an error on receipt status being 0')
			} catch (e) {
				assert(e.message.startsWith('Transaction '), 'Incorrect error thrown by wait for transaction')
			}

		})

	})

});