const mineBlock = async (provider) => {
    await provider.send('evm_mine');
}

const evmTimeTravel = async (provider, seconds) => {
    await provider.send('evm_increaseTime', seconds);
	await provider.send('evm_mine');
}

const evmSnapshot = async (provider) => {
    return await provider.send('evm_snapshot')
}

const evmRevertState = async (provider, snapshotID) => {
    return await provider.send('evm_revert', snapshotID)
}

module.exports = {
    mineBlock,
    evmTimeTravel,
    evmSnapshot,
    evmRevertState
}