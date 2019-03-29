const zkSnark = require("snarkjs");
const fs = require("fs");
const dir = require("node-dir");
const path = require("path");

const compiledCircuitsPaths = './zero-knowledge-proof/compiled-circuits';
const trustedSetup = './zero-knowledge-proof/trusted-setup'

const run = async () => {

	createZKProofTrustedSetupFolder(trustedSetup)
	try {
		const compiledCircuitFiles = await findFiles(compiledCircuitsPaths);
		await createTrustedSetup(compiledCircuitFiles);
		console.log('===== Trusted Setup Completed =====');
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
				return path.extname(file) == ".json" && path.basename(file)[0] != ".";
			});
			return resolve(files);
		})
	});
}

const createZKProofTrustedSetupFolder = (folderPath) => {
	if (!fs.existsSync(folderPath)) {
		console.log('===== Creating ZK Proof trusted setup folder =====');
		fs.mkdirSync(folderPath);
	}
}

const createTrustedSetup = async (compiledCircuitFiles) => {
	console.log('===== Trusted Setup Started =====');
	console.log('===== Generating pk and vk =====');
	for (compiledCircuit of compiledCircuitFiles) {
		let extension = path.extname(compiledCircuit, 'json');
		let nameOfFile = path.basename(compiledCircuit, extension);
		try {
			const file = require(`${process.cwd()}/${compiledCircuit}`);
			let circuit = new zkSnark.Circuit(file);
			let setup = zkSnark.original.setup(circuit);
			fs.writeFileSync(`${trustedSetup}/${nameOfFile}_proving_key.json`, JSON.stringify(setup.vk_proof, null, 1), "utf8");
			fs.writeFileSync(`${trustedSetup}/${nameOfFile}_verification_key.json`, JSON.stringify(setup.vk_verifier, null, 1), "utf8");
		} catch (e) {
			throw e
		}
	}
}

module.exports = {
	run,
	findFiles
}