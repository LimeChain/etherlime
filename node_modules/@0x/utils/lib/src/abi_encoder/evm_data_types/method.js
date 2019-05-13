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
var _ = require("lodash");
var set_1 = require("../abstract_data_types/types/set");
var constants_1 = require("../utils/constants");
var tuple_1 = require("./tuple");
var MethodDataType = /** @class */ (function (_super) {
    __extends(MethodDataType, _super);
    function MethodDataType(abi, dataTypeFactory) {
        var _this = this;
        var methodDataItem = { type: 'method', name: abi.name, components: abi.inputs };
        _this = _super.call(this, methodDataItem, dataTypeFactory) || this;
        _this._methodSignature = _this._computeSignature();
        _this._methodSelector = _this._computeSelector();
        var returnDataItem = { type: 'tuple', name: abi.name, components: abi.outputs };
        _this._returnDataType = new tuple_1.TupleDataType(returnDataItem, _this.getFactory());
        return _this;
    }
    MethodDataType.prototype.encode = function (value, rules) {
        var calldata = _super.prototype.encode.call(this, value, rules, this._methodSelector);
        return calldata;
    };
    MethodDataType.prototype.decode = function (calldata, rules) {
        var value = _super.prototype.decode.call(this, calldata, rules, this._methodSelector);
        return value;
    };
    MethodDataType.prototype.encodeReturnValues = function (value, rules) {
        var returnData = this._returnDataType.encode(value, rules);
        return returnData;
    };
    MethodDataType.prototype.decodeReturnValues = function (returndata, rules) {
        var returnValues = this._returnDataType.decode(returndata, rules);
        return returnValues;
    };
    MethodDataType.prototype.strictDecodeReturnValue = function (returndata, rules) {
        var returnValues = this._returnDataType.decode(returndata, rules);
        var returnValuesAsArray = _.isObject(returnValues) ? _.values(returnValues) : [returnValues];
        switch (returnValuesAsArray.length) {
            case 0:
                return undefined;
            case 1:
                return returnValuesAsArray[0];
            default:
                return returnValuesAsArray;
        }
    };
    MethodDataType.prototype.getSignatureType = function () {
        return this._methodSignature;
    };
    MethodDataType.prototype.getSelector = function () {
        return this._methodSelector;
    };
    MethodDataType.prototype.getReturnValueDataItem = function () {
        var returnValueDataItem = this._returnDataType.getDataItem();
        return returnValueDataItem;
    };
    MethodDataType.prototype._computeSignature = function () {
        var memberSignature = this._computeSignatureOfMembers();
        var methodSignature = "" + this.getDataItem().name + memberSignature;
        return methodSignature;
    };
    MethodDataType.prototype._computeSelector = function () {
        var signature = this._computeSignature();
        var selector = ethUtil.bufferToHex(ethUtil.toBuffer(ethUtil
            .sha3(signature)
            .slice(constants_1.constants.HEX_SELECTOR_BYTE_OFFSET_IN_CALLDATA, constants_1.constants.HEX_SELECTOR_LENGTH_IN_BYTES)));
        return selector;
    };
    return MethodDataType;
}(set_1.AbstractSetDataType));
exports.MethodDataType = MethodDataType;
//# sourceMappingURL=method.js.map