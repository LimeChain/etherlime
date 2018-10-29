const file = `const etherlime = require('./../index.js');

const ICOToken = require('../test/testContracts/ICOToken.json')

const deploy = async (network, secret) => {

	const deployer = new etherlime.EtherlimeGanacheDeployer();
    const result = await deployer.deploy(ICOToken);

};

module.exports = {
    deploy,
};`

module.exports = {
    file
}