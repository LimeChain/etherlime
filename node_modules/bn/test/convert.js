/*******************************
 * TESTS for conversion methods
 *******************************/

var assert = require('assert')
var BigInteger = require('../').BigInteger
var fixtures = require('./fixtures/convert')

describe('Convert', function() {
  describe('fromByteArrayUnsigned', function() {
    it('should match the test vectors', function() {
      fixtures.valid.forEach(function(f) {
        var byteArray = Array.prototype.slice.call(Buffer.from(f.hex, 'hex'))

        assert.equal(BigInteger.fromByteArrayUnsigned(byteArray).toString(), f.decp)
      })
    })
  })

  describe('fromBuffer', function() {
    it('should match the test vectors', function() {
      fixtures.valid.forEach(function(f) {
        var buffer = Buffer.from(f.hex, 'hex')
        var bufferPadded = Buffer.from(f.hexPadded, 'hex')

        assert.equal(BigInteger.fromBuffer(buffer).toString(), f.decp)
        assert.equal(BigInteger.fromBuffer(bufferPadded).toString(), f.decp)
      })
    })
  })

  describe('fromHex', function() {
    it('should match the test vectors', function() {
      fixtures.valid.forEach(function(f) {
        assert.equal(BigInteger.fromHex(f.hex).toString(), f.decp)
        assert.equal(BigInteger.fromHex(f.hexPadded).toString(), f.decp)
      })
    })

    fixtures.invalid.forEach(function(f) {
      it('throws on ' + f.description, function() {
        assert.throws(function() {
          BigInteger.fromHex(f.string)
        })
      })
    })
  })

  describe('toByteArrayUnsigned', function() {
    it('should match the test vectors', function() {
      fixtures.valid.forEach(function(f) {
        var byteArray = BigInteger.fromHex(f.hex).toByteArrayUnsigned()
        var hex = Buffer.from(byteArray).toString('hex')

        assert.equal(hex, f.hex)
      })
    })
  })

  describe('toBuffer/toHex', function() {
    it('should match the test vectors', function() {
      fixtures.valid.forEach(function(f) {
        var bi = new BigInteger(f.dec)
        assert.equal(bi.toHex(), f.hex)
        assert.equal(bi.toHex(32), f.hexPadded)
      })
    })
  })

  describe('fromDERInteger', function() {
    it('should match the test vectors', function() {
      fixtures.valid.forEach(function(f) {
        var bi = BigInteger.fromDERInteger(Buffer.from(f.DER, 'hex'))

        assert.equal(bi.toString(), f.dec)
      })
    })
  })

  describe('toDERInteger', function() {
    it('should match the test vectors', function() {
      fixtures.valid.forEach(function(f) {
        var bi = new BigInteger(f.dec)
        var ba = Buffer.from(bi.toDERInteger())

        assert.equal(ba.toString('hex'), f.DER)
      })
    })
  })
})
