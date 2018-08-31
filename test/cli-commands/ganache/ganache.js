var spawn = require('child_process').spawn;

function spawnProcess(dir, cmd) {
	return spawnLinuxProcess(dir, cmd);
}

function spawnLinuxProcess(dir, cmd) {
	var cmdParts = cmd.split(/\s+/);

	console.log(cmdParts);

	return spawn(cmdParts[0], cmdParts.slice(1), { node: dir });
}

function runCmdHandler(dir, cmd) {
	var process = null;
	console.log(cmd);

	try {
		process = spawnProcess(dir, cmd);
	} catch (e) {
		console.error("Error trying to execute command '" + cmd + "' in directory '" + dir + "'");
		console.error(e);
		console.log("error", e.message);
		console.log("finished");
		return;
	}

	process.stdout.on('data', function (data) {
		console.log('udri baj filipe');
		console.log("progress", data.toString('utf-8'));
	});

	process.stderr.on('data', function (data) {
		console.log("error", data.toString('utf-8'));
	});

	process.on('exit', function (code) {
		console.log("finished");
	});
}

runCmdHandler("./cli-commands/ganache", "etherlime ganache");


// const { spawn } = require('child_process');
//
// const ganache = require('../../../cli-commands/ganache/ganache');
// const ganacheCli = require('ganache-cli');
// const setup = require('../../../cli-commands/ganache/setup.json');
// const yargsParser = require('yargs-parser');
// const assert = require('assert');
//
// const DEFAULT_PORT = '8545';
// let server;
//
//
// const ls = spawn('ls', ['-lh', '/usr']);
//
// ls.stdout.on('data', (data) => {
// 	console.log(`stdout: ${data}`);
// });
//
// ls.stderr.on('data', (data) => {
// 	console.log(`stderr: ${data}`);
// });
//
// ls.on('close', (code) => {
// 	console.log(`child process exited with code ${code}`);
// });
//
//
// // const parsed = yargsParser('etherlime ganache --port 8888');
// // console.log(parsed);
//
// // async function lsExample() {
// // 	const ganachePorcess = await exec('node -e \'require("./cli-commands/ganache/ganache").run()\'');
// //
// // 	ganachePorcess.stdout.on('data', function (data) {
// // 		console.log(data);
// // 	});
// // }
// //
// // lsExample();
//
//
// // child_process.exec('node -e \'require("./cli-commands/ganache/ganache").run()\'', (err, stdout, stderr) => {
// // 	if (err) throw err;
// //
// // 	console.log(stdout, stderr);
// // });
//
//
// // describe('Ganache cli command', () => {
// //
// // 	beforeEach(() => {
// // 		// child_process.execFile('js', ['ganache.run()'], (err, stdout, stderr) => {
// // 		// 	if (err) throw err;
// // 		//
// // 		// 	console.log(stdout, stderr);
// // 		// });
// //
// // 		// server = ganacheCli.server({
// // 		// 	accounts: setup.accounts
// // 		// });
// // 	});
// //
// // 	afterEach(() => {
// // 		// server.close();
// // 	});
// //
// // 	describe('Run ganache server on default port', async () => {
// // 		it('should start ganache server on default port', () => {
// // 			// ganache.run();
// // 			// console.log(ganache.run().server);
// // 			// setTimeout(() => {
// // 			// 	console.log('timeout');
// // 			// }, 5000);
// // 		});
// // 	});
// // });