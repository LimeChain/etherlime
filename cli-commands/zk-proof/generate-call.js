const zkSnark = require("snarkjs");
const fs = require("fs");

const generatedProofPath = './zero-knowledge-proof/generated-proof';
const generatedCallPath = './zero-knowledge-proof/generated-call';

const run = async (signals, proof) => {
	const publicSignals = require(`${process.cwd()}/${generatedProofPath}/${signals}`);
	const generatedProof = zkSnark.unstringifyBigInts((require(`${process.cwd()}/${generatedProofPath}/${proof}`)));

	createGenerateCallFolder(generatedCallPath);

	const generatedCall = await zkSnark.generateCall(publicSignals, generatedProof);
	const object = {
		generatedCall
	}
	fs.writeFileSync(`${generatedCallPath}/generatedCall.json`, JSON.stringify(zkSnark.stringifyBigInts(object), null, 1), "utf8");
	console.log('===== Generated Call Complete! =====');
};

const createGenerateCallFolder = (folderPath) => {
	if (!fs.existsSync(folderPath)) {
		console.log('===== Creating Generated Call folder =====');
		fs.mkdirSync(folderPath);
	}
}

module.exports = {
	run
}