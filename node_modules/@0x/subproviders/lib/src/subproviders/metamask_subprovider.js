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
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("@0x/utils");
var web3_wrapper_1 = require("@0x/web3-wrapper");
var ethUtil = require("ethereumjs-util");
var subprovider_1 = require("./subprovider");
/**
 * This class implements the [web3-provider-engine](https://github.com/MetaMask/provider-engine)
 * subprovider interface and the provider sendAsync interface.
 * It handles inconsistencies with Metamask implementations of various JSON RPC methods.
 * It forwards JSON RPC requests involving the domain of a signer (getAccounts,
 * sendTransaction, signMessage etc...) to the provider instance supplied at instantiation. All other requests
 * are passed onwards for subsequent subproviders to handle.
 */
var MetamaskSubprovider = /** @class */ (function (_super) {
    __extends(MetamaskSubprovider, _super);
    /**
     * Instantiates a new MetamaskSubprovider
     * @param supportedProvider Web3 provider that should handle  all user account related requests
     */
    function MetamaskSubprovider(supportedProvider) {
        var _this = _super.call(this) || this;
        var provider = utils_1.providerUtils.standardizeOrThrow(supportedProvider);
        _this._web3Wrapper = new web3_wrapper_1.Web3Wrapper(provider);
        _this._provider = provider;
        return _this;
    }
    /**
     * This method conforms to the web3-provider-engine interface.
     * It is called internally by the ProviderEngine when it is this subproviders
     * turn to handle a JSON RPC request.
     * @param payload JSON RPC payload
     * @param next Callback to call if this subprovider decides not to handle the request
     * @param end Callback to call if subprovider handled the request and wants to pass back the request.
     */
    // tslint:disable-next-line:prefer-function-over-method async-suffix
    MetamaskSubprovider.prototype.handleRequest = function (payload, next, end) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, message, address, _c, nodeVersion, err_1, accounts, err_2, _d, txParams, txData, txHash, err_3, msgBuff, prefixedMsgBuff, prefixedMsgHex, signature, err_4, messageJSON, signature, err_5;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _c = payload.method;
                        switch (_c) {
                            case 'web3_clientVersion': return [3 /*break*/, 1];
                            case 'eth_accounts': return [3 /*break*/, 5];
                            case 'eth_sendTransaction': return [3 /*break*/, 9];
                            case 'eth_sign': return [3 /*break*/, 14];
                            case 'eth_signTypedData': return [3 /*break*/, 19];
                            case 'eth_signTypedData_v3': return [3 /*break*/, 19];
                        }
                        return [3 /*break*/, 24];
                    case 1:
                        _e.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this._web3Wrapper.getNodeVersionAsync()];
                    case 2:
                        nodeVersion = _e.sent();
                        end(null, nodeVersion);
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _e.sent();
                        end(err_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                    case 5:
                        _e.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, this._web3Wrapper.getAvailableAddressesAsync()];
                    case 6:
                        accounts = _e.sent();
                        end(null, accounts);
                        return [3 /*break*/, 8];
                    case 7:
                        err_2 = _e.sent();
                        end(err_2);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                    case 9:
                        _d = __read(payload.params, 1), txParams = _d[0];
                        _e.label = 10;
                    case 10:
                        _e.trys.push([10, 12, , 13]);
                        txData = web3_wrapper_1.marshaller.unmarshalTxData(txParams);
                        return [4 /*yield*/, this._web3Wrapper.sendTransactionAsync(txData)];
                    case 11:
                        txHash = _e.sent();
                        end(null, txHash);
                        return [3 /*break*/, 13];
                    case 12:
                        err_3 = _e.sent();
                        end(err_3);
                        return [3 /*break*/, 13];
                    case 13: return [2 /*return*/];
                    case 14:
                        _a = __read(payload.params, 2), address = _a[0], message = _a[1];
                        _e.label = 15;
                    case 15:
                        _e.trys.push([15, 17, , 18]);
                        msgBuff = ethUtil.toBuffer(message);
                        prefixedMsgBuff = ethUtil.hashPersonalMessage(msgBuff);
                        prefixedMsgHex = ethUtil.bufferToHex(prefixedMsgBuff);
                        return [4 /*yield*/, this._web3Wrapper.signMessageAsync(address, prefixedMsgHex)];
                    case 16:
                        signature = _e.sent();
                        signature ? end(null, signature) : end(new Error('Error performing eth_sign'), null);
                        return [3 /*break*/, 18];
                    case 17:
                        err_4 = _e.sent();
                        end(err_4);
                        return [3 /*break*/, 18];
                    case 18: return [2 /*return*/];
                    case 19:
                        _b = __read(payload.params, 2), address = _b[0], message = _b[1];
                        _e.label = 20;
                    case 20:
                        _e.trys.push([20, 22, , 23]);
                        messageJSON = JSON.stringify(message);
                        return [4 /*yield*/, this._web3Wrapper.sendRawPayloadAsync({
                                method: 'eth_signTypedData_v3',
                                params: [address, messageJSON],
                            })];
                    case 21:
                        signature = _e.sent();
                        signature ? end(null, signature) : end(new Error('Error performing eth_signTypedData'), null);
                        return [3 /*break*/, 23];
                    case 22:
                        err_5 = _e.sent();
                        end(err_5);
                        return [3 /*break*/, 23];
                    case 23: return [2 /*return*/];
                    case 24:
                        next();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * This method conforms to the provider sendAsync interface.
     * Allowing the MetamaskSubprovider to be used as a generic provider (outside of Web3ProviderEngine) with the
     * addition of wrapping the inconsistent Metamask behaviour
     * @param payload JSON RPC payload
     * @return The contents nested under the result key of the response body
     */
    MetamaskSubprovider.prototype.sendAsync = function (payload, callback) {
        var _this = this;
        void this.handleRequest(payload, 
        // handleRequest has decided to not handle this, so fall through to the provider
        function () {
            var sendAsync = _this._provider.sendAsync.bind(_this._provider);
            sendAsync(payload, callback);
        }, 
        // handleRequest has called end and will handle this
        function (err, data) {
            err ? callback(err) : callback(null, __assign({}, payload, { result: data }));
        });
    };
    return MetamaskSubprovider;
}(subprovider_1.Subprovider));
exports.MetamaskSubprovider = MetamaskSubprovider;
//# sourceMappingURL=metamask_subprovider.js.map