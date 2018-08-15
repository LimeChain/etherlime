let etherlimeTest = require('./etherlime-test');

let dir = require('node-dir');
let Config = require('./../compiler/etherlime-config');

let App = require('./../../node_modules/solidity-coverage/lib/app');
let config = require('./coverage-config.json');
let accounts = require('./../ganache/setup.json').accounts;

const run = async (path, runCompilation) => {
	var config = Config.default();
	var testDirectory = '';

	if (path.includes('.js')) {
		etherlimeTest.run([path]);
		return;
	} 
	
	if (!path.includes(config.test_directory)) {
		testDirectory = `${process.cwd()}/${path}`;
	} else {
		testDirectory = path;
	}

	dir.files(testDirectory, (error, files) => {
		if (error) {
			throw new Error(error);
		}

		files = files.filter(function (file) {
			return file.match(config.test_file_extension_regexp) != null;
		});

		etherlimeTest.run(files, runCompilation);
	});
}

const runWithCoverage = async () => {
	var accountsData = ''
 	accounts.forEach(account => {
		let accountData = `--account "${account.secretKey},${account.balance.replace('0x', '')}" `;
		accountsData += accountData;
	});
	
	config["testrpcOptions"] = `${accountsData}`;
	const app = new App(config);
	app.generateCoverageEnvironment();
	app.instrumentTarget();
	app.launchTestrpc()
		.then(() => {
			app.runTestCommand();
			app.generateReport();
		})
		.catch(err => log(err));
}

module.exports = {
	run,
	runWithCoverage
}