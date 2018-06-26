const fs = require('fs');

const deploymentDir = './deployment';
const deploymentFileDestination = `${deploymentDir}/deploy.js`;

const createDeploymentDir = () => {
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

const run = () => {

	const libraryDirectory = __dirname;

	try {
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