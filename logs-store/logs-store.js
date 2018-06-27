var BlockingJSONStore = require('./blocking-json-store');

const storageDir = './.store'

/**
 * Store for the logs created by the deployment scripts.
 */
class LogsStore {


	constructor() {
		this._initHistoryRecord();
	}

	/**
	 * Initializes the history store with default empty array value
	 */
	_initHistoryRecord() {
		this._historyStore = BlockingJSONStore(`${storageDir}/.history.json`);

		const history = this.getHistory();
		this._HISTORY_ID = '' + history.length;

		const initialRecord = {
			actions: new Array()
		}
		return this._historyStore.set(this._HISTORY_ID, initialRecord)
	}

	/**
	 * Gets all stored historical records of deployments
	 */
	getHistory() {
		return this._historyStore.list();
	}

	/**
	 * 
	 * Add a record to the history of deployments
	 * 
	 * @param {*} deployerType type of deployer
	 * @param {*} nameOrLabel name of the contract or label of the transaction
	 * @param {*} transactionHash transaction hash if available
	 * @param {*} status 0 - success, 1 - failure
	 * @param {*} result arbitrary result text
	 */
	logAction(deployerType, nameOrLabel, transactionHash, status, result) {
		const now = Date.now();
		const record = {
			eventTimestamp: now,
			deployerType,
			nameOrLabel,
			transactionHash,
			status,
			result
		}

		const historyRecord = this._historyStore.get(this._HISTORY_ID);
		historyRecord.actions.push(record);
		this._historyStore.set(this._HISTORY_ID, historyRecord);

	}
}

const store = new LogsStore();

module.exports = store;