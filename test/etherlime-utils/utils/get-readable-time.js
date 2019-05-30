const assert = require('assert');
const getReadableTime = require('./../../../packages/etherlime-utils/utils/get-readable-time').getReadableTime;

describe('Get Readable Time utils tests', () => {
	const currentTime = '30 May, 10:34:59'

	it('should return true on correct address', () => {
		const convertedTime = getReadableTime(1559201699000);
		assert.strictEqual(currentTime, convertedTime, 'Converted dates are not equal')

	})
});