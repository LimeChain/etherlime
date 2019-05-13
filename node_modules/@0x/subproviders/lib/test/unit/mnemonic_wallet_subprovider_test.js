"use strict";
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("@0x/utils");
var chai = require("chai");
var ethUtils = require("ethereumjs-util");
var src_1 = require("../../src/");
var types_1 = require("../../src/types");
var chai_setup_1 = require("../chai_setup");
var fixture_data_1 = require("../utils/fixture_data");
var report_callback_errors_1 = require("../utils/report_callback_errors");
chai_setup_1.chaiSetup.configure();
var expect = chai.expect;
var DEFAULT_NUM_ACCOUNTS = 10;
describe('MnemonicWalletSubprovider', function () {
    var subprovider;
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            subprovider = new src_1.MnemonicWalletSubprovider({
                mnemonic: fixture_data_1.fixtureData.TEST_RPC_MNEMONIC,
                baseDerivationPath: fixture_data_1.fixtureData.TEST_RPC_MNEMONIC_BASE_DERIVATION_PATH,
            });
            return [2 /*return*/];
        });
    }); });
    describe('direct method calls', function () {
        describe('success cases', function () {
            it('returns the accounts', function () { return __awaiter(_this, void 0, void 0, function () {
                var accounts;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, subprovider.getAccountsAsync()];
                        case 1:
                            accounts = _a.sent();
                            expect(accounts[0]).to.be.equal(fixture_data_1.fixtureData.TEST_RPC_ACCOUNT_0);
                            expect(accounts[1]).to.be.equal(fixture_data_1.fixtureData.TEST_RPC_ACCOUNT_1);
                            expect(accounts.length).to.be.equal(DEFAULT_NUM_ACCOUNTS);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('signs a personal message', function () { return __awaiter(_this, void 0, void 0, function () {
                var data, ecSignatureHex;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            data = ethUtils.bufferToHex(ethUtils.toBuffer(fixture_data_1.fixtureData.PERSONAL_MESSAGE_STRING));
                            return [4 /*yield*/, subprovider.signPersonalMessageAsync(data, fixture_data_1.fixtureData.TEST_RPC_ACCOUNT_0)];
                        case 1:
                            ecSignatureHex = _a.sent();
                            expect(ecSignatureHex).to.be.equal(fixture_data_1.fixtureData.PERSONAL_MESSAGE_SIGNED_RESULT);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('signs a personal message with second address', function () { return __awaiter(_this, void 0, void 0, function () {
                var data, ecSignatureHex;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            data = ethUtils.bufferToHex(ethUtils.toBuffer(fixture_data_1.fixtureData.PERSONAL_MESSAGE_STRING));
                            return [4 /*yield*/, subprovider.signPersonalMessageAsync(data, fixture_data_1.fixtureData.TEST_RPC_ACCOUNT_1)];
                        case 1:
                            ecSignatureHex = _a.sent();
                            expect(ecSignatureHex).to.be.equal(fixture_data_1.fixtureData.PERSONAL_MESSAGE_ACCOUNT_1_SIGNED_RESULT);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('signs a transaction', function () { return __awaiter(_this, void 0, void 0, function () {
                var txHex;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, subprovider.signTransactionAsync(fixture_data_1.fixtureData.TX_DATA)];
                        case 1:
                            txHex = _a.sent();
                            expect(txHex).to.be.equal(fixture_data_1.fixtureData.TX_DATA_SIGNED_RESULT);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('signs a transaction with the second address', function () { return __awaiter(_this, void 0, void 0, function () {
                var txData, txHex;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            txData = __assign({}, fixture_data_1.fixtureData.TX_DATA, { from: fixture_data_1.fixtureData.TEST_RPC_ACCOUNT_1 });
                            return [4 /*yield*/, subprovider.signTransactionAsync(txData)];
                        case 1:
                            txHex = _a.sent();
                            expect(txHex).to.be.equal(fixture_data_1.fixtureData.TX_DATA_ACCOUNT_1_SIGNED_RESULT);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('signs an EIP712 sign typed data message', function () { return __awaiter(_this, void 0, void 0, function () {
                var signature;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, subprovider.signTypedDataAsync(fixture_data_1.fixtureData.TEST_RPC_ACCOUNT_0, fixture_data_1.fixtureData.EIP712_TEST_TYPED_DATA)];
                        case 1:
                            signature = _a.sent();
                            expect(signature).to.be.equal(fixture_data_1.fixtureData.EIP712_TEST_TYPED_DATA_SIGNED_RESULT);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('failure cases', function () {
            it('throws an error if address is invalid ', function () { return __awaiter(_this, void 0, void 0, function () {
                var txData;
                return __generator(this, function (_a) {
                    txData = __assign({}, fixture_data_1.fixtureData.TX_DATA, { from: '0x0' });
                    return [2 /*return*/, expect(subprovider.signTransactionAsync(txData)).to.be.rejectedWith(types_1.WalletSubproviderErrors.FromAddressMissingOrInvalid)];
                });
            }); });
            it('throws an error if address is valid format but not found', function () { return __awaiter(_this, void 0, void 0, function () {
                var txData;
                return __generator(this, function (_a) {
                    txData = __assign({}, fixture_data_1.fixtureData.TX_DATA, { from: fixture_data_1.fixtureData.NULL_ADDRESS });
                    return [2 /*return*/, expect(subprovider.signTransactionAsync(txData)).to.be.rejectedWith(types_1.WalletSubproviderErrors.AddressNotFound + ": " + fixture_data_1.fixtureData.NULL_ADDRESS)];
                });
            }); });
        });
    });
    describe('calls through a provider', function () {
        var provider;
        before(function () {
            provider = new src_1.Web3ProviderEngine();
            provider.addProvider(subprovider);
            var ganacheSubprovider = new src_1.GanacheSubprovider({});
            provider.addProvider(ganacheSubprovider);
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
            it('signs a personal message with eth_sign', function (done) {
                var messageHex = ethUtils.bufferToHex(ethUtils.toBuffer(fixture_data_1.fixtureData.PERSONAL_MESSAGE_STRING));
                var payload = {
                    jsonrpc: '2.0',
                    method: 'eth_sign',
                    params: [fixture_data_1.fixtureData.TEST_RPC_ACCOUNT_0, messageHex],
                    id: 1,
                };
                var callback = report_callback_errors_1.reportCallbackErrors(done)(function (err, response) {
                    expect(err).to.be.a('null');
                    expect(response.result).to.be.equal(fixture_data_1.fixtureData.PERSONAL_MESSAGE_SIGNED_RESULT);
                    done();
                });
                provider.sendAsync(payload, callback);
            });
            it('signs a personal message with personal_sign', function (done) {
                var messageHex = ethUtils.bufferToHex(ethUtils.toBuffer(fixture_data_1.fixtureData.PERSONAL_MESSAGE_STRING));
                var payload = {
                    jsonrpc: '2.0',
                    method: 'personal_sign',
                    params: [messageHex, fixture_data_1.fixtureData.TEST_RPC_ACCOUNT_0],
                    id: 1,
                };
                var callback = report_callback_errors_1.reportCallbackErrors(done)(function (err, response) {
                    expect(err).to.be.a('null');
                    expect(response.result).to.be.equal(fixture_data_1.fixtureData.PERSONAL_MESSAGE_SIGNED_RESULT);
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
            it('should throw if `address` param not found when calling personal_sign', function (done) {
                var messageHex = ethUtils.bufferToHex(ethUtils.toBuffer(fixture_data_1.fixtureData.PERSONAL_MESSAGE_STRING));
                var payload = {
                    jsonrpc: '2.0',
                    method: 'personal_sign',
                    params: [messageHex, fixture_data_1.fixtureData.NULL_ADDRESS],
                    id: 1,
                };
                var callback = report_callback_errors_1.reportCallbackErrors(done)(function (err, _response) {
                    expect(err).to.not.be.a('null');
                    expect(err.message).to.be.equal(types_1.WalletSubproviderErrors.AddressNotFound + ": " + fixture_data_1.fixtureData.NULL_ADDRESS);
                    done();
                });
                provider.sendAsync(payload, callback);
            });
            it('should throw if `from` param missing when calling eth_sendTransaction', function (done) {
                var tx = {
                    to: '0xafa3f8684e54059998bc3a7b0d2b0da075154d66',
                    value: '0xde0b6b3a7640000',
                };
                var payload = {
                    jsonrpc: '2.0',
                    method: 'eth_sendTransaction',
                    params: [tx],
                    id: 1,
                };
                var callback = report_callback_errors_1.reportCallbackErrors(done)(function (err, _response) {
                    expect(err).to.not.be.a('null');
                    expect(err.message).to.be.equal(types_1.WalletSubproviderErrors.SenderInvalidOrNotSupplied);
                    done();
                });
                provider.sendAsync(payload, callback);
            });
            it('should throw if `from` param invalid address when calling eth_sendTransaction', function (done) {
                var tx = {
                    to: '0xafa3f8684e54059998bc3a7b0d2b0da075154d66',
                    from: '0xIncorrectEthereumAddress',
                    value: '0xde0b6b3a7640000',
                };
                var payload = {
                    jsonrpc: '2.0',
                    method: 'eth_sendTransaction',
                    params: [tx],
                    id: 1,
                };
                var callback = report_callback_errors_1.reportCallbackErrors(done)(function (err, _response) {
                    expect(err).to.not.be.a('null');
                    expect(err.message).to.be.equal(types_1.WalletSubproviderErrors.SenderInvalidOrNotSupplied);
                    done();
                });
                provider.sendAsync(payload, callback);
            });
        });
    });
});
//# sourceMappingURL=mnemonic_wallet_subprovider_test.js.map