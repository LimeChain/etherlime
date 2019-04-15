const spawn = require('child_process').spawn;

function spawnProcess(cmd) {
	return spawnLinuxProcess(cmd);
}

function spawnLinuxProcess(cmd) {
	let cmdParts = cmd.split(/\s+(?=(?:[^\'"]*[\'"][^\'"]*[\'"])*[^\'"]*$)/g);
	let cmdCommands = [];
	for (let command of cmdParts) {
		if (command.startsWith('"') && command.endsWith('"')) {
			command = command.substring(1, command.length - 1);
		}
		cmdCommands.push(command);
	}

	return spawn(cmdCommands[0], cmdCommands.slice(1));
}

function runCmdHandler(cmd, outputCondition, additionalCommand, secondAdditionalCommand, thirdAdditionalCommand) {
	return new Promise((resolve, reject) => {
		let process = null;
		let commandOutput = '';

		try {
			process = spawnProcess(cmd);
		} catch (e) {
			console.error(`Error trying to execute command ${cmd} in directory ${dir}`);
			console.error(e);
			console.log('error', e.message);
			console.log('Finished');
			reject(new Error(e));
		}

		process.stdout.on('data', function (data) {
			let outputLoaded;

			commandOutput += data.toString('utf-8');
			outputLoaded = data.toString('utf-8').includes(outputCondition);
			if (outputLoaded) {
				const processRespond = {
					process: process,
					output: commandOutput,
					result: true
				};

				resolve(processRespond);
			}
		});

		process.stderr.on('data', function (data) {
            const err = data.toString('utf-8');
            if (!err.includes('EADDRINUSE') && err.includes(outputCondition)) {
                   return resolve(err);  
            }

            const errResponse = {
            	portInUse: true
                };
			resolve(errResponse);
            
        });

		if (additionalCommand) {
			setTimeout(() => {
				commandOutput = '';
				process.stdin.write(additionalCommand);
			}, 100);
		}

		if (secondAdditionalCommand) {
			setTimeout(() => {
				commandOutput = '';
				process.stdin.write(secondAdditionalCommand);
			}, 200);
		}

		if (thirdAdditionalCommand) {
			setTimeout(() => {
				commandOutput = '';
				process.stdin.write(thirdAdditionalCommand);
			}, 300);
		}
	});
}

function killProcessByPID(pid) {
	process.kill(pid);
}

module.exports = {
	runCmdHandler,
	killProcessByPID
};
