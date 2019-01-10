const assert = require('chai').assert;
let chai = require("chai");
let chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const fs = require("fs-extra")
const shape = require('../../../cli-commands/shape/shape');
const runCmdHandler = require('../utils/spawn-child-process').runCmdHandler;

let wrongUrl = 'https://github.com/LimeChain/etherlime-shape-angular.gi'


describe('Shape cli command', () => {
    let currentDir;

    before( async function() {
        currentDir = process.cwd();
        fs.mkdirSync('../test')
        process.chdir('../test');
    });

    it('should shape new dApp with Angular front-end', async () => {
        let expectedOutput = 'Etherlime was successfully initialized';
        let childProcess = await runCmdHandler('etherlime shape angular', expectedOutput)
        assert.include(childProcess.output, expectedOutput)
        assert(fs.existsSync('../test/my-app'))
        assert(fs.existsSync('../test/contracts'))
        assert(fs.existsSync('../test/deployment'))
    });

    it('should throw err when trying to shape new dApp with Angular twice', async () => {
        let expectedOutput = 'etherlime shape [name] [url]';
        let childProcess = await runCmdHandler('etherlime shape angular')
        assert.include(childProcess, expectedOutput)
    });

    it('should throw err on wrong url', async () => {
        let expectedOutput = 'Not found';
        let childProcess = await runCmdHandler(`etherlime shape angular -- url: ${wrongUrl}`)
        assert.include(childProcess, expectedOutput)

    }) 

    after(async function() {
        fs.removeSync('../test');
        process.chdir(currentDir);
    });

});

