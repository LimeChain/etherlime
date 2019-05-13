"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("@0x/utils");
var chalk_1 = require("chalk");
var child_process_1 = require("child_process");
var ethUtil = require("ethereumjs-util");
var _ = require("lodash");
var path = require("path");
var requireFromString = require("require-from-string");
var solc = require("solc");
var constants_1 = require("./constants");
var fs_wrapper_1 = require("./fs_wrapper");
var types_1 = require("./types");
/**
 * Gets contract data on network or returns if an artifact does not exist.
 * @param artifactsDir Path to the artifacts directory.
 * @param contractName Name of contract.
 * @return Contract data on network or undefined.
 */
function getContractArtifactIfExistsAsync(artifactsDir, contractName) {
    return __awaiter(this, void 0, void 0, function () {
        var contractArtifact, currentArtifactPath, opts, contractArtifactString, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    currentArtifactPath = artifactsDir + "/" + path.basename(contractName, constants_1.constants.SOLIDITY_FILE_EXTENSION) + ".json";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    opts = {
                        encoding: 'utf8',
                    };
                    return [4 /*yield*/, fs_wrapper_1.fsWrapper.readFileAsync(currentArtifactPath, opts)];
                case 2:
                    contractArtifactString = _a.sent();
                    contractArtifact = JSON.parse(contractArtifactString);
                    return [2 /*return*/, contractArtifact];
                case 3:
                    err_1 = _a.sent();
                    return [2 /*return*/, undefined];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getContractArtifactIfExistsAsync = getContractArtifactIfExistsAsync;
/**
 * Creates a directory if it does not already exist.
 * @param artifactsDir Path to the directory.
 */
function createDirIfDoesNotExistAsync(dirPath) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!fs_wrapper_1.fsWrapper.doesPathExistSync(dirPath)) return [3 /*break*/, 2];
                    utils_1.logUtils.warn("Creating directory at " + dirPath + "...");
                    return [4 /*yield*/, fs_wrapper_1.fsWrapper.mkdirpAsync(dirPath)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
}
exports.createDirIfDoesNotExistAsync = createDirIfDoesNotExistAsync;
/**
 * Searches Solidity source code for compiler version range.
 * @param  source Source code of contract.
 * @return Solc compiler version range.
 */
function parseSolidityVersionRange(source) {
    var SOLIDITY_VERSION_RANGE_REGEX = /pragma\s+solidity\s+(.*);/;
    var solcVersionRangeMatch = source.match(SOLIDITY_VERSION_RANGE_REGEX);
    if (solcVersionRangeMatch === null) {
        throw new Error('Could not find Solidity version range in source');
    }
    var solcVersionRange = solcVersionRangeMatch[1];
    return solcVersionRange;
}
exports.parseSolidityVersionRange = parseSolidityVersionRange;
/**
 * Normalizes the path found in the error message. If it cannot be normalized
 * the original error message is returned.
 * Example: converts 'base/Token.sol:6:46: Warning: Unused local variable'
 *          to 'Token.sol:6:46: Warning: Unused local variable'
 * This is used to prevent logging the same error multiple times.
 * @param  errMsg An error message from the compiled output.
 * @return The error message with directories truncated from the contract path.
 */
function getNormalizedErrMsg(errMsg) {
    var SOLIDITY_FILE_EXTENSION_REGEX = /(.*\.sol):/;
    var errPathMatch = errMsg.match(SOLIDITY_FILE_EXTENSION_REGEX);
    if (errPathMatch === null) {
        // This can occur if solidity outputs a general warning, e.g
        // Warning: This is a pre-release compiler version, please do not use it in production.
        return errMsg;
    }
    var errPath = errPathMatch[0];
    var baseContract = path.basename(errPath);
    var normalizedErrMsg = errMsg.replace(errPath, baseContract);
    return normalizedErrMsg;
}
exports.getNormalizedErrMsg = getNormalizedErrMsg;
/**
 * Parses the contract source code and extracts the dendencies
 * @param  source Contract source code
 * @return List of dependendencies
 */
function parseDependencies(contractSource) {
    // TODO: Use a proper parser
    var source = contractSource.source;
    var IMPORT_REGEX = /(import\s)/;
    var DEPENDENCY_PATH_REGEX = /"([^"]+)"/; // Source: https://github.com/BlockChainCompany/soljitsu/blob/master/lib/shared.js
    var dependencies = [];
    var lines = source.split('\n');
    _.forEach(lines, function (line) {
        if (line.match(IMPORT_REGEX) !== null) {
            var dependencyMatch = line.match(DEPENDENCY_PATH_REGEX);
            if (dependencyMatch !== null) {
                var dependencyPath = dependencyMatch[1];
                if (dependencyPath.startsWith('.')) {
                    dependencyPath = path.join(path.dirname(contractSource.path), dependencyPath);
                }
                dependencies.push(dependencyPath);
            }
        }
    });
    return dependencies;
}
exports.parseDependencies = parseDependencies;
var solcJSReleasesCache;
/**
 * Fetches the list of available solidity compilers
 * @param isOfflineMode Offline mode flag
 */
