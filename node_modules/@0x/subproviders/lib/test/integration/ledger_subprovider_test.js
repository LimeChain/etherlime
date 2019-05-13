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
var hw_app_eth_1 = require("@ledgerhq/hw-app-eth");
// HACK: This dependency is optional and tslint skips optional dependencies
// tslint:disable-next-line:no-implicit-dependencies
var hw_transport_node_hid_1 = require("@ledgerhq/hw-transport-node-hid");
var chai = require("chai");
var ethUtils = require("ethereumjs-util");
var src_1 = require("../../src");
var chai_setup_1 = require("../chai_setup");
var fixture_data_1 = require("../utils/fixture_data");
var report_callback_errors_1 = require("../utils/report_callback_errors");
chai_setup_1.chaiSetup.configure();
var expect = chai.expect;
var DEFAULT_NUM_ACCOUNTS = 10;
var EXPECTED_SIGNATURE_LENGTH = 132;
function ledgerEthereumNodeJsClientFactoryAsync() {
    return __awaiter(this, void 0, void 0, function () {
        var ledgerConnection, ledgerEthClient;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, hw_transport_node_hid_1.default.create()];
                case 1:
                    ledgerConnection = _a.sent();
                    ledgerEthClient = new hw_app_eth_1.default(ledgerConnection);
                    return [2 /*return*/, ledgerEthClient];
            }
        });
    });
}
describe('LedgerSubprovider', function () {
    var ledgerSubprovider;
    var networkId = fixture_data_1.fixtureData.NETWORK_ID;
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            ledgerSubprovider = new src_1.LedgerSubprovider({
                networkId: networkId,
                ledgerEthereumClientFactoryAsync: ledgerEthereumNodeJsClientFactoryAsync,
                baseDerivationPath: fixture_data_1.fixtureData.TESTRPC_BASE_DERIVATION_PATH,
            });
            return [2 /*return*/];
        });
    }); });
    describe('direct method calls', function () {
        it('returns default number of accounts', function () { return __awaiter(_this, void 0, void 0, function () {
            var accounts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ledgerSubprovider.getAccountsAsync()];
                    case 1:
                        accounts = _a.sent();
                        expect(accounts[0]).to.not.be.an('undefined');
                        expect(accounts.length).to.be.equal(DEFAULT_NUM_ACCOUNTS);
                        return [2 /*return*/];
                }
            });
        }); });
        it('returns the expected accounts from a ledger set up with the test mnemonic', function () { return __awaiter(_this, void 0, void 0, function () {
            var accounts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ledgerSubprovider.getAccountsAsync()];
                    case 1:
                        accounts = _a.sent();
                        expect(accounts[0]).to.be.equal(fixture_data_1.fixtureData.TEST_RPC_ACCOUNT_0);
                        expect(accounts[1]).to.be.equal(fixture_data_1.fixtureData.TEST_RPC_ACCOUNT_1);
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
                        expect(accounts[0]).to.not.be.an('undefined');
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
                        return [4 /*yield*/, ledgerSubprovider.signPersonalMessageAsync(data, fixture_data_1.fixtureData.TEST_RPC_ACCOUNT_0)];
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
                        return [4 /*yield*/, ledgerSubprovider.signPersonalMessageAsync(data, fixture_data_1.fixtureData.TEST_RPC_ACCOUNT_1)];
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
                    case 0: return [4 /*yield*/, ledgerSubprovider.signTransactionAsync(fixture_data_1.fixtureData.TX_DATA)];
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
                        return [4 /*yield*/, ledgerSubprovider.signTransactionAsync(txData)];
                    case 1:
                        txHex = _a.sent();
                        expect(txHex).to.be.equal(fixture_data_1.fixtureData.TX_DATA_ACCOUNT_1_SIGNED_RESULT);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('calls through a provider', function () {
        var defaultProvider;
        var ledgerProvider;
        before(function () {
            ledgerProvider = new src_1.Web3ProviderEngine();
            ledgerProvider.addProvider(ledgerSubprovider);
            var httpProvider = new src_1.RPCSubprovider('http://localhost:8545');
            ledgerProvider.addProvider(httpProvider);
            utils_1.providerUtils.startProviderEngine(ledgerProvider);
            defaultProvider = new src_1.Web3ProviderEngine();
            defaultProvider.addProvider(httpProvider);
            utils_1.providerUtils.startProviderEngine(defaultProvider);
        });
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
                done();
            });
            ledgerProvider.sendAsync(payload, callback);
        });
        it('signs a personal message with eth_sign', function (done) {
            (function () { return __awaiter(_this, void 0, void 0, function () {
                var messageHex, accounts, signer, payload, callback;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            messageHex = ethUtils.bufferToHex(ethUtils.toBuffer('hello world'));
                            return [4 /*yield*/, ledgerSubprovider.getAccountsAsync()];
                        case 1:
                            accounts = _a.sent();
                            signer = accounts[0];
                            payload = {
                                jsonrpc: '2.0',
                                method: 'eth_sign',
                                params: [signer, messageHex],
                                id: 1,
                            };
                            callback = report_callback_errors_1.reportCallbackErrors(done)(function (err, response) {
                                expect(err).to.be.a('null');
                                expect(response.result.length).to.be.equal(EXPECTED_SIGNATURE_LENGTH);
                                expect(response.result.substr(0, 2)).to.be.equal('0x');
                                done();
                            });
                            ledgerProvider.sendAsync(payload, callback);
                            return [2 /*return*/];
                    }
                });
            }); })().catch(done);
        });
        it('signs a personal message with personal_sign', function (done) {
            (function () { return __awaiter(_this, void 0, void 0, function () {
                var messageHex, accounts, signer, payload, callback;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            messageHex = ethUtils.bufferToHex(ethUtils.toBuffer('hello world'));
                            return [4 /*yield*/, ledgerSubprovider.getAccountsAsync()];
                        case 1:
                            accounts = _a.sent();
                            signer = accounts[0];
                            payload = {
                                jsonrpc: '2.0',
                                method: 'personal_sign',
                                params: [messageHex, signer],
                                id: 1,
                            };
                            callback = report_callback_errors_1.reportCallbackErrors(done)(function (err, response) {
                                expect(err).to.be.a('null');
                                expect(response.result.length).to.be.equal(EXPECTED_SIGNATURE_LENGTH);
                                expect(response.result.substr(0, 2)).to.be.equal('0x');
                                done();
                            });
                            ledgerProvider.sendAsync(payload, callback);
                            return [2 /*return*/];
                    }
                });
            }); })().catch(done);
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
            ledgerProvider.sendAsync(payload, callback);
        });
        it('signs and sends a transaction', function (done) {
            (function () { return __awaiter(_this, void 0, void 0, function () {
                var accounts, tx, payload, callback;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, ledgerSubprovider.getAccountsAsync()];
                        case 1:
                            accounts = _a.sent();
                            tx = {
                                to: accounts[0],
                                from: fixture_data_1.fixtureData.TEST_RPC_ACCOUNT_0,
                                value: '0x8ac7230489e80000',
                            };
                            payload = {
                                jsonrpc: '2.0',
                                method: 'eth_sendTransaction',
                                params: [tx],
                                id: 1,
                            };
                            return [4 /*yield*/, utils_1.promisify(defaultProvider.sendAsync.bind(defaultProvider))(payload)];
                        case 2:
                            _a.sent();
                            // Send transaction from Ledger
                            tx = {
                                to: '0xafa3f8684e54059998bc3a7b0d2b0da075154d66',
                                from: accounts[0],
                                value: '0xde0b6b3a7640000',
                            };
                            payload = {
                                jsonrpc: '2.0',
                                method: 'eth_sendTransaction',
                                params: [tx],
                                id: 1,
                            };
                            callback = report_callback_errors_1.reportCallbackErrors(done)(function (err, response) {
                                expect(err).to.be.a('null');
                                var result = response.result;
                                var signedTxLength = 66;
                                expect(result.length).to.be.equal(signedTxLength);
                                expect(result.substr(0, 2)).to.be.equal('0x');
                                done();
                            });
                            ledgerProvider.sendAsync(payload, callback);
                            return [2 /*return*/];
                    }
                });
            }); })().catch(done);
        });
    });
});
//# sourceMappingURL=ledger_subprovider_test.js.map