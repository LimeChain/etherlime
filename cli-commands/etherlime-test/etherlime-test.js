var Mocha = require("mocha");
var chai = require("chai");
var originalRequire = require("original-require");
let timeTravel = require('./time-travel');
let events = require('./events');

let accounts = require('./../ganache/setup.json').accounts;
let devnetAccounts = require('../ganache/devnet-setup.json');
let compiler = require('./../compiler/compiler');
let ethers = require('ethers');

chai.use(require("./assertions"));

const run = async (files, skipCompilation, solcVersion, port) => {
	var mochaConfig = { 'useColors': true };
	let mocha = createMocha(mochaConfig, files);

	files.forEach(function (file) {
		delete originalRequire.cache[file];

		mocha.addFile(file);
	});

	await setJSTestGlobals(port);

	if (!skipCompilation) {
		await compiler.run('.', undefined, solcVersion, false, undefined, false, true);
	}

	await runMocha(mocha);
}

const createMocha = (config, files) => {
	var mocha = new Mocha(config);

	files.forEach(file => {
		mocha.addFile(file);
	});

	return mocha;
}

const runMocha = async (mocha) => {
	return new Promise((resolve, reject) => {
		mocha.run(failures => {
			process.exitCode = failures ? -1 : 0;
			if (failures) {
				reject()
			} else {
				resolve()
			}
		});
	})
}

const setJSTestGlobals = async (port) => {
	global.ethers = ethers;
	global.assert = chai.assert;
	global.expect = chai.expect;
	global.utils = {
		timeTravel: timeTravel.timeTravel,
		setTimeTo: timeTravel.setTimeTo,
		latestTimestamp: timeTravel.latestTimestamp,
		parseLogs: events.parseLogs,
		hasEvent: events.hasEvent
	}
	const localNodeProvider = new ethers.providers.JsonRpcProvider(`http://localhost:${port}`);
	global.ganacheProvider = localNodeProvider;
	const importedAccounts = [];
	for (const acc of accounts) {
		importedAccounts.push({
			secretKey: acc.secretKey,
			wallet: new ethers.Wallet(acc.secretKey, localNodeProvider)
		})
	}
	global.accounts = importedAccounts;

	const localDevnetNodeProvider = new ethers.providers.JsonRpcProvider(`http://localhost:${devnetAccounts.defaultPort}`);
	global.devnetProvider = localDevnetNodeProvider;
	const importedDevnetAccounts = [];
	for (const acc of devnetAccounts.accounts) {
		let accJSONString = JSON.stringify(acc);
		let wallet = await new ethers.Wallet
			.fromEncryptedJson(accJSONString, devnetAccounts.defaultPassword);
		wallet = await wallet.connect(localDevnetNodeProvider);
		importedDevnetAccounts.push({
			secretKey: wallet.privateKey,
			wallet: wallet
		})
	}
	global.devnetAccounts = importedDevnetAccounts;
}

module.exports = {
	run
}
