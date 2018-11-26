const assert = require('chai').assert;
let chai = require("chai");
let chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const fs = require('fs-extra');
const _ = require('lodash');
const sinon = require('sinon');

const compiler = require('../../../cli-commands/compiler/compiler');
const contracts = require('../../../cli-commands/compiler/etherlime-workflow-compile/index');
const etherlimeCompile = require('../../../cli-commands/compiler/etherlime-compile/index');
const Artifactor = require('../../../cli-commands/compiler/etherlime-artifactor');
const Resolver = require('../../../cli-commands/compiler/etherlime-resolver');
const EPMSource = require("../../../cli-commands/compiler/etherlime-resolver/epm");
const FSSource = require("../../../cli-commands/compiler/etherlime-resolver/fs");
const NPMSource = require('../../../cli-commands/compiler/etherlime-resolver/npm');
const expect = require('../../../cli-commands/compiler/etherlime-expect/index');
const schema = require('../../../cli-commands/compiler/etherlime-contract-schema/index');


let compiledContract = require('./examples/compiledContract');

let compileOptions = {
    "contracts_directory": `${process.cwd()}/contracts`,
    "working_directory": `${process.cwd()}`,
    "contracts_build_directory": `${process.cwd()}/build`,
    "artifactor": new Artifactor(`${process.cwd()}/build`),
    "compilers": {
        "solc": {
            "version": undefined,
            "docker": undefined
        }
    }
};

let callback = (er, res) => {
    if (er) {
        throw er
    } else {
        return res
    }
}

