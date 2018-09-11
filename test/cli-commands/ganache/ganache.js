const spawn = require('child_process').spawn;
const assert = require('assert');

let ganacheCommandOutput = '';
let runningChildProcessPID = '';

function spawnProcess(dir, cmd) {
	return spawnLinuxProcess(dir, cmd);
}

function spawnLinuxProcess(dir, cmd) {
	let cmdParts = cmd.split(/\s+/);

	return spawn(cmdParts[0], cmdParts.slice(1), { node: dir });
}

function runCmdHandler(dir, cmd, closable = true) {
	let process = null;

	try {
		process = spawnProcess(dir, cmd);
		runningChildProcessPID = process.pid;
	} catch (e) {
		console.error(`Error trying to execute command ${cmd} in directory ${dir}`);
		console.error(e);
		console.log('error', e.message);
		console.log('Finished');
		return;
	}

	process.stdout.on('data', function (data) {
		let outputLoaded;

		ganacheCommandOutput += data.toString('utf-8');

		outputLoaded = data.toString('utf-8').includes('Listening on');

		if (outputLoaded && closable) {
			process.kill();
		}
	});

	process.stderr.on('data', function (data) {
		console.log('error', data.toString('utf-8'));
	});

	process.on('exit', function (code) {
		console.log("Finished");
	});
}

function killProcessByPID(pid) {
	process.kill(pid);
}

function timeout(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

const RUNNING_GANACHE_TIMEOUT = 5000;

const DEFAULT_PORT = '8545';
const SPECIFIC_PORT = '8080';

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

describe('Ganache cli command', () => {

	beforeEach(() => {
		ganacheCommandOutput = '';
	});

	xdescribe('Run ganache server on default or specific port', async () => {
		it('should start ganache server on default port', async () => {
			runCmdHandler('./cli-commands/ganache', 'etherlime ganache');
			await timeout(RUNNING_GANACHE_TIMEOUT);
			const ganachePort = ganacheCommandOutput.substr(ganacheCommandOutput.length - 5).trim();

			assert.equal(ganachePort, DEFAULT_PORT, 'The ganache server is not running on default port');
		});

		it('should start ganache server on specific port', async () => {
			runCmdHandler('./cli-commands/ganache', 'etherlime ganache --port 8080');
			await timeout(RUNNING_GANACHE_TIMEOUT);
			const ganachePort = ganacheCommandOutput.substr(ganacheCommandOutput.length - 5).trim();

			assert.equal(ganachePort, SPECIFIC_PORT, 'The ganache server is not running on specific port');
		});
	});

	xdescribe('Run ganache server and check accounts', async () => {
		it('should start ganache server and validate accounts', async () => {
			runCmdHandler('./cli-commands/ganache', 'etherlime ganache');
			await timeout(RUNNING_GANACHE_TIMEOUT);

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
			runCmdHandler('./cli-commands/ganache', 'etherlime ganache', false);

			const stillRunningPID = runningChildProcessPID;

			runCmdHandler('./cli-commands/ganache', 'etherlime ganache');

			await timeout(RUNNING_GANACHE_TIMEOUT);

			killProcessByPID(stillRunningPID);
		});
	});

});