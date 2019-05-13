"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _a, _b;
var ethereum_types_1 = require("ethereum-types");
var opCodeToParamToStackOffset = (_a = {},
    _a[ethereum_types_1.OpCode.Call] = {
        gas: 0,
        to: 1,
        value: 1,
    },
    _a[ethereum_types_1.OpCode.MLoad] = { offset: 0 },
    _a[ethereum_types_1.OpCode.MStore] = { offset: 0 },
    _a[ethereum_types_1.OpCode.MStore8] = { offset: 0 },
    _a[ethereum_types_1.OpCode.CallDataCopy] = { memoryOffset: 0, callDataOffset: 1, length: 2 },
    _a);
var opCodeToGasCost = (_b = {},
    _b[ethereum_types_1.OpCode.Call] = 700,
    _b[ethereum_types_1.OpCode.StaticCall] = 40,
    _b);
// tslint:disable:number-literal-format
exports.constants = {
    NEW_CONTRACT: 'NEW_CONTRACT',
    HEX_BASE: 16,
    PUSH1: 0x60,
    PUSH2: 0x61,
    PUSH32: 0x7f,
    TIMESTAMP: 0x42,
    opCodeToGasCost: opCodeToGasCost,
    opCodeToParamToStackOffset: opCodeToParamToStackOffset,
};
//# sourceMappingURL=constants.js.map