function getSolcJSReleasesAsync(isOfflineMode) {
    return __awaiter(this, void 0, void 0, function () {
        var versionList, versionListJSON;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (isOfflineMode) {
                        return [2 /*return*/, constants_1.constants.SOLC_BIN_PATHS];
                    }
                    if (!(solcJSReleasesCache === undefined)) return [3 /*break*/, 3];
                    return [4 /*yield*/, fetch('https://ethereum.github.io/solc-bin/bin/list.json')];
                case 1:
                    versionList = _a.sent();
                    return [4 /*yield*/, versionList.json()];
                case 2:
                    versionListJSON = _a.sent();
                    solcJSReleasesCache = versionListJSON.releases;
                    _a.label = 3;
                case 3: return [2 /*return*/, solcJSReleasesCache];
            }
        });
    });
}
exports.getSolcJSReleasesAsync = getSolcJSReleasesAsync;
/**
 * Compiles the contracts and prints errors/warnings
 * @param solcVersion Version of a solc compiler
 * @param standardInput Solidity standard JSON input
 * @param isOfflineMode Offline mode flag
 */
function compileSolcJSAsync(solcVersion, standardInput, isOfflineMode) {
    return __awaiter(this, void 0, void 0, function () {
        var solcInstance, standardInputStr, standardOutputStr, compiled;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getSolcJSAsync(solcVersion, isOfflineMode)];
                case 1:
                    solcInstance = _a.sent();
                    standardInputStr = JSON.stringify(standardInput);
                    standardOutputStr = solcInstance.compileStandardWrapper(standardInputStr);
                    compiled = JSON.parse(standardOutputStr);
                    return [2 /*return*/, compiled];
            }
        });
    });
}
exports.compileSolcJSAsync = compileSolcJSAsync;
/**
 * Compiles the contracts and prints errors/warnings
 * @param solcVersion Version of a solc compiler
 * @param standardInput Solidity standard JSON input
 */
function compileDockerAsync(solcVersion, standardInput) {
    return __awaiter(this, void 0, void 0, function () {
        var standardInputStr, dockerCommand, standardOutputStr, compiled;
        return __generator(this, function (_a) {
            standardInputStr = JSON.stringify(standardInput, null, 2);
            dockerCommand = "docker run -i -a stdin -a stdout -a stderr ethereum/solc:" + solcVersion + " solc --standard-json";
            standardOutputStr = child_process_1.execSync(dockerCommand, { input: standardInputStr }).toString();
            compiled = JSON.parse(standardOutputStr);
            return [2 /*return*/, compiled];
        });
    });
}
exports.compileDockerAsync = compileDockerAsync;
/**
 * Example "relative" paths:
 * /user/leo/0x-monorepo/contracts/extensions/contracts/extension.sol -> extension.sol
 * /user/leo/0x-monorepo/node_modules/@0x/contracts-protocol/contracts/exchange.sol -> @0x/contracts-protocol/contracts/exchange.sol
 */
