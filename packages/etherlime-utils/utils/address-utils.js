const isAddress = function (address) {
	if (typeof (address) !== 'string' || !address.match(/^0x[0-9A-Fa-f]{40}$/)) {
		return false
	}

	return true;
}

module.exports = {
	isAddress
}