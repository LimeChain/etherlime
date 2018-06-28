const assert = require('assert');

const isValidContract = require('./../../utils/contract-utils').isValidContract;
const ICOTokenContract = require('./../testContracts/ICOToken.json');

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


});