const etherlime = require('./../../../../packages/etherlime/index');

const ICOToken = require('../../../testContracts/ICOToken.json')

const deploy = async (network, secret) => {

    const deployer = new etherlime.EtherlimeGanacheDeployer(secret);
    const result = await deployer.deploy(ICOToken);

};

module.exports = {
    deploy,
};