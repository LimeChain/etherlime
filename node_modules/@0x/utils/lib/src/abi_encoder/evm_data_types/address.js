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
var AddressDataType = /** @class */ (function (_super) {
    __extends(AddressDataType, _super);
    function AddressDataType(dataItem, dataTypeFactory) {
        var _this = _super.call(this, dataItem, dataTypeFactory, AddressDataType._SIZE_KNOWN_AT_COMPILE_TIME) || this;
        if (!AddressDataType.matchType(dataItem.type)) {
            throw new Error("Tried to instantiate Address with bad input: " + dataItem);
        }
        return _this;
    }
    AddressDataType.matchType = function (type) {
        return type === ethereum_types_1.SolidityTypes.Address;
    };
    // Disable prefer-function-over-method for inherited abstract methods.
    /* tslint:disable prefer-function-over-method */
    AddressDataType.prototype.encodeValue = function (value) {
        if (!ethUtil.isValidAddress(value)) {
            throw new Error("Invalid address: '" + value + "'");
        }
        var valueBuf = ethUtil.toBuffer(value);
        var encodedValueBuf = ethUtil.setLengthLeft(valueBuf, constants_1.constants.EVM_WORD_WIDTH_IN_BYTES);
        return encodedValueBuf;
    };
    AddressDataType.prototype.decodeValue = function (calldata) {
        var valueBufPadded = calldata.popWord();
        var valueBuf = valueBufPadded.slice(AddressDataType._DECODED_ADDRESS_OFFSET_IN_BYTES);
        var value = ethUtil.bufferToHex(valueBuf);
        var valueLowercase = _.toLower(value);
        return valueLowercase;
    };
    AddressDataType.prototype.getDefaultValue = function () {
        return AddressDataType._DEFAULT_VALUE;
    };
    AddressDataType.prototype.getSignatureType = function () {
        return ethereum_types_1.SolidityTypes.Address;
    };
    AddressDataType._SIZE_KNOWN_AT_COMPILE_TIME = true;
    AddressDataType._ADDRESS_SIZE_IN_BYTES = 20;
    AddressDataType._DECODED_ADDRESS_OFFSET_IN_BYTES = constants_1.constants.EVM_WORD_WIDTH_IN_BYTES - AddressDataType._ADDRESS_SIZE_IN_BYTES;
    AddressDataType._DEFAULT_VALUE = '0x0000000000000000000000000000000000000000';
    return AddressDataType;
}(blob_1.AbstractBlobDataType));
exports.AddressDataType = AddressDataType;
//# sourceMappingURL=address.js.map