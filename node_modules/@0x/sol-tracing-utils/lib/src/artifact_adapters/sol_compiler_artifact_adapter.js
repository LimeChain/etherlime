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
var sol_resolver_1 = require("@0x/sol-resolver");
var utils_1 = require("@0x/utils");
var fs = require("fs");
var glob = require("glob");
var _ = require("lodash");
var path = require("path");
var abstract_artifact_adapter_1 = require("./abstract_artifact_adapter");
var CONFIG_FILE = 'compiler.json';
var SolCompilerArtifactAdapter = /** @class */ (function (_super) {
    __extends(SolCompilerArtifactAdapter, _super);
    /**
     * Instantiates a SolCompilerArtifactAdapter
     * @param artifactsPath Path to your artifacts directory
     * @param sourcesPath Path to your contract sources directory
     */
    function SolCompilerArtifactAdapter(artifactsPath, sourcesPath) {
        var _this = _super.call(this) || this;
        var config = fs.existsSync(CONFIG_FILE)
            ? JSON.parse(fs.readFileSync(CONFIG_FILE).toString())
            : {};
        if (artifactsPath === undefined && config.artifactsDir === undefined) {
            throw new Error("artifactsDir not found in " + CONFIG_FILE);
        }
        _this._artifactsPath = (artifactsPath || config.artifactsDir);
        if (sourcesPath === undefined && config.contractsDir === undefined) {
            throw new Error("contractsDir not found in " + CONFIG_FILE);
        }
        _this._sourcesPath = (sourcesPath || config.contractsDir);
        _this._resolver = new sol_resolver_1.FallthroughResolver();
        _this._resolver.appendResolver(new sol_resolver_1.URLResolver());
        var packagePath = path.resolve('');
        _this._resolver.appendResolver(new sol_resolver_1.NPMResolver(packagePath));
        _this._resolver.appendResolver(new sol_resolver_1.RelativeFSResolver(_this._sourcesPath));
        _this._resolver.appendResolver(new sol_resolver_1.FSResolver());
        return _this;
    }
    SolCompilerArtifactAdapter.prototype.collectContractsDataAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1, _a, artifactsGlob, artifactFileNames, contractsData, _loop_1, artifactFileNames_1, artifactFileNames_1_1, artifactFileName;
            var _this = this;
            return __generator(this, function (_b) {
                artifactsGlob = this._artifactsPath + "/**/*.json";
                artifactFileNames = glob.sync(artifactsGlob, { absolute: true });
                contractsData = [];
                _loop_1 = function (artifactFileName) {
                    var artifact = JSON.parse(fs.readFileSync(artifactFileName).toString());
                    if (artifact.compilerOutput.evm === undefined) {
                        utils_1.logUtils.warn(artifactFileName + " doesn't contain bytecode. Skipping...");
                        return "continue";
                    }
                    var sources = {};
                    var sourceCodes = {};
                    _.map(artifact.sources, function (value, relativeFilePath) {
                        var source = _this._resolver.resolve(relativeFilePath);
                        sources[value.id] = source.absolutePath;
                        sourceCodes[value.id] = source.source;
                    });
                    var contractData = {
                        name: artifact.contractName,
                        sourceCodes: sourceCodes,
                        sources: sources,
                        bytecode: artifact.compilerOutput.evm.bytecode.object,
                        sourceMap: artifact.compilerOutput.evm.bytecode.sourceMap,
                        runtimeBytecode: artifact.compilerOutput.evm.deployedBytecode.object,
                        sourceMapRuntime: artifact.compilerOutput.evm.deployedBytecode.sourceMap,
                    };
                    var isInterfaceContract = contractData.bytecode === '0x' && contractData.runtimeBytecode === '0x';
                    if (isInterfaceContract) {
                        return "continue";
                    }
                    contractsData.push(contractData);
                };
                try {
                    for (artifactFileNames_1 = __values(artifactFileNames), artifactFileNames_1_1 = artifactFileNames_1.next(); !artifactFileNames_1_1.done; artifactFileNames_1_1 = artifactFileNames_1.next()) {
                        artifactFileName = artifactFileNames_1_1.value;
                        _loop_1(artifactFileName);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (artifactFileNames_1_1 && !artifactFileNames_1_1.done && (_a = artifactFileNames_1.return)) _a.call(artifactFileNames_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                return [2 /*return*/, contractsData];
            });
        });
    };
    return SolCompilerArtifactAdapter;
}(abstract_artifact_adapter_1.AbstractArtifactAdapter));
exports.SolCompilerArtifactAdapter = SolCompilerArtifactAdapter;
//# sourceMappingURL=sol_compiler_artifact_adapter.js.map