let { mineBlock, evmTimeTravel, evmSnapshot, evmRevertState } = require("./evm-commands");
let firstTimeRequestedTime = true;
async function latestTimestamp(provider) {
    // this is done as a workaround for a bug when first requested block get return wrong timestamp
    if (firstTimeRequestedTime) {
        await mineBlock(provider);
        firstTimeRequestedTime = false;
    }
    let latestBlock = await provider.getBlock(await provider.getBlockNumber());
    return latestBlock.timestamp;
}

const timeTravel = async (provider, seconds) => {
	await evmTimeTravel(provider, seconds)
}

const setTimeTo = async (provider, timestamp) => {
    const ct = await latestTimestamp(provider);
    if (ct > timestamp) {
        throw new Error(`cannot decrease time to ${timestamp} from ${ct}`);
    }
    let differenceInSeconds = timestamp - ct;
    return timeTravel(provider , differenceInSeconds);
}

const snapshot = async (provider) => {
    return await evmSnapshot(provider)
}

const revertState = async (provider, snapshotID) => {
    return await evmRevertState(provider, snapshotID)
}

module.exports = {
    timeTravel,
    setTimeTo,
    latestTimestamp,
    snapshot,
    revertState
}