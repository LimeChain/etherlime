const assert = require('chai').assert;
let chai = require("chai");
let chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const fs = require('fs-extra');
const runCmdHandler = require('../../utils/spawn-child-process').runCmdHandler;


const vk = require('../examples/circuit_verification_key');
const vkWithError = require('../examples/circuit_verification_key-with-error');
const proof = require('../examples/circuit_proof');
const publicSignals = require('../examples/circuit_public_signals.json');

describe('etherlime verify command', () => {
	let currentDir;

	before(async function () {
		currentDir = process.cwd();
		fs.mkdirSync('./zkTmp')
		process.chdir('./zkTmp');
		fs.mkdirSync('./zero-knowledge-proof');
		fs.mkdirSync('./zero-knowledge-proof/trusted-setup');
		fs.mkdirSync('./zero-knowledge-proof/generated-proof');
		fs.writeFileSync('./zero-knowledge-proof/trusted-setup/circuit_verification_key.json', JSON.stringify(vk, null, 1), "utf8");
		fs.writeFileSync('./zero-knowledge-proof/generated-proof/circuit_proof.json', JSON.stringify(proof, null, 1), "utf8");
		fs.writeFileSync('./zero-knowledge-proof/generated-proof/circuit_public_signals.json', JSON.stringify(publicSignals, null, 1), "utf8");


	});

	it('should execute etherlime verify', async () => {
		const expectedOutput = '===== Verifying Completed. Please check output.json ====='
		const childResponse = await runCmdHandler(`etherlime zk-verify`, expectedOutput);
		assert.include(childResponse.output, expectedOutput, 'The verify process does not finish properly');
	});

	it('should execute etherlime verify with optional params', async () => {
		const expectedOutput = '===== Verifying Completed. Please check output.json ====='
		const childResponse = await runCmdHandler(`etherlime zk-verify --public_signals=circuit_public_signals.json --proof=circuit_proof --verifier_key=circuit_verification_key.json`, expectedOutput);
		assert.include(childResponse.output, expectedOutput, 'The verify process does not finish properly');
	});

	it('should throw on verify error', async () => {
		fs.writeFileSync('./zero-knowledge-proof/trusted-setup/circuit_verification_key-with-error.json', JSON.stringify(vkWithError, null, 1), "utf8");
		const expectedOutput = "TypeError: Cannot read property \'2\' of undefined";
		const childResponse = await runCmdHandler(`etherlime zk-verify --verifier_key=circuit_verification_key-with-error.json`, expectedOutput);
		assert.include(childResponse, expectedOutput, 'The verify process does not throw');
	});

	after(async function () {
		process.chdir(currentDir);
		fs.removeSync('./zkTmp');
	});

});