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
var configured_bignumber_1 = require("../../configured_bignumber");
var blob_1 = require("../abstract_data_types/types/blob");
var constants_1 = require("../utils/constants");
var EncoderMath = require("../utils/math");
var UIntDataType = /** @class */ (function (_super) {
    __extends(UIntDataType, _super);
    function UIntDataType(dataItem, dataTypeFactory) {
        var _this = _super.call(this, dataItem, dataTypeFactory, UIntDataType._SIZE_KNOWN_AT_COMPILE_TIME) || this;
        if (!UIntDataType.matchType(dataItem.type)) {
            throw new Error("Tried to instantiate UInt with bad input: " + dataItem);
        }
        _this._width = UIntDataType._decodeWidthFromType(dataItem.type);
        _this._maxValue = new configured_bignumber_1.BigNumber(2).exponentiatedBy(_this._width).minus(1);
        return _this;
    }
    UIntDataType.matchType = function (type) {
        return UIntDataType._MATCHER.test(type);
    };
    UIntDataType._decodeWidthFromType = function (type) {
        var matches = UIntDataType._MATCHER.exec(type);
        var width = matches !== null && matches.length === 2 && matches[1] !== undefined
            ? parseInt(matches[1], constants_1.constants.DEC_BASE)
            : UIntDataType._DEFAULT_WIDTH;
        return width;
    };
    UIntDataType.prototype.encodeValue = function (value) {
        var encodedValue = EncoderMath.safeEncodeNumericValue(value, UIntDataType._MIN_VALUE, this._maxValue);
        return encodedValue;
    };
    UIntDataType.prototype.decodeValue = function (calldata) {
        var valueBuf = calldata.popWord();
        var value = EncoderMath.safeDecodeNumericValue(valueBuf, UIntDataType._MIN_VALUE, this._maxValue);
        if (this._width === constants_1.constants.NUMBER_OF_BYTES_IN_UINT8) {
            return value.toNumber();
        }
        return value;
    };
    UIntDataType.prototype.getDefaultValue = function () {
        var defaultValue = UIntDataType._DEFAULT_VALUE;
        if (this._width === constants_1.constants.NUMBER_OF_BYTES_IN_UINT8) {
            return defaultValue.toNumber();
        }
        return defaultValue;
    };
    UIntDataType.prototype.getSignatureType = function () {
        return "" + ethereum_types_1.SolidityTypes.Uint + this._width;
    };
    UIntDataType._MATCHER = RegExp('^uint(8|16|24|32|40|48|56|64|72|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256){0,1}$');
    UIntDataType._SIZE_KNOWN_AT_COMPILE_TIME = true;
    UIntDataType._MAX_WIDTH = 256;
    UIntDataType._DEFAULT_WIDTH = UIntDataType._MAX_WIDTH;
    UIntDataType._MIN_VALUE = new configured_bignumber_1.BigNumber(0);
    UIntDataType._DEFAULT_VALUE = new configured_bignumber_1.BigNumber(0);
    return UIntDataType;
}(blob_1.AbstractBlobDataType));
exports.UIntDataType = UIntDataType;
//# sourceMappingURL=uint.js.map