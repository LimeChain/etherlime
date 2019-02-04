const etherlime = require('./../../index.js');
const ethers = require('ethers')
const assert = require('assert');
const sinon = require('sinon');

const isAddress = require('./../../utils/address-utils').isAddress;
const config = require('./../config.json');
const ICOTokenContract = require('./../testContracts/ICOToken.json');
const VestingContract = require('./../testContracts/Vesting.json');
const Greetings = require('./../testContracts/Greetings.json');
const store = require('./../../logs-store/logs-store');

const defaultConfigs = {
	gasPrice: config.defaultGasPrice,
	gasLimit: config.defaultGasLimit
};

let sandbox = sinon.createSandbox();

describe('Deployed Contracts Wrapper tests', () => {
	store.initHistoryRecord();

	describe('Initialization', async () => {
		let deployer;

		beforeEach(async () => {
			deployer = new etherlime.JSONRPCPrivateKeyDeployer(config.randomPrivateKey, config.nodeUrl, defaultConfigs);
		});

		it('should create correct wrapper', () => {
			const wrapper = new etherlime.DeployedContractWrapper(Greetings, config.randomAddress, deployer.signer, deployer.provider);
			
			assert(wrapper.contract.hasOwnProperty('setGreetings'), 'The newly created wrapper does not have ethers.Contract function setGreetings');
			assert(wrapper.contract.hasOwnProperty('getGreetings'), 'The newly created wrapper does not have ethers.Contract function setGreetings');
			assert.deepEqual(wrapper.signer, deployer.signer, "The stored signer was not the inputted one")
			assert.deepEqual(wrapper.provider, deployer.provider, "The stored provider was not the inputted one")
			assert.deepEqual(wrapper.contractAddress, config.randomAddress, "The stored contract address was not the inputted one")
		});

		it('should throw on initialization invalid signer', () => {
			const invalidSigner = 69;
			try {
				new etherlime.DeployedContractWrapper(Greetings, config.randomAddress, invalidSigner, deployer.provider);
				assert.fail('Creating wrapper with invalid signer did not throw');
			} catch (e) {
				assert.strictEqual(e.message, 'Passed signer is not a valid signer instance of ethers Wallet');
			}
		});

		it('should throw on initialization invalid address', () => {
			const invalidAddress = 69;
			try {
				new etherlime.DeployedContractWrapper(Greetings, invalidAddress, deployer.signer, deployer.provider);
				assert.fail('Creating wrapper with invalid address did not throw');
			} catch (e) {
				assert.strictEqual(e.message, `Passed contract address (${invalidAddress}) is not valid address`);
			}
		});

		it('should throw on initialization invalid contract', () => {
			const invalidContract = 69;
			try {
				new etherlime.DeployedContractWrapper(invalidContract, config.randomAddress, deployer.signer, deployer.provider);
				assert.fail('Creating wrapper with invalid contract did not throw');
			} catch (e) {
				assert.strictEqual(e.message, `Passed contract is not a valid contract object. It needs to have bytecode, abi and contractName properties`);
			}
		})
	});

	describe('Verbose waiting for transaction', async () => {

		let deployer;
		let contractWrapper;
		let mockedSendTransaction;

		beforeEach(async () => {
			deployer = new etherlime.InfuraPrivateKeyDeployer(config.infuraPrivateKey, config.infuraNetwork, config.infuraAPIKey, defaultConfigs);
			mockedSendTransaction = await mockSendTransaction(deployer.signer);
			contractWrapper = await deployer.deploy(ICOTokenContract);
		});

		afterEach(() => {
			sandbox.restore();
		});

		it('should wait for transaction correctly', async () => {
			const label = 'Transfer Ownership';
			const transferTransaction = await contractWrapper.contract.transferOwnership(config.randomAddress);
			const result = await contractWrapper.verboseWaitForTransaction(transferTransaction, label);
			assert(result.hasOwnProperty('transactionHash'), 'There is no transactionHash property of the result');
			assert(result.hasOwnProperty('blockHash'), 'There is no blockHash property of the result');
			assert(result.hasOwnProperty('logs'), 'There is no logs property of the result');
			assert(result.hasOwnProperty('events'), 'There is no events property of the result');
			assert(result.hasOwnProperty('status'), 'There is no status property of the result');
			const currentRecord = store.getCurrentWorkingRecord();
			const lastAction = currentRecord.actions[currentRecord.actions.length - 1];
			assert.strictEqual(lastAction.deployerType, 'DeployedContractWrapper', 'Deployer Type not set correctly');
			assert.strictEqual(lastAction.nameOrLabel, label, 'Label not set correctly');
			assert.strictEqual(lastAction.transactionHash, transferTransaction.hash, 'Transaction hash not set correctly');
			assert(lastAction.status == 0, 'status not set correctly');
			sandbox.assert.calledTwice(mockedSendTransaction);
		});

		it('should wait for transaction without label', async () => {
			const transferTransaction = await contractWrapper.contract.transferOwnership(config.randomAddress);
			const result = await contractWrapper.verboseWaitForTransaction(transferTransaction);
			assert(result.hasOwnProperty('transactionHash'), 'There is no transactionHash property of the result');
			assert(result.hasOwnProperty('blockHash'), 'There is no blockHash property of the result');
			assert(result.hasOwnProperty('logs'), 'There is no logs property of the result');
			assert(result.hasOwnProperty('events'), 'There is no events property of the result');
			assert(result.hasOwnProperty('status'), 'There is no status property of the result');
			sandbox.assert.calledTwice(mockedSendTransaction);
		});

		it('should throw error on transaction receipt status 0', async () => {
			const dummyTransaction = { gasPrice: 2000000 };
			const dummyTransactionReceipt = { status: 0, gasUsed: 300000 };

			try {
				await contractWrapper._postValidateTransaction(dummyTransaction, dummyTransactionReceipt);
				assert.fails("The deployment did not throw");
			} catch (e) {
				assert(e.message.includes("failed"), "Incorrect error was thrown");
			}
		});
	})

});

function mockSendTransaction(signer) {
	let sendTransactionStub = sandbox.stub(signer, 'sendTransaction');
	sendTransactionStub.callsFake(() => {
		return new Promise((resolve, reject) => {
			resolve({
				wait: async () => {
					return {
						contractAddress: config.randomDeployedAddress,
						gasUsed: config.defaultGasLimit,
						transactionHash: config.randomTxHash,
						blockHash: config.randomTxHash,
						logs: [],
						events: [],
						status: 1
					};
				},
				gasPrice: config.defaultGasPrice
			});
		});
	});
	return sendTransactionStub;
}
