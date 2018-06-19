#!/usr/bin/env node

const ethers = require('ethers');
const providers = ethers.providers;
const Wallet = ethers.Wallet;

const infuraNetworks = ['ropsten', 'mainnet', 'rinkeby'];
const localNetworks = ['local']
const allNetworks = [...infuraNetworks, ...localNetworks];

setupProvider = () => {

	const network = process.argv[3];

	if (!allNetworks.includes(network)) {
		throw new Error('Invalid network');
	}

	if (infuraNetworks.includes(network)) {
		const apiKey = process.argv[4];
		if (!apiKey) {
			throw new Error('Invalid Infura API key');
		}

		return new providers.InfuraProvider(ethers.providers.networks[network], apiKey);
	}

	if (localNetworks.includes(network)) {
		const localhostURL = process.argv[4];
		if (!localhostURL) {
			throw new Error('Invalid Localhost URL');
		}

		return new providers.JsonRpcProvider(localhostURL, providers.networks.unspecified);
	}
}

run = async () => {

	if (process.argv.length < 3) {
		throw new Error('Invalid arguments count');
	}

	const privateKey = process.argv[2];

	const provider = setupProvider();

	const wallet = new Wallet('0x' + privateKey);

	wallet.provider = provider;

	console.log(wallet.address);
}

run();