const assert = require('chai').assert;
let chai = require("chai");
let chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const fs = require('fs-extra');
const runCmdHandler = require('../../utils/spawn-child-process').runCmdHandler;

const exampleCircuit = require('../examples/example-circuit').circuit;
const exampleCircuitWithError = require('../examples/example-circuit-with-error').circuit;
const circuitCompile = require('../../../../cli-commands/zk-proof/circuit-compile');

describe('etherlime circuit-compile command', () => {
	let currentDir;

	before(async function () {
		currentDir = process.cwd();
		fs.mkdirSync('./zkTmp')
		process.chdir('./zkTmp');
		fs.mkdirSync('./zero-knowledge-proof');
		fs.mkdirSync('./zero-knowledge-proof/circuits');
		fs.writeFileSync('./zero-knowledge-proof/circuits/circuit.circom', exampleCircuit);
	});

	it('should execute etherlime compile-circuit', async () => {
		const expectedOutput = '===== Compilation Finished ====='
		const childResponse = await runCmdHandler(`etherlime zk compile`, expectedOutput);
		assert.include(childResponse.output, expectedOutput, 'The compilation process does not finish properly');
	});

	it('should throw on circuit with error', async () => {
		fs.writeFileSync('./zero-knowledge-proof/circuits/circuit.circom', exampleCircuitWithError);
		const expectedOutput = 'Error: A main component must be defined'
		const childResponse = await runCmdHandler(`etherlime zk compile`, expectedOutput);
		assert.include(childResponse, expectedOutput, 'The compilation process does not throw');
	});

	it('should throw if find files method trows', async () => {
		await assert.isRejected(circuitCompile.findFiles('wrongFolder'));
	})

	after(async function () {
		process.chdir(currentDir);
		fs.removeSync('./zkTmp');
	});

});