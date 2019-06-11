const {
  addPropertyAddress,
  addPropertyPrivateKey,
  addPropertyHash,
  addMethodChangeBalance,
  addMethodChangeBalances,
  executeTransaction
} = require('./assertion-utils');

module.exports = function (chai, utils) {
  var assert = chai.assert;

  assert.isAddress = function (val, exp, msg) {
    addPropertyAddress(chai);
    return new chai.Assertion(val, msg).to.be.address;
  };

  assert.isPrivateKey = function (val, exp, msg) {
    addPropertyPrivateKey(chai);
    return new chai.Assertion(val, msg).to.be.privateKey;
  }

  assert.isHash = function (val, exp, msg) {
    addPropertyHash(chai);
    return new chai.Assertion(val, msg).to.be.hash;
  }

  assert.revert = async (promise, msg) => {
    try {
      await promise;
    } catch (error) {
      const invalidJump = error.message.search('invalid JUMP') >= 0
      const invalidOpcode = error.message.search('invalid opcode') >= 0
      const outOfGas = error.message.search('out of gas') >= 0
      const revert = error.message.search('revert') >= 0
      assert(invalidJump || invalidOpcode || outOfGas || revert, msg ? `Expected throw, got ${error.message} instead. ${msg}` : `Expected throw, got ${error.message} instead`)
      return
    }
    assert.fail(msg ? msg : 'Expected throw not received')
  }

  assert.notRevert = async function (promise) {
    let errorMessage;
    let txReceipt;
    
    try {
      txReceipt = (await executeTransaction(promise)).txReceipt;
    } catch (e) {
      errorMessage = e.message
    }

    assert(!errorMessage, `Expected function to be fulfilled, but it reverted with ${errorMessage}`);
    assert(txReceipt.status === 1);
  }

  assert.emit = async (promise, expectedEvent) => {
    let {
      txReceipt
    } = await executeTransaction(promise)
    assert.isDefined(txReceipt.events.find(emittedEvent => emittedEvent.event === expectedEvent, `Expected event ${expectedEvent} was not emitted.`));
  }

  assert.emitWithArgs = async (promise, arguments) => {
    let {
      txReceipt
    } = await executeTransaction(promise)
    let eventName = txReceipt.events[0].event;
    let log = txReceipt.events[0].args;
    let argsLogged = [];

    for (let i = 0; i < log.length; i++) {
      argsLogged.push(log[i]);
    }

    assert.equal(argsLogged.toString(), arguments.toString(), `Event ${eventName} was not emitted with expected arguments ${arguments}.`);

  }

  assert.balanceChanged = async function (promise, account, value) {
    addMethodChangeBalance(chai, account, value);
    return new chai.Assertion(promise).to.be.changeBalance(account, value);
  }


  assert.balancesChanged = async function (promise, accounts, values) {
    addMethodChangeBalances(chai, accounts, values);
    return new chai.Assertion(promise).to.be.changeBalances(accounts, values);
  }


};