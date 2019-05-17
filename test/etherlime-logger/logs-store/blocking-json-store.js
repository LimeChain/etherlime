const jsonStore = require('./../../../packages/etherlime-logger/logs-store/blocking-json-store');
const assert = require('assert');
const fs = require('fs-extra')

describe('Blocking json store tests', () => {

	const testFilePath = './.testcases/.testStore.json';

	const key = 'key';
	const value = 'value';

	describe('Initialization tests', () => {

		let store;
		it('should create history file if it does not exist', () => {
			if (fs.existsSync(testFilePath)) {
				fs.unlinkSync(testFilePath);
			}
			store = jsonStore(testFilePath);
			assert(fs.existsSync(testFilePath), 'test store file was not created');
			const data = store.get();
			assert.equal(JSON.stringify(data), JSON.stringify({}), 'The data initialized was not empty array');
		})

		it('should work fine if the file does exist', () => {
			if (!fs.existsSync(testFilePath)) {
				fs.outputJsonSync(testFilePath, { data: {} });
			}
			store = jsonStore(testFilePath);
			assert(fs.existsSync(testFilePath), 'test store file was not created');
			const data = store.get();
			assert.equal(JSON.stringify(data), JSON.stringify({}), 'The data initialized was not empty array');
		})

		afterEach(() => {
			fs.unlinkSync(testFilePath);
		})
	})

	describe('Functionality tests', () => {

		let store;
		beforeEach(() => {
			store = jsonStore(testFilePath);
		})


		it('should work with the correctly', () => {
			store.set(key, value);
			const data = store.get(key);

			assert.strictEqual(value, data, 'The data returned from the store was not correct');

			store.remove(key);

			const removedData = store.get(key);

			assert.equal(removedData, undefined, 'The removed data was not undefined');
		})

		afterEach(() => {
			fs.unlinkSync(testFilePath);
		})

	})

});