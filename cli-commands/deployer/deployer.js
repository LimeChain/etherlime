const fs = require('fs');
const defaultDeploymentFilePath = `deployment/deploy.js`;
const logsStore = require('./../../logs-store/logs-store');
const utils = require('./../util');
let compiler = require('./../compiler/compiler');
const logger = require('./../../logger-service/logger-service').logger;
const loggerAppenderTypes = require('./../../logger-service/logger-service').AppenderTypes;

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

const run = async (deploymentFilePath, network, secret, silent, compile, runs, output) => {
	if (output) {
		logger.storeOutputParameter(output);
	}

	if (compile && typeof(runs) === 'number') {
		await compiler.run('.', runs);
	} else if (compile) {
		await compiler.run('.');
	}

	const initialRecordsCount = logsStore.getHistory().length;
	const deployMethod = getDeployMethod(deploymentFilePath);

	try {
		await deployMethod(network, secret);
		logger.log(`Your deployment script finished successfully!`);
	} catch (e) {
		if (!silent) {
			console.error(e);
		}

		logger.log(`Your deployment script finished with failure!`);
	}

	const records = logsStore.getHistory();

	if (records.length == initialRecordsCount) {
		return;
	}

	const currentRecord = records[records.length - 1];
	logger.log(`\nHere is your report:`);

	if (!output || output === loggerAppenderTypes.NORMAL) {
		utils.printReportTable(currentRecord.actions);
	}

	logger.removeOutputStorage();
};

module.exports = {
	run
};