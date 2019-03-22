const assert = require('chai').assert;
const chai = require('chai')
let chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const fs = require('fs-extra');
const test = require('../../../cli-commands/etherlime-test/test');
let etherlimeCoverage = require('../../../cli-commands/etherlime-test/etherlime-coverage');

const runCmdHandler = require('../utils/spawn-child-process').runCmdHandler;
const sinon = require('sinon');

let exampleTestForCoverageWithPort = require('../examples/exampleTestForCoverageWithPort').exampleTestForCoverageWithPort;
let exampleTestForCoverage = require('../examples/exampleTestForCoverageWithPort').pathToExampleTest;
let pathToExampleTest = './testsToRun/exampleTestForCoverage.js'
let pathToExampleWithPort = './testsToRun/exampleTestForCoverageWithPort.js'
let currentDir;

let port = 5000;
let expectedOutput = 'All reports generated';

describe('coverage cli command', () => {

    before(async function () {
        fs.mkdirSync('./tmpTest')
        currentDir = process.cwd();
        process.chdir('./tmpTest')
        fs.mkdirSync('./build')
        fs.mkdirSync('./contracts')
        fs.copyFileSync('../test/cli-commands/examples/LimeFactory.sol', './contracts/LimeFactory.sol')
        fs.mkdirSync('./testsToRun')
        fs.writeFileSync('./testsToRun/exampleTestForCoverageWithPort.js', exampleTestForCoverageWithPort)
        fs.writeFileSync('./testsToRun/exampleTestForCoverage.js', exampleTestForCoverage)
    })

    // it('should run coverage cli command', async function () {
    //     console.log('START3')
    //     let childProcess = await runCmdHandler(`etherlime coverage --path ${pathToExampleWithPort}`, expectedOutput);
    //     assert.isTrue(childProcess.result)
    // })

    // it('should run coverage cli command by specifying number runs', async function () {
    //     let runs = 10;
    //     let childProcess = await runCmdHandler(`etherlime coverage --path ${pathToExampleWithPort} --runs ${runs} --port ${port}`, expectedOutput);
    //     assert.isTrue(childProcess.result)
    // });

    // files, solcVersion, true, port, runs, buildDirectory, workingDirectory

    it('should execute coverage cli command with default port specified', async function () {
        let etherlimeTestSpy = sinon.spy(etherlimeCoverage, "runCoverage")
        await assert.isFulfilled(test.runCoverage(`${pathToExampleTest}`, 8545, undefined, undefined, `./build`, `./contracts`))
        sinon.assert.calledWith(etherlimeTestSpy, [`${pathToExampleTest}`], undefined, true, 8545, undefined, `./build`, `./contracts`)
        etherlimeTestSpy.restore();
    });

    it('should execute coverage cli command with number runs', async function () {
        let etherlimeTestSpy = sinon.spy(etherlimeCoverage, "runCoverage")
        await assert.isFulfilled(test.runCoverage(`${pathToExampleTest}`, 8545, 10, undefined, `./build`, `./contracts`))
        sinon.assert.calledWith(etherlimeTestSpy, [`${pathToExampleTest}`], undefined, true, 8545, 10, `./build`, `./contracts`)
        etherlimeTestSpy.restore();
    });

    it('should execute coverage cli command with specific solc version', async function () {
        let etherlimeTestSpy = sinon.spy(etherlimeCoverage, "runCoverage")
        await assert.isFulfilled(test.runCoverage(`${pathToExampleTest}`, 8545, 10, '0.5.1', `./build`, `./contracts`))
        sinon.assert.calledWith(etherlimeTestSpy, [`${pathToExampleTest}`], '0.5.1', true, 8545, 10, `./build`, `./contracts`)
        etherlimeTestSpy.restore();
    });

    after(async function () {
        process.chdir(currentDir);
        fs.removeSync('./tmpTest')
    })

})