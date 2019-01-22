const ganache = require('./ganache/ganache');
const init = require('./init/init');
const deployer = require('./deployer/deployer');
const history = require('./history/history');
const compiler = require('./compiler/compiler');
const test = require('./etherlime-test/test');
const logger = require('./../logger-service/logger-service').logger;
const eventTracker = require('./event-tracker');
const recordEvent = eventTracker.recordEvent

const commands = [
	{
		command: 'ganache [port] [output] [fork]',
		description: 'start etherlime ganache-cli instance with static accounts with a lot of ETH.',
		argumentsProcessor: (yargs) => {
			yargs.positional('port', {
				describe: 'port to run ganache-cli on',
				type: 'number'
			});

			yargs.positional('output', {
				describe: 'Defines the way that the logs are shown',
				type: 'string',
				default: 'normal',
				choices: ['none', 'normal', 'structured']
			});

			yargs.positional('fork', {
				describe: 'Define the fork network where etherlime ganache-cli can fork and continue to exists',
				type: 'string'
			})
		},
		commandProcessor: (argv) => {
			recordEvent('etherlime ganache', {
				argv
			});

			logger.storeOutputParameter(argv.output);

			try {
				ganache.run(argv.port, logger, argv.fork);
			} catch (err) {
				console.error(err);
			} finally {
				logger.removeOutputStorage();
			}
		}
	},
	{
		command: 'init [output]',
		description: 'initialize deployment folder structure and deployment files ready for etherlime deploy',
		argumentsProcessor: (yargs) => {
			yargs.positional('output', {
				describe: 'Defines the way that the logs are shown',
				type: 'string',
				default: 'normal',
				choices: ['none', 'normal', 'structured']
			});
		},
		commandProcessor: async (argv) => {
			recordEvent('etherlime init', {
				argv
			});
			logger.storeOutputParameter(argv.output);

			try {
				await init.run(argv.output);
			} catch (err) {
				console.error(err);
			} finally {
				logger.removeOutputStorage();
			}
		}
	},
	{
		command: 'deploy [file] [network] [secret] [compile] [runs] [output]',
		description: 'run the deployment script passed as file param (default ./deployment/deployer.js). You can optionally pass network param to be passed to the deployer for easy network switching. You can pass secret in order to pass non-committable data - suitable for private keys.',
		argumentsProcessor: (yargs) => {
			yargs.positional('file', {
				describe: 'port to run ganache-cli on',
				type: 'string'
			});

			yargs.positional('network', {
				describe: 'network param to pass to the deployment script',
				type: 'string'
			});

			yargs.positional('secret', {
				describe: 'secret string to be passed to your deployer. Useful for private keys or api keys',
				type: 'string'
			});

			yargs.positional('compile', {
				describe: 'Enable compilation of the smart contracts before their deployment. By default the deployment is done with a compilation',
				type: 'boolean',
				default: true
			});

			yargs.positional('runs', {
				describe: 'enables the optimizer and runs it the specified number of times',
				type: 'number'
			});

			yargs.positional('output', {
				describe: 'Defines the way that the logs are shown',
				type: 'string',
				default: 'normal',
				choices: ['none', 'normal', 'structured']
			});
		},
		commandProcessor: async (argv) => {
			logger.storeOutputParameter(argv.output);

			try {
				await deployer.run(argv.file, argv.network, argv.secret, argv.silent, argv.compile, argv.runs, argv.output);
			} catch (err) {
				console.error(err);
			} finally {
				logger.removeOutputStorage();
				const statistics = {
					argv
				}
				delete statistics.argv.secret;

				recordEvent('etherlime deploy', {
					statistics
				});
			}
		}
	},
	{
		command: 'history [limit] [output]',
		description: 'Show historical log of execution and reports of the executions.',
		argumentsProcessor: (yargs) => {
			yargs.positional('limit', {
				describe: 'Limit to the execution logs',
				type: 'number',
				default: 5
			});

			yargs.positional('output', {
				describe: 'Defines the way that the logs are shown',
				type: 'string',
				default: 'normal',
				choices: ['none', 'normal', 'structured']
			});
		},
		commandProcessor: async (argv) => {
			recordEvent('etherlime history', {
				argv
			});
			logger.storeOutputParameter(argv.output);

			try {
				await history.run(argv.limit, argv.output);
			} catch (err) {
				console.error(err);
			} finally {
				logger.removeOutputStorage();
			}
		}
	},
	{
		command: 'compile [dir] [runs] [solc-version] [docker] [list] [all] [quite] [output]',
		description: 'Compiles the smart contracts that are in the directory contracts in the path provided by the dir parameter (defaults to .)',
		argumentsProcessor: (yargs) => {
			yargs.positional('dir', {
				describe: 'Specifies the root dir to read the contracts and place the build folder',
				type: 'string',
				default: '.'
			});

			yargs.positional('runs', {
				describe: 'enables the optimizer and runs it the specified number of times',
				type: 'number'
			});

			yargs.positional('solc-version', {
				describe: 'Sets the solc version used for compiling the smart contracts. By default it use the solc version from the node modules',
				type: 'string'
			});

			yargs.positional('docker', {
				describe: 'Enable the usage of a docker. By default it is set to false.',
				type: 'boolean',
				default: false
			});

			yargs.positional('list', {
				describe: 'List available solc versions. The default is solcjs stable release',
				type: 'string'
			});

			yargs.positional('all', {
				describe: 'Print the full list',
				type: 'boolean',
				default: false
			});

			yargs.positional('quite', {
				describe: 'Disable verboseness during compilation. By the default is set to false.',
				type: 'boolean',
				default: false
			});

			yargs.positional('output', {
				describe: 'Defines the way that the logs are shown',
				type: 'string',
				default: 'normal',
				choices: ['none', 'normal', 'structured']
			});
		},
		commandProcessor: async (argv) => {
			recordEvent('etherlime compile', {
				argv
			});
			logger.storeOutputParameter(argv.output);

			try {
				await compiler.run(argv.dir, argv.runs, argv.solcVersion, argv.docker, argv.list, argv.all, argv.quite);
			} catch (err) {
				console.error(err);
			} finally {
				logger.removeOutputStorage();
			}
		}
	},
	{
		command: 'test [path] [skip-compilation] [solc-version] [output]',
		description: 'Run all the tests that are in the test directory',
		argumentsProcessor: (yargs) => {
			yargs.positional('path', {
				describe: 'Specifies the path in which tests should be ran',
				type: 'string',
				default: './test'
			});

			yargs.positional('skip-compilation', {
				describe: 'Skips compilation of the contracts before running the tests',
				type: 'boolean',
				default: 'false'
			});

			yargs.positional('solc-version', {
				describe: 'Sets the solc version used for compiling the smart contracts. By default it use the solc version from the node modules',
				type: 'string'
			});

			yargs.positional('output', {
				describe: 'Defines the way that the logs are shown',
				type: 'string',
				default: 'none',
				choices: ['none', 'normal', 'structured']
			});

			yargs.positional('port', {
				describe: 'The port that the etherlime ganache is running in order to instantiate the test accounts',
				type: 'number',
				default: 8545
			});

			yargs.positional('timeout', {
				describe: 'Set test timeout in milliseconds',
				type: 'number',
				default: 10000
			})
		},
		commandProcessor: async (argv) => {
			recordEvent('etherlime test', {
				argv
			});
			logger.storeOutputParameter(argv.output);

			try {
				await test.run(argv.path, argv.timeout, argv.skipCompilation, argv.solcVersion, argv.port);
			} catch (err) {
				console.error(err);
			} finally {
				logger.removeOutputStorage();
			}
		}
	},
	{
		command: 'coverage [path] [port] [runs]',
		description: 'Run all tests with code coverage.',
		argumentsProcessor: (yargs) => {
			yargs.positional('path', {
				describe: 'Specifies the path in which tests should be ran',
				type: 'string'
			})

			yargs.positional('port', {
				describe: 'The port to run the solidity coverage testrpc (compatible with etherlime ganache deployer)',
				type: 'number',
				default: 8545
			})

			yargs.positional('runs', {
				describe: 'enables the optimizer on the compiler and specifies the runs',
				type: 'number'
			})
		},
		commandProcessor: async (argv) => {
			recordEvent('etherlime coverage', {
				argv
			});
			await test.runWithCoverage(argv.path, argv.port, argv.runs);
		}
	}
]

module.exports = commands;