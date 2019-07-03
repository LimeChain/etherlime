import { colors, isSigner } from 'etherlime-utils';
import DeployedContractWrapper from './deployed-contract-wrapper';
import { logger } from 'etherlime-logger';
import { ganacheSetupConfig } from 'etherlime-config';
import { CompiledContract, EtherlimeWallet, Generic } from '../types/types';
import { Wallet, Contract, providers } from 'ethers';

class EtherlimeGanacheWrapper extends DeployedContractWrapper {

	/**
	 *
	 * Object representing deployed contract allowing user to interact with deployed contracts
	 *
	 * @param {*} contract The deployed contract descriptor
	 * @param {*} contractAddress The address of the deployed contract
	 * @param {*} signer The signer that has deployed this contract
	 * @param {*} provider ethers provider
	 */

	private instances: Array<Contract>;
	private instancesMap: Generic<Contract>;

	constructor(contract: CompiledContract, contractAddress: string, signer?: Wallet, provider?: providers.JsonRpcProvider) {
		super(contract, contractAddress, signer, provider)

		this.instances = new Array();
		this.instancesMap = {};
		for (const acc of ganacheSetupConfig.accounts) {
			const accSigner = new Wallet(acc.secretKey, provider);
			const accContract = new Contract(contractAddress, contract.abi, accSigner);
			this.instances.push(accContract)
			this.instancesMap[accSigner.address] = accContract
		}
	}

	from(addressOrSignerOrIndex: string | Wallet & EtherlimeWallet | number): Contract {
		if (typeof addressOrSignerOrIndex === 'number' && Number.isInteger(addressOrSignerOrIndex)) {
			return this.instances[addressOrSignerOrIndex];
		}

		if (typeof addressOrSignerOrIndex === 'string' || addressOrSignerOrIndex instanceof String) {
			return this.instancesMap[addressOrSignerOrIndex.toString()]
		}

		if (typeof addressOrSignerOrIndex !== 'number' && isSigner(addressOrSignerOrIndex)) {
			let instance = this.instancesMap[addressOrSignerOrIndex.address];
			if (!instance) {
				return new Contract(this.contractAddress, this._contract.abi, addressOrSignerOrIndex);
			}
			return this.instancesMap[addressOrSignerOrIndex.address]
		}

		if (typeof addressOrSignerOrIndex !== 'number' && isSigner(addressOrSignerOrIndex.signer)) {
			let instance = this.instancesMap[addressOrSignerOrIndex.signer.address];
			if (!instance) {
				return new Contract(this.contractAddress, this._contract.abi, addressOrSignerOrIndex.signer);
			}
			return this.instancesMap[addressOrSignerOrIndex.signer.address]
		}

		throw new Error('Unrecognized input parameter. It should be index, address or signer instance')
	}

	async verboseWaitForTransaction(transaction: providers.TransactionResponse, transactionLabel: string): Promise<providers.TransactionReceipt> {

		let labelPart = (transactionLabel) ? `labeled ${colors.colorName(transactionLabel)} ` : '';
		logger.log(`Waiting for transaction ${labelPart}to be included in a block and mined: ${colors.colorTransactionHash(transaction.hash)}`);

		await this.provider.send('evm_mine', []);
		const transactionReceipt: providers.TransactionReceipt = await transaction.wait();
		await this._postValidateTransaction(transaction, transactionReceipt);
		const actionLabel = (transactionLabel) ? transactionLabel : this.constructor.name;
		await this._logAction(this.constructor.name, actionLabel, transaction.hash, 0, transaction.gasPrice.toString(), transactionReceipt.gasUsed.toString(), 'Successfully Waited For Transaction');
		return transactionReceipt;
	}

}

export default EtherlimeGanacheWrapper;