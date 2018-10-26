const assert = require('chai').assert;
const etherlime = require('./../../../index.js');
let chai = require("chai");
let chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const sinon = require('sinon');
const fs = require('fs-extra');

const deployer = require('../../../cli-commands/deployer/deployer');
const compiler = require('../../../cli-commands/compiler/compiler');
let compileSpy = sinon.spy(compiler, "run");

let privateKey = "7ab741b57e8d94dd7e1a29055646bafde7010f38a900f55bbd7647880faa6ee8";
let wrongPrivateKey = "7ab741b57e8d94dd7e1a29055646bafde7010f38a900f55bbd7647880faa6ee9";

const specificFile = 'test/cli-commands/deploy/testDeploy.js';
const deployError = "deployment/deploy.js file not found. Probably you've not initialized etherlime. Please run etherlime init first.";
const errorMessage = "sender doesn't have enough funds to send tx.";
const deployFolder = './deployment';
const contractFolder = './contracts';


describe('Deploy cli command', () => {

    it('should deploy with no parameters', async function() {
        fs.mkdirSync(deployFolder)
        fs.copyFileSync(`${__dirname}/testDeploy2.js`, `${deployFolder}/deploy.js`);
        await assert.isFulfilled(deployer.run(), 'It was not successfully executed');
        await fs.removeSync(deployFolder)
    });

    it('should throw error if "./deployment" file does not exist', async function () {
        await assert.isRejected(deployer.run(), deployError, "Expected throw not received");
    });

    it('should deploy specific file', async function () {
        await assert.isFulfilled(deployer.run(specificFile), 'It was not successfully executed');
    });

    it('should deploy on specific network', async function () {
        await assert.isFulfilled(deployer.run(specificFile, 'local'), 'It was not successfully executed');
    });

    it('should deploy wiht secret parameter', async function () {
        await assert.isFulfilled(deployer.run(specificFile, undefined, privateKey), 'It was not successfully executed');
    });

    it('should throw error on deployment failure', async function () {    
        let consoleSpy = sinon.spy(console, "error");
        await deployer.run(specificFile, undefined, wrongPrivateKey, false);
        let logs = consoleSpy.getCall(0);
        let error = JSON.stringify(logs.args[0])
        let errorLogged = error.includes(errorMessage);
        assert.isTrue(errorLogged, 'The error is not logged.');
        sinon.assert.calledOnce(consoleSpy);
        consoleSpy.restore();
    })

    it('should deploy with compile parameter', async function () {
        fs.mkdirSync(contractFolder)
        await deployer.run(specificFile, undefined, undefined, undefined, true);
        sinon.assert.calledWith(compileSpy, '.');
        fs.removeSync(contractFolder);
    });

    it('should deploy with compile and run parameters', async function () {
        fs.mkdirSync(contractFolder)
        let run = 99;
        await deployer.run(specificFile, undefined, undefined, undefined, true, run);
        sinon.assert.calledWithExactly(compileSpy, ".", run);
        fs.removeSync(contractFolder);
        compileSpy.restore();
    });

    it('should deploy with specific output parameter "structured"', async function () {
        await assert.isFulfilled(deployer.run(specificFile, undefined, undefined, undefined, undefined, undefined, 'structured'), 'It was not successfully executed')
    });

    it('should deploy with specific otuput parameter "normal"', async function () {
        await assert.isFulfilled(deployer.run(specificFile, undefined, undefined, undefined, undefined, undefined, 'normal'), 'It was not successfully executed')
    });

    afterEach(async function () {
        await fs.removeSync('./.etherlime-store')
        await fs.removeSync('./.etherlime-store/.history.json');
    })
})