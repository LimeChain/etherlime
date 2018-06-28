#!/usr/bin/env node
const commands = require('./cli-commands/commands')
const { exec } = require('child_process');

run = () => {

	let menu = require('yargs');
	for (const command of commands) {
		menu.command(command.command, command.description, command.argumentsProcessor, command.commandProcessor);
	}
	menu.command({
		command: '*',
		handler(args) {
			exec(`${args['$0']} help`, (err, stdout, stderr) => {
				if (err) {
					throw new Error('Could not execute help');
					return;
				}

				console.log(`${stdout}`);
				console.error(`${stderr}`);
			});
		}
	})

	menu.help('help');
	menu.option('verbose', {
		alias: 'v',
		default: false
	});
	menu.version();
	menu.demandCommand();
	menu.recommendCommands();
	menu.showHelpOnFail();
	menu.argv;
}

run();