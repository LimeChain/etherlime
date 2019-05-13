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
var blob_1 = require("../abstract_data_types/types/blob");
var constants_1 = require("../utils/constants");
var StringDataType = /** @class */ (function (_super) {
    __extends(StringDataType, _super);
    function StringDataType(dataItem, dataTypeFactory) {
        var _this = _super.call(this, dataItem, dataTypeFactory, StringDataType._SIZE_KNOWN_AT_COMPILE_TIME) || this;
        if (!StringDataType.matchType(dataItem.type)) {
            throw new Error("Tried to instantiate String with bad input: " + dataItem);
        }
        return _this;
    }
    StringDataType.matchType = function (type) {
        return type === ethereum_types_1.SolidityTypes.String;
    };
    // Disable prefer-function-over-method for inherited abstract methods.
    /* tslint:disable prefer-function-over-method */
    StringDataType.prototype.encodeValue = function (value) {
        // Encoded value is of the form: <length><value>, with each field padded to be word-aligned.
        // 1/3 Construct the value
        var valueBuf = new Buffer(value);
        var valueLengthInBytes = valueBuf.byteLength;
        var wordsToStoreValuePadded = Math.ceil(valueLengthInBytes / constants_1.constants.EVM_WORD_WIDTH_IN_BYTES);
        var bytesToStoreValuePadded = wordsToStoreValuePadded * constants_1.constants.EVM_WORD_WIDTH_IN_BYTES;
        var valueBufPadded = ethUtil.setLengthRight(valueBuf, bytesToStoreValuePadded);
        // 2/3 Construct the length
        var lengthBuf = ethUtil.toBuffer(valueLengthInBytes);
        var lengthBufPadded = ethUtil.setLengthLeft(lengthBuf, constants_1.constants.EVM_WORD_WIDTH_IN_BYTES);
        // 3/3 Combine length and value
        var encodedValue = Buffer.concat([lengthBufPadded, valueBufPadded]);
        return encodedValue;
    };
    StringDataType.prototype.decodeValue = function (calldata) {
        // Encoded value is of the form: <length><value>, with each field padded to be word-aligned.
        // 1/2 Decode length
        var lengthBufPadded = calldata.popWord();
        var lengthHexPadded = ethUtil.bufferToHex(lengthBufPadded);
        var length = parseInt(lengthHexPadded, constants_1.constants.HEX_BASE);
        // 2/2 Decode value
        var wordsToStoreValuePadded = Math.ceil(length / constants_1.constants.EVM_WORD_WIDTH_IN_BYTES);
        var valueBufPadded = calldata.popWords(wordsToStoreValuePadded);
        var valueBuf = valueBufPadded.slice(0, length);
        var value = valueBuf.toString('UTF-8');
        return value;
    };
    StringDataType.prototype.getDefaultValue = function () {
        return StringDataType._DEFAULT_VALUE;
    };
    StringDataType.prototype.getSignatureType = function () {
        return ethereum_types_1.SolidityTypes.String;
    };
    StringDataType._SIZE_KNOWN_AT_COMPILE_TIME = false;
    StringDataType._DEFAULT_VALUE = '';
    return StringDataType;
}(blob_1.AbstractBlobDataType));
exports.StringDataType = StringDataType;
//# sourceMappingURL=string.js.map