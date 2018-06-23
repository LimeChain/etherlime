const ganache = require('./ganache/ganache');

const commands = [
	{
		command: 'ganache [port]',
		description: 'start etherlime ganache-cli instance with static accounts with a lot of ETH. Use this with GanacheCliDeployer',
		argumentsProcessor: (yargs) => {
			yargs.positional('port', {
				describe: 'port to run ganache-cli on',
				type: 'number'
			})
		},
		commandProcessor: (argv) => {
			ganache.run(argv.port, console);
		}
	}
]

module.exports = commands;