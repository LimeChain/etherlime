'use strict'
var Transform = require('stream').Transform
var inherits = require('inherits')

function Blake (engine, options) {
  Transform.call(this, options)

  this._engine = engine
  this._finalized = false
}

inherits(Blake, Transform)

Blake.prototype._transform = function (chunk, encoding, callback) {
  var error = null
  try {
    this.update(chunk, encoding)
  } catch (err) {
    error = err
  }

  callback(error)
}

Blake.prototype._flush = function (callback) {
  var error = null
  try {
    this.push(this.digest())
  } catch (err) {
    error = err
  }

  callback(error)
}

Blake.prototype.update = function (data, encoding) {
  if (!Buffer.isBuffer(data) && typeof data !== 'string') throw new TypeError('Data must be a string or a buffer')
  if (this._finalized) throw new Error('Digest already called')
  if (!Buffer.isBuffer(data)) data = new Buffer(data, encoding)

  this._engine.update(data)

  return this
}

Blake.prototype.digest = function (encoding) {
  if (this._finalized) throw new Error('Digest already called')
  this._finalized = true

  var digest = this._engine.digest()
  if (encoding !== undefined) digest = digest.toString(encoding)

  return digest
}

module.exports = Blake
