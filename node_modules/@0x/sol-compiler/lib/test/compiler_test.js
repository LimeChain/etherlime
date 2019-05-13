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
var path_1 = require("path");
var chai = require("chai");
require("mocha");
var compiler_1 = require("../src/compiler");
var fs_wrapper_1 = require("../src/utils/fs_wrapper");
var exchange_bin_1 = require("./fixtures/exchange_bin");
var chai_setup_1 = require("./util/chai_setup");
var constants_1 = require("./util/constants");
chai_setup_1.chaiSetup.configure();
var expect = chai.expect;
describe('#Compiler', function () {
    var _this = this;
    this.timeout(constants_1.constants.timeoutMs); // tslint:disable-line:no-invalid-this
    var artifactsDir = __dirname + "/fixtures/artifacts";
    var contractsDir = __dirname + "/fixtures/contracts";
    var compilerOpts = {
        artifactsDir: artifactsDir,
        contractsDir: contractsDir,
        contracts: constants_1.constants.contracts,
    };
    it('should create a Compiler with empty opts', function () { return __awaiter(_this, void 0, void 0, function () {
        var _compiler;
        return __generator(this, function (_a) {
            _compiler = new compiler_1.Compiler();
            return [2 /*return*/];
        });
    }); });
    it('should create an Exchange artifact with the correct unlinked binary', function () { return __awaiter(_this, void 0, void 0, function () {
        var exchangeArtifactPath, opts, exchangeArtifactString, exchangeArtifact, metadataByteLength, metadataHexLength, unlinkedBinaryWithoutMetadata, exchangeBinaryWithoutMetadata;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    compilerOpts.contracts = ['Exchange'];
                    exchangeArtifactPath = artifactsDir + "/Exchange.json";
                    if (!fs_wrapper_1.fsWrapper.doesPathExistSync(exchangeArtifactPath)) return [3 /*break*/, 2];
                    return [4 /*yield*/, fs_wrapper_1.fsWrapper.removeFileAsync(exchangeArtifactPath)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [4 /*yield*/, new compiler_1.Compiler(compilerOpts).compileAsync()];
                case 3:
                    _a.sent();
                    opts = {
                        encoding: 'utf8',
                    };
                    return [4 /*yield*/, fs_wrapper_1.fsWrapper.readFileAsync(exchangeArtifactPath, opts)];
                case 4:
                    exchangeArtifactString = _a.sent();
                    exchangeArtifact = JSON.parse(exchangeArtifactString);
                    metadataByteLength = 43;
                    metadataHexLength = metadataByteLength * 2;
                    unlinkedBinaryWithoutMetadata = exchangeArtifact.compilerOutput.evm.bytecode.object.slice(2, -metadataHexLength);
                    exchangeBinaryWithoutMetadata = exchange_bin_1.exchange_binary.slice(0, -metadataHexLength);
                    expect(unlinkedBinaryWithoutMetadata).to.equal(exchangeBinaryWithoutMetadata);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should throw when Whatever.sol doesn't contain a Whatever contract", function () { return __awaiter(_this, void 0, void 0, function () {
        var contract, exchangeArtifactPath, compiler;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    contract = 'BadContractName';
                    exchangeArtifactPath = artifactsDir + "/" + contract + ".json";
                    if (!fs_wrapper_1.fsWrapper.doesPathExistSync(exchangeArtifactPath)) return [3 /*break*/, 2];
                    return [4 /*yield*/, fs_wrapper_1.fsWrapper.removeFileAsync(exchangeArtifactPath)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    compilerOpts.contracts = [contract];
                    compiler = new compiler_1.Compiler(compilerOpts);
                    expect(compiler.compileAsync()).to.be.rejected();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('after a successful compilation', function () {
        var contract = 'Exchange';
        var artifactPath;
        var artifactCreatedAtMs;
        beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        compilerOpts.contracts = [contract];
                        artifactPath = artifactsDir + "/" + contract + ".json";
                        if (!fs_wrapper_1.fsWrapper.doesPathExistSync(artifactPath)) return [3 /*break*/, 2];
                        return [4 /*yield*/, fs_wrapper_1.fsWrapper.removeFileAsync(artifactPath)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, new compiler_1.Compiler(compilerOpts).compileAsync()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, fs_wrapper_1.fsWrapper.statAsync(artifactPath)];
                    case 4:
                        artifactCreatedAtMs = (_a.sent()).mtimeMs;
                        return [2 /*return*/];
                }
            });
        }); });
        it('recompilation should update artifact when source has changed', function () { return __awaiter(_this, void 0, void 0, function () {
            var artifactModifiedAtMs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // append some meaningless data to the contract, so that its hash
                    // will change, so that the compiler will decide to recompile it.
                    return [4 /*yield*/, fs_wrapper_1.fsWrapper.appendFileAsync(path_1.join(contractsDir, contract + ".sol"), ' ')];
                    case 1:
                        // append some meaningless data to the contract, so that its hash
                        // will change, so that the compiler will decide to recompile it.
                        _a.sent();
                        return [4 /*yield*/, new compiler_1.Compiler(compilerOpts).compileAsync()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, fs_wrapper_1.fsWrapper.statAsync(artifactPath)];
                    case 3:
                        artifactModifiedAtMs = (_a.sent()).mtimeMs;
                        expect(artifactModifiedAtMs).to.be.greaterThan(artifactCreatedAtMs);
                        return [2 /*return*/];
                }
            });
        }); });
        it("recompilation should NOT update artifact when source hasn't changed", function () { return __awaiter(_this, void 0, void 0, function () {
            var artifactModifiedAtMs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new compiler_1.Compiler(compilerOpts).compileAsync()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, fs_wrapper_1.fsWrapper.statAsync(artifactPath)];
                    case 2:
                        artifactModifiedAtMs = (_a.sent()).mtimeMs;
                        expect(artifactModifiedAtMs).to.equal(artifactCreatedAtMs);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    it('should only compile what was requested', function () { return __awaiter(_this, void 0, void 0, function () {
        var e_1, _a, e_2, _b, _c, _d, artifact, e_1_1, _e, _f, artifact, e_2_1;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    _g.trys.push([0, 6, 7, 8]);
                    return [4 /*yield*/, fs_wrapper_1.fsWrapper.readdirAsync(artifactsDir)];
                case 1:
                    _c = __values.apply(void 0, [_g.sent()]), _d = _c.next();
                    _g.label = 2;
                case 2:
                    if (!!_d.done) return [3 /*break*/, 5];
                    artifact = _d.value;
                    return [4 /*yield*/, fs_wrapper_1.fsWrapper.removeFileAsync(path_1.join(artifactsDir, artifact))];
                case 3:
                    _g.sent();
                    _g.label = 4;
                case 4:
                    _d = _c.next();
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 8];
                case 6:
                    e_1_1 = _g.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 8];
                case 7:
                    try {
                        if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 8:
                    // compile EmptyContract
                    compilerOpts.contracts = ['EmptyContract'];
                    return [4 /*yield*/, new compiler_1.Compiler(compilerOpts).compileAsync()];
                case 9:
                    _g.sent();
                    _g.label = 10;
                case 10:
                    _g.trys.push([10, 15, 16, 17]);
                    return [4 /*yield*/, fs_wrapper_1.fsWrapper.readdirAsync(artifactsDir)];
                case 11:
                    _e = __values.apply(void 0, [_g.sent()]), _f = _e.next();
                    _g.label = 12;
                case 12:
                    if (!!_f.done) return [3 /*break*/, 14];
                    artifact = _f.value;
                    expect(artifact).to.equal('EmptyContract.json');
                    _g.label = 13;
                case 13:
                    _f = _e.next();
                    return [3 /*break*/, 12];
                case 14: return [3 /*break*/, 17];
                case 15:
                    e_2_1 = _g.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 17];
                case 16:
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_2) throw e_2.error; }
                    return [7 /*endfinally*/];
                case 17: return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=compiler_test.js.map