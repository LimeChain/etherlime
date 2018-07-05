Quick Deployer Example
**********************

::

    const etherlime = require('etherlime');

    const TestContract = require('./TestContract.json');

    const defaultConfigs = {
        gasPrice: 20000000000,
        gasLimit: 4700000
    }

    const deploy = async (network) => {

        const deployer = new etherlime.InfuraPrivateKeyDeployer('Your Private Key Goes Here', 'ropsten', 'Your Infura API Key', defaultConfigs);
        
        const result = await deployer.deploy(TestContract, '0xda8a06f1c910cab18ad187be1faa2b8606c2ec86', 1539426974);
    }

Result of ``etherlime deploy`` would be something like this: |Deployment
result|

-----

.. |Deployment result| image:: ./_docs_static/DeploymentResult.png
   :target: https://imgur.com/a/NyLX9mH

