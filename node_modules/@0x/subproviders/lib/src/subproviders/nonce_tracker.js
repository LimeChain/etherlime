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
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var ethereum_types_1 = require("ethereum-types");
var EthereumTx = require("ethereumjs-tx");
var ethUtil = require("ethereumjs-util");
var providerEngineUtils = require("web3-provider-engine/util/rpc-cache-utils");
var types_1 = require("../types");
var subprovider_1 = require("./subprovider");
var NONCE_TOO_LOW_ERROR_MESSAGE = 'Transaction nonce is too low';
/**
 * This class implements the [web3-provider-engine](https://github.com/MetaMask/provider-engine) subprovider interface.
 * It is heavily inspired by the [NonceSubprovider](https://github.com/MetaMask/provider-engine/blob/master/subproviders/nonce-tracker.js).
 * We added the additional feature of clearing the cached nonce value when a `nonce value too low` error occurs.
 */
var NonceTrackerSubprovider = /** @class */ (function (_super) {
    __extends(NonceTrackerSubprovider, _super);
    function NonceTrackerSubprovider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._nonceCache = {};
        return _this;
    }
    NonceTrackerSubprovider._reconstructTransaction = function (payload) {
        var raw = payload.params[0];
        if (raw === undefined) {
            throw new Error(types_1.NonceSubproviderErrors.EmptyParametersFound);
        }
        var rawData = ethUtil.toBuffer(raw);
        var transaction = new EthereumTx(rawData);
        return transaction;
    };
    NonceTrackerSubprovider._determineAddress = function (payload) {
        var address;
        switch (payload.method) {
            case 'eth_getTransactionCount':
                address = payload.params[0].toLowerCase();
                return address;
            case 'eth_sendRawTransaction':
                var transaction = NonceTrackerSubprovider._reconstructTransaction(payload);
                var addressRaw = transaction
                    .getSenderAddress()
                    .toString('hex')
                    .toLowerCase();
                address = "0x" + addressRaw;
                return address;
            default:
                throw new Error(types_1.NonceSubproviderErrors.CannotDetermineAddressFromPayload);
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
    NonceTrackerSubprovider.prototype.handleRequest = function (payload, next, end) {
        return __awaiter(this, void 0, void 0, function () {
            var requestDefaultBlock, address_1, cachedResult;
            var _this = this;
            return __generator(this, function (_a) {
                switch (payload.method) {
                    case 'eth_getTransactionCount':
                        requestDefaultBlock = providerEngineUtils.blockTagForPayload(payload);
                        if (requestDefaultBlock === ethereum_types_1.BlockParamLiteral.Pending) {
                            address_1 = NonceTrackerSubprovider._determineAddress(payload);
                            cachedResult = this._nonceCache[address_1];
                            if (cachedResult !== undefined) {
                                return [2 /*return*/, end(null, cachedResult)];
                            }
                            else {
                                return [2 /*return*/, next(function (requestError, requestResult, cb) {
                                        if (requestError === null) {
                                            _this._nonceCache[address_1] = requestResult;
                                        }
                                        cb();
                                    })];
                            }
                        }
                        else {
                            return [2 /*return*/, next()];
                        }
                    case 'eth_sendRawTransaction':
                        return [2 /*return*/, next(function (sendTransactionError, _txResult, cb) {
                                if (sendTransactionError === null) {
                                    _this._handleSuccessfulTransaction(payload);
                                }
                                else {
                                    _this._handleSendTransactionError(payload, sendTransactionError);
                                }
                                cb();
                            })];
                    default:
                        return [2 /*return*/, next()];
                }
                return [2 /*return*/];
            });
        });
    };
    NonceTrackerSubprovider.prototype._handleSuccessfulTransaction = function (payload) {
        var address = NonceTrackerSubprovider._determineAddress(payload);
        var transaction = NonceTrackerSubprovider._reconstructTransaction(payload);
        // Increment the nonce from the previous successfully submitted transaction
        var nonce = ethUtil.bufferToInt(transaction.nonce);
        nonce++;
        var hexBase = 16;
        var nextHexNonce = nonce.toString(hexBase);
        if (nextHexNonce.length % 2) {
            nextHexNonce = "0" + nextHexNonce;
        }
        var nextPrefixedHexNonce = "0x" + nextHexNonce;
        this._nonceCache[address] = nextPrefixedHexNonce;
    };
    NonceTrackerSubprovider.prototype._handleSendTransactionError = function (payload, err) {
        var address = NonceTrackerSubprovider._determineAddress(payload);
        if (this._nonceCache[address] && _.includes(err.message, NONCE_TOO_LOW_ERROR_MESSAGE)) {
            delete this._nonceCache[address];
        }
    };
    return NonceTrackerSubprovider;
}(subprovider_1.Subprovider));
exports.NonceTrackerSubprovider = NonceTrackerSubprovider;
//# sourceMappingURL=nonce_tracker.js.map