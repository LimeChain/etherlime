const Deployer = require('./deployer/deployer');
const PrivateKeyDeployer = require('./deployer/private-key-deployer');
const InfuraPrivateKeyDeployer = require('./deployer/infura-deployer/infura-private-key-deployer');
const JSONRPCPrivateKeyDeployer = require('./deployer/jsonrpc-deployer/jsonrpc-private-key-deployer');
const GanacheCliDeployer = require('./deployer/ganachecli-deployer/ganachecli-deployer');

const DeployedContractWrapper = require('./deployed-contract/deployed-contract-wrapper');

module.exports = {
	Deployer,
	PrivateKeyDeployer,
	InfuraPrivateKeyDeployer,
	JSONRPCPrivateKeyDeployer,
	DeployedContractWrapper,
	GanacheCliDeployer
}