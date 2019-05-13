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
var assert_1 = require("@0x/assert");
var utils_1 = require("@0x/utils");
var types_1 = require("../types");
var subprovider_1 = require("./subprovider");
var BaseWalletSubprovider = /** @class */ (function (_super) {
    __extends(BaseWalletSubprovider, _super);
    function BaseWalletSubprovider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BaseWalletSubprovider._validateTxParams = function (txParams) {
        if (txParams.to !== undefined) {
            assert_1.assert.isETHAddressHex('to', txParams.to);
        }
        assert_1.assert.isHexString('nonce', txParams.nonce);
    };
    BaseWalletSubprovider._validateSender = function (sender) {
        if (sender === undefined || !utils_1.addressUtils.isAddress(sender)) {
            throw new Error(types_1.WalletSubproviderErrors.SenderInvalidOrNotSupplied);
        }
    };
    /**
     * This method conforms to the web3-provider-engine interface.
     * It is called internally by the ProviderEngine when it is this subproviders
     * turn to handle a JSON RPC request.
     * @param payload JSON RPC payload
     * @param next Callback to call if this subprovider decides not to handle the request
     * @param end Callback to call if subprovider handled the request and wants to pass back the request.
     */
    // tslint:disable-next-line:async-suffix
    BaseWalletSubprovider.prototype.handleRequest = function (payload, next, end) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, accounts, txParams, address, typedData, _b, err_1, err_2, filledParams, signedTx, response, err_3, filledParams, signedTx, result, err_4, data, ecSignatureHex, err_5, signature, err_6;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = payload.method;
                        switch (_b) {
                            case 'eth_coinbase': return [3 /*break*/, 1];
                            case 'eth_accounts': return [3 /*break*/, 5];
                            case 'eth_sendTransaction': return [3 /*break*/, 9];
                            case 'eth_signTransaction': return [3 /*break*/, 16];
                            case 'eth_sign': return [3 /*break*/, 22];
                            case 'personal_sign': return [3 /*break*/, 22];
                            case 'eth_signTypedData': return [3 /*break*/, 27];
                        }
                        return [3 /*break*/, 32];
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.getAccountsAsync()];
                    case 2:
                        accounts = _c.sent();
                        end(null, accounts[0]);
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _c.sent();
                        end(err_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                    case 5:
                        _c.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, this.getAccountsAsync()];
                    case 6:
                        accounts = _c.sent();
                        end(null, accounts);
                        return [3 /*break*/, 8];
                    case 7:
                        err_2 = _c.sent();
                        end(err_2);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                    case 9:
                        txParams = payload.params[0];
                        _c.label = 10;
                    case 10:
                        _c.trys.push([10, 14, , 15]);
                        BaseWalletSubprovider._validateSender(txParams.from);
                        return [4 /*yield*/, this._populateMissingTxParamsAsync(txParams)];
                    case 11:
                        filledParams = _c.sent();
                        return [4 /*yield*/, this.signTransactionAsync(filledParams)];
                    case 12:
                        signedTx = _c.sent();
                        return [4 /*yield*/, this._emitSendTransactionAsync(signedTx)];
                    case 13:
                        response = _c.sent();
                        end(null, response.result);
                        return [3 /*break*/, 15];
                    case 14:
                        err_3 = _c.sent();
                        end(err_3);
                        return [3 /*break*/, 15];
                    case 15: return [2 /*return*/];
                    case 16:
                        txParams = payload.params[0];
                        _c.label = 17;
                    case 17:
                        _c.trys.push([17, 20, , 21]);
                        return [4 /*yield*/, this._populateMissingTxParamsAsync(txParams)];
                    case 18:
                        filledParams = _c.sent();
                        return [4 /*yield*/, this.signTransactionAsync(filledParams)];
                    case 19:
                        signedTx = _c.sent();
                        result = {
                            raw: signedTx,
                            tx: txParams,
                        };
                        end(null, result);
                        return [3 /*break*/, 21];
                    case 20:
                        err_4 = _c.sent();
                        end(err_4);
                        return [3 /*break*/, 21];
                    case 21: return [2 /*return*/];
                    case 22:
                        data = payload.method === 'eth_sign' ? payload.params[1] : payload.params[0];
                        address = payload.method === 'eth_sign' ? payload.params[0] : payload.params[1];
                        _c.label = 23;
                    case 23:
                        _c.trys.push([23, 25, , 26]);
                        return [4 /*yield*/, this.signPersonalMessageAsync(data, address)];
                    case 24:
                        ecSignatureHex = _c.sent();
                        end(null, ecSignatureHex);
                        return [3 /*break*/, 26];
                    case 25:
                        err_5 = _c.sent();
                        end(err_5);
                        return [3 /*break*/, 26];
                    case 26: return [2 /*return*/];
                    case 27:
                        _a = __read(payload.params, 2), address = _a[0], typedData = _a[1];
                        _c.label = 28;
                    case 28:
                        _c.trys.push([28, 30, , 31]);
                        return [4 /*yield*/, this.signTypedDataAsync(address, typedData)];
                    case 29:
                        signature = _c.sent();
                        end(null, signature);
                        return [3 /*break*/, 31];
                    case 30:
                        err_6 = _c.sent();
                        end(err_6);
                        return [3 /*break*/, 31];
                    case 31: return [2 /*return*/];
                    case 32:
                        next();
                        return [2 /*return*/];
                }
            });
        });
    };
    BaseWalletSubprovider.prototype._emitSendTransactionAsync = function (signedTx) {
        return __awaiter(this, void 0, void 0, function () {
            var payload, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        payload = {
                            method: 'eth_sendRawTransaction',
                            params: [signedTx],
                        };
                        return [4 /*yield*/, this.emitPayloadAsync(payload)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    BaseWalletSubprovider.prototype._populateMissingTxParamsAsync = function (partialTxParams) {
        return __awaiter(this, void 0, void 0, function () {
            var txParams, gasPriceResult, gasPrice, nonceResult, nonce, gasResult, gas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        txParams = partialTxParams;
                        if (!(partialTxParams.gasPrice === undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.emitPayloadAsync({
                                method: 'eth_gasPrice',
                                params: [],
                            })];
                    case 1:
                        gasPriceResult = _a.sent();
                        gasPrice = gasPriceResult.result.toString();
                        txParams = __assign({}, txParams, { gasPrice: gasPrice });
                        _a.label = 2;
                    case 2:
                        if (!(partialTxParams.nonce === undefined)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.emitPayloadAsync({
                                method: 'eth_getTransactionCount',
                                params: [partialTxParams.from, 'pending'],
                            })];
                    case 3:
                        nonceResult = _a.sent();
                        nonce = nonceResult.result;
                        txParams = __assign({}, txParams, { nonce: nonce });
                        _a.label = 4;
                    case 4:
                        if (!(partialTxParams.gas === undefined)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.emitPayloadAsync({
                                method: 'eth_estimateGas',
                                params: [partialTxParams],
                            })];
                    case 5:
                        gasResult = _a.sent();
                        gas = gasResult.result.toString();
                        txParams = __assign({}, txParams, { gas: gas });
                        _a.label = 6;
                    case 6: return [2 /*return*/, txParams];
                }
            });
        });
    };
    return BaseWalletSubprovider;
}(subprovider_1.Subprovider));
exports.BaseWalletSubprovider = BaseWalletSubprovider;
//# sourceMappingURL=base_wallet_subprovider.js.map