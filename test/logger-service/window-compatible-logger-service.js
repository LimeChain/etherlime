global.window = {
	location: {
		href: {
			value: 'http://this.is.etherlime.test.value'
		}
	}
}
let loggerWindow;
loggerWindow = require('./../../logger-service/logger-service').logger;
const assert = require('chai').assert;
delete require.cache[require.resolve('./../../logger-service/logger-service')];
loggerWindow = require('./../../logger-service/logger-service').logger;


describe('Window compatible logger service', async () => {

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
	it('should return undefined calling test', async () => {

		const outputStoredValue = loggerWindow.removeOutputStorage();

		assert.deepEqual(outputStoredValue, undefined, 'The returned value is not undefined');
	});

	after(() => {
		global.window = undefined;
	})
});