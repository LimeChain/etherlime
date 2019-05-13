"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
Object.defineProperty(exports, "__esModule", { value: true });
var _a, _b;
var assert_1 = require("@0x/assert");
var sol_resolver_1 = require("@0x/sol-resolver");
var utils_1 = require("@0x/utils");
var child_process_1 = require("child_process");
var chokidar = require("chokidar");
var fs = require("fs");
var _ = require("lodash");
var path = require("path");
var pluralize = require("pluralize");
var semver = require("semver");
var compiler_options_schema_1 = require("./schemas/compiler_options_schema");
var compiler_1 = require("./utils/compiler");
var constants_1 = require("./utils/constants");
var fs_wrapper_1 = require("./utils/fs_wrapper");
var utils_2 = require("./utils/utils");
var ALL_CONTRACTS_IDENTIFIER = '*';
var ALL_FILES_IDENTIFIER = '*';
var DEFAULT_CONTRACTS_DIR = path.resolve('contracts');
var DEFAULT_ARTIFACTS_DIR = path.resolve('artifacts');
var DEFAULT_USE_DOCKERISED_SOLC = false;
var DEFAULT_IS_OFFLINE_MODE = false;
// Solc compiler settings cannot be configured from the commandline.
// If you need this configured, please create a `compiler.json` config file
// with your desired configurations.
var DEFAULT_COMPILER_SETTINGS = {
    optimizer: {
        enabled: false,
    },
    outputSelection: (_a = {},
        _a[ALL_FILES_IDENTIFIER] = (_b = {},
            _b[ALL_CONTRACTS_IDENTIFIER] = ['abi', 'evm.bytecode.object'],
            _b),
        _a),
};
var CONFIG_FILE = 'compiler.json';
/**
 * The Compiler facilitates compiling Solidity smart contracts and saves the results
 * to artifact files.
 */
