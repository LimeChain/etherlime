let etherlimeTest = require('./etherlime-test');
let etherlimeCoverage = require('./etherlime-coverage');
const fs = require('fs-extra');
const path = require('path');
let Config = require('./../compiler/etherlime-config');

const CoverageAPI = require("solidity-coverage/api");
const utils = require('solidity-coverage/utils');

const client = require('ganache-cli');
const setup = require('../ganache/setup.json');

const coverageConfig = {
	workingDir: process.cwd(),
	contractsDir: path.join(process.cwd(), 'contracts'),
	providerOptions: {
		port: 8545,
		accounts: setup.accounts
	}
}



const run = async (path, timeout, skipCompilation, runs, solcVersion, enableGasReport, port) => {

	var config = Config.default();
	var testDirectory = '';

	if (path.includes('.js')) {
		await etherlimeTest.run([path], timeout, skipCompilation, runs, solcVersion, enableGasReport, port);

		return;
	}

	testDirectory = path;

	if (!path.includes(config.test_directory)) {
		testDirectory = `${process.cwd()}/${path}`;
	}

	let files = await getFiles(testDirectory);
	files = files.filter(function (file) {
		return file.match(config.test_file_extension_regexp) != null;
	});

	await etherlimeTest.run(files, timeout, skipCompilation, runs, solcVersion, enableGasReport, port);
}

const getFiles = async function (testDirectory, files) {

	files = files || [];
	const readFiles = await fs.readdirSync(testDirectory);

	for (let i = 0; i < readFiles.length; i++) {
		const filePath = path.join(testDirectory, readFiles[i])
		if (fs.statSync(filePath).isDirectory()) {
			files = await getFiles(filePath, files);
		} else {
			files.push(filePath);
		}
	}
	return files;
}

const runCoverage = async (path, timeout, port, runs, solcVersion, buildDirectory, workingDirectory, shouldOpenCoverage, ignoreFiles) => {
	var config = Config.default();
	var testDirectory = '';
	// if (path.includes('.js')) {

	// 	await etherlimeCoverage.runCoverage([path], timeout, port, runs, solcVersion, buildDirectory, workingDirectory, shouldOpenCoverage, ignoreFiles);

	// 	return;
	// }

	testDirectory = path;

	if (!path.includes(config.test_directory)) {
		testDirectory = `${process.cwd()}/${path}`;
	}

	let files = await getFiles(testDirectory);
	files = files.filter(function (file) {
		return file.match(config.test_file_extension_regexp) != null;
	});
	// await etherlimeCoverage.runCoverage(files, timeout, port, runs, solcVersion, buildDirectory, workingDirectory, shouldOpenCoverage, ignoreFiles);

	const api = new CoverageAPI({
		client: client,
		port: 8545,
		providerOptions: {
			accounts: setup.accounts
		}
	});

	const {
		targets,
		skipped
	} = utils.assembleFiles(coverageConfig, files)

	const address = await api.ganache();
	console.log(address)

	const instrumented = api.instrument(targets);

	await etherlimeTest.run(files, timeout, false, runs, solcVersion, true, port);
	await api.report();
	await api.finish();

}

module.exports = {
	run,
	runCoverage
}