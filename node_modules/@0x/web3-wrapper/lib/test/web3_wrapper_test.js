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
var ethereum_types_1 = require("ethereum-types");
var Ganache = require("ganache-core");
var _ = require("lodash");
require("mocha");
var web3_wrapper_1 = require("../src/web3_wrapper");
var chai_setup_1 = require("./utils/chai_setup");
chai_setup_1.chaiSetup.configure();
var expect = chai.expect;
var NUM_GANACHE_ADDRESSES = 10;
describe('Web3Wrapper tests', function () {
    var NETWORK_ID = 50;
    var provider = Ganache.provider({ network_id: NETWORK_ID });
    var web3Wrapper = new web3_wrapper_1.Web3Wrapper(provider);
    var addresses;
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, web3Wrapper.getAvailableAddressesAsync()];
                case 1:
                    addresses = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('#isAddress', function () {
        it('correctly checks if a string is a valid ethereum address', function () {
            expect(web3_wrapper_1.Web3Wrapper.isAddress('0x0')).to.be.false();
            expect(web3_wrapper_1.Web3Wrapper.isAddress('0xdeadbeef')).to.be.false();
            expect(web3_wrapper_1.Web3Wrapper.isAddress('42')).to.be.false();
            expect(web3_wrapper_1.Web3Wrapper.isAddress('weth.thetoken.eth')).to.be.false();
            expect(web3_wrapper_1.Web3Wrapper.isAddress('0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2')).to.be.true();
            expect(web3_wrapper_1.Web3Wrapper.isAddress('0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2')).to.be.true();
        });
    });
    describe('#getNodeVersionAsync', function () {
        it('gets the node version', function () { return __awaiter(_this, void 0, void 0, function () {
            var nodeVersion, NODE_VERSION;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, web3Wrapper.getNodeVersionAsync()];
                    case 1:
                        nodeVersion = _a.sent();
                        NODE_VERSION = 'EthereumJS TestRPC/v2.5.3/ethereum-js';
                        expect(nodeVersion).to.be.equal(NODE_VERSION);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('#getNetworkIdAsync', function () {
        it('gets the network id', function () { return __awaiter(_this, void 0, void 0, function () {
            var networkId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, web3Wrapper.getNetworkIdAsync()];
                    case 1:
                        networkId = _a.sent();
                        expect(networkId).to.be.equal(NETWORK_ID);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('#getNetworkIdAsync', function () {
        it('gets the network id', function () { return __awaiter(_this, void 0, void 0, function () {
            var networkId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, web3Wrapper.getNetworkIdAsync()];
                    case 1:
                        networkId = _a.sent();
                        expect(networkId).to.be.equal(NETWORK_ID);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('#getAvailableAddressesAsync', function () {
        it('gets the available addresses', function () { return __awaiter(_this, void 0, void 0, function () {
            var availableAddresses;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, web3Wrapper.getAvailableAddressesAsync()];
                    case 1:
                        availableAddresses = _a.sent();
                        expect(availableAddresses.length).to.be.equal(NUM_GANACHE_ADDRESSES);
                        expect(web3_wrapper_1.Web3Wrapper.isAddress(availableAddresses[0])).to.equal(true);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('#getBalanceInWeiAsync', function () {
        it('gets the users balance in wei', function () { return __awaiter(_this, void 0, void 0, function () {
            var secondAccount, balanceInWei, tenEthInWei;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        secondAccount = addresses[1];
                        return [4 /*yield*/, web3Wrapper.getBalanceInWeiAsync(secondAccount)];
                    case 1:
                        balanceInWei = _a.sent();
                        tenEthInWei = 100000000000000000000;
                        expect(balanceInWei).to.be.bignumber.equal(tenEthInWei);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should throw if supplied owner not an Ethereum address hex string', function () { return __awaiter(_this, void 0, void 0, function () {
            var invalidEthAddress;
            return __generator(this, function (_a) {
                invalidEthAddress = 'deadbeef';
                expect(web3Wrapper.getBalanceInWeiAsync(invalidEthAddress)).to.eventually.to.be.rejected();
                return [2 /*return*/];
            });
        }); });
    });
    describe('#signMessageAsync', function () {
        it('should sign message', function () { return __awaiter(_this, void 0, void 0, function () {
            var message, signer, signature, signatureLength;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        message = '0xdeadbeef';
                        signer = addresses[1];
                        return [4 /*yield*/, web3Wrapper.signMessageAsync(signer, message)];
                    case 1:
                        signature = _a.sent();
                        signatureLength = 132;
                        expect(signature.length).to.be.equal(signatureLength);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should throw if the provider returns an error', function () { return __awaiter(_this, void 0, void 0, function () {
            var message, signer, fakeProvider, errorWeb3Wrapper;
            return __generator(this, function (_a) {
                message = '0xdeadbeef';
                signer = addresses[1];
                fakeProvider = {
                    sendAsync: function (payload, callback) {
                        return __awaiter(this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                callback(new Error('User denied message signature'));
                                return [2 /*return*/];
                            });
                        });
                    },
                };
                errorWeb3Wrapper = new web3_wrapper_1.Web3Wrapper(fakeProvider);
                expect(errorWeb3Wrapper.signMessageAsync(signer, message)).to.be.rejectedWith('User denied message signature');
                return [2 /*return*/];
            });
        }); });
    });
    describe('#getBlockNumberAsync', function () {
        it('get block number', function () { return __awaiter(_this, void 0, void 0, function () {
            var blockNumber;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, web3Wrapper.getBlockNumberAsync()];
                    case 1:
                        blockNumber = _a.sent();
                        expect(typeof blockNumber).to.be.equal('number');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('#getTransactionReceiptAsync/awaitTransactionSuccessAsync', function () {
        it('get block number', function () { return __awaiter(_this, void 0, void 0, function () {
            var payload, txHash, receiptIfExists, receipt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        payload = { from: addresses[0], to: addresses[1], value: 1 };
                        return [4 /*yield*/, web3Wrapper.sendTransactionAsync(payload)];
                    case 1:
                        txHash = _a.sent();
                        return [4 /*yield*/, web3Wrapper.awaitTransactionSuccessAsync(txHash)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, web3Wrapper.getTransactionReceiptIfExistsAsync(txHash)];
                    case 3:
                        receiptIfExists = _a.sent();
                        expect(receiptIfExists).to.not.be.undefined();
                        receipt = receiptIfExists;
                        expect(receipt.transactionIndex).to.be.a('number');
                        expect(receipt.transactionHash).to.be.equal(txHash);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('#getBlockIfExistsAsync', function () {
        it('gets block when supplied a valid BlockParamLiteral value', function () { return __awaiter(_this, void 0, void 0, function () {
            var blockParamLiteral, blockIfExists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        blockParamLiteral = ethereum_types_1.BlockParamLiteral.Earliest;
                        return [4 /*yield*/, web3Wrapper.getBlockIfExistsAsync(blockParamLiteral)];
                    case 1:
                        blockIfExists = _a.sent();
                        if (blockIfExists === undefined) {
                            throw new Error('Expected block to exist');
                        }
                        expect(blockIfExists.number).to.be.equal(0);
                        expect(utils_1.BigNumber.isBigNumber(blockIfExists.difficulty)).to.equal(true);
                        expect(_.isNumber(blockIfExists.gasLimit)).to.equal(true);
                        return [2 /*return*/];
                }
            });
        }); });
        it('gets block when supplied a block number', function () { return __awaiter(_this, void 0, void 0, function () {
            var blockParamLiteral, blockIfExists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        blockParamLiteral = 0;
                        return [4 /*yield*/, web3Wrapper.getBlockIfExistsAsync(blockParamLiteral)];
                    case 1:
                        blockIfExists = _a.sent();
                        if (blockIfExists === undefined) {
                            throw new Error('Expected block to exist');
                        }
                        expect(blockIfExists.number).to.be.equal(0);
                        return [2 /*return*/];
                }
            });
        }); });
        it('gets block when supplied a block hash', function () { return __awaiter(_this, void 0, void 0, function () {
            var blockParamLiteral, blockIfExists, sameBlockIfExists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        blockParamLiteral = 0;
                        return [4 /*yield*/, web3Wrapper.getBlockIfExistsAsync(blockParamLiteral)];
                    case 1:
                        blockIfExists = _a.sent();
                        if (blockIfExists === undefined) {
                            throw new Error('Expected block to exist');
                        }
                        return [4 /*yield*/, web3Wrapper.getBlockIfExistsAsync(blockIfExists.hash)];
                    case 2:
                        sameBlockIfExists = _a.sent();
                        if (sameBlockIfExists === undefined) {
                            throw new Error('Expected block to exist');
                        }
                        expect(sameBlockIfExists.number).to.be.equal(0);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should throw if supplied invalid blockParam value', function () { return __awaiter(_this, void 0, void 0, function () {
            var invalidBlockParam;
            return __generator(this, function (_a) {
                invalidBlockParam = 'deadbeef';
                expect(web3Wrapper.getBlockIfExistsAsync(invalidBlockParam)).to.eventually.to.be.rejected();
                return [2 /*return*/];
            });
        }); });
    });
    describe('#getBlockWithTransactionDataAsync', function () {
        it('gets block when supplied a valid BlockParamLiteral value', function () { return __awaiter(_this, void 0, void 0, function () {
            var blockParamLiteral, block;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        blockParamLiteral = ethereum_types_1.BlockParamLiteral.Earliest;
                        return [4 /*yield*/, web3Wrapper.getBlockWithTransactionDataAsync(blockParamLiteral)];
                    case 1:
                        block = _a.sent();
                        expect(block.number).to.be.equal(0);
                        expect(utils_1.BigNumber.isBigNumber(block.difficulty)).to.equal(true);
                        expect(_.isNumber(block.gasLimit)).to.equal(true);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should throw if supplied invalid blockParam value', function () { return __awaiter(_this, void 0, void 0, function () {
            var invalidBlockParam;
            return __generator(this, function (_a) {
                invalidBlockParam = 'deadbeef';
                expect(web3Wrapper.getBlockWithTransactionDataAsync(invalidBlockParam)).to.eventually.to.be.rejected();
                return [2 /*return*/];
            });
        }); });
    });
    describe('#getBlockTimestampAsync', function () {
        it('gets block timestamp', function () { return __awaiter(_this, void 0, void 0, function () {
            var blockParamLiteral, timestamp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        blockParamLiteral = ethereum_types_1.BlockParamLiteral.Earliest;
                        return [4 /*yield*/, web3Wrapper.getBlockTimestampAsync(blockParamLiteral)];
                    case 1:
                        timestamp = _a.sent();
                        expect(_.isNumber(timestamp)).to.be.equal(true);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=web3_wrapper_test.js.map