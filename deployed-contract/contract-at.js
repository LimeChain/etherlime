const ethers = require('ethers');
const ganacheSetupConfig = require('./../deployer/setup.json');

const DeployedContractWrapper = require('./deployed-contract-wrapper');
const EtherlimeGanacheWrapper = require('./etherlime-ganache-wrapper');

/**
 * 
 * @param {*} contract 
 * @param {*} contractAddress 
 * @param {*} wallet 
 * @param {*} provider (Optional) - use only when you are not connecting to EtherlimeGanache on the default port
 */
const contractAt = (contract, contractAddress, wallet, provider) => {
	if (provider) {
		return new DeployedContractWrapper(contract, contractAddress, wallet, provider)
	}

	provider = new ethers.providers.JsonRpcProvider(`http://localhost:8545`);
	return new EtherlimeGanacheWrapper(contract, contractAddress, wallet, provider)
}

module.exports = contractAt