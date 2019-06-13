const zkSnark = require("snarkjs");
const fs = require("fs");
const path = require("path");

const generatedProofPath = './zero-knowledge-proof/generated-proof';
const trustedSetupPath = './zero-knowledge-proof/trusted-setup';
const compiledCircuitsPath = './zero-knowledge-proof/compiled-circuits';
const signalsInputPath = './zero-knowledge-proof/input'

const run = async (signal, circuit, pk) => {
	const compiledCircuit = require(`${process.cwd()}/${compiledCircuitsPath}/${circuit}`);
	const inputSignal = require(`${process.cwd()}/${signalsInputPath}/${signal}`);
	const provingKey = zkSnark.unstringifyBigInts(require(`${process.cwd()}/${trustedSetupPath}/${pk}`));

	createZKProofFolder(generatedProofPath);

	const witness = calculateWitness(compiledCircuit, inputSignal);
	generateProof(provingKey, witness, circuit);
	console.log('===== Generation Finished =====');

};

const createZKProofFolder = (folderPath) => {
	if (!fs.existsSync(folderPath)) {
		console.log('===== Creating ZK Proof folder =====');
		fs.mkdirSync(folderPath);
	}
}

const calculateWitness = (compiledCircuit, signal) => {
	const circuit = new zkSnark.Circuit(compiledCircuit);
	const witness = circuit.calculateWitness(signal);
	return witness;
}

const generateProof = (provingKey, witness, circuit) => {
	console.log('===== Generating Proof =====');
	const proofObject = zkSnark.original.genProof(provingKey, witness);

	let extension = path.extname(circuit, 'json');
	let nameOfFile = path.basename(circuit, extension);
	fs.writeFileSync(`${generatedProofPath}/${nameOfFile}_proof.json`, JSON.stringify(zkSnark.stringifyBigInts(proofObject.proof), null, 1), "utf8");
	fs.writeFileSync(`${generatedProofPath}/${nameOfFile}_public_signals.json`, JSON.stringify(zkSnark.stringifyBigInts(proofObject.publicSignals), null, 1), "utf8");

}

module.exports = {
	run
}