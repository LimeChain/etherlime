const compiler = require('../../../../packages/etherlime/cli-commands/compiler/compiler');
const assert = require('chai').assert;
let chai = require("chai");
let chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const fs = require('fs-extra');
const sinon = require('sinon');

let error = "In order to use the docker, please set an image name: --solcVersion=<image-name>"
let singleFileError = "Your file is not solidity file!";

describe('Compile cli command', () => {

    before(async function () {
        fs.mkdirSync('./contracts')
        fs.mkdirSync('./custom-contracts');
        fs.mkdirSync('./single-contract-folder');
        fs.copyFileSync('./packages/etherlime/cli-commands/init/LimeFactory.sol', './contracts/LimeFactory.sol');
        fs.copyFileSync('./packages/etherlime/cli-commands/init/LimeFactory.sol', './custom-contracts/LimeFactory.sol');
        fs.copyFileSync('./packages/etherlime/cli-commands/init/LimeFactory.sol', './single-contract-folder/LimeFactory.sol');
        fs.copyFileSync('./test/etherlime/cli-commands/compile/examples/BillboardService.sol', './contracts/BillboardService.sol');
        fs.copyFileSync('./test/etherlime/cli-commands/compile/examples/SafeMath.sol', './contracts/SafeMath.sol');
        fs.copyFileSync('./test/etherlime/cli-commands/compile/examples/wallet.vy', './contracts/wallet.vy');
    });

    it('should run compile without parameters', async function () {
        await assert.isFulfilled(compiler.run('.'), "It is not successfully executed!");
    });

    it('should run compile with specific path', async function () {
        fs.mkdirpSync('./specific')
        fs.mkdirpSync('./specific/contracts')
        fs.copyFileSync('./packages/etherlime/cli-commands/init/LimeFactory.sol', './specific/contracts/LimeFactory.sol');
        await assert.isFulfilled(compiler.run('specific'), "It is not successfully executed!");
    });

    it('should throw error if path is not existing', async function () {
        await assert.isRejected(compiler.run('./nonExistingFile'))
    })

    it('should run compile with specific runs', async function () {
        await assert.isFulfilled(compiler.run('.', 10), "It is not successfully executed!")
    });

    it('should run compile with specific solc version and userDocker', async function () {
        await assert.isFulfilled(compiler.run('.', undefined, "^0.4.21", true), "It is not successfully executed!")
    });

    it('should throw error if docker is true but solc version is undefined', async function () {
        await assert.isRejected(compiler.run('.', undefined, undefined, true), error)
    })

    it('should run help if the list of available solc versions is empty string', async function () {
        await assert.isFulfilled(compiler.run('.', undefined, undefined, undefined, ""), "It is not successfully executed!")
    })

    it('should list docker solc versions', async function () {
        await assert.isFulfilled(compiler.run('.', undefined, undefined, undefined, "docker"), "It is not successfully executed!")
    })

    it('should list specific solc versions', async function () {
        await assert.isFulfilled(compiler.run('.', undefined, undefined, undefined, "releases"), "It is not successfully executed!")
    });

    it('should list all solc versions', async function () {
        await assert.isFulfilled(compiler.run('.', undefined, undefined, undefined, "releases", true), "It is not successfully executed!")
    })

    it('should run compile with quiet parameter', async function () {
        await assert.isFulfilled(compiler.run('.', undefined, undefined, undefined, undefined, undefined, true), "It is not successfully executed!")
    });

    it('should run compile with custom build folder parameter', async function () {
        await assert.isFulfilled(compiler.run('.', undefined, undefined, undefined, undefined, undefined, true, './customBuild/build'), "It is not successfully executed!")
    });

    it('should run compile with custom working directory parameter', async function () {
        await assert.isFulfilled(compiler.run('.', undefined, undefined, undefined, undefined, undefined, true, './custom-contracts/build', './custom-contracts'), "It is not successfully executed!")
    });

    it('should run compile with custom working directory parameter that is a single smart contract', async function () {
        await assert.isFulfilled(compiler.run('.', undefined, undefined, undefined, undefined, undefined, true, undefined, 'single-contract-folder/LimeFactory.sol'), "It is not successfully executed!")
    });

    it('should run compile with custom working directory parameter that is a single smart contract and place contract in custom build directory', async function () {
        await assert.isFulfilled(compiler.run('.', undefined, undefined, undefined, undefined, undefined, true, './single-contract-build-directory', 'single-contract-folder/LimeFactory.sol'), "It is not successfully executed!")
    });

    it('should run compile successfully and add abis folder with abi files', async function () {
        await assert.isFulfilled(compiler.run('.', undefined, undefined, undefined, undefined, undefined, true, undefined, undefined, false, true), "It is not successfully executed!")
    });

    it('should run compile with custom working directory parameter that is single file with wrong file extension and return error', async function () {
        await assert.isRejected(compiler.run('.', undefined, undefined, undefined, undefined, undefined, true, './single-contract-build-directory', '/single-contract-folder/LimeFactory'));
    });

    it('should run compile with deleteCompiledFiles parameter and delete the files before compilation', async function () {
        await assert.isFulfilled(compiler.run('.', undefined, undefined, undefined, undefined, undefined, true, undefined, undefined, true));
    });

    it('should throw err if try to compile unexisting specific file', async function () {
        await assert.isRejected(compiler.run('.', undefined, undefined, undefined, undefined, undefined, true, undefined, 'contracts/unexisting.sol'))
    })

    it('should compile specific vyper contract', async function () {
        fs.copyFileSync('./test/etherlime/cli-commands/compile/examples/crowdfund.vy', './contracts/crowdfund.vy')
        await assert.isFulfilled(compiler.run('.', undefined, undefined, undefined, undefined, undefined, true, undefined, 'contracts/crowdfund.vy'))
    })

    it('should throw if try to compile unexisting vyper contract', async function () {
        await assert.isRejected(compiler.run('.', undefined, undefined, undefined, undefined, undefined, true, undefined, 'unexistingFile.vy'))
    })

    it('should compile only contract that has been updated', async function () {
        let newCode = `@public \ndef new(): \n    ind: int128`
        fs.appendFile('./contracts/crowdfund.vy', newCode)
        await assert.isFulfilled(compiler.run('.'), "It is not successfully executed!")
    })

    after(async function () {
        fs.removeSync('./contracts');
        fs.removeSync('./specific');
        fs.removeSync('./build');
        fs.removeSync('./customBuild');
        fs.removeSync('./custom-contracts');
        fs.removeSync('./single-contract-build-directory');
        fs.removeSync('./single-contract-folder');
    });
})