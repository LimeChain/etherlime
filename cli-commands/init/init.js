const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const deploymentDir = './deployment';
const deploymentFileDestination = `${deploymentDir}/deploy.js`;

const testDir = './test';
const testFileDestination = `${testDir}/exampleTest.js`;

const contractsDir = './contracts';

const packageJsonDestination = './package.json'

const createDeploymentDir = () => {
	console.log('===== Creating deployment file structure =====')
	if (!fs.existsSync(deploymentDir)) {
		fs.mkdirSync(deploymentDir);
	}
}

const copyDeployFile = (libraryDirectory) => {
	if (fs.existsSync(deploymentFileDestination)) {
		throw new Error(`deploy.js already exists in ${deploymentDir} directory. You've probably already initialized etherlime for this project.`);
	}

	const deploymentFileSource = `${libraryDirectory}/deploymentTemplate.js`;

	fs.copyFileSync(deploymentFileSource, deploymentFileDestination);
}

const copyTestFile = (libraryDirectory) => {
	if (fs.existsSync(testFileDestination)) {
		throw new Error(`example.js already exists in ${testDir} directory. You've probably already initialized etherlime for this project.`);
	}

	const testFileSource = `${libraryDirectory}/testTemplate.js`;

	fs.copyFileSync(testFileSource, testFileDestination);
}

const createContractsFolder = () => {
	console.log('===== Creating contracts file structure =====')
	if (!fs.existsSync(contractsDir)) {
		fs.mkdirSync(contractsDir);
	}
}

const createTestsFolder = () => {
	console.log('===== Creating tests file structure =====')
	if (!fs.existsSync(testDir)) {
		fs.mkdirSync(testDir);
	}
}

const copyPackageJsonFile = (libraryDirectory) => {
	console.log('===== Generating package.json =====');

	if (fs.existsSync(packageJsonDestination)) {
		return;
	}

	const packageJsonFileSource = `${libraryDirectory}/package.json`;

	fs.copyFileSync(packageJsonFileSource, packageJsonDestination);
}

const run = async () => {

	const libraryDirectory = __dirname;

	try {
		console.log('===== Installing etherlime =====');
		copyPackageJsonFile(libraryDirectory);
		const { stdout, stderr } = await exec('npm install etherlime');
		console.log(stdout);
		createContractsFolder();
		createTestsFolder();
		createDeploymentDir();
		copyDeployFile(libraryDirectory);
		copyTestFile(libraryDirectory);
		console.log(`Etherlime was successfully initialized! Check ${deploymentFileDestination} for your deployment script.`);
	} catch (e) {
		console.error(e.message);
	}
}

module.exports = {
	run
}