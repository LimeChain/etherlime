let deploymentWithLib = `const etherlime = require('./../packages/etherlime/index.js');
 const LimeFactory = require('../build/LimeFactory.json');
const LimeFactoryLib = require('../build/LimeFactoryLib.json');
 const deploy = async (network, secret) => {
     const deployer = new etherlime.EtherlimeGanacheDeployer(secret);
     const library = await deployer.deploy(LimeFactoryLib);
    const limeFactory = await deployer.deploy(LimeFactory, { LimeFactoryLib: library.contractAddress});
 };
 module.exports = {
    deploy,
};`

 module.exports = {deploymentWithLib} 