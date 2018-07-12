var colors = require("colors");
var EtherlimeError = require("./../etherlime-error");
var inherits = require("util").inherits;

inherits(CompileError, EtherlimeError);

function CompileError(message) {
  var fancy_message = message.trim() + "\n" + colors.red("Compilation failed. See above.");
  var normal_message = message.trim();

  CompileError.super_.call(this, normal_message);
  this.message = fancy_message;
};

module.exports = CompileError;
