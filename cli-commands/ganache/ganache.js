const ganache = require('ganache-cli');
const setup = require('./setup.json');
const logger = require('./../../logger-service/logger-service').logger;

let port;

const run = (inPort) => {
	port = (inPort) ? inPort : setup.defaultPort;
	const server = ganache.server({
		accounts: setup.accounts
	});

	server.listen(port, ganacheServerListenCallback);
};

const ganacheServerListenCallback = (err, blockchain) => {

	if (err) {
		console.log(err);
		return;
	}

	const accountsLength = blockchain.options.accounts.length;

	for (let i = 0; i < accountsLength; i++) {
		logger.log(`[${i}] Address: ${Object.getOwnPropertyNames(blockchain.personal_accounts)[i]} Private key: ${blockchain.options.accounts[i].secretKey}`);
	}

	logger.log(`\nListening on http://localhost:${port}`);

};

module.exports = {
	run,
	ganacheServerListenCallback
};
