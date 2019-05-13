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
var pointer_1 = require("../abstract_data_types/types/pointer");
var PointerDataType = /** @class */ (function (_super) {
    __extends(PointerDataType, _super);
    function PointerDataType(destDataType, parentDataType, dataTypeFactory) {
        var _this = this;
        var destDataItem = destDataType.getDataItem();
        var dataItem = { name: "ptr<" + destDataItem.name + ">", type: "ptr<" + destDataItem.type + ">" };
        _this = _super.call(this, dataItem, dataTypeFactory, destDataType, parentDataType) || this;
        return _this;
    }
    PointerDataType.prototype.getSignatureType = function () {
        return this._destination.getSignature(false);
    };
    PointerDataType.prototype.getSignature = function (isDetailed) {
        return this._destination.getSignature(isDetailed);
    };
    PointerDataType.prototype.getDefaultValue = function () {
        var defaultValue = this._destination.getDefaultValue();
        return defaultValue;
    };
    return PointerDataType;
}(pointer_1.AbstractPointerDataType));
exports.PointerDataType = PointerDataType;
//# sourceMappingURL=pointer.js.map