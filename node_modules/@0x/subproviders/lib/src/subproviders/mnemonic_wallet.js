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
var bip39 = require("bip39");
var HDNode = require("hdkey");
var _ = require("lodash");
var types_1 = require("../types");
var wallet_utils_1 = require("../utils/wallet_utils");
var base_wallet_subprovider_1 = require("./base_wallet_subprovider");
var private_key_wallet_1 = require("./private_key_wallet");
var DEFAULT_BASE_DERIVATION_PATH = "44'/60'/0'/0";
var DEFAULT_NUM_ADDRESSES_TO_FETCH = 10;
var DEFAULT_ADDRESS_SEARCH_LIMIT = 1000;
/**
 * This class implements the [web3-provider-engine](https://github.com/MetaMask/provider-engine) subprovider interface.
 * This subprovider intercepts all account related RPC requests (e.g message/transaction signing, etc...) and handles
 * all requests with accounts derived from the supplied mnemonic.
 */
var MnemonicWalletSubprovider = /** @class */ (function (_super) {
    __extends(MnemonicWalletSubprovider, _super);
    /**
     * Instantiates a MnemonicWalletSubprovider. Defaults to baseDerivationPath set to `44'/60'/0'/0`.
     * This is the default in TestRPC/Ganache, it can be overridden if desired.
     * @param config Configuration for the mnemonic wallet, must contain the mnemonic
     * @return MnemonicWalletSubprovider instance
     */
    function MnemonicWalletSubprovider(config) {
        var _this = this;
        assert_1.assert.isString('mnemonic', config.mnemonic);
        var baseDerivationPath = config.baseDerivationPath || DEFAULT_BASE_DERIVATION_PATH;
        assert_1.assert.isString('baseDerivationPath', baseDerivationPath);
        var addressSearchLimit = config.addressSearchLimit || DEFAULT_ADDRESS_SEARCH_LIMIT;
        assert_1.assert.isNumber('addressSearchLimit', addressSearchLimit);
        _this = _super.call(this) || this;
        _this._mnemonic = config.mnemonic;
        _this._baseDerivationPath = baseDerivationPath;
        _this._addressSearchLimit = addressSearchLimit;
        _this._derivedKeyInfo = _this._initialDerivedKeyInfo(_this._baseDerivationPath);
        return _this;
    }
    /**
     * Retrieve the set derivation path
     * @returns derivation path
     */
    MnemonicWalletSubprovider.prototype.getPath = function () {
        return this._baseDerivationPath;
    };
    /**
     * Set a desired derivation path when computing the available user addresses
     * @param baseDerivationPath The desired derivation path (e.g `44'/60'/0'`)
     */
    MnemonicWalletSubprovider.prototype.setPath = function (baseDerivationPath) {
        this._baseDerivationPath = baseDerivationPath;
        this._derivedKeyInfo = this._initialDerivedKeyInfo(this._baseDerivationPath);
    };
    /**
     * Retrieve the accounts associated with the mnemonic.
     * This method is implicitly called when issuing a `eth_accounts` JSON RPC request
     * via your providerEngine instance.
     * @param numberOfAccounts Number of accounts to retrieve (default: 10)
     * @return An array of accounts
     */
    MnemonicWalletSubprovider.prototype.getAccountsAsync = function (numberOfAccounts) {
        if (numberOfAccounts === void 0) { numberOfAccounts = DEFAULT_NUM_ADDRESSES_TO_FETCH; }
        return __awaiter(this, void 0, void 0, function () {
            var derivedKeys, accounts;
            return __generator(this, function (_a) {
                derivedKeys = wallet_utils_1.walletUtils.calculateDerivedHDKeyInfos(this._derivedKeyInfo, numberOfAccounts);
                accounts = _.map(derivedKeys, function (k) { return k.address; });
                return [2 /*return*/, accounts];
            });
        });
    };
    /**
     * Signs a transaction with the account specificed by the `from` field in txParams.
     * If you've added this Subprovider to your  app's provider, you can simply send
     * an `eth_sendTransaction` JSON RPC request, and this method will be called auto-magically.
     * If you are not using this via a ProviderEngine instance, you can call it directly.
     * @param txParams Parameters of the transaction to sign
     * @return Signed transaction hex string
     */
    MnemonicWalletSubprovider.prototype.signTransactionAsync = function (txParams) {
        return __awaiter(this, void 0, void 0, function () {
            var privateKeyWallet, signedTx;
            return __generator(this, function (_a) {
                if (txParams.from === undefined || !utils_1.addressUtils.isAddress(txParams.from)) {
                    throw new Error(types_1.WalletSubproviderErrors.FromAddressMissingOrInvalid);
                }
                privateKeyWallet = this._privateKeyWalletForAddress(txParams.from);
                signedTx = privateKeyWallet.signTransactionAsync(txParams);
                return [2 /*return*/, signedTx];
            });
        });
    };
    /**
     * Sign a personal Ethereum signed message. The signing account will be the account
     * associated with the provided address. If you've added the MnemonicWalletSubprovider to
     * your app's provider, you can simply send an `eth_sign` or `personal_sign` JSON RPC request,
     * and this method will be called auto-magically. If you are not using this via a ProviderEngine
     * instance, you can call it directly.
     * @param data Hex string message to sign
     * @param address Address of the account to sign with
     * @return Signature hex string (order: rsv)
     */
    MnemonicWalletSubprovider.prototype.signPersonalMessageAsync = function (data, address) {
        return __awaiter(this, void 0, void 0, function () {
            var privateKeyWallet, sig;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (data === undefined) {
                            throw new Error(types_1.WalletSubproviderErrors.DataMissingForSignPersonalMessage);
                        }
                        assert_1.assert.isHexString('data', data);
                        assert_1.assert.isETHAddressHex('address', address);
                        privateKeyWallet = this._privateKeyWalletForAddress(address);
                        return [4 /*yield*/, privateKeyWallet.signPersonalMessageAsync(data, address)];
                    case 1:
                        sig = _a.sent();
                        return [2 /*return*/, sig];
                }
            });
        });
    };
    /**
     * Sign an EIP712 Typed Data message. The signing account will be the account
     * associated with the provided address. If you've added this MnemonicWalletSubprovider to
     * your app's provider, you can simply send an `eth_signTypedData` JSON RPC request, and
     * this method will be called auto-magically. If you are not using this via a ProviderEngine
     *  instance, you can call it directly.
     * @param address Address of the account to sign with
     * @param data the typed data object
     * @return Signature hex string (order: rsv)
     */
    MnemonicWalletSubprovider.prototype.signTypedDataAsync = function (address, typedData) {
        return __awaiter(this, void 0, void 0, function () {
            var privateKeyWallet, sig;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typedData === undefined) {
                            throw new Error(types_1.WalletSubproviderErrors.DataMissingForSignPersonalMessage);
                        }
                        assert_1.assert.isETHAddressHex('address', address);
                        privateKeyWallet = this._privateKeyWalletForAddress(address);
                        return [4 /*yield*/, privateKeyWallet.signTypedDataAsync(address, typedData)];
                    case 1:
                        sig = _a.sent();
                        return [2 /*return*/, sig];
                }
            });
        });
    };
    MnemonicWalletSubprovider.prototype._privateKeyWalletForAddress = function (address) {
        var derivedKeyInfo = this._findDerivedKeyInfoForAddress(address);
        var privateKeyHex = derivedKeyInfo.hdKey.privateKey.toString('hex');
        var privateKeyWallet = new private_key_wallet_1.PrivateKeyWalletSubprovider(privateKeyHex);
        return privateKeyWallet;
    };
    MnemonicWalletSubprovider.prototype._findDerivedKeyInfoForAddress = function (address) {
        var matchedDerivedKeyInfo = wallet_utils_1.walletUtils.findDerivedKeyInfoForAddressIfExists(address, this._derivedKeyInfo, this._addressSearchLimit);
        if (matchedDerivedKeyInfo === undefined) {
            throw new Error(types_1.WalletSubproviderErrors.AddressNotFound + ": " + address);
        }
        return matchedDerivedKeyInfo;
    };
    MnemonicWalletSubprovider.prototype._initialDerivedKeyInfo = function (baseDerivationPath) {
        var seed = bip39.mnemonicToSeed(this._mnemonic);
        var hdKey = HDNode.fromMasterSeed(seed);
        // Walk down to base derivation level (i.e m/44'/60'/0') and create an initial key at that level
        // all children will then be walked relative (i.e m/0)
        var parentKeyDerivationPath = "m/" + baseDerivationPath;
        var parentHDKeyAtDerivationPath = hdKey.derive(parentKeyDerivationPath);
        var address = wallet_utils_1.walletUtils.addressOfHDKey(parentHDKeyAtDerivationPath);
        var derivedKeyInfo = {
            address: address,
            baseDerivationPath: baseDerivationPath,
            derivationPath: parentKeyDerivationPath,
            hdKey: parentHDKeyAtDerivationPath,
        };
        return derivedKeyInfo;
    };
    return MnemonicWalletSubprovider;
}(base_wallet_subprovider_1.BaseWalletSubprovider));
exports.MnemonicWalletSubprovider = MnemonicWalletSubprovider;
//# sourceMappingURL=mnemonic_wallet.js.map