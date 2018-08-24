const unhandledRejection = process.on('unhandledRejection', err => {
	console.error((new Date).toUTCString() + ' unhandledRejection:', err.message)
	console.error(err.stack)
});

const unhandledException = process.on('unhandledException', err => {
	console.error((new Date).toUTCString() + ' unhandledException:', err.message)
	console.error(err.stack)
});

const globalExceptionHandling = function () {
	unhandledException;
	unhandledRejection
};

module.exports = {
	globalExceptionHandling
};