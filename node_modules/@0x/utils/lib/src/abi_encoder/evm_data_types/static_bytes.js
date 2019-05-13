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
var ethUtil = require("ethereumjs-util");
var _ = require("lodash");
var blob_1 = require("../abstract_data_types/types/blob");
var constants_1 = require("../utils/constants");
var StaticBytesDataType = /** @class */ (function (_super) {
    __extends(StaticBytesDataType, _super);
    function StaticBytesDataType(dataItem, dataTypeFactory) {
        var _this = _super.call(this, dataItem, dataTypeFactory, StaticBytesDataType._SIZE_KNOWN_AT_COMPILE_TIME) || this;
        if (!StaticBytesDataType.matchType(dataItem.type)) {
            throw new Error("Tried to instantiate Static Bytes with bad input: " + dataItem);
        }
        _this._width = StaticBytesDataType._decodeWidthFromType(dataItem.type);
        return _this;
    }
    StaticBytesDataType.matchType = function (type) {
        return StaticBytesDataType._MATCHER.test(type);
    };
    StaticBytesDataType._decodeWidthFromType = function (type) {
        var matches = StaticBytesDataType._MATCHER.exec(type);
        var width = matches !== null && matches.length === 3 && matches[2] !== undefined
            ? parseInt(matches[2], constants_1.constants.DEC_BASE)
            : StaticBytesDataType._DEFAULT_WIDTH;
        return width;
    };
    StaticBytesDataType.prototype.getSignatureType = function () {
        // Note that `byte` reduces to `bytes1`
        return "" + ethereum_types_1.SolidityTypes.Bytes + this._width;
    };
    StaticBytesDataType.prototype.encodeValue = function (value) {
        // 1/2 Convert value into a buffer and do bounds checking
        this._sanityCheckValue(value);
        var valueBuf = ethUtil.toBuffer(value);
        // 2/2 Store value as hex
        var valuePadded = ethUtil.setLengthRight(valueBuf, constants_1.constants.EVM_WORD_WIDTH_IN_BYTES);
        return valuePadded;
    };
    StaticBytesDataType.prototype.decodeValue = function (calldata) {
        var valueBufPadded = calldata.popWord();
        var valueBuf = valueBufPadded.slice(0, this._width);
        var value = ethUtil.bufferToHex(valueBuf);
        this._sanityCheckValue(value);
        return value;
    };
    StaticBytesDataType.prototype.getDefaultValue = function () {
        var valueBufPadded = constants_1.constants.EMPTY_EVM_WORD_BUFFER;
        var valueBuf = valueBufPadded.slice(0, this._width);
        var value = ethUtil.bufferToHex(valueBuf);
        return value;
    };
    StaticBytesDataType.prototype._sanityCheckValue = function (value) {
        if (typeof value === 'string') {
            if (!_.startsWith(value, '0x')) {
                throw new Error("Tried to encode non-hex value. Value must include '0x' prefix.");
            }
            else if (value.length % 2 !== 0) {
                throw new Error("Tried to assign " + value + ", which is contains a half-byte. Use full bytes only.");
            }
        }
        var valueBuf = ethUtil.toBuffer(value);
        if (valueBuf.byteLength > this._width) {
            throw new Error("Tried to assign " + value + " (" + valueBuf.byteLength + " bytes), which exceeds max bytes that can be stored in a " + this.getSignature());
        }
    };
    StaticBytesDataType._SIZE_KNOWN_AT_COMPILE_TIME = true;
    StaticBytesDataType._MATCHER = RegExp('^(byte|bytes(1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|31|32))$');
    StaticBytesDataType._DEFAULT_WIDTH = 1;
    return StaticBytesDataType;
}(blob_1.AbstractBlobDataType));
exports.StaticBytesDataType = StaticBytesDataType;
//# sourceMappingURL=static_bytes.js.map