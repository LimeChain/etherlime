const assert = require('chai').assert;
let chai = require("chai");
let chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const fs = require('fs-extra');
const test = require('../../../cli-commands/etherlime-test/test');
const sinon = require('sinon');

const BlockingJSONStore = require('../../../logs-store/blocking-json-store');
let etherlimeTest = require('../../../cli-commands/etherlime-test/etherlime-test');
let calledArgs = [ `${process.cwd()}/tmpTest/testsToRun/exampleTest.js` ];

let currentDir;

    describe('test cli command', () => {

        before(async function() {
            currentDir = process.cwd();
            fs.mkdirpSync('./tmpTest')
            process.chdir('./tmpTest');
            fs.mkdirSync('./contracts');
            fs.copyFileSync('../test/cli-commands/test/LimeFactory.sol', './contracts/LimeFactory.sol');
            fs.mkdirSync('./testsToRun');
            fs.copyFileSync('../test/cli-commands/test/exampleTest.js', './testsToRun/exampleTest.js');
            fs.mkdirSync('./build');
        })
    
        it('should work on unexisting test folder', async function() {
            await assert.isFulfilled(test.run('./testsToRun'))
        })
    
        it('should execute test cli command with specific path', async function() {
            let etherlimeTestSpy = sinon.spy(etherlimeTest, "run")
            await assert.isFulfilled(test.run('testsToRun/exampleTest.js'))
            sinon.assert.calledWith(etherlimeTestSpy, ['testsToRun/exampleTest.js'], undefined)
            etherlimeTestSpy.restore();
        });
    
        it('shpuld throw on wrong path', async function() {
            await assert.isRejected(test.run('wrongTestDirectory'));
    
        });
    
        it('should execute test cli command without specific js file', async function() {
            let etherlimeTestSpy = sinon.spy(etherlimeTest, "run")
            await assert.isFulfilled(test.run('./testsToRun'))
            sinon.assert.calledWith(etherlimeTestSpy, calledArgs)
            etherlimeTestSpy.restore();
        });
    
        after(async function () {
            process.chdir(currentDir);
            fs.removeSync('./tmpTest');
        })
    })