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
var web3_wrapper_1 = require("@0x/web3-wrapper");
var _ = require("lodash");
var constants_1 = require("./constants");
var trace_1 = require("./trace");
var trace_collection_subprovider_1 = require("./trace_collection_subprovider");
var utils_1 = require("./utils");
// TraceInfoSubprovider is extended by subproviders which need to work with one
// TraceInfo at a time. It has one abstract method: _handleTraceInfoAsync, which
// is called for each TraceInfo.
var TraceInfoSubprovider = /** @class */ (function (_super) {
    __extends(TraceInfoSubprovider, _super);
    function TraceInfoSubprovider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // tslint:disable prefer-function-over-method
    TraceInfoSubprovider.prototype._handleTraceInfoAsync = function (_traceInfo) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Promise.resolve(undefined)];
            });
        });
    };
    TraceInfoSubprovider.prototype._recordTxTraceAsync = function (address, dataIfExists, txHash) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1, _a, e_2, _b, nodeType, trace, tracer, traceInfo, contractAddressToTraces, subcallAddresses, subcallAddresses_1, subcallAddresses_1_1, subcallAddress, subTraceInfo, traceForThatSubcall, subcallDepth, runtimeBytecode, e_1_1, subcallAddresses_2, subcallAddresses_2_1, subcallAddress, runtimeBytecode, traceForThatSubcall, subcallDepth, subTraceInfo, e_2_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this._web3Wrapper.awaitTransactionMinedAsync(txHash, 0)];
                    case 1:
                        _c.sent();
                        return [4 /*yield*/, this._web3Wrapper.getNodeTypeAsync()];
                    case 2:
                        nodeType = _c.sent();
                        if (!(nodeType === web3_wrapper_1.NodeType.Geth)) return [3 /*break*/, 4];
                        tracer = "\n                {\n                    data: [],\n                    extractStack: function (stack) {\n                        var extract = [];\n                        for (var i = 0; i < stack.length(); i++) {\n                            extract.push('0x' + stack.peek(i).toString(16));\n                        }\n                        return extract;\n                    },\n                    step: function(log) {\n                        const op = log.op.toString();\n                        const opn = 0 | log.op.toNumber();\n                        const pc = 0 | log.getPC();\n                        const depth = 0 | log.getDepth();\n                        const gasCost = 0 | log.getCost();\n                        const gas = 0 | log.getGas();\n                        const isCall = opn == 0xf1 || opn == 0xf2 || opn == 0xf4 || opn == 0xf5 || opn == 0xfa;\n                        const isMemoryAccess = opn == 0x51 || opn == 0x52 || opn == 0x53;\n                        const isCallDataAccess = opn == 0x37;\n                        var stack;\n                        if (isCall) {\n                            stack = ['0x'+log.stack.peek(1).toString(16), null];\n                        } else if (isMemoryAccess) {\n                            stack = ['0x'+log.stack.peek(0).toString(16)];\n                        } else if (isCallDataAccess) {\n                            stack = ['0x'+log.stack.peek(2).toString(16), '0x'+log.stack.peek(1).toString(16), '0x'+log.stack.peek(0).toString(16)];\n                        }\n                        this.data.push({ pc, gasCost, depth, op, stack, gas });\n                    },\n                    fault: function() { },\n                    result: function() { return {structLogs: this.data}; }\n                }\n            ";
                        return [4 /*yield*/, this._web3Wrapper.getTransactionTraceAsync(txHash, { tracer: tracer, timeout: '600s' })];
                    case 3:
                        trace = _c.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, this._web3Wrapper.getTransactionTraceAsync(txHash, {
                            disableMemory: true,
                            disableStack: false,
                            disableStorage: true,
                        })];
                    case 5:
                        /**
                         * Ganache doesn't support custom tracers yet.
                         */
                        trace = _c.sent();
                        _c.label = 6;
                    case 6:
                        trace.structLogs = utils_1.utils.normalizeStructLogs(trace.structLogs);
                        traceInfo = {
                            trace: trace,
                            address: address,
                            dataIfExists: dataIfExists,
                            txHash: txHash,
                        };
                        return [4 /*yield*/, this._handleTraceInfoAsync(traceInfo)];
                    case 7:
                        _c.sent();
                        contractAddressToTraces = trace_1.getContractAddressToTraces(trace.structLogs, address);
                        subcallAddresses = _.keys(contractAddressToTraces);
                        if (!(address === constants_1.constants.NEW_CONTRACT)) return [3 /*break*/, 19];
                        _c.label = 8;
                    case 8:
                        _c.trys.push([8, 16, 17, 18]);
                        subcallAddresses_1 = __values(subcallAddresses), subcallAddresses_1_1 = subcallAddresses_1.next();
                        _c.label = 9;
                    case 9:
                        if (!!subcallAddresses_1_1.done) return [3 /*break*/, 15];
                        subcallAddress = subcallAddresses_1_1.value;
                        subTraceInfo = void 0;
                        traceForThatSubcall = contractAddressToTraces[subcallAddress];
                        subcallDepth = traceForThatSubcall[0].depth;
                        if (!(subcallAddress === 'NEW_CONTRACT')) return [3 /*break*/, 10];
                        subTraceInfo = {
                            subcallDepth: subcallDepth,
                            subtrace: traceForThatSubcall,
                            txHash: txHash,
                            address: subcallAddress,
                            bytecode: dataIfExists,
                        };
                        return [3 /*break*/, 12];
                    case 10: return [4 /*yield*/, this._web3Wrapper.getContractCodeAsync(subcallAddress)];
                    case 11:
                        runtimeBytecode = _c.sent();
                        subTraceInfo = {
                            subcallDepth: subcallDepth,
                            subtrace: traceForThatSubcall,
                            txHash: txHash,
                            address: subcallAddress,
                            runtimeBytecode: runtimeBytecode,
                        };
                        _c.label = 12;
                    case 12: return [4 /*yield*/, this._handleSubTraceInfoAsync(subTraceInfo)];
                    case 13:
                        _c.sent();
                        _c.label = 14;
                    case 14:
                        subcallAddresses_1_1 = subcallAddresses_1.next();
                        return [3 /*break*/, 9];
                    case 15: return [3 /*break*/, 18];
                    case 16:
                        e_1_1 = _c.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 18];
                    case 17:
                        try {
                            if (subcallAddresses_1_1 && !subcallAddresses_1_1.done && (_a = subcallAddresses_1.return)) _a.call(subcallAddresses_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 18: return [3 /*break*/, 27];
                    case 19:
                        _c.trys.push([19, 25, 26, 27]);
                        subcallAddresses_2 = __values(subcallAddresses), subcallAddresses_2_1 = subcallAddresses_2.next();
                        _c.label = 20;
                    case 20:
                        if (!!subcallAddresses_2_1.done) return [3 /*break*/, 24];
                        subcallAddress = subcallAddresses_2_1.value;
                        return [4 /*yield*/, this._web3Wrapper.getContractCodeAsync(subcallAddress)];
                    case 21:
                        runtimeBytecode = _c.sent();
                        traceForThatSubcall = contractAddressToTraces[subcallAddress];
                        subcallDepth = traceForThatSubcall[0].depth;
                        subTraceInfo = {
                            subcallDepth: subcallDepth,
                            subtrace: traceForThatSubcall,
                            txHash: txHash,
                            address: subcallAddress,
                            runtimeBytecode: runtimeBytecode,
                        };
                        return [4 /*yield*/, this._handleSubTraceInfoAsync(subTraceInfo)];
                    case 22:
                        _c.sent();
                        _c.label = 23;
                    case 23:
                        subcallAddresses_2_1 = subcallAddresses_2.next();
                        return [3 /*break*/, 20];
                    case 24: return [3 /*break*/, 27];
                    case 25:
                        e_2_1 = _c.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 27];
                    case 26:
                        try {
                            if (subcallAddresses_2_1 && !subcallAddresses_2_1.done && (_b = subcallAddresses_2.return)) _b.call(subcallAddresses_2);
                        }
                        finally { if (e_2) throw e_2.error; }
                        return [7 /*endfinally*/];
                    case 27: return [2 /*return*/];
                }
            });
        });
    };
    return TraceInfoSubprovider;
}(trace_collection_subprovider_1.TraceCollectionSubprovider));
exports.TraceInfoSubprovider = TraceInfoSubprovider;
//# sourceMappingURL=trace_info_subprovider.js.map