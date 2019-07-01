import { colors, isNumber } from 'etherlime-utils';
import JSONRPCDeployer from './../jsonrpc-deployer/jsonrpc-private-key-deployer';
import { ganacheSetupConfig } from 'etherlime-config';
import EtherlimeGanacheWrapper from './../../deployed-contract/etherlime-ganache-wrapper';
import { logger } from 'etherlime-logger';
import { providers } from 'ethers';
import { TxParams, CompiledContract } from '../../types/types';

class EtherlimeGanacheDeployer extends JSONRPCDeployer {
	/**
	 *
	 * Instantiates new deployer based on the GanacheCli Provider; If no privateKey and nodeUrl are specified, the deployer will be instantiated with the default values from cli-commands/ganache/setup.json
	 *
	 * @param {*} privateKey the private key for the deployer wallet/signer instance
	 * @param {*} port port number of the network to deploy on. This is the port number that is given to the class
	 * @param {*} defaultOverrides [Optional] default deployment overrides
	 */

	constructor(privateKey: string = ganacheSetupConfig.accounts[0].secretKey, port: number = ganacheSetupConfig.defaultPort, defaultOverrides?: TxParams) {
		EtherlimeGanacheDeployer._validatePortInput(port);

		const nodeUrl = `http://localhost:${port}/`;
		super(privateKey, nodeUrl, defaultOverrides);
		this.nodeUrl = nodeUrl;
	}

	setPort(port: number): void {
		EtherlimeGanacheDeployer._validatePortInput(port);
		const nodeUrl = `http://localhost:${port}/`;
		this.setNodeUrl(nodeUrl);
	}

	static _validatePortInput(port: number): void {
		if (!isNumber(port)) {
			throw new Error(`Passed port (${port}) is not valid port`);
		}
	}

	toString(): string {
		const superString = super.toString();
		return `Network: ${colors.colorNetwork(this.nodeUrl)}\n${superString}`;
	}

	protected async _waitForDeployTransaction(transaction: providers.TransactionResponse): Promise<providers.TransactionReceipt> {
		await this.provider.send('evm_mine', []);
		return this.provider.getTransactionReceipt(transaction.hash);
	}

	protected async _generateDeploymentResult(contract: CompiledContract, transaction: providers.TransactionResponse, transactionReceipt: providers.TransactionReceipt):
		Promise<EtherlimeGanacheWrapper> {
		logger.log(`Contract ${colors.colorName(contract.contractName)} deployed at address: ${colors.colorAddress(transactionReceipt.contractAddress)}`);
		return new EtherlimeGanacheWrapper(contract, transactionReceipt.contractAddress, this.signer, this.provider);
	}

	wrapDeployedContract(contract: CompiledContract, contractAddress: string): EtherlimeGanacheWrapper {
		logger.log(`Wrapping contract ${colors.colorName(contract.contractName)} at address: ${colors.colorAddress(contractAddress)}`);
		return new EtherlimeGanacheWrapper(contract, contractAddress, this.signer, this.provider);
	}
}

export default EtherlimeGanacheDeployer;
