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
var dev_utils_1 = require("@0x/dev-utils");
var subproviders_1 = require("@0x/subproviders");
var utils_1 = require("@0x/utils");
var web3_wrapper_1 = require("@0x/web3-wrapper");
var ethers_1 = require("ethers");
var _ = require("lodash");
var semaphore_async_await_1 = require("semaphore-async-await");
var constants_1 = require("./constants");
var types_1 = require("./types");
var BLOCK_GAS_LIMIT = 6000000;
// HACK: This wrapper outputs errors to console even if the promise gets ignored
// we need this because web3-provider-engine does not handle promises in
// the after function of next(after).
function logAsyncErrors(fn) {
    function wrappedAsync() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fn.apply(void 0, __spread(args))];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        utils_1.logUtils.log(err_1);
                        throw err_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    return wrappedAsync;
}
// Because there is no notion of a call trace in the Ethereum rpc - we collect them in a rather non-obvious/hacky way.
// On each call - we create a snapshot, execute the call as a transaction, get the trace, revert the snapshot.
// That allows us to avoid influencing test behaviour.
/**
 * This class implements the [web3-provider-engine](https://github.com/MetaMask/provider-engine) subprovider interface.
 * It collects traces of all transactions that were sent and all calls that were executed through JSON RPC. It must
 * be extended by implementing the _recordTxTraceAsync method which is called for every transaction.
 */
