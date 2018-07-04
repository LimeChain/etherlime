const store = require('./../../logs-store/logs-store');
const assert = require('assert');

describe('Logs store tests', () => {

	store.initHistoryRecord();

	const now = Date.now();
	const deployerType = 'Deployer Type';
	const label = 'Label Name';
	const transactionHash = '0x00'
	const status = 1;
	const result = 'Result of the transaction'

	let history;

	beforeEach(() => {
		history = store.getHistory();
	})

	it('should initialize the store', () => {
		store.initHistoryRecord();
		assert(store._historyStore.path.endsWith('.etherlime-store/.history.json'), 'Icorrect path');
		assert(store._HISTORY_ID == ('' + (history.length - 1)), "Incorrect Id");
	})

	it('should initialize logs correctly', () => {
		const currentRecord = store.getCurrentWorkingRecord();
		assert(Array.isArray(currentRecord.actions), 'The last record actions is not array');
	});

	it('should log actions correctly', () => {
		store.logAction(deployerType, label, transactionHash, status, result);

		const lastRecord = store.getLastWorkingRecord();
		const lastAction = lastRecord.actions[lastRecord.actions.length - 1];

		assert(lastAction.deployerType == deployerType, 'Deployer Type not set correctly');
		assert(lastAction.nameOrLabel == label, 'Label not set correctly');
		assert(lastAction.transactionHash == transactionHash, 'Transaction hash not set correctly');
		assert(lastAction.status == status, 'status not set correctly');
		assert(lastAction.eventTimestamp >= now, 'timestamp set was not correct');

		const currentRecord = store.getLastWorkingRecord();
		const currentAction = currentRecord.actions[currentRecord.actions.length - 1];

		assert(currentAction.deployerType == deployerType, 'Deployer Type not set correctly');
		assert(currentAction.nameOrLabel == label, 'Label not set correctly');
		assert(currentAction.transactionHash == transactionHash, 'Transaction hash not set correctly');
		assert(currentAction.status == status, 'status not set correctly');
		assert(currentAction.eventTimestamp >= now, 'timestamp set was not correct');
	});

	it('should not log if logs not inited', () => {
		let lastRecord = store.getCurrentWorkingRecord();
		const actionsBefore = lastRecord.actions.length;
		store.isInitied = false;

		store.logAction(deployerType, label, transactionHash, status, result);

		lastRecord = store.getCurrentWorkingRecord();
		const actionsAfter = lastRecord.actions.length;

		assert.equal(actionsBefore, actionsAfter, "The logger logged on not inited store");
	});

});