describe('Compile dependencies', () => {

    before(async function () {
        fs.mkdirSync('./contracts')
        fs.copyFileSync('./test/cli-commands/compile/examples/BillboardService.sol', './contracts/BillboardService.sol');
        fs.copyFileSync('./cli-commands/init/LimeFactory.sol', './contracts/LimeFactory.sol');
        fs.copyFileSync('./test/cli-commands/compile/examples/SafeMath.sol', './contracts/SafeMath.sol');
    });

    describe('Contracts workflow compile tests', () => {

        it('should compile all contracts', async function () {
            compileOptions.all = true;
            compileOptions.compileAll = true;
            let etherlimeCompileSpy = sinon.spy(etherlimeCompile, "all");
            await contracts.compile(compileOptions, callback);
            sinon.assert.calledOnce(etherlimeCompileSpy);
            etherlimeCompileSpy.restore();
        });

        it('should compile only if necessary', async function () {
            let etherlimeCompileSpy = sinon.spy(etherlimeCompile, "necessary");
            compileOptions.all = false;
            compileOptions.compileAll = false;
            await contracts.compile(compileOptions, callback);
            sinon.assert.calledOnce(etherlimeCompileSpy);
            etherlimeCompileSpy.restore();
        });

        it('should not create new resolver if it was already created', async function () {
            compileOptions.resolver = new Resolver(compileOptions);
            let resolveSpy = sinon.spy(Resolver)
            await contracts.compile(compileOptions, callback);
            sinon.assert.notCalled(resolveSpy)
        });

        it("should throw error if array with contract objects is invalid", async function () {
            let error = `Destination ${process.cwd()}/build`
            compileOptions.quiet = true
            compileOptions.quietWrite = true;
            let contractArray = null;
            await assert.isRejected(contracts.write_contracts(contractArray, compileOptions, callback), error)
        });
    });

    describe('Artifactor tests', () => {

        it('should save artifacts of compiled contract', async function () {
            await assert.isFulfilled(compileOptions.artifactor.save(compiledContract), "Artifacts are not saved")
        });

        it('should throw error if contractName is null', async function () {
            compiledContract.contractName = null;
            let error = "You must specify a contract name."
            await assert.isRejected(compileOptions.artifactor.save(compiledContract), error)
        });

        it('should save artifacts if compiled objects are passed as an array', async function () {
            let arrayCompiledContracts = _.castArray(compiledContract)
            await assert.isFulfilled(compileOptions.artifactor.saveAll(arrayCompiledContracts), "Artifacts are not saved")
        })
    });

    describe('Resolver tests', () => {

        before(async function () {
            compileOptions.resolver = new Resolver(compileOptions)
            fs.mkdirSync('installed_contracts')
            fs.copyFileSync('./test/cli-commands/compile/examples/SafeMath.sol', './installed_contracts/SafeMath.sol');
            fs.mkdirpSync('installed_contracts/math/contracts')
            fs.copyFileSync('./test/cli-commands/compile/examples/SafeMath.sol', './installed_contracts/math/contracts/SafeMath.sol');
        });

        it('should resolve files if second parameter is function', function () {
            let fnExecution = new Promise((resolve, reject) => {
                compileOptions.resolver.resolve("SafeMath.sol", function (err) {
                    if (!err) {
                        resolve()
                        return
                    }

                    reject(err)
                })
            })

            assert.isFulfilled(fnExecution, 'It must resolve files if "imported_from" is missing')
        });

        it("should throw error if try to resolve non-existing file", function () {
            let expectedError = "Could not find Unexisting.sol from any sources; imported from installed_contracts";
            const fnExecution = new Promise((resolve, reject) => {
                compileOptions.resolver.resolve("Unexisting.sol", "installed_contracts", function (err) {
                    if (!err) {
                        resolve();
                        return;
                    }

                    reject(err)
                })
            });

            assert.isRejected(fnExecution, expectedError, 'The .sol file mist be non-existing');

        });

        it("should throw error if try to resolve non-existing file without passing 'imported_from' param", function () {
            let expectedError = "Could not find Unexisting.sol from any sources";
            const fnExecution = new Promise((resolve, reject) => {
                compileOptions.resolver.resolve("Unexisting.sol", function (err) {
                    if (!err) {
                        resolve();
                        return;
                    }

                    reject(err)
                })
            });

            assert.isRejected(fnExecution, expectedError, 'The .sol file mist be non-existing');

        });


        //EPM Source
        it('should find resource file in Eth package manager', function () {
            let library = 'library SafeMath'
            let resource = compileOptions.resolver.sources[0].resolve("SafeMath.sol", "BillboardService.sol", callback);
            assert.include(resource, library)
        });

        it('should find resource file from specific package_name', function () {
            let library = 'library SafeMath'
            let package_name = "math"
            let resource = compileOptions.resolver.sources[0].resolve(`${package_name}/SafeMath.sol`, "BillboardService.sol", callback);
            assert.include(resource, library)
        });

        it('should resolve dependency path', function () {
            let dependencyPath = 'installed_contracts/math/contracts/SafeMath.sol'
            let resolvedDependency = compileOptions.resolver.sources[0].resolve_dependency_path(dependencyPath, "SafeMath.sol", callback);
            assert.equal(resolvedDependency, dependencyPath)
        })

        //NPM Source
        it('should find file in node-modules', function () {
            let library = 'exports = module.exports = Yargs'
            let result = compileOptions.resolver.sources[1].resolve('yargs/yargs.js', "", callback)
            assert.include(result, library)
        });

        it('should resolve dependency path in contract', function () {
            let dependencyPath = `${process.cwd()}/contracts/SafeMath.sol`;
            let resolvedDependencyPath = compileOptions.resolver.sources[1].resolve_dependency_path(`${process.cwd()}/contracts/BillboardService.sol`, `SafeMath.sol`);
            assert.equal(dependencyPath, resolvedDependencyPath)
        });

        //FS Source
        it('should get contracts names', function () {
            let expectedName = "BillboardService";
            let receivedName = compileOptions.resolver.sources[2].getContractName(`contracts/BillboardService.sol`)
            assert.equal(expectedName, receivedName)
        });

        it('should get contracts name with long path', function () {
            let expectedName = "LimeFactory";
            let receivedName = compileOptions.resolver.sources[2].getContractName(`${process.cwd()}/contracts/LimeFactory.sol`)
            assert.equal(expectedName, receivedName)
        });

        after(async function() {
            fs.removeSync('./installed_contracts')
        })

    });

    describe("Schema tests", () => {

        it('should not change legasyAST object if schemaVersion is bigger than v2.0.0', function () {
            compiledContract.schemaVersion = "4.9.8"
            let normalizedResult = schema.normalize(compiledContract)
            assert.equal(compiledContract.legacyAST, normalizedResult.legacyAST)
        });

        it('should normalize to string "updateAt" date if it is a number', function () {
            compiledContract.updatedAt = 20181125;
            let normalizedResult = schema.normalize(compiledContract)
            assert.isString(normalizedResult.updatedAt)
        });

        it('should normalize "bytecode" if it does not starts with "0x"', function () {
            compiledContract.bytecode = compiledContract.bytecode.substring(2, compiledContract.bytecode.length);
            let normalizedResult = schema.normalize(compiledContract)
            let prefix = normalizedResult.bytecode.substring(0, 2)
            assert.equal(prefix, '0x')
        });

        it('should normalize "deployedBytecode" if it does not starts with "0x"', function () {
            compiledContract.deployedBytecode = compiledContract.deployedBytecode.substring(2, compiledContract.deployedBytecode.length);
            let normalizedResult = schema.normalize(compiledContract)
            let prefix = normalizedResult.deployedBytecode.substring(0, 2)
            assert.equal(prefix, '0x')
        });

        it('should return undefined if ABI is invalid object', function () {
            compiledContract.abi = '{"constant": true'
            let normalizedResult = schema.normalize(compiledContract)
            assert.typeOf(normalizedResult.abi, 'undefined')
        });

        it('should normalize property starting with "x-"', function() {
            compiledContract["x-NewProperty"] = "someValue"
            let normalizedResult = schema.normalize(compiledContract)
            let propertyValue = normalizedResult["x-NewProperty"]
            assert.equal(propertyValue, "someValue")    
        });

    })

    describe('Expect options tests', () => {
        it('should throw error if expected parameter is not found', async function () {
            let expectedError = 'Expected parameter "working_directory" not passed to function.'
            compileOptions.working_directory = null;
            assert.throws(() => {
                expect.options(compileOptions, ['working_directory'])
            }, expectedError)
        });

        it('should throw error if none of expected parameters is found', async function () {
            let expectedError = 'Expected one of the following parameters, but found none: working_directory, contracts_directory'
            compileOptions.working_directory = null;
            compileOptions.contracts_directory = null;
            assert.throws(() => {
                expect.one(compileOptions, ['working_directory', 'contracts_directory'])
            }, expectedError)
        });
    });


    after(async function () {
        fs.removeSync('./contracts')
        fs.removeSync('./build');
    });

})