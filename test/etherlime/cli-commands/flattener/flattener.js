const assert = require('chai').assert;
let chai = require("chai");
let chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const fs = require("fs-extra")

const flattener = require('../../../../packages/etherlime/cli-commands/flattener/flatten')
let currentDir;

let contractWithExternalImports = require('../compile/examples/contractWithExternalImports').contractWithExternalImports
const runCmdHandler = require('../utils/spawn-child-process').runCmdHandler;

describe('Flatten cli command', async () => {

    before(async function () {

        fs.mkdirSync('./contracts')
        fs.writeFileSync('./contracts/contractWithExternalImports.sol', contractWithExternalImports);
        fs.copyFileSync('./test/etherlime/cli-commands/compile/examples/BillboardService.sol', './contracts/BillboardService.sol');
        fs.copyFileSync('./test/etherlime/cli-commands/compile/examples/SafeMath.sol', './contracts/SafeMath.sol');
    });

    it('should flatten contract with all dependencies', async () => {
        await assert.isFulfilled(flattener.run('BillboardService.sol'))
        assert.isTrue(fs.existsSync('./flat'))
        assert.isTrue(fs.existsSync('./flat/BillboardService_flat.sol'))
    })

    it('should flat contract with external imports and specific solc version', async () => {
        let expectedOutput = 'Contract was flattened successfully'
        let childProcess = await runCmdHandler('etherlime flatten contractWithExternalImports.sol 0.5.0', expectedOutput)
        assert.include(childProcess.output, expectedOutput)
    })

    it('should throw if can not find file', async () => {
        assert.isRejected(flattener.run('Unexisting.sol'))
    })

    after(async function () {
        fs.removeSync('./contracts')
        fs.removeSync('./flat')
    });

});

describe('Flatten method without writing files', async () => {

    before(async function () {

        fs.mkdirSync('./contracts')
        fs.writeFileSync('./contracts/contractWithExternalImports.sol', contractWithExternalImports);
        fs.copyFileSync('./test/etherlime/cli-commands/compile/examples/BillboardService.sol', './contracts/BillboardService.sol');
        fs.copyFileSync('./test/etherlime/cli-commands/compile/examples/SafeMath.sol', './contracts/SafeMath.sol');
    });

    it('should flatten contract with all dependencies', async () => {
        await assert.isFulfilled(flattener.runWithoutWriteFiles('BillboardService.sol'))
        // assert.isTrue(fs.existsSync('./flat'))
        // assert.isTrue(fs.existsSync('./flat/BillboardService_flat.sol'))
    })

    it('should flat contract with external imports and specific solc version', async () => {
        await assert.isFulfilled(flattener.runWithoutWriteFiles('contractWithExternalImports.sol', '0.5.0'))
    })

    it('should throw if can not find file', async () => {
        assert.isRejected(flattener.runWithoutWriteFiles('Unexisting.sol'))
    })

    after(async function () {
        fs.removeSync('./contracts')
        fs.removeSync('./flat')
    });

});