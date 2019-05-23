var ethers = require("ethers");

module.exports = function (chai, utils) {
  var assert = chai.assert;
  chai.Assertion.addProperty('address', function () {
    this.assert(this._obj.length === 42, 'expected #{this} to be a 42 character address (0x...)', 'expected #{this} to not be a 42 character address (0x...)');

    var number = ethers.utils.bigNumberify(this._obj);
    this.assert(number.eq(0) === false, 'expected address #{this} to not be zero', 'you shouldn\'t ever see this.');
  });

  chai.Assertion.addProperty('privateKey', function () {
    this.assert(this._obj.length === 66, 'expected #{this} to be a 66 character private key (0x...)', 'expected #{this} to not be a 66 character private key (0x...)');

    let number = ethers.utils.bigNumberify(this._obj);
    this.assert(number.eq(0) === false, 'expected private key #{this} to not be zero', 'expected private key #{this} to be zero.');
  })

  chai.Assertion.addProperty('hash', function () {
    this.assert(/^0x([A-Fa-f0-9]{64})$/.test(this._obj), 'Expected hash #{this} to be valid hex string', 'expected hash #{this} to not be a valid hex string.')
  })

  assert.isAddress = function (val, exp, msg) {
    return new chai.Assertion(val, msg).to.be.address;
  };

  assert.isPrivateKey = function (val, exp, msg) {
    return new chai.Assertion(val, msg).to.be.privateKey;
  }

  assert.isHash = function (val, exp, msg) {
    return new chai.Assertion(val, msg).to.be.hash;
  }

  assert.revert = async (promise, msg) => {
    try {
      let result = await promise;
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

  assert.emit = async (promise, expectedEvent) => {
    let transaction = await promise;
    let txReceipt = await transaction.wait()
    assert.isDefined(txReceipt.events.find(emittedEvent => emittedEvent.event === expectedEvent, `Expected event ${expectedEvent} was not emitted.`));
  }

  assert.emitWithArgs = async (promise, arguments) => {
    let transaction = await promise;
    let txReceipt = await transaction.wait()
    let eventName = txReceipt.events[0].event;
    let log = txReceipt.events[0].args
    let argsLogged = [];
  
    for(let i = 0; i < log.length; i++) {
      argsLogged.push(log[i])
    }

    assert.equal(argsLogged.toString(), arguments.toString(), `Event ${eventName} was not emitted with expected arguments ${arguments}.`);
    
  }

};