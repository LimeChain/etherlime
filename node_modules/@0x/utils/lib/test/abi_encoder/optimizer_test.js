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
var chai = require("chai");
require("mocha");
var src_1 = require("../../src/");
var chai_setup_1 = require("../utils/chai_setup");
var OptimizedAbis = require("./abi_samples/optimizer_abis");
chai_setup_1.chaiSetup.configure();
var expect = chai.expect;
describe('ABI Encoder: Optimized Method Encoding/Decoding', function () {
    var encodingRules = { shouldOptimize: true };
    it('Duplicate Dynamic Arrays with Static Elements', function () { return __awaiter(_this, void 0, void 0, function () {
        var method, array1, array2, args, optimizedCalldata, expectedOptimizedCalldata, decodedArgs;
        return __generator(this, function (_a) {
            method = new src_1.AbiEncoder.Method(OptimizedAbis.duplicateDynamicArraysWithStaticElements);
            array1 = [new src_1.BigNumber(100), new src_1.BigNumber(150)];
            array2 = array1;
            args = [array1, array2];
            optimizedCalldata = method.encode(args, encodingRules);
            expectedOptimizedCalldata = '0x7221063300000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000640000000000000000000000000000000000000000000000000000000000000096';
            expect(optimizedCalldata).to.be.equal(expectedOptimizedCalldata);
            decodedArgs = method.decode(optimizedCalldata, { shouldConvertStructsToObjects: false });
            expect(decodedArgs).to.be.deep.equal(args);
            return [2 /*return*/];
        });
    }); });
    it('Duplicate Dynamic Arrays with Dynamic Elements', function () { return __awaiter(_this, void 0, void 0, function () {
        var method, array1, array2, args, optimizedCalldata, expectedOptimizedCalldata, decodedArgs;
        return __generator(this, function (_a) {
            method = new src_1.AbiEncoder.Method(OptimizedAbis.duplicateDynamicArraysWithDynamicElements);
            array1 = ['Hello', 'World'];
            array2 = array1;
            args = [array1, array2];
            optimizedCalldata = method.encode(args, encodingRules);
            expectedOptimizedCalldata = '0xbb4f12e300000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000548656c6c6f0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005576f726c64000000000000000000000000000000000000000000000000000000';
            expect(optimizedCalldata).to.be.equal(expectedOptimizedCalldata);
            decodedArgs = method.decode(optimizedCalldata, { shouldConvertStructsToObjects: false });
            expect(decodedArgs).to.be.deep.equal(args);
            return [2 /*return*/];
        });
    }); });
    it('Duplicate Static Arrays with Static Elements (should not optimize)', function () { return __awaiter(_this, void 0, void 0, function () {
        var method, array1, array2, args, optimizedCalldata, expectedOptimizedCalldata, unoptimizedCalldata, decodedArgs;
        return __generator(this, function (_a) {
            method = new src_1.AbiEncoder.Method(OptimizedAbis.duplicateStaticArraysWithStaticElements);
            array1 = [new src_1.BigNumber(100), new src_1.BigNumber(150)];
            array2 = array1;
            args = [array1, array2];
            optimizedCalldata = method.encode(args, encodingRules);
            expectedOptimizedCalldata = '0x7f8130430000000000000000000000000000000000000000000000000000000000000064000000000000000000000000000000000000000000000000000000000000009600000000000000000000000000000000000000000000000000000000000000640000000000000000000000000000000000000000000000000000000000000096';
            expect(optimizedCalldata).to.be.equal(expectedOptimizedCalldata);
            unoptimizedCalldata = method.encode(args);
            expect(optimizedCalldata).to.be.equal(unoptimizedCalldata);
            decodedArgs = method.decode(optimizedCalldata, { shouldConvertStructsToObjects: false });
            expect(decodedArgs).to.be.deep.equal(args);
            return [2 /*return*/];
        });
    }); });
    it('Duplicate Static Arrays with Dynamic Elements', function () { return __awaiter(_this, void 0, void 0, function () {
        var method, array1, array2, args, optimizedCalldata, expectedOptimizedCalldata, decodedArgs;
        return __generator(this, function (_a) {
            method = new src_1.AbiEncoder.Method(OptimizedAbis.duplicateStaticArraysWithDynamicElements);
            array1 = ['Hello', 'World'];
            array2 = array1;
            args = [array1, array2];
            optimizedCalldata = method.encode(args, encodingRules);
            expectedOptimizedCalldata = '0x9fe31f8e0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000548656c6c6f0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005576f726c64000000000000000000000000000000000000000000000000000000';
            expect(optimizedCalldata).to.be.equal(expectedOptimizedCalldata);
            decodedArgs = method.decode(optimizedCalldata, { shouldConvertStructsToObjects: false });
            expect(decodedArgs).to.be.deep.equal(args);
            return [2 /*return*/];
        });
    }); });
    it('Duplicate Array Elements (should optimize)', function () { return __awaiter(_this, void 0, void 0, function () {
        var method, strings, args, optimizedCalldata, expectedOptimizedCalldata, decodedArgs;
        return __generator(this, function (_a) {
            method = new src_1.AbiEncoder.Method(OptimizedAbis.duplicateArrayElements);
            strings = ['Hello', 'World', 'Hello', 'World'];
            args = [strings];
            optimizedCalldata = method.encode(args, encodingRules);
            expectedOptimizedCalldata = '0x13e751a900000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000000000548656c6c6f0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005576f726c64000000000000000000000000000000000000000000000000000000';
            expect(optimizedCalldata).to.be.equal(expectedOptimizedCalldata);
            decodedArgs = method.decode(optimizedCalldata, { shouldConvertStructsToObjects: false });
            expect(decodedArgs).to.be.deep.equal(args);
            return [2 /*return*/];
        });
    }); });
    it('Duplicate Tuple Fields', function () { return __awaiter(_this, void 0, void 0, function () {
        var method, tuple, args, optimizedCalldata, expectedOptimizedCalldata, decodedArgs;
        return __generator(this, function (_a) {
            method = new src_1.AbiEncoder.Method(OptimizedAbis.duplicateTupleFields);
            tuple = ['Hello', 'Hello'];
            args = [tuple];
            optimizedCalldata = method.encode(args, encodingRules);
            expectedOptimizedCalldata = '0x16780a5e000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000548656c6c6f000000000000000000000000000000000000000000000000000000';
            expect(optimizedCalldata).to.be.equal(expectedOptimizedCalldata);
            decodedArgs = method.decode(optimizedCalldata, { shouldConvertStructsToObjects: false });
            expect(decodedArgs).to.be.deep.equal(args);
            return [2 /*return*/];
        });
    }); });
    it('Duplicate Strings', function () { return __awaiter(_this, void 0, void 0, function () {
        var method, args, optimizedCalldata, expectedOptimizedCalldata, decodedArgs;
        return __generator(this, function (_a) {
            method = new src_1.AbiEncoder.Method(OptimizedAbis.duplicateStrings);
            args = ['Hello', 'Hello'];
            optimizedCalldata = method.encode(args, encodingRules);
            expectedOptimizedCalldata = '0x07370bfa00000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000548656c6c6f000000000000000000000000000000000000000000000000000000';
            expect(optimizedCalldata).to.be.equal(expectedOptimizedCalldata);
            decodedArgs = method.decode(optimizedCalldata, { shouldConvertStructsToObjects: false });
            expect(decodedArgs).to.be.deep.equal(args);
            return [2 /*return*/];
        });
    }); });
    it('Duplicate Bytes', function () { return __awaiter(_this, void 0, void 0, function () {
        var method, value, args, optimizedCalldata, expectedOptimizedCalldata, decodedArgs;
        return __generator(this, function (_a) {
            method = new src_1.AbiEncoder.Method(OptimizedAbis.duplicateBytes);
            value = '0x01020304050607080910111213141516171819202122232425262728293031323334353637383940';
            args = [value, value];
            optimizedCalldata = method.encode(args, encodingRules);
            expectedOptimizedCalldata = '0x6045e42900000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000002801020304050607080910111213141516171819202122232425262728293031323334353637383940000000000000000000000000000000000000000000000000';
            expect(optimizedCalldata).to.be.equal(expectedOptimizedCalldata);
            decodedArgs = method.decode(optimizedCalldata, { shouldConvertStructsToObjects: false });
            expect(decodedArgs).to.be.deep.equal(args);
            return [2 /*return*/];
        });
    }); });
    it('Duplicate Tuples', function () { return __awaiter(_this, void 0, void 0, function () {
        var method, tuple1, tuple2, args, optimizedCalldata, expectedOptimizedCalldata, decodedArgs;
        return __generator(this, function (_a) {
            method = new src_1.AbiEncoder.Method(OptimizedAbis.duplicateTuples);
            tuple1 = ['Hello, World!', new src_1.BigNumber(424234)];
            tuple2 = tuple1;
            args = [tuple1, tuple2];
            optimizedCalldata = method.encode(args, encodingRules);
            expectedOptimizedCalldata = '0x564f826d000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000006792a000000000000000000000000000000000000000000000000000000000000000d48656c6c6f2c20576f726c642100000000000000000000000000000000000000';
            expect(optimizedCalldata).to.be.equal(expectedOptimizedCalldata);
            decodedArgs = method.decode(optimizedCalldata, { shouldConvertStructsToObjects: false });
            expect(decodedArgs).to.be.deep.equal(args);
            return [2 /*return*/];
        });
    }); });
    it('Duplicate Fields Across Two Tuples', function () { return __awaiter(_this, void 0, void 0, function () {
        var method, tuple1, tuple2, args, optimizedCalldata, expectedOptimizedCalldata, decodedArgs;
        return __generator(this, function (_a) {
            method = new src_1.AbiEncoder.Method(OptimizedAbis.duplicateTuples);
            tuple1 = ['Hello, World!', new src_1.BigNumber(1)];
            tuple2 = [tuple1[0], new src_1.BigNumber(2)];
            args = [tuple1, tuple2];
            optimizedCalldata = method.encode(args, encodingRules);
            expectedOptimizedCalldata = '0x564f826d000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000d48656c6c6f2c20576f726c642100000000000000000000000000000000000000';
            expect(optimizedCalldata).to.be.equal(expectedOptimizedCalldata);
            decodedArgs = method.decode(optimizedCalldata, { shouldConvertStructsToObjects: false });
            expect(decodedArgs).to.be.deep.equal(args);
            return [2 /*return*/];
        });
    }); });
    it('Duplicate Arrays, Nested in Separate Tuples', function () { return __awaiter(_this, void 0, void 0, function () {
        var method, array, tuple1, tuple2, args, optimizedCalldata, expectedOptimizedCalldata, decodedArgs;
        return __generator(this, function (_a) {
            method = new src_1.AbiEncoder.Method(OptimizedAbis.duplicateArraysNestedInTuples);
            array = [new src_1.BigNumber(100), new src_1.BigNumber(150), new src_1.BigNumber(200)];
            tuple1 = [array];
            tuple2 = [array, 'extra argument to prevent exactly matching the tuples'];
            args = [tuple1, tuple2];
            optimizedCalldata = method.encode(args, encodingRules);
            expectedOptimizedCalldata = '0x18970a9e000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000064000000000000000000000000000000000000000000000000000000000000009600000000000000000000000000000000000000000000000000000000000000c80000000000000000000000000000000000000000000000000000000000000035657874726120617267756d656e7420746f2070726576656e742065786163746c79206d61746368696e6720746865207475706c65730000000000000000000000';
            expect(optimizedCalldata).to.be.equal(expectedOptimizedCalldata);
            decodedArgs = method.decode(optimizedCalldata, { shouldConvertStructsToObjects: false });
            expect(decodedArgs).to.be.deep.equal(args);
            return [2 /*return*/];
        });
    }); });
    it('Duplicate Tuples, Nested in Separate Tuples', function () { return __awaiter(_this, void 0, void 0, function () {
        var method, nestedTuple, tuple1, tuple2, args, optimizedCalldata, expectedOptimizedCalldata, decodedArgs;
        return __generator(this, function (_a) {
            method = new src_1.AbiEncoder.Method(OptimizedAbis.duplicateTuplesNestedInTuples);
            nestedTuple = ['Hello, World!'];
            tuple1 = [nestedTuple];
            tuple2 = [nestedTuple, 'extra argument to prevent exactly matching the tuples'];
            args = [tuple1, tuple2];
            optimizedCalldata = method.encode(args, encodingRules);
            expectedOptimizedCalldata = '0x0b4d2e6a000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000d48656c6c6f2c20576f726c6421000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000035657874726120617267756d656e7420746f2070726576656e742065786163746c79206d61746368696e6720746865207475706c65730000000000000000000000';
            expect(optimizedCalldata).to.be.equal(expectedOptimizedCalldata);
            decodedArgs = method.decode(optimizedCalldata, { shouldConvertStructsToObjects: false });
            expect(decodedArgs).to.be.deep.equal(args);
            return [2 /*return*/];
        });
    }); });
    it('Duplicate Two-Dimensional Arrays', function () { return __awaiter(_this, void 0, void 0, function () {
        var method, twoDimArray1, twoDimArray2, args, optimizedCalldata, expectedOptimizedCalldata, decodedArgs;
        return __generator(this, function (_a) {
            method = new src_1.AbiEncoder.Method(OptimizedAbis.duplicateTwoDimensionalArrays);
            twoDimArray1 = [['Hello', 'World'], ['Foo', 'Bar', 'Zaa']];
            twoDimArray2 = twoDimArray1;
            args = [twoDimArray1, twoDimArray2];
            optimizedCalldata = method.encode(args, { shouldOptimize: false });
            expectedOptimizedCalldata = '0x0d28c4f9000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000002c0000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000548656c6c6f0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005576f726c640000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000003466f6f00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003426172000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000035a61610000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000548656c6c6f0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005576f726c640000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000003466f6f00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003426172000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000035a61610000000000000000000000000000000000000000000000000000000000';
            expect(optimizedCalldata).to.be.equal(expectedOptimizedCalldata);
            decodedArgs = method.decode(optimizedCalldata, { shouldConvertStructsToObjects: false });
            expect(decodedArgs).to.be.deep.equal(args);
            return [2 /*return*/];
        });
    }); });
    it('Duplicate Array, Nested within Separate Two-Dimensional Arrays', function () { return __awaiter(_this, void 0, void 0, function () {
        var method, twoDimArray1, twoDimArray2, args, optimizedCalldata, expectedOptimizedCalldata, decodedArgs;
        return __generator(this, function (_a) {
            method = new src_1.AbiEncoder.Method(OptimizedAbis.duplicateTwoDimensionalArrays);
            twoDimArray1 = [['Hello', 'World'], ['Foo']];
            twoDimArray2 = [['Hello', 'World'], ['Bar']];
            args = [twoDimArray1, twoDimArray2];
            optimizedCalldata = method.encode(args, encodingRules);
            expectedOptimizedCalldata = '0x0d28c4f900000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000001200000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000003466f6f0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000548656c6c6f0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005576f726c640000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000034261720000000000000000000000000000000000000000000000000000000000';
            expect(optimizedCalldata).to.be.equal(expectedOptimizedCalldata);
            decodedArgs = method.decode(optimizedCalldata, { shouldConvertStructsToObjects: false });
            expect(decodedArgs).to.be.deep.equal(args);
            return [2 /*return*/];
        });
    }); });
    it('Array Elements Duplicated as Tuple Fields', function () { return __awaiter(_this, void 0, void 0, function () {
        var method, array, tuple, args, optimizedCalldata, expectedOptimizedCalldata, decodedArgs;
        return __generator(this, function (_a) {
            method = new src_1.AbiEncoder.Method(OptimizedAbis.arrayElementsDuplicatedAsTupleFields);
            array = [100, 150, 200, 225];
            tuple = [
                [new src_1.BigNumber(array[0])],
                [new src_1.BigNumber(array[1])],
                [new src_1.BigNumber(array[2])],
                [new src_1.BigNumber(array[3])],
            ];
            args = [array, tuple];
            optimizedCalldata = method.encode(args, encodingRules);
            expectedOptimizedCalldata = '0x5b5c78fd0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000064000000000000000000000000000000000000000000000000000000000000009600000000000000000000000000000000000000000000000000000000000000c800000000000000000000000000000000000000000000000000000000000000e1';
            expect(optimizedCalldata).to.be.equal(expectedOptimizedCalldata);
            decodedArgs = method.decode(optimizedCalldata, { shouldConvertStructsToObjects: false });
            expect(decodedArgs).to.be.deep.equal(args);
            return [2 /*return*/];
        });
    }); });
    it('Array Elements Duplicated as Separate Parameter', function () { return __awaiter(_this, void 0, void 0, function () {
        var method, array, str, args, optimizedCalldata, expectedOptimizedCalldata, decodedArgs;
        return __generator(this, function (_a) {
            method = new src_1.AbiEncoder.Method(OptimizedAbis.arrayElementsDuplicatedAsSeparateParameter);
            array = ['Hello', 'Hello', 'Hello', 'World'];
            str = 'Hello';
            args = [array, str];
            optimizedCalldata = method.encode(args, encodingRules);
            expectedOptimizedCalldata = '0xe0e0d34900000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000005576f726c64000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000548656c6c6f000000000000000000000000000000000000000000000000000000';
            expect(optimizedCalldata).to.be.equal(expectedOptimizedCalldata);
            decodedArgs = method.decode(optimizedCalldata, { shouldConvertStructsToObjects: false });
            expect(decodedArgs).to.be.deep.equal(args);
            return [2 /*return*/];
        });
    }); });
});
//# sourceMappingURL=optimizer_test.js.map