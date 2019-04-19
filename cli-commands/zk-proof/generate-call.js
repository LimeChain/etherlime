const zkSnark = require("snarkjs");
const fs = require("fs");

const generatedProofPath = './zero-knowledge-proof/generated-proof';
const generatedCallPath = './zero-knowledge-proof/generated-call';

const run = async (signals, proof) => {
	const publicSignals = require(`${process.cwd()}/${generatedProofPath}/${signals}`);
	const generatedProof = zkSnark.unstringifyBigInts((require(`${process.cwd()}/${generatedProofPath}/${proof}`)));

	createGenerateCallFolder(generatedCallPath);

	const generatedCall = await zkSnark.generateCall(publicSignals, generatedProof);
	
	
	fs.writeFileSync(`${generatedCallPath}/generatedCall.json`, zkSnark.stringifyBigInts(generatedCall));
	console.log('===== Generated Call Complete! =====');
	console.log('===== Generated Call: =====')
	console.log(generatedCall)
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