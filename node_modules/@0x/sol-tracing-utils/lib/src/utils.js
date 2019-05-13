"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("@0x/utils");
var ethereum_types_1 = require("ethereum-types");
var ethereumjs_util_1 = require("ethereumjs-util");
var _ = require("lodash");
var constants_1 = require("./constants");
var bytecodeToContractDataIfExists = {};
exports.utils = {
    compareLineColumn: function (lhs, rhs) {
        return lhs.line !== rhs.line ? lhs.line - rhs.line : lhs.column - rhs.column;
    },
    removeHexPrefix: function (hex) {
        var hexPrefix = '0x';
        return hex.startsWith(hexPrefix) ? hex.slice(hexPrefix.length) : hex;
    },
    isRangeInside: function (childRange, parentRange) {
        return (exports.utils.compareLineColumn(parentRange.start, childRange.start) <= 0 &&
            exports.utils.compareLineColumn(childRange.end, parentRange.end) <= 0);
    },
    isRangeEqual: function (childRange, parentRange) {
        return (exports.utils.compareLineColumn(parentRange.start, childRange.start) === 0 &&
            exports.utils.compareLineColumn(childRange.end, parentRange.end) === 0);
    },
    bytecodeToBytecodeRegex: function (bytecode) {
        var bytecodeRegex = bytecode
            // Library linking placeholder: __ConvertLib____________________________
            .replace(/_.*_/, '.*')
            // Last 86 characters is solidity compiler metadata that's different between compilations
            .replace(/.{86}$/, '')
            // Libraries contain their own address at the beginning of the code and it's impossible to know it in advance
            .replace(/^0x730000000000000000000000000000000000000000/, '0x73........................................');
        // HACK: Node regexes can't be longer that 32767 characters. Contracts bytecode can. We just truncate the regexes. It's safe in practice.
        var MAX_REGEX_LENGTH = 32767;
        var truncatedBytecodeRegex = bytecodeRegex.slice(0, MAX_REGEX_LENGTH);
        return truncatedBytecodeRegex;
    },
    getContractDataIfExists: function (contractsData, bytecode) {
        if (!bytecode.startsWith('0x')) {
            throw new Error("0x hex prefix missing: " + bytecode);
        }
        // HACK(leo): We want to cache the values that are possibly undefined.
        // That's why we can't check for undefined as we usually do, but need to use `hasOwnProperty`.
        if (bytecodeToContractDataIfExists.hasOwnProperty(bytecode)) {
            return bytecodeToContractDataIfExists[bytecode];
        }
        var contractDataCandidates = _.filter(contractsData, function (contractDataCandidate) {
            var bytecodeRegex = exports.utils.bytecodeToBytecodeRegex(contractDataCandidate.bytecode);
            var runtimeBytecodeRegex = exports.utils.bytecodeToBytecodeRegex(contractDataCandidate.runtimeBytecode);
            // We use that function to find by bytecode or runtimeBytecode. Those are quasi-random strings so
            // collisions are practically impossible and it allows us to reuse that code
            return bytecode.match(bytecodeRegex) !== null || bytecode.match(runtimeBytecodeRegex) !== null;
        });
        if (contractDataCandidates.length > 1) {
            var candidates = contractDataCandidates.map(function (contractDataCandidate) { return _.values(contractDataCandidate.sources)[0]; });
            var errMsg = "We've found more than one artifact that contains the exact same bytecode and therefore are unable to detect which contract was executed. " +
                "We'll be assigning all traces to the first one.";
            utils_1.logUtils.warn(errMsg);
            utils_1.logUtils.warn(candidates);
        }
        return (bytecodeToContractDataIfExists[bytecode] = contractDataCandidates[0]);
    },
    isCallLike: function (op) {
        return _.includes([ethereum_types_1.OpCode.CallCode, ethereum_types_1.OpCode.StaticCall, ethereum_types_1.OpCode.Call, ethereum_types_1.OpCode.DelegateCall], op);
    },
    isEndOpcode: function (op) {
        return _.includes([ethereum_types_1.OpCode.Return, ethereum_types_1.OpCode.Stop, ethereum_types_1.OpCode.Revert, ethereum_types_1.OpCode.Invalid, ethereum_types_1.OpCode.SelfDestruct], op);
    },
    getAddressFromStackEntry: function (stackEntry) {
        var hexBase = 16;
        return utils_1.addressUtils.padZeros(new utils_1.BigNumber(ethereumjs_util_1.addHexPrefix(stackEntry)).toString(hexBase));
    },
    normalizeStructLogs: function (structLogs) {
        if (_.isEmpty(structLogs)) {
            return structLogs;
        }
        var reduceDepthBy1 = function (structLog) { return (__assign({}, structLog, { depth: structLog.depth - 1 })); };
        var normalizedStructLogs = structLogs;
        // HACK(leo): Geth traces sometimes returns those gas costs incorrectly as very big numbers so we manually fix them.
        var normalizeStaticCallCost = function (structLog) {
            return structLog.op === ethereum_types_1.OpCode.StaticCall
                ? __assign({}, structLog, { gasCost: constants_1.constants.opCodeToGasCost[structLog.op] }) : structLog;
        };
        // HACK(leo): Geth traces sometimes returns those gas costs incorrectly as very big numbers so we manually fix them.
        var normalizeCallCost = function (structLog, index) {
            if (structLog.op === ethereum_types_1.OpCode.Call) {
                var callAddress = parseInt(structLog.stack[structLog.stack.length - constants_1.constants.opCodeToParamToStackOffset[ethereum_types_1.OpCode.Call].to - 1], constants_1.constants.HEX_BASE);
                var MAX_REASONABLE_PRECOMPILE_ADDRESS = 100;
                if (callAddress < MAX_REASONABLE_PRECOMPILE_ADDRESS) {
                    var nextStructLog = normalizedStructLogs[index + 1];
                    var gasCost = structLog.gas - nextStructLog.gas;
                    return __assign({}, structLog, { gasCost: gasCost });
                }
                else {
                    return __assign({}, structLog, { gasCost: constants_1.constants.opCodeToGasCost[structLog.op] });
                }
            }
            else {
                return structLog;
            }
        };
        var shiftGasCosts1Left = function (structLog, idx) {
            if (idx === structLogs.length - 1) {
                return __assign({}, structLog, { gasCost: 0 });
            }
            else {
                var nextStructLog = structLogs[idx + 1];
                var gasCost = nextStructLog.gasCost;
                return __assign({}, structLog, { gasCost: gasCost });
            }
        };
        if (structLogs[0].depth === 1) {
            // Geth uses 1-indexed depth counter whilst ganache starts from 0
            normalizedStructLogs = _.map(normalizedStructLogs, reduceDepthBy1);
            normalizedStructLogs = _.map(normalizedStructLogs, normalizeCallCost);
            normalizedStructLogs = _.map(normalizedStructLogs, normalizeStaticCallCost);
        }
        else {
            // Ganache shifts opcodes gas costs so we need to unshift them
            normalizedStructLogs = _.map(normalizedStructLogs, shiftGasCosts1Left);
        }
        return normalizedStructLogs;
    },
    getRange: function (sourceCode, range) {
        var lines = sourceCode.split('\n').slice(range.start.line - 1, range.end.line);
        lines[lines.length - 1] = lines[lines.length - 1].slice(0, range.end.column);
        lines[0] = lines[0].slice(range.start.column);
        return lines.join('\n');
    },
    shortenHex: function (hex, length) {
        return hex.substr(0, length + 2) + "..." + hex.substr(hex.length - length, length);
    },
};
//# sourceMappingURL=utils.js.map