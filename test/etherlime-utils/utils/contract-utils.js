const assert = require('assert');

const isValidContract = require('./../../../packages/etherlime-utils/utils/contract-utils').isValidContract;
const isValidBytecode = require('./../../../packages/etherlime-utils/utils/contract-utils').isValidBytecode;

const ICOTokenContract = require('./../../testContracts/ICOToken.json');

describe('Contract utils tests', () => {

	let contractCopy;

	beforeEach(() => {
		contractCopy = JSON.parse(JSON.stringify(ICOTokenContract))
	})


	it('should return true on correct contract', () => {
		assert.ok(isValidContract(ICOTokenContract), 'isValidContract returned false on correct contract');
	})

	it('should return false on contract without name', () => {
		delete contractCopy.contractName;
		assert(!isValidContract(contractCopy), 'isValidContract did not return false on contract without name')
	})

	it('should return false on contract without abi', () => {
		delete contractCopy.abi;
		assert(!isValidContract(contractCopy), 'isValidContract did not return false on contract without abi')
	})

	it('should return false on contract without bytecode', () => {
		delete contractCopy.bytecode;
		assert(!isValidContract(contractCopy), 'isValidContract did not return false on contract without bytecode')
	})

	it('should return true if it is a valid bytecode', () => {
		assert(isValidBytecode(ICOTokenContract.bytecode), 'isValidBytecode did not return true on contract with valid bytecode')
	});

	it('should return false if bytecode is not a string', () => {
		assert(!isValidBytecode(100), 'isValidBytecode did not return false on contract with invalid bytecode')
	});

	it('should return false if bytecode length is equal to zero (empty string)', () => {
		assert(!isValidBytecode(''), 'isValidBytecode did not return false on contract with invalid bytecode')
	});
});