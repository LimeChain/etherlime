const chalk = require('chalk');

const colorTransactionHash = chalk.bold.magenta;
const colorParams = chalk.yellow;
const colorName = chalk.bold.blueBright;
const colorSuccess = chalk.bold.green;
const colorAddress = chalk.bold.green;
const colorFailure = chalk.bold.red;
const colorNetwork = chalk.bold.rgb(165, 42, 42);
const colorAPIKey = chalk.bold.rgb(165, 42, 42);
const colorCommand = chalk.bold.yellow;

module.exports = {
	colorTransactionHash,
	colorParams,
	colorName,
	colorAddress,
	colorNetwork,
	colorAPIKey,
	colorFailure,
	colorSuccess,
	colorCommand
}