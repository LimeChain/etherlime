const assert = require('chai').assert;
let chai = require("chai");
let chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const fs = require('fs-extra');
const test = require('../../../cli-commands/etherlime-test/test');
const sinon = require('sinon');

let etherlimeTest = require('../../../cli-commands/etherlime-test/etherlime-test');
let calledArgs = [ `${process.cwd()}/tmpTest/exampleToRun/exampleTest.js` ];
let exampleTest = require('../examples/exampleTest').exampleTest;
let path = 'exampleToRun/exampleTest.js';
let currentDir;

    describe('test cli command', () => {

        before(async function() {
            currentDir = process.cwd();
            fs.mkdirpSync('./tmpTest')
            process.chdir('./tmpTest');
            fs.mkdirSync('./contracts');
            fs.copyFileSync('../test/cli-commands/examples/LimeFactory.sol', './contracts/LimeFactory.sol');
            fs.mkdirSync('./exampleToRun');
            fs.writeFileSync('./exampleToRun/exampleTest.js', exampleTest);
            fs.mkdirSync('./build');
        })

        it('should execute test cli command with gas-report flag on', async function() {
            let etherlimeTestSpy = sinon.spy(etherlimeTest, "run")
            await assert.isFulfilled(test.run(path, false, "0.5.1", false))
            sinon.assert.calledWith(etherlimeTestSpy, [path], false, "0.5.1", false)
            etherlimeTestSpy.restore();
        });
    
        it('should execute test cli command with specific path', async function() {
            let etherlimeTestSpy = sinon.spy(etherlimeTest, "run")
            await assert.isFulfilled(test.run(path))
            sinon.assert.calledWith(etherlimeTestSpy, [path], undefined)
            etherlimeTestSpy.restore();
        });
    
        it('should throw on wrong path', async function() {
            await assert.isRejected(test.run('wrongTestDirectory'));  
        });
    
        it('should execute test cli command when path does not includes specific .js file', async function() {
            let etherlimeTestSpy = sinon.spy(etherlimeTest, "run")
            await assert.isFulfilled(test.run('./exampleToRun'))
            sinon.assert.calledWith(etherlimeTestSpy, calledArgs)
            etherlimeTestSpy.restore();
        });

        it('should execute test cli command if path includes ./test folder', async function(){
            fs.mkdirSync('./test');
            await assert.isFulfilled(test.run(`${process.cwd()}/test`))
        })

    
        after(async function () {
            process.chdir(currentDir);
            fs.removeSync('./tmpTest');
        })
    })