const assert = require('chai').assert;
const timeTravel = require('../../../../packages/etherlime/cli-commands/etherlime-test/time-travel');
let etherlime = require('./../../../../packages/etherlime-lib/index');

describe('Time travel tests', () => { 

    let deployer;
    let seconds = 600000;

    before(async function() {
        deployer = new etherlime.EtherlimeGanacheDeployer();
    })

    it('should time travel', async () => {
        let timestampBefore = await timeTravel.latestTimestamp(deployer.provider)
        await timeTravel.timeTravel(deployer.provider, seconds)
        let timestampAfter = await timeTravel.latestTimestamp(deployer.provider)
        let difference = (timestampAfter - timestampBefore) - seconds;
        assert(difference <= 5) // the diff must be less than 5 seconds
    })

    it('it should setTimeTo desired timestamp', async () => {
        let timestamp = await timeTravel.latestTimestamp(deployer.provider)
        let desiredTimestamp = timestamp + seconds
        await timeTravel.setTimeTo(deployer.provider, desiredTimestamp)
        let timestampAfter = await timeTravel.latestTimestamp(deployer.provider)
        let difference = timestampAfter - desiredTimestamp;
        assert(difference <= 5) // the diff must be less than 5 seconds
    })

    it('should snapshot the current state', async () => {
        assert(await timeTravel.snapshot(deployer.provider))
    })

    it('should revert the state to a previous snapshot', async () => {
        let snapshotID = await timeTravel.snapshot(deployer.provider)
        let result = await timeTravel.revertState(deployer.provider, snapshotID)
        assert.isTrue(result)
    })
})