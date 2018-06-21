const isUrl = function (url) {
	if (typeof (url) !== 'string' || url.length === 0) {
		return false
	}

	return true;
}

module.exports = {
	isUrl
}