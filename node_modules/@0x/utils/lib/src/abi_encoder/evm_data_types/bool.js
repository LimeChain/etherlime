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
var configured_bignumber_1 = require("../../configured_bignumber");
var blob_1 = require("../abstract_data_types/types/blob");
var constants_1 = require("../utils/constants");
var BoolDataType = /** @class */ (function (_super) {
    __extends(BoolDataType, _super);
    function BoolDataType(dataItem, dataTypeFactory) {
        var _this = _super.call(this, dataItem, dataTypeFactory, BoolDataType._SIZE_KNOWN_AT_COMPILE_TIME) || this;
        if (!BoolDataType.matchType(dataItem.type)) {
            throw new Error("Tried to instantiate Bool with bad input: " + dataItem);
        }
        return _this;
    }
    BoolDataType.matchType = function (type) {
        return type === ethereum_types_1.SolidityTypes.Bool;
    };
    // Disable prefer-function-over-method for inherited abstract methods.
    /* tslint:disable prefer-function-over-method */
    BoolDataType.prototype.encodeValue = function (value) {
        var encodedValue = value ? '0x1' : '0x0';
        var encodedValueBuf = ethUtil.setLengthLeft(ethUtil.toBuffer(encodedValue), constants_1.constants.EVM_WORD_WIDTH_IN_BYTES);
        return encodedValueBuf;
    };
    BoolDataType.prototype.decodeValue = function (calldata) {
        var valueBuf = calldata.popWord();
        var valueHex = ethUtil.bufferToHex(valueBuf);
        // Hack @hysz: there are some cases where `false` is encoded as 0x instead of 0x0.
        var valueNumber = valueHex === '0x' ? new configured_bignumber_1.BigNumber(0) : new configured_bignumber_1.BigNumber(valueHex, constants_1.constants.HEX_BASE);
        if (!(valueNumber.isEqualTo(0) || valueNumber.isEqualTo(1))) {
            throw new Error("Failed to decode boolean. Expected 0x0 or 0x1, got " + valueHex);
        }
        /* tslint:disable boolean-naming */
        var value = !valueNumber.isEqualTo(0);
        /* tslint:enable boolean-naming */
        return value;
    };
    BoolDataType.prototype.getDefaultValue = function () {
        return BoolDataType._DEFAULT_VALUE;
    };
    BoolDataType.prototype.getSignatureType = function () {
        return ethereum_types_1.SolidityTypes.Bool;
    };
    BoolDataType._SIZE_KNOWN_AT_COMPILE_TIME = true;
    BoolDataType._DEFAULT_VALUE = false;
    return BoolDataType;
}(blob_1.AbstractBlobDataType));
exports.BoolDataType = BoolDataType;
//# sourceMappingURL=bool.js.map