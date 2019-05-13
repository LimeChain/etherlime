"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ethUtil = require("ethereumjs-util");
var _ = require("lodash");
var constants_1 = require("../utils/constants");
var queue_1 = require("../utils/queue");
var RawCalldata = /** @class */ (function () {
    function RawCalldata(value, hasSelector) {
        if (hasSelector === void 0) { hasSelector = true; }
        // Sanity check
        if (typeof value === 'string' && !_.startsWith(value, '0x')) {
            throw new Error("Expected raw calldata to start with '0x'");
        }
        // Construct initial values
        this._value = ethUtil.toBuffer(value);
        this._selector = '0x';
        this._scopes = new queue_1.Queue();
        this._scopes.pushBack(RawCalldata._INITIAL_OFFSET);
        this._offset = RawCalldata._INITIAL_OFFSET;
        // If there's a selector then slice it
        if (hasSelector) {
            var selectorBuf = this._value.slice(constants_1.constants.HEX_SELECTOR_LENGTH_IN_BYTES);
            this._value = this._value.slice(constants_1.constants.HEX_SELECTOR_LENGTH_IN_BYTES);
            this._selector = ethUtil.bufferToHex(selectorBuf);
        }
    }
    RawCalldata.prototype.popBytes = function (lengthInBytes) {
        var value = this._value.slice(this._offset, this._offset + lengthInBytes);
        this.setOffset(this._offset + lengthInBytes);
        return value;
    };
    RawCalldata.prototype.popWord = function () {
        var wordInBytes = 32;
        return this.popBytes(wordInBytes);
    };
    RawCalldata.prototype.popWords = function (length) {
        var wordInBytes = 32;
        return this.popBytes(length * wordInBytes);
    };
    RawCalldata.prototype.readBytes = function (from, to) {
        var value = this._value.slice(from, to);
        return value;
    };
    RawCalldata.prototype.setOffset = function (offsetInBytes) {
        this._offset = offsetInBytes;
    };
    RawCalldata.prototype.startScope = function () {
        this._scopes.pushFront(this._offset);
    };
    RawCalldata.prototype.endScope = function () {
        this._scopes.popFront();
    };
    RawCalldata.prototype.getOffset = function () {
        return this._offset;
    };
    RawCalldata.prototype.toAbsoluteOffset = function (relativeOffset) {
        var scopeOffset = this._scopes.peekFront();
        if (scopeOffset === undefined) {
            throw new Error("Tried to access undefined scope.");
        }
        var absoluteOffset = relativeOffset + scopeOffset;
        return absoluteOffset;
    };
    RawCalldata.prototype.getSelector = function () {
        return this._selector;
    };
    RawCalldata.prototype.getSizeInBytes = function () {
        var sizeInBytes = this._value.byteLength;
        return sizeInBytes;
    };
    RawCalldata._INITIAL_OFFSET = 0;
    return RawCalldata;
}());
exports.RawCalldata = RawCalldata;
//# sourceMappingURL=raw_calldata.js.map