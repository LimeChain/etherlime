const colors = require("colors");
const EtherlimeError = require("./../etherlime-error");

class CompileError extends EtherlimeError {
  constructor(message) {
    let trimmedMessage = message.trim();
    let errorMessage = colors.red("Compilation failed. See above.");

    let fancy_message = `${trimmedMessage}\n${errorMessage}`;
    let normal_message = message.trim();
    super(normal_message);
    this.message = fancy_message;
  }
}

module.exports = CompileError;
