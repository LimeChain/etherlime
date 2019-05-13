"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ethereumjs_util_1 = require("ethereumjs-util");
var jsSHA3 = require("js-sha3");
var _ = require("lodash");
var random_1 = require("./random");
var BASIC_ADDRESS_REGEX = /^(0x)?[0-9a-f]{40}$/i;
var SAME_CASE_ADDRESS_REGEX = /^(0x)?([0-9a-f]{40}|[0-9A-F]{40})$/;
var ADDRESS_LENGTH = 40;
exports.addressUtils = {
    isChecksumAddress: function (address) {
        // Check each case
        var unprefixedAddress = address.replace('0x', '');
        var addressHash = jsSHA3.keccak256(unprefixedAddress.toLowerCase());
        for (var i = 0; i < ADDRESS_LENGTH; i++) {
            // The nth letter should be uppercase if the nth digit of casemap is 1
            var hexBase = 16;
            var lowercaseRange = 7;
            if ((parseInt(addressHash[i], hexBase) > lowercaseRange &&
                unprefixedAddress[i].toUpperCase() !== unprefixedAddress[i]) ||
                (parseInt(addressHash[i], hexBase) <= lowercaseRange &&
                    unprefixedAddress[i].toLowerCase() !== unprefixedAddress[i])) {
                return false;
            }
        }
        return true;
    },
    isAddress: function (address) {
        if (!BASIC_ADDRESS_REGEX.test(address)) {
            // Check if it has the basic requirements of an address
            return false;
        }
        else if (SAME_CASE_ADDRESS_REGEX.test(address)) {
            // If it's all small caps or all all caps, return true
            return true;
        }
        else {
            // Otherwise check each case
            var isValidChecksummedAddress = exports.addressUtils.isChecksumAddress(address);
            return isValidChecksummedAddress;
        }
    },
    padZeros: function (address) {
        return ethereumjs_util_1.addHexPrefix(_.padStart(ethereumjs_util_1.stripHexPrefix(address), ADDRESS_LENGTH, '0'));
    },
    generatePseudoRandomAddress: function () {
        var randomBigNum = random_1.generatePseudoRandom256BitNumber();
        var randomBuff = ethereumjs_util_1.sha3(randomBigNum.toString());
        var addressLengthInBytes = 20;
        var randomAddress = "0x" + randomBuff.slice(0, addressLengthInBytes).toString('hex');
        return randomAddress;
    },
};
//# sourceMappingURL=address_utils.js.map