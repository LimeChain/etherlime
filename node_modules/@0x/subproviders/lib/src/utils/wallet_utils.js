"use strict";
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ethUtil = require("ethereumjs-util");
var DEFAULT_ADDRESS_SEARCH_LIMIT = 1000;
var DerivedHDKeyInfoIterator = /** @class */ (function () {
    function DerivedHDKeyInfoIterator(initialDerivedKey, searchLimit) {
        if (searchLimit === void 0) { searchLimit = DEFAULT_ADDRESS_SEARCH_LIMIT; }
        this._searchLimit = searchLimit;
        this._parentDerivedKeyInfo = initialDerivedKey;
        this._index = 0;
    }
    DerivedHDKeyInfoIterator.prototype.next = function () {
        var baseDerivationPath = this._parentDerivedKeyInfo.baseDerivationPath;
        var derivationIndex = this._index;
        var fullDerivationPath = "m/" + baseDerivationPath + "/" + derivationIndex;
        var path = "m/" + derivationIndex;
        var hdKey = this._parentDerivedKeyInfo.hdKey.derive(path);
        var address = exports.walletUtils.addressOfHDKey(hdKey);
        var derivedKey = {
            address: address,
            hdKey: hdKey,
            baseDerivationPath: baseDerivationPath,
            derivationPath: fullDerivationPath,
        };
        var isDone = this._index === this._searchLimit;
        this._index++;
        return {
            done: isDone,
            value: derivedKey,
        };
    };
    DerivedHDKeyInfoIterator.prototype[Symbol.iterator] = function () {
        return this;
    };
    return DerivedHDKeyInfoIterator;
}());
exports.walletUtils = {
    calculateDerivedHDKeyInfos: function (parentDerivedKeyInfo, numberOfKeys) {
        var e_1, _a;
        var derivedKeys = [];
        var derivedKeyIterator = new DerivedHDKeyInfoIterator(parentDerivedKeyInfo, numberOfKeys);
        try {
            for (var derivedKeyIterator_1 = __values(derivedKeyIterator), derivedKeyIterator_1_1 = derivedKeyIterator_1.next(); !derivedKeyIterator_1_1.done; derivedKeyIterator_1_1 = derivedKeyIterator_1.next()) {
                var key = derivedKeyIterator_1_1.value;
                derivedKeys.push(key);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (derivedKeyIterator_1_1 && !derivedKeyIterator_1_1.done && (_a = derivedKeyIterator_1.return)) _a.call(derivedKeyIterator_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return derivedKeys;
    },
    findDerivedKeyInfoForAddressIfExists: function (address, parentDerivedKeyInfo, searchLimit) {
        var e_2, _a;
        var lowercaseAddress = address.toLowerCase();
        var matchedKey;
        var derivedKeyIterator = new DerivedHDKeyInfoIterator(parentDerivedKeyInfo, searchLimit);
        try {
            for (var derivedKeyIterator_2 = __values(derivedKeyIterator), derivedKeyIterator_2_1 = derivedKeyIterator_2.next(); !derivedKeyIterator_2_1.done; derivedKeyIterator_2_1 = derivedKeyIterator_2.next()) {
                var key = derivedKeyIterator_2_1.value;
                if (key.address === lowercaseAddress) {
                    matchedKey = key;
                    break;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (derivedKeyIterator_2_1 && !derivedKeyIterator_2_1.done && (_a = derivedKeyIterator_2.return)) _a.call(derivedKeyIterator_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return matchedKey;
    },
    addressOfHDKey: function (hdKey) {
        var shouldSanitizePublicKey = true;
        var derivedPublicKey = hdKey.publicKey;
        var ethereumAddressUnprefixed = ethUtil
            .publicToAddress(derivedPublicKey, shouldSanitizePublicKey)
            .toString('hex');
        var address = ethUtil.addHexPrefix(ethereumAddressUnprefixed).toLowerCase();
        return address;
    },
};
//# sourceMappingURL=wallet_utils.js.map