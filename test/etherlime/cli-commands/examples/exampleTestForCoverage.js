const exampleTestForCoverage = `const assert = require('chai').assert;
const fs = require('fs-extra');

const etherlime = require('../../../packages/etherlime-lib/index.js');
const LimeFactory = require('../../../test/testContracts/LimeFactory.json')

describe('Lime Factory example', function () {

    let accountFour = accounts[3];
    let deployer;
    let limeFactoryInstance;

    beforeEach(async function () {
        deployer = new etherlime.EtherlimeGanacheDeployer(accountFour.secretKey);
        limeFactoryInstance = await deployer.deploy(LimeFactory)
    });

    it('should create lime', async () =>  {
        await limeFactoryInstance.contract.createLime("newLime", 6, 8, 2)
        let lime = await limeFactoryInstance.contract.limes(0);
        assert.equal(lime.name, 'newLime');
    })
});
`
module.exports = {
    exampleTestForCoverage
}

