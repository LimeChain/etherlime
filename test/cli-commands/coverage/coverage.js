const assert = require('chai').assert;
const chai = require('chai')
let chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const fs = require('fs-extra');
const coverage = require('../../../cli-commands/etherlime-test/test')
const runCmdHandler = require('../utils/spawn-child-process').runCmdHandler;

let exampleTestForCoverageWithPort = require('../examples/exampleTestForCoverageWithPort').exampleTestForCoverageWithPort;
let pathToExampleTest = './testsToRun/exampleTestForCoverage.js'
let pathToExampleWithPort = './testsToRun/exampleTestForCoverageWithPort.js'
let currentDir;

let port = 5000;
let expectedOutput = 'Istanbul coverage reports generated';

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
    })

    it('should run coverage cli command', async function () {
        let childProcess = await runCmdHandler(`etherlime coverage --path ${pathToExampleWithPort} --port ${port}`, expectedOutput);
        assert.isTrue(childProcess.result)
    })

    it('should run coverage cli command by specifying number runs', async function () {
        let runs = 10;
        let childProcess = await runCmdHandler(`etherlime coverage --path ${pathToExampleWithPort} --runs ${runs} --port ${port}`, expectedOutput);
        assert.isTrue(childProcess.result)
    });

    after(async function () {
        process.chdir(currentDir);
        fs.removeSync('./tmpTest')

    })

})