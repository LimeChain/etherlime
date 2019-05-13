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
var ethers = require("ethers");
var configured_bignumber_1 = require("./configured_bignumber");
exports.signTypedDataUtils = {
    /**
     * Generates the EIP712 Typed Data hash for signing
     * @param   typedData An object that conforms to the EIP712TypedData interface
     * @return  A Buffer containing the hash of the typed data.
     */
    generateTypedDataHash: function (typedData) {
        return ethUtil.sha3(Buffer.concat([
            Buffer.from('1901', 'hex'),
            exports.signTypedDataUtils._structHash('EIP712Domain', typedData.domain, typedData.types),
            exports.signTypedDataUtils._structHash(typedData.primaryType, typedData.message, typedData.types),
        ]));
    },
    _findDependencies: function (primaryType, types, found) {
        if (found === void 0) { found = []; }
        var e_1, _a, e_2, _b;
        if (found.includes(primaryType) || types[primaryType] === undefined) {
            return found;
        }
        found.push(primaryType);
        try {
            for (var _c = __values(types[primaryType]), _d = _c.next(); !_d.done; _d = _c.next()) {
                var field = _d.value;
                try {
                    for (var _e = __values(exports.signTypedDataUtils._findDependencies(field.type, types, found)), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var dep = _f.value;
                        if (!found.includes(dep)) {
                            found.push(dep);
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return found;
    },
    _encodeType: function (primaryType, types) {
        var e_3, _a;
        var deps = exports.signTypedDataUtils._findDependencies(primaryType, types);
        deps = deps.filter(function (d) { return d !== primaryType; });
        deps = [primaryType].concat(deps.sort());
        var result = '';
        try {
            for (var deps_1 = __values(deps), deps_1_1 = deps_1.next(); !deps_1_1.done; deps_1_1 = deps_1.next()) {
                var dep = deps_1_1.value;
                result += dep + "(" + types[dep].map(function (_a) {
                    var name = _a.name, type = _a.type;
                    return type + " " + name;
                }).join(',') + ")";
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (deps_1_1 && !deps_1_1.done && (_a = deps_1.return)) _a.call(deps_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return result;
    },
    _encodeData: function (primaryType, data, types) {
        var e_4, _a;
        var encodedTypes = ['bytes32'];
        var encodedValues = [exports.signTypedDataUtils._typeHash(primaryType, types)];
        try {
            for (var _b = __values(types[primaryType]), _c = _b.next(); !_c.done; _c = _b.next()) {
                var field = _c.value;
                var value = data[field.name];
                if (field.type === 'string' || field.type === 'bytes') {
                    var hashValue = ethUtil.sha3(value);
                    encodedTypes.push('bytes32');
                    encodedValues.push(hashValue);
                }
                else if (types[field.type] !== undefined) {
                    encodedTypes.push('bytes32');
                    var hashValue = ethUtil.sha3(
                    // tslint:disable-next-line:no-unnecessary-type-assertion
                    exports.signTypedDataUtils._encodeData(field.type, value, types));
                    encodedValues.push(hashValue);
                }
                else if (field.type.lastIndexOf(']') === field.type.length - 1) {
                    throw new Error('Arrays currently unimplemented in encodeData');
                }
                else {
                    encodedTypes.push(field.type);
                    var normalizedValue = exports.signTypedDataUtils._normalizeValue(field.type, value);
                    encodedValues.push(normalizedValue);
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return ethers.utils.defaultAbiCoder.encode(encodedTypes, encodedValues);
    },
    _normalizeValue: function (type, value) {
        var normalizedValue = type === 'uint256' && configured_bignumber_1.BigNumber.isBigNumber(value) ? value.toString() : value;
        return normalizedValue;
    },
    _typeHash: function (primaryType, types) {
        return ethUtil.sha3(exports.signTypedDataUtils._encodeType(primaryType, types));
    },
    _structHash: function (primaryType, data, types) {
        return ethUtil.sha3(exports.signTypedDataUtils._encodeData(primaryType, data, types));
    },
};
//# sourceMappingURL=sign_typed_data_utils.js.map