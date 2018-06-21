const isUrl = require('../../utils/url-utils').isUrl;
const config = require('../config.json');
const assert = require('assert');

describe('Address utils tests', () => {


	it('should return true on valid url address', () => {
		assert.ok(isUrl(config.nodeUrl), 'isUrl returned false on valid url address');
	})

	it('should return false on number', () => {
		assert(!isUrl(69), 'isUrl did not return false on number param')
	})

});