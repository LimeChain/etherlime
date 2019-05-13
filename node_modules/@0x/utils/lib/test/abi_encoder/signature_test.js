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
var src_1 = require("../../src");
var chai_setup_1 = require("../utils/chai_setup");
chai_setup_1.chaiSetup.configure();
var expect = chai.expect;
describe('ABI Encoder: Signatures', function () {
    describe('Single type', function () {
        it('Elementary', function () { return __awaiter(_this, void 0, void 0, function () {
            var signature, dataType, dataTypeId;
            return __generator(this, function (_a) {
                signature = 'uint256';
                dataType = src_1.AbiEncoder.create(signature);
                dataTypeId = dataType.getDataItem().type;
                expect(dataTypeId).to.be.equal('uint256');
                expect(dataType.getSignature()).to.be.equal(signature);
                return [2 /*return*/];
            });
        }); });
        it('Array', function () { return __awaiter(_this, void 0, void 0, function () {
            var signature, dataType, dataItem, expectedDataItem;
            return __generator(this, function (_a) {
                signature = 'string[]';
                dataType = src_1.AbiEncoder.create(signature);
                dataItem = dataType.getDataItem();
                expectedDataItem = {
                    name: '',
                    type: 'string[]',
                };
                expect(dataItem).to.be.deep.equal(expectedDataItem);
                expect(dataType.getSignature()).to.be.equal(signature);
                return [2 /*return*/];
            });
        }); });
        it('Multidimensional Array', function () { return __awaiter(_this, void 0, void 0, function () {
            var signature, dataType, dataTypeId;
            return __generator(this, function (_a) {
                signature = 'uint256[4][][5]';
                dataType = src_1.AbiEncoder.create(signature);
                dataTypeId = dataType.getDataItem().type;
                expect(dataTypeId).to.be.equal(signature);
                expect(dataType.getSignature()).to.be.equal(signature);
                return [2 /*return*/];
            });
        }); });
        it('Tuple with single element', function () { return __awaiter(_this, void 0, void 0, function () {
            var signature, dataType, dataItem, expectedDataItem;
            return __generator(this, function (_a) {
                signature = '(uint256)';
                dataType = src_1.AbiEncoder.create(signature);
                dataItem = dataType.getDataItem();
                expectedDataItem = {
                    name: '',
                    type: 'tuple',
                    components: [
                        {
                            name: '',
                            type: 'uint256',
                        },
                    ],
                };
                expect(dataItem).to.be.deep.equal(expectedDataItem);
                expect(dataType.getSignature()).to.be.equal(signature);
                return [2 /*return*/];
            });
        }); });
        it('Tuple with multiple elements', function () { return __awaiter(_this, void 0, void 0, function () {
            var signature, dataType, dataItem, expectedDataItem;
            return __generator(this, function (_a) {
                signature = '(uint256,string,bytes4)';
                dataType = src_1.AbiEncoder.create(signature);
                dataItem = dataType.getDataItem();
                expectedDataItem = {
                    name: '',
                    type: 'tuple',
                    components: [
                        {
                            name: '',
                            type: 'uint256',
                        },
                        {
                            name: '',
                            type: 'string',
                        },
                        {
                            name: '',
                            type: 'bytes4',
                        },
                    ],
                };
                expect(dataItem).to.be.deep.equal(expectedDataItem);
                expect(dataType.getSignature()).to.be.equal(signature);
                return [2 /*return*/];
            });
        }); });
        it('Tuple with nested array and nested tuple', function () { return __awaiter(_this, void 0, void 0, function () {
            var signature, dataType, dataItem, expectedDataItem;
            return __generator(this, function (_a) {
                signature = '(uint256[],(bytes),string[4],bytes4)';
                dataType = src_1.AbiEncoder.create(signature);
                dataItem = dataType.getDataItem();
                expectedDataItem = {
                    name: '',
                    type: 'tuple',
                    components: [
                        {
                            name: '',
                            type: 'uint256[]',
                        },
                        {
                            name: '',
                            type: 'tuple',
                            components: [
                                {
                                    name: '',
                                    type: 'bytes',
                                },
                            ],
                        },
                        {
                            name: '',
                            type: 'string[4]',
                        },
                        {
                            name: '',
                            type: 'bytes4',
                        },
                    ],
                };
                expect(dataItem).to.be.deep.equal(expectedDataItem);
                expect(dataType.getSignature()).to.be.equal(signature);
                return [2 /*return*/];
            });
        }); });
        it('Array of complex tuples', function () { return __awaiter(_this, void 0, void 0, function () {
            var signature, dataType, dataItem, expectedDataItem;
            return __generator(this, function (_a) {
                signature = '(uint256[],(bytes),string[4],bytes4)[5][4][]';
                dataType = src_1.AbiEncoder.create(signature);
                dataItem = dataType.getDataItem();
                expectedDataItem = {
                    name: '',
                    type: 'tuple[5][4][]',
                    components: [
                        {
                            name: '',
                            type: 'uint256[]',
                        },
                        {
                            name: '',
                            type: 'tuple',
                            components: [
                                {
                                    name: '',
                                    type: 'bytes',
                                },
                            ],
                        },
                        {
                            name: '',
                            type: 'string[4]',
                        },
                        {
                            name: '',
                            type: 'bytes4',
                        },
                    ],
                };
                expect(dataItem).to.be.deep.equal(expectedDataItem);
                expect(dataType.getSignature()).to.be.equal(signature);
                return [2 /*return*/];
            });
        }); });
    });
    describe('Function', function () {
        it('No inputs and no outputs', function () { return __awaiter(_this, void 0, void 0, function () {
            var functionName, dataType, expectedSignature, expectedInputDataItem, expectedOutputDataItem;
            return __generator(this, function (_a) {
                functionName = 'foo';
                dataType = src_1.AbiEncoder.createMethod(functionName);
                expectedSignature = 'foo()';
                expectedInputDataItem = {
                    name: 'foo',
                    type: 'method',
                    components: [],
                };
                expectedOutputDataItem = {
                    name: 'foo',
                    type: 'tuple',
                    components: [],
                };
                // check expected values
                expect(dataType.getSignature()).to.be.equal(expectedSignature);
                expect(dataType.getDataItem()).to.be.deep.equal(expectedInputDataItem);
                expect(dataType.getReturnValueDataItem()).to.be.deep.equal(expectedOutputDataItem);
                return [2 /*return*/];
            });
        }); });
        it('No inputs and no outputs (empty arrays as input)', function () { return __awaiter(_this, void 0, void 0, function () {
            var functionName, dataType, expectedSignature, expectedInputDataItem, expectedOutputDataItem;
            return __generator(this, function (_a) {
                functionName = 'foo';
                dataType = src_1.AbiEncoder.createMethod(functionName, [], []);
                expectedSignature = 'foo()';
                expectedInputDataItem = {
                    name: 'foo',
                    type: 'method',
                    components: [],
                };
                expectedOutputDataItem = {
                    name: 'foo',
                    type: 'tuple',
                    components: [],
                };
                // check expected values
                expect(dataType.getSignature()).to.be.equal(expectedSignature);
                expect(dataType.getDataItem()).to.be.deep.equal(expectedInputDataItem);
                expect(dataType.getReturnValueDataItem()).to.be.deep.equal(expectedOutputDataItem);
                return [2 /*return*/];
            });
        }); });
        it('Single DataItem input and single DataItem output', function () { return __awaiter(_this, void 0, void 0, function () {
            var functionName, inputDataItem, outputDataItem, dataType, expectedSignature, expectedInputDataItem, expectedOutputDataItem;
            return __generator(this, function (_a) {
                functionName = 'foo';
                inputDataItem = {
                    name: 'input',
                    type: 'uint256',
                };
                outputDataItem = {
                    name: 'output',
                    type: 'string',
                };
                dataType = src_1.AbiEncoder.createMethod(functionName, inputDataItem, outputDataItem);
                expectedSignature = 'foo(uint256)';
                expectedInputDataItem = {
                    name: 'foo',
                    type: 'method',
                    components: [inputDataItem],
                };
                expectedOutputDataItem = {
                    name: 'foo',
                    type: 'tuple',
                    components: [outputDataItem],
                };
                // check expected values
                expect(dataType.getSignature()).to.be.equal(expectedSignature);
                expect(dataType.getDataItem()).to.be.deep.equal(expectedInputDataItem);
                expect(dataType.getReturnValueDataItem()).to.be.deep.equal(expectedOutputDataItem);
                return [2 /*return*/];
            });
        }); });
        it('Single signature input and single signature output', function () { return __awaiter(_this, void 0, void 0, function () {
            var functionName, inputSignature, outputSignature, dataType, expectedSignature, expectedInputDataItem, expectedOutputDataItem;
            return __generator(this, function (_a) {
                functionName = 'foo';
                inputSignature = 'uint256';
                outputSignature = 'string';
                dataType = src_1.AbiEncoder.createMethod(functionName, inputSignature, outputSignature);
                expectedSignature = 'foo(uint256)';
                expectedInputDataItem = {
                    name: 'foo',
                    type: 'method',
                    components: [
                        {
                            name: '',
                            type: 'uint256',
                        },
                    ],
                };
                expectedOutputDataItem = {
                    name: 'foo',
                    type: 'tuple',
                    components: [
                        {
                            name: '',
                            type: 'string',
                        },
                    ],
                };
                // check expected values
                expect(dataType.getSignature()).to.be.equal(expectedSignature);
                expect(dataType.getDataItem()).to.be.deep.equal(expectedInputDataItem);
                expect(dataType.getReturnValueDataItem()).to.be.deep.equal(expectedOutputDataItem);
                return [2 /*return*/];
            });
        }); });
        it('Single signature tuple input and single signature tuple output', function () { return __awaiter(_this, void 0, void 0, function () {
            var functionName, inputSignature, outputSignature, dataType, expectedSignature, expectedInputDataItem, expectedOutputDataItem;
            return __generator(this, function (_a) {
                functionName = 'foo';
                inputSignature = '(uint256,bytes[][4])';
                outputSignature = '(string,uint32)';
                dataType = src_1.AbiEncoder.createMethod(functionName, inputSignature, outputSignature);
                expectedSignature = 'foo((uint256,bytes[][4]))';
                expectedInputDataItem = {
                    name: 'foo',
                    type: 'method',
                    components: [
                        {
                            name: '',
                            type: 'tuple',
                            components: [
                                {
                                    name: '',
                                    type: 'uint256',
                                },
                                {
                                    name: '',
                                    type: 'bytes[][4]',
                                },
                            ],
                        },
                    ],
                };
                expectedOutputDataItem = {
                    name: 'foo',
                    type: 'tuple',
                    components: [
                        {
                            name: '',
                            type: 'tuple',
                            components: [
                                {
                                    name: '',
                                    type: 'string',
                                },
                                {
                                    name: '',
                                    type: 'uint32',
                                },
                            ],
                        },
                    ],
                };
                // check expected values
                expect(dataType.getSignature()).to.be.equal(expectedSignature);
                expect(dataType.getDataItem()).to.be.deep.equal(expectedInputDataItem);
                expect(dataType.getReturnValueDataItem()).to.be.deep.equal(expectedOutputDataItem);
                return [2 /*return*/];
            });
        }); });
        it('Mutiple DataItem input and multiple DataItem output', function () { return __awaiter(_this, void 0, void 0, function () {
            var functionName, inputDataItems, outputDataItems, dataType, expectedSignature, expectedInputDataItem, expectedOutputDataItem;
            return __generator(this, function (_a) {
                functionName = 'foo';
                inputDataItems = [
                    {
                        name: '',
                        type: 'uint256',
                    },
                    {
                        name: '',
                        type: 'bytes[][4]',
                    },
                ];
                outputDataItems = [
                    {
                        name: '',
                        type: 'string',
                    },
                    {
                        name: '',
                        type: 'uint32',
                    },
                ];
                dataType = src_1.AbiEncoder.createMethod(functionName, inputDataItems, outputDataItems);
                expectedSignature = 'foo(uint256,bytes[][4])';
                expectedInputDataItem = {
                    name: 'foo',
                    type: 'method',
                    components: inputDataItems,
                };
                expectedOutputDataItem = {
                    name: 'foo',
                    type: 'tuple',
                    components: outputDataItems,
                };
                // check expected values
                expect(dataType.getSignature()).to.be.equal(expectedSignature);
                expect(dataType.getDataItem()).to.be.deep.equal(expectedInputDataItem);
                expect(dataType.getReturnValueDataItem()).to.be.deep.equal(expectedOutputDataItem);
                return [2 /*return*/];
            });
        }); });
        it('Multiple signature input and multiple signature output', function () { return __awaiter(_this, void 0, void 0, function () {
            var functionName, inputSignatures, outputSignatures, dataType, expectedSignature, expectedInputDataItem, expectedOutputDataItem;
            return __generator(this, function (_a) {
                functionName = 'foo';
                inputSignatures = ['uint256', 'bytes[][4]'];
                outputSignatures = ['string', 'uint32'];
                dataType = src_1.AbiEncoder.createMethod(functionName, inputSignatures, outputSignatures);
                expectedSignature = 'foo(uint256,bytes[][4])';
                expectedInputDataItem = {
                    name: 'foo',
                    type: 'method',
                    components: [
                        {
                            name: '',
                            type: 'uint256',
                        },
                        {
                            name: '',
                            type: 'bytes[][4]',
                        },
                    ],
                };
                expectedOutputDataItem = {
                    name: 'foo',
                    type: 'tuple',
                    components: [
                        {
                            name: '',
                            type: 'string',
                        },
                        {
                            name: '',
                            type: 'uint32',
                        },
                    ],
                };
                // check expected values
                expect(dataType.getSignature()).to.be.equal(expectedSignature);
                expect(dataType.getDataItem()).to.be.deep.equal(expectedInputDataItem);
                expect(dataType.getReturnValueDataItem()).to.be.deep.equal(expectedOutputDataItem);
                return [2 /*return*/];
            });
        }); });
    });
});
//# sourceMappingURL=signature_test.js.map