var colors = require("colors");
var EtherlimeError = require("./../etherlime-error");
var inherits = require("util").inherits;

inherits(CompileError, EtherlimeError);

function CompileError(message) {
  let trimmedMessage = message.trim();
  let errorMessage = colors.red("Compilation failed. See above.");

  var fancy_message = `${trimmedMessage}\n${errorMessage}`;
  var normal_message = message.trim();

  CompileError.super_.call(this, normal_message);
  this.message = fancy_message;
};

module.exports = CompileError;
