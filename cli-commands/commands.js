const ganache = require('./ganache/ganache');
const init = require('./init/init');
const deployer = require('./deployer/deployer');
const history = require('./history/history');

const commands = [
	{
		command: 'ganache [port]',
		description: 'start etherlime ganache-cli instance with static accounts with a lot of ETH.',
		argumentsProcessor: (yargs) => {
			yargs.positional('port', {
				describe: 'port to run ganache-cli on',
				type: 'number'
			})
		},
		commandProcessor: (argv) => {
			ganache.run(argv.port, console);
		}
	},
	{
		command: 'init',
		description: 'initialize deployment folder structure and deployment files ready for etherlime deploy',
		argumentsProcessor: (yargs) => { },
		commandProcessor: (argv) => {
			init.run();
		}
	},
	{
		command: 'deploy [file] [network]',
		description: 'run the deployment script passed as file param (default ./deployment/deployer.js). You can optionally pass network param to be passed to the deployer for easy network switching.',
		argumentsProcessor: (yargs) => {
			yargs.positional('file', {
				describe: 'port to run ganache-cli on',
				type: 'string'
			})

			yargs.positional('network', {
				describe: 'network param to pass to the deployment script',
				type: 'string'
			})
		},
		commandProcessor: (argv) => {
			deployer.run(argv.file, argv.network, argv.verbose);
		}
	},
	{
		command: 'history [limit]',
		description: 'Show historical log of execution and reports of the executions.',
		argumentsProcessor: (yargs) => {
			yargs.positional('limit', {
				describe: 'Limit to the execution logs',
				type: 'number',
				default: 5
			})
		},
		commandProcessor: (argv) => {
			history.run(argv.limit, console);
		}
	}
]

module.exports = commands;