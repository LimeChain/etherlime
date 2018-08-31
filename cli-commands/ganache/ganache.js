const ganache = require('ganache-cli');
const setup = require('./setup.json');

const run = (inPort, logger) => {
	let port = (inPort) ? inPort : setup.defaultPort;
	const server = ganache.server({
		accounts: setup.accounts,
		logger
	});

	server.listen(port, function (err, blockchain) {

		if (err) {
			console.log(err);
			return;
		}

		const accountsLength = blockchain.options.accounts.length;

		for (let i = 0; i < accountsLength; i++) {
			console.log(`[${i}] Address: ${Object.getOwnPropertyNames(blockchain.personal_accounts)[i]} Private key: ${blockchain.options.accounts[i].secretKey}`);
		}

		console.log(`\nListening on http://localhost:${port}`);

	});
};

module.exports = {
	run
};
