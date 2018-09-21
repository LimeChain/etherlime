const spawn = require('child_process').spawn;

function spawnProcess(dir, cmd) {
	return spawnLinuxProcess(dir, cmd);
}

function spawnLinuxProcess(dir, cmd) {
	let cmdParts = cmd.split(/\s+/);

	return spawn(cmdParts[0], cmdParts.slice(1), { node: dir });
}

function runCmdHandler(dir, cmd) {
	return new Promise((resolve, reject) => {
		let process = null;
		let ganacheCommandOutput = '';

		try {
			process = spawnProcess(dir, cmd);
		} catch (e) {
			console.error(`Error trying to execute command ${cmd} in directory ${dir}`);
			console.error(e);
			console.log('error', e.message);
			console.log('Finished');
			reject(new Error(e));
		}

		process.stdout.on('data', function (data) {
			let outputLoaded;

			ganacheCommandOutput += data.toString('utf-8');

			outputLoaded = data.toString('utf-8').includes('Listening on');

			if (outputLoaded) {
				const processRespond = {
					process: process,
					output: ganacheCommandOutput
				};

				resolve(processRespond);
			}
		});

		process.stderr.on('data', function (data) {
			const err = data.toString('utf-8');

			if (!err.includes('EADDRINUSE')) {
				resolve(err);
			}

			const errResponse = {
				portInUse: true
			};

			resolve(errResponse);
		});
	});
}

function killProcessByPID(pid) {
	process.kill(pid);
}

module.exports = {
	runCmdHandler,
	killProcessByPID
};