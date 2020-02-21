const logger = require('etherlime-logger').logger;
const analyticsTracker = require('./analytics-tracker');

const commands = [{
		command: 'ganache [port] [output] [fork] [gasPrice] [gasLimit] [mnemonic] [count] [networkId] [unlock] [secure]',
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
			});

			yargs.positional('gasLimit', {
				describe: 'The block gas limit default is 0x6691b7',
				type: 'number'
			});

			yargs.positional('mnemonic', {
				describe: 'Pass mnemonic to generate account',
				type: 'string'
			});

			yargs.positional('count', {
				describe: 'Number of accounts to generate based on passed mnemonic',
				type: 'number',
				default: 1
			});

			yargs.positional('networkId', {
				describe: 'Specify the network id etherlime ganache will use to identify itself',
				type: 'number',
			});

			yargs.positional('unlock', {
				describe: 'Specify --unlock passing an address to unlock specific account/accounts',
				type: 'string',
			});

			yargs.positional('secure', {
				describe: 'Lock available accounts by default. (defaults to: false)',
				type: 'boolean',
				default: false
			});

		},
		commandProcessor: (argv) => {

			let {
				mnemonic,
				...rest
			} = argv; //removes sensitive data
			analyticsTracker.recordEvent('ganache', rest);
			logger.storeOutputParameter(argv.output);

			try {
				process.on('SIGINT', function () {
					console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");
					// some other closing procedures go here
					process.exit(1);
				});
				const ganache = require('./ganache/ganache');
				ganache.run(argv.port, logger, argv.fork, argv.gasPrice, argv.gasLimit, argv.mnemonic, argv.count, argv.networkId, argv.unlock, argv.secure);
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

			analyticsTracker.recordEvent('init', argv);
			logger.storeOutputParameter(argv.output);

			try {
				const init = require('./init/init');
				await init.run(argv.zk);
			} catch (err) {
				console.error(err);
			} finally {
				logger.removeOutputStorage();
			}
		}
	},
	{
		command: 'deploy [file] [network] [secret] [compile] [runs] [output] [etherscanApiKey]',
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
			yargs.positional('etherscanApiKey', {
				describe: 'Etherscan apiKey for contract verification API',
				type: 'string'
			});
		},
		commandProcessor: async (argv) => {

			logger.storeOutputParameter(argv.output);

			try {
				const deployer = require('./deployer/deployer');
				await deployer.run(argv.file, argv.network, argv.secret, argv.silent, argv.compile, argv.runs, argv.output, argv.etherscanApiKey);
			} catch (err) {
				console.error(err);
			} finally {
				logger.removeOutputStorage();
				let {
					secret,
					etherscanApiKey,
					...rest
				} = argv // removes sensitive data 
				analyticsTracker.recordEvent('deploy', rest);
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

			analyticsTracker.recordEvent('history', argv);
			logger.storeOutputParameter(argv.output);

			try {
				const history = require('./history/history');
				await history.run(argv.limit, argv.output);
			} catch (err) {
				console.error(err);
			} finally {
				logger.removeOutputStorage();
			}
		}
	},
	{
		command: 'compile [path] [runs] [solcVersion] [docker] [list] [all] [quite] [output] [buildDirectory] [deleteCompiledFiles] [exportAbi]',
		description: 'Compiles the smart contracts that are in the directory contracts in the path provided by the path parameter (defaults to .)',
		argumentsProcessor: (yargs) => {
			yargs.positional('path', {
				describe: 'Specifies the root path to read the contracts and place the build folder',
				type: 'string',
				default: '.'
			});

			yargs.positional('runs', {
				describe: 'enables the optimizer and runs it the specified number of times',
				type: 'number'
			});

			yargs.positional('solcVersion', {
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

			yargs.positional('deleteCompiledFiles', {
				describe: 'Delete previously compiled files from build directory before compilation of the contracts files',
				type: 'boolean',
				default: false
			});

			yargs.positional('exportAbi', {
				describe: 'Creates abi directory inside the build directory containing only the ABIs of all contract',
				type: 'boolean',
				default: false
			});
		},
		commandProcessor: async (argv) => {

			analyticsTracker.recordEvent('compile', argv);
			logger.storeOutputParameter(argv.output);

			try {
				const compiler = require('./compiler/compiler');
				await compiler.run(argv.path, argv.runs, argv.solcVersion, argv.docker, argv.list, argv.all, argv.quite, argv.buildDirectory, argv.workingDirectory, argv.deleteCompiledFiles, argv.exportAbi);
			} catch (err) {
				console.error(err);
			} finally {
				logger.removeOutputStorage();
			}
		}
	},
	{
		command: 'test [path] [timeout] [skip-compilation] [gas-report] [runs] [solc-version] [output] [port]',
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

			yargs.positional('runs', {
				describe: 'enables the optimizer and runs it the specified number of times',
				type: 'number'
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
				default: 2000
			});
		},
		commandProcessor: async (argv) => {

			analyticsTracker.recordEvent('test', argv);
			logger.storeOutputParameter(argv.output);

			try {
				const test = require('./etherlime-test/test');
				await test.run(argv.path, argv.timeout, argv.skipCompilation, argv.runs, argv.solcVersion, argv.gasReport, argv.port);
			} catch (err) {
				console.error(err);
			} finally {
				logger.removeOutputStorage();
			}
		}
	},
	{
		command: 'coverage [path] [timeout] [port] [solcVersion] [workingDirectory] [html] [ignoreFiles]',
		description: 'Run all tests with code coverage.',
		argumentsProcessor: (yargs) => {
			yargs.positional('path', {
				describe: 'Specifies the path in which tests should be ran',
				type: 'string',
				default: './test'
			});

			yargs.positional('port', {
				describe: 'The port to run the solidity coverage testrpc (compatible with etherlime ganache deployer)',
				type: 'number',
				default: 8545
			});

			yargs.positional('solcVersion', {
				describe: 'Sets the solc version used for compiling the smart contracts. By default it use the solc version from the node modules',
				type: 'string'
			});

			yargs.positional('workingDirectory', {
				describe: 'Defines which folder to use for reading contracts from, instead of the default one: ./contracts',
				type: 'string',
				default: './contracts'
			});

			yargs.positional('html', {
				describe: 'Defines whether to open automatically the html coverage report located in: ./coverage',
				type: 'boolean',
				default: 'false'
			});

			yargs.positional('timeout', {
				describe: 'Set test timeout in milliseconds',
				type: 'number',
				default: 2000
			});

			yargs.positional('ignoreFiles', {
				describe: 'Specifies files that should be omitted in coverage',
				type: 'string'
			});

		},
		commandProcessor: async (argv) => {

			analyticsTracker.recordEvent('coverage', argv);

			try {
				const test = require('./etherlime-test/test');
				await test.runCoverage(argv.path, argv.timeout, argv.port, argv.solcVersion, argv.workingDirectory, argv.html, argv.ignoreFiles);
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

			analyticsTracker.recordEvent('debug', argv);

			try {
				const debug = require('./debugger/index');
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

			analyticsTracker.recordEvent('shape', argv);
			logger.storeOutputParameter(argv.output);

			try {
				const shape = require('./shape/shape');
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
		argumentsProcessor: (yargs) => {},
		commandProcessor: (argv) => {

			analyticsTracker.recordEvent('opt-out', argv);

			try {
				analyticsTracker.optOutUser();
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

			analyticsTracker.recordEvent('flatten', argv);

			try {
				const flatten = require('./flattener/flatten');
				await flatten.run(argv.file, argv.solcVersion);
			} catch (err) {
				console.error(err);
			} finally {
				logger.removeOutputStorage();
			}
		}
	},
	{
		command: 'ide [port]',
		description: 'Runs web-based Solidity IDE that works with the file system',
		argumentsProcessor: (yargs) => {
			yargs.positional('port', {
				describe: 'Specifies the port ganache is running on',
				type: 'string'
			});
		},
		commandProcessor: async (argv) => {

			analyticsTracker.recordEvent('ide', argv);

			try {
				const ide = require('./etherlime-ide/etherlime-ide');
				await ide.run(argv.port);
			} catch (err) {
				console.error(err);
			} finally {
				logger.removeOutputStorage();
			}
		}
	},
	{
		command: 'zk <zk-command>',
		description: 'Ability to work with Zero Knowledge Concept',
		argumentsProcessor: (yargs) => {
			yargs.positional('zk-command', {
				describe: "Specify the desired command that you want to run: ['compile', 'setup', 'proof', 'verify', 'generate', 'call']",
				type: 'string',
				choices: ['compile', 'setup', 'proof', 'verify', 'generate', 'call']
			});
		},
		commandProcessor: async (argv) => {

			analyticsTracker.recordEvent('zk', argv);

			try {
				await zkCommandProcessor(argv);
			} catch (err) {
				console.error(err);
			} finally {
				logger.removeOutputStorage();
			}
		}
	}
];

const zkCommandProcessor = async (argv) => {

	// Set default command values for optional params:
	let signal = 'input.json';
	let circuit = 'circuit.json';
	let provingKey = 'circuit_proving_key.json';
	let publicSignals = 'circuit_public_signals.json';
	let proof = 'circuit_proof.json';
	let verifierKey = 'circuit_verification_key.json';

	// check command and optional scenarios:
	switch (argv.zkCommand) {
		case 'compile':
			const circuitCompile = require('./zk-proof/circuit-compile');
			await circuitCompile.run();
			break;
		case 'setup':
			const trustedSetup = require('./zk-proof/trusted-setup');
			await trustedSetup.run();
			break;
		case 'proof':
			if (argv.signal) {
				signal = argv.signal;
			}
			if (argv.circuit) {
				circuit = argv.circuit;
			}
			if (argv.provingKey) {
				provingKey = argv.provingKey;
			}
			const generateProof = require('./zk-proof/generate-proof');
			await generateProof.run(signal, circuit, provingKey);
			break;
		case 'verify':
			if (argv.publicSignals) {
				publicSignals = argv.publicSignals;
			}
			if (argv.proof) {
				proof = argv.proof;
			}
			if (argv.verifierKey) {
				verifierKey = argv.verifierKey;
			}
			const verifier = require('./zk-proof/verify-proof');
			await verifier.run(publicSignals, proof, verifierKey);
			break;
		case 'generate':
			if (argv.verifierKey) {
				verifierKey = argv.verifierKey;
			}
			const generateVerify = require('./zk-proof/generate-verify');
			await generateVerify.run(verifierKey);
			break;
		case 'call':
			if (argv.publicSignals) {
				publicSignals = argv.publicSignals;
			}
			if (argv.proof) {
				proof = argv.proof;
			}
			const generateCall = require('./zk-proof/generate-call');
			await generateCall.run(publicSignals, proof);
			break;
	}
}

module.exports = commands;