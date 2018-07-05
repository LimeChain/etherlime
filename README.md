[![npm version](https://badge.fury.io/js/etherlime.svg)](https://badge.fury.io/js/etherlime) [![travis build status](https://img.shields.io/travis/LimeChain/etherlime/master.svg)](https://travis-ci.org/LimeChain/etherlime) [![travis build status](https://img.shields.io/codecov/c/github/LimeChain/etherlime/master.svg)](https://codecov.io/gh/LimeChain/etherlime)
[![Gitter chat](https://badges.gitter.im/lime-tech-talks/Lobby.png)](https://gitter.im/lime-tech-talks/Lobby)


# etherlime

**etherlime** is an ethereum development and deployment framework based on [ethers.js](https://github.com/ethers-io/ethers.js/).

This framework provides alternative to the other web3.js based frameworks and allows for ultimate control by the developer. It also adds much needed verboseness in the deployment process so that you can be aware of what is really going on (as opposed to the general shooting in the dark technique).

This framework was born out of necessity, hardships and trouble in the development and deployment of ethereum smart contract. We are trying to ease the pain of deployment, compilation and unit testing and add much needed stability to the process. In our mind ethers is much more stable alternative than web3.js for the moment therefore this framework is born.

**Milestones:**
1. Being able to deploy compiled contracts (compiled in the truffle format) on local and infura nodes <---- We are here
2. [Not Ready]Being able to compile contracts to the desired formats for deployment
3. [Not Ready]Being able to run unit tests on the compiled contracts

## Installing

```
npm install etherlime [-g]
```
## Running embedded ganache-cli

For easier integration and usage of the upcoming EtherlimeGanacheDeployer and running local deployments you can use the embedded ganache-cli. It comes with fixed 10 accounts and a lot of eth (191408831393027885698 to be precise)

```
etherlime ganache
```

## Setting up your project to deploy with etherlime

```
etherlime init
```
This will create `deployment` directory with `deploy.js` file inside. You can use this file to write your deployment procedure.

In order to deploy using this file you can use the following file:
```
etherlime deploy [file] [network]
```

Optionally you can use another file as long as you keep the structure of the file (exporting an `async deploy` function with `network` param). You can also optionally provide a `--network` argument to be passed to the deployer. It is up to you how to make sense of it.

The deployment process is verbose and gives you real-time info about the performed actions. In addition there is a report of the actions when the deployment finishes (as not all of us monitor the deployment process constantly);

### History of your deploys
In order to see a list of what you've deployed you can run the following command:
```
etherlime history [limit]
```

By default it returns the last 5 records but you can use the optional `limit` parameter to request less or more entries.

## Quick Deployer Example

```
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

```

Result of `etherlime deploy` would be something like this:
[![Deployment result](DeploymentResult.png)](https://imgur.com/a/NyLX9mH)

For more info check the section below.

## Comprehensive Deployment API

[Documentation](https://etherlime.readthedocs.io/en/latest/)

# License
Completely MIT Licensed. Including ALL dependencies.