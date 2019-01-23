import debugModule from "debug";

const ethers = require('ethers');

const debug = debugModule("debugger:ethersJS:adapter");

export default class EthersJSAdapter {
  constructor(provider) {
    this.ethersProvider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
  }

  async getEthersTrace(txHash) {

    const result = await this.ethersProvider.send('debug_traceTransaction', [txHash, {}]);
    debug("result: %o", result);
    return result.structLogs;
  }

  async getEthersTransaction(txHash) {
    const result = await this.ethersProvider.getTransaction(txHash);
    return result;
  }

  async getEthersReceipt(txHash) {
    const result = await this.ethersProvider.getTransactionReceipt(txHash);
    return result;
  }

  /**
   * getDeployedCode - get the deployed code for an address from the client
   * @param  {String} address
   * @return {String}         deployedBinary
   */

  async getEthersDeployedCode(address) {
    debug("getting deployed code for %s", address);
    const result = await this.ethersProvider.getCode(address);
    debug("got deployed code for %s", address);
    return result;
  }
}