var TraceCollectionSubprovider = /** @class */ (function (_super) {
    __extends(TraceCollectionSubprovider, _super);
    /**
     * Instantiates a TraceCollectionSubprovider instance
     * @param defaultFromAddress default from address to use when sending transactions
     */
    function TraceCollectionSubprovider(defaultFromAddress, config) {
        var _this = _super.call(this) || this;
        // Lock is used to not accept normal transactions while doing call/snapshot magic because they'll be reverted later otherwise
        _this._lock = new semaphore_async_await_1.Lock();
        _this._isEnabled = true;
        _this._defaultFromAddress = defaultFromAddress;
        _this._config = config;
        return _this;
    }
    /**
     * Starts trace collection
     */
    TraceCollectionSubprovider.prototype.start = function () {
        this._isEnabled = true;
    };
    /**
     * Stops trace collection
     */
    TraceCollectionSubprovider.prototype.stop = function () {
        this._isEnabled = false;
    };
    /**
     * This method conforms to the web3-provider-engine interface.
     * It is called internally by the ProviderEngine when it is this subproviders
     * turn to handle a JSON RPC request.
     * @param payload JSON RPC payload
     * @param next Callback to call if this subprovider decides not to handle the request
     * @param _end Callback to call if subprovider handled the request and wants to pass back the request.
     */
    // tslint:disable-next-line:prefer-function-over-method async-suffix
    TraceCollectionSubprovider.prototype.handleRequest = function (payload, next, _end) {
        return __awaiter(this, void 0, void 0, function () {
            var txData, txData, callData, estimateGasData;
            return __generator(this, function (_a) {
                if (this._isEnabled) {
                    switch (payload.method) {
                        case 'eth_sendTransaction':
                            if (!this._config.shouldCollectTransactionTraces) {
                                next();
                            }
                            else {
                                txData = payload.params[0];
                                next(logAsyncErrors(this._onTransactionSentAsync.bind(this, txData)));
                            }
                            return [2 /*return*/];
                        case 'eth_sendRawTransaction':
                            if (!this._config.shouldCollectTransactionTraces) {
                                next();
                            }
                            else {
                                txData = ethers_1.utils.parseTransaction(payload.params[0]);
                                if (txData.to === null) {
                                    txData.to = constants_1.constants.NEW_CONTRACT;
                                }
                                next(logAsyncErrors(this._onTransactionSentAsync.bind(this, txData)));
                            }
                            return [2 /*return*/];
                        case 'eth_call':
                            if (!this._config.shouldCollectCallTraces) {
                                next();
                            }
                            else {
                                callData = payload.params[0];
                                next(logAsyncErrors(this._onCallOrGasEstimateExecutedAsync.bind(this, callData)));
                            }
                            return [2 /*return*/];
                        case 'eth_estimateGas':
                            if (!this._config.shouldCollectGasEstimateTraces) {
                                next();
                            }
                            else {
                                estimateGasData = payload.params[0];
                                next(logAsyncErrors(this._onCallOrGasEstimateExecutedAsync.bind(this, estimateGasData)));
                            }
                            return [2 /*return*/];
                        default:
                            next();
                            return [2 /*return*/];
                    }
                }
                else {
                    next();
                    return [2 /*return*/];
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Set's the subprovider's engine to the ProviderEngine it is added to.
     * This is only called within the ProviderEngine source code, do not call
     * directly.
     * @param engine The ProviderEngine this subprovider is added to
     */
    TraceCollectionSubprovider.prototype.setEngine = function (engine) {
        _super.prototype.setEngine.call(this, engine);
        this._web3Wrapper = new web3_wrapper_1.Web3Wrapper(engine);
    };
    TraceCollectionSubprovider.prototype._onTransactionSentAsync = function (txData, err, txHash, cb) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1, _a, NULL_ADDRESS, toAddress, latestBlock, transactions, transactions_1, transactions_1_1, transaction, toAddress, e_1_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!(txData.isFakeTransaction || txData.from === txData.to)) return [3 /*break*/, 2];
                        // This transaction is a usual transaction. Not a call executed as one.
                        // And we don't want it to be executed within a snapshotting period
                        return [4 /*yield*/, this._lock.acquire()];
                    case 1:
                        // This transaction is a usual transaction. Not a call executed as one.
                        // And we don't want it to be executed within a snapshotting period
                        _b.sent();
                        _b.label = 2;
                    case 2:
                        NULL_ADDRESS = '0x0';
                        if (!(err === null)) return [3 /*break*/, 4];
                        toAddress = txData.to === undefined || txData.to === NULL_ADDRESS ? constants_1.constants.NEW_CONTRACT : txData.to;
                        return [4 /*yield*/, this._recordTxTraceAsync(toAddress, txData.data, txHash)];
                    case 3:
                        _b.sent();
                        return [3 /*break*/, 13];
                    case 4: return [4 /*yield*/, this._web3Wrapper.getBlockWithTransactionDataAsync(types_1.BlockParamLiteral.Latest)];
                    case 5:
                        latestBlock = _b.sent();
                        transactions = latestBlock.transactions;
                        _b.label = 6;
                    case 6:
                        _b.trys.push([6, 11, 12, 13]);
                        transactions_1 = __values(transactions), transactions_1_1 = transactions_1.next();
                        _b.label = 7;
                    case 7:
                        if (!!transactions_1_1.done) return [3 /*break*/, 10];
                        transaction = transactions_1_1.value;
                        toAddress = txData.to === undefined || txData.to === NULL_ADDRESS ? constants_1.constants.NEW_CONTRACT : txData.to;
                        return [4 /*yield*/, this._recordTxTraceAsync(toAddress, transaction.input, transaction.hash)];
                    case 8:
                        _b.sent();
                        _b.label = 9;
                    case 9:
                        transactions_1_1 = transactions_1.next();
                        return [3 /*break*/, 7];
                    case 10: return [3 /*break*/, 13];
                    case 11:
                        e_1_1 = _b.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 13];
                    case 12:
                        try {
                            if (transactions_1_1 && !transactions_1_1.done && (_a = transactions_1.return)) _a.call(transactions_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 13:
                        if (!txData.isFakeTransaction) {
                            // This transaction is a usual transaction. Not a call executed as one.
                            // And we don't want it to be executed within a snapshotting period
                            this._lock.release();
                        }
                        cb();
                        return [2 /*return*/];
                }
            });
        });
    };
    TraceCollectionSubprovider.prototype._onCallOrGasEstimateExecutedAsync = function (callData, _err, _callResult, cb) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._recordCallOrGasEstimateTraceAsync(callData)];
                    case 1:
                        _a.sent();
                        cb();
                        return [2 /*return*/];
                }
            });
        });
    };
    TraceCollectionSubprovider.prototype._recordCallOrGasEstimateTraceAsync = function (callData) {
        return __awaiter(this, void 0, void 0, function () {
            var blockchainLifecycle, fakeTxData, txData, txHash, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // We don't want other transactions to be executed during snashotting period, that's why we lock the
                    // transaction execution for all transactions except our fake ones.
                    return [4 /*yield*/, this._lock.acquire()];
                    case 1:
                        // We don't want other transactions to be executed during snashotting period, that's why we lock the
                        // transaction execution for all transactions except our fake ones.
                        _a.sent();
                        blockchainLifecycle = new dev_utils_1.BlockchainLifecycle(this._web3Wrapper);
                        return [4 /*yield*/, blockchainLifecycle.startAsync()];
                    case 2:
                        _a.sent();
                        fakeTxData = __assign({ gas: "0x" + BLOCK_GAS_LIMIT.toString(16), isFakeTransaction: true }, callData, { from: callData.from || this._defaultFromAddress });
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 6, , 7]);
                        txData = web3_wrapper_1.marshaller.unmarshalTxData(fakeTxData);
                        return [4 /*yield*/, this._web3Wrapper.sendTransactionAsync(txData)];
                    case 4:
                        txHash = _a.sent();
                        return [4 /*yield*/, this._web3Wrapper.awaitTransactionMinedAsync(txHash, 0)];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        err_2 = _a.sent();
                        // TODO(logvinov) Check that transaction failed and not some other exception
                        // Even if this transaction failed - we've already recorded it's trace.
                        _.noop();
                        return [3 /*break*/, 7];
                    case 7: return [4 /*yield*/, blockchainLifecycle.revertAsync()];
                    case 8:
                        _a.sent();
                        this._lock.release();
                        return [2 /*return*/];
                }
            });
        });
    };
    return TraceCollectionSubprovider;
}(subproviders_1.Subprovider));
exports.TraceCollectionSubprovider = TraceCollectionSubprovider;
//# sourceMappingURL=trace_collection_subprovider.js.map