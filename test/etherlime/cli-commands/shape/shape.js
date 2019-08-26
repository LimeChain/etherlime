const assert = require('chai').assert;
let chai = require("chai");
const fs = require("fs-extra")
const runCmdHandler = require('../utils/spawn-child-process').runCmdHandler;

let unexistingShape = 'sthUnexisting'

describe('Shape cli command', () => {
    let currentDir;

    beforeEach(async function () {
        currentDir = process.cwd();
        process.chdir('/tmp');
    });

    it.only('should throw err if can not find a proper shape', async () => {
        let expectedOutput = 'Invalid shape'
        let childProcess = await runCmdHandler(`etherlime shape ${unexistingShape}`, expectedOutput)
        assert.include(childProcess, expectedOutput)
    })

    it('should shape new dApp with Angular front-end', async () => {
        let expectedOutput = 'Shaping finished successful';
        let childProcess = await runCmdHandler('etherlime shape angular', expectedOutput)
        assert.include(childProcess.output, expectedOutput)
        assert(fs.existsSync('./web'))
    });

    it('should shape new dApp with React front-end', async () => {
        let expectedOutput = 'Shaping finished successful';
        let childProcess = await runCmdHandler('etherlime shape react', expectedOutput)
        assert.include(childProcess.output, expectedOutput)
        assert(fs.existsSync('./web'))
    });

    it('should shape new dApp with Monoplasma shape', async () => {
        let expectedOutput = 'Shaping finished successful';
        let childProcess = await runCmdHandler('etherlime shape monoplasma', expectedOutput)
        assert.include(childProcess.output, expectedOutput)
        assert(fs.existsSync('./demo'))
    });

    it('should shape new Chainlink project', async () => {
        let expectedOutput = 'Shaping finished successful';
        let childProcess = await runCmdHandler('etherlime shape chainLink', expectedOutput)
        assert.include(childProcess.output, expectedOutput)
    })

    afterEach(async function () {
        fs.removeSync('./contracts')
        fs.removeSync('./deployment')
        fs.removeSync('./test')
        fs.removeSync('./web')
        fs.removeSync('./build')
        fs.removeSync('./config.json')
        fs.removeSync('./node_modules')
        fs.removeSync('./package.json')
        fs.removeSync('./package-lock.json');
        fs.removeSync('./README.md');
        fs.removeSync('./.git');
        fs.removeSync('./.etherlime-store');
        fs.removeSync('./.gitignore');
        fs.removeSync('./demo');
        fs.removeSync('./src');
        fs.removeSync('./start_operator.js');
        fs.removeSync('./start_validator.js');
        fs.removeSync('./strings');
        fs.removeSync('./99999_addresses.txt');
        fs.removeSync('./copy-abi-to-ui.js');
        fs.removeSync('./defaultServers.json');

        process.chdir(currentDir);
    });

});