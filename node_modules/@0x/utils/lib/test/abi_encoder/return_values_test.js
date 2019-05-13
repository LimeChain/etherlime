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
var ReturnValueAbis = require("./abi_samples/return_value_abis");
chai_setup_1.chaiSetup.configure();
var expect = chai.expect;
describe('ABI Encoder: Return Value Encoding/Decoding', function () {
    var encodingRules = { shouldOptimize: false }; // optimizer is tested separately.
    var nullEncodedReturnValue = '0x';
    describe('Standard encoding/decoding', function () {
        it('No Return Value', function () { return __awaiter(_this, void 0, void 0, function () {
            var method, returnValue, decodedReturnValue, expectedDecodedReturnValue;
            return __generator(this, function (_a) {
                method = new src_1.AbiEncoder.Method(ReturnValueAbis.noReturnValues);
                returnValue = '0x';
                decodedReturnValue = method.decodeReturnValues(returnValue, { shouldConvertStructsToObjects: false });
                expectedDecodedReturnValue = [];
                expect(decodedReturnValue).to.be.deep.equal(expectedDecodedReturnValue);
                return [2 /*return*/];
            });
        }); });
        it('Single static return value', function () { return __awaiter(_this, void 0, void 0, function () {
            var method, returnValue, encodedReturnValue, decodedReturnValue;
            return __generator(this, function (_a) {
                method = new src_1.AbiEncoder.Method(ReturnValueAbis.singleStaticReturnValue);
                returnValue = ['0x01020304'];
                encodedReturnValue = method.encodeReturnValues(returnValue, encodingRules);
                decodedReturnValue = method.decodeReturnValues(encodedReturnValue, {
                    shouldConvertStructsToObjects: false,
                });
                // Validate decoded return value
                expect(decodedReturnValue).to.be.deep.equal(returnValue);
                return [2 /*return*/];
            });
        }); });
        it('Multiple static return values', function () { return __awaiter(_this, void 0, void 0, function () {
            var method, returnValue, encodedReturnValue, decodedReturnValue;
            return __generator(this, function (_a) {
                method = new src_1.AbiEncoder.Method(ReturnValueAbis.multipleStaticReturnValues);
                returnValue = ['0x01020304', '0x05060708'];
                encodedReturnValue = method.encodeReturnValues(returnValue, encodingRules);
                decodedReturnValue = method.decodeReturnValues(encodedReturnValue, {
                    shouldConvertStructsToObjects: false,
                });
                // Validate decoded return value
                expect(decodedReturnValue).to.be.deep.equal(returnValue);
                return [2 /*return*/];
            });
        }); });
        it('Single dynamic return value', function () { return __awaiter(_this, void 0, void 0, function () {
            var method, returnValue, encodedReturnValue, decodedReturnValue;
            return __generator(this, function (_a) {
                method = new src_1.AbiEncoder.Method(ReturnValueAbis.singleDynamicReturnValue);
                returnValue = ['0x01020304'];
                encodedReturnValue = method.encodeReturnValues(returnValue, encodingRules);
                decodedReturnValue = method.decodeReturnValues(encodedReturnValue, {
                    shouldConvertStructsToObjects: false,
                });
                // Validate decoded return value
                expect(decodedReturnValue).to.be.deep.equal(returnValue);
                return [2 /*return*/];
            });
        }); });
        it('Multiple dynamic return values', function () { return __awaiter(_this, void 0, void 0, function () {
            var method, returnValue, encodedReturnValue, decodedReturnValue;
            return __generator(this, function (_a) {
                method = new src_1.AbiEncoder.Method(ReturnValueAbis.multipleDynamicReturnValues);
                returnValue = ['0x01020304', '0x05060708'];
                encodedReturnValue = method.encodeReturnValues(returnValue, encodingRules);
                decodedReturnValue = method.decodeReturnValues(encodedReturnValue, {
                    shouldConvertStructsToObjects: false,
                });
                // Validate decoded return value
                expect(decodedReturnValue).to.be.deep.equal(returnValue);
                return [2 /*return*/];
            });
        }); });
        it('Mixed static/dynamic return values', function () { return __awaiter(_this, void 0, void 0, function () {
            var method, returnValue, encodedReturnValue, decodedReturnValue;
            return __generator(this, function (_a) {
                method = new src_1.AbiEncoder.Method(ReturnValueAbis.mixedStaticAndDynamicReturnValues);
                returnValue = ['0x01020304', '0x05060708'];
                encodedReturnValue = method.encodeReturnValues(returnValue, encodingRules);
                decodedReturnValue = method.decodeReturnValues(encodedReturnValue, {
                    shouldConvertStructsToObjects: false,
                });
                // Validate decoded return value
                expect(decodedReturnValue).to.be.deep.equal(returnValue);
                return [2 /*return*/];
            });
        }); });
        it('Should decode NULL as default value (single; static)', function () { return __awaiter(_this, void 0, void 0, function () {
            var method, returnValue, decodedReturnValue;
            return __generator(this, function (_a) {
                method = new src_1.AbiEncoder.Method(ReturnValueAbis.singleStaticReturnValue);
                returnValue = ['0x00000000'];
                decodedReturnValue = method.decodeReturnValues(nullEncodedReturnValue, {
                    shouldConvertStructsToObjects: false,
                });
                // Validate decoded return value
                expect(decodedReturnValue).to.be.deep.equal(returnValue);
                return [2 /*return*/];
            });
        }); });
        it('Should decode NULL as default value (multiple; static)', function () { return __awaiter(_this, void 0, void 0, function () {
            var method, returnValue, decodedReturnValue;
            return __generator(this, function (_a) {
                method = new src_1.AbiEncoder.Method(ReturnValueAbis.multipleStaticReturnValues);
                returnValue = ['0x00000000', '0x00000000'];
                decodedReturnValue = method.decodeReturnValues(nullEncodedReturnValue, {
                    shouldConvertStructsToObjects: false,
                });
                // Validate decoded return value
                expect(decodedReturnValue).to.be.deep.equal(returnValue);
                return [2 /*return*/];
            });
        }); });
        it('Should decode NULL as default value (single; dynamic)', function () { return __awaiter(_this, void 0, void 0, function () {
            var method, returnValue, decodedReturnValue;
            return __generator(this, function (_a) {
                method = new src_1.AbiEncoder.Method(ReturnValueAbis.singleDynamicReturnValue);
                returnValue = ['0x'];
                decodedReturnValue = method.decodeReturnValues(nullEncodedReturnValue, {
                    shouldConvertStructsToObjects: false,
                });
                // Validate decoded return value
                expect(decodedReturnValue).to.be.deep.equal(returnValue);
                return [2 /*return*/];
            });
        }); });
    });
    describe('Strict encoding/decoding', function () {
        it('No Return Value', function () { return __awaiter(_this, void 0, void 0, function () {
            var method, returnValue, decodedReturnValue, expectedDecodedReturnValue;
            return __generator(this, function (_a) {
                method = new src_1.AbiEncoder.Method(ReturnValueAbis.noReturnValues);
                returnValue = '0x';
                decodedReturnValue = method.strictDecodeReturnValue(returnValue);
                expectedDecodedReturnValue = undefined;
                expect(decodedReturnValue).to.be.deep.equal(expectedDecodedReturnValue);
                return [2 /*return*/];
            });
        }); });
        it('Single static return value', function () { return __awaiter(_this, void 0, void 0, function () {
            var method, returnValue, encodedReturnValue, decodedReturnValue;
            return __generator(this, function (_a) {
                method = new src_1.AbiEncoder.Method(ReturnValueAbis.singleStaticReturnValue);
                returnValue = ['0x01020304'];
                encodedReturnValue = method.encodeReturnValues(returnValue, encodingRules);
                decodedReturnValue = method.strictDecodeReturnValue(encodedReturnValue);
                // Validate decoded return value
                expect(decodedReturnValue).to.be.deep.equal(returnValue[0]);
                return [2 /*return*/];
            });
        }); });
        it('Multiple static return values', function () { return __awaiter(_this, void 0, void 0, function () {
            var method, returnValue, encodedReturnValue, decodedReturnValue;
            return __generator(this, function (_a) {
                method = new src_1.AbiEncoder.Method(ReturnValueAbis.multipleStaticReturnValues);
                returnValue = ['0x01020304', '0x05060708'];
                encodedReturnValue = method.encodeReturnValues(returnValue, encodingRules);
                decodedReturnValue = method.strictDecodeReturnValue(encodedReturnValue);
                // Validate decoded return value
                expect(decodedReturnValue).to.be.deep.equal(returnValue);
                return [2 /*return*/];
            });
        }); });
        it('Single dynamic return value', function () { return __awaiter(_this, void 0, void 0, function () {
            var method, returnValue, encodedReturnValue, decodedReturnValue;
            return __generator(this, function (_a) {
                method = new src_1.AbiEncoder.Method(ReturnValueAbis.singleDynamicReturnValue);
                returnValue = ['0x01020304'];
                encodedReturnValue = method.encodeReturnValues(returnValue, encodingRules);
                decodedReturnValue = method.strictDecodeReturnValue(encodedReturnValue);
                // Validate decoded return value
                expect(decodedReturnValue).to.be.deep.equal(returnValue[0]);
                return [2 /*return*/];
            });
        }); });
        it('Multiple dynamic return values', function () { return __awaiter(_this, void 0, void 0, function () {
            var method, returnValue, encodedReturnValue, decodedReturnValue;
            return __generator(this, function (_a) {
                method = new src_1.AbiEncoder.Method(ReturnValueAbis.multipleDynamicReturnValues);
                returnValue = ['0x01020304', '0x05060708'];
                encodedReturnValue = method.encodeReturnValues(returnValue, encodingRules);
                decodedReturnValue = method.strictDecodeReturnValue(encodedReturnValue);
                // Validate decoded return value
                expect(decodedReturnValue).to.be.deep.equal(returnValue);
                return [2 /*return*/];
            });
        }); });
        it('Struct should include fields', function () { return __awaiter(_this, void 0, void 0, function () {
            var method, returnValue, encodedReturnValue, decodedReturnValue;
            return __generator(this, function (_a) {
                method = new src_1.AbiEncoder.Method(ReturnValueAbis.structuredReturnValue);
                returnValue = {
                    fillResults: {
                        makerAssetFilledAmount: new src_1.BigNumber(50),
                        takerAssetFilledAmount: new src_1.BigNumber(40),
                    },
                };
                encodedReturnValue = method.encodeReturnValues(returnValue, encodingRules);
                decodedReturnValue = method.strictDecodeReturnValue(encodedReturnValue);
                // Validate decoded return value
                // Note that only the contents of `fillResults`, not the key itself, is decoded.
                // This is by design, as only a struct's contents are encoded and returned by a funciton call.
                expect(decodedReturnValue).to.be.deep.equal(returnValue.fillResults);
                return [2 /*return*/];
            });
        }); });
        it('Should decode NULL as default value (single; static)', function () { return __awaiter(_this, void 0, void 0, function () {
            var method, returnValue, encodedReturnValue, decodedReturnValue;
            return __generator(this, function (_a) {
                method = new src_1.AbiEncoder.Method(ReturnValueAbis.singleStaticReturnValue);
                returnValue = '0x00000000';
                encodedReturnValue = '0x';
                decodedReturnValue = method.strictDecodeReturnValue(encodedReturnValue);
                // Validate decoded return value
                expect(decodedReturnValue).to.be.deep.equal(returnValue);
                return [2 /*return*/];
            });
        }); });
        it('Should decode NULL as default value (multiple; static)', function () { return __awaiter(_this, void 0, void 0, function () {
            var method, returnValue, encodedReturnValue, decodedReturnValue;
            return __generator(this, function (_a) {
                method = new src_1.AbiEncoder.Method(ReturnValueAbis.multipleStaticReturnValues);
                returnValue = ['0x00000000', '0x00000000'];
                encodedReturnValue = '0x';
                decodedReturnValue = method.strictDecodeReturnValue(encodedReturnValue);
                // Validate decoded return value
                expect(decodedReturnValue).to.be.deep.equal(returnValue);
                return [2 /*return*/];
            });
        }); });
        it('Should decode NULL as default value (single; dynamic)', function () { return __awaiter(_this, void 0, void 0, function () {
            var method, returnValue, encodedReturnValue, decodedReturnValue;
            return __generator(this, function (_a) {
                method = new src_1.AbiEncoder.Method(ReturnValueAbis.singleDynamicReturnValue);
                returnValue = '0x';
                encodedReturnValue = '0x';
                decodedReturnValue = method.strictDecodeReturnValue(encodedReturnValue);
                // Validate decoded return value
                expect(decodedReturnValue).to.be.deep.equal(returnValue);
                return [2 /*return*/];
            });
        }); });
    });
});
//# sourceMappingURL=return_values_test.js.map