function makeContractPathRelative(absolutePath, contractsDir, dependencyNameToPath) {
    var contractPath = absolutePath.replace(contractsDir + "/", '');
    _.map(dependencyNameToPath, function (packagePath, dependencyName) {
        contractPath = contractPath.replace(packagePath, dependencyName);
    });
    return contractPath;
}
/**
 * Makes the path relative removing all system-dependent data. Converts absolute paths to a format suitable for artifacts.
 * @param absolutePathToSmth Absolute path to contract or source
 * @param contractsDir Current package contracts directory location
 * @param dependencyNameToPath Mapping of dependency name to package path
 */
function makeContractPathsRelative(absolutePathToSmth, contractsDir, dependencyNameToPath) {
    return _.mapKeys(absolutePathToSmth, function (_val, absoluteContractPath) {
        return makeContractPathRelative(absoluteContractPath, contractsDir, dependencyNameToPath);
    });
}
exports.makeContractPathsRelative = makeContractPathsRelative;
/**
 * Separates errors from warnings, formats the messages and prints them. Throws if there is any compilation error (not warning).
 * @param solcErrors The errors field of standard JSON output that contains errors and warnings.
 */
function printCompilationErrorsAndWarnings(solcErrors) {
    var SOLIDITY_WARNING = 'warning';
    var errors = _.filter(solcErrors, function (entry) { return entry.severity !== SOLIDITY_WARNING; });
    var warnings = _.filter(solcErrors, function (entry) { return entry.severity === SOLIDITY_WARNING; });
    if (!_.isEmpty(errors)) {
        errors.forEach(function (error) {
            var normalizedErrMsg = getNormalizedErrMsg(error.formattedMessage || error.message);
            utils_1.logUtils.log(chalk_1.default.red('error'), normalizedErrMsg);
        });
        throw new types_1.CompilationError(errors.length);
    }
    else {
        warnings.forEach(function (warning) {
            var normalizedWarningMsg = getNormalizedErrMsg(warning.formattedMessage || warning.message);
            utils_1.logUtils.log(chalk_1.default.yellow('warning'), normalizedWarningMsg);
        });
    }
}
exports.printCompilationErrorsAndWarnings = printCompilationErrorsAndWarnings;
/**
 * Gets the source tree hash for a file and its dependencies.
 * @param fileName Name of contract file.
 */
function getSourceTreeHash(resolver, importPath) {
    var contractSource = resolver.resolve(importPath);
    var dependencies = parseDependencies(contractSource);
    var sourceHash = ethUtil.sha3(contractSource.source);
    if (dependencies.length === 0) {
        return sourceHash;
    }
    else {
        var dependencySourceTreeHashes = _.map(dependencies, function (dependency) {
            return getSourceTreeHash(resolver, dependency);
        });
        var sourceTreeHashesBuffer = Buffer.concat(__spread([sourceHash], dependencySourceTreeHashes));
        var sourceTreeHash = ethUtil.sha3(sourceTreeHashesBuffer);
        return sourceTreeHash;
    }
}
exports.getSourceTreeHash = getSourceTreeHash;
/**
 * For the given @param contractPath, populates JSON objects to be used in the ContractVersionData interface's
 * properties `sources` (source code file names mapped to ID numbers) and `sourceCodes` (source code content of
 * contracts) for that contract.  The source code pointed to by contractPath is read and parsed directly (via
 * `resolver.resolve().source`), as are its imports, recursively.  The ID numbers for @return `sources` are
 * taken from the corresponding ID's in @param fullSources, and the content for @return sourceCodes is read from
 * disk (via the aforementioned `resolver.source`).
 */
