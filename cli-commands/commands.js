const ganache = require('./ganache/ganache');
const init = require('./init/init');
const deployer = require('./deployer/deployer');
const history = require('./history/history');
const compiler = require('./compiler/compiler');
const test = require('./etherlime-test/test');
const shape = require('./shape/shape');
const logger = require('./../logger-service/logger-service').logger;
const eventTracker = require('./event-tracker');
const recordEvent = eventTracker.recordEvent
const debug = require('./debugger/index');
const flatten = require('./flattener/flatten');
const circuitCompile = require('./zk-proof/circuit-compile');
const trustedSetup = require('./zk-proof/trusted-setup');
const proof = require('./zk-proof/generate-proof');
const verifier = require('./zk-proof/verify-proof');
const generateVerify = require('./zk-proof/generate-verify');
const generateCall = require('./zk-proof/generate-call');
const ide = require('./etherlime-ide/etherlime-ide');

const commands = [
	{
		command: 'ganache [port] [output] [fork] [gasPrice] [gasLimit]',
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
			});

			yargs.positional('gasPrice', {
				describe: 'The price of gas in wei - default is 20000000000',
				type: 'number'
			})

			yargs.positional('gasLimit', {
				describe: 'The block gas limit default is 0x6691b7',
				type: 'number'
			})

		},
		commandProcessor: (argv) => {
			recordEvent('etherlime ganache', {
				argv
			});

			logger.storeOutputParameter(argv.output);

			try {
				ganache.run(argv.port, logger, argv.fork, argv.gasPrice, argv.gasLimit);
			} catch (err) {
				console.error(err);
			} finally {
				logger.removeOutputStorage();
			}
		}
	},
	{
		command: 'init [output] [zk]',
		description: 'initialize deployment folder structure and deployment files ready for etherlime deploy',
		argumentsProcessor: (yargs) => {
			yargs.positional('output', {
				describe: 'Defines the way that the logs are shown',
				type: 'string',
				default: 'normal',
				choices: ['none', 'normal', 'structured']
			});
		},

		argumentsProcessor: (yargs) => {
			yargs.positional('zk', {
				describe: 'Defines if to include in project a zk-proof folder with primary circuit for compiling',
				type: 'string',
				default: false,
			});
		},
		commandProcessor: async (argv) => {
			recordEvent('etherlime init', {
				argv
			});
			logger.storeOutputParameter(argv.output);

			try {
				await init.run(argv.zkEnabled);
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
		command: 'compile [dir] [runs] [solc-version] [docker] [list] [all] [quite] [output] [buildDirectory]',
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

			yargs.positional('buildDirectory', {
				describe: 'Defines where to place builded contracts',
				type: 'string',
			});

			yargs.positional('workingDirectory', {
				describe: 'Defines which folder to use for reading contracts from, instead of the default one: ./contracts',
				type: 'string',
			});
		},
		commandProcessor: async (argv) => {
			recordEvent('etherlime compile', {
				argv
			});
			logger.storeOutputParameter(argv.output);

			try {
				await compiler.run(argv.dir, argv.runs, argv.solcVersion, argv.docker, argv.list, argv.all, argv.quite, argv.buildDirectory, argv.workingDirectory);
			} catch (err) {
				console.error(err);
			} finally {
				logger.removeOutputStorage();
			}
		}
	},
	{
		command: 'test [path] [skip-compilation] [gas-report] [solc-version] [output] [port]',
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

			yargs.positional('gas-report', {
				describe: 'Enables Gas reporting future that will show Gas Usage after each test.',
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
		},
		commandProcessor: async (argv) => {
			recordEvent('etherlime test', {
				argv
			});
			logger.storeOutputParameter(argv.output);

			try {
				await test.run(argv.path, argv.skipCompilation, argv.solcVersion, argv.gasReport, argv.port);
			} catch (err) {
				console.error(err);
			} finally {
				logger.removeOutputStorage();
			}
		}
	},
	{
		command: 'coverage [path] [port] [runs] [solcVersion] [buildDirectory] [workingDirectory] [html]',
		description: 'Run all tests with code coverage.',
		argumentsProcessor: (yargs) => {
			yargs.positional('path', {
				describe: 'Specifies the path in which tests should be ran',
				type: 'string',
				default: './test'
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

			yargs.positional('solcVersion', {
				describe: 'Sets the solc version used for compiling the smart contracts. By default it use the solc version from the node modules',
				type: 'string'
			});

			yargs.positional('buildDirectory', {
				describe: 'Defines which folder to use for reading builded contracts from, instead of the default one: ./build',
				type: 'string',
				default: './build'
			})

			yargs.positional('workingDirectory', {
				describe: 'Defines which folder to use for reading contracts from, instead of the default one: ./contracts',
				type: 'string',
				default: './contracts'
			})

			yargs.positional('html', {
				describe: 'Defines whether to open automatically the html coverage report located in: ./coverage',
				type: 'string',
				default: 'false'
			})

		},
		commandProcessor: async (argv) => {
			recordEvent('etherlime coverage', {
				argv
			});
			try {
				await test.runCoverage(argv.path, argv.port, argv.runs, argv.solcVersion, argv.buildDirectory, argv.workingDirectory, argv.html);
			} catch (e) {
				console.error(e);
				global.provider.stop();
			} finally {
				logger.removeOutputStorage();
			}

		}
	},
	{
		command: 'debug [transactionHash] [port]',
		description: 'Debug transaction hash',
		argumentsProcessor: (yargs) => {
			yargs.positional('transactionHash', {
				describe: 'Specifies the transaction hash',
				type: 'string'
			})

			yargs.positional('port', {
				describe: 'The port to run the debugger for listening for local ganache',
				type: 'number',
				default: 8545
			})
		},
		commandProcessor: async (argv) => {
			recordEvent('etherlime debbuger', {
				argv
			});
			try {
				await debug.run(argv.transactionHash, argv.port)
			} catch (err) {
				console.error(err);
			} finally {
				logger.removeOutputStorage();
			}

		}
	},
	{
		command: 'shape [name]',
		description: 'Shapes ready to use dApp containing all files and settings.',
		argumentsProcessor: (yargs) => {
			yargs.positional('name', {
				describe: 'Specifies the name of the framework or library that the project will be build up.',
				type: 'string'
			})
		},
		commandProcessor: (argv) => {
			recordEvent('etherlime shape', {
				argv
			});

			logger.storeOutputParameter(argv.output);

			try {
				shape.run(argv.name);
			} catch (err) {
				console.error(err);
			} finally {
				logger.removeOutputStorage();
			}
		}
	},
	{
		command: 'opt-out',
		description: `Opt out of the event tracking etherlime uses in order to improve itself (please don't)`,
		argumentsProcessor: (yargs) => {
		},
		commandProcessor: (argv) => {
			recordEvent('etherlime opt-out', {
				argv
			});

			try {
				eventTracker.optOutUser();
			} catch (err) {
				console.error(err);
			} finally {
				logger.removeOutputStorage();
			}
		}
	},
	{
		command: 'flatten [file] [solcVersion]',
		description: 'Flattens a smart contract combining all Solidity code in one file along with imported sources.',
		argumentsProcessor: (yargs) => {
			yargs.positional('file', {
				describe: 'Specifies the file to be flattened',
				type: 'string'
			});

			yargs.positional('solcVersion', {
				describe: 'Specifies the version of the solidity compiler',
				type: 'string'
			});
		},
		commandProcessor: async (argv) => {
			try {
				await flatten.run(argv.file, argv.solcVersion);
			} catch (err) {
				console.error(err);
			} finally {
				logger.removeOutputStorage();
			}
		}
	},
	{
		command: 'ide',
		description: 'Runs web-based Solidity IDE that works with the file system',
		argumentsProcessor: (yargs) => {
		},
		commandProcessor: async (argv) => {
			try {
				await ide.run();
			} catch (err) {
				console.error(err);
			} finally {
				logger.removeOutputStorage();
			}
		}
	},
	{
		command: 'zk-circuit-compile',
		description: 'Compile a circuit file located in zero-knowledge-proof/circuits',
		argumentsProcessor: (yargs) => {

		},
		commandProcessor: async (argv) => {
			try {
				await circuitCompile.run();
			} catch (err) {
				console.error(err);
			} finally {
				logger.removeOutputStorage();
			}
		}
	},
	{
		command: 'zk-trusted-setup',
		description: 'Establish a trusted setup based on circuit and generates prooving key and verification key',
		argumentsProcessor: (yargs) => {

		},
		commandProcessor: async (argv) => {
			try {
				await trustedSetup.run();
			} catch (err) {
				console.error(err);
			} finally {
				logger.removeOutputStorage();
			}
		}
	},
	{
		command: 'zk-proof [signal] [circuit] [proving_key]',
		description: 'Generates a proof based on compiled circuit, public signal input and proving key',
		argumentsProcessor: (yargs) => {
			yargs.positional('signal', {
				describe: 'Specifies the file with signals to be used for generating a proof. Defaults to input.json',
				type: 'string',
				default: 'input.json'
			});
			yargs.positional('circuit', {
				describe: 'Specifies the compiled circuit for checking of matched signals. Defaults to: circuit.json',
				type: 'string',
				default: 'circuit.json'
			});
			yargs.positional('proving_key', {
				describe: 'Specifies the prooving key to be used for generating a proof. Defaults to: circuit_proving_key.json',
				type: 'string',
				default: 'circuit_proving_key.json'
			});
		},
		commandProcessor: async (argv) => {
			try {
				await proof.run(argv.signal, argv.circuit, argv.proving_key);
			} catch (err) {
				console.error(err);
			} finally {
				logger.removeOutputStorage();
			}
		}
	},
	{
		command: 'zk-verify [public_signals] [proof] [verifier_key]',
		description: 'Generates a verifier based on public signals file that comes out of the proof command, the proof itself and verifier key',
		argumentsProcessor: (yargs) => {
			yargs.positional('public_signals', {
				describe: 'Specifies the file with signals to be used for generating verifying a proof. Defaults to circuit_public_signals.json',
				type: 'string',
				default: 'circuit_public_signals.json'
			});
			yargs.positional('proof', {
				describe: 'Specifies the compiled proof that would be used for proving it. Defaults to: circuit_proof.json',
				type: 'string',
				default: 'circuit_proof.json'
			});
			yargs.positional('verifier_key', {
				describe: 'Specifies the verifier key to be used for checking if proof is valid. Defaults to: circuit_verification_key.json',
				type: 'string',
				default: 'circuit_verification_key.json'
			});
		},
		commandProcessor: async (argv) => {
			try {
				await verifier.run(argv.public_signals, argv.proof, argv.verifier_key);
			} catch (err) {
				console.error(err);
			} finally {
				logger.removeOutputStorage();
			}
		}
	},
	{
		command: 'zk-generate-verifier [verifier_key]',
		description: 'Generates a verifier smart contract based on verification key. The smart contract is written in contracts folder.',
		argumentsProcessor: (yargs) => {
			yargs.positional('verifier_key', {
				describe: 'Specifies the verifier key to be used for generating a verifier smart contract. Defaults to: circuit_verification_key.json',
				type: 'string',
				default: 'circuit_verification_key.json'
			});
		},
		commandProcessor: async (argv) => {
			try {
				await generateVerify.run(argv.verifier_key);
			} catch (err) {
				console.error(err);
			} finally {
				logger.removeOutputStorage();
			}
		}
	},
	{
		command: 'zk-generate-call [public_signals] [proof]',
		description: 'Establish a trusted setup based on circuit and generates proving key and verification key',
		argumentsProcessor: (yargs) => {
			yargs.positional('public_signals', {
				describe: 'Specifies the file with signals to be used for generating verifying a proof. Defaults to circuit_public_signals.json',
				type: 'string',
				default: 'circuit_public_signals.json'
			});
			yargs.positional('proof', {
				describe: 'Specifies the compiled proof that would be used for proving it. Defaults to: circuit_proof.json',
				type: 'string',
				default: 'circuit_proof.json'
			});
		},
		commandProcessor: async (argv) => {
			try {
				await generateCall.run(argv.public_signals, argv.proof);
			} catch (err) {
				console.error(err);
			} finally {
				logger.removeOutputStorage();
			}
		}
	}
]

module.exports = commands;