const spawn = require('child_process').spawn;
const updateProcessState = require('./child-process-states').updateState;

function spawnProcess(dir, cmd) {
	return spawnLinuxProcess(dir, cmd);
}

function spawnLinuxProcess(dir, cmd) {
	let cmdParts = cmd.split(/\s+/);

	return spawn(cmdParts[0], cmdParts.slice(1), { node: dir });
}

function runCmdHandler(dir, cmd, closable = true) {
	let process = null;

	try {
		process = spawnProcess(dir, cmd);
		updateProcessState('runningChildProcessPID', process.pid);
	} catch (e) {
		console.error(`Error trying to execute command ${cmd} in directory ${dir}`);
		console.error(e);
		console.log('error', e.message);
		console.log('Finished');
		return;
	}

	process.stdout.on('data', function (data) {
		let outputLoaded;

		updateProcessState('ganacheCommandOutput', data.toString('utf-8'));

		outputLoaded = data.toString('utf-8').includes('Listening on');

		if (outputLoaded && closable) {
			process.kill();
		}
	});

	process.stderr.on('data', function (data) {
		const err = data.toString('utf-8');
		if (err.includes('EADDRINUSE')) {
			updateProcessState('portErrorOnProcess', true);
			console.log('Expected - the port is in use');
		} else {
			console.log(err);
		}
	});

	process.on('exit', function (code) {
		console.log("Finished");
	});
}

function killProcessByPID(pid) {
	process.kill(pid);
}

module.exports = {
	runCmdHandler,
	killProcessByPID
};