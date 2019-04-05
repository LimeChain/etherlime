const assert = require('chai').assert;
let chai = require("chai");
let chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const fs = require('fs-extra');
const runCmdHandler = require('../../utils/spawn-child-process').runCmdHandler;

const exampleCompiledCircuit = require('../examples/example-compiled-circuit');
const exampleCompiledCircuitWithError = require('../examples/example-compiled-circuit-with-error');
const pk = require('../examples/circuit_proving_key');
const pkWithError = require('../examples/circuit_proving_key-with-error');
const witness = require('../examples/witness');
const input = require('../examples/input');

describe('etherlime proof command', () => {
	let currentDir;

	before(async function () {
		currentDir = process.cwd();
		fs.mkdirSync('./zkTmp')
		process.chdir('./zkTmp');
		fs.mkdirSync('./zero-knowledge-proof');
		fs.mkdirSync('./zero-knowledge-proof/compiled-circuits');
		fs.mkdirSync('./zero-knowledge-proof/trusted-setup');
		fs.mkdirSync('./zero-knowledge-proof/input');
		fs.writeFileSync('./zero-knowledge-proof/compiled-circuits/circuit.json', JSON.stringify(exampleCompiledCircuit, null, 1), "utf8");
		fs.writeFileSync('./zero-knowledge-proof/trusted-setup/circuit_proving_key.json', JSON.stringify(pk, null, 1), "utf8");
		fs.writeFileSync('./zero-knowledge-proof/trusted-setup/witness.json', JSON.stringify(witness, null, 1), "utf8");
		fs.writeFileSync('./zero-knowledge-proof/input/input.json', JSON.stringify(input, null, 1), "utf8");
	});

	it('should execute etherlime proof command', async () => {
		const expectedOutput = '===== Generation Finished ====='
		const childResponse = await runCmdHandler(`etherlime zk proof`, expectedOutput);
		assert.include(childResponse.output, expectedOutput, 'The proof process does not finish properly');
	});

	it('should execute etherlime proof command with optional params', async () => {
		const expectedOutput = '===== Generation Finished ====='
		const childResponse = await runCmdHandler(`etherlime zk proof --signal=input.json --circuit=circuit.json --proovingKey=circuit_proving_key.json`, expectedOutput);
		assert.include(childResponse.output, expectedOutput, 'The proof process does not finish properly');
	});

	it('should throw on proof error', async () => {
		fs.writeFileSync('./zero-knowledge-proof/trusted-setup/circuit_proving_key-with-error.json', JSON.stringify(pkWithError, null, 1), "utf8");
		const expectedOutput = "TypeError: Cannot read property '0' of undefined";
		const childResponse = await runCmdHandler(`etherlime zk proof --proovingKey=circuit_proving_key-with-error.json`, expectedOutput);
		assert.include(childResponse, expectedOutput, 'The proof process does not throw');
	});

	after(async function () {
		process.chdir(currentDir);
		fs.removeSync('./zkTmp');
	});

});