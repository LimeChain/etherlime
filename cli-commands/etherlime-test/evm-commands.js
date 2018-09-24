const snapshot = async (provider) => {
	await provider.send('evm_snapshot');
}
const revertState = async (provider) => {
    await provider.send('evm_revert');
}
const mineBlock = async (provider) => {
    await provider.send('evm_mine');
}

module.exports = {
    snapshot,
    revertState,
    mineBlock
}