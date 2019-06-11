const zkSnark = require("snarkjs");
const fs = require("fs");
const path = require("path");

const compiledCircuitsPaths = './zero-knowledge-proof/compiled-circuits';
const trustedSetup = './zero-knowledge-proof/trusted-setup'

const run = async () => {

	createZKProofTrustedSetupFolder(trustedSetup)
	const compiledCircuitFiles = await findFiles(compiledCircuitsPaths);
	await createTrustedSetup(compiledCircuitFiles);
	console.log('===== Trusted Setup Completed =====');
};

let findFiles = async (workingDirectory) => {
	let files = [];

	const readFiles = await fs.readdirSync(workingDirectory);
	for (let i = 0; i < readFiles.length; i++) {
		let currentPath = path.join(workingDirectory, readFiles[i]);
		files.push(currentPath)
	}


	files = files.filter(function (file) {
		return path.extname(file) == ".json" && path.basename(file)[0] != ".";
	});
	return files;
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
		const file = require(`${process.cwd()}/${compiledCircuit}`);
		let circuit = new zkSnark.Circuit(file);
		let setup = zkSnark.original.setup(circuit);
		fs.writeFileSync(`${trustedSetup}/${nameOfFile}_proving_key.json`, JSON.stringify(zkSnark.stringifyBigInts(setup.vk_proof), null, 1), "utf8");
		fs.writeFileSync(`${trustedSetup}/${nameOfFile}_verification_key.json`, JSON.stringify(zkSnark.stringifyBigInts(setup.vk_verifier), null, 1), "utf8");
	}
}

module.exports = {
	run,
	findFiles
}