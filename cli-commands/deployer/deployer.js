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

const run = async (deploymentFilePath, network, verbose) => {
	const deployMethod = getDeployMethod(deploymentFilePath);
	logsStore.initHistoryRecord();
	try {
		await deployMethod(network);
		console.log(`Your deployment script finished successfully!`);
	} catch (e) {
		if (verbose) {
			console.error(e);
		}
		console.log(`Your deployment script finished with failure!`);
	}
	const currentRecord = logsStore.getCurrentWorkingRecord();
	console.log(`\nHere is your report:`);
	utils.printReportTable(currentRecord.actions);
}


module.exports = {
	run
}