var Compiler = /** @class */ (function () {
    /**
     * Instantiates a new instance of the Compiler class.
     * @param opts Optional compiler options
     * @return An instance of the Compiler class.
     */
    function Compiler(opts) {
        var passedOpts = opts || {};
        assert_1.assert.doesConformToSchema('opts', passedOpts, compiler_options_schema_1.compilerOptionsSchema);
        // TODO: Look for config file in parent directories if not found in current directory
        var config = fs.existsSync(CONFIG_FILE)
            ? JSON.parse(fs.readFileSync(CONFIG_FILE).toString())
            : {};
        assert_1.assert.doesConformToSchema('compiler.json', config, compiler_options_schema_1.compilerOptionsSchema);
        this._contractsDir = path.resolve(passedOpts.contractsDir || config.contractsDir || DEFAULT_CONTRACTS_DIR);
        this._solcVersionIfExists = passedOpts.solcVersion || config.solcVersion;
        this._compilerSettings = __assign({}, DEFAULT_COMPILER_SETTINGS, config.compilerSettings, passedOpts.compilerSettings);
        this._artifactsDir = passedOpts.artifactsDir || config.artifactsDir || DEFAULT_ARTIFACTS_DIR;
        this._specifiedContracts = passedOpts.contracts || config.contracts || ALL_CONTRACTS_IDENTIFIER;
        this._useDockerisedSolc =
            passedOpts.useDockerisedSolc || config.useDockerisedSolc || DEFAULT_USE_DOCKERISED_SOLC;
        this._isOfflineMode = passedOpts.isOfflineMode || config.isOfflineMode || DEFAULT_IS_OFFLINE_MODE;
        this._nameResolver = new sol_resolver_1.NameResolver(this._contractsDir);
        var resolver = new sol_resolver_1.FallthroughResolver();
        resolver.appendResolver(new sol_resolver_1.URLResolver());
        resolver.appendResolver(new sol_resolver_1.NPMResolver(this._contractsDir));
        resolver.appendResolver(new sol_resolver_1.RelativeFSResolver(this._contractsDir));
        resolver.appendResolver(new sol_resolver_1.FSResolver());
        resolver.appendResolver(this._nameResolver);
        this._resolver = resolver;
    }
    /**
     * Compiles selected Solidity files found in `contractsDir` and writes JSON artifacts to `artifactsDir`.
     */
    Compiler.prototype.compileAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, compiler_1.createDirIfDoesNotExistAsync(this._artifactsDir)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, compiler_1.createDirIfDoesNotExistAsync(constants_1.constants.SOLC_BIN_DIR)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this._compileContractsAsync(this._getContractNamesToCompile(), true)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Compiles Solidity files specified during instantiation, and returns the
     * compiler output given by solc.  Return value is an array of outputs:
     * Solidity modules are batched together by version required, and each
     * element of the returned array corresponds to a compiler version, and
     * each element contains the output for all of the modules compiled with
     * that version.
     */
    Compiler.prototype.getCompilerOutputsAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var promisedOutputs;
            return __generator(this, function (_a) {
                promisedOutputs = this._compileContractsAsync(this._getContractNamesToCompile(), false);
                return [2 /*return*/, promisedOutputs];
            });
        });
    };
    Compiler.prototype.watchAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var MATCH_NOTHING_REGEX, IGNORE_DOT_FILES_REGEX, watcher, onFileChangedAsync;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.clear(); // tslint:disable-line:no-console
                        utils_1.logUtils.logWithTime('Starting compilation in watch mode...');
                        MATCH_NOTHING_REGEX = '^$';
                        IGNORE_DOT_FILES_REGEX = /(^|[\/\\])\../;
                        watcher = chokidar.watch(MATCH_NOTHING_REGEX, { ignored: IGNORE_DOT_FILES_REGEX });
                        onFileChangedAsync = function () { return __awaiter(_this, void 0, void 0, function () {
                            var err_1, pathsToWatch;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        watcher.unwatch('*'); // Stop watching
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 3, , 4]);
                                        return [4 /*yield*/, this.compileAsync()];
                                    case 2:
                                        _a.sent();
                                        utils_1.logUtils.logWithTime('Found 0 errors. Watching for file changes.');
                                        return [3 /*break*/, 4];
                                    case 3:
                                        err_1 = _a.sent();
                                        if (err_1.typeName === 'CompilationError') {
                                            utils_1.logUtils.logWithTime("Found " + err_1.errorsCount + " " + pluralize('error', err_1.errorsCount) + ". Watching for file changes.");
                                        }
                                        else {
                                            utils_1.logUtils.logWithTime('Found errors. Watching for file changes.');
                                        }
                                        return [3 /*break*/, 4];
                                    case 4:
                                        pathsToWatch = this._getPathsToWatch();
                                        watcher.add(pathsToWatch);
                                        return [2 /*return*/];
                                }
                            });
                        }); };
                        return [4 /*yield*/, onFileChangedAsync()];
                    case 1:
                        _a.sent();
                        watcher.on('change', function (changedFilePath) {
                            console.clear(); // tslint:disable-line:no-console
                            utils_1.logUtils.logWithTime('File change detected. Starting incremental compilation...');
                            // NOTE: We can't await it here because that's a callback.
                            // Instead we stop watching inside of it and start it again when we're finished.
                            onFileChangedAsync(); // tslint:disable-line no-floating-promises
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Compiler.prototype._getPathsToWatch = function () {
        var e_1, _a;
        var contractNames = this._getContractNamesToCompile();
        var spyResolver = new sol_resolver_1.SpyResolver(this._resolver);
        try {
            for (var contractNames_1 = __values(contractNames), contractNames_1_1 = contractNames_1.next(); !contractNames_1_1.done; contractNames_1_1 = contractNames_1.next()) {
                var contractName = contractNames_1_1.value;
                var contractSource = spyResolver.resolve(contractName);
                // NOTE: We ignore the return value here. We don't want to compute the source tree hash.
                // We just want to call a SpyResolver on each contracts and it's dependencies and
                // this is a convenient way to reuse the existing code that does that.
                // We can then get all the relevant paths from the `spyResolver` below.
                compiler_1.getSourceTreeHash(spyResolver, contractSource.path);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (contractNames_1_1 && !contractNames_1_1.done && (_a = contractNames_1.return)) _a.call(contractNames_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var pathsToWatch = _.uniq(spyResolver.resolvedContractSources.map(function (cs) { return cs.absolutePath; }));
        return pathsToWatch;
    };
    Compiler.prototype._getContractNamesToCompile = function () {
        var contractNamesToCompile;
        if (this._specifiedContracts === ALL_CONTRACTS_IDENTIFIER) {
            var allContracts = this._nameResolver.getAll();
            contractNamesToCompile = _.map(allContracts, function (contractSource) {
                return path.basename(contractSource.path, constants_1.constants.SOLIDITY_FILE_EXTENSION);
            });
        }
        else {
            return this._specifiedContracts;
        }
        return contractNamesToCompile;
    };
    /**
     * Compiles contracts, and, if `shouldPersist` is true, saves artifacts to artifactsDir.
     * @param fileName Name of contract with '.sol' extension.
     * @return an array of compiler outputs, where each element corresponds to a different version of solc-js.
     */
    Compiler.prototype._compileContractsAsync = function (contractNames, shouldPersist) {
        return __awaiter(this, void 0, void 0, function () {
            var e_2, _a, e_3, _b, e_4, _c, e_5, _d, versionToInputs, contractPathToData, solcJSReleases, resolvedContractSources, contractNames_2, contractNames_2_1, contractName, spyResolver, contractSource, sourceTreeHashHex, contractData, _e, solcVersion, isFirstContractWithThisVersion, _f, _g, resolvedContractSource, e_2_1, dependencyNameToPath, compilerOutputs, _h, _j, solcVersion, input, compilerOutput, fullSolcVersion, dockerCommand, versionCommandOutput, versionCommandOutputParts, _k, _l, contractPath, contractName, compiledContract, e_5_1, e_4_1;
            return __generator(this, function (_m) {
                switch (_m.label) {
                    case 0:
                        versionToInputs = {};
                        contractPathToData = {};
                        return [4 /*yield*/, compiler_1.getSolcJSReleasesAsync(this._isOfflineMode)];
                    case 1:
                        solcJSReleases = _m.sent();
                        resolvedContractSources = [];
                        _m.label = 2;
                    case 2:
                        _m.trys.push([2, 7, 8, 9]);
                        contractNames_2 = __values(contractNames), contractNames_2_1 = contractNames_2.next();
                        _m.label = 3;
                    case 3:
                        if (!!contractNames_2_1.done) return [3 /*break*/, 6];
                        contractName = contractNames_2_1.value;
                        spyResolver = new sol_resolver_1.SpyResolver(this._resolver);
                        contractSource = spyResolver.resolve(contractName);
                        sourceTreeHashHex = compiler_1.getSourceTreeHash(spyResolver, contractSource.path).toString('hex');
                        _e = {
                            contractName: path.basename(contractName, constants_1.constants.SOLIDITY_FILE_EXTENSION)
                        };
                        return [4 /*yield*/, compiler_1.getContractArtifactIfExistsAsync(this._artifactsDir, contractName)];
                    case 4:
                        contractData = (_e.currentArtifactIfExists = _m.sent(),
                            _e.sourceTreeHashHex = "0x" + sourceTreeHashHex,
                            _e);
                        if (!this._shouldCompile(contractData)) {
                            return [3 /*break*/, 5];
                        }
                        contractPathToData[contractSource.path] = contractData;
                        solcVersion = this._solcVersionIfExists === undefined
                            ? semver.maxSatisfying(_.keys(solcJSReleases), compiler_1.parseSolidityVersionRange(contractSource.source))
                            : this._solcVersionIfExists;
                        if (solcVersion === null) {
                            throw new Error("Couldn't find any solidity version satisfying the constraint " + compiler_1.parseSolidityVersionRange(contractSource.source));
                        }
                        isFirstContractWithThisVersion = versionToInputs[solcVersion] === undefined;
                        if (isFirstContractWithThisVersion) {
                            versionToInputs[solcVersion] = {
                                standardInput: {
                                    language: 'Solidity',
                                    sources: {},
                                    settings: this._compilerSettings,
                                },
                                contractsToCompile: [],
                            };
                        }
                        try {
                            // add input to the right version batch
                            for (_f = __values(spyResolver.resolvedContractSources), _g = _f.next(); !_g.done; _g = _f.next()) {
                                resolvedContractSource = _g.value;
                                versionToInputs[solcVersion].standardInput.sources[resolvedContractSource.absolutePath] = {
                                    content: resolvedContractSource.source,
                                };
                            }
                        }
                        catch (e_3_1) { e_3 = { error: e_3_1 }; }
                        finally {
                            try {
                                if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                            }
                            finally { if (e_3) throw e_3.error; }
                        }
                        resolvedContractSources.push.apply(resolvedContractSources, __spread(spyResolver.resolvedContractSources));
                        versionToInputs[solcVersion].contractsToCompile.push(contractSource.path);
                        _m.label = 5;
                    case 5:
                        contractNames_2_1 = contractNames_2.next();
                        return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_2_1 = _m.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (contractNames_2_1 && !contractNames_2_1.done && (_a = contractNames_2.return)) _a.call(contractNames_2);
                        }
                        finally { if (e_2) throw e_2.error; }
                        return [7 /*endfinally*/];
                    case 9:
                        dependencyNameToPath = compiler_1.getDependencyNameToPackagePath(resolvedContractSources);
                        compilerOutputs = [];
                        _m.label = 10;
                    case 10:
                        _m.trys.push([10, 26, 27, 28]);
                        _h = __values(_.keys(versionToInputs)), _j = _h.next();
                        _m.label = 11;
                    case 11:
                        if (!!_j.done) return [3 /*break*/, 25];
                        solcVersion = _j.value;
                        input = versionToInputs[solcVersion];
                        utils_1.logUtils.warn("Compiling " + input.contractsToCompile.length + " contracts (" + input.contractsToCompile + ") with Solidity v" + solcVersion + "...");
                        compilerOutput = void 0;
                        fullSolcVersion = void 0;
                        input.standardInput.settings.remappings = _.map(dependencyNameToPath, function (dependencyPackagePath, dependencyName) { return dependencyName + "=" + dependencyPackagePath; });
                        if (!this._useDockerisedSolc) return [3 /*break*/, 13];
                        dockerCommand = "docker run ethereum/solc:" + solcVersion + " --version";
                        versionCommandOutput = child_process_1.execSync(dockerCommand).toString();
                        versionCommandOutputParts = versionCommandOutput.split(' ');
                        fullSolcVersion = versionCommandOutputParts[versionCommandOutputParts.length - 1].trim();
                        return [4 /*yield*/, compiler_1.compileDockerAsync(solcVersion, input.standardInput)];
                    case 12:
                        compilerOutput = _m.sent();
                        return [3 /*break*/, 15];
                    case 13:
                        fullSolcVersion = solcJSReleases[solcVersion];
                        return [4 /*yield*/, compiler_1.compileSolcJSAsync(solcVersion, input.standardInput, this._isOfflineMode)];
                    case 14:
                        compilerOutput = _m.sent();
                        _m.label = 15;
                    case 15:
                        if (compilerOutput.errors !== undefined) {
                            compiler_1.printCompilationErrorsAndWarnings(compilerOutput.errors);
                        }
                        compilerOutput.sources = compiler_1.makeContractPathsRelative(compilerOutput.sources, this._contractsDir, dependencyNameToPath);
                        compilerOutput.contracts = compiler_1.makeContractPathsRelative(compilerOutput.contracts, this._contractsDir, dependencyNameToPath);
                        _m.label = 16;
                    case 16:
                        _m.trys.push([16, 21, 22, 23]);
                        _k = __values(input.contractsToCompile), _l = _k.next();
                        _m.label = 17;
                    case 17:
                        if (!!_l.done) return [3 /*break*/, 20];
                        contractPath = _l.value;
                        contractName = contractPathToData[contractPath].contractName;
                        compiledContract = compilerOutput.contracts[contractPath][contractName];
                        if (compiledContract === undefined) {
                            throw new Error("Contract " + contractName + " not found in " + contractPath + ". Please make sure your contract has the same name as it's file name");
                        }
                        compiler_1.addHexPrefixToContractBytecode(compiledContract);
                        if (!shouldPersist) return [3 /*break*/, 19];
                        return [4 /*yield*/, this._persistCompiledContractAsync(contractPath, contractPathToData[contractPath].currentArtifactIfExists, contractPathToData[contractPath].sourceTreeHashHex, contractName, fullSolcVersion, compilerOutput)];
                    case 18:
                        _m.sent();
                        _m.label = 19;
                    case 19:
                        _l = _k.next();
                        return [3 /*break*/, 17];
                    case 20: return [3 /*break*/, 23];
                    case 21:
                        e_5_1 = _m.sent();
                        e_5 = { error: e_5_1 };
                        return [3 /*break*/, 23];
                    case 22:
                        try {
                            if (_l && !_l.done && (_d = _k.return)) _d.call(_k);
                        }
                        finally { if (e_5) throw e_5.error; }
                        return [7 /*endfinally*/];
                    case 23:
                        compilerOutputs.push(compilerOutput);
                        _m.label = 24;
                    case 24:
                        _j = _h.next();
                        return [3 /*break*/, 11];
                    case 25: return [3 /*break*/, 28];
                    case 26:
                        e_4_1 = _m.sent();
                        e_4 = { error: e_4_1 };
                        return [3 /*break*/, 28];
                    case 27:
                        try {
                            if (_j && !_j.done && (_c = _h.return)) _c.call(_h);
                        }
                        finally { if (e_4) throw e_4.error; }
                        return [7 /*endfinally*/];
                    case 28: return [2 /*return*/, compilerOutputs];
                }
            });
        });
    };
    Compiler.prototype._shouldCompile = function (contractData) {
        if (contractData.currentArtifactIfExists === undefined) {
            return true;
        }
        else {
            var currentArtifact = contractData.currentArtifactIfExists;
            var isUserOnLatestVersion = currentArtifact.schemaVersion === constants_1.constants.LATEST_ARTIFACT_VERSION;
            var didCompilerSettingsChange = !_.isEqual(_.omit(currentArtifact.compiler.settings, 'remappings'), _.omit(this._compilerSettings, 'remappings'));
            var didSourceChange = currentArtifact.sourceTreeHashHex !== contractData.sourceTreeHashHex;
            return !isUserOnLatestVersion || didCompilerSettingsChange || didSourceChange;
        }
    };
    Compiler.prototype._persistCompiledContractAsync = function (contractPath, currentArtifactIfExists, sourceTreeHashHex, contractName, fullSolcVersion, compilerOutput) {
        return __awaiter(this, void 0, void 0, function () {
            var compiledContract, _a, sourceCodes, sources, contractVersion, newArtifact, currentArtifact, artifactString, currentArtifactPath;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        compiledContract = compilerOutput.contracts[contractPath][contractName];
                        _a = compiler_1.getSourcesWithDependencies(this._resolver, contractPath, compilerOutput.sources), sourceCodes = _a.sourceCodes, sources = _a.sources;
                        contractVersion = {
                            compilerOutput: compiledContract,
                            sources: sources,
                            sourceCodes: sourceCodes,
                            sourceTreeHashHex: sourceTreeHashHex,
                            compiler: {
                                name: 'solc',
                                version: fullSolcVersion,
                                settings: this._compilerSettings,
                            },
                        };
                        if (currentArtifactIfExists !== undefined) {
                            currentArtifact = currentArtifactIfExists;
                            newArtifact = __assign({}, currentArtifact, contractVersion);
                        }
                        else {
                            newArtifact = __assign({ schemaVersion: constants_1.constants.LATEST_ARTIFACT_VERSION, contractName: contractName }, contractVersion, { networks: {} });
                        }
                        artifactString = utils_2.utils.stringifyWithFormatting(newArtifact);
                        currentArtifactPath = this._artifactsDir + "/" + contractName + ".json";
                        return [4 /*yield*/, fs_wrapper_1.fsWrapper.writeFileAsync(currentArtifactPath, artifactString)];
                    case 1:
                        _b.sent();
                        utils_1.logUtils.warn(contractName + " artifact saved!");
                        return [2 /*return*/];
                }
            });
        });
    };
    return Compiler;
}());
exports.Compiler = Compiler;
//# sourceMappingURL=compiler.js.map