const assert = require('chai').assert;
let chai = require("chai");
chai.use(require('../../../../packages/etherlime/cli-commands/etherlime-test/assertions'));
const ethers = require('ethers')
let etherlime = require('./../../../../packages/etherlime-lib/dist/index');
const Billboard = require('../../../testContracts/Billboard.json');
const config = require('../../../config.json')

describe('etherlime test assertions', () => { 

    let billboardContract;
    let deployer;
    let address = ethers.utils.getAddress(config.firstEtherlimeGanacheAccount)
    let privateKey = config.localPrivateKey
    let txHash = config.randomTxHash
    let oneEther = ethers.utils.parseEther('1000000000000000000')
    let slogan = 'I am the best'

    before(async function() {
        deployer = new etherlime.EtherlimeGanacheDeployer();
        billboardContract = await deployer.deploy(Billboard)
    })

    it('should assert a value is an address', function () {
        assert.isAddress(billboardContract.contractAddress)
    })

    it('should assert a value is a private key', function () {
        assert.isPrivateKey(privateKey)
    })

    it('should assert a value is a valid transaction hash', function () {
        assert.isHash(txHash)
    })

    it('should revert if a transaction failed', async function () {
        await assert.revert(billboardContract.buy(slogan)) // it reverts because buy functions is payable
    })

    it('should revert with expected revert message', async function () {
        let expectedRevertMessage = "The ether sent was too low"
        await assert.revertWith(billboardContract.buy(slogan, {value: 0}), expectedRevertMessage)
    })

    it('should assert that function was executed successfully', async function () {
        await assert.notRevert(billboardContract.buy(slogan, {value: oneEther}))
    })

    it('should assert that event was emitted', async function () {
        let expectedEvent = 'LogBillboardBought'
        await assert.emit(billboardContract.buy(slogan, {value: oneEther}), expectedEvent)
    })

    it('should assert that event was emitted with certain arguments', async function () {
        let expectedEvent = 'LogBillboardBought'
        let expectedArgs = [address, oneEther , slogan]
        await assert.emitWithArgs(billboardContract.buy(slogan, {value: oneEther}), expectedEvent, expectedArgs)
    })

    it('should assert a balance has been changed after a function is executed', async function () {
        let wallet = new ethers.Wallet(privateKey, deployer.provider)
        await assert.balanceChanged(billboardContract.buy(slogan, {value: oneEther}), wallet, `-${oneEther}`) //value must be negative
    })

    it('should assert multiple balances has been changed after a function execution', async function () {
        let sender = new ethers.Wallet(privateKey, deployer.provider)
        let receiver = new ethers.Wallet(config.secondLocalPrivateKey, deployer.provider)

        await assert.balancesChanged(sender.sendTransaction( {
            to: receiver.address,
            value: 20000
        }), [sender, receiver], ['-20000', 20000])
    })
})