const colors = require("colors");
const EtherlimeError = require("./../etherlime-error");
const inherits = require("util").inherits;

inherits(CompileError, EtherlimeError);

function CompileError(message) {
  let trimmedMessage = message.trim();
  let errorMessage = colors.red("Compilation failed. See above.");

  let fancy_message = `${trimmedMessage}\n${errorMessage}`;
  let normal_message = message.trim();

  CompileError.super_.call(this, normal_message);
  this.message = fancy_message;
};

module.exports = CompileError;
