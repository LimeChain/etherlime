const ganache = require('ganache-cli');
const setup = require('./setup.json');
let port;

const run = (inPort, logger) => {
	port = (inPort) ? inPort : setup.defaultPort;
	const server = ganache.server({
		accounts: setup.accounts,
		logger
	});

	server.listen(port, listenCallback);
};

const listenCallback = (err, blockchain) => {

	if (err) {
		console.log(err);
		return;
	}

	const accountsLength = blockchain.options.accounts.length;

	for (let i = 0; i < accountsLength; i++) {
		console.log(`[${i}] Address: ${Object.getOwnPropertyNames(blockchain.personal_accounts)[i]} Private key: ${blockchain.options.accounts[i].secretKey}`);
	}

	console.log(`\nListening on http://localhost:${port}`);

};

module.exports = {
	run,
	listenCallback
};
