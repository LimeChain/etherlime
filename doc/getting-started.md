Quick Start
===========

Installing
----------

    npm i -g etherlime

Running embedded ganache-cli
----------------------------

    etherlime ganache

Allows the use of EtherlimeGanacheDeployer

Deploying with etherlime
------------------------

### Initialize etherlime

    etherlime init

This will create `deployment` directory with `deploy.js` file inside.
You can use this file to write your deployment procedure.

### Deployer Example

    const etherlime = require('etherlime');

    const TestContract = require('../build/TestContract.json'); // Path to your etherlime compiled contract json file

    const deploy = async (network, secret) => {

        const deployer = new etherlime.EtherlimeGanacheDeployer();

        const result = await deployer.deploy(TestContract, {}); // Add params separated with ,
    }

    module.exports = { deploy }

### Deploying

Run the following in order to execute the deployment file mentioned
above:

    etherlime deploy

The deployment process is verbose and gives you real-time info about the
performed actions. In addition there is a report of the actions when the
deployment finishes (as not all of us monitor the deployment process
constantly);

Result of `etherlime deploy` would be something like this: [![Deployment
result](./_docs_static/DeploymentResult.png)](https://imgur.com/a/NyLX9mH)

### History of your deploys

In order to see a list of what you've deployed you can run the following
command:

    etherlime history

* * * * *