function getSourcesWithDependencies(resolver, contractPath, fullSources) {
    var _a, _b;
    var sources = (_a = {}, _a[contractPath] = fullSources[contractPath], _a);
    var sourceCodes = (_b = {}, _b[contractPath] = resolver.resolve(contractPath).source, _b);
    recursivelyGatherDependencySources(resolver, contractPath, sourceCodes[contractPath], fullSources, sources, sourceCodes);
    return { sourceCodes: sourceCodes, sources: sources };
}
exports.getSourcesWithDependencies = getSourcesWithDependencies;
function recursivelyGatherDependencySources(resolver, contractPath, contractSource, fullSources, sourcesToAppendTo, sourceCodesToAppendTo) {
    var e_1, _a;
    var importStatementMatches = contractSource.match(/\nimport[^;]*;/g);
    if (importStatementMatches === null) {
        return;
    }
    try {
        for (var importStatementMatches_1 = __values(importStatementMatches), importStatementMatches_1_1 = importStatementMatches_1.next(); !importStatementMatches_1_1.done; importStatementMatches_1_1 = importStatementMatches_1.next()) {
            var importStatementMatch = importStatementMatches_1_1.value;
            var importPathMatches = importStatementMatch.match(/\"([^\"]*)\"/);
            if (importPathMatches === null || importPathMatches.length === 0) {
                continue;
            }
            var importPath = importPathMatches[1];
            // HACK(albrow): We have, e.g.:
            //
            //      importPath   = "../../utils/LibBytes/LibBytes.sol"
            //      contractPath = "2.0.0/protocol/AssetProxyOwner/AssetProxyOwner.sol"
            //
            // Resolver doesn't understand "../" so we want to pass
            // "2.0.0/utils/LibBytes/LibBytes.sol" to resolver.
            //
            // This hack involves using path.resolve. But path.resolve returns
            // absolute directories by default. We trick it into thinking that
            // contractPath is a root directory by prepending a '/' and then
            // removing the '/' the end.
            //
            //      path.resolve("/a/b/c", ""../../d/e") === "/a/d/e"
            //
            var lastPathSeparatorPos = contractPath.lastIndexOf('/');
            var contractFolder = lastPathSeparatorPos === -1 ? '' : contractPath.slice(0, lastPathSeparatorPos + 1);
            if (importPath.startsWith('.')) {
                /**
                 * Some imports path are relative ("../Token.sol", "./Wallet.sol")
                 * while others are absolute ("Token.sol", "@0x/contracts/Wallet.sol")
                 * And we need to append the base path for relative imports.
                 */
                importPath = path.resolve("/" + contractFolder, importPath).replace('/', '');
            }
            if (sourcesToAppendTo[importPath] === undefined) {
                sourcesToAppendTo[importPath] = { id: fullSources[importPath].id };
                sourceCodesToAppendTo[importPath] = resolver.resolve(importPath).source;
                recursivelyGatherDependencySources(resolver, importPath, resolver.resolve(importPath).source, fullSources, sourcesToAppendTo, sourceCodesToAppendTo);
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (importStatementMatches_1_1 && !importStatementMatches_1_1.done && (_a = importStatementMatches_1.return)) _a.call(importStatementMatches_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
}
/**
 * Gets the solidity compiler instance. If the compiler is already cached - gets it from FS,
 * otherwise - fetches it and caches it.
 * @param solcVersion The compiler version. e.g. 0.5.0
 * @param isOfflineMode Offline mode flag
 */
function getSolcJSAsync(solcVersion, isOfflineMode) {
    return __awaiter(this, void 0, void 0, function () {
        var solcJSReleases, fullSolcVersion, compilerBinFilename, solcjs, url, response, SUCCESS_STATUS, solcInstance;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getSolcJSReleasesAsync(isOfflineMode)];
                case 1:
                    solcJSReleases = _a.sent();
                    fullSolcVersion = solcJSReleases[solcVersion];
                    if (fullSolcVersion === undefined) {
                        throw new Error(solcVersion + " is not a known compiler version");
                    }
                    compilerBinFilename = path.join(constants_1.constants.SOLC_BIN_DIR, fullSolcVersion);
                    return [4 /*yield*/, fs_wrapper_1.fsWrapper.doesFileExistAsync(compilerBinFilename)];
                case 2:
                    if (!_a.sent()) return [3 /*break*/, 4];
                    return [4 /*yield*/, fs_wrapper_1.fsWrapper.readFileAsync(compilerBinFilename)];
                case 3:
                    solcjs = (_a.sent()).toString();
                    return [3 /*break*/, 8];
                case 4:
                    utils_1.logUtils.warn("Downloading " + fullSolcVersion + "...");
                    url = "" + constants_1.constants.BASE_COMPILER_URL + fullSolcVersion;
                    return [4 /*yield*/, utils_1.fetchAsync(url)];
                case 5:
                    response = _a.sent();
                    SUCCESS_STATUS = 200;
                    if (response.status !== SUCCESS_STATUS) {
                        throw new Error("Failed to load " + fullSolcVersion);
                    }
                    return [4 /*yield*/, response.text()];
                case 6:
                    solcjs = _a.sent();
                    return [4 /*yield*/, fs_wrapper_1.fsWrapper.writeFileAsync(compilerBinFilename, solcjs)];
                case 7:
                    _a.sent();
                    _a.label = 8;
                case 8:
                    if (solcjs.length === 0) {
                        throw new Error('No compiler available');
                    }
                    solcInstance = solc.setupMethods(requireFromString(solcjs, compilerBinFilename));
                    return [2 /*return*/, solcInstance];
            }
        });
    });
}
exports.getSolcJSAsync = getSolcJSAsync;
/**
 * Solidity compiler emits the bytecode without a 0x prefix for a hex. This function fixes it if bytecode is present.
 * @param compiledContract The standard JSON output section for a contract. Geth modified in place.
 */
function addHexPrefixToContractBytecode(compiledContract) {
    if (compiledContract.evm !== undefined) {
        if (compiledContract.evm.bytecode !== undefined && compiledContract.evm.bytecode.object !== undefined) {
            compiledContract.evm.bytecode.object = ethUtil.addHexPrefix(compiledContract.evm.bytecode.object);
        }
        if (compiledContract.evm.deployedBytecode !== undefined &&
            compiledContract.evm.deployedBytecode.object !== undefined) {
            compiledContract.evm.deployedBytecode.object = ethUtil.addHexPrefix(compiledContract.evm.deployedBytecode.object);
        }
    }
}
exports.addHexPrefixToContractBytecode = addHexPrefixToContractBytecode;
/**
 * Takes the list of resolved contract sources from `SpyResolver` and produces a mapping from dependency name
 * to package path used in `remappings` later, as well as in generating the "relative" source paths saved to the artifact files.
 * @param contractSources The list of resolved contract sources
 */
function getDependencyNameToPackagePath(contractSources) {
    var allTouchedFiles = contractSources.map(function (contractSource) { return "" + contractSource.absolutePath; });
    var NODE_MODULES = 'node_modules';
    var allTouchedDependencies = _.filter(allTouchedFiles, function (filePath) { return filePath.includes(NODE_MODULES); });
    var dependencyNameToPath = {};
    _.map(allTouchedDependencies, function (dependencyFilePath) {
        var _a, _b;
        var lastNodeModulesStart = dependencyFilePath.lastIndexOf(NODE_MODULES);
        var lastNodeModulesEnd = lastNodeModulesStart + NODE_MODULES.length;
        var importPath = dependencyFilePath.substr(lastNodeModulesEnd + 1);
        var packageName;
        var packageScopeIfExists;
        var dependencyName;
        if (_.startsWith(importPath, '@')) {
            _a = __read(importPath.split('/'), 2), packageScopeIfExists = _a[0], packageName = _a[1];
            dependencyName = packageScopeIfExists + "/" + packageName;
        }
        else {
            _b = __read(importPath.split('/'), 1), packageName = _b[0];
            dependencyName = "" + packageName;
        }
        var dependencyPackagePath = path.join(dependencyFilePath.substr(0, lastNodeModulesEnd), dependencyName);
        dependencyNameToPath[dependencyName] = dependencyPackagePath;
    });
    return dependencyNameToPath;
}
exports.getDependencyNameToPackagePath = getDependencyNameToPackagePath;
//# sourceMappingURL=compiler.js.map