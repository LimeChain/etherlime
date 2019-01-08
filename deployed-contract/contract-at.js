const ethers = require('ethers');
const ganacheSetupConfig = require('./../deployer/setup.json');
const isWallet = require('./../utils/wallet-utils').isWallet;

const DeployedContractWrapper = require('./deployed-contract-wrapper');
const EtherlimeGanacheWrapper = require('./etherlime-ganache-wrapper');

/**
 * 
 * @param {*} contract 
 * @param {*} contractAddress 
 * @param {*} wallet The wallet to connect this contract to
 * @param {*} providerOrPort Either provider to connect a normal Deployed Contract Wrapper or the port that the etherlime ganache is run on. Defaults to 8545
 */
const contractAt = async (contract, contractAddress, wallet, providerOrPort) => {

	if (providerOrPort instanceof ethers.providers.Provider) {
		if (!wallet || !(isWallet(wallet))) {
			throw new Error(`Incorrect wallet supplied - ${JSON.stringify(wallet)}`)
		}
		const walletInstance = await wallet.connect(providerOrPort)
		return new DeployedContractWrapper(contract, contractAddress, walletInstance, providerOrPort)
	}

	if (!providerOrPort) {
		providerOrPort = 8545
	}

	if (Number.isInteger(providerOrPort)) {
		const provider = new ethers.providers.JsonRpcProvider(`http://localhost:${providerOrPort}`)
		let walletInstance;
		if (isWallet(wallet)) {
			walletInstance = await wallet.connect(provider);
		} else {
			walletInstance = new ethers.Wallet(ganacheSetupConfig.accounts[0].secretKey, provider);
		}
		return new EtherlimeGanacheWrapper(contract, contractAddress, walletInstance, provider)
	}

	throw new Error('You have supplied invalid value for provider or port argument')
}

module.exports = contractAt