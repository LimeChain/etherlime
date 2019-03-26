const assert = require('chai').assert;
const chai = require('chai')
let chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const fs = require('fs-extra');
const test = require('../../../cli-commands/etherlime-test/test');
let etherlimeCoverage = require('../../../cli-commands/etherlime-test/etherlime-coverage');

const sinon = require('sinon');

let exampleTestForCoverage = require('../examples/exampleTestForCoverageWithPort').pathToExampleTest;
let pathToExampleTest = './testsToRun/exampleTestForCoverage.js'
let currentDir;

describe('coverage cli command', () => {

    before(async function () {
        fs.mkdirSync('./tmpTest')
        currentDir = process.cwd();
        process.chdir('./tmpTest')
        fs.mkdirSync('./build')
        fs.mkdirSync('./contracts')
        fs.mkdirSync('./contracts2')
        fs.copyFileSync('../test/cli-commands/examples/LimeFactory.sol', './contracts/LimeFactory.sol')
        fs.copyFileSync('../test/cli-commands/examples/LimeFactory.sol', './contracts2/LimeFactory.sol')

        fs.mkdirSync('./testsToRun')
        fs.writeFileSync('./testsToRun/exampleTestForCoverage.js', exampleTestForCoverage)
    })

    it('should execute coverage cli command with default port specified', async function () {
        let etherlimeTestSpy = sinon.spy(etherlimeCoverage, "runCoverage");
        await assert.isFulfilled(test.runCoverage(`${pathToExampleTest}`, 8545, undefined, undefined, `./build`, `./contracts`))
        sinon.assert.calledWith(etherlimeTestSpy, [`${pathToExampleTest}`], 8545, undefined, undefined, `./build`, `./contracts`)
        etherlimeTestSpy.restore();
    });

    it('should execute coverage cli command with number runs', async function () {
        let etherlimeTestSpy = sinon.spy(etherlimeCoverage, "runCoverage");
        await assert.isFulfilled(test.runCoverage(`${pathToExampleTest}`, 8545, 10, undefined, `./build`, `./contracts`))
        sinon.assert.calledWith(etherlimeTestSpy, [`${pathToExampleTest}`], 8545, 10, undefined, `./build`, `./contracts`)
        etherlimeTestSpy.restore();
    });

    it('should execute coverage cli command when path does not includes specific .js file', async function () {
        let etherlimeTestSpy = sinon.spy(etherlimeCoverage, "runCoverage");
        await assert.isFulfilled(test.runCoverage(`./testsToRun`, 8545, 10, undefined, `./build`, `./contracts`))
        sinon.assert.calledWith(etherlimeTestSpy, [`${process.cwd()}/testsToRun/exampleTestForCoverage.js`], 8545, 10, undefined, `./build`, `./contracts`)
        etherlimeTestSpy.restore();
    });

    it('should execute coverage cli command with specific build and contracts folder', async function () {

        let etherlimeTestSpy = sinon.spy(etherlimeCoverage, "runCoverage");
        await assert.isFulfilled(test.runCoverage(`${pathToExampleTest}`, 8545, 10, undefined, `./build2`, `./contracts2`))
        sinon.assert.calledWith(etherlimeTestSpy, [`${pathToExampleTest}`], 8545, 10, undefined, `./build2`, `./contracts2`)
        etherlimeTestSpy.restore();
    });

    it('should execute coverage cli command with shouldOpenCoverage param', async function () {
        let etherlimeTestSpy = sinon.spy(etherlimeCoverage, "runCoverage");
        await assert.isFulfilled(test.runCoverage(`${pathToExampleTest}`, 8545, undefined, undefined, `./build`, `./contracts`, true))
        sinon.assert.calledWith(etherlimeTestSpy, [`${pathToExampleTest}`], 8545, undefined, undefined, `./build`, `./contracts`, true)
        etherlimeTestSpy.restore();
    });


    it('should throw on wrong path', async () => {
        it('should throw on wrong path', async function () {
            await assert.isRejected(test.runCoverage('wrongTestDirectory'));
        });
    });

    it('should throw if find files method trows', async () => {
        await assert.isRejected(etherlimeCoverage.findFiles('wrongFolder'));
    })

    after(async function () {
        process.chdir(currentDir);
        fs.removeSync('./tmpTest')
        fs.removeSync('./coverage')

    })

})