const assert = require('chai').assert;
const tcpPortUsed = require('tcp-port-used');
const runCmdHandler = require('../utils/spawn-child-process').runCmdHandler;
const killProcessByPID = require('../utils/spawn-child-process').killProcessByPID;
const timeout = require('../../utils/timeout').timeout;
const hookStream = require('../../utils/hookup-standard-output').hookStream;
const ganacheSetupFile = require('../../../cli-commands/ganache/setup.json');
const walletUtil = require('./../utils/wallet');
const find = require('find-process');

const ganache = require('ganache-cli');
const ganacheServerListenCallback = require('../../../cli-commands/ganache/ganache').ganacheServerListenCallback;
const ganacheRun = require('../../../cli-commands/ganache/ganache').run;

const START_SERVER_TIMEOUT = 10000;

const DEFAULT_PORT = ganacheSetupFile.defaultPort;
const SPECIFIC_PORT = 8123;
const RUN_DIRECT_PORT = 8124;

const ADDRESS_START_INDEX = 13;
const ADDRESS_LENGTH = 42;

const PRIVATE_KEY_START_INDEX = 69;
const PRIVATE_KEY_LENGTH = 66;

const FIRST_PRIVATE_KEY = ganacheSetupFile.accounts[0].secretKey;
const FIRST_ACCOUNT_ADDRESS = walletUtil.getAddressByPrivateKey(ganacheSetupFile.accounts[0].secretKey);

const THIRD_PRIVATE_KEY = ganacheSetupFile.accounts[2].secretKey;
const THIRD_ACCOUNT_ADDRESS = walletUtil.getAddressByPrivateKey(ganacheSetupFile.accounts[2].secretKey);

const TENTH_PRIVATE_KEY = ganacheSetupFile.accounts[9].secretKey;
const TENTH_ACCOUNT_ADDRESS = walletUtil.getAddressByPrivateKey(ganacheSetupFile.accounts[9].secretKey);

let ganacheCommandOutput;
let expectedOutput = 'Listening on';

