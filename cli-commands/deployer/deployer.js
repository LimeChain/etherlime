const fs = require('fs');
const defaultDeploymentFilePath = `deployment/deploy.js`;
const logsStore = require('./../../logs-store/logs-store');
const utils = require('./../util');

const verifyDeploymentFile = (deploymentFile) => {
	if (!fs.existsSync(deploymentFile)) {
		throw new Error(`${deploymentFile} file not found. Probably you've not initialized etherlime. Please run etherlime init first.`)
	}
}

const getDeployMethod = (deploymentFilePath) => {
	const _deploymentFilePath = (deploymentFilePath) ? deploymentFilePath : defaultDeploymentFilePath;
	verifyDeploymentFile(_deploymentFilePath)
	const deploymentFile = `${process.cwd()}/${_deploymentFilePath}`;
	const deployModule = require(deploymentFile);
	return deployModule.deploy;
}

const run = async (deploymentFilePath, network, secret, verbose) => {
	const initialRecordsCount = logsStore.getHistory().length;
	const deployMethod = getDeployMethod(deploymentFilePath);
	try {
		await deployMethod(network, secret);
		console.log(`Your deployment script finished successfully!`);
	} catch (e) {
		if (verbose) {
			console.error(e);
		}
		console.log(`Your deployment script finished with failure!`);
	}

	const records = logsStore.getHistory();
	if (records.length == initialRecordsCount) {
		return;
	}
	const currentRecord = records[records.length - 1];
	console.log(`\nHere is your report:`);
	utils.printReportTable(currentRecord.actions);
}


module.exports = {
	run
}