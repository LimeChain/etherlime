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

const ganache = require('../ganache/ganache');
const child_process = require('child_process');
const ProviderEngine = require("web3-provider-engine");
const RpcProvider = require("web3-provider-engine/subproviders/rpc.js");
const { CoverageSubprovider } = require("@0x/sol-coverage");
const SolCompilerArtifactAdapter = require('@0x/sol-coverage').SolCompilerArtifactAdapter;

const defaultFromAddress = "0xd9995bae12fee327256ffec1e3184d492bd94c31";
const isVerbose = true;
let artifacts = `./coverage-artifacts`;
const Compiler = require('@0x/sol-compiler').Compiler;
const provider = new ProviderEngine();
const dir = require('node-dir');
const path = require('path');
const fs = require('fs')
var istanbul = require('istanbul');
const shell = require('shelljs');

const runCoverage = async (files, port, runs, solcVersion, buildDirectory, workingDirectory, shouldOpenCoverage) => {
	// await runCoverageGanacheEnvironment(port);
	var mochaConfig = { 'useColors': true };
	let mocha = createMocha(mochaConfig, files);
	mocha.reporter(CustomReporter, { port });

	files.forEach(function (file) {
		delete originalRequire.cache[file];

		mocha.addFile(file);
	});

	const coverageProvider = await prepareCoverage(workingDirectory, port)
	await setJSTestGlobals(port, coverageProvider);

	await compiler.run('.', undefined, solcVersion, false, undefined, false, true, buildDirectory, workingDirectory);
	await compilationCoverageArtifacts(solcVersion, workingDirectory, runs, buildDirectory);
	await runMocha(mocha);
	await generateCoverageReports(shouldOpenCoverage);
}

// Compile contracts in desired format in order to pass them to coverage library
const compilationCoverageArtifacts = async (solcVersion, workingDirectory, runs, buildDirectory) => {
	const compilerOptions = {
		contractsDir: `${process.cwd()}/${workingDirectory}`,
		artifactsDir: `${process.cwd()}/${artifacts}`,
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

	console.log('Preparing coverage environment and building artifacts...');
	// try {
	await compiler.compileAsync();
	// } catch (e) {
	// 	return e
	// }

	await prepareCoverageBuildedFiles(buildDirectory)
	// } catch (e) {
	// 	console.log('here error2', e)
	// 	return e
	// }

}

const prepareCoverageBuildedFiles = async (buildDirectory) => {
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

// Create mocha
const createMocha = (config, files) => {

	var mocha = new Mocha(config);

	files.forEach(file => {
		mocha.addFile(file);
	});

	return mocha;
}

// Run mocha
const runMocha = async (mocha) => {

	return new Promise((resolve, reject) => {
		mocha.run(async failures => {
			await writeCoverageFile();
			resolve();
		});
	})

}


// Set test globals
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


// Set and run coverage providers
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

	// start pulling blocks
	provider.start();
	return provider
}


// Run local etherlime ganache for coverage purpose
// const runCoverageGanacheEnvironment = async (port) => {
// 	const isPortTaken = await checkPort(port);
// 	if (isPortTaken) {
// 		return;
// 	}

// 	try {
// 		console.log(`Running etherlime ganache on port: ${port}`);
// 		ganache.run(port, {});
// 	} catch (e) {
// 		console.log(e);
// 	}
// }

// Check if port is busy, otherwise run the etherlime ganache
// const checkPort = async (port) => {
// 	return new Promise((resolve, reject) => {
// 		var net = require('net');
// 		var server = net.createServer();
// 		server.once('error', function (err) {
// 			if (err.code === 'EADDRINUSE') {
// 				resolve(true)
// 			}
// 		});

// 		server.once('listening', function () {
// 			// close the server if listening doesn't fail
// 			server.close();
// 			resolve(false)
// 		});
// 		server.listen(port);
// 	})
// }

// Write coverage.json file
const writeCoverageFile = async () => {
	await global.coverageSubprovider.writeCoverageAsync();
	provider.stop();
}


// Generate html report and table report 
const generateCoverageReports = async (shouldOpenCoverage) => {

	const collector = new istanbul.Collector();
	const reporter = new istanbul.Reporter();
	const sync = false;
	const coverageFile = require(`${process.cwd()}/coverage/coverage.json`);
	collector.add(coverageFile);
	reporter.add(['text']);
	reporter.add(['html']);

	setTimeout(async () => {
		console.log();
		await reporter.write(collector, sync, function () {
			console.log('All reports generated');
			if (shouldOpenCoverage) {
				const url = `${process.cwd()}/coverage/index.html`;
				const start = (process.platform == 'darwin' ? 'open' : process.platform == 'win32' ? 'start' : 'xdg-open');
				require('child_process').exec(start + ' ' + url);
			}
			// process.exit();
		});
	}, 10);
}


// Find compiled files from passed directory, e.g ./build
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
	runCoverage,
	findFiles
}
