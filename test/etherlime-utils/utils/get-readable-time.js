const assert = require('assert');
const getReadableTime = require('./../../../packages/etherlime-utils/utils/get-readable-time').getReadableTime;

describe('Get Readable Time utils tests', () => {

	it('should return true on correct address', () => {
		const convertedTime = getReadableTime(1559201699000);
		assert.ok(convertedTime);
	})
});