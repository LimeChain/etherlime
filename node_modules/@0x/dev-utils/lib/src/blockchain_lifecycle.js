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
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("@0x/utils");
var web3_wrapper_1 = require("@0x/web3-wrapper");
// HACK(albrow): 🐉 We have to do this so that debug.setHead works correctly.
// (Geth does not seem to like debug.setHead(0), so by sending some transactions
// we increase the current block number beyond 0). Additionally, some tests seem
// to break when there are fewer than 3 blocks in the chain. (We have no idea
// why, but it was consistently reproducible).
var MINIMUM_BLOCKS = 3;
var BlockchainLifecycle = /** @class */ (function () {
    function BlockchainLifecycle(web3Wrapper) {
        this._addresses = [];
        this._web3Wrapper = web3Wrapper;
        this._snapshotIdsStack = [];
    }
    BlockchainLifecycle.prototype.startAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var nodeType, _a, snapshotId, blockNumber;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this._getNodeTypeAsync()];
                    case 1:
                        nodeType = _b.sent();
                        _a = nodeType;
                        switch (_a) {
                            case web3_wrapper_1.NodeType.Ganache: return [3 /*break*/, 2];
                            case web3_wrapper_1.NodeType.Geth: return [3 /*break*/, 4];
                        }
                        return [3 /*break*/, 10];
                    case 2: return [4 /*yield*/, this._web3Wrapper.takeSnapshotAsync()];
                    case 3:
                        snapshotId = _b.sent();
                        this._snapshotIdsStack.push(snapshotId);
                        return [3 /*break*/, 11];
                    case 4: return [4 /*yield*/, this._web3Wrapper.getBlockNumberAsync()];
                    case 5:
                        blockNumber = _b.sent();
                        if (!(blockNumber < MINIMUM_BLOCKS)) return [3 /*break*/, 8];
                        // If the minimum block number is not met, force Geth to
                        // mine some blocks by sending some dummy transactions.
                        return [4 /*yield*/, this._mineMinimumBlocksAsync()];
                    case 6:
                        // If the minimum block number is not met, force Geth to
                        // mine some blocks by sending some dummy transactions.
                        _b.sent();
                        return [4 /*yield*/, this._web3Wrapper.getBlockNumberAsync()];
                    case 7:
                        blockNumber = _b.sent();
                        _b.label = 8;
                    case 8:
                        this._snapshotIdsStack.push(blockNumber);
                        // HACK(albrow) It's possible that we applied a time offset but
                        // the transaction we mined to put that time offset into the
                        // blockchain was reverted. As a workaround, we mine a new dummy
                        // block so that the latest block timestamp accounts for any
                        // possible time offsets.
                        return [4 /*yield*/, this._mineDummyBlockAsync()];
                    case 9:
                        // HACK(albrow) It's possible that we applied a time offset but
                        // the transaction we mined to put that time offset into the
                        // blockchain was reverted. As a workaround, we mine a new dummy
                        // block so that the latest block timestamp accounts for any
                        // possible time offsets.
                        _b.sent();
                        return [3 /*break*/, 11];
                    case 10: throw new Error("Unknown node type: " + nodeType);
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    BlockchainLifecycle.prototype.revertAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var nodeType, _a, snapshotId, didRevert, blockNumber;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this._getNodeTypeAsync()];
                    case 1:
                        nodeType = _b.sent();
                        _a = nodeType;
                        switch (_a) {
                            case web3_wrapper_1.NodeType.Ganache: return [3 /*break*/, 2];
                            case web3_wrapper_1.NodeType.Geth: return [3 /*break*/, 4];
                        }
                        return [3 /*break*/, 6];
                    case 2:
                        snapshotId = this._snapshotIdsStack.pop();
                        return [4 /*yield*/, this._web3Wrapper.revertSnapshotAsync(snapshotId)];
                    case 3:
                        didRevert = _b.sent();
                        if (!didRevert) {
                            throw new Error("Snapshot with id #" + snapshotId + " failed to revert");
                        }
                        return [3 /*break*/, 7];
                    case 4:
                        blockNumber = this._snapshotIdsStack.pop();
                        return [4 /*yield*/, this._web3Wrapper.setHeadAsync(blockNumber)];
                    case 5:
                        _b.sent();
                        return [3 /*break*/, 7];
                    case 6: throw new Error("Unknown node type: " + nodeType);
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    BlockchainLifecycle.prototype._mineMinimumBlocksAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        utils_1.logUtils.warn('WARNING: minimum block number for tests not met. Mining additional blocks...');
                        _a.label = 1;
                    case 1: return [4 /*yield*/, this._web3Wrapper.getBlockNumberAsync()];
                    case 2:
                        if (!((_a.sent()) < MINIMUM_BLOCKS)) return [3 /*break*/, 4];
                        utils_1.logUtils.warn('Mining block...');
                        return [4 /*yield*/, this._mineDummyBlockAsync()];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 4:
                        utils_1.logUtils.warn('Done mining the minimum number of blocks.');
                        return [2 /*return*/];
                }
            });
        });
    };
    BlockchainLifecycle.prototype._getNodeTypeAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(this._nodeType === undefined)) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this._web3Wrapper.getNodeTypeAsync()];
                    case 1:
                        _a._nodeType = _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/, this._nodeType];
                }
            });
        });
    };
    // Sends a transaction that has no real effect on the state and waits for it
    // to be mined.
    BlockchainLifecycle.prototype._mineDummyBlockAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!(this._addresses.length === 0)) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this._web3Wrapper.getAvailableAddressesAsync()];
                    case 1:
                        _a._addresses = _d.sent();
                        if (this._addresses.length === 0) {
                            throw new Error('No accounts found');
                        }
                        _d.label = 2;
                    case 2:
                        _c = (_b = this._web3Wrapper).awaitTransactionMinedAsync;
                        return [4 /*yield*/, this._web3Wrapper.sendTransactionAsync({
                                from: this._addresses[0],
                                to: this._addresses[0],
                                value: '0',
                            })];
                    case 3: return [4 /*yield*/, _c.apply(_b, [_d.sent(),
                            0])];
                    case 4:
                        _d.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return BlockchainLifecycle;
}());
exports.BlockchainLifecycle = BlockchainLifecycle;
//# sourceMappingURL=blockchain_lifecycle.js.map