const fs = require('fs');
const defaultDeploymentFilePath = `deployment/deploy.js`;

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
		console.log(`Your deployment script finished successfully. Bye!`);
	} catch (e) {
		console.error(e.message);
	}

}


module.exports = {
	run
}