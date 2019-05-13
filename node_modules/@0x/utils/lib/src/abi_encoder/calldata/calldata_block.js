"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ethUtil = require("ethereumjs-util");
var CalldataBlock = /** @class */ (function () {
    function CalldataBlock(name, signature, parentName, headerSizeInBytes, bodySizeInBytes) {
        this._name = name;
        this._signature = signature;
        this._parentName = parentName;
        this._offsetInBytes = 0;
        this._headerSizeInBytes = headerSizeInBytes;
        this._bodySizeInBytes = bodySizeInBytes;
    }
    CalldataBlock.prototype._setHeaderSize = function (headerSizeInBytes) {
        this._headerSizeInBytes = headerSizeInBytes;
    };
    CalldataBlock.prototype._setBodySize = function (bodySizeInBytes) {
        this._bodySizeInBytes = bodySizeInBytes;
    };
    CalldataBlock.prototype._setName = function (name) {
        this._name = name;
    };
    CalldataBlock.prototype.getName = function () {
        return this._name;
    };
    CalldataBlock.prototype.getParentName = function () {
        return this._parentName;
    };
    CalldataBlock.prototype.getSignature = function () {
        return this._signature;
    };
    CalldataBlock.prototype.getHeaderSizeInBytes = function () {
        return this._headerSizeInBytes;
    };
    CalldataBlock.prototype.getBodySizeInBytes = function () {
        return this._bodySizeInBytes;
    };
    CalldataBlock.prototype.getSizeInBytes = function () {
        return this.getHeaderSizeInBytes() + this.getBodySizeInBytes();
    };
    CalldataBlock.prototype.getOffsetInBytes = function () {
        return this._offsetInBytes;
    };
    CalldataBlock.prototype.setOffset = function (offsetInBytes) {
        this._offsetInBytes = offsetInBytes;
    };
    CalldataBlock.prototype.computeHash = function () {
        var rawData = this.getRawData();
        var hash = ethUtil.sha3(rawData);
        return hash;
    };
    return CalldataBlock;
}());
exports.CalldataBlock = CalldataBlock;
//# sourceMappingURL=calldata_block.js.map