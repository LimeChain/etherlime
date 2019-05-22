const { colors, isSigner } = require('etherlime-utils');
const DeployedContractWrapper = require('./deployed-contract-wrapper');
const logger = require('etherlime-logger').logger;
const { ganacheSetupConfig } = require('etherlime-config');
const ethers = require('ethers')

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
	constructor(contract, contractAddress, signer, provider) {
		super(contract, contractAddress, signer, provider)

		this.instances = new Array();
		this.instancesMap = {}
		for (const acc of ganacheSetupConfig.accounts) {
			const accSigner = new ethers.Wallet(acc.secretKey, provider);
			const accContract = new ethers.Contract(contractAddress, contract.abi, accSigner);
			this.instances.push(accContract)
			this.instancesMap[accSigner.address] = accContract
		}
	}

	from(addressOrSignerOrIndex) {
		if (Number.isInteger(addressOrSignerOrIndex)) {
			return this.instances[addressOrSignerOrIndex];
		}

		if (typeof addressOrSignerOrIndex === 'string' || addressOrSignerOrIndex instanceof String) {
			return this.instancesMap[addressOrSignerOrIndex]
		}

		if (isSigner(addressOrSignerOrIndex)) {
			let instance = this.instancesMap[addressOrSignerOrIndex.address];
			if (!instance) {
				return new ethers.Contract(this.contractAddress, this._contract.abi, addressOrSignerOrIndex);
			}
			return this.instancesMap[addressOrSignerOrIndex.address]
		}

		if (isSigner(addressOrSignerOrIndex.signer)) {
			let instance = this.instancesMap[addressOrSignerOrIndex.signer.address];
			if (!instance) {
				return new ethers.Contract(this.contractAddress, this._contract.abi, addressOrSignerOrIndex.signer);
			}
			return this.instancesMap[addressOrSignerOrIndex.signer.address]
		}

		throw new Error('Unrecognized input parameter. It should be index, address or signer instance')
	}

	async verboseWaitForTransaction(transaction, transactionLabel) {

		let labelPart = (transactionLabel) ? `labeled ${colors.colorName(transactionLabel)} ` : '';
		logger.log(`Waiting for transaction ${labelPart}to be included in a block and mined: ${colors.colorTransactionHash(transaction.hash)}`);

		await this.provider.send('evm_mine');
		const transactionReceipt = await transaction.wait();
		await this._postValidateTransaction(transaction, transactionReceipt);
		const actionLabel = (transactionLabel) ? transactionLabel : this.constructor.name;
		await this._logAction(this.constructor.name, actionLabel, transaction.hash, 0, transaction.gasPrice.toString(), transactionReceipt.gasUsed.toString(), 'Successfully Waited For Transaction');
		return transactionReceipt;
	}

}

module.exports = EtherlimeGanacheWrapper;