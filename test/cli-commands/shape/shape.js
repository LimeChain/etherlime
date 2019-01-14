const assert = require('chai').assert;
let chai = require("chai");
let chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const fs = require("fs-extra")
const shape = require('../../../cli-commands/shape/shape');
const runCmdHandler = require('../utils/spawn-child-process').runCmdHandler;
const sinon = require('sinon');

const urlUtils = require('../../../cli-commands/shape/utils');

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
        let stub = sinon.stub(urlUtils, "verifyUrl");
        stub.onCall(0).returns(true)
        let expectedOutput = 'etherlime shape [name] [url]';
        await assert.isRejected(shape.run(undefined, wrongUrl))
        stub.restore()
    })

    it('should shape new dApp with Angular front-end', async () => {
        let expectedOutput = 'Shaping finished successful';
        let childProcess = await runCmdHandler('etherlime shape angular', expectedOutput)
        assert.include(childProcess.output, expectedOutput)
        assert(fs.existsSync('../test/my-app'))
    });

    it('should throw err if try to shape angular twice', async () => {
        let expectedOutput = "remote origin already exists."
        await shape.run('angular')
        await assert.isRejected(shape.run('angular'), expectedOutput)
    })

    it('should shape dApp from url and integrate it with etherlime', async () => {
        let expectedOutput = 'Etherlime was successfully initialized!'
        let childProcess = await runCmdHandler(`etherlime shape --url ${remoteRepo}`, expectedOutput)
        assert.include(childProcess.output, expectedOutput);
        assert(fs.existsSync('./contracts'))
        assert(fs.existsSync('./deployment'))
    })

    it('should throw err on wrong url', async () => {
        let expectedError = 'There is a problem fetching repository';
        let childProcess = await runCmdHandler(`etherlime shape --url ${wrongUrl}`);
        assert.include(childProcess, expectedError)
    })

    it('should throw err if can not verify url', async () => {
        let expectedError = 'Failed to make request to undefined'
        await assert.isRejected(urlUtils.verifyUrl(), expectedError)
    })

    afterEach(async function() {
        fs.removeSync('../test');
        process.chdir(currentDir);
    });

});

