const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const deploymentDir = './deployment';
const deploymentFileDestination = `${deploymentDir}/deploy.js`;
const contractsDir = './contracts';
const testsDir = './tests';

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

const createContractsFolder = () => {
	console.log('===== Creating contracts file structure =====')
	if (!fs.existsSync(contractsDir)) {
		fs.mkdirSync(contractsDir);
	}
}

const createTestsFolder = () => {
	console.log('===== Creating tests file structure =====')
	if (!fs.existsSync(testsDir)) {
		fs.mkdirSync(testsDir);
	}
}

const run = async () => {

	const libraryDirectory = __dirname;

	try {
		console.log('===== Installing etherlime =====');
		const { stdout, stderr } = await exec('npm install etherlime');
		console.log(stdout);
		createContractsFolder();
		createTestsFolder();
		createDeploymentDir();
		copyDeployFile(libraryDirectory);
		console.log(`Etherlime was successfully initialized! Check ${deploymentFileDestination} for your deployment script.`);
	} catch (e) {
		console.error(e.message);
	}
}

module.exports = {
	run
}