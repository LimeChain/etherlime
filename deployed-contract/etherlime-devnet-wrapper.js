const colors = require('./../utils/colors');
const DeployedContractWrapper = require('./deployed-contract-wrapper');
const logger = require('./../logger-service/logger-service').logger;
const devnetSetupConfig = require('./../deployer/devnet-setup.json');
const isWallet = require('./../utils/wallet-utils').isWallet;
const ethers = require('ethers')

class EtherlimeDevnetWrapper extends DeployedContractWrapper {

	/**
	 *
	 * Object representing deployed contract allowing user to interact with deployed contracts
	 *
	 * @param {*} contract The deployed contract descriptor
	 * @param {*} contractAddress The address of the deployed contract
	 * @param {*} wallet The wallet that has deployed this contract
	 * @param {*} provider ethers provider
	 */
	constructor(contract, contractAddress, wallet, provider) {
		super(contract, contractAddress, wallet, provider)

		this.instances = new Array();
		this.instancesMap = {}
		for (const acc of devnetSetupConfig.accounts) {
			let accJSONString = JSON.stringify(acc);
			let accWallet = new ethers.Wallet.fromEncryptedJson(accJSONString, devnetSetupConfig.defaultPassword);
			accWallet = wallet.connect(provider);
			const accContract = new ethers.Contract(contractAddress, contract.abi, accWallet);
			this.instances.push(accContract)
			this.instancesMap[accWallet.address] = accContract
		}
	}

	from(addressOrWalletOrIndex) {
		if (Number.isInteger(addressOrWalletOrIndex)) {
			return this.instances[addressOrWalletOrIndex];
		}

		if (typeof addressOrWalletOrIndex === 'string' || addressOrWalletOrIndex instanceof String) {
			return this.instancesMap[addressOrWalletOrIndex]
		}

		if (isWallet(addressOrWalletOrIndex)) {
			let instance = this.instancesMap[addressOrWalletOrIndex.address];
			if (!instance) {
				return new ethers.Contract(this.contractAddress, this._contract.abi, addressOrWalletOrIndex);
			}
			return this.instancesMap[addressOrWalletOrIndex.address]
		}

		if (isWallet(addressOrWalletOrIndex.wallet)) {
			let instance = this.instancesMap[addressOrWalletOrIndex.wallet.address];
			if (!instance) {
				return new ethers.Contract(this.contractAddress, this._contract.abi, addressOrWalletOrIndex.wallet);
			}
			return this.instancesMap[addressOrWalletOrIndex.wallet.address]
		}

		throw new Error('Unrecognised input parameter. It should be index, address or wallet instance')
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

module.exports = EtherlimeDevnetWrapper;