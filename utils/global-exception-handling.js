const globalExceptionHandling = process.on('unhandledRejection', err => {
	console.log('Udri Filio');
	console.error((new Date).toUTCString() + ' unhandledRejection:', err.message)
	console.error(err.stack)
});

module.exports = {
	globalExceptionHandling
};