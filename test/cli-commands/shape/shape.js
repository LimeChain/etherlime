const assert = require('chai').assert;
let chai = require("chai");
const fs = require("fs-extra")
const runCmdHandler = require('../utils/spawn-child-process').runCmdHandler;

let wrongUrl = 'https://github.com/LimeChain/etherlime-shape-angular.gi';
let remoteRepo = 'https://github.com/desimira/burgers.git';

describe('Shape cli command', () => {
    let currentDir;

    beforeEach( async function() {
        currentDir = process.cwd();
        fs.mkdirSync('../test')
        process.chdir('../test');
    });

    it('should throw err if can not clone the repo', async () => {
       let expectedOutput = 'Repository not found.'
       let childProcess = await runCmdHandler(`etherlime shape ${wrongUrl}`, expectedOutput)
       assert.include(childProcess, expectedOutput)
    })

    it('should shape new dApp with Angular front-end', async () => {
        let expectedOutput = 'Shaping finished successful';
        let childProcess = await runCmdHandler('etherlime shape angular', expectedOutput)
        assert.include(childProcess.output, expectedOutput)
        assert(fs.existsSync('../test/my-app'))
    });

    it('should throw err if try to shape angular twice', async () => {
        let expectedOutput = "remote origin already exists."
        await runCmdHandler('etherlime shape angular', "Shaping finished successful!")
        let childProcess = await runCmdHandler('etherlime shape angular', expectedOutput)
        assert.include(childProcess, expectedOutput)
    })

    it('should shape dApp from url and integrate it with etherlime', async () => {
        let expectedOutput = 'Etherlime was successfully initialized!'
        let childProcess = await runCmdHandler(`etherlime shape ${remoteRepo}`, expectedOutput)
        assert.include(childProcess.output, expectedOutput);
        assert(fs.existsSync('./contracts'))
        assert(fs.existsSync('./deployment'))
    })

    afterEach(async function() {
        fs.removeSync('../test');
        process.chdir(currentDir);
    });

});

