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
var pointer_1 = require("../../calldata/blocks/pointer");
var constants_1 = require("../../utils/constants");
var data_type_1 = require("../data_type");
var AbstractPointerDataType = /** @class */ (function (_super) {
    __extends(AbstractPointerDataType, _super);
    function AbstractPointerDataType(dataItem, factory, destination, parent) {
        var _this = _super.call(this, dataItem, factory) || this;
        _this._destination = destination;
        _this._parent = parent;
        return _this;
    }
    AbstractPointerDataType.prototype.generateCalldataBlock = function (value, parentBlock) {
        if (parentBlock === undefined) {
            throw new Error("DependentDataType requires a parent block to generate its block");
        }
        var destinationBlock = this._destination.generateCalldataBlock(value, parentBlock);
        var name = this.getDataItem().name;
        var signature = this.getSignature();
        var parentName = parentBlock.getName();
        var block = new pointer_1.PointerCalldataBlock(name, signature, parentName, destinationBlock, parentBlock);
        return block;
    };
    AbstractPointerDataType.prototype.generateValue = function (calldata, rules) {
        var destinationOffsetBuf = calldata.popWord();
        var destinationOffsetHex = ethUtil.bufferToHex(destinationOffsetBuf);
        var destinationOffsetRelative = parseInt(destinationOffsetHex, constants_1.constants.HEX_BASE);
        var destinationOffsetAbsolute = calldata.toAbsoluteOffset(destinationOffsetRelative);
        var currentOffset = calldata.getOffset();
        calldata.setOffset(destinationOffsetAbsolute);
        var value = this._destination.generateValue(calldata, rules);
        calldata.setOffset(currentOffset);
        return value;
    };
    // Disable prefer-function-over-method for inherited abstract method.
    /* tslint:disable prefer-function-over-method */
    AbstractPointerDataType.prototype.isStatic = function () {
        return true;
    };
    return AbstractPointerDataType;
}(data_type_1.DataType));
exports.AbstractPointerDataType = AbstractPointerDataType;
//# sourceMappingURL=pointer.js.map