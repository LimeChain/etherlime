
const assert = require('chai').assert;
delete require.cache[require.resolve('./../../../packages/etherlime/logger-service/logger-service')];
let loggerWindow;


describe('Window compatible logger service', async () => {
	beforeEach(() => {
		global.window = {
			location: {
				href: {
					value: 'http://this.is.etherlime.test.value'
				}
			}
		}
		delete require.cache[require.resolve('./../../../packages/etherlime/logger-service/logger-service')];
		loggerWindow = require('./../../../packages/etherlime/logger-service/logger-service').logger;
	})

	it('should return undefined calling storeOutputParameter', async () => {
		const outputStoredValue = loggerWindow.storeOutputParameter();
		assert.deepEqual(outputStoredValue, undefined, 'The returned value is not undefined');
	});

	it('should return undefined calling removeOutputStorage', async () => {

		const outputStoredValue = loggerWindow.removeOutputStorage();

		assert.deepEqual(outputStoredValue, undefined, 'The returned value is not undefined');
	});

	it('should return undefined calling clearOutputCache', async () => {

		const outputStoredValue = loggerWindow.clearOutputCache();

		assert.deepEqual(outputStoredValue, undefined, 'The returned value is not undefined');
	});

	it('should return undefined calling updateOutputCache', async () => {

		const outputStoredValue = loggerWindow.updateOutputCache();

		assert.deepEqual(outputStoredValue, undefined, 'The returned value is not undefined');
	});

	it('should return undefined calling logToFile', async () => {

		const outputStoredValue = loggerWindow.logToFile();


		assert.deepEqual(outputStoredValue, undefined, 'The returned value is not undefined');
	});

	it('should return undefined calling log', async () => {

		const outputStoredValue = loggerWindow.log();

		assert.deepEqual(outputStoredValue, undefined, 'The returned value is not undefined');
	});

	it('should return undefined calling getOutputParameterValue', async () => {
		const outputStoredValue = loggerWindow.getOutputParameterValue();
		assert.deepEqual(outputStoredValue, undefined, 'The returned value is not undefined');
	});

	it('should return undefined calling logToConsole', async () => {

		const outputStoredValue = loggerWindow.logToConsole();

		assert.deepEqual(outputStoredValue, undefined, 'The returned value is not undefined');
	});
	it('should return undefined calling removeOutputStorage', async () => {

		const outputStoredValue = loggerWindow.removeOutputStorage();

		assert.deepEqual(outputStoredValue, undefined, 'The returned value is not undefined');
	});

	after(() => {
		global.window = undefined;
	})
});