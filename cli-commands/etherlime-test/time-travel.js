let mineBlock = require("./evm-commands").mineBlock;
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
	await provider.send('evm_increaseTime', seconds);
	await provider.send('evm_mine');
}

const setTimeTo = async (provider, timestamp) => {
    const ct = await latestTimestamp(provider);
    if (ct > timestamp) {
        throw new Error(`cannot decrease time to ${timestamp} from ${ct}`);
    }
    let differenceInSeconds = timestamp - ct;
    return timeTravel(provider , differenceInSeconds);
}

module.exports = {
	timeTravel
}