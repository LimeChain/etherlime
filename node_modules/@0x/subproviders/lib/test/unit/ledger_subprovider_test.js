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
var ethUtils = require("ethereumjs-util");
var _ = require("lodash");
var src_1 = require("../../src");
var types_1 = require("../../src/types");
var chai_setup_1 = require("../chai_setup");
var fixture_data_1 = require("../utils/fixture_data");
var ganache_subprovider_1 = require("../utils/ganache_subprovider");
var report_callback_errors_1 = require("../utils/report_callback_errors");
chai_setup_1.chaiSetup.configure();
var expect = chai.expect;
var FAKE_ADDRESS = '0xb088a3bc93f71b4de97b9de773e9647645983688';
var DEFAULT_NUM_ACCOUNTS = 10;
describe('LedgerSubprovider', function () {
    var networkId = 42;
    var ledgerSubprovider;
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        var ledgerEthereumClientFactoryAsync;
        var _this = this;
        return __generator(this, function (_a) {
            ledgerEthereumClientFactoryAsync = function () { return __awaiter(_this, void 0, void 0, function () {
                var ledgerEthClient;
                var _this = this;
                return __generator(this, function (_a) {
                    ledgerEthClient = {
                        getAddress: function () { return __awaiter(_this, void 0, void 0, function () {
                            var publicKey, chainCode, address;
                            return __generator(this, function (_a) {
                                publicKey = '04f428290f4c5ed6a198f71b8205f488141dbb3f0840c923bbfa798ecbee6370986c03b5575d94d506772fb48a6a44e345e4ebd4f028a6f609c44b655d6d3e71a1';
                                chainCode = 'ac055a5537c0c7e9e02d14a197cad6b857836da2a12043b46912a37d959b5ae8';
                                address = '0xBa388BA5e5EEF2c6cE42d831c2B3A28D3c99bdB1';
                                return [2 /*return*/, {
                                        publicKey: publicKey,
                                        address: address,
                                        chainCode: chainCode,
                                    }];
                            });
                        }); },
                        signPersonalMessage: function () { return __awaiter(_this, void 0, void 0, function () {
                            var ecSignature;
                            return __generator(this, function (_a) {
                                ecSignature = {
                                    v: 28,
                                    r: 'a6cc284bff14b42bdf5e9286730c152be91719d478605ec46b3bebcd0ae49148',
                                    s: '0652a1a7b742ceb0213d1e744316e285f41f878d8af0b8e632cbca4c279132d0',
                                };
                                return [2 /*return*/, ecSignature];
                            });
                        }); },
                        signTransaction: function (_derivationPath, _txHex) { return __awaiter(_this, void 0, void 0, function () {
                            var ecSignature;
                            return __generator(this, function (_a) {
                                ecSignature = {
                                    v: '77',
                                    r: '88a95ef1378487bc82be558e82c8478baf840c545d5b887536bb1da63673a98b',
                                    s: '019f4a4b9a107d1e6752bf7f701e275f28c13791d6e76af895b07373462cefaa',
                                };
                                return [2 /*return*/, ecSignature];
                            });
                        }); },
                        transport: {
                            close: _.noop.bind(_),
                        },
                    };
                    // tslint:enable:no-object-literal-type-assertion
                    return [2 /*return*/, ledgerEthClient];
                });
            }); };
            ledgerSubprovider = new src_1.LedgerSubprovider({
                networkId: networkId,
                ledgerEthereumClientFactoryAsync: ledgerEthereumClientFactoryAsync,
            });
            return [2 /*return*/];
        });
    }); });
    describe('direct method calls', function () {
        describe('success cases', function () {
            it('returns default number of accounts', function () { return __awaiter(_this, void 0, void 0, function () {
                var accounts;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, ledgerSubprovider.getAccountsAsync()];
                        case 1:
                            accounts = _a.sent();
                            expect(accounts[0]).to.be.equal(FAKE_ADDRESS);
                            expect(accounts.length).to.be.equal(DEFAULT_NUM_ACCOUNTS);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('returns requested number of accounts', function () { return __awaiter(_this, void 0, void 0, function () {
                var numberOfAccounts, accounts;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            numberOfAccounts = 20;
                            return [4 /*yield*/, ledgerSubprovider.getAccountsAsync(numberOfAccounts)];
                        case 1:
                            accounts = _a.sent();
                            expect(accounts[0]).to.be.equal(FAKE_ADDRESS);
                            expect(accounts.length).to.be.equal(numberOfAccounts);
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
                            return [4 /*yield*/, ledgerSubprovider.signPersonalMessageAsync(data, FAKE_ADDRESS)];
                        case 1:
                            ecSignatureHex = _a.sent();
                            expect(ecSignatureHex).to.be.equal('0xa6cc284bff14b42bdf5e9286730c152be91719d478605ec46b3bebcd0ae491480652a1a7b742ceb0213d1e744316e285f41f878d8af0b8e632cbca4c279132d001');
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('failure cases', function () {
            it('cannot open multiple simultaneous connections to the Ledger device', function () { return __awaiter(_this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    data = ethUtils.bufferToHex(ethUtils.toBuffer('hello world'));
                    return [2 /*return*/, expect(Promise.all([
                            ledgerSubprovider.getAccountsAsync(),
                            ledgerSubprovider.signPersonalMessageAsync(data, FAKE_ADDRESS),
                        ])).to.be.rejectedWith(types_1.LedgerSubproviderErrors.MultipleOpenConnectionsDisallowed)];
                });
            }); });
        });
    });
    describe('calls through a provider', function () {
        var provider;
        before(function () {
            provider = new src_1.Web3ProviderEngine();
            provider.addProvider(ledgerSubprovider);
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
                    expect(response.result.length).to.be.equal(DEFAULT_NUM_ACCOUNTS);
                    expect(response.result[0]).to.be.equal(FAKE_ADDRESS);
                    done();
                });
                provider.sendAsync(payload, callback);
            });
            it('signs a personal message with eth_sign', function (done) {
                var messageHex = ethUtils.bufferToHex(ethUtils.toBuffer('hello world'));
                var payload = {
                    jsonrpc: '2.0',
                    method: 'eth_sign',
                    params: [FAKE_ADDRESS, messageHex],
                    id: 1,
                };
                var callback = report_callback_errors_1.reportCallbackErrors(done)(function (err, response) {
                    expect(err).to.be.a('null');
                    expect(response.result).to.be.equal('0xa6cc284bff14b42bdf5e9286730c152be91719d478605ec46b3bebcd0ae491480652a1a7b742ceb0213d1e744316e285f41f878d8af0b8e632cbca4c279132d001');
                    done();
                });
                provider.sendAsync(payload, callback);
            });
            it('signs a personal message with personal_sign', function (done) {
                var messageHex = ethUtils.bufferToHex(ethUtils.toBuffer(fixture_data_1.fixtureData.PERSONAL_MESSAGE_STRING));
                var payload = {
                    jsonrpc: '2.0',
                    method: 'personal_sign',
                    params: [messageHex, FAKE_ADDRESS],
                    id: 1,
                };
                var callback = report_callback_errors_1.reportCallbackErrors(done)(function (err, response) {
                    expect(err).to.be.a('null');
                    expect(response.result).to.be.equal('0xa6cc284bff14b42bdf5e9286730c152be91719d478605ec46b3bebcd0ae491480652a1a7b742ceb0213d1e744316e285f41f878d8af0b8e632cbca4c279132d001');
                    done();
                });
                provider.sendAsync(payload, callback);
            });
            it('signs a transaction', function (done) {
                var tx = {
                    to: '0xafa3f8684e54059998bc3a7b0d2b0da075154d66',
                    value: '0x00',
                    gasPrice: '0x00',
                    nonce: '0x00',
                    gas: '0x00',
                    from: FAKE_ADDRESS,
                };
                var payload = {
                    jsonrpc: '2.0',
                    method: 'eth_signTransaction',
                    params: [tx],
                    id: 1,
                };
                var callback = report_callback_errors_1.reportCallbackErrors(done)(function (err, response) {
                    expect(err).to.be.a('null');
                    var rawTxLength = 192;
                    expect(response.result.raw.length).to.be.equal(rawTxLength);
                    expect(response.result.raw.substr(0, 2)).to.be.equal('0x');
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
                    params: [FAKE_ADDRESS, nonHexMessage],
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
                    params: [nonHexMessage, FAKE_ADDRESS],
                    id: 1,
                };
                var callback = report_callback_errors_1.reportCallbackErrors(done)(function (err, _response) {
                    expect(err).to.not.be.a('null');
                    expect(err.message).to.be.equal('Expected data to be of type HexString, encountered: hello world');
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
//# sourceMappingURL=ledger_subprovider_test.js.map