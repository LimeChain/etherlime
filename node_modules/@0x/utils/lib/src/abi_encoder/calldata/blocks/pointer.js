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
Object.defineProperty(exports, "__esModule", { value: true });
var ethUtil = require("ethereumjs-util");
var constants_1 = require("../../utils/constants");
var calldata_block_1 = require("../calldata_block");
var PointerCalldataBlock = /** @class */ (function (_super) {
    __extends(PointerCalldataBlock, _super);
    function PointerCalldataBlock(name, signature, parentName, dependency, parent) {
        var _this = this;
        var headerSizeInBytes = PointerCalldataBlock._EMPTY_HEADER_SIZE;
        var bodySizeInBytes = PointerCalldataBlock._DEPENDENT_PAYLOAD_SIZE_IN_BYTES;
        _this = _super.call(this, name, signature, parentName, headerSizeInBytes, bodySizeInBytes) || this;
        _this._parent = parent;
        _this._dependency = dependency;
        _this._aliasFor = undefined;
        return _this;
    }
    PointerCalldataBlock.prototype.toBuffer = function () {
        var destinationOffset = this._aliasFor !== undefined ? this._aliasFor.getOffsetInBytes() : this._dependency.getOffsetInBytes();
        var parentOffset = this._parent.getOffsetInBytes();
        var parentHeaderSize = this._parent.getHeaderSizeInBytes();
        var pointer = destinationOffset - (parentOffset + parentHeaderSize);
        var pointerHex = "0x" + pointer.toString(constants_1.constants.HEX_BASE);
        var pointerBuf = ethUtil.toBuffer(pointerHex);
        var pointerBufPadded = ethUtil.setLengthLeft(pointerBuf, constants_1.constants.EVM_WORD_WIDTH_IN_BYTES);
        return pointerBufPadded;
    };
    PointerCalldataBlock.prototype.getDependency = function () {
        return this._dependency;
    };
    PointerCalldataBlock.prototype.setAlias = function (block) {
        this._aliasFor = block;
        this._setName(this.getName() + " (alias for " + block.getName() + ")");
    };
    PointerCalldataBlock.prototype.getAlias = function () {
        return this._aliasFor;
    };
    PointerCalldataBlock.prototype.getRawData = function () {
        var dependencyRawData = this._dependency.getRawData();
        var rawDataComponents = [];
        rawDataComponents.push(PointerCalldataBlock.RAW_DATA_START);
        rawDataComponents.push(dependencyRawData);
        rawDataComponents.push(PointerCalldataBlock.RAW_DATA_END);
        var rawData = Buffer.concat(rawDataComponents);
        return rawData;
    };
    PointerCalldataBlock.RAW_DATA_START = new Buffer('<');
    PointerCalldataBlock.RAW_DATA_END = new Buffer('>');
    PointerCalldataBlock._DEPENDENT_PAYLOAD_SIZE_IN_BYTES = 32;
    PointerCalldataBlock._EMPTY_HEADER_SIZE = 0;
    return PointerCalldataBlock;
}(calldata_block_1.CalldataBlock));
exports.PointerCalldataBlock = PointerCalldataBlock;
//# sourceMappingURL=pointer.js.map