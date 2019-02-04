const isSigner = function (signer) {
    if (typeof signer === 'object' &&  (typeof signer.signMessage === 'function') && (typeof signer.getAddress === 'function')) {
        return true
    }
    
    return false
}

module.exports = {
	isSigner
}