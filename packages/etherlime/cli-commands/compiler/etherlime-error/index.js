var ExtendableBuiltin = require("./extendablebuiltin");

class ExtendableError extends ExtendableBuiltin(Error) {
  constructor(message) {
    super();
    this.message = message;
    this.stack = (new Error(message)).stack;
    this.name = this.constructor.name;
  }

  formatForMocha() {
    this.message = this.message.replace(/\n/g, "\n     ");
  };
}

module.exports = ExtendableError;
