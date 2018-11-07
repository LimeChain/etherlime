const etherlime = require('../../index.js');
const LimeFactory = require('../../test/testContracts/LimeFactory.json')
const fs = require('fs-extra');

describe('Lime Factory example', function () {

    let accountFour = accounts[3];
    let deployer;
    let limeFactoryInstance;

    beforeEach(async function () {
        deployer = new etherlime.EtherlimeGanacheDeployer(accountFour.secretKey);
        limeFactoryInstance = await deployer.deploy(LimeFactory)
    });

    it('should create lime', async () =>  {
        await limeFactoryInstance.contract.createLime("limeDessy", 6, 8, 2)
        let lime = await limeFactoryInstance.contract.limes(0);
        assert.equal(lime.name, 'limeDessy');
    });
});
