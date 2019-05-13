"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("@0x/utils");
var _ = require("lodash");
exports.utils = {
    convertHexToNumber: function (value) {
        var valueBigNumber = new utils_1.BigNumber(value);
        var valueNumber = valueBigNumber.toNumber();
        return valueNumber;
    },
    convertHexToNumberOrNull: function (hex) {
        if (hex === null) {
            return null;
        }
        var decimal = exports.utils.convertHexToNumber(hex);
        return decimal;
    },
    convertAmountToBigNumber: function (value) {
        var num = value || 0;
        var isBigNumber = utils_1.BigNumber.isBigNumber(num);
        if (isBigNumber) {
            return num;
        }
        if (_.isString(num) && (num.indexOf('0x') === 0 || num.indexOf('-0x') === 0)) {
            return new utils_1.BigNumber(num.replace('0x', ''), 16);
        }
        var baseTen = 10;
        return new utils_1.BigNumber(num.toString(baseTen), baseTen);
    },
    encodeAmountAsHexString: function (value) {
        var valueBigNumber = exports.utils.convertAmountToBigNumber(value);
        var hexBase = 16;
        var valueHex = valueBigNumber.toString(hexBase);
        return valueBigNumber.isLessThan(0) ? "-0x" + valueHex.substr(1) : "0x" + valueHex;
    },
    numberToHex: function (value) {
        if (!isFinite(value) && !exports.utils.isHexStrict(value)) {
            throw new Error("Given input " + value + " is not a number.");
        }
        var valueBigNumber = new utils_1.BigNumber(value);
        var hexBase = 16;
        var result = valueBigNumber.toString(hexBase);
        return valueBigNumber.lt(0) ? "-0x" + result.substr(1) : "0x" + result;
    },
    isHexStrict: function (hex) {
        return ((_.isString(hex) || _.isNumber(hex)) && /^(-)?0x[0-9a-f]*$/i.test(_.isNumber(hex) ? hex.toString() : hex));
    },
};
//# sourceMappingURL=utils.js.map