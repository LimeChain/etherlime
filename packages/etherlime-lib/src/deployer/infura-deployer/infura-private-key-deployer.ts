
import { utils, providers } from 'ethers';
import PrivateKeyDeployer from './../private-key-deployer';
import { colors } from 'etherlime-utils';
import { logger } from 'etherlime-logger';
import { TxParams } from '../../types/types';

class InfuraPrivateKeyDeployer extends PrivateKeyDeployer {

	/**
	 *
	 * Instantiates new deployer based on the Infura service and private key based deployment wallet/signer instance
	 *
	 * @param {*} privateKey the private key for the deployer wallet/signer instance
	 * @param {*} network network to deploy on. Check ethers for all networks. Examples: mainnet, rinkeby, ropsten
	 * @param {*} apiKey the apiKey given to you by Infura
	 * @param {*} defaultOverrides [Optional] default deployment overrides
	 */

	network: string;
	apiKey: string;

	constructor(privateKey: string, network: string, apiKey: string, defaultOverrides?: TxParams) {
		const infuraNetwork = utils.getNetwork(network);
		const infuraProvider = new providers.InfuraProvider(infuraNetwork, apiKey);
		super(privateKey, infuraProvider, defaultOverrides);

		logger.log(`Deployer set to Infura. Network: ${colors.colorNetwork(network)} with API Key: ${colors.colorAPIKey(apiKey)}\n`);

		this.network = network;
		this.apiKey = apiKey;
	}

	setNetwork(network: string): void {
		const infuraNetwork = utils.getNetwork(network);
		const infuraProvider = new providers.InfuraProvider(infuraNetwork, this.apiKey);
		this.setProvider(infuraProvider);
		this.network = network;
	}

	setApiKey(apiKey: string): void {
		const infuraNetwork = utils.getNetwork(this.network);
		const infuraProvider = new providers.InfuraProvider(infuraNetwork, apiKey);
		this.setProvider(infuraProvider);
		this.apiKey = apiKey;
	}

	toString(): string {
		const superString = super.toString();
		return `Deployer set to Infura. Network: ${colors.colorNetwork(this.network)} with API Key: ${colors.colorAPIKey(this.apiKey)}\n${superString}`;
	}
}

export default InfuraPrivateKeyDeployer;
