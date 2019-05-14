const isUrl = require('./../../../packages/etherlime-utils/utils/url-utils').isUrl;
const config = require('./../../config.json');
const assert = require('assert');

describe('Url utils tests', () => {


	it('should return true on valid url address', () => {
		assert.ok(isUrl(config.nodeUrl), 'isUrl returned false on valid url address');
	})

	it('should return false on number instead of url', () => {
		assert(!isUrl(69), 'isUrl did not return false on number param')
	})

});