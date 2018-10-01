const assert = require('chai').assert;
const logger = require('./../../logger-service/logger-service').logger;
const loggerAppenderTypes = require('./../../logger-service/logger-service').AppenderTypes;
const hookStream = require('./../utils/hookup-standard-output').hookStream;
const timeout = require('./../utils/timeout').timeout;
const fsExtra = require('fs-extra');

const testData = 'This is test data';
const noneOutput = 'none';
const normalOutput = 'normal';
const structuredOutput = 'structured';
const timeoutToRemoveFileAsync = 1000;
const outputParameterStoragePath = `${process.cwd()}/.outputParameter`;

describe('Logger service ', () => {

	it('should store output to file', async () => {
		logger.storeOutputParameter(normalOutput);
		const fileExists = fsExtra.existsSync(outputParameterStoragePath);
		assert.isTrue(fileExists, 'The output parameter is not stored');
	});

	it('should get output parameter value from the stored file', async () => {
		const outputStoredValue = logger.getOutputParameterValue();
		assert.equal(normalOutput, outputStoredValue, 'The stored value is different from requested');
	});

	it('should delete file', async () => {
		const fileExistsBefore = fsExtra.existsSync(outputParameterStoragePath);
		assert.isTrue(fileExistsBefore, 'The output parameter is not stored');
		logger.removeOutputStorage();
		await timeout(timeoutToRemoveFileAsync);
		const fileExistsAfter = fsExtra.existsSync(outputParameterStoragePath);
		assert.isFalse(fileExistsAfter, 'The output parameter is still stored');
	});

	it('should return if the value is missing', async () => {
		logger.clearOutputCache();

		const throwingFunction = () => {
			logger.getOutputParameterValue();
		};

		assert.throws(throwingFunction, 'Missing the storage file for output parameter');
	});

	it('should log data based on output parameter', async () => {
		// NONE appender type
		logger.storeOutputParameter(noneOutput);

		const noneAppenderTypeLoggedToConsole = hookStdout();
		assert.isUndefined(noneAppenderTypeLoggedToConsole, 'The data is log to console');

		// ToDo: Update this case when implement structured option
		// STRUCTURED appender type
		logger.storeOutputParameter(structuredOutput);
		logger.log();

		// NORMAL appender type
		logger.storeOutputParameter(normalOutput);
		const normalAppenderTypeLoggedToConsole = hookStdout();

		assert.isTrue(normalAppenderTypeLoggedToConsole, 'The normal type does not log data to console');
	});

	it('should read the file if missing caching', async () => {
		logger.storeOutputParameter(normalOutput);
		logger.clearOutputCache();

		const readFromFileValue = logger.getOutputParameterValue();

		logger.removeOutputStorage();

		assert.equal(readFromFileValue, normalOutput, 'The stored value does not equal to requested');
	})

});

function hookStdout() {
	let logs = [];
	let dataLoggedToConsole;

	const unhookStdoutDefaultType = hookStream(process.stdout, function (string) {
		logs.push(string);
	});

	logger.log(testData);

	unhookStdoutDefaultType();

	for (let log of logs) {
		dataLoggedToConsole = log.includes(testData);

		if (dataLoggedToConsole) {
			break;
		}
	}

	return dataLoggedToConsole;
}