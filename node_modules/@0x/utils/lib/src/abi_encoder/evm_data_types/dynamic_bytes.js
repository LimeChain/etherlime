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
var DynamicBytesDataType = /** @class */ (function (_super) {
    __extends(DynamicBytesDataType, _super);
    function DynamicBytesDataType(dataItem, dataTypeFactory) {
        var _this = _super.call(this, dataItem, dataTypeFactory, DynamicBytesDataType._SIZE_KNOWN_AT_COMPILE_TIME) || this;
        if (!DynamicBytesDataType.matchType(dataItem.type)) {
            throw new Error("Tried to instantiate Dynamic Bytes with bad input: " + dataItem);
        }
        return _this;
    }
    DynamicBytesDataType.matchType = function (type) {
        return type === ethereum_types_1.SolidityTypes.Bytes;
    };
    DynamicBytesDataType._sanityCheckValue = function (value) {
        if (typeof value !== 'string') {
            return;
        }
        if (!_.startsWith(value, '0x')) {
            throw new Error("Tried to encode non-hex value. Value must include '0x' prefix.");
        }
        else if (value.length % 2 !== 0) {
            throw new Error("Tried to assign " + value + ", which is contains a half-byte. Use full bytes only.");
        }
    };
    // Disable prefer-function-over-method for inherited abstract methods.
    /* tslint:disable prefer-function-over-method */
    DynamicBytesDataType.prototype.encodeValue = function (value) {
        // Encoded value is of the form: <length><value>, with each field padded to be word-aligned.
        // 1/3 Construct the length
        var valueBuf = ethUtil.toBuffer(value);
        var wordsToStoreValuePadded = Math.ceil(valueBuf.byteLength / constants_1.constants.EVM_WORD_WIDTH_IN_BYTES);
        var bytesToStoreValuePadded = wordsToStoreValuePadded * constants_1.constants.EVM_WORD_WIDTH_IN_BYTES;
        var lengthBuf = ethUtil.toBuffer(valueBuf.byteLength);
        var lengthBufPadded = ethUtil.setLengthLeft(lengthBuf, constants_1.constants.EVM_WORD_WIDTH_IN_BYTES);
        // 2/3 Construct the value
        DynamicBytesDataType._sanityCheckValue(value);
        var valueBufPadded = ethUtil.setLengthRight(valueBuf, bytesToStoreValuePadded);
        // 3/3 Combine length and value
        var encodedValue = Buffer.concat([lengthBufPadded, valueBufPadded]);
        return encodedValue;
    };
    DynamicBytesDataType.prototype.decodeValue = function (calldata) {
        // Encoded value is of the form: <length><value>, with each field padded to be word-aligned.
        // 1/2 Decode length
        var lengthBuf = calldata.popWord();
        var lengthHex = ethUtil.bufferToHex(lengthBuf);
        var length = parseInt(lengthHex, constants_1.constants.HEX_BASE);
        // 2/2 Decode value
        var wordsToStoreValuePadded = Math.ceil(length / constants_1.constants.EVM_WORD_WIDTH_IN_BYTES);
        var valueBufPadded = calldata.popWords(wordsToStoreValuePadded);
        var valueBuf = valueBufPadded.slice(0, length);
        var value = ethUtil.bufferToHex(valueBuf);
        DynamicBytesDataType._sanityCheckValue(value);
        return value;
    };
    DynamicBytesDataType.prototype.getDefaultValue = function () {
        return DynamicBytesDataType._DEFAULT_VALUE;
    };
    DynamicBytesDataType.prototype.getSignatureType = function () {
        return ethereum_types_1.SolidityTypes.Bytes;
    };
    DynamicBytesDataType._SIZE_KNOWN_AT_COMPILE_TIME = false;
    DynamicBytesDataType._DEFAULT_VALUE = '0x';
    return DynamicBytesDataType;
}(blob_1.AbstractBlobDataType));
exports.DynamicBytesDataType = DynamicBytesDataType;
//# sourceMappingURL=dynamic_bytes.js.map