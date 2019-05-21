const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const deploymentDir = './deployment';
const deploymentFileDestination = `${deploymentDir}/deploy.js`;

const testDir = './test';
const testFileDestination = `${testDir}/exampleTest.js`;

const contractsDir = './contracts';
const contractFileDestination = `${contractsDir}/LimeFactory.sol`;

const zkProofDir = './zero-knowledge-proof';
const zkProofCircuitDir = './circuits';
const zkCircuitDestination = `${zkProofDir}/${zkProofCircuitDir}/circuit.circom`;

const zkInputParamsDir = './input';
const zkInputParamsDestionation = `${zkProofDir}/${zkInputParamsDir}/input.json`;

const packageJsonDestination = './package.json';

const gitIgnoreFileDestination = './.gitignore';

const logger = require('etherlime-logger').logger;

const createDeploymentDir = () => {
	logger.log('===== Creating deployment file structure =====');
	if (!fs.existsSync(deploymentDir)) {
		fs.mkdirSync(deploymentDir);
	}
};

const copyDeployFile = (libraryDirectory) => {
	if (fs.existsSync(deploymentFileDestination)) {
		throw new Error(`deploy.js already exists in ${deploymentDir} directory. You've probably already initialized etherlime for this project.`);
	}

	const deploymentFileSource = `${libraryDirectory}/deploymentTemplate.js`;

	fs.copyFileSync(deploymentFileSource, deploymentFileDestination);
};

const copyTestFile = (libraryDirectory) => {
	if (fs.existsSync(testFileDestination)) {
		throw new Error(`example.js already exists in ${testDir} directory. You've probably already initialized etherlime for this project.`);
	}

	const testFileSource = `${libraryDirectory}/testTemplate.js`;

	fs.copyFileSync(testFileSource, testFileDestination);
};

const copyContractFile = (libraryDirectory) => {
	if (fs.existsSync(contractFileDestination)) {
		throw new Error(`LimeFactory.sol already exists in ${contractsDir} directory. You've probably already initialized etherlime for this project.`);
	}

	const contractFileSource = `${libraryDirectory}/LimeFactory.sol`;
	fs.copyFileSync(contractFileSource, contractFileDestination);
};

const createContractsFolder = () => {
	logger.log('===== Creating contracts file structure =====');
	if (!fs.existsSync(contractsDir)) {
		fs.mkdirSync(contractsDir);
	}
};

const createTestsFolder = () => {
	logger.log('===== Creating tests file structure =====');
	if (!fs.existsSync(testDir)) {
		fs.mkdirSync(testDir);
	}
};

const copyPackageJsonFile = (libraryDirectory) => {
	logger.log('===== Generating package.json =====');

	if (fs.existsSync(packageJsonDestination)) {
		return;
	}

	const packageJsonFileSource = `${libraryDirectory}/package.json`;

	fs.copyFileSync(packageJsonFileSource, packageJsonDestination);
};

const createGitIgnoreFile = (libraryDirectory) => {
	if (!fs.existsSync(gitIgnoreFileDestination)) {
		logger.log('===== Creating .gitignore file =====');

		const gitIgnoreSource = `${libraryDirectory}/gitIgnoreSource.js`;

		fs.copyFileSync(gitIgnoreSource, gitIgnoreFileDestination)
	}
}

const createZKProofFolder = () => {
	logger.log('===== Creating ZK Proof file structure =====');
	if (!fs.existsSync(zkProofDir)) {
		fs.mkdirSync(zkProofDir);
	}
}

const createZKProofCircuitFolder = () => {
	logger.log('===== Creating ZK Proof circuit folder =====');
	if (!fs.existsSync(`${zkProofDir}/${zkProofCircuitDir}`)) {
		fs.mkdirSync(`${zkProofDir}/${zkProofCircuitDir}`);
	}
}

const copyCircuitFile = (libraryDirectory) => {
	if (fs.existsSync(zkCircuitDestination)) {
		throw new Error(`circuit.circom already exists in ${zkProofDir} directory. You've probably already initialized etherlime for this project.`);
	}

	const circuitFileSource = `${libraryDirectory}/circuit.circom`;
	fs.copyFileSync(circuitFileSource, zkCircuitDestination);
};

const createZKProofInputParamsFolder = () => {
	logger.log('===== Creating ZK Proof input params folder =====');
	if (!fs.existsSync(`${zkProofDir}/${zkInputParamsDir}`)) {
		fs.mkdirSync(`${zkProofDir}/${zkInputParamsDir}`);
	}
}

const copyInputParamsFile = (libraryDirectory) => {
	if (fs.existsSync(zkInputParamsDestionation)) {
		throw new Error(`input.json already exists in ${zkProofDir} directory. You've probably already initialized etherlime for this project.`);
	}
	const inputFileSource = `${libraryDirectory}/input.json`;
	fs.copyFileSync(inputFileSource, zkInputParamsDestionation);
};

const run = async (zkEnabled) => {
	const libraryDirectory = __dirname;

	try {
		logger.log('===== Installing etherlime =====');
		copyPackageJsonFile(libraryDirectory);
		const { stdout, stderr } = await exec('npm install etherlime-lib');
		logger.log(stdout);
		createContractsFolder();
		copyContractFile(libraryDirectory);
		createTestsFolder();
		createDeploymentDir();
		copyDeployFile(libraryDirectory);
		copyTestFile(libraryDirectory);
		createGitIgnoreFile(libraryDirectory)
		if (zkEnabled) {
			createZKProofFolder();
			createZKProofCircuitFolder();
			copyCircuitFile(libraryDirectory);
			createZKProofInputParamsFolder();
			copyInputParamsFile(libraryDirectory);
		}
		logger.log(`Etherlime was successfully initialized! Check ${deploymentFileDestination} for your deployment script.`);
	} catch (e) {
		throw new Error(e.message);
	}
};

module.exports = {
	run
};