const ethers = require('ethers');
const isAddress = require('../utils/address-utils').isAddress;
const isValidContract = require('../utils/contract-utils').isValidContract;

class DeployedContract {
	constructor(contract, contractAddress, wallet, provider) {
		this._validateInput(contract, contractAddress, wallet, provider);
	}

	_validateInput(contract, contractAddress, wallet, provider) {
		if (!(wallet instanceof ethers.Wallet)) {
			throw new Error('Passed wallet is not instance of ethers Wallet');
		}

		if (!(isAddress(contractAddress))) {
			throw new Error(`Passed contract address (${contractAddress}) is not valid address`);
		}

		if (!(isValidContract(contract))) {
			throw new Error(`Passed contract is not a valid contract object. It needs to have bytecode, abi and contractName properties`);
		}
	}
}

module.exports = DeployedContract;