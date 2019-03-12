var Mocha = require("mocha");
var chai = require("chai");
var originalRequire = require("original-require");
let timeTravel = require('./time-travel');
let events = require('./events');

let accounts = require('./../ganache/setup.json').accounts;
let compiler = require('./../compiler/compiler');
let ethers = require('ethers');
let CustomReporter = require('./gas-logger/gas-reporter');

chai.use(require("./assertions"));

const ProviderEngine = require("web3-provider-engine");
const RpcProvider = require("web3-provider-engine/subproviders/rpc.js");
const { TruffleArtifactAdapter } = require("@0x/sol-trace");
const { CoverageSubprovider } = require("@0x/sol-coverage");
const { RevertTraceSubprovider } = require("@0x/sol-trace");
const { AbstractArtifactAdapter } = require('@0x/sol-trace');
const SolCompilerArtifactAdapter = require('@0x/sol-coverage').SolCompilerArtifactAdapter;

const projectRoot = "";
const solcVersion = "0.5.0";
const defaultFromAddress = "0xd9995bae12fee327256ffec1e3184d492bd94c31";
const isVerbose = true;
const artifacts = `${process.cwd()}/ogiepich`;
const contracts = `${process.cwd()}/contracts`;

const artifactAdapter = new SolCompilerArtifactAdapter(artifacts, contracts);


const provider = new ProviderEngine();

// const Compiler = require('@0x/sol-compiler').Compiler;

// const compiler2 = new Compiler({ contractsDir: './contracts', artifactsDir: './ogiepich', contracts: '*' });

// (async () => {
// 	await compiler2.compileAsync();
// })().catch(console.log);


// const artifactAdapter = new TruffleArtifactAdapter(projectRoot, solcVersion);

const run = async (files, skipCompilation, solcVersion, enableGasReport, port) => {
	var mochaConfig = { 'useColors': true };
	let mocha = createMocha(mochaConfig, files);

	files.forEach(function (file) {
		delete originalRequire.cache[file];

		mocha.addFile(file);
	});

	setJSTestGlobals(port);
	if (enableGasReport) {
		mocha.reporter(CustomReporter, { port });
	}
	if (!skipCompilation) {
		await compiler.run('.', undefined, solcVersion, false, undefined, false, true);
	}

	await runMocha(mocha);
}

const run2 = async (files, skipCompilation, solcVersion, enableGasReport, port) => {
	await prepareCoverage();
	var mochaConfig = { 'useColors': true };
	let mocha = createMocha(mochaConfig, files);

	files.forEach(function (file) {
		delete originalRequire.cache[file];

		mocha.addFile(file);
	});

	setJSTestGlobals(port);
	if (enableGasReport) {
		mocha.reporter(CustomReporter, { port });
	}
	// if (!skipCompilation) {
	// 	await compiler.run('.', undefined, solcVersion, false, undefined, false, true);
	// }

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
				reject('Some of the test scenarios failed!')
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
	global.ganacheProvider = localNodeProvider
	const importedAccounts = new Array();
	for (const acc of accounts) {
		importedAccounts.push({
			secretKey: acc.secretKey,
			signer: new ethers.Wallet(acc.secretKey, localNodeProvider)
		})
	}
	global.accounts = importedAccounts;
}

const prepareCoverage = async () => {

	global.coverageSubprovider = new CoverageSubprovider(
		artifactAdapter,
		defaultFromAddress,
		isVerbose
	);


	provider.addProvider(global.coverageSubprovider);
	provider.addProvider(new RpcProvider({ rpcUrl: "http://localhost:8545" }));


	provider.start();

	provider.send = provider.sendAsync.bind(provider);
}

module.exports = {
	run,
	run2
}
