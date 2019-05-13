"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable max-file-line-count */
var chai = require("chai");
var ethUtil = require("ethereumjs-util");
require("mocha");
var src_1 = require("../../src/");
var chai_setup_1 = require("../utils/chai_setup");
chai_setup_1.chaiSetup.configure();
var expect = chai.expect;
describe('ABI Encoder: EVM Data Type Encoding/Decoding', function () {
    var encodingRules = { shouldOptimize: false }; // optimizer is tested separately.
    var nullEncodedArgs = '0x';
    describe('Array', function () {
        it('Fixed size; Static elements', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args, encodedArgs, expectedEncodedArgs, decodedArgs, dataTypeFromSignature, argsEncodedFromSignature;
            return __generator(this, function (_a) {
                testDataItem = { name: 'testArray', type: 'int[2]' };
                dataType = new src_1.AbiEncoder.Array(testDataItem);
                args = [new src_1.BigNumber(5), new src_1.BigNumber(6)];
                encodedArgs = dataType.encode(args, encodingRules);
                expectedEncodedArgs = '0x00000000000000000000000000000000000000000000000000000000000000050000000000000000000000000000000000000000000000000000000000000006';
                expect(encodedArgs).to.be.equal(expectedEncodedArgs);
                decodedArgs = dataType.decode(encodedArgs);
                expect(decodedArgs).to.be.deep.equal(args);
                dataTypeFromSignature = src_1.AbiEncoder.create(dataType.getSignature(false));
                argsEncodedFromSignature = dataTypeFromSignature.encode(args);
                expect(argsEncodedFromSignature).to.be.deep.equal(expectedEncodedArgs);
                return [2 /*return*/];
            });
        }); });
        it('Dynamic size; Static elements', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args, encodedArgs, expectedEncodedArgs, decodedArgs, dataTypeFromSignature, argsEncodedFromSignature;
            return __generator(this, function (_a) {
                testDataItem = { name: 'testArray', type: 'int[]' };
                dataType = new src_1.AbiEncoder.Array(testDataItem);
                args = [new src_1.BigNumber(5), new src_1.BigNumber(6)];
                encodedArgs = dataType.encode(args, encodingRules);
                expectedEncodedArgs = '0x000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000050000000000000000000000000000000000000000000000000000000000000006';
                expect(encodedArgs).to.be.equal(expectedEncodedArgs);
                decodedArgs = dataType.decode(encodedArgs);
                expect(decodedArgs).to.be.deep.equal(args);
                dataTypeFromSignature = src_1.AbiEncoder.create(dataType.getSignature(true));
                argsEncodedFromSignature = dataTypeFromSignature.encode(args);
                expect(argsEncodedFromSignature).to.be.deep.equal(expectedEncodedArgs);
                return [2 /*return*/];
            });
        }); });
        it('Fixed size; Dynamic elements', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args, encodedArgs, expectedEncodedArgs, decodedArgs, dataTypeFromSignature, argsEncodedFromSignature;
            return __generator(this, function (_a) {
                testDataItem = { name: 'testArray', type: 'string[2]' };
                dataType = new src_1.AbiEncoder.Array(testDataItem);
                args = ['Hello', 'world'];
                encodedArgs = dataType.encode(args, encodingRules);
                expectedEncodedArgs = '0x00000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000548656c6c6f0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005776f726c64000000000000000000000000000000000000000000000000000000';
                expect(encodedArgs).to.be.equal(expectedEncodedArgs);
                decodedArgs = dataType.decode(encodedArgs);
                expect(decodedArgs).to.be.deep.equal(args);
                dataTypeFromSignature = src_1.AbiEncoder.create(dataType.getSignature(true));
                argsEncodedFromSignature = dataTypeFromSignature.encode(args);
                expect(argsEncodedFromSignature).to.be.deep.equal(expectedEncodedArgs);
                return [2 /*return*/];
            });
        }); });
        it('Dynamic size; Dynamic elements', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args, encodedArgs, expectedEncodedArgs, decodedArgs, dataTypeFromSignature, argsEncodedFromSignature;
            return __generator(this, function (_a) {
                testDataItem = { name: 'testArray', type: 'string[]' };
                dataType = new src_1.AbiEncoder.Array(testDataItem);
                args = ['Hello', 'world'];
                encodedArgs = dataType.encode(args, encodingRules);
                expectedEncodedArgs = '0x000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000548656c6c6f0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005776f726c64000000000000000000000000000000000000000000000000000000';
                expect(encodedArgs).to.be.equal(expectedEncodedArgs);
                decodedArgs = dataType.decode(encodedArgs);
                expect(decodedArgs).to.be.deep.equal(args);
                dataTypeFromSignature = src_1.AbiEncoder.create(dataType.getSignature(true));
                argsEncodedFromSignature = dataTypeFromSignature.encode(args);
                expect(argsEncodedFromSignature).to.be.deep.equal(expectedEncodedArgs);
                return [2 /*return*/];
            });
        }); });
        it('Dynamic Size; Multidimensional; Dynamic Elements', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, array1, array2, array3, args, encodedArgs, expectedEncodedArgs, decodedArgs, dataTypeFromSignature, argsEncodedFromSignature;
            return __generator(this, function (_a) {
                testDataItem = { name: 'testArray', type: 'bytes[][]' };
                dataType = new src_1.AbiEncoder.Array(testDataItem);
                array1 = ['0x01020304', '0x05060708', '0x09101112'];
                array2 = ['0x10111213', '0x14151617'];
                array3 = ['0x18192021'];
                args = [array1, array2, array3];
                encodedArgs = dataType.encode(args, encodingRules);
                expectedEncodedArgs = '0x0000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000001a000000000000000000000000000000000000000000000000000000000000002800000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e000000000000000000000000000000000000000000000000000000000000000040102030400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000405060708000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004091011120000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000041011121300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000414151617000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000041819202100000000000000000000000000000000000000000000000000000000';
                expect(encodedArgs).to.be.equal(expectedEncodedArgs);
                decodedArgs = dataType.decode(encodedArgs);
                expect(decodedArgs).to.be.deep.equal(args);
                dataTypeFromSignature = src_1.AbiEncoder.create(dataType.getSignature(true));
                argsEncodedFromSignature = dataTypeFromSignature.encode(args);
                expect(argsEncodedFromSignature).to.be.deep.equal(expectedEncodedArgs);
                return [2 /*return*/];
            });
        }); });
        it('Dynamic Size; Multidimensional; Static Elements', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, array1, array2, array3, args, encodedArgs, expectedEncodedArgs, decodedArgs, dataTypeFromSignature, argsEncodedFromSignature;
            return __generator(this, function (_a) {
                testDataItem = { name: 'testArray', type: 'bytes4[][]' };
                dataType = new src_1.AbiEncoder.Array(testDataItem);
                array1 = ['0x01020304', '0x05060708', '0x09101112'];
                array2 = ['0x10111213', '0x14151617'];
                array3 = ['0x18192021'];
                args = [array1, array2, array3];
                encodedArgs = dataType.encode(args, encodingRules);
                expectedEncodedArgs = '0x0000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000140000000000000000000000000000000000000000000000000000000000000000301020304000000000000000000000000000000000000000000000000000000000506070800000000000000000000000000000000000000000000000000000000091011120000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000021011121300000000000000000000000000000000000000000000000000000000141516170000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000011819202100000000000000000000000000000000000000000000000000000000';
                expect(encodedArgs).to.be.equal(expectedEncodedArgs);
                decodedArgs = dataType.decode(encodedArgs);
                expect(decodedArgs).to.be.deep.equal(args);
                dataTypeFromSignature = src_1.AbiEncoder.create(dataType.getSignature(true));
                argsEncodedFromSignature = dataTypeFromSignature.encode(args);
                expect(argsEncodedFromSignature).to.be.deep.equal(expectedEncodedArgs);
                return [2 /*return*/];
            });
        }); });
        it('Static Size; Multidimensional; Static Elements', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, array1, array2, args, encodedArgs, expectedEncodedArgs, decodedArgs, dataTypeFromSignature, argsEncodedFromSignature;
            return __generator(this, function (_a) {
                testDataItem = { name: 'testArray', type: 'bytes4[3][2]' };
                dataType = new src_1.AbiEncoder.Array(testDataItem);
                array1 = ['0x01020304', '0x05060708', '0x09101112'];
                array2 = ['0x10111213', '0x14151617', '0x18192021'];
                args = [array1, array2];
                encodedArgs = dataType.encode(args, encodingRules);
                expectedEncodedArgs = '0x010203040000000000000000000000000000000000000000000000000000000005060708000000000000000000000000000000000000000000000000000000000910111200000000000000000000000000000000000000000000000000000000101112130000000000000000000000000000000000000000000000000000000014151617000000000000000000000000000000000000000000000000000000001819202100000000000000000000000000000000000000000000000000000000';
                expect(encodedArgs).to.be.equal(expectedEncodedArgs);
                decodedArgs = dataType.decode(encodedArgs);
                expect(decodedArgs).to.be.deep.equal(args);
                dataTypeFromSignature = src_1.AbiEncoder.create(dataType.getSignature(true));
                argsEncodedFromSignature = dataTypeFromSignature.encode(args);
                expect(argsEncodedFromSignature).to.be.deep.equal(expectedEncodedArgs);
                return [2 /*return*/];
            });
        }); });
        it('Static Size; Multidimensional; Dynamic Elements', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, array1, array2, args, encodedArgs, expectedEncodedArgs, decodedArgs, dataTypeFromSignature, argsEncodedFromSignature;
            return __generator(this, function (_a) {
                testDataItem = { name: 'testArray', type: 'bytes[3][2]' };
                dataType = new src_1.AbiEncoder.Array(testDataItem);
                array1 = ['0x01020304', '0x05060708', '0x09101112'];
                array2 = ['0x10111213', '0x14151617', '0x18192021'];
                args = [array1, array2];
                encodedArgs = dataType.encode(args, encodingRules);
                expectedEncodedArgs = '0x00000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000160000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000000000000401020304000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004050607080000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000040910111200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000000000000410111213000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004141516170000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000041819202100000000000000000000000000000000000000000000000000000000';
                expect(encodedArgs).to.be.equal(expectedEncodedArgs);
                decodedArgs = dataType.decode(encodedArgs);
                expect(decodedArgs).to.be.deep.equal(args);
                dataTypeFromSignature = src_1.AbiEncoder.create(dataType.getSignature(true));
                argsEncodedFromSignature = dataTypeFromSignature.encode(args);
                expect(argsEncodedFromSignature).to.be.deep.equal(expectedEncodedArgs);
                return [2 /*return*/];
            });
        }); });
        it('Static size; Too Few Elements', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args;
            return __generator(this, function (_a) {
                testDataItem = { name: 'testArray', type: 'string[3]' };
                dataType = new src_1.AbiEncoder.Array(testDataItem);
                args = ['Hello', 'world'];
                // Encode Args and validate result
                expect(function () {
                    dataType.encode(args, encodingRules);
                }).to.throw('Expected array of 3 elements, but got array of length 2');
                return [2 /*return*/];
            });
        }); });
        it('Static size; Too Many Elements', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args;
            return __generator(this, function (_a) {
                testDataItem = { name: 'testArray', type: 'string[1]' };
                dataType = new src_1.AbiEncoder.Array(testDataItem);
                args = ['Hello', 'world'];
                // Encode Args and validate result
                expect(function () {
                    dataType.encode(args, encodingRules);
                }).to.throw('Expected array of 1 elements, but got array of length 2');
                return [2 /*return*/];
            });
        }); });
        it('Element Type Mismatch', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args;
            return __generator(this, function (_a) {
                testDataItem = { name: 'testArray', type: 'uint[]' };
                dataType = new src_1.AbiEncoder.Array(testDataItem);
                args = [new src_1.BigNumber(1), 'Bad Argument'];
                // Encode Args and validate result
                expect(function () {
                    dataType.encode(args, encodingRules);
                }).to.throw('Tried to assign NaN value');
                return [2 /*return*/];
            });
        }); });
        it('Should decode NULL to default values (Fixed size; Static elements)', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args, decodedArgs;
            return __generator(this, function (_a) {
                testDataItem = { name: 'testArray', type: 'int[2]' };
                dataType = new src_1.AbiEncoder.Array(testDataItem);
                args = [new src_1.BigNumber(0), new src_1.BigNumber(0)];
                decodedArgs = dataType.decode(nullEncodedArgs);
                expect(decodedArgs).to.be.deep.equal(args);
                return [2 /*return*/];
            });
        }); });
        it('Should decode NULL to default values (Dynamic size; Static elements)', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args, decodedArgs;
            return __generator(this, function (_a) {
                testDataItem = { name: 'testArray', type: 'int[]' };
                dataType = new src_1.AbiEncoder.Array(testDataItem);
                args = [];
                decodedArgs = dataType.decode(nullEncodedArgs);
                expect(decodedArgs).to.be.deep.equal(args);
                return [2 /*return*/];
            });
        }); });
        it('Should decode NULL to default values (Fixed size; Dynamic elements)', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args, decodedArgs;
            return __generator(this, function (_a) {
                testDataItem = { name: 'testArray', type: 'string[2]' };
                dataType = new src_1.AbiEncoder.Array(testDataItem);
                args = ['', ''];
                decodedArgs = dataType.decode(nullEncodedArgs);
                expect(decodedArgs).to.be.deep.equal(args);
                return [2 /*return*/];
            });
        }); });
        it('Should decode NULL to default values (Dynamic size; Dynamic elements)', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args, decodedArgs;
            return __generator(this, function (_a) {
                testDataItem = { name: 'testArray', type: 'string[]' };
                dataType = new src_1.AbiEncoder.Array(testDataItem);
                args = [];
                decodedArgs = dataType.decode(nullEncodedArgs);
                expect(decodedArgs).to.be.deep.equal(args);
                return [2 /*return*/];
            });
        }); });
        it('Should decode NULL to default values (Dynamic Size; Multidimensional; Dynamic Elements)', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args, decodedArgs;
            return __generator(this, function (_a) {
                testDataItem = { name: 'testArray', type: 'bytes[][]' };
                dataType = new src_1.AbiEncoder.Array(testDataItem);
                args = [];
                decodedArgs = dataType.decode(nullEncodedArgs);
                expect(decodedArgs).to.be.deep.equal(args);
                return [2 /*return*/];
            });
        }); });
    });
    describe('Tuple', function () {
        it('Static elements only', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args, encodedArgs, expectedEncodedArgs, decodingRules, decodedArgs, dataTypeFromSignature, argsEncodedFromSignature;
            return __generator(this, function (_a) {
                testDataItem = {
                    name: 'Tuple',
                    type: 'tuple',
                    components: [{ name: 'field_1', type: 'int32' }, { name: 'field_2', type: 'bool' }],
                };
                dataType = new src_1.AbiEncoder.Tuple(testDataItem);
                args = { field_1: new src_1.BigNumber(-5), field_2: true };
                encodedArgs = dataType.encode(args, encodingRules);
                expectedEncodedArgs = '0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffb0000000000000000000000000000000000000000000000000000000000000001';
                expect(encodedArgs).to.be.equal(expectedEncodedArgs);
                decodingRules = { shouldConvertStructsToObjects: true };
                decodedArgs = dataType.decode(encodedArgs, decodingRules);
                expect(decodedArgs).to.be.deep.equal(args);
                dataTypeFromSignature = src_1.AbiEncoder.create(dataType.getSignature(true));
                argsEncodedFromSignature = dataTypeFromSignature.encode(args, encodingRules);
                expect(argsEncodedFromSignature).to.be.deep.equal(expectedEncodedArgs);
                return [2 /*return*/];
            });
        }); });
        it('Dynamic elements only', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args, encodedArgs, expectedEncodedArgs, decodingRules, decodedArgs, dataTypeFromSignature, argsEncodedFromSignature;
            return __generator(this, function (_a) {
                testDataItem = {
                    name: 'Tuple',
                    type: 'tuple',
                    components: [{ name: 'field_1', type: 'string' }, { name: 'field_2', type: 'bytes' }],
                };
                dataType = new src_1.AbiEncoder.Tuple(testDataItem);
                args = { field_1: 'Hello, World!', field_2: '0xabcdef0123456789' };
                encodedArgs = dataType.encode(args, encodingRules);
                expectedEncodedArgs = '0x00000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000d48656c6c6f2c20576f726c6421000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008abcdef0123456789000000000000000000000000000000000000000000000000';
                expect(encodedArgs).to.be.equal(expectedEncodedArgs);
                decodingRules = { shouldConvertStructsToObjects: true };
                decodedArgs = dataType.decode(encodedArgs, decodingRules);
                expect(decodedArgs).to.be.deep.equal(args);
                dataTypeFromSignature = src_1.AbiEncoder.create(dataType.getSignature(true));
                argsEncodedFromSignature = dataTypeFromSignature.encode(args);
                expect(argsEncodedFromSignature).to.be.deep.equal(expectedEncodedArgs);
                return [2 /*return*/];
            });
        }); });
        it('Nested Static Array', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args, encodedArgs, expectedEncodedArgs, decodingRules, decodedArgs, dataTypeFromSignature, argsEncodedFromSignature;
            return __generator(this, function (_a) {
                testDataItem = {
                    name: 'Tuple',
                    type: 'tuple',
                    components: [{ name: 'field', type: 'uint[2]' }],
                };
                dataType = new src_1.AbiEncoder.Tuple(testDataItem);
                args = { field: [new src_1.BigNumber(1), new src_1.BigNumber(2)] };
                encodedArgs = dataType.encode(args, encodingRules);
                expectedEncodedArgs = '0x00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002';
                expect(encodedArgs).to.be.equal(expectedEncodedArgs);
                decodingRules = { shouldConvertStructsToObjects: true };
                decodedArgs = dataType.decode(encodedArgs, decodingRules);
                expect(decodedArgs).to.be.deep.equal(args);
                dataTypeFromSignature = src_1.AbiEncoder.create(dataType.getSignature(true));
                argsEncodedFromSignature = dataTypeFromSignature.encode(args);
                expect(argsEncodedFromSignature).to.be.deep.equal(expectedEncodedArgs);
                return [2 /*return*/];
            });
        }); });
        it('Nested Dynamic Array', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args, encodedArgs, expectedEncodedArgs, decodingRules, decodedArgs, dataTypeFromSignature, argsEncodedFromSignature;
            return __generator(this, function (_a) {
                testDataItem = {
                    name: 'Tuple',
                    type: 'tuple',
                    components: [{ name: 'field', type: 'uint[]' }],
                };
                dataType = new src_1.AbiEncoder.Tuple(testDataItem);
                args = { field: [new src_1.BigNumber(1), new src_1.BigNumber(2)] };
                encodedArgs = dataType.encode(args, encodingRules);
                expectedEncodedArgs = '0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002';
                expect(encodedArgs).to.be.equal(expectedEncodedArgs);
                decodingRules = { shouldConvertStructsToObjects: true };
                decodedArgs = dataType.decode(encodedArgs, decodingRules);
                expect(decodedArgs).to.be.deep.equal(args);
                dataTypeFromSignature = src_1.AbiEncoder.create(dataType.getSignature(true));
                argsEncodedFromSignature = dataTypeFromSignature.encode(args);
                expect(argsEncodedFromSignature).to.be.deep.equal(expectedEncodedArgs);
                return [2 /*return*/];
            });
        }); });
        it('Nested Static Multidimensional Array', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, array1, array2, args, encodedArgs, expectedEncodedArgs, decodingRules, decodedArgs, dataTypeFromSignature, argsEncodedFromSignature;
            return __generator(this, function (_a) {
                testDataItem = {
                    name: 'Tuple',
                    type: 'tuple',
                    components: [{ name: 'field', type: 'bytes4[2][2]' }],
                };
                dataType = new src_1.AbiEncoder.Tuple(testDataItem);
                array1 = ['0x01020304', '0x05060708'];
                array2 = ['0x09101112', '0x13141516'];
                args = { field: [array1, array2] };
                encodedArgs = dataType.encode(args, encodingRules);
                expectedEncodedArgs = '0x0102030400000000000000000000000000000000000000000000000000000000050607080000000000000000000000000000000000000000000000000000000009101112000000000000000000000000000000000000000000000000000000001314151600000000000000000000000000000000000000000000000000000000';
                expect(encodedArgs).to.be.equal(expectedEncodedArgs);
                decodingRules = { shouldConvertStructsToObjects: true };
                decodedArgs = dataType.decode(encodedArgs, decodingRules);
                expect(decodedArgs).to.be.deep.equal(args);
                dataTypeFromSignature = src_1.AbiEncoder.create(dataType.getSignature(true));
                argsEncodedFromSignature = dataTypeFromSignature.encode(args);
                expect(argsEncodedFromSignature).to.be.deep.equal(expectedEncodedArgs);
                return [2 /*return*/];
            });
        }); });
        it('Nested Dynamic Multidimensional Array', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, array1, array2, args, encodedArgs, expectedEncodedArgs, decodingRules, decodedArgs, dataTypeFromSignature, argsEncodedFromSignature;
            return __generator(this, function (_a) {
                testDataItem = {
                    name: 'Tuple',
                    type: 'tuple',
                    components: [{ name: 'field', type: 'bytes[2][2]' }],
                };
                dataType = new src_1.AbiEncoder.Tuple(testDataItem);
                array1 = ['0x01020304', '0x05060708'];
                array2 = ['0x09101112', '0x13141516'];
                args = { field: [array1, array2] };
                encodedArgs = dataType.encode(args, encodingRules);
                expectedEncodedArgs = '0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000004010203040000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000040506070800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000004091011120000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000041314151600000000000000000000000000000000000000000000000000000000';
                expect(encodedArgs).to.be.equal(expectedEncodedArgs);
                decodingRules = { shouldConvertStructsToObjects: true };
                decodedArgs = dataType.decode(encodedArgs, decodingRules);
                expect(decodedArgs).to.be.deep.equal(args);
                dataTypeFromSignature = src_1.AbiEncoder.create(dataType.getSignature(true));
                argsEncodedFromSignature = dataTypeFromSignature.encode(args);
                expect(argsEncodedFromSignature).to.be.deep.equal(expectedEncodedArgs);
                return [2 /*return*/];
            });
        }); });
        it('Static and dynamic elements mixed', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args, encodedArgs, expectedEncodedArgs, decodingRules, decodedArgs, dataTypeFromSignature, argsEncodedFromSignature;
            return __generator(this, function (_a) {
                testDataItem = {
                    name: 'Tuple',
                    type: 'tuple',
                    components: [
                        { name: 'field_1', type: 'int32' },
                        { name: 'field_2', type: 'string' },
                        { name: 'field_3', type: 'bool' },
                        { name: 'field_4', type: 'bytes' },
                    ],
                };
                dataType = new src_1.AbiEncoder.Tuple(testDataItem);
                args = {
                    field_1: new src_1.BigNumber(-5),
                    field_2: 'Hello, World!',
                    field_3: true,
                    field_4: '0xabcdef0123456789',
                };
                encodedArgs = dataType.encode(args, encodingRules);
                expectedEncodedArgs = '0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffb0000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000000000d48656c6c6f2c20576f726c6421000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008abcdef0123456789000000000000000000000000000000000000000000000000';
                expect(encodedArgs).to.be.equal(expectedEncodedArgs);
                decodingRules = { shouldConvertStructsToObjects: true };
                decodedArgs = dataType.decode(encodedArgs, decodingRules);
                expect(decodedArgs).to.be.deep.equal(args);
                dataTypeFromSignature = src_1.AbiEncoder.create(dataType.getSignature(true));
                argsEncodedFromSignature = dataTypeFromSignature.encode(args);
                expect(argsEncodedFromSignature).to.be.deep.equal(expectedEncodedArgs);
                return [2 /*return*/];
            });
        }); });
        it('Missing Key', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args;
            return __generator(this, function (_a) {
                testDataItem = {
                    name: 'Tuple',
                    type: 'tuple',
                    components: [{ name: 'field_1', type: 'int32' }, { name: 'field_2', type: 'bool' }],
                };
                dataType = new src_1.AbiEncoder.Tuple(testDataItem);
                args = { field_1: new src_1.BigNumber(-5) };
                // Encode Args and validate result
                expect(function () {
                    dataType.encode(args, encodingRules);
                }).to.throw('Could not assign tuple to object: missing key \'field_2\' in object {"field_1":"-5"}');
                return [2 /*return*/];
            });
        }); });
        it('Should decode NULL to default values (static elements only)', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args, decodingRules, decodedArgs;
            return __generator(this, function (_a) {
                testDataItem = {
                    name: 'Tuple',
                    type: 'tuple',
                    components: [{ name: 'field_1', type: 'int32' }, { name: 'field_2', type: 'bool' }],
                };
                dataType = new src_1.AbiEncoder.Tuple(testDataItem);
                args = { field_1: new src_1.BigNumber(0), field_2: false };
                decodingRules = { shouldConvertStructsToObjects: true };
                decodedArgs = dataType.decode(nullEncodedArgs, decodingRules);
                expect(decodedArgs).to.be.deep.equal(args);
                return [2 /*return*/];
            });
        }); });
        it('Should decode NULL to default values (static and dynamic elements)', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args, decodingRules, decodedArgs;
            return __generator(this, function (_a) {
                testDataItem = {
                    name: 'Tuple',
                    type: 'tuple',
                    components: [
                        { name: 'field_1', type: 'int32' },
                        { name: 'field_2', type: 'string' },
                        { name: 'field_3', type: 'bool' },
                        { name: 'field_4', type: 'bytes' },
                    ],
                };
                dataType = new src_1.AbiEncoder.Tuple(testDataItem);
                args = {
                    field_1: new src_1.BigNumber(0),
                    field_2: '',
                    field_3: false,
                    field_4: '0x',
                };
                decodingRules = { shouldConvertStructsToObjects: true };
                decodedArgs = dataType.decode(nullEncodedArgs, decodingRules);
                expect(decodedArgs).to.be.deep.equal(args);
                return [2 /*return*/];
            });
        }); });
    });
    describe('Address', function () {
        it('Valid Address', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args, encodedArgs, expectedEncodedArgs, decodedArgs, dataTypeFromSignature, argsEncodedFromSignature;
            return __generator(this, function (_a) {
                testDataItem = { name: 'Address', type: 'address' };
                dataType = new src_1.AbiEncoder.Address(testDataItem);
                args = '0xe41d2489571d322189246dafa5ebde1f4699f498';
                encodedArgs = dataType.encode(args, encodingRules);
                expectedEncodedArgs = '0x000000000000000000000000e41d2489571d322189246dafa5ebde1f4699f498';
                expect(encodedArgs).to.be.equal(expectedEncodedArgs);
                decodedArgs = dataType.decode(encodedArgs);
                expect(decodedArgs).to.be.deep.equal(args);
                dataTypeFromSignature = src_1.AbiEncoder.create(dataType.getSignature(true));
                argsEncodedFromSignature = dataTypeFromSignature.encode(args);
                expect(argsEncodedFromSignature).to.be.deep.equal(expectedEncodedArgs);
                return [2 /*return*/];
            });
        }); });
        it('Invalid Address - input is not valid hex', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args;
            return __generator(this, function (_a) {
                testDataItem = { name: 'Address', type: 'address' };
                dataType = new src_1.AbiEncoder.Address(testDataItem);
                args = 'e4';
                // Encode Args and validate result
                expect(function () {
                    dataType.encode(args, encodingRules);
                }).to.throw("Invalid address: '" + args + "'");
                return [2 /*return*/];
            });
        }); });
        it('Invalid Address - input is not 20 bytes', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args;
            return __generator(this, function (_a) {
                testDataItem = { name: 'Address', type: 'address' };
                dataType = new src_1.AbiEncoder.Address(testDataItem);
                args = '0xe4';
                // Encode Args and validate result
                expect(function () {
                    dataType.encode(args, encodingRules);
                }).to.throw("Invalid address: '" + args + "'");
                return [2 /*return*/];
            });
        }); });
        it('Should decode NULL to default value of address zero', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args, decodedArgs;
            return __generator(this, function (_a) {
                testDataItem = { name: 'Address', type: 'address' };
                dataType = new src_1.AbiEncoder.Address(testDataItem);
                args = '0x0000000000000000000000000000000000000000';
                decodedArgs = dataType.decode(nullEncodedArgs);
                expect(decodedArgs).to.be.deep.equal(args);
                return [2 /*return*/];
            });
        }); });
    });
    describe('Bool', function () {
        it('True', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args, encodedArgs, expectedEncodedArgs, decodedArgs, dataTypeFromSignature, argsEncodedFromSignature;
            return __generator(this, function (_a) {
                testDataItem = { name: 'Boolean', type: 'bool' };
                dataType = new src_1.AbiEncoder.Bool(testDataItem);
                args = true;
                encodedArgs = dataType.encode(args, encodingRules);
                expectedEncodedArgs = '0x0000000000000000000000000000000000000000000000000000000000000001';
                expect(encodedArgs).to.be.equal(expectedEncodedArgs);
                decodedArgs = dataType.decode(encodedArgs);
                expect(decodedArgs).to.be.deep.equal(args);
                dataTypeFromSignature = src_1.AbiEncoder.create(dataType.getSignature(true));
                argsEncodedFromSignature = dataTypeFromSignature.encode(args);
                expect(argsEncodedFromSignature).to.be.deep.equal(expectedEncodedArgs);
                return [2 /*return*/];
            });
        }); });
        it('False', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args, encodedArgs, expectedEncodedArgs, decodedArgs, dataTypeFromSignature, argsEncodedFromSignature;
            return __generator(this, function (_a) {
                testDataItem = { name: 'Boolean', type: 'bool' };
                dataType = new src_1.AbiEncoder.Bool(testDataItem);
                args = false;
                encodedArgs = dataType.encode(args, encodingRules);
                expectedEncodedArgs = '0x0000000000000000000000000000000000000000000000000000000000000000';
                expect(encodedArgs).to.be.equal(expectedEncodedArgs);
                decodedArgs = dataType.decode(encodedArgs);
                expect(decodedArgs).to.be.deep.equal(args);
                dataTypeFromSignature = src_1.AbiEncoder.create(dataType.getSignature(true));
                argsEncodedFromSignature = dataTypeFromSignature.encode(args);
                expect(argsEncodedFromSignature).to.be.deep.equal(expectedEncodedArgs);
                return [2 /*return*/];
            });
        }); });
        it('Should decode NULL to default value of False', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args, decodedArgs;
            return __generator(this, function (_a) {
                testDataItem = { name: 'Boolean', type: 'bool' };
                dataType = new src_1.AbiEncoder.Bool(testDataItem);
                args = false;
                decodedArgs = dataType.decode(nullEncodedArgs);
                expect(decodedArgs).to.be.deep.equal(args);
                return [2 /*return*/];
            });
        }); });
    });
    describe('Integer', function () {
        /* tslint:disable custom-no-magic-numbers */
        var max256BitInteger = new src_1.BigNumber(2).pow(255).minus(1);
        var min256BitInteger = new src_1.BigNumber(2).pow(255).times(-1);
        var max32BitInteger = new src_1.BigNumber(2).pow(31).minus(1);
        var min32BitInteger = new src_1.BigNumber(2).pow(31).times(-1);
        /* tslint:enable custom-no-magic-numbers */
        it('Int256 - Positive Base Case', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args, encodedArgs, expectedEncodedArgs, decodedArgs, dataTypeFromSignature, argsEncodedFromSignature;
            return __generator(this, function (_a) {
                testDataItem = { name: 'Integer (256)', type: 'int' };
                dataType = new src_1.AbiEncoder.Int(testDataItem);
                args = new src_1.BigNumber(1);
                encodedArgs = dataType.encode(args, encodingRules);
                expectedEncodedArgs = '0x0000000000000000000000000000000000000000000000000000000000000001';
                expect(encodedArgs).to.be.equal(expectedEncodedArgs);
                decodedArgs = dataType.decode(encodedArgs);
                expect(decodedArgs).to.be.deep.equal(args);
                dataTypeFromSignature = src_1.AbiEncoder.create(dataType.getSignature(true));
                argsEncodedFromSignature = dataTypeFromSignature.encode(args);
                expect(argsEncodedFromSignature).to.be.deep.equal(expectedEncodedArgs);
                return [2 /*return*/];
            });
        }); });
        it('Int256 - Negative Base Case', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args, encodedArgs, expectedEncodedArgs, decodedArgs, dataTypeFromSignature, argsEncodedFromSignature;
            return __generator(this, function (_a) {
                testDataItem = { name: 'Integer (256)', type: 'int' };
                dataType = new src_1.AbiEncoder.Int(testDataItem);
                args = new src_1.BigNumber(-1);
                encodedArgs = dataType.encode(args, encodingRules);
                expectedEncodedArgs = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
                expect(encodedArgs).to.be.equal(expectedEncodedArgs);
                decodedArgs = dataType.decode(encodedArgs);
                expect(decodedArgs).to.be.deep.equal(args);
                dataTypeFromSignature = src_1.AbiEncoder.create(dataType.getSignature(true));
                argsEncodedFromSignature = dataTypeFromSignature.encode(args);
                expect(argsEncodedFromSignature).to.be.deep.equal(expectedEncodedArgs);
                return [2 /*return*/];
            });
        }); });
        it('Int256 - Positive Value', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args, encodedArgs, expectedEncodedArgs, decodedArgs, dataTypeFromSignature, argsEncodedFromSignature;
            return __generator(this, function (_a) {
                testDataItem = { name: 'Integer (256)', type: 'int' };
                dataType = new src_1.AbiEncoder.Int(testDataItem);
                args = max256BitInteger;
                encodedArgs = dataType.encode(args, encodingRules);
                expectedEncodedArgs = '0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
                expect(encodedArgs).to.be.equal(expectedEncodedArgs);
                decodedArgs = dataType.decode(encodedArgs);
                expect(decodedArgs).to.be.deep.equal(args);
                dataTypeFromSignature = src_1.AbiEncoder.create(dataType.getSignature(true));
                argsEncodedFromSignature = dataTypeFromSignature.encode(args);
                expect(argsEncodedFromSignature).to.be.deep.equal(expectedEncodedArgs);
                return [2 /*return*/];
            });
        }); });
        it('Int256 - Negative Value', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args, encodedArgs, expectedEncodedArgs, decodedArgs, dataTypeFromSignature, argsEncodedFromSignature;
            return __generator(this, function (_a) {
                testDataItem = { name: 'Integer (256)', type: 'int' };
                dataType = new src_1.AbiEncoder.Int(testDataItem);
                args = min256BitInteger;
                encodedArgs = dataType.encode(args, encodingRules);
                expectedEncodedArgs = "0x8000000000000000000000000000000000000000000000000000000000000000";
                expect(encodedArgs).to.be.equal(expectedEncodedArgs);
                decodedArgs = dataType.decode(encodedArgs);
                expect(decodedArgs).to.be.deep.equal(args);
                dataTypeFromSignature = src_1.AbiEncoder.create(dataType.getSignature(true));
                argsEncodedFromSignature = dataTypeFromSignature.encode(args);
                expect(argsEncodedFromSignature).to.be.deep.equal(expectedEncodedArgs);
                return [2 /*return*/];
            });
        }); });
        it('Int256 - Value too large', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args;
            return __generator(this, function (_a) {
                testDataItem = { name: 'Integer (256)', type: 'int' };
                dataType = new src_1.AbiEncoder.Int(testDataItem);
                args = max256BitInteger.plus(1);
                // Encode Args and validate result
                expect(function () {
                    dataType.encode(args, encodingRules);
                }).to.throw();
                return [2 /*return*/];
            });
        }); });
        it('Int256 - Value too small', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args;
            return __generator(this, function (_a) {
                testDataItem = { name: 'Integer (256)', type: 'int' };
                dataType = new src_1.AbiEncoder.Int(testDataItem);
                args = min256BitInteger.minus(1);
                // Encode Args and validate result
                expect(function () {
                    dataType.encode(args, encodingRules);
                }).to.throw();
                return [2 /*return*/];
            });
        }); });
        it('Int32 - Positive Base Case', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args, encodedArgs, expectedEncodedArgs, decodedArgs, dataTypeFromSignature, argsEncodedFromSignature;
            return __generator(this, function (_a) {
                testDataItem = { name: 'Integer (32)', type: 'int32' };
                dataType = new src_1.AbiEncoder.Int(testDataItem);
                args = new src_1.BigNumber(1);
                encodedArgs = dataType.encode(args, encodingRules);
                expectedEncodedArgs = '0x0000000000000000000000000000000000000000000000000000000000000001';
                expect(encodedArgs).to.be.equal(expectedEncodedArgs);
                decodedArgs = dataType.decode(encodedArgs);
                expect(decodedArgs).to.be.deep.equal(args);
                dataTypeFromSignature = src_1.AbiEncoder.create(dataType.getSignature(true));
                argsEncodedFromSignature = dataTypeFromSignature.encode(args);
                expect(argsEncodedFromSignature).to.be.deep.equal(expectedEncodedArgs);
                return [2 /*return*/];
            });
        }); });
        it('Int32 - Negative Base Case', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args, encodedArgs, expectedEncodedArgs, decodedArgs, dataTypeFromSignature, argsEncodedFromSignature;
            return __generator(this, function (_a) {
                testDataItem = { name: 'Integer (32)', type: 'int32' };
                dataType = new src_1.AbiEncoder.Int(testDataItem);
                args = new src_1.BigNumber(-1);
                encodedArgs = dataType.encode(args, encodingRules);
                expectedEncodedArgs = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
                expect(encodedArgs).to.be.equal(expectedEncodedArgs);
                decodedArgs = dataType.decode(encodedArgs);
                expect(decodedArgs).to.be.deep.equal(args);
                dataTypeFromSignature = src_1.AbiEncoder.create(dataType.getSignature(true));
                argsEncodedFromSignature = dataTypeFromSignature.encode(args);
                expect(argsEncodedFromSignature).to.be.deep.equal(expectedEncodedArgs);
                return [2 /*return*/];
            });
        }); });
        it('Int32 - Positive Value', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args, encodedArgs, expectedEncodedArgs, decodedArgs, dataTypeFromSignature, argsEncodedFromSignature;
            return __generator(this, function (_a) {
                testDataItem = { name: 'Integer (32)', type: 'int32' };
                dataType = new src_1.AbiEncoder.Int(testDataItem);
                args = max32BitInteger;
                encodedArgs = dataType.encode(args, encodingRules);
                expectedEncodedArgs = '0x000000000000000000000000000000000000000000000000000000007fffffff';
                expect(encodedArgs).to.be.equal(expectedEncodedArgs);
                decodedArgs = dataType.decode(encodedArgs);
                expect(decodedArgs).to.be.deep.equal(args);
                dataTypeFromSignature = src_1.AbiEncoder.create(dataType.getSignature(true));
                argsEncodedFromSignature = dataTypeFromSignature.encode(args);
                expect(argsEncodedFromSignature).to.be.deep.equal(expectedEncodedArgs);
                return [2 /*return*/];
            });
        }); });
        it('Int32 - Negative Value', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args, encodedArgs, expectedEncodedArgs, decodedArgs, dataTypeFromSignature, argsEncodedFromSignature;
            return __generator(this, function (_a) {
                testDataItem = { name: 'Integer (32)', type: 'int32' };
                dataType = new src_1.AbiEncoder.Int(testDataItem);
                args = min32BitInteger;
                encodedArgs = dataType.encode(args, encodingRules);
                expectedEncodedArgs = "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffff80000000";
                expect(encodedArgs).to.be.equal(expectedEncodedArgs);
                decodedArgs = dataType.decode(encodedArgs);
                expect(decodedArgs).to.be.deep.equal(args);
                dataTypeFromSignature = src_1.AbiEncoder.create(dataType.getSignature(true));
                argsEncodedFromSignature = dataTypeFromSignature.encode(args);
                expect(argsEncodedFromSignature).to.be.deep.equal(expectedEncodedArgs);
                return [2 /*return*/];
            });
        }); });
        it('Int32 - Value too large', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args;
            return __generator(this, function (_a) {
                testDataItem = { name: 'Integer (32)', type: 'int32' };
                dataType = new src_1.AbiEncoder.Int(testDataItem);
                args = max32BitInteger.plus(1);
                // Encode Args and validate result
                expect(function () {
                    dataType.encode(args, encodingRules);
                }).to.throw();
                return [2 /*return*/];
            });
        }); });
        it('Int32 - Value too small', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args;
            return __generator(this, function (_a) {
                testDataItem = { name: 'Integer (32)', type: 'int32' };
                dataType = new src_1.AbiEncoder.Int(testDataItem);
                args = min32BitInteger.minus(1);
                // Encode Args and validate result
                expect(function () {
                    dataType.encode(args, encodingRules);
                }).to.throw();
                return [2 /*return*/];
            });
        }); });
        it('Should decode NULL to default value of 0', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args, decodedArgs;
            return __generator(this, function (_a) {
                testDataItem = { name: 'Integer (256)', type: 'int' };
                dataType = new src_1.AbiEncoder.Int(testDataItem);
                args = new src_1.BigNumber(0);
                decodedArgs = dataType.decode(nullEncodedArgs);
                expect(decodedArgs).to.be.deep.equal(args);
                return [2 /*return*/];
            });
        }); });
    });
    describe('Unsigned Integer', function () {
        /* tslint:disable custom-no-magic-numbers */
        var max256BitUnsignedInteger = new src_1.BigNumber(2).pow(256).minus(1);
        var min256BitUnsignedInteger = new src_1.BigNumber(0);
        var max32BitUnsignedInteger = new src_1.BigNumber(2).pow(32).minus(1);
        var min32BitUnsignedInteger = new src_1.BigNumber(0);
        /* tslint:enable custom-no-magic-numbers */
        it('UInt256 - Positive Base Case', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args, encodedArgs, expectedEncodedArgs, decodedArgs, dataTypeFromSignature, argsEncodedFromSignature;
            return __generator(this, function (_a) {
                testDataItem = { name: 'Unsigned Integer (256)', type: 'uint' };
                dataType = new src_1.AbiEncoder.UInt(testDataItem);
                args = new src_1.BigNumber(1);
                encodedArgs = dataType.encode(args, encodingRules);
                expectedEncodedArgs = '0x0000000000000000000000000000000000000000000000000000000000000001';
                expect(encodedArgs).to.be.equal(expectedEncodedArgs);
                decodedArgs = dataType.decode(encodedArgs);
                expect(decodedArgs).to.be.deep.equal(args);
                dataTypeFromSignature = src_1.AbiEncoder.create(dataType.getSignature(true));
                argsEncodedFromSignature = dataTypeFromSignature.encode(args);
                expect(argsEncodedFromSignature).to.be.deep.equal(expectedEncodedArgs);
                return [2 /*return*/];
            });
        }); });
        it('UInt256 - Positive Value', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args, encodedArgs, expectedEncodedArgs, decodedArgs, dataTypeFromSignature, argsEncodedFromSignature;
            return __generator(this, function (_a) {
                testDataItem = { name: 'Unsigned Integer (256)', type: 'uint' };
                dataType = new src_1.AbiEncoder.UInt(testDataItem);
                args = max256BitUnsignedInteger;
                encodedArgs = dataType.encode(args, encodingRules);
                expectedEncodedArgs = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
                expect(encodedArgs).to.be.equal(expectedEncodedArgs);
                decodedArgs = dataType.decode(encodedArgs);
                expect(decodedArgs).to.be.deep.equal(args);
                dataTypeFromSignature = src_1.AbiEncoder.create(dataType.getSignature(true));
                argsEncodedFromSignature = dataTypeFromSignature.encode(args);
                expect(argsEncodedFromSignature).to.be.deep.equal(expectedEncodedArgs);
                return [2 /*return*/];
            });
        }); });
        it('UInt256 - Zero Value', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args, encodedArgs, expectedEncodedArgs, decodedArgs, dataTypeFromSignature, argsEncodedFromSignature;
            return __generator(this, function (_a) {
                testDataItem = { name: 'Unsigned Integer (256)', type: 'uint' };
                dataType = new src_1.AbiEncoder.UInt(testDataItem);
                args = min256BitUnsignedInteger;
                encodedArgs = dataType.encode(args, encodingRules);
                expectedEncodedArgs = "0x0000000000000000000000000000000000000000000000000000000000000000";
                expect(encodedArgs).to.be.equal(expectedEncodedArgs);
                decodedArgs = dataType.decode(encodedArgs);
                expect(decodedArgs).to.be.deep.equal(args);
                dataTypeFromSignature = src_1.AbiEncoder.create(dataType.getSignature(true));
                argsEncodedFromSignature = dataTypeFromSignature.encode(args);
                expect(argsEncodedFromSignature).to.be.deep.equal(expectedEncodedArgs);
                return [2 /*return*/];
            });
        }); });
        it('UInt256 - Value too large', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args;
            return __generator(this, function (_a) {
                testDataItem = { name: 'Unsigned Integer (256)', type: 'uint' };
                dataType = new src_1.AbiEncoder.UInt(testDataItem);
                args = max256BitUnsignedInteger.plus(1);
                // Encode Args and validate result
                expect(function () {
                    dataType.encode(args, encodingRules);
                }).to.throw();
                return [2 /*return*/];
            });
        }); });
        it('UInt256 - Value too small', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args;
            return __generator(this, function (_a) {
                testDataItem = { name: 'Unsigned Integer (256)', type: 'uint' };
                dataType = new src_1.AbiEncoder.UInt(testDataItem);
                args = min256BitUnsignedInteger.minus(1);
                // Encode Args and validate result
                expect(function () {
                    dataType.encode(args, encodingRules);
                }).to.throw();
                return [2 /*return*/];
            });
        }); });
        it('UInt32 - Positive Base Case', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args, encodedArgs, expectedEncodedArgs, decodedArgs, dataTypeFromSignature, argsEncodedFromSignature;
            return __generator(this, function (_a) {
                testDataItem = { name: 'Unsigned Integer (32)', type: 'uint32' };
                dataType = new src_1.AbiEncoder.UInt(testDataItem);
                args = new src_1.BigNumber(1);
                encodedArgs = dataType.encode(args, encodingRules);
                expectedEncodedArgs = '0x0000000000000000000000000000000000000000000000000000000000000001';
                expect(encodedArgs).to.be.equal(expectedEncodedArgs);
                decodedArgs = dataType.decode(encodedArgs);
                expect(decodedArgs).to.be.deep.equal(args);
                dataTypeFromSignature = src_1.AbiEncoder.create(dataType.getSignature(true));
                argsEncodedFromSignature = dataTypeFromSignature.encode(args);
                expect(argsEncodedFromSignature).to.be.deep.equal(expectedEncodedArgs);
                return [2 /*return*/];
            });
        }); });
        it('UInt32 - Positive Value', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args, encodedArgs, expectedEncodedArgs, decodedArgs, dataTypeFromSignature, argsEncodedFromSignature;
            return __generator(this, function (_a) {
                testDataItem = { name: 'Unsigned Integer (32)', type: 'uint32' };
                dataType = new src_1.AbiEncoder.UInt(testDataItem);
                args = max32BitUnsignedInteger;
                encodedArgs = dataType.encode(args, encodingRules);
                expectedEncodedArgs = '0x00000000000000000000000000000000000000000000000000000000ffffffff';
                expect(encodedArgs).to.be.equal(expectedEncodedArgs);
                decodedArgs = dataType.decode(encodedArgs);
                expect(decodedArgs).to.be.deep.equal(args);
                dataTypeFromSignature = src_1.AbiEncoder.create(dataType.getSignature(true));
                argsEncodedFromSignature = dataTypeFromSignature.encode(args);
                expect(argsEncodedFromSignature).to.be.deep.equal(expectedEncodedArgs);
                return [2 /*return*/];
            });
        }); });
        it('UInt32 - Zero Value', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args, encodedArgs, expectedEncodedArgs, decodedArgs, dataTypeFromSignature, argsEncodedFromSignature;
            return __generator(this, function (_a) {
                testDataItem = { name: 'Unsigned Integer (32)', type: 'uint32' };
                dataType = new src_1.AbiEncoder.UInt(testDataItem);
                args = min32BitUnsignedInteger;
                encodedArgs = dataType.encode(args, encodingRules);
                expectedEncodedArgs = "0x0000000000000000000000000000000000000000000000000000000000000000";
                expect(encodedArgs).to.be.equal(expectedEncodedArgs);
                decodedArgs = dataType.decode(encodedArgs);
                expect(decodedArgs).to.be.deep.equal(args);
                dataTypeFromSignature = src_1.AbiEncoder.create(dataType.getSignature(true));
                argsEncodedFromSignature = dataTypeFromSignature.encode(args);
                expect(argsEncodedFromSignature).to.be.deep.equal(expectedEncodedArgs);
                return [2 /*return*/];
            });
        }); });
        it('UInt32 - Value too large', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args;
            return __generator(this, function (_a) {
                testDataItem = { name: 'Unsigned Integer (32)', type: 'uint32' };
                dataType = new src_1.AbiEncoder.UInt(testDataItem);
                args = max32BitUnsignedInteger.plus(1);
                // Encode Args and validate result
                expect(function () {
                    dataType.encode(args, encodingRules);
                }).to.throw();
                return [2 /*return*/];
            });
        }); });
        it('UInt32 - Value too small', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args;
            return __generator(this, function (_a) {
                testDataItem = { name: 'Unsigned Integer (32)', type: 'uint32' };
                dataType = new src_1.AbiEncoder.UInt(testDataItem);
                args = min32BitUnsignedInteger.minus(1);
                // Encode Args and validate result
                expect(function () {
                    dataType.encode(args, encodingRules);
                }).to.throw();
                return [2 /*return*/];
            });
        }); });
        it('Should decode NULL to default value of 0', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args, decodedArgs;
            return __generator(this, function (_a) {
                testDataItem = { name: 'Unsigned Integer (256)', type: 'uint' };
                dataType = new src_1.AbiEncoder.UInt(testDataItem);
                args = new src_1.BigNumber(0);
                decodedArgs = dataType.decode(nullEncodedArgs);
                expect(decodedArgs).to.be.deep.equal(args);
                return [2 /*return*/];
            });
        }); });
    });
    describe('Static Bytes', function () {
        it('Single Byte (byte)', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args, encodedArgs, expectedEncodedArgs, decodedArgs, dataTypeFromSignature, argsEncodedFromSignature;
            return __generator(this, function (_a) {
                testDataItem = { name: 'Static Byte', type: 'byte' };
                dataType = new src_1.AbiEncoder.StaticBytes(testDataItem);
                args = '0x05';
                encodedArgs = dataType.encode(args, encodingRules);
                expectedEncodedArgs = '0x0500000000000000000000000000000000000000000000000000000000000000';
                expect(encodedArgs).to.be.equal(expectedEncodedArgs);
                decodedArgs = dataType.decode(encodedArgs);
                expect(decodedArgs).to.be.deep.equal(args);
                dataTypeFromSignature = src_1.AbiEncoder.create(dataType.getSignature(true));
                argsEncodedFromSignature = dataTypeFromSignature.encode(args);
                expect(argsEncodedFromSignature).to.be.deep.equal(expectedEncodedArgs);
                return [2 /*return*/];
            });
        }); });
        it('Single Byte (bytes1)', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args, encodedArgs, expectedEncodedArgs, decodedArgs, dataTypeFromSignature, argsEncodedFromSignature;
            return __generator(this, function (_a) {
                testDataItem = { name: 'Static Bytes1', type: 'bytes1' };
                dataType = new src_1.AbiEncoder.StaticBytes(testDataItem);
                args = '0x05';
                encodedArgs = dataType.encode(args, encodingRules);
                expectedEncodedArgs = '0x0500000000000000000000000000000000000000000000000000000000000000';
                expect(encodedArgs).to.be.equal(expectedEncodedArgs);
                decodedArgs = dataType.decode(encodedArgs);
                expect(decodedArgs).to.be.deep.equal(args);
                dataTypeFromSignature = src_1.AbiEncoder.create(dataType.getSignature(true));
                argsEncodedFromSignature = dataTypeFromSignature.encode(args);
                expect(argsEncodedFromSignature).to.be.deep.equal(expectedEncodedArgs);
                return [2 /*return*/];
            });
        }); });
        it('4 Bytes (bytes4)', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args, encodedArgs, expectedEncodedArgs, decodedArgs, dataTypeFromSignature, argsEncodedFromSignature;
            return __generator(this, function (_a) {
                testDataItem = { name: 'Static Bytes4', type: 'bytes4' };
                dataType = new src_1.AbiEncoder.StaticBytes(testDataItem);
                args = '0x00010203';
                encodedArgs = dataType.encode(args, encodingRules);
                expectedEncodedArgs = '0x0001020300000000000000000000000000000000000000000000000000000000';
                expect(encodedArgs).to.be.equal(expectedEncodedArgs);
                decodedArgs = dataType.decode(encodedArgs);
                expect(decodedArgs).to.be.deep.equal(args);
                dataTypeFromSignature = src_1.AbiEncoder.create(dataType.getSignature(true));
                argsEncodedFromSignature = dataTypeFromSignature.encode(args);
                expect(argsEncodedFromSignature).to.be.deep.equal(expectedEncodedArgs);
                return [2 /*return*/];
            });
        }); });
        it('4 Bytes (bytes4); Encoder must pad input', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args, encodedArgs, expectedEncodedArgs, decodedArgs, paddedArgs, dataTypeFromSignature, argsEncodedFromSignature;
            return __generator(this, function (_a) {
                testDataItem = { name: 'Static Bytes4', type: 'bytes4' };
                dataType = new src_1.AbiEncoder.StaticBytes(testDataItem);
                args = '0x1a18';
                encodedArgs = dataType.encode(args, encodingRules);
                expectedEncodedArgs = '0x1a18000000000000000000000000000000000000000000000000000000000000';
                expect(encodedArgs).to.be.equal(expectedEncodedArgs);
                decodedArgs = dataType.decode(encodedArgs);
                paddedArgs = '0x1a180000';
                expect(decodedArgs).to.be.deep.equal(paddedArgs);
                dataTypeFromSignature = src_1.AbiEncoder.create(dataType.getSignature(true));
                argsEncodedFromSignature = dataTypeFromSignature.encode(args);
                expect(argsEncodedFromSignature).to.be.deep.equal(expectedEncodedArgs);
                return [2 /*return*/];
            });
        }); });
        it('32 Bytes (bytes32)', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args, encodedArgs, expectedEncodedArgs, decodedArgs, dataTypeFromSignature, argsEncodedFromSignature;
            return __generator(this, function (_a) {
                testDataItem = { name: 'Static Bytes32', type: 'bytes32' };
                dataType = new src_1.AbiEncoder.StaticBytes(testDataItem);
                args = '0x0001020304050607080911121314151617181920212223242526272829303132';
                encodedArgs = dataType.encode(args, encodingRules);
                expectedEncodedArgs = '0x0001020304050607080911121314151617181920212223242526272829303132';
                expect(encodedArgs).to.be.equal(expectedEncodedArgs);
                decodedArgs = dataType.decode(encodedArgs);
                expect(decodedArgs).to.be.deep.equal(args);
                dataTypeFromSignature = src_1.AbiEncoder.create(dataType.getSignature(true));
                argsEncodedFromSignature = dataTypeFromSignature.encode(args);
                expect(argsEncodedFromSignature).to.be.deep.equal(expectedEncodedArgs);
                return [2 /*return*/];
            });
        }); });
        it('32 Bytes (bytes32); Encoder must pad input', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args, encodedArgs, expectedEncodedArgs, decodedArgs, paddedArgs, dataTypeFromSignature, argsEncodedFromSignature;
            return __generator(this, function (_a) {
                testDataItem = { name: 'Static Bytes32', type: 'bytes32' };
                dataType = new src_1.AbiEncoder.StaticBytes(testDataItem);
                args = '0x1a18bf61';
                encodedArgs = dataType.encode(args, encodingRules);
                expectedEncodedArgs = '0x1a18bf6100000000000000000000000000000000000000000000000000000000';
                expect(encodedArgs).to.be.equal(expectedEncodedArgs);
                decodedArgs = dataType.decode(encodedArgs);
                paddedArgs = '0x1a18bf6100000000000000000000000000000000000000000000000000000000';
                expect(decodedArgs).to.be.deep.equal(paddedArgs);
                dataTypeFromSignature = src_1.AbiEncoder.create(dataType.getSignature(true));
                argsEncodedFromSignature = dataTypeFromSignature.encode(args);
                expect(argsEncodedFromSignature).to.be.deep.equal(expectedEncodedArgs);
                return [2 /*return*/];
            });
        }); });
        it('Should throw when pass in too many bytes (bytes4)', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args;
            return __generator(this, function (_a) {
                testDataItem = { name: 'Static Bytes4', type: 'bytes4' };
                dataType = new src_1.AbiEncoder.StaticBytes(testDataItem);
                args = '0x0102030405';
                // Encode Args and validate result
                expect(function () {
                    dataType.encode(args, encodingRules);
                }).to.throw('Tried to assign 0x0102030405 (5 bytes), which exceeds max bytes that can be stored in a bytes4');
                return [2 /*return*/];
            });
        }); });
        it('Should throw when pass in too many bytes (bytes32)', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args;
            return __generator(this, function (_a) {
                testDataItem = { name: 'Static Bytes32', type: 'bytes32' };
                dataType = new src_1.AbiEncoder.StaticBytes(testDataItem);
                args = '0x010203040506070809101112131415161718192021222324252627282930313233';
                // Encode Args and validate result
                expect(function () {
                    dataType.encode(args, encodingRules);
                }).to.throw('Tried to assign 0x010203040506070809101112131415161718192021222324252627282930313233 (33 bytes), which exceeds max bytes that can be stored in a bytes32');
                return [2 /*return*/];
            });
        }); });
        it('Should throw when pass in bad hex (no 0x prefix)', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args;
            return __generator(this, function (_a) {
                testDataItem = { name: 'Static Bytes32', type: 'bytes32' };
                dataType = new src_1.AbiEncoder.StaticBytes(testDataItem);
                args = '0102030405060708091011121314151617181920212223242526272829303132';
                // Encode Args and validate result
                expect(function () {
                    dataType.encode(args, encodingRules);
                }).to.throw("Tried to encode non-hex value. Value must include '0x' prefix.");
                return [2 /*return*/];
            });
        }); });
        it('Should throw when pass in bad hex (include a half-byte)', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args;
            return __generator(this, function (_a) {
                testDataItem = { name: 'Static Bytes32', type: 'bytes32' };
                dataType = new src_1.AbiEncoder.StaticBytes(testDataItem);
                args = '0x010';
                // Encode Args and validate result
                expect(function () {
                    dataType.encode(args, encodingRules);
                }).to.throw('Tried to assign 0x010, which is contains a half-byte. Use full bytes only.');
                return [2 /*return*/];
            });
        }); });
        it('Should decode NULL to default value - Single Byte (byte)', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args, decodedArgs;
            return __generator(this, function (_a) {
                testDataItem = { name: 'Static Byte', type: 'byte' };
                dataType = new src_1.AbiEncoder.StaticBytes(testDataItem);
                args = '0x00';
                decodedArgs = dataType.decode(nullEncodedArgs);
                expect(decodedArgs).to.be.deep.equal(args);
                return [2 /*return*/];
            });
        }); });
        it('Should decode NULL to default value - 4 Bytes (bytes4)', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args, decodedArgs;
            return __generator(this, function (_a) {
                testDataItem = { name: 'Static Bytes4', type: 'bytes4' };
                dataType = new src_1.AbiEncoder.StaticBytes(testDataItem);
                args = '0x00000000';
                decodedArgs = dataType.decode(nullEncodedArgs);
                expect(decodedArgs).to.be.deep.equal(args);
                return [2 /*return*/];
            });
        }); });
        it('Should decode NULL to default value - 32 Bytes (bytes32)', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args, decodedArgs;
            return __generator(this, function (_a) {
                testDataItem = { name: 'Static Bytes32', type: 'bytes32' };
                dataType = new src_1.AbiEncoder.StaticBytes(testDataItem);
                args = '0x0000000000000000000000000000000000000000000000000000000000000000';
                decodedArgs = dataType.decode(nullEncodedArgs);
                expect(decodedArgs).to.be.deep.equal(args);
                return [2 /*return*/];
            });
        }); });
    });
    describe('Dynamic Bytes', function () {
        it('Fits into one EVM word', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args, encodedArgs, expectedEncodedArgs, decodedArgs, dataTypeFromSignature, argsEncodedFromSignature;
            return __generator(this, function (_a) {
                testDataItem = { name: 'Dynamic Bytes', type: 'bytes' };
                dataType = new src_1.AbiEncoder.DynamicBytes(testDataItem);
                args = '0x1a18bf61';
                encodedArgs = dataType.encode(args, encodingRules);
                expectedEncodedArgs = '0x00000000000000000000000000000000000000000000000000000000000000041a18bf6100000000000000000000000000000000000000000000000000000000';
                expect(encodedArgs).to.be.equal(expectedEncodedArgs);
                decodedArgs = dataType.decode(encodedArgs);
                expect(decodedArgs).to.be.deep.equal(args);
                dataTypeFromSignature = src_1.AbiEncoder.create(dataType.getSignature(true));
                argsEncodedFromSignature = dataTypeFromSignature.encode(args);
                expect(argsEncodedFromSignature).to.be.deep.equal(expectedEncodedArgs);
                return [2 /*return*/];
            });
        }); });
        it('Spans multiple EVM words', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, bytesLength, args, encodedArgs, expectedEncodedArgs, decodedArgs, dataTypeFromSignature, argsEncodedFromSignature;
            return __generator(this, function (_a) {
                testDataItem = { name: 'Dynamic Bytes', type: 'bytes' };
                dataType = new src_1.AbiEncoder.DynamicBytes(testDataItem);
                bytesLength = 40;
                args = "0x" + '61'.repeat(bytesLength);
                encodedArgs = dataType.encode(args, encodingRules);
                expectedEncodedArgs = '0x000000000000000000000000000000000000000000000000000000000000002861616161616161616161616161616161616161616161616161616161616161616161616161616161000000000000000000000000000000000000000000000000';
                expect(encodedArgs).to.be.equal(expectedEncodedArgs);
                decodedArgs = dataType.decode(encodedArgs);
                expect(decodedArgs).to.be.deep.equal(args);
                dataTypeFromSignature = src_1.AbiEncoder.create(dataType.getSignature(true));
                argsEncodedFromSignature = dataTypeFromSignature.encode(args);
                expect(argsEncodedFromSignature).to.be.deep.equal(expectedEncodedArgs);
                return [2 /*return*/];
            });
        }); });
        it('Input as Buffer', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args, argsAsBuffer, encodedArgs, expectedEncodedArgs, decodedArgs, dataTypeFromSignature, argsEncodedFromSignature;
            return __generator(this, function (_a) {
                testDataItem = { name: 'Dynamic Bytes', type: 'bytes' };
                dataType = new src_1.AbiEncoder.DynamicBytes(testDataItem);
                args = '0x1a18bf61';
                argsAsBuffer = ethUtil.toBuffer(args);
                encodedArgs = dataType.encode(argsAsBuffer);
                expectedEncodedArgs = '0x00000000000000000000000000000000000000000000000000000000000000041a18bf6100000000000000000000000000000000000000000000000000000000';
                expect(encodedArgs).to.be.equal(expectedEncodedArgs);
                decodedArgs = dataType.decode(encodedArgs);
                expect(decodedArgs).to.be.deep.equal(args);
                dataTypeFromSignature = src_1.AbiEncoder.create(dataType.getSignature(true));
                argsEncodedFromSignature = dataTypeFromSignature.encode(args);
                expect(argsEncodedFromSignature).to.be.deep.equal(expectedEncodedArgs);
                return [2 /*return*/];
            });
        }); });
        it('Should throw when pass in bad hex (no 0x prefix)', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args;
            return __generator(this, function (_a) {
                testDataItem = { name: 'Static Bytes', type: 'bytes' };
                dataType = new src_1.AbiEncoder.DynamicBytes(testDataItem);
                args = '01';
                // Encode Args and validate result
                expect(function () {
                    dataType.encode(args, encodingRules);
                }).to.throw("Tried to encode non-hex value. Value must include '0x' prefix.");
                return [2 /*return*/];
            });
        }); });
        it('Should throw when pass in bad hex (include a half-byte)', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args;
            return __generator(this, function (_a) {
                testDataItem = { name: 'Static Bytes', type: 'bytes' };
                dataType = new src_1.AbiEncoder.DynamicBytes(testDataItem);
                args = '0x010';
                // Encode Args and validate result
                expect(function () {
                    dataType.encode(args, encodingRules);
                }).to.throw('Tried to assign 0x010, which is contains a half-byte. Use full bytes only.');
                return [2 /*return*/];
            });
        }); });
        it('Should decode NULL to empty byte array', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args, decodedArgs;
            return __generator(this, function (_a) {
                testDataItem = { name: 'Dynamic Bytes', type: 'bytes' };
                dataType = new src_1.AbiEncoder.DynamicBytes(testDataItem);
                args = '0x';
                decodedArgs = dataType.decode(nullEncodedArgs);
                expect(decodedArgs).to.be.deep.equal(args);
                return [2 /*return*/];
            });
        }); });
    });
    describe('String', function () {
        it('Fits into one EVM word', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args, encodedArgs, expectedEncodedArgs, decodedArgs, dataTypeFromSignature, argsEncodedFromSignature;
            return __generator(this, function (_a) {
                testDataItem = { name: 'String', type: 'string' };
                dataType = new src_1.AbiEncoder.String(testDataItem);
                args = 'five';
                encodedArgs = dataType.encode(args, encodingRules);
                expectedEncodedArgs = '0x00000000000000000000000000000000000000000000000000000000000000046669766500000000000000000000000000000000000000000000000000000000';
                expect(encodedArgs).to.be.equal(expectedEncodedArgs);
                decodedArgs = dataType.decode(encodedArgs);
                expect(decodedArgs).to.be.deep.equal(args);
                dataTypeFromSignature = src_1.AbiEncoder.create(dataType.getSignature(true));
                argsEncodedFromSignature = dataTypeFromSignature.encode(args);
                expect(argsEncodedFromSignature).to.be.deep.equal(expectedEncodedArgs);
                return [2 /*return*/];
            });
        }); });
        it('Spans multiple EVM words', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, bytesLength, args, encodedArgs, expectedEncodedArgs, decodedArgs, dataTypeFromSignature, argsEncodedFromSignature;
            return __generator(this, function (_a) {
                testDataItem = { name: 'String', type: 'string' };
                dataType = new src_1.AbiEncoder.String(testDataItem);
                bytesLength = 40;
                args = 'a'.repeat(bytesLength);
                encodedArgs = dataType.encode(args, encodingRules);
                expectedEncodedArgs = '0x000000000000000000000000000000000000000000000000000000000000002861616161616161616161616161616161616161616161616161616161616161616161616161616161000000000000000000000000000000000000000000000000';
                expect(encodedArgs).to.be.equal(expectedEncodedArgs);
                decodedArgs = dataType.decode(encodedArgs);
                expect(decodedArgs).to.be.deep.equal(args);
                dataTypeFromSignature = src_1.AbiEncoder.create(dataType.getSignature(true));
                argsEncodedFromSignature = dataTypeFromSignature.encode(args);
                expect(argsEncodedFromSignature).to.be.deep.equal(expectedEncodedArgs);
                return [2 /*return*/];
            });
        }); });
        it('String that begins with 0x prefix', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, strLength, args, encodedArgs, expectedEncodedArgs, decodedArgs, dataTypeFromSignature, argsEncodedFromSignature;
            return __generator(this, function (_a) {
                testDataItem = { name: 'String', type: 'string' };
                dataType = new src_1.AbiEncoder.String(testDataItem);
                strLength = 40;
                args = "0x" + 'a'.repeat(strLength);
                encodedArgs = dataType.encode(args, encodingRules);
                expectedEncodedArgs = '0x000000000000000000000000000000000000000000000000000000000000002a30786161616161616161616161616161616161616161616161616161616161616161616161616161616100000000000000000000000000000000000000000000';
                expect(encodedArgs).to.be.equal(expectedEncodedArgs);
                decodedArgs = dataType.decode(encodedArgs);
                expect(decodedArgs).to.be.deep.equal(args);
                dataTypeFromSignature = src_1.AbiEncoder.create(dataType.getSignature(true));
                argsEncodedFromSignature = dataTypeFromSignature.encode(args);
                expect(argsEncodedFromSignature).to.be.deep.equal(expectedEncodedArgs);
                return [2 /*return*/];
            });
        }); });
        it('String that has a multibyte UTF-8 character', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args, encodedArgs, expectedEncodedArgs, decodedArgs, dataTypeFromSignature, argsEncodedFromSignature;
            return __generator(this, function (_a) {
                testDataItem = { name: 'String', type: 'string' };
                dataType = new src_1.AbiEncoder.String(testDataItem);
                args = '👴🏼';
                encodedArgs = dataType.encode(args, encodingRules);
                expectedEncodedArgs = '0x0000000000000000000000000000000000000000000000000000000000000008f09f91b4f09f8fbc000000000000000000000000000000000000000000000000';
                expect(encodedArgs).to.be.equal(expectedEncodedArgs);
                decodedArgs = dataType.decode(encodedArgs);
                expect(decodedArgs).to.be.deep.equal(args);
                dataTypeFromSignature = src_1.AbiEncoder.create(dataType.getSignature(true));
                argsEncodedFromSignature = dataTypeFromSignature.encode(args);
                expect(argsEncodedFromSignature).to.be.deep.equal(expectedEncodedArgs);
                return [2 /*return*/];
            });
        }); });
        it('String that combines single and multibyte UTF-8 characters', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args, encodedArgs, expectedEncodedArgs, decodedArgs, dataTypeFromSignature, argsEncodedFromSignature;
            return __generator(this, function (_a) {
                testDataItem = { name: 'String', type: 'string' };
                dataType = new src_1.AbiEncoder.String(testDataItem);
                args = 'Hello 😀👴🏼😁😂😃 world!';
                encodedArgs = dataType.encode(args, encodingRules);
                expectedEncodedArgs = '0x000000000000000000000000000000000000000000000000000000000000002548656c6c6f20f09f9880f09f91b4f09f8fbcf09f9881f09f9882f09f988320776f726c6421000000000000000000000000000000000000000000000000000000';
                expect(encodedArgs).to.be.equal(expectedEncodedArgs);
                decodedArgs = dataType.decode(encodedArgs);
                expect(decodedArgs).to.be.deep.equal(args);
                dataTypeFromSignature = src_1.AbiEncoder.create(dataType.getSignature(true));
                argsEncodedFromSignature = dataTypeFromSignature.encode(args);
                expect(argsEncodedFromSignature).to.be.deep.equal(expectedEncodedArgs);
                return [2 /*return*/];
            });
        }); });
        it('Should decode NULL to empty string', function () { return __awaiter(_this, void 0, void 0, function () {
            var testDataItem, dataType, args, decodedArgs;
            return __generator(this, function (_a) {
                testDataItem = { name: 'String', type: 'string' };
                dataType = new src_1.AbiEncoder.String(testDataItem);
                args = '';
                decodedArgs = dataType.decode(nullEncodedArgs);
                expect(decodedArgs).to.be.deep.equal(args);
                return [2 /*return*/];
            });
        }); });
    });
});
//# sourceMappingURL=evm_data_types_test.js.map