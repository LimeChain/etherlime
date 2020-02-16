const assert = require('chai').assert;
const chai = require('chai')
let chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const fs = require('fs-extra');
const test = require('../../../../packages/etherlime/cli-commands/etherlime-test/test');
let etherlimeCoverage = require('../../../../packages/etherlime/cli-commands/etherlime-test/etherlime-coverage');

const sinon = require('sinon');

let exampleTestForCoverage = require('../examples/exampleTestForCoverageWithPort').exampleTestForCoverageWithPort;
let nameOfexampleTestForCoverage = 'exampleTestForCoverage.js';
let pathToExampleTest = `./testsToRun/${nameOfexampleTestForCoverage}`;
let defaultTimeout = 10000;
let customTimeout = 12000;
let ganachePort = 8546;
let currentDir;
let originalPlatform;


describe.only('coverage cli command', () => {

    before(async function () {
        fs.mkdirSync('./tmpTest')
        originalPlatform = process.platform;
        currentDir = process.cwd();
        process.chdir('./tmpTest')
        fs.mkdirSync('./build')
        fs.mkdirSync('./contracts')
        fs.mkdirSync('./contracts2')
        fs.copyFileSync('../test/etherlime/cli-commands/examples/LimeFactory.sol', './contracts/LimeFactory.sol')
        // fs.copyFileSync('../test/etherlime/cli-commands/examples/FoodCart.sol', './contracts/FoodCart.sol')
        fs.copyFileSync('../test/etherlime/cli-commands/examples/LimeFactory.sol', './contracts2/LimeFactory.sol')

        fs.mkdirSync('./testsToRun')
        fs.writeFileSync(`./testsToRun/${nameOfexampleTestForCoverage}`, exampleTestForCoverage)
    })

    it('should execute coverage cli command with default port specified', async function () {
        let etherlimeTestSpy = sinon.spy(etherlimeCoverage, "runCoverage");
        await assert.isFulfilled(test.runCoverage(`${pathToExampleTest}`, defaultTimeout, ganachePort, undefined, undefined, false, undefined))
        sinon.assert.calledWith(etherlimeTestSpy, [`${process.cwd()}/.coverage_tests/${nameOfexampleTestForCoverage}`], defaultTimeout, ganachePort, undefined, undefined, false, undefined)
        etherlimeTestSpy.restore();
    });

    it('should execute coverage cli command with custom timeout specified', async function () {
        let etherlimeTestSpy = sinon.spy(etherlimeCoverage, "runCoverage");
        await assert.isFulfilled(test.runCoverage(`${pathToExampleTest}`, customTimeout, ganachePort, undefined, undefined, false, undefined))
        sinon.assert.calledWith(etherlimeTestSpy, [`${process.cwd()}/.coverage_tests/${nameOfexampleTestForCoverage}`], customTimeout, ganachePort, undefined, undefined, false, undefined)
        etherlimeTestSpy.restore();
    });

    it('should execute coverage cli command when path does not includes specific .js file', async function () {
        let etherlimeTestSpy = sinon.spy(etherlimeCoverage, "runCoverage");
        await assert.isFulfilled(test.runCoverage(`./testsToRun`, defaultTimeout, ganachePort, undefined, undefined, false, undefined))
        sinon.assert.calledWith(etherlimeTestSpy, [`${process.cwd()}/.coverage_tests/${nameOfexampleTestForCoverage}`], defaultTimeout, ganachePort, undefined, undefined, false, undefined)
        etherlimeTestSpy.restore();
    });

    it('should execute coverage cli command with specific contracts folder', async function () {
        let etherlimeTestSpy = sinon.spy(etherlimeCoverage, "runCoverage");
        await assert.isFulfilled(test.runCoverage(`${pathToExampleTest}`, defaultTimeout, ganachePort, undefined, './contracts2', false, undefined))
        sinon.assert.calledWith(etherlimeTestSpy, [`${process.cwd()}/.coverage_tests/${nameOfexampleTestForCoverage}`], defaultTimeout, ganachePort, undefined, './contracts2', false, undefined)
        etherlimeTestSpy.restore();
    });

    it('should execute coverage cli command with shouldOpenCoverage param', async function () {
        let etherlimeTestSpy = sinon.spy(etherlimeCoverage, "runCoverage");
        await assert.isFulfilled(test.runCoverage(`${pathToExampleTest}`, defaultTimeout, ganachePort, undefined, undefined, true, undefined))
        sinon.assert.calledWith(etherlimeTestSpy, [`${process.cwd()}/.coverage_tests/${nameOfexampleTestForCoverage}`], defaultTimeout, ganachePort, undefined, undefined, true, undefined)
        etherlimeTestSpy.restore();
    });

    it('should execute coverage cli command with shouldOpenCoverage param on windows', async function () {
        Object.defineProperty(process, 'platform', {
            value: 'win32'
        });
        let etherlimeTestSpy = sinon.spy(etherlimeCoverage, "runCoverage");
        await assert.isFulfilled(test.runCoverage(`${pathToExampleTest}`, defaultTimeout, ganachePort, undefined, undefined, true, undefined))
        sinon.assert.calledWith(etherlimeTestSpy, [`${process.cwd()}/.coverage_tests/${nameOfexampleTestForCoverage}`], defaultTimeout, ganachePort, undefined, undefined, true, undefined)
        etherlimeTestSpy.restore();
    });

    it('should execute coverage cli command with shouldOpenCoverage param on MocOs', async function () {
        Object.defineProperty(process, 'platform', {
            value: 'MocOs'
        });
        let etherlimeTestSpy = sinon.spy(etherlimeCoverage, "runCoverage");
        await assert.isFulfilled(test.runCoverage(`${pathToExampleTest}`, defaultTimeout, ganachePort, undefined, undefined, true, undefined))
        sinon.assert.calledWith(etherlimeTestSpy, [`${process.cwd()}/.coverage_tests/${nameOfexampleTestForCoverage}`], defaultTimeout, ganachePort, undefined, undefined, true, undefined)
        etherlimeTestSpy.restore();
    });

    it('should execute coverage cli command with specified files to ignore in report', async function () {
        let ignoreFile = 'contracts2/LimeFactory.sol'
        await assert.isFulfilled(test.runCoverage(`${pathToExampleTest}`, defaultTimeout, ganachePort, undefined, undefined, undefined, ignoreFile))
    })

    it('should throw on wrong path', async function () {
        await assert.isRejected(test.runCoverage('wrongTestDirectory'));
    });

    after(async function () {
        Object.defineProperty(process, 'platform', {
            value: originalPlatform
        });
        process.chdir(currentDir);
        fs.removeSync('./tmpTest')
        fs.removeSync('./coverage')

    })

})