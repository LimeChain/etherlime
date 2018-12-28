const etherlime = require('etherlime');
const ethers = require('ethers');
const LimeFactory = require('../build/LimeFactory.json');


describe('Example', () => {
    let accountFour = accounts[3];
    let deployer;
    let limeFactoryInstance;

    before(async () => {
        deployer = new etherlime.EtherlimeGanacheDeployer(accountFour.secretKey);
        limeFactoryInstance = await deployer.deploy(LimeFactory);
    });

    it('should have valid private key', async () => {
        assert.strictEqual(deployer.wallet.privateKey, accountFour.secretKey);
    });

    it('should be valid address', async() => {
        assert.isAddress(limeFactoryInstance.contractAddress);
    })

    it('should create lime', async () =>  {
        const createTransaction = await limeFactoryInstance.contract.createLime("newLime", 6, 8, 2);
        let lime = await limeFactoryInstance.contract.limes(0);
        assert.equal(lime.name, 'newLime');
    });

    it('should revert if try to create lime with 0 carbohydrates', async() => {
        let carbohydrates = 0;
        await assert.revert(limeFactoryInstance.contract.createLime("newLime2", carbohydrates, 8, 2));
    });

    it('should create lime from another account', async () => {
        let newAccount = accounts[4];
        let newAccountWallet = new ethers.Wallet(newAccount.secretKey, deployer.provider);
        let contractInstance = new ethers.Contract(limeFactoryInstance.contractAddress, LimeFactory.abi, newAccountWallet);
        const transaction = await contractInstance.createLime("newLime3", 6, 8, 2);
        // check sender
        assert.equal(transaction.from, newAccount.wallet.address);

        //check created lime
        let lime = await limeFactoryInstance.contract.limes(1);
        assert.equal(lime.name, 'newLime3');
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
        assert.equal(logs[0].name, "newLime4", "New lime should be created");
    });
});