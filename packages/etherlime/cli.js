#!/usr/bin/env node
const commands = require('./cli-commands/commands');
const { exec } = require('child_process');
const globalExceptionHandling = require('etherlime-utils').globalExceptionHandling;

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
	});

	menu.help('help');
	menu.option('silent', {
		alias: 's',
		default: false
	});
	menu.version();
	menu.demandCommand();
	menu.recommendCommands();
	menu.showHelpOnFail();
	menu.argv;

	globalExceptionHandling.handleException(err => {
		console.error(`${(new Date).toUTCString()} unhandledException:`, err.message)
		console.error(err.stack)
	})

	globalExceptionHandling.handleRejection(err => {
		console.error(`${(new Date).toUTCString()} unhandledRejection:`, err.message)
		console.error(err.stack)
	})
};

run();