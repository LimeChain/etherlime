# Quick Start

## Installing

    npm i -g etherlime

## Running embedded ganache-cli

    etherlime ganache

<span class="title-ref">Allows the use of
EtherlimeGanacheDeployer</span>

## Deploying with etherlime

### Initialize etherlime

    etherlime init

This will create `deployment` directory with `deploy.js` file inside.
You can use this file to write your deployment procedure.

### Deployer Example

    const etherlime = require('etherlime');

    // Path to your etherlime compiled contract json file
    const TestContract = require('../build/TestContract.json'); 
    
    const deploy = async (network, secret) => {
    
        const deployer = new etherlime.EtherlimeGanacheDeployer();
    
        // Add params separated with ,
        const result = await deployer.deploy(TestContract, {});
    }
    
    module.exports = { deploy }

### Verifying Smart Contract Example

    const etherlime = require('etherlime');
    // Path to your etherlime compiled contract json file
    const TestContract = require('../build/TestContract.json'); 
    
    const deploy = async (network, secret, apiKey) => {
        deployer.defaultOverrides = { apiKey };
        const deployer = new etherlime.InfuraPrivateKeyDeployer(secret, network,
            "INFURA_API_KEY");
    
        // Add params separated with ,
        const result = await deployer.deployAndVerify(TestContract, {});
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

Result of `etherlime deploy` would be something like this:
<br>
<img src="./_docs_static/DeploymentResult.png">


### History of your deploys

In order to see a list of what you've deployed you can run the following
command:

    etherlime history

-----