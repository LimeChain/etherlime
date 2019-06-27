import { Wallet, providers } from 'ethers';
import { colors } from 'etherlime-utils';
import { logger } from 'etherlime-logger';

import Deployer from './deployer';
import { TxParams } from './../types/types';


class PrivateKeyDeployer extends Deployer {

	/**
	 * Instantiates new deployer with deployer wallet/signer instance based on privateKey. You probably should not use this class directly but use something inheriting this as it gives you provider options too
	 * @param {*} privateKey the private key for the deployer wallet/signer instance
	 * @param {*} provider the ethers.provider instance
	 * @param {*} defaultOverrides [Optional] default deployment overrides
	 */

	constructor(privateKey: string, provider: providers.JsonRpcProvider, defaultOverrides?: TxParams) {
		const sanitizedPrivateKey = (privateKey.startsWith('0x')) ? privateKey : `0x${privateKey}`;
		const signer = new Wallet(sanitizedPrivateKey, provider);

		super(signer, provider, defaultOverrides);

		logger.log(`Deployer set to deploy from address: ${colors.colorAddress(this.signer.address)}\n`);
	}

	setPrivateKey(privateKey: string): void {
		const sanitizedPrivateKey = (privateKey.startsWith('0x')) ? privateKey : `0x${privateKey}`;
		const signer = new Wallet(sanitizedPrivateKey, this.provider);
		this.setSigner(signer);
	}

	toString(): string {
		return `Deployer set to deploy from address: ${colors.colorAddress(this.signer.address)}`;
	}
}

export default PrivateKeyDeployer;
