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
var chai = require("chai");
var FixtureSubprovider = require("web3-provider-engine/subproviders/fixture");
var utils_1 = require("@0x/utils");
var EthereumTx = require("ethereumjs-tx");
var src_1 = require("../../src");
var chai_setup_1 = require("../chai_setup");
var expect = chai.expect;
chai_setup_1.chaiSetup.configure();
describe('NonceTrackerSubprovider', function () {
    var provider;
    var getTransactionCountPayload = {
        jsonrpc: '2.0',
        method: 'eth_getTransactionCount',
        params: ['0x0', 'pending'],
        id: 1,
    };
    var sendTransactionPayload = {
        jsonrpc: '2.0',
        method: 'eth_sendRawTransaction',
        params: [],
        id: 1,
    };
    var txParams = [
        '0x',
        '0x09184e72a000',
        '0x2710',
        '0x0000000000000000000000000000000000000000',
        '0x',
        '0x7f7465737432000000000000000000000000000000000000000000000000000000600057',
        '0x1c',
        '0x5e1d3a76fbf824220eafc8c79ad578ad2b67d01b0c2425eb1f1347e8f50882ab',
        '0x5bd428537f05f9830e93792f90ea6a3e2d1ee84952dd96edbae9f658f831ab13',
    ];
    function createFixtureSubprovider() {
        var isFirstGetTransactionCount = true;
        var fixedBlockNumberAndTransactionCountProvider = new FixtureSubprovider({
            eth_getBlockByNumber: '0x01',
            eth_getTransactionCount: function (_data, _next, end) {
                // For testing caching we return different results on the second call
                if (isFirstGetTransactionCount) {
                    isFirstGetTransactionCount = false;
                    end(null, '0x00');
                }
                else {
                    end(null, '0x99');
                }
            },
        });
        return fixedBlockNumberAndTransactionCountProvider;
    }
    it('successfully caches the transaction count', function () { return __awaiter(_this, void 0, void 0, function () {
        var nonceTrackerSubprovider, payload, response, secondResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    provider = new src_1.Web3ProviderEngine();
                    nonceTrackerSubprovider = new src_1.NonceTrackerSubprovider();
                    provider.addProvider(nonceTrackerSubprovider);
                    provider.addProvider(createFixtureSubprovider());
                    utils_1.providerUtils.startProviderEngine(provider);
                    payload = __assign({}, getTransactionCountPayload, { params: ['0x0', 'pending'] });
                    return [4 /*yield*/, utils_1.promisify(provider.sendAsync.bind(provider))(payload)];
                case 1:
                    response = _a.sent();
                    expect(response.result).to.be.eq('0x00');
                    return [4 /*yield*/, utils_1.promisify(provider.sendAsync.bind(provider))(payload)];
                case 2:
                    secondResponse = _a.sent();
                    expect(secondResponse.result).to.be.eq('0x00');
                    return [2 /*return*/];
            }
        });
    }); });
    it('does not cache the result for latest transaction count', function () { return __awaiter(_this, void 0, void 0, function () {
        var nonceTrackerSubprovider, payload, response, secondResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    provider = new src_1.Web3ProviderEngine();
                    nonceTrackerSubprovider = new src_1.NonceTrackerSubprovider();
                    provider.addProvider(nonceTrackerSubprovider);
                    provider.addProvider(createFixtureSubprovider());
                    utils_1.providerUtils.startProviderEngine(provider);
                    payload = __assign({}, getTransactionCountPayload, { params: ['0x0', 'latest'] });
                    return [4 /*yield*/, utils_1.promisify(provider.sendAsync.bind(provider))(payload)];
                case 1:
                    response = _a.sent();
                    expect(response.result).to.be.eq('0x00');
                    return [4 /*yield*/, utils_1.promisify(provider.sendAsync.bind(provider))(payload)];
                case 2:
                    secondResponse = _a.sent();
                    expect(secondResponse.result).to.be.eq('0x99');
                    return [2 /*return*/];
            }
        });
    }); });
    it('clears the cache on a Nonce Too Low Error', function () { return __awaiter(_this, void 0, void 0, function () {
        var nonceTrackerSubprovider, noncePayload, transaction, txPayload, response, secondResponse, err_1, thirdResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    provider = new src_1.Web3ProviderEngine();
                    nonceTrackerSubprovider = new src_1.NonceTrackerSubprovider();
                    provider.addProvider(nonceTrackerSubprovider);
                    provider.addProvider(createFixtureSubprovider());
                    provider.addProvider(new FixtureSubprovider({
                        eth_sendRawTransaction: function (_data, _next, end) {
                            end(new Error('Transaction nonce is too low'));
                        },
                    }));
                    utils_1.providerUtils.startProviderEngine(provider);
                    noncePayload = __assign({}, getTransactionCountPayload, { params: ['0x1f36f546477cda21bf2296c50976f2740247906f', 'pending'] });
                    transaction = new EthereumTx(txParams);
                    txPayload = __assign({}, sendTransactionPayload, { params: [transaction.serialize()] });
                    return [4 /*yield*/, utils_1.promisify(provider.sendAsync.bind(provider))(noncePayload)];
                case 1:
                    response = _a.sent();
                    expect(response.result).to.be.eq('0x00');
                    return [4 /*yield*/, utils_1.promisify(provider.sendAsync.bind(provider))(noncePayload)];
                case 2:
                    secondResponse = _a.sent();
                    expect(secondResponse.result).to.be.eq('0x00');
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 5, , 7]);
                    return [4 /*yield*/, utils_1.promisify(provider.sendAsync.bind(provider))(txPayload)];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 5:
                    err_1 = _a.sent();
                    return [4 /*yield*/, utils_1.promisify(provider.sendAsync.bind(provider))(noncePayload)];
                case 6:
                    thirdResponse = _a.sent();
                    expect(thirdResponse.result).to.be.eq('0x99');
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); });
    it('increments the used nonce when a transaction successfully submits', function () { return __awaiter(_this, void 0, void 0, function () {
        var nonceTrackerSubprovider, noncePayload, transaction, txPayload, response, secondResponse, thirdResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    provider = new src_1.Web3ProviderEngine();
                    nonceTrackerSubprovider = new src_1.NonceTrackerSubprovider();
                    provider.addProvider(nonceTrackerSubprovider);
                    provider.addProvider(createFixtureSubprovider());
                    provider.addProvider(new FixtureSubprovider({
                        eth_sendRawTransaction: function (_data, _next, end) {
                            end(null);
                        },
                    }));
                    utils_1.providerUtils.startProviderEngine(provider);
                    noncePayload = __assign({}, getTransactionCountPayload, { params: ['0x1f36f546477cda21bf2296c50976f2740247906f', 'pending'] });
                    transaction = new EthereumTx(txParams);
                    txPayload = __assign({}, sendTransactionPayload, { params: [transaction.serialize()] });
                    return [4 /*yield*/, utils_1.promisify(provider.sendAsync.bind(provider))(noncePayload)];
                case 1:
                    response = _a.sent();
                    expect(response.result).to.be.eq('0x00');
                    return [4 /*yield*/, utils_1.promisify(provider.sendAsync.bind(provider))(noncePayload)];
                case 2:
                    secondResponse = _a.sent();
                    expect(secondResponse.result).to.be.eq('0x00');
                    return [4 /*yield*/, utils_1.promisify(provider.sendAsync.bind(provider))(txPayload)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, utils_1.promisify(provider.sendAsync.bind(provider))(noncePayload)];
                case 4:
                    thirdResponse = _a.sent();
                    expect(thirdResponse.result).to.be.eq('0x01');
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=nonce_tracker_subprovider_test.js.map