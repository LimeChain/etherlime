#!/usr/bin/env node
const commands = require('./cli-commands/commands')

run = () => {

	let menu = require('yargs');
	for (const command of commands) {
		menu.command(command.command, command.description, command.argumentsProcessor, command.commandProcessor);
	}
	menu.command({
		command: '*',
		handler() {
			menu.showHelp()
		}
	})
	menu.help()
	menu.version();
	menu.demandCommand();
	menu.argv;
}

run();