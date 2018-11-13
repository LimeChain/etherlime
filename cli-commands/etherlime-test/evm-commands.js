const snapshot = async (provider) => {
	return await provider.send('evm_snapshot');
}
const revertState = async (provider, number) => {
    return await provider.send('evm_revert', number);
}
const mineBlock = async (provider) => {
    await provider.send('evm_mine');
}

module.exports = {
    snapshot,
    revertState,
    mineBlock
}