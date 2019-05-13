"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var calldata_1 = require("../calldata/calldata");
var raw_calldata_1 = require("../calldata/raw_calldata");
var constants_1 = require("../utils/constants");
var DataType = /** @class */ (function () {
    function DataType(dataItem, factory) {
        this._dataItem = dataItem;
        this._factory = factory;
    }
    DataType.prototype.getDataItem = function () {
        return this._dataItem;
    };
    DataType.prototype.getFactory = function () {
        return this._factory;
    };
    DataType.prototype.encode = function (value, rules, selector) {
        var rules_ = rules === undefined ? constants_1.constants.DEFAULT_ENCODING_RULES : rules;
        var calldata = new calldata_1.Calldata(rules_);
        if (selector !== undefined) {
            calldata.setSelector(selector);
        }
        var block = this.generateCalldataBlock(value);
        calldata.setRoot(block);
        var encodedCalldata = calldata.toString();
        return encodedCalldata;
    };
    DataType.prototype.decode = function (calldata, rules, selector) {
        if (selector !== undefined && !_.startsWith(calldata, selector)) {
            throw new Error("Tried to decode calldata, but it was missing the function selector. Expected prefix '" + selector + "'. Got '" + calldata + "'.");
        }
        var hasSelector = selector !== undefined;
        var rawCalldata = new raw_calldata_1.RawCalldata(calldata, hasSelector);
        var rules_ = rules === undefined ? constants_1.constants.DEFAULT_DECODING_RULES : rules;
        var value = rawCalldata.getSizeInBytes() > 0 ? this.generateValue(rawCalldata, rules_) : this.getDefaultValue(rules_);
        return value;
    };
    DataType.prototype.decodeAsArray = function (returndata, rules) {
        var value = this.decode(returndata, rules);
        var valuesAsArray = _.isObject(value) ? _.values(value) : [value];
        return valuesAsArray;
    };
    DataType.prototype.getSignature = function (isDetailed) {
        if (_.isEmpty(this._dataItem.name) || !isDetailed) {
            return this.getSignatureType();
        }
        var name = this.getDataItem().name;
        var lastIndexOfScopeDelimiter = name.lastIndexOf('.');
        var isScopedName = lastIndexOfScopeDelimiter !== undefined && lastIndexOfScopeDelimiter > 0;
        var shortName = isScopedName ? name.substr(lastIndexOfScopeDelimiter + 1) : name;
        var detailedSignature = shortName + " " + this.getSignatureType();
        return detailedSignature;
    };
    return DataType;
}());
exports.DataType = DataType;
//# sourceMappingURL=data_type.js.map