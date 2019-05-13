"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
Object.defineProperty(exports, "__esModule", { value: true });
var sol_compiler_1 = require("@0x/sol-compiler");
var fs = require("fs");
var glob = require("glob");
var path = require("path");
var abstract_artifact_adapter_1 = require("./abstract_artifact_adapter");
var sol_compiler_artifact_adapter_1 = require("./sol_compiler_artifact_adapter");
var DEFAULT_TRUFFLE_ARTIFACTS_DIR = './build/contracts';
var TruffleArtifactAdapter = /** @class */ (function (_super) {
    __extends(TruffleArtifactAdapter, _super);
    /**
     * Instantiates a TruffleArtifactAdapter
     * @param projectRoot Path to the truffle project's root directory
     * @param solcVersion Solidity version with which to compile all the contracts
     */
    function TruffleArtifactAdapter(projectRoot, solcVersion) {
        var _this = _super.call(this) || this;
        _this._solcVersion = solcVersion;
        _this._projectRoot = projectRoot;
        return _this;
    }
    TruffleArtifactAdapter.prototype.collectContractsDataAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, artifactsDir, contractsDir, truffleConfig, solcConfig, truffleArtifactsDirectory, compilerOptions, compiler, solCompilerArtifactAdapter, contractsDataFrom0xArtifacts;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        artifactsDir = '.0x-artifacts';
                        contractsDir = path.join(this._projectRoot, 'contracts');
                        truffleConfig = this._getTruffleConfig();
                        solcConfig = this._getTruffleSolcSettings();
                        truffleArtifactsDirectory = truffleConfig.contracts_build_directory || DEFAULT_TRUFFLE_ARTIFACTS_DIR;
                        this._assertSolidityVersionIsCorrect(truffleArtifactsDirectory);
                        compilerOptions = {
                            contractsDir: contractsDir,
                            artifactsDir: artifactsDir,
                            compilerSettings: __assign({}, solcConfig, { outputSelection: (_a = {},
                                    _a['*'] = (_b = {},
                                        _b['*'] = ['abi', 'evm.bytecode.object', 'evm.deployedBytecode.object'],
                                        _b),
                                    _a) }),
                            contracts: '*',
                            solcVersion: this._solcVersion,
                        };
                        compiler = new sol_compiler_1.Compiler(compilerOptions);
                        return [4 /*yield*/, compiler.compileAsync()];
                    case 1:
                        _c.sent();
                        solCompilerArtifactAdapter = new sol_compiler_artifact_adapter_1.SolCompilerArtifactAdapter(artifactsDir, contractsDir);
                        return [4 /*yield*/, solCompilerArtifactAdapter.collectContractsDataAsync()];
                    case 2:
                        contractsDataFrom0xArtifacts = _c.sent();
                        return [2 /*return*/, contractsDataFrom0xArtifacts];
                }
            });
        });
    };
    TruffleArtifactAdapter.prototype._getTruffleConfig = function () {
        var truffleConfigFileShort = path.resolve(path.join(this._projectRoot, 'truffle.js'));
        var truffleConfigFileLong = path.resolve(path.join(this._projectRoot, 'truffle-config.js'));
        if (fs.existsSync(truffleConfigFileShort)) {
            var truffleConfig = require(truffleConfigFileShort);
            return truffleConfig;
        }
        else if (fs.existsSync(truffleConfigFileLong)) {
            var truffleConfig = require(truffleConfigFileLong);
            return truffleConfig;
        }
        else {
            throw new Error("Neither " + truffleConfigFileShort + " nor " + truffleConfigFileLong + " exists. Make sure the project root is correct");
        }
    };
    TruffleArtifactAdapter.prototype._getTruffleSolcSettings = function () {
        var truffleConfig = this._getTruffleConfig();
        if (truffleConfig.solc !== undefined) {
            // Truffle < 5.0
            return truffleConfig.solc;
        }
        else if (truffleConfig.compilers.solc !== undefined) {
            // Truffle >= 5.0
            return truffleConfig.compilers.solc.settings;
        }
        else {
            return {};
        }
    };
    TruffleArtifactAdapter.prototype._assertSolidityVersionIsCorrect = function (truffleArtifactsDirectory) {
        var e_1, _a;
        var artifactsGlob = truffleArtifactsDirectory + "/**/*.json";
        var artifactFileNames = glob.sync(artifactsGlob, { absolute: true });
        try {
            for (var artifactFileNames_1 = __values(artifactFileNames), artifactFileNames_1_1 = artifactFileNames_1.next(); !artifactFileNames_1_1.done; artifactFileNames_1_1 = artifactFileNames_1.next()) {
                var artifactFileName = artifactFileNames_1_1.value;
                var artifact = JSON.parse(fs.readFileSync(artifactFileName).toString());
                var compilerVersion = artifact.compiler.version;
                if (!compilerVersion.startsWith(this._solcVersion)) {
                    throw new Error(artifact.contractName + " was compiled with solidity " + compilerVersion + " but specified version is " + this._solcVersion + " making it impossible to process traces");
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (artifactFileNames_1_1 && !artifactFileNames_1_1.done && (_a = artifactFileNames_1.return)) _a.call(artifactFileNames_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    return TruffleArtifactAdapter;
}(abstract_artifact_adapter_1.AbstractArtifactAdapter));
exports.TruffleArtifactAdapter = TruffleArtifactAdapter;
//# sourceMappingURL=truffle_artifact_adapter.js.map