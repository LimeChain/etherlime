let moment = require("moment");
let mineBlock = require("./evm-commands").mineBlock;
let firstTimeRequestedTime = true;

const timeTravel = async (provider, seconds) => {
	await provider.send('evm_increaseTime', seconds);
	await provider.send('evm_mine');
}

module.exports = {
	timeTravel
}