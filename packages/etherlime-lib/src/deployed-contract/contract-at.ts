import { providers, Wallet } from 'ethers';
import { ganacheSetupConfig } from 'etherlime-config';
import { isSigner, isProvider } from 'etherlime-utils';
import DeployedContractWrapper from './deployed-contract-wrapper';
import EtherlimeGanacheWrapper from './etherlime-ganache-wrapper';
import { CompiledContract } from '../types/types';

/**
 * 
 * @param {*} contract 
 * @param {*} contractAddress 
 * @param {*} signer The signer to connect this contract to
 * @param {*} providerOrPort Either provider to connect a normal Deployed Contract Wrapper or the port that the etherlime ganache is run on. Defaults to 8545
 */
const contractAt = async (contract: CompiledContract, contractAddress: string, signer?: Wallet, providerOrPort?: providers.JsonRpcProvider | number):
	Promise<DeployedContractWrapper | EtherlimeGanacheWrapper> => {

	if (typeof providerOrPort !== 'number' && isProvider(providerOrPort)) {
		if (!signer || !(isSigner(signer))) {
			throw new Error(`Incorrect signer supplied - ${JSON.stringify(signer)}`)
		}

		if (!signer.provider) {
			throw new Error(`Passed signer is not connected to any provider.`)
		}

		return new DeployedContractWrapper(contract, contractAddress, signer, providerOrPort)
	}

	if (!providerOrPort) {
		providerOrPort = 8545
	}

	if (typeof providerOrPort === 'number' && Number.isInteger(providerOrPort)) {
		const provider = new providers.JsonRpcProvider(`http://localhost:${providerOrPort}`)

		if (isSigner(signer)) {

			if (!signer.provider) {
				throw new Error(`Passed signer is not connected to current provider ${providerOrPort}`)
			}

			return new EtherlimeGanacheWrapper(contract, contractAddress, signer, provider)
		}

		let signerInstance = new Wallet(ganacheSetupConfig.accounts[0].secretKey, provider);
		return new EtherlimeGanacheWrapper(contract, contractAddress, signerInstance, provider)
	}


	throw new Error('You have supplied invalid value for provider or port argument')
}

export default contractAt