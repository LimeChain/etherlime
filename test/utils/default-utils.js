const setPrivateKey = require('./../../utils/default-utils').setPrivateKey;
const config = require('./../config.json');
const assert = require('assert');

describe('Default utils tests', () => {

    it('should return default private key', () => {
        assert.ok(setPrivateKey(), 'setPrivate key returns 7ab741b57e8d94dd7e1a29055646bafde7010f38a900f55bbd7647880faa6ee8')
    })
});