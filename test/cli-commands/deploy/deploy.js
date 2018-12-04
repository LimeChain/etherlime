const assert = require('chai').assert;
let chai = require("chai");
let chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const sinon = require('sinon');
const fs = require('fs-extra');

const deployer = require('../../../cli-commands/deployer/deployer');
const compiler = require('../../../cli-commands/compiler/compiler');
const logger = require('../../../logger-service/logger-service').logger;
const file = require('./deploymentScriptsFile').file;
let compileSpy = sinon.spy(compiler, "run");
let loggerSpy = sinon.spy(logger, "log")

let privateKey = "7ab741b57e8d94dd7e1a29055646bafde7010f38a900f55bbd7647880faa6ee8";
let wrongPrivateKey = "7ab741b57e8d94dd7e1a29055646bafde7010f38a900f55bbd7647880faa6ee9";

const specificFile = 'test/cli-commands/deploy/deploymentScripts.js';
const successfulMessage = "Your deployment script finished successfully!"
const deployError = "deployment/deploy.js file not found. Probably you've not initialized etherlime. Please run etherlime init first.";
const errorMessage = "sender doesn't have enough funds to send tx.";
const deployFolder = './deployment';
const contractFolder = './contracts';


describe('Deploy cli command', () => {

    it('should deploy with no parameters', async function () {
        fs.mkdirSync(deployFolder)
        fs.writeFileSync(`${deployFolder}/deploy.js`, file);
        await assert.isFulfilled(deployer.run(), 'It was not successfully executed');
        sinon.assert.calledWithExactly(loggerSpy, successfulMessage)
        await fs.removeSync(deployFolder)
    });

    it('should throw error if "./deploy.js" file does not exist', async function () {
        await assert.isRejected(deployer.run(), deployError, "Expected throw not received");
    });

    it('should deploy specific file', async function () {
        await assert.isFulfilled(deployer.run(specificFile), 'It was not successfully executed');
        sinon.assert.calledWithExactly(loggerSpy, successfulMessage)
    });

    it('should deploy on specific network', async function () {
        await assert.isFulfilled(deployer.run(specificFile, 'local'), 'It was not successfully executed');
        sinon.assert.calledWithExactly(loggerSpy, successfulMessage)
    });

    it('should deploy with secret parameter', async function () {
        await assert.isFulfilled(deployer.run(specificFile, undefined, privateKey), 'It was not successfully executed');
        sinon.assert.calledWithExactly(loggerSpy, successfulMessage)
    });

    it('should throw error on deployment failure if silent is false', async function () {
        let consoleSpy = sinon.spy(console, "error");
        await deployer.run(specificFile, undefined, wrongPrivateKey, false);
        let logs = consoleSpy.getCall(0);
        let error = JSON.stringify(logs.args[0])
        let errorLogged = error.includes(errorMessage);
        assert.isTrue(errorLogged, 'The error is not logged.');
        sinon.assert.calledOnce(consoleSpy);
        consoleSpy.restore();
    });

    it('should not throw error on deployment failure if silent is true', async function () {
        let consoleSpy = sinon.spy(console, "error");
        await deployer.run(specificFile, undefined, wrongPrivateKey, true);
        sinon.assert.notCalled(consoleSpy);
        consoleSpy.restore();
    });

    it('should deploy with compile parameter', async function () {
        fs.mkdirSync(contractFolder)
        await deployer.run(specificFile, undefined, undefined, undefined, true);
        sinon.assert.calledWith(compileSpy, '.');
        sinon.assert.calledWithExactly(loggerSpy, successfulMessage)
    });

    it('should deploy with compile and run parameters', async function () {
        let run = 99;
        await deployer.run(specificFile, undefined, undefined, undefined, true, run);
        sinon.assert.calledWithExactly(compileSpy, ".", run);
        sinon.assert.calledWithExactly(loggerSpy, successfulMessage)
        fs.removeSync(contractFolder);
        compileSpy.restore();
    });

    it('should deploy with specific output parameter "normal"', async function () {
        await assert.isFulfilled(deployer.run(specificFile, undefined, undefined, undefined, undefined, undefined, 'normal'), 'It was not successfully executed')
        sinon.assert.calledWithExactly(loggerSpy, successfulMessage)
    });

    afterEach(async function () {
        loggerSpy.restore();
        await fs.removeSync('./.etherlime-store')
    })
})