describe('Ganache cli command', () => {

	describe('Ganache server used the default port', async () => {
		it('the default port should be used by ganache server', async () => {
			await timeout(START_SERVER_TIMEOUT);

			const defaultPortInUse = await tcpPortUsed.check(DEFAULT_PORT);

			assert.isTrue(defaultPortInUse, `The default port ${DEFAULT_PORT} is free`);
		});
	});

	describe('Run ganache server on specific port', async () => {
		it('should start ganache server on specific port', async () => {

			const portInUse = await tcpPortUsed.check(SPECIFIC_PORT);

			assert.isFalse(portInUse, `The specific port ${SPECIFIC_PORT} is in use`);

			const childResponse = await runCmdHandler(`etherlime ganache --port ${SPECIFIC_PORT}`, expectedOutput);

			console.log("11", childResponse.output)

			const portInUseAfterRunningGanache = await tcpPortUsed.check(SPECIFIC_PORT);

			assert.isTrue(portInUseAfterRunningGanache, `The specific port ${SPECIFIC_PORT} is free`);

			killProcessByPID(childResponse.process.pid);
		});
	});

	describe('Run ganache server and check accounts', async () => {
		it('should start ganache server and validate accounts', async () => {
			const childResponse = await runCmdHandler(`etherlime ganache --port ${SPECIFIC_PORT}`, expectedOutput);

			ganacheCommandOutput = childResponse.output;

			const rawAccountsString = ganacheCommandOutput.split(/\r?\n/).slice(0, 10);

			const firstOutputtedAddress = rawAccountsString[0].substr(ADDRESS_START_INDEX, ADDRESS_LENGTH);
			const firstOutputtedPrivateKey = rawAccountsString[0].substr(PRIVATE_KEY_START_INDEX, PRIVATE_KEY_LENGTH);

			assert.equal(firstOutputtedAddress, FIRST_ACCOUNT_ADDRESS, 'There is mismatch of first account address');
			assert.equal(firstOutputtedPrivateKey, FIRST_PRIVATE_KEY, 'There is mismatch of first account private key');

			const thirdOutputtedAddress = rawAccountsString[2].substr(ADDRESS_START_INDEX, ADDRESS_LENGTH);
			const thirdOutputtedPrivateKey = rawAccountsString[2].substr(PRIVATE_KEY_START_INDEX, PRIVATE_KEY_LENGTH);

			assert.equal(thirdOutputtedAddress, THIRD_ACCOUNT_ADDRESS, 'There is mismatch of third account address');
			assert.equal(thirdOutputtedPrivateKey, THIRD_PRIVATE_KEY, 'There is mismatch of third account private key');

			const tenthOutputtedAddress = rawAccountsString[9].substr(ADDRESS_START_INDEX, ADDRESS_LENGTH);
			const tenthOutputtedPrivateKey = rawAccountsString[9].substr(PRIVATE_KEY_START_INDEX, PRIVATE_KEY_LENGTH);

			assert.equal(tenthOutputtedAddress, TENTH_ACCOUNT_ADDRESS, 'There is mismatch of tenth account address');
			assert.equal(tenthOutputtedPrivateKey, TENTH_PRIVATE_KEY, 'There is mismatch of tenth account private key');

			killProcessByPID(childResponse.process.pid);
		});
	});

	describe('Run ganache server on already used port e.g. the default port', async () => {
		it('should throw if we are trying to start ganache server on used port', async () => {

			const childProcess = await runCmdHandler(`etherlime ganache --port ${DEFAULT_PORT}`, expectedOutput);

			assert.isTrue(childProcess.portInUse, 'The ganache server is running on used port');
		});
	});

	describe('Ganache server listen callback', async () => {
		it('should return and log error if ganache serve callback failed', async () => {

			const errorMessage = 'This message should be logged, if error occurs in callback';
			const err = new Error(errorMessage);
			const logs = [];
			let errorLogged;

			// hook up standard output
			const unhookStdout = hookStream(process.stdout, function (string, encoding, fd) {
				logs.push(string);
			});

			try {
				ganacheServerListenCallback(err);
				unhookStdout();
			} catch (err) {
				unhookStdout();
				console.error(err);
			}

			for (let log of logs) {
				errorLogged = log.includes(errorMessage);

				if (errorLogged) {
					break;
				}
			}

			assert.isTrue(errorLogged, 'The error is not logged. Return statement does not work');


		});
	});

	describe('Ganache server listen callback with accounts', async () => {
		it('should listen with dummy loaded accounts', async () => {
			const dummyBlockchainParams = {
				options: {
					accounts: ganacheSetupFile.accounts
				},
				personal_accounts: {
					secretKey1: ganacheSetupFile.accounts.secretKey,
					secretKey2: ganacheSetupFile.accounts.secretKey,
					secretKey3: ganacheSetupFile.accounts.secretKey,
					secretKey4: ganacheSetupFile.accounts.secretKey,
					secretKey5: ganacheSetupFile.accounts.secretKey,
					secretKey6: ganacheSetupFile.accounts.secretKey,
					secretKey7: ganacheSetupFile.accounts.secretKey,
					secretKey8: ganacheSetupFile.accounts.secretKey,
					secretKey9: ganacheSetupFile.accounts.secretKey,
					secretKey10: ganacheSetupFile.accounts.secretKey,
				}
			};

			const logs = [];
			let isServerListening = false;
			const serverListeningMessageStart = 'Listening on';

			// hook up standard output
			const unhookDummyConsole = hookStream(process.stdout, function (string, encoding, fd) {
				logs.push(string);
			});

			try {
				ganacheServerListenCallback(false, dummyBlockchainParams);
				unhookDummyConsole();
			} catch (err) {
				unhookDummyConsole();
				console.error(err);
			}

			for (let log of logs) {
				isServerListening = log.includes(serverListeningMessageStart);

				if (isServerListening) {
					break;
				}
			}

			assert.isTrue(isServerListening, 'The callback function with accounts - failed');
		});

		it('should run ganache server on passed port', async () => {
			const childProcess = await runCmdHandler(`etherlime ganache --port ${RUN_DIRECT_PORT}`, expectedOutput);

			const portInUseAfterDirectCallRun = await tcpPortUsed.check(RUN_DIRECT_PORT);

			assert.isTrue(portInUseAfterDirectCallRun, `The specific port ${RUN_DIRECT_PORT} is free`);

			killProcessByPID(childProcess.process.pid)
		});
	});
});
