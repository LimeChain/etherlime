let etherlimeTest = require('./etherlime-test');
let etherlimeCoverage = require('./etherlime-coverage');
const fs = require('fs-extra');
const path = require('path');
let Config = require('./../compiler/etherlime-config');
const COVERAGE_TEST_FOLDER = '.coverage_tests';

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

const prepareTestFilesForCoverage = async (filePaths) => {
	function escapeRegExp(str) {
		return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
	}

	function replaceAll(str, find, replace) {
		return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
	}

	fs.mkdirSync(COVERAGE_TEST_FOLDER);

	// Handle signle file
	if (filePaths.includes('.js')) {
		readFile = fs.readFileSync(`${process.cwd()}/${filePaths}`, {
			encoding: "utf8"
		});
		const modifiedFile = replaceAll(readFile, '/build/', '/.coverage_artifacts/');
		const fileName = path.basename(filePaths);
		fs.writeFileSync(`${process.cwd()}/${COVERAGE_TEST_FOLDER}/${fileName}`, modifiedFile);
		return `${process.cwd()}/${COVERAGE_TEST_FOLDER}/${fileName}`;
	}

	// Handle folder with files
	filePaths.forEach(async (filePath) => {
		readFile = fs.readFileSync(filePath, {
			encoding: "utf8"
		});
		const modifiedFile = replaceAll(readFile, '/build/', '/.coverage_artifacts/');
		const fileName = path.basename(filePath);
		fs.writeFileSync(`${process.cwd()}/${COVERAGE_TEST_FOLDER}/${fileName}`, modifiedFile)
	});
}

const runCoverage = async (path, timeout, port, solcVersion, workingDirectory, shouldOpenCoverage, ignoreFiles) => {
	var config = Config.default();
	var testDirectory = '';
	if (path.includes('.js')) {

		filePath = await prepareTestFilesForCoverage(path);

		await etherlimeCoverage.runCoverage([filePath], timeout, port, solcVersion, workingDirectory, shouldOpenCoverage, ignoreFiles);
		return;
	}

	testDirectory = path;

	if (!path.includes(config.test_directory)) {
		testDirectory = `${process.cwd()}/${path}`;
	}

	let testFilePaths = await getFiles(testDirectory);

	let coverageTestDirectory = `${process.cwd()}/${COVERAGE_TEST_FOLDER}`;
	await prepareTestFilesForCoverage(testFilePaths);
	let files = await getFiles(coverageTestDirectory);

	files = files.filter(function (file) {
		return file.match(config.test_file_extension_regexp) != null;
	});

	await etherlimeCoverage.runCoverage(files, timeout, port, solcVersion, workingDirectory, shouldOpenCoverage, ignoreFiles);

}

module.exports = {
	run,
	runCoverage
}