const PrivateKeyDeployer = require('./deployer/private-key-deployer');
const InfuraPrivateKeyDeployer = require('./deployer/infura-deployer/infura-private-key-deployer');

const DeployedContractWrapper = require('./deployed-contract/deployed-contract-wrapper');

module.exports = {
	PrivateKeyDeployer,
	InfuraPrivateKeyDeployer,
	DeployedContractWrapper
}