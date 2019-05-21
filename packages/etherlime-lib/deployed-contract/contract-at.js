const ethers = require('ethers');
const ganacheSetupConfig = require('etherlime-config');
const { isSigner, isProvider } = require('etherlime-utils');

const DeployedContractWrapper = require('./deployed-contract-wrapper');
const EtherlimeGanacheWrapper = require('./etherlime-ganache-wrapper');

/**
 * 
 * @param {*} contract 
 * @param {*} contractAddress 
 * @param {*} signer The signer to connect this contract to
 * @param {*} providerOrPort Either provider to connect a normal Deployed Contract Wrapper or the port that the etherlime ganache is run on. Defaults to 8545
 */
const contractAt = async (contract, contractAddress, signer, providerOrPort) => {

	if (isProvider(providerOrPort)) {
		if (!signer || !(isSigner(signer))) {
			throw new Error(`Incorrect signer supplied - ${JSON.stringify(signer)}`)
		}

		if(!signer.provider) {
			throw new Error(`Passed signer is not connected to any provider.`)
		}

		return new DeployedContractWrapper(contract, contractAddress, signer, providerOrPort)
	}

	if (!providerOrPort) {
		providerOrPort = 8545
	}
	
	if (Number.isInteger(providerOrPort)) {
		const provider = new ethers.providers.JsonRpcProvider(`http://localhost:${providerOrPort}`)

		if (isSigner(signer)) {

			if(!signer.provider){
				throw new Error(`Passed signer is not connected to current provider ${providerOrPort}`)
			}

			return new EtherlimeGanacheWrapper(contract, contractAddress, signer, provider)
		}

		let signerInstance = new ethers.Wallet(ganacheSetupConfig.accounts[0].secretKey, provider);
		return new EtherlimeGanacheWrapper(contract, contractAddress, signerInstance, provider)
	}


	throw new Error('You have supplied invalid value for provider or port argument')
}

module.exports = contractAt