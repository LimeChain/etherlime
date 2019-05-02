let etherlimeTest = require('./etherlime-test');
let etherlimeCoverage = require('./etherlime-coverage');
let dir = require('node-dir');
let Config = require('./../compiler/etherlime-config');

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

	const files = await getFiles(testDirectory, config);

	await etherlimeTest.run(files, timeout, skipCompilation, runs, solcVersion, enableGasReport, port);
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

const runCoverage = async (path, timeout, port, runs, solcVersion, buildDirectory, workingDirectory, shouldOpenCoverage) => {
	var config = Config.default();
	var testDirectory = '';
	if (path.includes('.js')) {

		await etherlimeCoverage.runCoverage([path], timeout, port, runs, solcVersion, buildDirectory, workingDirectory, shouldOpenCoverage);

		return;
	}

	testDirectory = path;

	if (!path.includes(config.test_directory)) {
		testDirectory = `${process.cwd()}/${path}`;
	}

	const files = await getFiles(testDirectory, config);
	await etherlimeCoverage.runCoverage(files, timeout, port, runs, solcVersion, buildDirectory, workingDirectory, shouldOpenCoverage);

}

module.exports = {
	run,
	runCoverage
}