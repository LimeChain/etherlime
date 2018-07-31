const etherlime = require('etherlime');

describe('Example', () => {
    let accountFour = accounts[3];
    let deployer;

    beforeEach(async () => {
        deployer = new etherlime.EtherlimeGanacheDeployer();
        deployer.defaultOverrides = { gasLimit: 4700000 };
    });

    it('should have valid values', () => {
        let privateKey = 0xf473040b1a83739a9c7cc1f5719fab0f5bf178f83314d98557c58aae1910e03a;
        let balance = 0x90000000000000000000000000000000;

        assert.deepEqual(privateKey, accountFour.secretKey);
        assert.deepEqual(balance, accountFour.balance);
    });
});