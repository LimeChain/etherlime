var ExtendableBuiltin = require("./extendablebuiltin");
var inherits = require("util").inherits;

inherits(ExtendableError, ExtendableBuiltin(Error));

function ExtendableError(message) {
  ExtendableError.super_.call(this);
  this.message = message;
  this.stack = (new Error(message)).stack;
  this.name = this.constructor.name;
};

ExtendableError.prototype.formatForMocha = function () {
  this.message = this.message.replace(/\n/g, "\n     ");
};

module.exports = ExtendableError;
