const fs = require('fs');
const defaultDeploymentFilePath = `deployment/deploy.js`;
const { logsStore, logger, AppenderTypes } = require('etherlime-logger');
const utils = require('./../util');
let compiler = require('./../compiler/compiler');
const Verifier = require('../verifier/verifier');

const verifyDeploymentFile = (deploymentFile) => {
	if (!fs.existsSync(deploymentFile)) {
		throw new Error(`${deploymentFile} file not found. Probably you've not initialized etherlime. Please run etherlime init first.`)
	}
};

const getDeployMethod = (deploymentFilePath) => {
	const _deploymentFilePath = (deploymentFilePath) ? deploymentFilePath : defaultDeploymentFilePath;
	verifyDeploymentFile(_deploymentFilePath)
	const deploymentFile = `${process.cwd()}/${_deploymentFilePath}`;
	const deployModule = require(deploymentFile);

	return deployModule.deploy;
};

const run = async (deploymentFilePath, network, secret, silent, compile, runs, output, etherscanApiKey) => {
	if (compile && typeof (runs) === 'number') {
		await compiler.run('.', runs);
	} else if (compile) {
		await compiler.run('.');
	}
	const initialRecords = logsStore.getHistory();
	const deployMethod = getDeployMethod(deploymentFilePath);

	try {
		global.Verifier = new Verifier();
		await deployMethod(network, secret, etherscanApiKey);
		logger.log(`Your deployment script finished successfully!`);
	} catch (e) {
		if (!silent) {
			console.error(e);
		}

		logger.log(`Your deployment script finished with failure!`);
	}

	const records = logsStore.getHistory();

	if (initialRecords && initialRecords.length > 0) {
		if ((records.length == initialRecords.length) && records[records.length - 1]['actions'].length === initialRecords[initialRecords.length - 1]['actions'].length) {
			return
		}
	}

	const currentRecord = records[records.length - 1];
	logger.log(`\nHere is your report:`);

	if (output === AppenderTypes.NORMAL) {
		utils.printReportTable(currentRecord.actions);
	}
};

module.exports = {
	run
};