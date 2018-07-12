var inherits = require("util").inherits;
var EtherlimeError = require("./../etherlime-error");

var NOT_CONNECTED_MESSAGE = 'Invalid JSON RPC response: ""';

function ProviderError(message, error) {
  if (message == NOT_CONNECTED_MESSAGE) {
    message = "Could not connect to your Ethereum client. " +
      "Please check that your Ethereum client:\n" +
      "    - is running\n" +
      "    - is accepting RPC connections (i.e., \"--rpc\" option is used in geth)\n" +
      "    - is accessible over the network\n" +
      "    - is properly configured in your Etherlime configuration file (etherlime.js)\n";
  }

  ProviderError.super_.call(this, message);
  this.message = message;
}

inherits(ProviderError, EtherlimeError);

module.exports = ProviderError;
