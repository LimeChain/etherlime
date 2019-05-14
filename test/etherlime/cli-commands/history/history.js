const assert = require('chai').assert;
let etherlime = require('./../../../../packages/etherlime/index');
let chai = require("chai");
let chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const sinon = require('sinon');
const history = require('../../../../packages/etherlime/cli-commands/history/history');
const logger = require('../../../../packages/etherlime/logger-service/logger-service').logger;
const Greetings = require('../../../testContracts/Greetings.json');

describe('History cli command', () => {

    before(async function() {
        let deployer = new etherlime.EtherlimeGanacheDeployer();
        await deployer.deploy(Greetings)
    })

    it('should show history with no parameters', async function() {
        await assert.isFulfilled(history.run(), 'It was not successfully executed');
    });

    it('should show history with specific number of records', async function() {
        let loggerSpy = sinon.spy(logger, "log");
        await history.run(1);
        sinon.assert.callCount(loggerSpy, 1);
        loggerSpy.restore()
    });

    it('should print report table', async function() {
        let loggerSpy = sinon.spy(logger, "log");
        await history.run(1, "normal");
        sinon.assert.callCount(loggerSpy, 2);
        loggerSpy.restore()
    });

});