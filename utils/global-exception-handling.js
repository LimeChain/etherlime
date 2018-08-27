const handleRejection = (callback) => {
	return process.on('unhandledRejection', callback);
}

const handleException = (callback) => {
	return process.on('unhandledException', callback);
}

module.exports = {
	handleRejection,
	handleException
};