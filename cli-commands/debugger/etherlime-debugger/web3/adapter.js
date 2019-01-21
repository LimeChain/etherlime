import debugModule from "debug";

const Web3 = require('web3');
const ethers = require('ethers');

const debug = debugModule("debugger:ethersJS:adapter");

// export default class Web3Adapter {
//   constructor(provider) {
//     this.web3 = new Web3(provider);
//     this.ethersProvider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
//     // console.log('HERE TEST', this.test);
//   }

//   async getTrace(txHash) {
//     return new Promise((accept, reject) => {
//       this.web3.currentProvider.send({
//         jsonrpc: "2.0",
//         method: "debug_traceTransaction",
//         params: [txHash, {}],
//         id: new Date().getTime()
//       }, (err, result) => {
//         if (err) return reject(err);
//         if (result.error) return reject(new Error(result.error.message));
//         debug("result: %o", result);
//         // console.log('RESULT', JSON.stringify(result.result.structLogs, undefined, 2));
//         accept(result.result.structLogs);
//       });
//     });
//   };

//   async getEthersTrace(txHash) {

//     const result = await this.ethersProvider.send('debug_traceTransaction', [txHash, {}]);
//     debug("result: %o", result);
//     return result.structLogs;
//   }

//   async getTransaction(txHash) {
//     return new Promise((accept, reject) => {
//       this.web3.eth.getTransaction(txHash, (err, tx) => {
//         if (err) return reject(err);
//         // console.log('TX', tx)
//         return accept(tx);
//       });
//     });
//   };


//   async getEthersTransaction(txHash) {
//     const result = await this.ethersProvider.getTransaction(txHash);
//     // console.log('TX2', result);
//     // return {
//     //   hash: result.hash,
//     //   nonce: result.nonce,
//     //   blockHash: result.blockNumber,
//     //   blockNumber: result.blockNumber,
//     //   transactionIndex: result.transactionIndex,
//     //   from: result.from,
//     //   to: result.to,
//     //   value: result.value.toNumber(),
//     //   gas: result.gasLimit.toNumber(),
//     //   gasPrice: result.gasPrice.toNumber(),
//     //   input: result.data
//     // }
//     return result;
//   }

//   async getReceipt(txHash) {
//     return new Promise((accept, reject) => {
//       this.web3.eth.getTransactionReceipt(txHash, (err, receipt) => {
//         if (err) return reject(err);

//         return accept(receipt);
//       });
//     });
//   };


//   async getEthersReceipt(txHash) {
//     const result = await this.ethersProvider.getTransactionReceipt(txHash);
//     return result;
//   }

//   /**
//    * getDeployedCode - get the deployed code for an address from the client
//    * @param  {String} address
//    * @return {String}         deployedBinary
//    */
//   async getDeployedCode(address) {
//     debug("getting deployed code for %s", address);
//     return new Promise((accept, reject) => {
//       this.web3.eth.getCode(address, (err, deployedBinary) => {
//         if (err) debug("error: %o", err);
//         if (err) return reject(err);
//         debug("got deployed code for %s", address);
//         accept(deployedBinary);
//       });
//     });
//   };


//   async getEthersDeployedCode(address) {
//     const result = await this.ethersProvider.getCode(address);
//     return result;
//   }
// }

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
