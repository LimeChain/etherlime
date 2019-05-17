const etherlime = require('etherlime');
const LimeFactory = require('../build/LimeFactory.json');


const deploy = async (network, secret, etherscanApiKey) => {

	const deployer = new etherlime.EtherlimeGanacheDeployer();
	const result = await deployer.deploy(LimeFactory);

};

module.exports = {
	deploy
};