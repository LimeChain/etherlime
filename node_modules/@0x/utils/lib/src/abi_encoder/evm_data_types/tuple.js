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
var ethereum_types_1 = require("ethereum-types");
var _ = require("lodash");
var set_1 = require("../abstract_data_types/types/set");
var TupleDataType = /** @class */ (function (_super) {
    __extends(TupleDataType, _super);
    function TupleDataType(dataItem, dataTypeFactory) {
        var _this = _super.call(this, dataItem, dataTypeFactory) || this;
        if (!TupleDataType.matchType(dataItem.type)) {
            throw new Error("Tried to instantiate Tuple with bad input: " + dataItem);
        }
        return _this;
    }
    TupleDataType.matchType = function (type) {
        return type === ethereum_types_1.SolidityTypes.Tuple;
    };
    TupleDataType.prototype.getSignatureType = function () {
        return this._computeSignatureOfMembers(false);
    };
    TupleDataType.prototype.getSignature = function (isDetailed) {
        if (_.isEmpty(this.getDataItem().name) || !isDetailed) {
            return this.getSignatureType();
        }
        var name = this.getDataItem().name;
        var lastIndexOfScopeDelimiter = name.lastIndexOf('.');
        var isScopedName = lastIndexOfScopeDelimiter !== undefined && lastIndexOfScopeDelimiter > 0;
        var shortName = isScopedName ? name.substr(lastIndexOfScopeDelimiter + 1) : name;
        var detailedSignature = shortName + " " + this._computeSignatureOfMembers(isDetailed);
        return detailedSignature;
    };
    return TupleDataType;
}(set_1.AbstractSetDataType));
exports.TupleDataType = TupleDataType;
//# sourceMappingURL=tuple.js.map