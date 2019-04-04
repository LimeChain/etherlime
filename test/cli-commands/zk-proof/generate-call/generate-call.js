const assert = require('chai').assert;
let chai = require("chai");
let chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const fs = require('fs-extra');
const runCmdHandler = require('../../utils/spawn-child-process').runCmdHandler;

const proof = require('../examples/circuit_proof');
const proofWithErrors = require('../examples/circuit_proof-with-error');
const publicSignals = require('../examples/circuit_public_signals.json');

describe('etherlime generate-call command', () => {
	let currentDir;

	before(async function () {
		currentDir = process.cwd();
		fs.mkdirSync('./zkTmp')
		process.chdir('./zkTmp');
		fs.mkdirSync('./zero-knowledge-proof');
		fs.mkdirSync('./zero-knowledge-proof/generated-proof');
		fs.writeFileSync('./zero-knowledge-proof/generated-proof/circuit_proof.json', JSON.stringify(proof, null, 1), "utf8");
		fs.writeFileSync('./zero-knowledge-proof/generated-proof/circuit_public_signals.json', JSON.stringify(publicSignals, null, 1), "utf8");


	});

	it('should execute etherlime generate-call command', async () => {
		const expectedOutput = '===== Generated Call Complete! ====='
		const childResponse = await runCmdHandler(`etherlime zk-generate-call`, expectedOutput);
		assert.include(childResponse.output, expectedOutput, 'The generate-call process does not finish properly');
	});

	it('should execute etherlime generate-call command with optional params', async () => {
		const expectedOutput = '===== Generated Call Complete! ====='
		const childResponse = await runCmdHandler(`etherlime zk-generate-call --public_signals=circuit_public_signals.json --proof=circuit_proof.json`, expectedOutput);
		assert.include(childResponse.output, expectedOutput, 'The generate-call process does not finish properly');
	});

	it('should throw on generate-call error', async () => {
		fs.writeFileSync('./zero-knowledge-proof/generated-proof/circuit_proof-with-error.json', JSON.stringify(proofWithErrors, null, 1), "utf8");
		const expectedOutput = "TypeError: Cannot read property";
		const childResponse = await runCmdHandler(`etherlime zk-generate-call --proof=circuit_proof-with-error.json`, expectedOutput);
		assert.include(childResponse, expectedOutput, 'The generate-call process does not throw');
	});

	after(async function () {
		process.chdir(currentDir);
		fs.removeSync('./zkTmp');
	});

});