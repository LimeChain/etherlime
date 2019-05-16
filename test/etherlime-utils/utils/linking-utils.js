const assert = require('assert');

const isValidLibrary = require('./../../../packages/etherlime-utils/utils/linking-utils').isValidLibrary;
const linkLibrary = require('./../../../packages/etherlime-utils/utils/linking-utils').linkLibrary;

const DataContract = require('./../../testContracts/DataContract.json');
const Greetings = require('./../../testContracts/Greetings.json');

describe('Linking library tests', () => {
    it('should return true if library is empty object', () => {
        assert.ok(isValidLibrary({}));
    });

    it('should return true if library is empty string', () => {
        assert.ok(isValidLibrary(''));
    });
    
    it('should return true if library is undefined', () => {
        assert.ok(isValidLibrary(undefined));
    });

    it('should return true if library is a valid object', () => {
        assert.ok(isValidLibrary({"LinkedList": "0x2Be52D5d7A73FC183cF40053B95beD572519EBbC"}));
    });

    it('should link the library to the contract', () => {
        let libraries = {"LinkedList": "0x2Be52D5d7A73FC183cF40053B95beD572519EBbC"};
        let bytecode = linkLibrary(libraries, DataContract.bytecode);

        assert.ok(bytecode.includes("2Be52D5d7A73FC183cF40053B95beD572519EBbC"));
    });

    it('should throw when contract doesn\'t contain library', () => {
        let libraries = {"LinkedList": "0x2Be52D5d7A73FC183cF40053B95beD572519EBbC"};
        let bytecode = linkLibrary(libraries, Greetings.bytecode);

        assert.ok(!bytecode.includes("2Be52D5d7A73FC183cF40053B95beD572519EBbC"));
    });

    it('should not link a library if the object does not own the property', () => {
        var libraries = new Object();
        libraries.Queue = "0x2Be52D5d7A73FC183cF40053B95beD572519EBbC";
        Object.prototype.LinkedList = "0x2Be52D5d7A73FC183cF40053B95beD572519EBbC";

        let bytecode = linkLibrary(libraries, Greetings.bytecode);
        delete Object.prototype.LinkedList
        assert.equal(Greetings.bytecode, bytecode);
    });

    it('should throw when contract has unlinked library', () => {
        let libraries = {"Queue": "0x2Be52D5d7A73FC183cF40053B95beD572519EBbC"};

        assert.throws(() => linkLibrary(libraries, DataContract.bytecode), Error, 'Not all libraries were linked.');
    });
});