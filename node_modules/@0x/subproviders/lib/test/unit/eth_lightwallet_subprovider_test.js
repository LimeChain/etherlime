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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("@0x/utils");
var chai = require("chai");
var lightwallet = require("eth-lightwallet");
var ethUtils = require("ethereumjs-util");
var src_1 = require("../../src");
var chai_setup_1 = require("../chai_setup");
var fixture_data_1 = require("../utils/fixture_data");
var ganache_subprovider_1 = require("../utils/ganache_subprovider");
var report_callback_errors_1 = require("../utils/report_callback_errors");
chai_setup_1.chaiSetup.configure();
var expect = chai.expect;
var DEFAULT_NUM_ACCOUNTS = 10;
var PASSWORD = 'supersecretpassword99';
var SALT = 'kvODghzs7Ff1uqHyI0P3wI4Hso4w4iWT2e9qmrWz0y4';
describe('EthLightwalletSubprovider', function () {
    var ethLightwalletSubprovider;
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        var options, createVaultAsync, deriveKeyFromPasswordAsync, keystore, pwDerivedKey;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    options = {
                        password: PASSWORD,
                        seedPhrase: fixture_data_1.fixtureData.TEST_RPC_MNEMONIC,
                        salt: SALT,
                        hdPathString: fixture_data_1.fixtureData.TESTRPC_BASE_DERIVATION_PATH,
                    };
                    createVaultAsync = function (vaultOptions) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            return [2 /*return*/, new Promise(function (resolve) {
                                    lightwallet.keystore.createVault(vaultOptions, function (err, vaultKeystore) {
                                        if (err) {
                                            throw new Error("Failed to createVault: " + err);
                                        }
                                        resolve(vaultKeystore);
                                    });
                                })];
                        });
                    }); };
                    deriveKeyFromPasswordAsync = function (vaultKeystore) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            return [2 /*return*/, new Promise(function (resolve) {
                                    vaultKeystore.keyFromPassword(PASSWORD, function (err, passwordDerivedKey) {
                                        if (err) {
                                            throw new Error("Failed to get key from password: " + err);
                                        }
                                        resolve(passwordDerivedKey);
                                    });
                                })];
                        });
                    }); };
                    return [4 /*yield*/, createVaultAsync(options)];
                case 1:
                    keystore = _a.sent();
                    return [4 /*yield*/, deriveKeyFromPasswordAsync(keystore)];
                case 2:
                    pwDerivedKey = _a.sent();
                    // Generate 10 addresses
                    keystore.generateNewAddress(pwDerivedKey, DEFAULT_NUM_ACCOUNTS);
                    ethLightwalletSubprovider = new src_1.EthLightwalletSubprovider(keystore, pwDerivedKey);
                    return [2 /*return*/];
            }
        });
    }); });
    describe('direct method calls', function () {
        describe('success cases', function () {
            it('returns a list of accounts', function () { return __awaiter(_this, void 0, void 0, function () {
                var accounts;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, ethLightwalletSubprovider.getAccountsAsync()];
                        case 1:
                            accounts = _a.sent();
                            expect(accounts[0]).to.be.equal(fixture_data_1.fixtureData.TEST_RPC_ACCOUNT_0);
                            expect(accounts[1]).to.be.equal(fixture_data_1.fixtureData.TEST_RPC_ACCOUNT_1);
                            expect(accounts.length).to.be.equal(DEFAULT_NUM_ACCOUNTS);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('signs a personal message hash', function () { return __awaiter(_this, void 0, void 0, function () {
                var accounts, signingAccount, data, ecSignatureHex;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, ethLightwalletSubprovider.getAccountsAsync()];
                        case 1:
                            accounts = _a.sent();
                            signingAccount = accounts[0];
                            data = ethUtils.bufferToHex(ethUtils.toBuffer(fixture_data_1.fixtureData.PERSONAL_MESSAGE_STRING));
                            return [4 /*yield*/, ethLightwalletSubprovider.signPersonalMessageAsync(data, signingAccount)];
                        case 2:
                            ecSignatureHex = _a.sent();
                            expect(ecSignatureHex).to.be.equal(fixture_data_1.fixtureData.PERSONAL_MESSAGE_SIGNED_RESULT);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('signs a transaction', function () { return __awaiter(_this, void 0, void 0, function () {
                var txHex;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, ethLightwalletSubprovider.signTransactionAsync(fixture_data_1.fixtureData.TX_DATA)];
                        case 1:
                            txHex = _a.sent();
                            expect(txHex).to.be.equal(fixture_data_1.fixtureData.TX_DATA_SIGNED_RESULT);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('signs an EIP712 sign typed data message', function () { return __awaiter(_this, void 0, void 0, function () {
                var signature;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, ethLightwalletSubprovider.signTypedDataAsync(fixture_data_1.fixtureData.TEST_RPC_ACCOUNT_0, fixture_data_1.fixtureData.EIP712_TEST_TYPED_DATA)];
                        case 1:
                            signature = _a.sent();
                            expect(signature).to.be.equal(fixture_data_1.fixtureData.EIP712_TEST_TYPED_DATA_SIGNED_RESULT);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
    describe('calls through a provider', function () {
        var provider;
        before(function () {
            provider = new src_1.Web3ProviderEngine();
            provider.addProvider(ethLightwalletSubprovider);
            provider.addProvider(ganache_subprovider_1.ganacheSubprovider);
            utils_1.providerUtils.startProviderEngine(provider);
        });
        describe('success cases', function () {
            it('returns a list of accounts', function (done) {
                var payload = {
                    jsonrpc: '2.0',
                    method: 'eth_accounts',
                    params: [],
                    id: 1,
                };
                var callback = report_callback_errors_1.reportCallbackErrors(done)(function (err, response) {
                    expect(err).to.be.a('null');
                    expect(response.result[0]).to.be.equal(fixture_data_1.fixtureData.TEST_RPC_ACCOUNT_0);
                    expect(response.result.length).to.be.equal(DEFAULT_NUM_ACCOUNTS);
                    done();
                });
                provider.sendAsync(payload, callback);
            });
            it('signs a personal message hash with eth_sign', function (done) {
                var data = ethUtils.bufferToHex(ethUtils.toBuffer(fixture_data_1.fixtureData.PERSONAL_MESSAGE_STRING));
                var account = fixture_data_1.fixtureData.TEST_RPC_ACCOUNT_0;
                var payload = {
                    jsonrpc: '2.0',
                    method: 'eth_sign',
                    params: [account, data],
                    id: 1,
                };
                var callback = report_callback_errors_1.reportCallbackErrors(done)(function (err, response) {
                    expect(err).to.be.a('null');
                    expect(response.result).to.be.equal(fixture_data_1.fixtureData.PERSONAL_MESSAGE_SIGNED_RESULT);
                    done();
                });
                provider.sendAsync(payload, callback);
            });
            it('signs a transaction', function (done) {
                var payload = {
                    jsonrpc: '2.0',
                    method: 'eth_signTransaction',
                    params: [fixture_data_1.fixtureData.TX_DATA],
                    id: 1,
                };
                var callback = report_callback_errors_1.reportCallbackErrors(done)(function (err, response) {
                    expect(err).to.be.a('null');
                    expect(response.result.raw).to.be.equal(fixture_data_1.fixtureData.TX_DATA_SIGNED_RESULT);
                    done();
                });
                provider.sendAsync(payload, callback);
            });
            it('signs an EIP712 sign typed data message with eth_signTypedData', function (done) {
                var payload = {
                    jsonrpc: '2.0',
                    method: 'eth_signTypedData',
                    params: [fixture_data_1.fixtureData.TEST_RPC_ACCOUNT_0, fixture_data_1.fixtureData.EIP712_TEST_TYPED_DATA],
                    id: 1,
                };
                var callback = report_callback_errors_1.reportCallbackErrors(done)(function (err, response) {
                    expect(err).to.be.a('null');
                    expect(response.result).to.be.equal(fixture_data_1.fixtureData.EIP712_TEST_TYPED_DATA_SIGNED_RESULT);
                    done();
                });
                provider.sendAsync(payload, callback);
            });
        });
        describe('failure cases', function () {
            it('should throw if `data` param not hex when calling eth_sign', function (done) {
                var nonHexMessage = 'hello world';
                var payload = {
                    jsonrpc: '2.0',
                    method: 'eth_sign',
                    params: [fixture_data_1.fixtureData.TEST_RPC_ACCOUNT_0, nonHexMessage],
                    id: 1,
                };
                var callback = report_callback_errors_1.reportCallbackErrors(done)(function (err, _response) {
                    expect(err).to.not.be.a('null');
                    expect(err.message).to.be.equal('Expected data to be of type HexString, encountered: hello world');
                    done();
                });
                provider.sendAsync(payload, callback);
            });
            it('should throw if `data` param not hex when calling personal_sign', function (done) {
                var nonHexMessage = 'hello world';
                var payload = {
                    jsonrpc: '2.0',
                    method: 'personal_sign',
                    params: [nonHexMessage, fixture_data_1.fixtureData.TEST_RPC_ACCOUNT_0],
                    id: 1,
                };
                var callback = report_callback_errors_1.reportCallbackErrors(done)(function (err, _response) {
                    expect(err).to.not.be.a('null');
                    expect(err.message).to.be.equal('Expected data to be of type HexString, encountered: hello world');
                    done();
                });
                provider.sendAsync(payload, callback);
            });
        });
    });
});
//# sourceMappingURL=eth_lightwallet_subprovider_test.js.map