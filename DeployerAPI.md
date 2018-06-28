## Deployer API

**etherlime** exposes the following deployers:
- `InfuraPrivateKeyDeployer(privateKey, network, apiKey, [defaultOverrides])` - given private key to the deployment wallet, the network (as found in `ethers.providers.networks`), your infura API key and default deployment settings object for `gasPrice` and `gasLimit` it exposes you a deployer object.  (Check the example bellow for how to use the default config settings)

- `JSONRPCDeployer(privateKey, nodeUrl, [defaultOverrides])` - given private key to the deployment wallet, the url to the node you are trying to connect (local or remote) and default deployment settings object for `gasPrice` and `gasLimit` it exposes you a deployer object.

- `EtherlimeGanacheDeployer([privateKey], [port], [defaultOverrides])` - This deployer allows you to deploy on etherlime ganache. It takes privateKey, port and defaultOverrides as optional parameters. If not passed, the optional parameters are taken as follows:
`privateKey` - default value is taken from the first deployed account from ehterlime ganache. You can find the default 10 private key accounts in /cli-commands/ganache/setup.json file;
`port` - default value is taken from the /cli-commands/ganache/setup.json file;
`defaultOverrides` - default values that are presented in Deployer.js;


All deployers share the same base functionality:

### Deployer functionality

The main functionality the deployer exposes is (obviously) the ability to deploy compiled contract.

This is achieved through the `deploy(contract)` function. As mentioned before, the contract is descriptor object that needs to have atleast the following three fields:
- `contractName` - the name of the contract
- `abi` - the abi interface of the contract
- `bytecode` - the compiled bytecode

 *All of these you can get by compiling with Truffle. We will soon expose you a way to do this through etherlime.*

 **Example**

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

### Deployed Contract Wrapper
One of the advancements of the etherlime is the result of the deployment - the `DeployedContractWrapper`

The `DeployedContractWrapper` is a powerful object that provides you with `ethers.Contract` amongst other functionalities. This allows you to start using your deployed contract right away as part of your deployment sequence (f.e. you can call initialization methods)

In addition it exposes you `verboseWaitForTransaction(transactionHash, transactionLabel)` function. This function can be used to wait for transaction to be mined while giving you verbose output of the state. In addition it allows you to specify a label for the transaction you are waiting for, so that you can get a better understanding of what transaction is being waited for. This comes in handy when deployment scripts start to grow.


**Example**
```
const contractWrapper = await deployer.deploy(ICOTokenContract);
const transferTransaction = await contractWrapper.contract.transferOwnership(randomAddress);
const result = await contractWrapper.verboseWaitForTransaction(transferTransaction.hash, 'Transfer Ownership');
```

### Working with previously deployed contracts

Sometimes you want to work with already deployed contract. The deployer object allows you to wrap such an deployed contract by it's address and continue using the power of the wrapper object. The function you can use to achieve this is `wrapDeployedContract(contract, contractAddress)`.

**Example**
```
const deployedContractWrapper = deployer.wrapDeployedContract(SomeContractWithInitMethod, alreadyDeployedContractAddress);

const initTransaction = await deployedContractWrapper.contract.init(randomParam, defaultConfigs);
const result = await deployedContractWrapper.verboseWaitForTransaction(initTransaction.hash, 'Init Contract');
```