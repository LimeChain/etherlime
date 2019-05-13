const etherlime = require('etherlime');
const ethers = require('ethers');
const LimeFactory = require('../build/LimeFactory.json');


describe('Example', () => {
    let aliceAccount = accounts[3];
    let deployer;
    let limeFactoryInstance;

    before(async () => {
        deployer = new etherlime.EtherlimeGanacheDeployer(aliceAccount.secretKey);
        limeFactoryInstance = await deployer.deploy(LimeFactory);
    });

    it('should have valid private key', async () => {
        assert.strictEqual(deployer.signer.privateKey, aliceAccount.secretKey);
    });

    it('should be valid address', async () => {
        assert.isAddress(limeFactoryInstance.contractAddress, "The contract was not deployed");
    })

    it('should create lime', async () => {
        const createTransaction = await limeFactoryInstance.createLime("newLime", 6, 8, 2);
        let lime = await limeFactoryInstance.limes(0);
        assert.equal(lime.name, 'newLime', '"newLime" was not created');
    });

    it('should revert if try to create lime with 0 carbohydrates', async () => {
        let carbohydrates = 0;
        await assert.revert(limeFactoryInstance.createLime("newLime2", carbohydrates, 8, 2), "Carbohydrates are not set to 0");
    });

    it('should create lime from another account', async () => {
        let bobsAccount = accounts[4].signer;
        const transaction = await limeFactoryInstance.from(bobsAccount /* Could be address or just index in accounts like 4 */).createLime("newLime3", 6, 8, 2);
        // check sender
        assert.equal(transaction.from, bobsAccount.address, "The account that created lime was not bobs");

        //check created lime
        let lime = await limeFactoryInstance.limes(1);
        assert.equal(lime.name, 'newLime3', '"newLime3" was not created');
    })

    it('should emit event on lime created', async () => {
        let expectedEvent = 'FreshLime';
        const createTransaction = await limeFactoryInstance.contract.createLime("newLime4", 5, 8, 2);
        const transactionReceipt = await limeFactoryInstance.verboseWaitForTransaction(createTransaction);
        // check for event
        let isEmitted = utils.hasEvent(transactionReceipt, limeFactoryInstance.contract, expectedEvent);
        assert(isEmitted, 'Event FreshLime was not emitted');

        // parse logs
        let logs = utils.parseLogs(transactionReceipt, limeFactoryInstance.contract, expectedEvent);
        assert.equal(logs[0].name, "newLime4", '"newLime4" was not created');
    });
});