const colors = require('./../utils/colors');
const DeployedContractWrapper = require('./deployed-contract-wrapper');

class EtherlimeGanacheWrapper extends DeployedContractWrapper {

	async verboseWaitForTransaction(transaction, transactionLabel) {

		let labelPart = (transactionLabel) ? `labeled ${colors.colorName(transactionLabel)} ` : '';
		console.log(`Waiting for transaction ${labelPart}to be included in a block and mined: ${colors.colorTransactionHash(transaction.hash)}`);

		await this.provider.send('evm_mine');
		const transactionReceipt = await this._postValidateTransaction(transaction);
		const actionLabel = (transactionLabel) ? transactionLabel : this.constructor.name;
		await this._logAction(this.constructor.name, actionLabel, transaction.hash, 0, transaction.gasPrice.toString(), transactionReceipt.gasUsed.toString(), 'Successfully Waited For Transaction');
		return transactionReceipt;
	}

}

module.exports = EtherlimeGanacheWrapper;