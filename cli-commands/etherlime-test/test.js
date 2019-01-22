let etherlimeTest = require('./etherlime-test');

let dir = require('node-dir');
let Config = require('./../compiler/etherlime-config');

let App = require('solidity-coverage/lib/app');
let defaultCoverageConfig = require('./coverage-config.json');
let accounts = require('./../ganache/setup.json').accounts;

const run = async (path, timeout, skipCompilation, solcVersion, port) => {

	var config = Config.default();
	var testDirectory = '';

	if (path.includes('.js')) {
		await etherlimeTest.run([path], timeout, skipCompilation, solcVersion, port);

		return;
	}

	testDirectory = path;

	if (!path.includes(config.test_directory)) {
		testDirectory = `${process.cwd()}/${path}`;
	}

	const files = await getFiles(testDirectory, config);

	await etherlimeTest.run(files, timeout, skipCompilation, solcVersion, port);
}

const getFiles = async function (testDirectory, config) {

	return new Promise((resolve, reject) => {
		dir.files(testDirectory, (error, files) => {
			if (error) {
				reject(new Error(error));

				return;
			}

			files = files.filter(function (file) {
				return file.match(config.test_file_extension_regexp) != null;
			});

			resolve(files);
		});
	});
}

const runWithCoverage = async (path, port, runs) => {
	var accountsData = ''
	accounts.forEach(account => {
		let accountData = `--account "${account.secretKey},${account.balance.replace('0x', '')}" `;
		accountsData += accountData;
	});

	const config = JSON.parse(JSON.stringify(defaultCoverageConfig));

	if (path) {
		config['testCommand'] = `${config['testCommand']} --path ${path}`;
	}

	if (runs) {
		config["compileCommand"] = `${config["compileCommand"]} --runs ${runs}`;
	}

	config['port'] = port;

	config["testrpcOptions"] = `${accountsData}`;

	if (port) {
		config["testrpcOptions"] += `--port ${port}`;
	}
	const app = new App(config);
	app.generateCoverageEnvironment();
	app.instrumentTarget();
	await app.launchTestrpc();
	app.runTestCommand();
	await app.generateReport();

}

module.exports = {
	run,
	runWithCoverage
}