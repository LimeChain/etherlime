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

const CoverageAPI = require("solidity-coverage/api");
const utils = require('solidity-coverage/utils');
const client = require('ganache-cli');
const setup = require('../ganache/setup.json');
const logger = require('etherlime-logger').logger;
const path = require('path');
const fs = require("fs");

const COVERAGE_TEST_FOLDER = '.coverage_tests';
const COVERAGE_ARTIFACTS_FOLDER = '.coverage_artifacts';
const COVERAGE_CONTRACTS_FOLDER = '.coverage_contracts';
let coverageConfig;

const runCoverage = async (files, timeout, port, solcVersion, workingDirectory, shouldOpenCoverage, ignoreFiles) => {
	try {
		coverageConfig = {
			workingDir: '',
			contractsDir: path.join(process.cwd(), workingDirectory),
			logger: logger
		}

		let ignoredFilesArray;
		if (ignoreFiles) {
			ignoredFilesArray = ignoreFiles.split(',').map(function (item) {
				return item.trim();
			});
		}

		coverageApi = new CoverageAPI({
			client: client,
			port: port,
			providerOptions: {
				accounts: setup.accounts
			}
		});

		await prepareCoverageFiles(files, solcVersion, ignoredFilesArray, workingDirectory);
		await startGanache();

		var mochaConfig = {
			'useColors': true,
			'timeout': timeout
		};
		let mocha = createMocha(mochaConfig, files);

		files.forEach(function (file) {
			delete originalRequire.cache[file];

			mocha.addFile(file);
		});

		setJSTestGlobals(port);
		// TODO: Implement new gas report and use it.
		// if (enableGasReport) {
		// 	mocha.reporter(CustomReporter, {
		// 		port
		// 	});
		// }

		await runMocha(mocha);
		await coverageApi.report();
		await utils.finish(coverageConfig, coverageApi);
		await removeDir(`${process.cwd()}/${COVERAGE_TEST_FOLDER}`);
		openCoverage(shouldOpenCoverage);

	} catch (e) {
		await removeDir(`${process.cwd()}/${COVERAGE_TEST_FOLDER}`);
		await removeDir(`${process.cwd()}/${COVERAGE_ARTIFACTS_FOLDER}`);
		await removeDir(`${process.cwd()}/${COVERAGE_CONTRACTS_FOLDER}`);

		throw new Error(e);
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
		mocha.run(failures => {
			process.exitCode = failures ? -1 : 0;
			if (failures) {
				reject('Some of the test scenarios failed!')
			} else {
				resolve();

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
		snapshot: timeTravel.snapshot,
		revertState: timeTravel.revertState,
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


const prepareCoverageFiles = async (files, solcVersion, ignoredFilesArray, workingDirectory) => {
	const {
		tempContractsDir,
		tempArtifactsDir
	} = utils.getTempLocations(coverageConfig);

	utils.setupTempFolders(coverageConfig, tempContractsDir, tempArtifactsDir);

	const {
		targets,
		skipped
	} = utils.assembleFiles(coverageConfig, ignoredFilesArray);

	const instrumented = coverageApi.instrument(targets);

	utils.save(instrumented, coverageConfig.contractsDir, tempContractsDir);
	await compiler.run('.', undefined, solcVersion, false, undefined, false, true, tempArtifactsDir, tempContractsDir);
}

const startGanache = async () => {
	const address = await coverageApi.ganache();
}

const openCoverage = (shouldOpenCoverage) => {
	if (shouldOpenCoverage) {
		const url = `${process.cwd()}/coverage/index.html`;
		const start = (process.platform == 'darwin' ? 'open' : process.platform == 'win32' ? 'start' : 'xdg-open');
		require('child_process').exec(start + ' ' + url);
	}
}

const removeDir = async (dirPath) => {
	if (!fs.existsSync(dirPath)) {
		return;
	}

	let list = fs.readdirSync(dirPath);
	for (let i = 0; i < list.length; i++) {
		let filename = path.join(dirPath, list[i]);
		let stat = fs.statSync(filename);

		if (filename == "." || filename == "..") {
			// do nothing for current and parent dir
		} else if (stat.isDirectory()) {
			removeDir(filename);
		} else {
			fs.unlinkSync(filename);
		}
	}
	fs.rmdirSync(dirPath);
};

module.exports = {
	runCoverage,
}