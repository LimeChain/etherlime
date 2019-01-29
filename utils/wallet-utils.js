const isWallet = function (wallet) {
    if (typeof wallet === 'object' &&  (typeof wallet.signMessage === 'function') && (typeof wallet.getAddress === 'function')) {
        return true
    }
    
    return false
}

module.exports = {
	isWallet
}