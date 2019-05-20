

const assert = require('assert');
let store;

describe('Window compatible logs store', async function () {
	beforeEach(() => {
		global.window = {
			location: {
				href: {
					value: 'http://this.is.etherlime.test.value'
				}
			}
		}
		delete require.cache[require.resolve('./../../../packages/etherlime-logger/logs-store/logs-store')];
		store = require('./../../../packages/etherlime-logger/logs-store/logs-store');
	})
	it('should return undefined calling initHistoryRecord', async () => {
		const outputStoredValue = store.initHistoryRecord();
		assert.deepEqual(outputStoredValue, undefined, 'The returned value is not undefined');
	});

	it('should return undefined calling getHistory', async () => {
		const outputStoredValue = store.getHistory();
		assert.deepEqual(outputStoredValue, undefined, 'The returned value is not undefined');
	});

	it('should return undefined calling getCurrentWorkingRecord', async () => {
		const outputStoredValue = store.getCurrentWorkingRecord();
		assert.deepEqual(outputStoredValue, undefined, 'The returned value is not undefined');
	});

	it('should return undefined calling getLastWorkingRecord', async () => {
		const outputStoredValue = store.getLastWorkingRecord();
		assert.deepEqual(outputStoredValue, undefined, 'The returned value is not undefined');
	});

	it('should return undefined calling logAction', async () => {
		const outputStoredValue = store.logAction();
		assert.deepEqual(outputStoredValue, undefined, 'The returned value is not undefined');
	});

	after(async () => {
		global.window = undefined;
	})
});