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
var assert_1 = require("@0x/assert");
var utils_1 = require("@0x/utils");
var EthereumTx = require("ethereumjs-tx");
var ethUtil = require("ethereumjs-util");
var HDNode = require("hdkey");
var _ = require("lodash");
var semaphore_async_await_1 = require("semaphore-async-await");
var types_1 = require("../types");
var wallet_utils_1 = require("../utils/wallet_utils");
var base_wallet_subprovider_1 = require("./base_wallet_subprovider");
var DEFAULT_BASE_DERIVATION_PATH = "44'/60'/0'";
var ASK_FOR_ON_DEVICE_CONFIRMATION = false;
var SHOULD_GET_CHAIN_CODE = true;
var DEFAULT_NUM_ADDRESSES_TO_FETCH = 10;
var DEFAULT_ADDRESS_SEARCH_LIMIT = 1000;
/**
 * Subprovider for interfacing with a user's [Ledger Nano S](https://www.ledgerwallet.com/products/ledger-nano-s).
 * This subprovider intercepts all account related RPC requests (e.g message/transaction signing, etc...) and
 * re-routes them to a Ledger device plugged into the users computer.
 */
var LedgerSubprovider = /** @class */ (function (_super) {
    __extends(LedgerSubprovider, _super);
    /**
     * Instantiates a LedgerSubprovider. Defaults to derivationPath set to `44'/60'/0'`.
     * TestRPC/Ganache defaults to `m/44'/60'/0'/0`, so set this in the configs if desired.
     * @param config Several available configurations
     * @return LedgerSubprovider instance
     */
    function LedgerSubprovider(config) {
        var _this = _super.call(this) || this;
        // tslint:disable-next-line:no-unused-variable
        _this._connectionLock = new semaphore_async_await_1.Lock();
        _this._networkId = config.networkId;
        _this._ledgerEthereumClientFactoryAsync = config.ledgerEthereumClientFactoryAsync;
        _this._baseDerivationPath = config.baseDerivationPath || DEFAULT_BASE_DERIVATION_PATH;
        _this._shouldAlwaysAskForConfirmation =
            config.accountFetchingConfigs !== undefined &&
                config.accountFetchingConfigs.shouldAskForOnDeviceConfirmation !== undefined
                ? config.accountFetchingConfigs.shouldAskForOnDeviceConfirmation
                : ASK_FOR_ON_DEVICE_CONFIRMATION;
        _this._addressSearchLimit =
            config.accountFetchingConfigs !== undefined &&
                config.accountFetchingConfigs.addressSearchLimit !== undefined
                ? config.accountFetchingConfigs.addressSearchLimit
                : DEFAULT_ADDRESS_SEARCH_LIMIT;
        return _this;
    }
    /**
     * Retrieve the set derivation path
     * @returns derivation path
     */
    LedgerSubprovider.prototype.getPath = function () {
        return this._baseDerivationPath;
    };
    /**
     * Set a desired derivation path when computing the available user addresses
     * @param basDerivationPath The desired derivation path (e.g `44'/60'/0'`)
     */
    LedgerSubprovider.prototype.setPath = function (basDerivationPath) {
        this._baseDerivationPath = basDerivationPath;
    };
    /**
     * Retrieve a users Ledger accounts. The accounts are derived from the derivationPath,
     * master public key and chain code. Because of this, you can request as many accounts
     * as you wish and it only requires a single request to the Ledger device. This method
     * is automatically called when issuing a `eth_accounts` JSON RPC request via your providerEngine
     * instance.
     * @param numberOfAccounts Number of accounts to retrieve (default: 10)
     * @return An array of accounts
     */
    LedgerSubprovider.prototype.getAccountsAsync = function (numberOfAccounts) {
        if (numberOfAccounts === void 0) { numberOfAccounts = DEFAULT_NUM_ADDRESSES_TO_FETCH; }
        return __awaiter(this, void 0, void 0, function () {
            var initialDerivedKeyInfo, derivedKeyInfos, accounts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._initialDerivedKeyInfoAsync()];
                    case 1:
                        initialDerivedKeyInfo = _a.sent();
                        derivedKeyInfos = wallet_utils_1.walletUtils.calculateDerivedHDKeyInfos(initialDerivedKeyInfo, numberOfAccounts);
                        accounts = _.map(derivedKeyInfos, function (k) { return k.address; });
                        return [2 /*return*/, accounts];
                }
            });
        });
    };
    /**
     * Signs a transaction on the Ledger with the account specificed by the `from` field in txParams.
     * If you've added the LedgerSubprovider to your app's provider, you can simply send an `eth_sendTransaction`
     * JSON RPC request, and this method will be called auto-magically. If you are not using this via a ProviderEngine
     * instance, you can call it directly.
     * @param txParams Parameters of the transaction to sign
     * @return Signed transaction hex string
     */
    LedgerSubprovider.prototype.signTransactionAsync = function (txParams) {
        return __awaiter(this, void 0, void 0, function () {
            var initialDerivedKeyInfo, derivedKeyInfo, _a, tx, vIndex, rIndex, sIndex, txHex, fullDerivationPath, result, eip55Constant, signedChainId, err, signedTxHex, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        LedgerSubprovider._validateTxParams(txParams);
                        if (txParams.from === undefined || !utils_1.addressUtils.isAddress(txParams.from)) {
                            throw new Error(types_1.WalletSubproviderErrors.FromAddressMissingOrInvalid);
                        }
                        return [4 /*yield*/, this._initialDerivedKeyInfoAsync()];
                    case 1:
                        initialDerivedKeyInfo = _b.sent();
                        derivedKeyInfo = this._findDerivedKeyInfoForAddress(initialDerivedKeyInfo, txParams.from);
                        _a = this;
                        return [4 /*yield*/, this._createLedgerClientAsync()];
                    case 2:
                        _a._ledgerClientIfExists = _b.sent();
                        tx = new EthereumTx(txParams);
                        vIndex = 6;
                        tx.raw[vIndex] = Buffer.from([this._networkId]); // v
                        rIndex = 7;
                        tx.raw[rIndex] = Buffer.from([]); // r
                        sIndex = 8;
                        tx.raw[sIndex] = Buffer.from([]); // s
                        txHex = tx.serialize().toString('hex');
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 8, , 10]);
                        fullDerivationPath = derivedKeyInfo.derivationPath;
                        return [4 /*yield*/, this._ledgerClientIfExists.signTransaction(fullDerivationPath, txHex)];
                    case 4:
                        result = _b.sent();
                        // Store signature in transaction
                        tx.r = Buffer.from(result.r, 'hex');
                        tx.s = Buffer.from(result.s, 'hex');
                        tx.v = Buffer.from(result.v, 'hex');
                        eip55Constant = 35;
                        signedChainId = Math.floor((tx.v[0] - eip55Constant) / 2);
                        if (!(signedChainId !== this._networkId)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this._destroyLedgerClientAsync()];
                    case 5:
                        _b.sent();
                        err = new Error(types_1.LedgerSubproviderErrors.TooOldLedgerFirmware);
                        throw err;
                    case 6:
                        signedTxHex = "0x" + tx.serialize().toString('hex');
                        return [4 /*yield*/, this._destroyLedgerClientAsync()];
                    case 7:
                        _b.sent();
                        return [2 /*return*/, signedTxHex];
                    case 8:
                        err_1 = _b.sent();
                        return [4 /*yield*/, this._destroyLedgerClientAsync()];
                    case 9:
                        _b.sent();
                        throw err_1;
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Sign a personal Ethereum signed message. The signing account will be the account
     * associated with the provided address.
     * The Ledger adds the Ethereum signed message prefix on-device.  If you've added
     * the LedgerSubprovider to your app's provider, you can simply send an `eth_sign`
     * or `personal_sign` JSON RPC request, and this method will be called auto-magically.
     * If you are not using this via a ProviderEngine instance, you can call it directly.
     * @param data Hex string message to sign
     * @param address Address of the account to sign with
     * @return Signature hex string (order: rsv)
     */
    LedgerSubprovider.prototype.signPersonalMessageAsync = function (data, address) {
        return __awaiter(this, void 0, void 0, function () {
            var initialDerivedKeyInfo, derivedKeyInfo, _a, fullDerivationPath, result, lowestValidV, v, hexBase, vHex, signature, err_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (data === undefined) {
                            throw new Error(types_1.WalletSubproviderErrors.DataMissingForSignPersonalMessage);
                        }
                        assert_1.assert.isHexString('data', data);
                        assert_1.assert.isETHAddressHex('address', address);
                        return [4 /*yield*/, this._initialDerivedKeyInfoAsync()];
                    case 1:
                        initialDerivedKeyInfo = _b.sent();
                        derivedKeyInfo = this._findDerivedKeyInfoForAddress(initialDerivedKeyInfo, address);
                        _a = this;
                        return [4 /*yield*/, this._createLedgerClientAsync()];
                    case 2:
                        _a._ledgerClientIfExists = _b.sent();
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 6, , 8]);
                        fullDerivationPath = derivedKeyInfo.derivationPath;
                        return [4 /*yield*/, this._ledgerClientIfExists.signPersonalMessage(fullDerivationPath, ethUtil.stripHexPrefix(data))];
                    case 4:
                        result = _b.sent();
                        lowestValidV = 27;
                        v = result.v - lowestValidV;
                        hexBase = 16;
                        vHex = v.toString(hexBase);
                        if (vHex.length < 2) {
                            vHex = "0" + v;
                        }
                        signature = "0x" + result.r + result.s + vHex;
                        return [4 /*yield*/, this._destroyLedgerClientAsync()];
                    case 5:
                        _b.sent();
                        return [2 /*return*/, signature];
                    case 6:
                        err_2 = _b.sent();
                        return [4 /*yield*/, this._destroyLedgerClientAsync()];
                    case 7:
                        _b.sent();
                        throw err_2;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * eth_signTypedData is currently not supported on Ledger devices.
     * @param address Address of the account to sign with
     * @param data the typed data object
     * @return Signature hex string (order: rsv)
     */
    // tslint:disable-next-line:prefer-function-over-method
    LedgerSubprovider.prototype.signTypedDataAsync = function (address, typedData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error(types_1.WalletSubproviderErrors.MethodNotSupported);
            });
        });
    };
    LedgerSubprovider.prototype._createLedgerClientAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ledgerEthereumClient;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._connectionLock.acquire()];
                    case 1:
                        _a.sent();
                        if (this._ledgerClientIfExists !== undefined) {
                            this._connectionLock.release();
                            throw new Error(types_1.LedgerSubproviderErrors.MultipleOpenConnectionsDisallowed);
                        }
                        return [4 /*yield*/, this._ledgerEthereumClientFactoryAsync()];
                    case 2:
                        ledgerEthereumClient = _a.sent();
                        this._connectionLock.release();
                        return [2 /*return*/, ledgerEthereumClient];
                }
            });
        });
    };
    LedgerSubprovider.prototype._destroyLedgerClientAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._connectionLock.acquire()];
                    case 1:
                        _a.sent();
                        if (this._ledgerClientIfExists === undefined) {
                            this._connectionLock.release();
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this._ledgerClientIfExists.transport.close()];
                    case 2:
                        _a.sent();
                        this._ledgerClientIfExists = undefined;
                        this._connectionLock.release();
                        return [2 /*return*/];
                }
            });
        });
    };
    LedgerSubprovider.prototype._initialDerivedKeyInfoAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, parentKeyDerivationPath, ledgerResponse, hdKey, address, initialDerivedKeyInfo;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._createLedgerClientAsync()];
                    case 1:
                        _a._ledgerClientIfExists = _b.sent();
                        parentKeyDerivationPath = "m/" + this._baseDerivationPath;
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, , 4, 6]);
                        return [4 /*yield*/, this._ledgerClientIfExists.getAddress(parentKeyDerivationPath, this._shouldAlwaysAskForConfirmation, SHOULD_GET_CHAIN_CODE)];
                    case 3:
                        ledgerResponse = _b.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, this._destroyLedgerClientAsync()];
                    case 5:
                        _b.sent();
                        return [7 /*endfinally*/];
                    case 6:
                        hdKey = new HDNode();
                        hdKey.publicKey = new Buffer(ledgerResponse.publicKey, 'hex');
                        hdKey.chainCode = new Buffer(ledgerResponse.chainCode, 'hex');
                        address = wallet_utils_1.walletUtils.addressOfHDKey(hdKey);
                        initialDerivedKeyInfo = {
                            hdKey: hdKey,
                            address: address,
                            derivationPath: parentKeyDerivationPath,
                            baseDerivationPath: this._baseDerivationPath,
                        };
                        return [2 /*return*/, initialDerivedKeyInfo];
                }
            });
        });
    };
    LedgerSubprovider.prototype._findDerivedKeyInfoForAddress = function (initalHDKey, address) {
        var matchedDerivedKeyInfo = wallet_utils_1.walletUtils.findDerivedKeyInfoForAddressIfExists(address, initalHDKey, this._addressSearchLimit);
        if (matchedDerivedKeyInfo === undefined) {
            throw new Error(types_1.WalletSubproviderErrors.AddressNotFound + ": " + address);
        }
        return matchedDerivedKeyInfo;
    };
    return LedgerSubprovider;
}(base_wallet_subprovider_1.BaseWalletSubprovider));
exports.LedgerSubprovider = LedgerSubprovider;
//# sourceMappingURL=ledger.js.map