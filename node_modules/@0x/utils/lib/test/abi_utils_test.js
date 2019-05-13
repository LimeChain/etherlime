"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai = require("chai");
require("mocha");
var src_1 = require("../src");
var expect = chai.expect;
describe('abiUtils', function () {
    describe('splitTupleTypes', function () {
        it('handles basic types', function () {
            var got = src_1.abiUtils.splitTupleTypes('tuple(bytes,uint256,address)');
            expect(got).to.deep.equal(['bytes', 'uint256', 'address']);
        });
        it('handles nested tuple types', function () {
            var got = src_1.abiUtils.splitTupleTypes('tuple(tuple(bytes,uint256),address)');
            expect(got).to.deep.equal(['tuple(bytes,uint256)', 'address']);
        });
    });
});
//# sourceMappingURL=abi_utils_test.js.map