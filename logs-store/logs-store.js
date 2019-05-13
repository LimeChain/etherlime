var BlockingJSONStore = require('./blocking-json-store');

const storageDir = './.etherlime-store'
let store;
/**
 * Store for the logs created by the deployment scripts.
 */
class LogsStore {


	constructor() {
		this._historyStore = BlockingJSONStore(`${storageDir}/.history.json`);

		const history = this.getHistory();
		this._HISTORY_ID = '' + history.length;
		this.isInitied = false;
	}

	/**
	 * Initializes the history store with default empty array value
	 */
	initHistoryRecord() {
		if (this.isInitied) {
			return;
		}
		const initialRecord = {
			actions: new Array()
		}
		this._historyStore.set(this._HISTORY_ID, initialRecord)
		this.isInitied = true;
		return
	}

	/**
	 * Gets all stored historical records of deployments
	 */
	getHistory() {
		return this._historyStore.list();
	}

	/**
	 * Gets the record that logAction is going to be writing at.
	 */
	getCurrentWorkingRecord() {
		return this._historyStore.get(this._HISTORY_ID);
	}

	/**
	 * Gets the last written record.
	 */
	getLastWorkingRecord() {
		const history = this.getHistory();
		return this._historyStore.get('' + (history.length - 1));
	}

	/**
	 * 
	 * Add a record to the history of deployments
	 * 
	 * @param {*} deployerType type of deployer
	 * @param {*} nameOrLabel name of the contract or label of the transaction
	 * @param {*} transactionHash transaction hash if available
	 * @param {*} status 0 - success, 1 - failure
	 * @param {*} networkID id of the network
	 * @param {*} result arbitrary result text
	 */
	logAction(deployerType, nameOrLabel, transactionHash, status, gasPrice, gasUsed, networkID, result, solcVersion, verification) {
		if (!this.isInitied) {
			return;
		}

		const now = Date.now();
		const record = {
			eventTimestamp: now,
			deployerType,
			nameOrLabel,
			transactionHash,
			status,
			gasPrice,
			gasUsed,
			networkID,
			result,
			solcVersion,
			verification
		}

		const currentRecord = this.getCurrentWorkingRecord();
		currentRecord.actions.push(record);
		this._historyStore.set(this._HISTORY_ID, currentRecord);

	}
}

class WindowCompatibleLogsStore {

	constructor() {
	}
	initHistoryRecord() {
		return;
	}

	getHistory() {
		return;
	}

	getCurrentWorkingRecord() {
		return;
	}

	getLastWorkingRecord() {
		return;
	}

	logAction(deployerType, nameOrLabel, transactionHash, status, gasPrice, gasUsed, networkID, result) {
		return;

	}
}

if (typeof window === 'undefined') {
	store = new LogsStore();
} else {
	store = new WindowCompatibleLogsStore();
}

module.exports = store;