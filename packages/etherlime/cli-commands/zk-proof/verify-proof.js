const zkSnark = require("snarkjs");
const fs = require("fs");
const path = require("path");

const generatedProofPath = './zero-knowledge-proof/generated-proof';
const trustedSetupPath = './zero-knowledge-proof/trusted-setup';
const verifiedProof = './zero-knowledge-proof/verified-proof'

const run = async (signals, proof, vk) => {
	const publicSignals = require(`${process.cwd()}/${generatedProofPath}/${signals}`);
	const generatedProof = zkSnark.unstringifyBigInts((require(`${process.cwd()}/${generatedProofPath}/${proof}`)));
	const verifierKey = zkSnark.unstringifyBigInts(require(`${process.cwd()}/${trustedSetupPath}/${vk}`));

	createZKProofFolder(verifiedProof);

	await verifyProof(publicSignals, generatedProof, verifierKey);
	console.log('===== Verifying Completed. Please check output.json =====');
};

const createZKProofFolder = (folderPath) => {
	if (!fs.existsSync(folderPath)) {
		console.log('===== Creating ZK Verifier folder =====');
		fs.mkdirSync(folderPath);
	}
}

const verifyProof = async (publicSignals, generatedProof, verifierKey) => {
	console.log('===== Verifying Proof =====');
	const verified = await zkSnark.original.isValid(verifierKey, generatedProof, publicSignals);
	const timestamp = new Date().getTime();
	const object = {
		verified,
		timestamp
	}

	fs.writeFileSync(`${verifiedProof}/output.json`, JSON.stringify(object, null, 1), "utf8");
}

module.exports = {
	run
}