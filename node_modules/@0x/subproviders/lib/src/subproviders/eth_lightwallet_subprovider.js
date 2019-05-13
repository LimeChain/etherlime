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
var base_wallet_subprovider_1 = require("./base_wallet_subprovider");
var private_key_wallet_1 = require("./private_key_wallet");
/*
 * This class implements the web3-provider-engine subprovider interface and forwards
 * requests involving user accounts and signing operations to eth-lightwallet
 *
 * Source: https://github.com/MetaMask/provider-engine/blob/master/subproviders/subprovider.js
 */
var EthLightwalletSubprovider = /** @class */ (function (_super) {
    __extends(EthLightwalletSubprovider, _super);
    /**
     * Instantiate an EthLightwalletSubprovider
     * @param keystore The EthLightWallet keystore you wish to use
     * @param pwDerivedKey The password derived key to use
     * @return EthLightwalletSubprovider instance
     */
    function EthLightwalletSubprovider(keystore, pwDerivedKey) {
        var _this = _super.call(this) || this;
        _this._keystore = keystore;
        _this._pwDerivedKey = pwDerivedKey;
        return _this;
    }
    /**
     * Retrieve the accounts associated with the eth-lightwallet instance.
     * This method is implicitly called when issuing a `eth_accounts` JSON RPC request
     * via your providerEngine instance.
     *
     * @return An array of accounts
     */
    EthLightwalletSubprovider.prototype.getAccountsAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var accounts;
            return __generator(this, function (_a) {
                accounts = this._keystore.getAddresses();
                return [2 /*return*/, accounts];
            });
        });
    };
    /**
     * Signs a transaction with the account specificed by the `from` field in txParams.
     * If you've added this Subprovider to your app's provider, you can simply send
     * an `eth_sendTransaction` JSON RPC request, and this method will be called auto-magically.
     * If you are not using this via a ProviderEngine instance, you can call it directly.
     * @param txParams Parameters of the transaction to sign
     * @return Signed transaction hex string
     */
    EthLightwalletSubprovider.prototype.signTransactionAsync = function (txParams) {
        return __awaiter(this, void 0, void 0, function () {
            var privateKey, privateKeyWallet, privateKeySignature;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        privateKey = this._keystore.exportPrivateKey(txParams.from, this._pwDerivedKey);
                        privateKeyWallet = new private_key_wallet_1.PrivateKeyWalletSubprovider(privateKey);
                        privateKey = '';
                        return [4 /*yield*/, privateKeyWallet.signTransactionAsync(txParams)];
                    case 1:
                        privateKeySignature = _a.sent();
                        return [2 /*return*/, privateKeySignature];
                }
            });
        });
    };
    /**
     * Sign a personal Ethereum signed message. The signing account will be the account
     * associated with the provided address.
     * If you've added this Subprovider to your app's provider, you can simply send an `eth_sign`
     * or `personal_sign` JSON RPC request, and this method will be called auto-magically.
     * If you are not using this via a ProviderEngine instance, you can call it directly.
     * @param data Hex string message to sign
     * @param address Address of the account to sign with
     * @return Signature hex string (order: rsv)
     */
    EthLightwalletSubprovider.prototype.signPersonalMessageAsync = function (data, address) {
        return __awaiter(this, void 0, void 0, function () {
            var privateKey, privateKeyWallet, result;
            return __generator(this, function (_a) {
                privateKey = this._keystore.exportPrivateKey(address, this._pwDerivedKey);
                privateKeyWallet = new private_key_wallet_1.PrivateKeyWalletSubprovider(privateKey);
                privateKey = '';
                result = privateKeyWallet.signPersonalMessageAsync(data, address);
                return [2 /*return*/, result];
            });
        });
    };
    /**
     * Sign an EIP712 Typed Data message. The signing address will associated with the provided address.
     * If you've added this Subprovider to your app's provider, you can simply send an `eth_signTypedData`
     * JSON RPC request, and this method will be called auto-magically.
     * If you are not using this via a ProviderEngine instance, you can call it directly.
     * @param address Address of the account to sign with
     * @param data the typed data object
     * @return Signature hex string (order: rsv)
     */
    EthLightwalletSubprovider.prototype.signTypedDataAsync = function (address, typedData) {
        return __awaiter(this, void 0, void 0, function () {
            var privateKey, privateKeyWallet, result;
            return __generator(this, function (_a) {
                privateKey = this._keystore.exportPrivateKey(address, this._pwDerivedKey);
                privateKeyWallet = new private_key_wallet_1.PrivateKeyWalletSubprovider(privateKey);
                privateKey = '';
                result = privateKeyWallet.signTypedDataAsync(address, typedData);
                return [2 /*return*/, result];
            });
        });
    };
    return EthLightwalletSubprovider;
}(base_wallet_subprovider_1.BaseWalletSubprovider));
exports.EthLightwalletSubprovider = EthLightwalletSubprovider;
//# sourceMappingURL=eth_lightwallet_subprovider.js.map