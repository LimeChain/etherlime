const ganache = require('ganache-cli');
const setup = require('./setup.json');
const colors = require('./../../utils/colors');


const run = (inPort, logger, forkParams) => {
	let port = (inPort) ? inPort : setup.defaultPort;
	let fork = (forkParams) ? forkParams : setup.forkParams;
	const server = ganache.server({
		accounts: setup.accounts,
		logger,
		fork
	});

	server.listen(port, function (err, blockchain) {

		if (err) {
			logger.log(err);
			return;
		}
		const accountsLength = blockchain.options.accounts.length;
		const forkedNetwork = blockchain.options.fork;
		const forkedBlockNumber = parseInt(blockchain.options.fork_block_number, 16);
		for (let i = 0; i < accountsLength; i++) {
			logger.log(`[${i}] Address: ${Object.getOwnPropertyNames(blockchain.personal_accounts)[i]} Private key: ${blockchain.options.accounts[i].secretKey}`);
		}

		logger.log(`\nListening on http://localhost:${port}`);
		forkedNetwork ? logger.log(`Etherlime ganache is forked from network: ${colors.colorSuccess(forkedNetwork)}`) : null;
		forkedBlockNumber ? logger.log(`\nNetwork is forked from block number: ${colors.colorSuccess(forkedBlockNumber)}`) : null;
	});
};

module.exports = {
	run
};