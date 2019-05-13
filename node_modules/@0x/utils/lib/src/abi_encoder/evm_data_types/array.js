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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var set_1 = require("../abstract_data_types/types/set");
var constants_1 = require("../utils/constants");
var ArrayDataType = /** @class */ (function (_super) {
    __extends(ArrayDataType, _super);
    function ArrayDataType(dataItem, dataTypeFactory) {
        var _this = this;
        // Construct parent
        var isArray = true;
        var _a = __read(ArrayDataType._decodeElementTypeAndLengthFromType(dataItem.type), 2), arrayElementType = _a[0], arrayLength = _a[1];
        _this = _super.call(this, dataItem, dataTypeFactory, isArray, arrayLength, arrayElementType) || this;
        // Set array properties
        _this._elementType = arrayElementType;
        return _this;
    }
    ArrayDataType.matchType = function (type) {
        return ArrayDataType._MATCHER.test(type);
    };
    ArrayDataType._decodeElementTypeAndLengthFromType = function (type) {
        var matches = ArrayDataType._MATCHER.exec(type);
        if (matches === null || matches.length !== 3) {
            throw new Error("Could not parse array: " + type);
        }
        else if (matches[1] === undefined) {
            throw new Error("Could not parse array type: " + type);
        }
        else if (matches[2] === undefined) {
            throw new Error("Could not parse array length: " + type);
        }
        var arrayElementType = matches[1];
        var arrayLength = _.isEmpty(matches[2]) ? undefined : parseInt(matches[2], constants_1.constants.DEC_BASE);
        return [arrayElementType, arrayLength];
    };
    ArrayDataType.prototype.getSignatureType = function () {
        return this._computeSignature(false);
    };
    ArrayDataType.prototype.getSignature = function (isDetailed) {
        if (_.isEmpty(this.getDataItem().name) || !isDetailed) {
            return this.getSignatureType();
        }
        var name = this.getDataItem().name;
        var lastIndexOfScopeDelimiter = name.lastIndexOf('.');
        var isScopedName = lastIndexOfScopeDelimiter !== undefined && lastIndexOfScopeDelimiter > 0;
        var shortName = isScopedName ? name.substr(lastIndexOfScopeDelimiter + 1) : name;
        var detailedSignature = shortName + " " + this._computeSignature(isDetailed);
        return detailedSignature;
    };
    ArrayDataType.prototype._computeSignature = function (isDetailed) {
        // Compute signature for a single array element
        var elementDataItem = {
            type: this._elementType,
            name: '',
        };
        var elementComponents = this.getDataItem().components;
        if (elementComponents !== undefined) {
            elementDataItem.components = elementComponents;
        }
        var elementDataType = this.getFactory().create(elementDataItem);
        var elementSignature = elementDataType.getSignature(isDetailed);
        // Construct signature for array of type `element`
        if (this._arrayLength === undefined) {
            return elementSignature + "[]";
        }
        else {
            return elementSignature + "[" + this._arrayLength + "]";
        }
    };
    ArrayDataType._MATCHER = RegExp('^(.+)\\[([0-9]*)\\]$');
    return ArrayDataType;
}(set_1.AbstractSetDataType));
exports.ArrayDataType = ArrayDataType;
//# sourceMappingURL=array.js.map