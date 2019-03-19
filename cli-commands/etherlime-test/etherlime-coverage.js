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
const { CoverageSubprovider } = require("@0x/sol-coverage");
const SolCompilerArtifactAdapter = require('@0x/sol-coverage').SolCompilerArtifactAdapter;

const defaultFromAddress = "0xd9995bae12fee327256ffec1e3184d492bd94c31";
const isVerbose = true;
const artifacts = `coverage-artifacts`;
const Compiler = require('@0x/sol-compiler').Compiler;
const provider = new ProviderEngine();
const dir = require('node-dir');
const path = require('path');
const fs = require('fs')
const nyc = require('nyc');

const runCoverage = async (files, solcVersion, enableGasReport, port, runs, buildDirectory, workingDirectory) => {
	var mochaConfig = { 'useColors': true };
	let mocha = createMocha(mochaConfig, files);

	files.forEach(function (file) {
		delete originalRequire.cache[file];

		mocha.addFile(file);
	});

	const coverageProvider = await prepareCoverage(workingDirectory, port)
	await setJSTestGlobals(port, coverageProvider);
	if (enableGasReport) {
		mocha.reporter(CustomReporter, { port });
	}

	await compiler.run('.', undefined, solcVersion, false, undefined, false, true, undefined, workingDirectory);

	await compilationCoverageArtifacts(solcVersion, workingDirectory, runs, buildDirectory);
	await runMocha(mocha);
	await showCoverageResults();
}

const compilationCoverageArtifacts = async (solcVersion, workingDirectory, runs, buildDirectory) => {
	const compilerOptions = {
		contractsDir: workingDirectory,
		artifactsDir: artifacts,
		compilerSettings: {
			outputSelection: {
				['*']: {
					['*']: ['abi', 'evm.bytecode.object', 'evm.deployedBytecode.object'],
				},
			},
			optimizer: {
				enabled: runs ? true : false,
				runs: runs
			}
		},
		contracts: '*',
		solcVersion: solcVersion,
	};

	const compiler = new Compiler(compilerOptions);
	console.log('Preparing coverage environment and building artifacts...')
	await compiler.compileAsync();

	// TO DO - move in another method
	let buildFilesPaths = await findFiles(buildDirectory);
	let coverageBuildFilesPaths = await findFiles(artifacts);

	for (buildFilePath of buildFilesPaths) {
		for (coverageBuildFilePath of coverageBuildFilesPaths) {
			let buildFile = require(`${process.cwd()}/${buildFilePath}`);
			let coverageBuildFile = require(`${process.cwd()}/${coverageBuildFilePath}`);
			if (buildFile.contractName === coverageBuildFile.contractName) {
				coverageBuildFile.compilerOutput.evm.bytecode.object = buildFile.bytecode;
				coverageBuildFile.compilerOutput.evm.deployedBytecode.object = buildFile.deployedBytecode;
				coverageBuildFile.compilerOutput.abi = buildFile.abi;
				coverageBuildFile = JSON.stringify(coverageBuildFile, '', 2);
				fs.writeFileSync(coverageBuildFilePath, coverageBuildFile, 'utf-8')
			}
		}
	}
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
		mocha.run(async failures => {
			process.exitCode = failures ? -1 : 0;
			if (failures) {
				reject('Some of the test scenarios failed!')
			} else {
				await writeCoverageFile();
				resolve();

			}
		});
	})
}

const setJSTestGlobals = async (port, coverageProvider) => {
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
	// const localNodeProvider = new ethers.providers.JsonRpcProvider(`http://localhost:${port}`);
	const localNodeProvider = new ethers.providers.Web3Provider(coverageProvider)
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

const prepareCoverage = async (workingDirectory, port) => {
	let artifactAdapter = new SolCompilerArtifactAdapter(artifacts, workingDirectory);

	global.coverageSubprovider = new CoverageSubprovider(
		artifactAdapter,
		defaultFromAddress,
		isVerbose
	);
	provider.addProvider(global.coverageSubprovider);
	provider.addProvider(new RpcProvider({ rpcUrl: `http://localhost:${port}` }));
	global.provider = provider;

	provider.on('error', function (err) {
		// report connectivity errors
		console.error(err.stack)
	});

	// start pulling blocks
	provider.start(err => {
		if (err !== undefined) {
			console.log(err);
			process.exit(1);
		}
	});
	return provider

}

const writeCoverageFile = async () => {
	// await global.coverageSubprovider.writeCoverageAsync();
	provider.stop();
}

const showCoverageResults = async () => {
	const tableReport = new nyc({ 'tempDirectory': './coverage', 'reporter': 'text' });
	const htmlReport = new nyc({ 'tempDirectory': './coverage', 'reporter': 'html' });
	setTimeout(async () => {
		console.log();
		tableReport.report();
		htmlReport.report();
		console.log();
	}, 1000);
}

const findFiles = async (directory) => {
	return new Promise((resolve, reject) => {
		dir.files(directory, function (err, files) {
			if (err) {
				return reject(err);
			}
			files = files.filter(function (file) {
				return path.extname(file) == ".json" && path.basename(file)[0] != ".";
			});
			return resolve(files);
		})
	});
}

module.exports = {
	runCoverage
}
