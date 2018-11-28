const compiler = require('../../../cli-commands/compiler/compiler')
const assert = require('chai').assert;
let chai = require("chai");
let chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const fs = require('fs-extra');
const sinon = require('sinon');

let error = "In order to use the docker, please set an image name: --solcVersion=<image-name>"

describe('Compile cli command', () => {

    before( async function() {
        fs.mkdirSync('./contracts')
        fs.copyFileSync('./cli-commands/init/LimeFactory.sol', './contracts/LimeFactory.sol');
        fs.copyFileSync('./test/cli-commands/compile/examples/BillboardService.sol', './contracts/BillboardService.sol');
        fs.copyFileSync('./test/cli-commands/compile/examples/SafeMath.sol', './contracts/SafeMath.sol');
    });

    it.only('should run compile without parameters', async function() {
        await assert.isFulfilled(compiler.run('.'), "It is not successfully executed!");
    });

    it('should run compile with specific path', async function() {
        fs.mkdirpSync('./specific')
        fs.mkdirpSync('./specific/contracts')
        fs.copyFileSync('./cli-commands/init/LimeFactory.sol', './specific/contracts/LimeFactory.sol');
        await assert.isFulfilled(compiler.run('specific'), "It is not successfully executed!");
    });

    it('should throw error if path is not existing', async function() {
        await assert.isRejected(compiler.run('./nonExistingFile',))
    })

    it('should run compile with specific runs', async function() {
        await assert.isFulfilled(compiler.run('.', 10), "It is not successfully executed!")
    });

    it('should run compile with specific solc version and userDocker', async function() {
        await assert.isFulfilled(compiler.run('.', undefined, "^0.4.21", true), "It is not successfully executed!")
    });

    it('should throw error if docker is true but solc version is undefined', async function() {
        await assert.isRejected(compiler.run('.', undefined, undefined, true), error)
    })

    it('should run help if the list of available solc versions is empty string', async function() {
        await assert.isFulfilled(compiler.run('.', undefined, undefined, undefined, ""), "It is not successfully executed!")
    })
    
    it('should list docker solc versions', async function() {
        await assert.isFulfilled(compiler.run('.', undefined, undefined, undefined, "docker"), "It is not successfully executed!")
    })

    it('should list specific solc versions', async function() {
        await assert.isFulfilled(compiler.run('.', undefined, undefined, undefined, "releases"), "It is not successfully executed!")
    });

    it('should list all solc versions', async function() {
        await assert.isFulfilled(compiler.run('.', undefined, undefined, undefined, "releases", true), "It is not successfully executed!")
    })

    it('should run compile with quiet parameter', async function() {
        await assert.isFulfilled(compiler.run('.', undefined, undefined, undefined, undefined, undefined, true), "It is not successfully executed!")
    });

    after( async function() {
        fs.removeSync('./contracts')
        fs.removeSync('./specific');
        fs.removeSync('./build');
    });
})