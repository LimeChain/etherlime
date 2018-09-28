const assert = require('chai').assert;
const loggeService = require('./../../logger-service/logger-service').loggerService;
const loggerAppenderTypes = require('./../../logger-service/logger-service').AppenderTypes;
const hookStream = require('./../utils/hookup-standard-output').hookStream;
const timeout = require('./../utils/timeout').timeout;
const fsExtra = require('fs-extra');

describe('Logger service ', () => {

	const testData = 'This is test data';
	const outputParameter = 'normal';
	const timeoutToRemoveFileAsync = 1000;
	const outputParameterStoragePath = `${process.cwd()}/.outputParameter.txt`;

	beforeEach(() => {
	});

	it('should log data to console', async () => {
		const logs = [];
		let dataLogged;

		// hook up standard output
		const unhookStdout = hookStream(process.stdout, function (string) {
			logs.push(string);
		});

		loggeService.logToConsole(testData);

		unhookStdout();

		for (let log of logs) {
			dataLogged = log.includes(testData);

			if (dataLogged) {
				break;
			}
		}

		assert.isTrue(dataLogged, 'The data is not logged to console.');
	});

	it('should store output to file', async () => {
		loggeService.storeOutputParameter(outputParameter);
		const fileExists = fsExtra.existsSync(outputParameterStoragePath);
		assert.isTrue(fileExists, 'The output parameter is not stored');
	});

	it('should get output parameter value from the stored file', async () => {
		const outputStoredValue = loggeService.getOutputParameterValue();
		assert.equal(outputParameter, outputStoredValue, 'The stored value is different from requested');
	});

	it('should delete file', async () => {
		const fileExistsBefore = fsExtra.existsSync(outputParameterStoragePath);
		assert.isTrue(fileExistsBefore, 'The output parameter is not stored');
		loggeService.removeOutputStorage();
		await timeout(timeoutToRemoveFileAsync);
		const fileExistsAfter = fsExtra.existsSync(outputParameterStoragePath);
		assert.isFalse(fileExistsAfter, 'The output parameter is still stored');
	});

	it('should return if the value is missing', async () => {
		const outputStoredValue = loggeService.getOutputParameterValue();
		assert.equal(outputStoredValue, '', 'Get method does not return empty string when the storage file is missing');
	});

});