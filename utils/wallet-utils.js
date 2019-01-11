let isAddress = require('./address-utils').isAddress;
const isWallet = function (wallet) {
    if (typeof wallet === 'object' && wallet.signingKey && isAddress(wallet.address)) {
        return true
    }
    
    return false
}

module.exports = {
	isWallet
}