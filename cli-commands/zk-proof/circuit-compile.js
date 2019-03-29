const circom = require("circom");
const fs = require("fs");
const dir = require("node-dir");
const path = require("path");

const circuitsPath = './zero-knowledge-proof/circuits';
const compiledCircuits = './zero-knowledge-proof/compiled-circuits';

const run = async () => {

	createZKProofCompiledCircuitFolder()
	try {
		const circuitFiles = await findFiles(circuitsPath);
		await compileCircuits(circuitFiles);
		console.log('===== Compilation Finished =====');
	} catch (e) {
		console.log(e);
		return e
	}
};

let findFiles = async (workingDirectory) => {
	return new Promise((resolve, reject) => {
		dir.files(workingDirectory, function (err, files) {
			if (err) {
				return reject(err);
			}
			files = files.filter(function (file) {
				return path.extname(file) == ".circom" && path.basename(file)[0] != ".";
			});
			return resolve(files);
		})
	});
}

const createZKProofCompiledCircuitFolder = () => {
	if (!fs.existsSync(compiledCircuits)) {
		console.log('===== Creating ZK Proof compiled folder =====');
		fs.mkdirSync(compiledCircuits);
	}
}

const compileCircuits = async (circuitFiles) => {
	console.log('===== Compiling your circuits =====');
	for (circuitFile of circuitFiles) {
		let extension = path.extname(circuitFile, 'circom');
		let nameOfFile = path.basename(circuitFile, extension);
		try {
			let compiledCir = await circom.compile(circuitFile);
			fs.writeFileSync(`${compiledCircuits}/${nameOfFile}.json`, JSON.stringify(compiledCir, null, 1), "utf8")
		} catch (e) {
			throw e
		}
	}
}

module.exports = {
	run,
	findFiles
}