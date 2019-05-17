const isProvider = function (provider) {

    if (typeof provider === 'object' && typeof provider.send === 'function') {
        return true
    }
    
    return false
}

module.exports = {
	isProvider
}