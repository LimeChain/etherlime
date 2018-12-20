const mineBlock = async (provider) => {
    await provider.send('evm_mine');
}

module.exports = {
    mineBlock
}