const spawn = require('child_process').spawn;

function spawnProcess(cmd) {
	return spawnLinuxProcess(cmd);
}

function spawnLinuxProcess(cmd) {
	let cmdParts = cmd.split(/\s+/);

	return spawn(cmdParts[0], cmdParts.slice(1));
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
			// console.log('outputLoaded:', outputLoaded)
			if (outputLoaded) {
				// console.log('RESOLVE')
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
			// console.log('HERE3', err);
			if (!err.includes('EADDRINUSE')) {
				// console.log('OGI HERE')
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
			}, 3000);
		}

		if (secondAdditionalCommand) {
			setTimeout(() => {
				commandOutput = '';
				process.stdin.write(secondAdditionalCommand);
			}, 4000);
		}

		if (thirdAdditionalCommand) {
			setTimeout(() => {
				commandOutput = '';
				process.stdin.write(thirdAdditionalCommand);
			}, 5000);
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