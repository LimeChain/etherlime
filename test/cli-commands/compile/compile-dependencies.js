const assert = require('chai').assert;
let chai = require("chai");
let chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const sinon = require('sinon');
const fs = require('fs-extra');
const util = require('util');
const request = require('request-promise');

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
const error = require('../../../cli-commands/compiler/etherlime-error/index');
const compileError = require('../../../cli-commands/compiler/etherlime-compile/compile-error');
const profiler = require('../../../cli-commands/compiler/etherlime-compile/profiler');
const parser = require('../../../cli-commands/compiler/etherlime-compile/parser');
const Config = require('../../../cli-commands/compiler/etherlime-config');
const CompilerSupplier = require('../../../cli-commands/compiler/etherlime-compile/compilerSupplier');
const solcWraper = require('solc/wrapper');
let compilerSupplier;
let soljson = require('./examples/soljson');
let soljsonDifVersion = require('./examples/soljsonDifVersion');
let file;

let compiledContract = require('./examples/compiledContract');
let contractForFailCompilation = require('./examples/ContractForFailCompilation').contractForFailCompilation;
let contractWithExternalImports = require('./examples/contractWithExternalImports').contractWithExternalImports;
let contractWithImportSyntaxErr = require('./examples/contractWithImportSyntaxErr').contractWithImportSyntaxErr;

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
        fs.copyFileSync('./test/cli-commands/compile/examples/Empty.sol', './contracts/Empty.sol');
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
            let expectedError = `Destination ${process.cwd()}/build`
            compileOptions.quiet = true
            compileOptions.quietWrite = true;
            let contractArray = null;
            await assert.isRejected(contracts.write_contracts(contractArray, compileOptions, callback), expectedError)
        });
    });

    describe('Artifactor tests', () => {

        afterEach(async function () {
            fs.removeSync('./build/BillboardService.json')
        })

        it('should save artifacts of compiled contract', async function () {
            await assert.isFulfilled(compileOptions.artifactor.save(compiledContract), "Artifacts are not saved")
        });

        it('should throw error if contractName is null', async function () {
            compiledContract.contractName = null;
            let expectedError = "You must specify a contract name."
            await assert.isRejected(compileOptions.artifactor.save(compiledContract), expectedError)
        });

        it('should save artifacts if compiled objects are passed as an array', async function () {
            await assert.isFulfilled(compileOptions.artifactor.saveAll([compiledContract]), "Artifacts are not saved")
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

        it('should resolve files if second parameter is function', async function () {
            let fnExecution = new Promise((resolve, reject) => {
                compileOptions.resolver.resolve("SafeMath.sol", function (err) {
                    if (!err) {
                        resolve()
                        return
                    }

                    reject(err)
                })
            })

            await assert.isFulfilled(fnExecution, 'It must resolve files if "imported_from" is missing')
        });

        it("should throw error if try to resolve non-existing file", async function () {
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

            await assert.isRejected(fnExecution, expectedError, 'The .sol file mist be non-existing');

        });

        it("should throw error if try to resolve non-existing file without passing 'imported_from' param", async function () {
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

            await assert.isRejected(fnExecution, expectedError, 'The .sol file must be non-existing and "imported_from" argument should be missing');

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

        it('should get contract name with long path', function () {
            let expectedName = "LimeFactory";
            let receivedName = compileOptions.resolver.sources[2].getContractName(`${process.cwd()}/contracts/LimeFactory.sol`)
            assert.equal(expectedName, receivedName)
        });

        after(async function () {
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

        it('should normalize property starting with "x-"', function () {
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

    describe('Error tests', () => {
        let errorMessage = `Can not compile contracts.
        Please, check your code`;
        let extendableError = new error(errorMessage);


        it('should create new extendable error', function () {
            assert.include(JSON.stringify(extendableError), "Can not compile contracts.")
        });

        it('should add tab if error message has a new line', function () {
            let errorLengthBeforeFormat = extendableError.message.length;
            extendableError.formatForMocha()
            let errorLengthAfterFormat = extendableError.message.length;
            assert.equal(errorLengthBeforeFormat, errorLengthAfterFormat - 5)
        });

        it('should create new compile error', function () {
            let errorMessage = "Can not compile contracts";
            let compilerError = new compileError(errorMessage);
            assert.include(JSON.stringify(compilerError), errorMessage);
        });
    });

    describe("Etherlime compiler tests", () => {

        before(async function () {
            compileOptions.working_directory = `${process.cwd()}`;
            compileOptions.resolver = new Resolver(compileOptions);
            compileOptions.paths = [`${process.cwd()}/contracts/BillboardService.sol`,
            `${process.cwd()}/contracts/SafeMath.sol`,
            `${process.cwd()}/contracts/LimeFactory.sol`];
            compileOptions.solc = {
                optimizer: { enabled: false, runs: 200 },
                evmVersion: 'byzantium'
            };
        });


        it('should compile if contracts_directory is not specified in the options', async function () {
            compileOptions.contracts_directory = null;
            let currentDir = process.cwd();
            process.chdir('./contracts')
            let fnExecution = new Promise((resolve, reject) => {
                etherlimeCompile.with_dependencies(compileOptions, function (err) {
                    if (!err) {
                        resolve()
                        return
                    }
                    reject(err)
                });
            });

            await assert.isFulfilled(fnExecution, "You must have ./contracts folder")
            process.chdir(currentDir)
        });

        it('should compile if contract has functions with same names', async function () {
            fs.copyFileSync('./test/cli-commands/compile/examples/contractWithSameNameFn.sol', './contracts/contractWithSameNameFn.sol');
            let fnExecution = new Promise((resolve, reject) => {
                etherlimeCompile.with_dependencies(compileOptions, function (err) {
                    if (!err) {
                        resolve()
                        return
                    }
                    reject(err)
                });
            });
            await assert.isFulfilled(fnExecution, "A contract containing functions with same names should not throw error");
        });

        it('should throw error if contracts_directory is unexistingFolder', async function () {
            compileOptions.contracts_directory = `${process.cwd()}/unexistingFolder`
            compileOptions.paths = [];
            let expectedError = "ENOENT: no such file or directory";
            let fnExecution = new Promise((resolve, reject) => {
                etherlimeCompile.with_dependencies(compileOptions, function (err) {
                    if (!err) {
                        resolve()
                        return
                    }
                    reject(err)
                });
            });

            await assert.isRejected(fnExecution, expectedError)
            compileOptions.contracts_directory = `${process.cwd()}/contracts`;
        });

        it('should compile with warnings on contract', async function () {
            compileOptions.quiet = false;
            fs.copyFileSync('./test/cli-commands/compile/examples/ContractWithWarning.sol', './contracts/ContractWithWarning.sol');
            let fnExecution = new Promise((resolve, reject) => {
                etherlimeCompile.all(compileOptions, function (err) {
                    if (!err) {
                        resolve()
                        return
                    }
                    reject(err)
                });
            });
            await assert.isFulfilled(fnExecution, "Warnings on contract should not throw error")
        });

        it('should throw error if compilation fail', async function () {
            compileOptions.paths = [`${process.cwd()}/contracts/BillboardService.sol`,
            `${process.cwd()}/contracts/SafeMath.sol`,
            `${process.cwd()}/contracts/LimeFactory.sol`];
            fs.writeFileSync('./contracts/ContractForFailCompilation.sol', contractForFailCompilation);
            let expectedError = "Source file requires different compiler version";
            let fnExecution = new Promise((resolve, reject) => {
                etherlimeCompile.with_dependencies(compileOptions, function (err) {
                    if (!err) {
                        resolve()
                        return
                    }

                    reject(err)
                });
            });
            await assert.isRejected(fnExecution, expectedError)
        });

        it('should throw err if there is syntax err', async function() {
            let expectedError = "Expected ';' but got end of source"
            const sourceObject = {
                "::contracts\\Empty.sol": 'pragma solidity ^0.5.0 contract Empty {\n\n}'
            }

            let fnExecution = new Promise((resolve, reject) => {
                etherlimeCompile(sourceObject, compileOptions, function (err) {
                    if (!err) {
                        resolve()
                        return
                    }
                    reject(err)
                });
            });

            await assert.isRejected(fnExecution, expectedError)

        })

        it('should replace \\ with /', async function () {
            compileOptions.strict = true;
            const sourceObject = {
                "::contracts\\Empty.sol": 'pragma solidity ^0.5.0;\n\ncontract Empty {\n\n}'
            }

            let fnExecution = new Promise((resolve, reject) => {
                etherlimeCompile(sourceObject, compileOptions, function (err) {
                    if (!err) {
                        resolve()
                        return
                    }
                    reject(err)
                });
            });

            await assert.isFulfilled(fnExecution, "Characters \\ should not throw err");
        });

        after(async function () {
            fs.removeSync('./contracts/contractWithSameNameFn.sol');
            fs.removeSync('./contracts/AbsolutelyEmpty.sol');
            fs.removeSync('./contracts/ContractForFailCompilation.sol');
        })

    });

    describe('Profiler tests', () => {

        before(async function () {
            compileOptions.paths = [`${process.cwd()}/contracts/BillboardService.sol`,
            `${process.cwd()}/contracts/SafeMath.sol`,
            `${process.cwd()}/contracts/Empty.sol`];
            compileOptions.base_path = `${process.cwd()}/contracts`;
            compileOptions.resolver = new Resolver(compileOptions);
        });

        it('should convert to absolute path', function () {
            let base = `${process.cwd()}/contracts/`;
            let path = [".BillboardService.sol"];
            let resultPath = profiler.convert_to_absolute_paths(path, base);
            assert.equal(resultPath[0], [base + path[0]][0]);
        })

        it('should return pure path if it is not related with "." to the base path', async function () {
            let base = `${process.cwd()}/contracts/`
            let path = ["BillboardService.sol"];
            let resultPath = profiler.convert_to_absolute_paths(path, base);
            assert.equal(resultPath[0], path[0]);
        });

        it('should return pure path if import path does not starts with .', async function () {
            let file = `${process.cwd()}/contracts/SafeMath.sol`
            let resolved = { file: `${process.cwd()}/contracts/SafeMath.sol` }

            let stub = sinon.stub(parser, "parseImports");
            stub.onFirstCall().returns(['SafeMath.sol'])

            let result = profiler.getImports(file, resolved)
            assert.equal(result, "SafeMath.sol")
            stub.restore()
        })

        it('should throw error if getImports function throws error', async function () {
            let stub = sinon.stub(profiler, "getImports");
            stub.onCall(0).returns([])
            stub.onCall(1).returns([])
            stub.onCall(2).returns([])
            stub.onCall(3).returns([])
            stub.onCall(4).returns([])
            stub.onCall(5).returns([])
            stub.onCall(6).throws()

            let fnExecution = new Promise((resolve, reject) => {
                profiler.required_sources(compileOptions, function (err) {
                    if (!err) {
                        resolve()
                        return
                    }
                    reject(err);
                });
            });

            await assert.isRejected(fnExecution)
            stub.restore();
        });

        it('should compile with max safe integer if updatedAt is bigger', async function () {
            compiledContract.updatedAt = Number.MAX_SAFE_INTEGER + 1;
            fs.writeFileSync('./build/compiledContract.json', JSON.stringify(compiledContract));
            let fnExecution = new Promise((resolve, reject) => {
                profiler.updated(compileOptions, function (err) {
                    if (!err) {
                        resolve()
                        return
                    }
                    reject(err)
                });
            });

            await assert.isFulfilled(fnExecution);

        });

        it('should reject if error occurs', async function () {
            let resolver = new FSSource(undefined, undefined);
            let initial_paths = [`${process.cwd()}/contracts/BillboardService.sol`];
            let solc = { "version": "[Function]" }

            let expectedError = "solc.compile is not a function"

            let fnExecution = new Promise((resolve, reject) => {
                profiler.resolveAllSources(resolver, initial_paths, solc, function (err) {
                    if (!err) {
                        resolve()
                        return
                    }
                    reject(err)
                });
            });

            await assert.isRejected(fnExecution, expectedError);
        });

        it('should throw if resolver throws', async function () {
            let initial_paths = [`${process.cwd()}/contracts/BillboardService.sol`];
            let solc = { "version": "[Function]" }
            let resolver = new Resolver(compileOptions);

            let stub = sinon.stub(resolver, "resolve");
            stub.throws()

            let fnExecution = new Promise((resolve, reject) => {
                profiler.resolveAllSources(resolver, initial_paths, solc, function (err) {
                    if (!err) {
                        resolve()
                        return
                    }
                    reject(err)
                });
            });

            await assert.isRejected(fnExecution);
            stub.restore();
        })

        it('should compile with external imports', async function () {
            fs.writeFileSync('./contracts/contractWithExternalImports.sol', contractWithExternalImports);
            let fnExecution = new Promise((resolve, reject) => {
                profiler.required_sources(compileOptions, function (err) {
                    if (!err) {
                        resolve()
                        return
                    }
                    reject(err)
                });
            });

            await assert.isFulfilled(fnExecution);
        });

        it('should compile if paths includes external imported contract', async function () {
            compileOptions.paths.push(`${process.cwd()}/node_modules/openzeppelin-solidity/contracts/crowdsale/emission/MintedCrowdsale.sol`);
            let fnExecution = new Promise((resolve, reject) => {
                profiler.required_sources(compileOptions, function (err) {
                    if (!err) {
                        resolve()
                        return
                    }
                    reject(err)
                });
            });

            await assert.isFulfilled(fnExecution);
        });

        it('should throw if there is syntax error when importing contract', async function () {
            fs.writeFileSync('./contracts/contractImportFailCompilation.sol', contractWithImportSyntaxErr);
            let expectedError = "ParserError: Expected ';' but got 'contract'";
            let fnExecution = new Promise((resolve, reject) => {
                profiler.required_sources(compileOptions, function (err) {
                    if (!err) {
                        resolve()
                        return
                    }
                    reject(err)
                });
            });

            await assert.isRejected(fnExecution, expectedError);
            fs.removeSync('./contracts/contractWithImportSyntaxErr.sol')
        })


        it('should compile if files are provided as an option', async function () {
            compileOptions.files = [`${process.cwd()}/contracts/BillboardService.sol`,
            `${process.cwd()}/contracts/SafeMath.sol`,
            `${process.cwd()}/contracts/LimeFactory.sol`]

            let fnExecution = new Promise((resolve, reject) => {
                profiler.updated(compileOptions, (err) => {
                    if (!err) {
                        resolve()
                        return
                    }

                    reject(err);
                });
            });

            await assert.isFulfilled(fnExecution, "Paths in options must be right")
        });

        it('should reject if parser fail', async function () {
            let stub = sinon.stub(JSON, "parse")
            stub.throws();

            let fnExecution = new Promise((resolve, reject) => {
                profiler.updated(compileOptions, (err) => {
                    if (!err) {
                        resolve()
                        return
                    }
                    reject(err);
                });
            });

            await assert.isRejected(fnExecution)
            stub.restore()
        });

        it('should not throw when reading stats of unexisting file', async function () {
            compileOptions.files = [`${process.cwd()}/contracts/Unexisting.sol`]
            let fnExecution = new Promise((resolve, reject) => {
                profiler.updated(compileOptions, (err) => {
                    if (!err) {
                        resolve()
                        return
                    }
                    reject(err);
                });
            });

            await assert.isFulfilled(fnExecution, "Stats of Unexisting.sol must be equal to null");
        });


        it('should throw if file can not be read', async function () {
            fs.chmodSync('./build/SafeMath.json', 763)
            let expectedError = "EACCES: permission denied"
            let fnExecution = new Promise((resolve, reject) => {
                profiler.updated(compileOptions, (err) => {
                    if (!err) {
                        resolve()
                        return
                    }
                    reject(err);
                });
            });

            await assert.isRejected(fnExecution, expectedError)
            fs.chmodSync('./build/SafeMath.json', 0o777)
        });


        it('should throw err if build directory can not be read', async function () {
            fs.chmodSync('./build', 763)
            let expectedError = "EACCES: permission denied"
            let fnExecution = new Promise((resolve, reject) => {
                profiler.updated(compileOptions, function (err) {
                    if (!err) {
                        resolve()
                        return
                    }

                    reject(err)
                });
            });

            await assert.isRejected(fnExecution, expectedError)
            fs.chmodSync('./build', 0o777)
        });

    });

    describe('Config tests', () => {
        let config;
        before(function () {
            config = Config.default();
        });

        it('should set contracts directory if it is not defined in options', function () {
            compileOptions.contracts_directory = undefined;
            config.merge(compileOptions)
            assert.equal(config.contracts_directory, `${process.cwd()}/contracts`);
        });

    });

    describe('CompilerSupplier tests', () => {

        it('should throw err if versions url is wrong', async function () {
            let options = {
                version: undefined,
                versionsUrl: 'https://solc-bin.ethereum.org/bin/list',
                compilerUrlRoot: 'https://solc-bin.ethereum.org/bin/',
                dockerTagsUrl: 'https://registry.hub.docker.com/v2/repositories/ethereum/solc/tags/',
                cache: false,
                docker: undefined
            }

            compilerSupplier = new CompilerSupplier(options);
            let expectedError = "Failed to complete request";
            let errMessage;
            try {
                await compilerSupplier.getVersions()
            } catch (e) {
                if (e) {
                    errMessage = e.message
                }
            }

            assert.include(errMessage, expectedError);

        });

        it('should throw err if con not find local path', async function () {
            let options = {
                versionsUrl: 'https://solc-bin.ethereum.org/bin/list.json',
                compilerUrlRoot: 'https://solc-bin.ethereum.org/bin/',
                dockerTagsUrl: 'https://registry.hub.docker.com/v2/repositories/ethereum/solc/tags/',
                cache: true,
                docker: undefined
            }
            compilerSupplier = new CompilerSupplier(options);
            let expectedError = "Could not find compiler"
            let errMessage;
            let path = `${process.cwd()}/unexisting`
            try {
                await compilerSupplier.getLocal(path)
            } catch (e) {
                if (e) {
                    errMessage = e.message
                }
            }

            assert.include(errMessage, expectedError)
        });

        it('should save cache of specific version', async function () {
            let options = {
                versionsUrl: 'https://solc-bin.ethereum.org/bin/list.json',
                compilerUrlRoot: 'https://solc-bin.ethereum.org/bin/',
                dockerTagsUrl: 'https://registry.hub.docker.com/v2/repositories/ethereum/solc/tags/',
                cache: true,
                docker: undefined
            }

            compilerSupplier = new CompilerSupplier(options);


            let allVersions = await compilerSupplier.getVersions(options.versionsUrl)
            file = compilerSupplier.getVersionUrlSegment("0.4.21", allVersions);
            let url = options.compilerUrlRoot + file;
            let code = await request.get(url)

            await compilerSupplier.addToCache(code, file);

            assert.isTrue(fs.existsSync('./node_modules/.cache/etherlime/soljson-v0.4.21+commit.dfe3193c.js'))

        });

        it('should check if file is cashed', async () => {
            let result = await compilerSupplier.isCached(file);
            assert.isTrue(result)
        });

        it('should throw if try to get cache of module from wrong path', async () => {
            let path = 'unexisting'
            let expectedError = "Cannot find module"
            let errMessage;
            try {
                await compilerSupplier.getFromCache(path)
            } catch (e) {
                if (e) {
                    errMessage = e.message
                }
            }

            assert.include(errMessage, expectedError)
        })

        it('should normalize version', async () => {
            let version = "macOS: version 10.13.1 (build: 17B1003)"
            let result = await compilerSupplier.normalizeVersion(version)
            assert.include(result, "version 10.13.1")
        });

        it('should throw if try to build docker with wrong version', async () => {
            let version = "nightly-alpine-0.5.3-8825533222519c051693d1fb4bcaba6ea0cde2"
            await assert.throws(() => {
                compilerSupplier.getBuilt(version)
            })

        });

        it('should throw if try to get wrong version by URL', async () => {
            let version = "0.3"
            let expectedError = "Could not find compiler"
            let errMessage;
            let path = `${process.cwd()}/unexisting`
            try {
                await compilerSupplier.getByUrl(version)
            } catch (e) {
                if (e) {
                    errMessage = e.message
                }
            }

            assert.include(errMessage, expectedError)
        })

        it('should get commit form version', async () => {
            let version = `"path": "soljson-v0.1.1+commit.6ff4cd6.js",
            "version": "0.1.1",
            "build": "commit.6ff4cd6",
            "longVersion": "0.1.1+commit.6ff4cd6",
            "keccak256": "0xd8b8c64f4e9de41e6604e6ac30274eff5b80f831f8534f0ad85ec0aff466bb25",
            "urls": [
              "bzzr://8f3c028825a1b72645f46920b67dca9432a87fc37a8940a2b2ce1dd6ddc2e29b"`
            let result = await compilerSupplier.getCommitFromVersion(version)
            assert.include(result, 'commit.6ff4cd6')
        })

        it('should wrap soljson module', async () => {
            let result = solcWraper(soljson);
            assert.isObject(result)
        })

        it('should wrap dif version of soljson', async () => {
            let result = solcWraper(soljsonDifVersion)
            assert.isObject(result)
        })

    });

    after(async function () {
        compilerSupplier = new CompilerSupplier({
            version: null,
            versionsUrl: 'https://solc-bin.ethereum.org/bin/list.json',
            compilerUrlRoot: 'https://solc-bin.ethereum.org/bin/',
            dockerTagsUrl: 'https://registry.hub.docker.com/v2/repositories/ethereum/solc/tags/',
            cache: false,
        })
        fs.removeSync('./node_modules/.cache/etherlime/soljson-v0.4.21+commit.dfe3193c.js')
        fs.removeSync('./contracts')
        fs.removeSync('./build');
    });

});
