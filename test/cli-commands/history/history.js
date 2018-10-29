const assert = require('chai').assert;
let etherlime = require('./../../../index.js');
let chai = require("chai");
let chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const sinon = require('sinon');
const fs = require('fs-extra');
const clearRequire = require('clear-require');

const history = require('../../../cli-commands/history/history');
// const deployer = require('../../../cli-commands/deployer/deployer');
const logger = require('../../../logger-service/logger-service').logger;
const specificFile = 'test/cli-commands/deploy/testDeploy.js';
const Greetings = require('../../testContracts/Greetings.json');
//limit, output

let deployer;

describe('History cli dommand', () => {

    it('should show history with no parameters', async function() {
        deployer = new etherlime.EtherlimeGanacheDeployer();
        await deployer.deploy(Greetings);
        await history.run(4);
        await assert.isFulfilled(history.run(), 'It was not successfully executed');
    });

    it('should show history with specific number of historical records', async function() {
        deployer = new etherlime.EtherlimeGanacheDeployer();
        await deployer.deploy(Greetings);
        await history.run(4);
        
    });

    afterEach(async function () {
        await fs.removeSync('./.etherlime-store')
        await fs.removeSync('./.etherlime-store/.history.json');
        deployer = 0;
        
    });


});