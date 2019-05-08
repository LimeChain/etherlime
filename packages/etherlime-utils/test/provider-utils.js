const isProvider = require('./../utils/provider-utils').isProvider;
const assert = require('assert');


describe('Provider utils tests', () => {


	it('should return true on valid provider', () => {
        let provider = { send: function() {}}
		assert.ok(isProvider(provider), 'isProvider returned false on valid number');
    })
    
    it('should return false on not valid provider object', () => {
        let provider = "send: function() {}"
		assert(!isProvider(provider), 'isProvider did not return false on string provider')
	})

	it('should return false on provider without send function', () => {
        let provider = { send: "function"}
		assert(!isProvider(provider), 'isProvider did not return false on provider without send function')
	})

});