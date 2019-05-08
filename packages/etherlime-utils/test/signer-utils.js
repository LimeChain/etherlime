const isSigner = require('./../utils/signer-utils').isSigner;
const assert = require('assert');


describe('Signer utils tests', () => {


	it('should return true on valid signer', () => {
        let signer = { signMessage: function() {}, getAddress: function() {}}
		assert.ok(isSigner(signer), 'isSigner returned false on valid signer');
    })
    
    it('should return false on not valid signer object', () => {
        let signer = "signMessage: function() {}, getAddress: function() {}"
		assert(!isSigner(signer), 'isSigner did not return false on string signer')
	})

	it('should return false on signer without signMessage function', () => {
        let signer = {signMessage: "function() {}", getAddress: function() {}}
		assert(!isSigner(signer), 'isSigner did not return false on signer without signMessage function')
    })
    
    it('should return false on signer without getAddress function', () => {
        let signer = {signMessage: function() {}, getAddress: "function() {}"}
		assert(!isSigner(signer), 'isSigner did not return false on signer without getAddress function')
	})

});