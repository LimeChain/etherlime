const ganache = require('./ganache/ganache');
const init = require('./init/init');
const deployer = require('./deployer/deployer');
const history = require('./history/history');
const compiler = require('./compiler/compiler');
const test = require('./etherlime-test/test');

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
		commandProcessor: async (argv) => {
			await init.run();
		}
	},
	{
		command: 'deploy [file] [network] [secret] [withCompilation]',
		description: 'run the deployment script passed as file param (default ./deployment/deployer.js). You can optionally pass network param to be passed to the deployer for easy network switching. You can pass secret in order to pass non-committable data - suitable for private keys.',
		argumentsProcessor: (yargs) => {
			yargs.positional('file', {
				describe: 'port to run ganache-cli on',
				type: 'string'
			})

			yargs.positional('network', {
				describe: 'network param to pass to the deployment script',
				type: 'string'
			})

			yargs.positional('secret', {
				describe: 'secret string to be passed to your deployer. Useful for private keys or api keys',
				type: 'string'
			})

			yargs.positional('withCompilation', {
				describe: 'Enable compilation of the smart contracts before their deployment. By default the deployment is done without preliminary compilation',
				type: 'bool',
				default: false
			})
		},
		commandProcessor: (argv) => {
			deployer.run(argv.file, argv.network, argv.secret, argv.silent, argv.withCompilation);
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
	},
	{
		command: 'compile [dir] [runs] [solcVersion] [docker] [list] [all]',
		description: 'Compiles the smart contracts that are in the directory contracts in the path provided by the dir parameter (defaults to .)',
		argumentsProcessor: (yargs) => {
			yargs.positional('dir', {
				describe: 'Specifies the root dir to read the contracts and place the build folder',
				type: 'string',
				default: '.'
			})

			yargs.positional('runs', {
				describe: 'enables the optimizer and runs it the specified number of times',
				type: 'number'
			})

			yargs.positional('solcVersion', {
				describe: 'Sets the solc version used for compiling the smart contracts. By default it use the solc version from the node modules',
				type: 'string'
			})

			yargs.positional('docker', {
				describe: 'Enable the usage of a docker. By default it is set to false.',
				type: 'bool',
				default: false
			})

			yargs.positional('list', {
				describe: 'List available solc versions. The default is solcjs stable release',
				type: 'string'
			})

			yargs.positional('all', {
				describe: 'Print the full list',
				type: 'bool',
				default: false
			})
		},
		commandProcessor: (argv) => {
			compiler.run(argv.dir, argv.runs, argv.solcVersion, argv.docker, argv.list, argv.all);
		}
	},
	{
		command: 'test [path]',
		description: 'Run, by default, all the tests that are in the test directory',
		argumentsProcessor: (yargs) => {
			yargs.positional('path', {
				describe: 'Specifies the path in which tests should be runned',
				type: 'string',
				default: './test'
			})
		},
		commandProcessor: (argv) => {
			test.run(argv.path);
		}
	}
]

module.exports = commands;