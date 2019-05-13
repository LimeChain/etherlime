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
var blob_1 = require("../../calldata/blocks/blob");
var data_type_1 = require("../data_type");
var AbstractBlobDataType = /** @class */ (function (_super) {
    __extends(AbstractBlobDataType, _super);
    function AbstractBlobDataType(dataItem, factory, sizeKnownAtCompileTime) {
        var _this = _super.call(this, dataItem, factory) || this;
        _this._sizeKnownAtCompileTime = sizeKnownAtCompileTime;
        return _this;
    }
    AbstractBlobDataType.prototype.generateCalldataBlock = function (value, parentBlock) {
        var encodedValue = this.encodeValue(value);
        var name = this.getDataItem().name;
        var signature = this.getSignature();
        var parentName = parentBlock === undefined ? '' : parentBlock.getName();
        var block = new blob_1.BlobCalldataBlock(name, signature, parentName, encodedValue);
        return block;
    };
    AbstractBlobDataType.prototype.generateValue = function (calldata, rules) {
        var value = this.decodeValue(calldata);
        return value;
    };
    AbstractBlobDataType.prototype.isStatic = function () {
        return this._sizeKnownAtCompileTime;
    };
    return AbstractBlobDataType;
}(data_type_1.DataType));
exports.AbstractBlobDataType = AbstractBlobDataType;
//# sourceMappingURL=blob.js.map