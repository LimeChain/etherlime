const ethers = require("ethers");
const ADDRESS_LENGTH = 42;
const PRIVATE_KEY_LENGTH = 66;

const addPropertyAddress = function (chai) {
    chai.Assertion.addProperty('address', function () {
        this.assert(this._obj.length === ADDRESS_LENGTH, 'Expected #{this} to be a 42 character address (0x...)', 'Expected #{this} to not be a 42 character address (0x...)');
    
        var number = ethers.utils.bigNumberify(this._obj);
        this.assert(number.eq(0) === false, 'Expected address #{this} to not be zero', 'you shouldn\'t ever see this.');
      });
}

const addPropertyPrivateKey = function (chai) {
    chai.Assertion.addProperty('privateKey', function () {
        this.assert(this._obj.length === PRIVATE_KEY_LENGTH, 'Expected #{this} to be a 66 character private key (0x...)', 'Expected #{this} to not be a 66 character private key (0x...)');
    
        let number = ethers.utils.bigNumberify(this._obj);
        this.assert(number.eq(0) === false, 'Expected private key #{this} to not be zero', 'Expected private key #{this} to be zero.');
      })
}

const addPropertyHash = function (chai) {
    chai.Assertion.addProperty('hash', function () {
        this.assert(/^0x([A-Fa-f0-9]{64})$/.test(this._obj), 'Expected hash #{this} to be valid hex string', 'Expected hash #{this} to not be a valid hex string.')
      })
}

const addMethodChangeBalance = function (chai, account, value) {
    chai.Assertion.addMethod('changeBalance', async function (account, value) {
        let promise = this._obj;
        let balanceDiff = await getBalanceChange(promise, account);
        this.assert(balanceDiff.eq(ethers.utils.bigNumberify(value)), `Expected the balance of "${account.address}" to be changed by ${value} wei, but it has been changed by ${balanceDiff} wei`,
          `Expected the balance of "${account.address}" to not be changed by ${value} wei,`)
      })
}

const addMethodChangeBalances = function (chai, accounts, values) {
    chai.Assertion.addMethod('changeBalances', async function (accounts, values) {
        let promise = this._obj;
        let accountAddresses = accounts.map((account) => account.address);
        let balancesDiff = await getBalancesChanges(promise, accounts);
    
        this.assert(balancesDiff.every((diff, index) => diff.eq(ethers.utils.bigNumberify(values[index]))), `Expected the balance of "${accountAddresses}" to be changed by ${values} wei, but it has been changed by ${balancesDiff} wei`,
          `Expected the balance of "${accountAddresses}" to not be changed by ${values} wei,`)
      })
}

const getBalanceChange = async function (promise, account) {
    let balanceBefore = await account.getBalance();
    let { transaction, txReceipt } = await executeTransaction(promise)
    let gasUsed = txReceipt.gasUsed.mul(transaction.gasPrice) // calculates the gas costs the user paid for the transaction
    let balanceAfter = await account.getBalance();
    let difference = balanceAfter.sub(balanceBefore); // find the balance difference after the transaction
    // to get the right balance change the gas costs for the transaction should be divided
    // because the difference is negative number we must 'add' gas costs in order to actually dived them :)
    return difference.add(gasUsed)
}
  
  
const getBalancesChanges = async function (promise, accounts) {
    const balancesBefore = await Promise.all(accounts.map((account) => account.getBalance()));
    let { transaction, txReceipt } = await executeTransaction(promise)
    let gasUsed = txReceipt.gasUsed.mul(transaction.gasPrice) // calculates the gas costs the user paid for the transaction
    let balancesAfter = await Promise.all(accounts.map((account) => account.getBalance()));

    let difference = balancesAfter.map((balance, ind) => balance.sub(balancesBefore[ind])); // find the balance differences after the transaction
    // to get the right balance change the gas costs for the transaction should be divided from the first account, i.e. those who made the transaction
    // because the difference is negative number we must 'add' gas costs in order to actually dived them :)
    difference[0] = difference[0].add(gasUsed) 
    return difference
}

const executeTransaction = async function (promise) {
    let transaction = await promise;
    let txReceipt = await transaction.wait()
    return { transaction, txReceipt }
}

module.exports = {
    addPropertyAddress,
    addPropertyPrivateKey,
    addPropertyHash,
    addMethodChangeBalance,
    addMethodChangeBalances,
    executeTransaction
}