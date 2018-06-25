const isNumber = function (number) {
	if (typeof (number) !== 'number') {
		return false
	}

	return true;
}

module.exports = {
	isNumber
}