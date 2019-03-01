const exampleTestWithFailingTest = `const etherlime = require('../../index.js');
const LimeFactory = require('../../test/testContracts/LimeFactory.json')

describe('Lime Factory example', function () {

    let accountFour = accounts[3];
    let deployer;
    let limeFactoryInstance;

    before(async function () {
        deployer = new etherlime.EtherlimeGanacheDeployer(accountFour.secretKey);
        limeFactoryInstance = await deployer.deploy(LimeFactory)
    });

    it('should be a pending test');

    it('should create lime', async () =>  {
        const createTransaction = await limeFactoryInstance.contract.createLime("newLime", 6, 8, 2)
        let lime = await limeFactoryInstance.contract.limes(0);
        assert.equal(lime.name, 'newLime');
        assert.isTrue(false);
    });

    it('should revert', async () => {
        await assert.revert(limeFactoryInstance.contract.createLime("newLime", 0, 8, 2))
    });

    it('should reject revert', async () => {
        let result;
        try {
            await assert.revert(limeFactoryInstance.contract.createLime("newLime", 5, 8, 2))
        } catch(error){
            result = error.message
        }
        
       assert.equal(result, "assert.fail()")
    });

    it('should emit event', async () => {
        await utils.timeTravel(deployer.provider, 60000000)
        const createTransaction = await limeFactoryInstance.contract.createLime("newLime", 5, 8, 2);
        const transactionReceipt = await limeFactoryInstance.verboseWaitForTransaction(createTransaction);
        let logs = utils.parseLogs(transactionReceipt, limeFactoryInstance.contract, 'FreshLime')
        assert(logs.length > 0, "No event was thrown")
        assert.isTrue(false);
        let event = utils.hasEvent(transactionReceipt, limeFactoryInstance.contract, 'FreshLime')
        assert.isTrue(false);
    });

    it('should fail with error', async () => {
        assert.isTrue(false);
    });

    it('should time travel', async () => {
        let latestTimestamp = await utils.latestTimestamp(deployer.provider);
        let timeStamp = latestTimestamp + 600000
        await utils.setTimeTo(deployer.provider, timeStamp)
    });

    it('should throw err if try to set time with less timestamp', async() => {
        let timeStamp = 17274372
        let result;
        try{
            await utils.setTimeTo(deployer.provider, timeStamp)
        }catch(e){
            result = e.message
        }
        
        assert.include(result, "cannot decrease time")
    });


});`

module.exports = {
    exampleTestWithFailingTest
}