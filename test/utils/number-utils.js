const isNumber = require('../../utils/number-utils').isNumber;
const assert = require('assert');

describe('Number utils tests', () => {


	it('should return true on valid number', () => {
		assert.ok(isNumber(69), 'isNumber returned false on valid number');
	})

	it('should return false on string instead of number', () => {
		assert(!isNumber('69'), 'isNumber did not return false on string param')
	})

});