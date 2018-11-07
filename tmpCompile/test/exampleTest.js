const etherlime = require('etherlime');

describe('Example', () => {
    let accountFour = accounts[3];
    let deployer;

    beforeEach(async () => {
        deployer = new etherlime.EtherlimeGanacheDeployer(accountFour.secretKey);
    });

    it('should have valid private key', async () => {
        assert.strictEqual(deployer.wallet.privateKey, accountFour.secretKey);
    });
});