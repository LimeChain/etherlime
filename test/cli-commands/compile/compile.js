const compiler = require('../../../cli-commands/compiler/compiler')
const assert = require('chai').assert;
let chai = require("chai");
let chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const init = require('../../../cli-commands/init/init');
const fs = require('fs-extra');
const sinon = require('sinon');
let currentDir;

let error = "In order to use the docker, please set an image name: --solcVersion=<image-name>"
//(defaultPath, runs, solcVersion, useDocker, list, all, quite)

describe('Compile cli command', () => {

    before( async function() {
        fs.mkdirSync('./contracts')
        fs.copyFileSync('./cli-commands/init/LimeFactory.sol', './contracts/LimeFactory.sol');
    });

    it('should run compile without parameters', async function() {
        await assert.isFulfilled(compiler.run('.'), "It is not successfuly executed!");
    });

    it('should run compile with specific path', async function() {
        fs.mkdirpSync('./specific')
        fs.mkdirpSync('./specific/contracts')
        fs.copyFileSync('./cli-commands/init/LimeFactory.sol', './specific/contracts/LimeFactory.sol');
        await assert.isFulfilled(compiler.run('specific'), "It is not successfuly executed!");
    });

    it('should throw error if path is not existing', async function() {
        await assert.isRejected(compiler.run('./notExistitngFile',))
    })

    it('should run compile with specific runs', async function() {
        await assert.isFulfilled(compiler.run('.', 10), "It is not successfuly executed!")
    });

    it('should run compile with specific solc version and userDocker', async function() {
        await assert.isFulfilled(compiler.run('.', undefined, "^0.4.21", true), "It is not successfuly executed!")
    });

    it('should throw error if docker is true but solc version is undefined', async function() {
        await assert.isRejected(compiler.run('.', undefined, undefined, true), error)
    })

    it('should run help if the list of available solc versions is empty string', async function() {
        await assert.isFulfilled(compiler.run('.', undefined, undefined, undefined, ""), "It is not successfuly executed!")
    })
    
    it('should list docker solc versions', async function() {
        await assert.isFulfilled(compiler.run('.', undefined, undefined, undefined, "docker"), "It is not successfuly executed!")
    })

    it('shuld list specific solc versions', async function() {
        await assert.isFulfilled(compiler.run('.', undefined, undefined, undefined, "releases"), "It is not successfuly executed!")
    });

    it('should list all solc versions', async function() {
        await assert.isFulfilled(compiler.run('.', undefined, undefined, undefined, "releases", true), "It is not successfuly executed!")
    })

    it('should run compile with quiet parameter', async function() {
        await assert.isFulfilled(compiler.run('.', undefined, undefined, undefined, undefined, undefined, true), "It is not successfuly executed!")
    });

    after( async function() {
        fs.removeSync('./contracts')
        fs.removeSync('./specific');
    });
})