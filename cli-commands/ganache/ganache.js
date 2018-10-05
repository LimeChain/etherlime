const ganache = require('ganache-cli');
const setup = require('./setup.json');
const loggerService = require('./../../logger-service/logger-service').logger;

const run = (inPort, output, logger) => {
	loggerService.storeOutputParameter(output);

	let port = (inPort) ? inPort : setup.defaultPort;
	const server = ganache.server({
		accounts: setup.accounts,
		logger
	});

	server.listen(port, function (err, blockchain) {

		if (err) {
			loggerService.log(err);
			loggerService.removeOutputStorage();
			return;
		}

		const accountsLength = blockchain.options.accounts.length;

		for (let i = 0; i < accountsLength; i++) {
			loggerService.log(`[${i}] Address: ${Object.getOwnPropertyNames(blockchain.personal_accounts)[i]} Private key: ${blockchain.options.accounts[i].secretKey}`);
		}

		loggerService.log(`\nListening on http://localhost:${port}`);

	});
}

module.exports = {
	run
}