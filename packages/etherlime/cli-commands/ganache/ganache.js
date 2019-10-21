const ganache = require('ganache-cli');
const setup = require('./setup.json');
const { ganacheSetupConfig } = require('etherlime-config');
const colors = require('etherlime-utils').colors;
const logger = require('etherlime-logger').logger;
const ethers = require('ethers');
const fs = require('fs');
const path = require('path');
let port;

const run = (inPort, inLogger, forkParams, gasPrice, gasLimit, mnemonic, generate, networkId, unlock, secure) => {
	
	if (mnemonic && generate) {
		generateAccounts(mnemonic, generate);
	}

	if (typeof unlock == "string") {
		unlock = [unlock];
	}

	port = (inPort) ? inPort : setup.defaultPort;
	fork = (forkParams) ? forkParams : setup.forkParams;
	gasPrice = (gasPrice) ? ethers.utils.hexlify(gasPrice) : setup.gasPrice;
	gasLimit = (gasLimit) ? ethers.utils.hexlify(gasLimit) : setup.gasLimit;
	const server = ganache.server({
		accounts: setup.accounts,
		logger: inLogger,
		fork,
		gasPrice,
		gasLimit,
		network_id: networkId,
		unlocked_accounts: unlock,
		secure: secure
	});

	server.listen(port, ganacheServerListenCallback);
};
const ganacheServerListenCallback = (err, blockchain) => {
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
	forkedBlockNumber ? logger.log(`Network is forked from block number: ${colors.colorSuccess(forkedBlockNumber)}`) : null;
	logger.log(`Network ID: ${colors.colorSuccess(blockchain.options.network_id)}`);
	blockchain.options.unlocked_accounts.length ? logger.log(`Unlocked Account(s): ${colors.colorSuccess(blockchain.options.unlocked_accounts)}`) : null;
	blockchain.options.secure ? logger.log(`Secure: ${colors.colorSuccess(blockchain.options.secure)}`) : null;
};

const generateAccounts = (mnemonic, generate) => {

	// Every time the command is run with mnemonic, reset the account list with the default one and add the number of accounts, the user specifies.
	const currentAccounts = ganacheSetupConfig.accounts;
	for (let i = 0; i < generate; i++) {
		let path = `m/44'/60'/${i}'/0/0`;
		let wallet = ethers.Wallet.fromMnemonic(mnemonic, path);
		currentAccounts.push({ secretKey: wallet.signingKey.privateKey, balance: "0x90000000000000000000000000000000" });
	}
	setup.accounts = currentAccounts;
	fs.writeFileSync(path.resolve(__dirname, 'setup.json'), JSON.stringify(setup, null, 1), "utf8");
}

module.exports = {
	run,
	ganacheServerListenCallback
};

