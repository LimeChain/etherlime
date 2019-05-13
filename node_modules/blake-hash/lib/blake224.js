'use strict'
var inherits = require('inherits')
var Blake256 = require('./blake256')

var zo = new Buffer([0x00])
var oo = new Buffer([0x80])

function Blake224 () {
  Blake256.call(this)

  this._h = [
    0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939,
    0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4
  ]

  this._zo = zo
  this._oo = oo
}

inherits(Blake224, Blake256)

Blake224.prototype.digest = function () {
  this._padding()

  var buffer = new Buffer(28)
  for (var i = 0; i < 7; ++i) buffer.writeUInt32BE(this._h[i], i * 4)
  return buffer
}

module.exports = Blake224
