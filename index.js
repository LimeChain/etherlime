const PrivateKeyDeployer = require('./deployer/private-key-deployer');
const InfuraPrivateKeyDeployer = require('./deployer/infura-deployer/infura-private-key-deployer');

module.exports = {
	PrivateKeyDeployer,
	InfuraPrivateKeyDeployer
}