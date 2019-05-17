Quick Start
***********

Installing
----------

::

    npm i -g etherlime

Running embedded ganache-cli
----------------------------

::

    etherlime ganache

`Allows the use of EtherlimeGanacheDeployer`

Deploying with etherlime
------------------------

Initialize etherlime
~~~~~~~~~~~~~~~~~~~~

::

    etherlime init

This will create ``deployment`` directory with ``deploy.js`` file
inside. You can use this file to write your deployment procedure.

Deployer Example
~~~~~~~~~~~~~~~~

::

    const etherlime = require('etherlime');

    const TestContract = require('../build/TestContract.json'); // Path to your etherlime compiled contract json file

    const deploy = async (network, secret) => {

        const deployer = new etherlime.EtherlimeGanacheDeployer();
        
        const result = await deployer.deploy(TestContract, {}); // Add params separated with ,
    }
    
    module.exports = { deploy }

Verifying Smart Contract Example
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

::

    const etherlime = require('etherlime');

    const TestContract = require('../build/TestContract.json'); // Path to your etherlime compiled contract json file

    const deploy = async (network, secret, apiKey) => {
        deployer.defaultOverrides = { apiKey };
        const deployer = new etherlime.InfuraPrivateKeyDeployer(secret, network, "INFURA_API_KEY");
        
        const result = await deployer.deployAndVerify(TestContract, {}); // Add params separated with ,
    }
    
    module.exports = { deploy }

    Result of ``etherlime deploy`` with ``deployAndVerify`` method would be something like this: |Verifier 
    result|

Deploying
~~~~~~~~~~~~~~~~~~~~

Run the following in order to execute the deployment file mentioned above:

::

    etherlime deploy

The deployment process is verbose and gives you real-time info about the
performed actions. In addition there is a report of the actions when the
deployment finishes (as not all of us monitor the deployment process
constantly);

Result of ``etherlime deploy`` would be something like this: |Deployment
result|

History of your deploys
~~~~~~~~~~~~~~~~~~~~~~~

In order to see a list of what you've deployed you can run the following
command:

::

    etherlime history


-----

.. |Deployment result| image:: ./_docs_static/DeploymentResult.png
   :target: https://imgur.com/a/NyLX9mH

.. |Verifier result| image:: ./_docs_static/DeploymentResult.png
   :target: https://imgur.com/a/tF9AFe0

