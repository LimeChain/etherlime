const timeTravel = async (provider, seconds) => {
	await provider.send('evm_increaseTime', seconds);
	await provider.send('evm_mine');
}

module.exports = {
	timeTravel
}