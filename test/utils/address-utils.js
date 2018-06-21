const isAddress = require('../../utils/address-utils').isAddress;
const config = require('../config.json');
const assert = require('assert');

describe('Address utils tests', () => {


	it('should return true on correct address', () => {
		assert.ok(isAddress(config.randomAddress), 'isAddress returned false on correct address');
	})

	it('should return false on number', () => {
		assert(!isAddress(69), 'isAddress did not return false on number param')
	})

	it('should return false on not correct string', () => {
		assert(!isAddress('incorr3ctstr1ng'), 'isAddress did not return false on incorrect address')
	})


});