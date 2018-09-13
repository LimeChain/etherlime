const assert = require('chai').assert;
const runCmdHandler = require('../utils/spawn-child-process').runCmdHandler;
const killProcessByPID = require('../utils/spawn-child-process').killProcessByPID;
const getGanacheProcessState = require('../utils/child-process-states').getState;
const timeout = require('../utils/timeout').timeout;

const ganache = require('ganache-cli');
const setup = require('./setup.json');
const ganacheRun = require('../../../cli-commands/ganache/ganache').run;

const RUNNING_GANACHE_TIMEOUT = 5000;
const SECOND_TIMEOUT = 1000;

const DEFAULT_PORT = '8545';
const SPECIFIC_PORT = '8123';
const GANACHE_CLI_SERVER_PORT = '8130';

const ADDRESS_START_INDEX = 13;
const ADDRESS_LENGTH = 42;

const PRIVATE_KEY_START_INDEX = 69;
const PRIVATE_KEY_LENGTH = 66;

const FIRST_ACCOUNT_ADDRESS = '0xd9995bae12fee327256ffec1e3184d492bd94c31';
const FIRST_PRIVATE_KEY = '0x7ab741b57e8d94dd7e1a29055646bafde7010f38a900f55bbd7647880faa6ee8';

const THIRD_ACCOUNT_ADDRESS = '0x760bf27cd45036a6c486802d30b5d90cffbe31fe';
const THIRD_PRIVATE_KEY = '0x62ecd49c4ccb41a70ad46532aed63cf815de15864bc415c87d507afd6a5e8da2';

const TENTH_ACCOUNT_ADDRESS = '0x87e0ed760fb316eeb94bd9cf23d1d2be87ace3d8';
const TENTH_PRIVATE_KEY = '0xfac0bc9325ad342033afe956e83f0bf8f1e863c1c3e956bc75d66961fe4cd186';

let ganacheCommandOutput = '';

describe('Ganache cli command', () => {

	beforeEach(() => {
		ganacheCommandOutput = '';
	});

	describe('Run ganache server on specific port', async () => {
		it('should start ganache server on specific port', async () => {
			runCmdHandler('./cli-commands/ganache', 'etherlime ganache --port 8123');
			await timeout(RUNNING_GANACHE_TIMEOUT);
			ganacheCommandOutput = getGanacheProcessState()['ganacheCommandOutput'];
			const ganachePort = ganacheCommandOutput.substr(ganacheCommandOutput.length - 5).trim();

			assert.equal(ganachePort, SPECIFIC_PORT, 'The ganache server is not running on specific port');
		});
	});

	describe('Run ganache server and check accounts', async () => {
		it('should start ganache server and validate accounts', async () => {
			runCmdHandler('./cli-commands/ganache', 'etherlime ganache --port 8124');
			await timeout(RUNNING_GANACHE_TIMEOUT);

			ganacheCommandOutput = getGanacheProcessState()['ganacheCommandOutput'];

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
		});
	});

	describe('Run ganache server on already used port', async () => {
		it('should throw if we are trying to start ganache server on used port', async () => {
			runCmdHandler('./cli-commands/ganache', 'etherlime ganache --port 8125', false);

			await timeout(SECOND_TIMEOUT);

			const stillRunningPID = getGanacheProcessState()['runningChildProcessPID'];

			runCmdHandler('./cli-commands/ganache', 'etherlime ganache --port 8125');

			await timeout(RUNNING_GANACHE_TIMEOUT);

			killProcessByPID(stillRunningPID);

			assert.isTrue(getGanacheProcessState()['portErrorOnProcess'], 'The ganache server is running on used port');
		});
	});

	describe('Test ganache-cli server failed', async () => {
		it('should return if ganache serve failed', async () => {

			ganacheRun(GANACHE_CLI_SERVER_PORT, console);

			// const server = ganache.server({
			// 	accounts: setup.accounts,
			// 	console
			// });
			//
			// server.listen(GANACHE_CLI_SERVER_PORT, function (err, blockchain) {
			// 	console.log('before if ----------------------------');
			// 	err = new err();
			// 	if (err) {
			// 		console.log('inside if----------------------------');
			// 		console.log(err);
			// 		return;
			// 	}
			// });
			//
			// server.close();

		});
	});

});