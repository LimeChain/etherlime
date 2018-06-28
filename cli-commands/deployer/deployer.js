const fs = require('fs');
const defaultDeploymentFilePath = `deployment/deploy.js`;
const logsStore = require('../../logs-store/logs-store');
const utils = require('./util');

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

const run = async (deploymentFilePath, network) => {
	try {
		const deployMethod = getDeployMethod(deploymentFilePath);
		await deployMethod(network);
		const currentRecord = logsStore.getCurrentWorkingRecord();
		console.log(`Your deployment script finished successfully!`);
		utils.printReportTable(currentRecord.actions);
	} catch (e) {
		console.error(e.message);
	}
}


module.exports = {
	run
}