const assert = require('chai').assert;
let chai = require("chai");
let chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const fs = require('fs-extra');
const runCmdHandler = require('../../utils/spawn-child-process').runCmdHandler;


const vk = require('../examples/circuit_verification_key');
const vkWithError = require('../examples/circuit_verification_key-with-error');

describe('etherlime generate-verifier command', () => {
	let currentDir;

	before(async function () {
		currentDir = process.cwd();
		fs.mkdirSync('./zkTmp')
		process.chdir('./zkTmp');
		fs.mkdirSync('./contracts');
		fs.mkdirSync('./zero-knowledge-proof');
		fs.mkdirSync('./zero-knowledge-proof/trusted-setup');
		fs.writeFileSync('./zero-knowledge-proof/trusted-setup/circuit_verification_key.json', JSON.stringify(vk, null, 1), "utf8");
	});

	it('should execute etherlime generate-verifier command', async () => {
		const expectedOutput = '===== Smart Contract Created Successfully. Please check your contracts folder ====='
		const childResponse = await runCmdHandler(`etherlime generate-verifier`, expectedOutput);
		assert.include(childResponse.output, expectedOutput, 'The generate-verifier process does not finish properly');
	});

	it('should execute etherlime generate-verifier with optional params', async () => {
		const expectedOutput = '===== Smart Contract Created Successfully. Please check your contracts folder ====='
		const childResponse = await runCmdHandler(`etherlime generate-verifier --verifier_key=circuit_verification_key.json`, expectedOutput);
		assert.include(childResponse.output, expectedOutput, 'The generate-verifier process does not finish properly');
	});

	it('should throw on generate-verifier error', async () => {
		fs.writeFileSync('./zero-knowledge-proof/trusted-setup/circuit_verification_key-with-error.json', JSON.stringify(vkWithError, null, 1), "utf8");
		const expectedOutput = "TypeError: Cannot read property '0' of undefined";
		const childResponse = await runCmdHandler(`etherlime generate-verifier --verifier_key=circuit_verification_key-with-error.json`, expectedOutput);
		assert.include(childResponse, expectedOutput, 'The generate-verifier process does not throw');
	});

	after(async function () {
		process.chdir(currentDir);
		fs.removeSync('./zkTmp');
	});

});