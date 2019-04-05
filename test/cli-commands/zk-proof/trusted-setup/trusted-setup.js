const assert = require('chai').assert;
let chai = require("chai");
let chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const fs = require('fs-extra');
const runCmdHandler = require('../../utils/spawn-child-process').runCmdHandler;

const exampleCompiledCircuit = require('../examples/example-compiled-circuit');
const exampleCompiledCircuitWithError = require('../examples/example-compiled-circuit-with-error');
const trustedSetup = require('../../../../cli-commands/zk-proof/trusted-setup');

describe('etherlime trusted-setup command', () => {
	let currentDir;

	before(async function () {
		currentDir = process.cwd();
		fs.mkdirSync('./zkTmp')
		process.chdir('./zkTmp');
		fs.mkdirSync('./zero-knowledge-proof');
		fs.mkdirSync('./zero-knowledge-proof/compiled-circuits');
		fs.writeFileSync('./zero-knowledge-proof/compiled-circuits/circuit.json', JSON.stringify(exampleCompiledCircuit, null, 1), "utf8");
	});

	it('should execute etherlime trusted-setup', async () => {
		const expectedOutput = '===== Trusted Setup Completed ====='
		const childResponse = await runCmdHandler(`etherlime zk setup`, expectedOutput);
		assert.include(childResponse.output, expectedOutput, 'The trusted-setup process does not finish properly');
	});

	it('should throw on circuit with error', async () => {
		fs.writeFileSync('./zero-knowledge-proof/compiled-circuits/circuit-with-error.json', JSON.stringify(exampleCompiledCircuitWithError, null, 1), "utf8");
		const expectedOutput = "TypeError: Cannot read property 'length' of undefined";
		const childResponse = await runCmdHandler(`etherlime zk setup`, expectedOutput);
		assert.include(childResponse, expectedOutput, 'The trusted-setup process does not throw');
	});

	it('should throw if find files method trows', async () => {
		await assert.isRejected(trustedSetup.findFiles('wrongFolder'));
	})

	after(async function () {
		process.chdir(currentDir);
		fs.removeSync('./zkTmp');
	});

});