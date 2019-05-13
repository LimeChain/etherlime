'use strict'
var inherits = require('inherits')
var Blake512 = require('./blake512')

var zo = new Buffer([0x00])
var oo = new Buffer([0x80])

function Blake384 () {
  Blake512.call(this)

  this._h = [
    0xcbbb9d5d, 0xc1059ed8, 0x629a292a, 0x367cd507,
    0x9159015a, 0x3070dd17, 0x152fecd8, 0xf70e5939,
    0x67332667, 0xffc00b31, 0x8eb44a87, 0x68581511,
    0xdb0c2e0d, 0x64f98fa7, 0x47b5481d, 0xbefa4fa4
  ]

  this._zo = zo
  this._oo = oo
}

inherits(Blake384, Blake512)

Blake384.prototype.digest = function () {
  this._padding()

  var buffer = new Buffer(48)
  for (var i = 0; i < 12; ++i) buffer.writeUInt32BE(this._h[i], i * 4)
  return buffer
}

module.exports = Blake384
