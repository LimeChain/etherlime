# Deployer

## Deployer functionality

The main functionality the deployer exposes is (obviously) the ability
to deploy compiled contract.

This is achieved through the `deploy(contract, [libraries], [params])`
function.

### deploy(contract, \[libraries\], \[params\])

Parameters:

  - `contract` - descriptor object for contract to be deployed. More
    details below
  - `libraries` - key-value object containing all libraries which will
    be linked to the contract.
  - `params` - the constructor params you'd need to pass on deploy (if
    there are any)

The contract is descriptor object that needs to have atleast the
following three fields:

  - `contractName` - the name of the contract
  - `abi` - the abi interface of the contract
  - `bytecode` - the compiled bytecode

The easiest way to get such descriptor is to compile your solidity files
via <span class="title-ref">etherlime compile</span>

The libraries object should be in the following format:

```javascript
    {
        libraryName0: '0xAddressOfLibrary0',
        libraryName1: '0xAddressOfLibrary1'
    }
```

If the contract to be deployed doesn't contains any libraries, `{}`,
`undefined`, `null`, `false` or `0` can be passed. For convenience we
have made the deploy function to work even without this parameter
passed.

Example

Linking libraries

 ```javascript
    const contractUsingQueueAndLinkedList = require('...');
    
    const libraries = {
        Queue: '0x655341AabD39a5ee0939796dF610aD685a984C53,
        LinkedList: '0x619acBB5Dafc5aC340B6de4821835aF50adb29c1'
    }
    
    await deployer.deploy(contractUsingQueueAndLinkedList, libraries);
```

Skipping linking on contract without arguments

 ```javascript
    const contractWithoutLibraries = require('...');
    
    await deployer.deploy(contractWithoutLibraries);
```

Skipping linking on contract with arguments

 ```javascript
    const contractWithoutLibraries = require('...');
    
    await deployer.deploy(contractWithoutLibraries, false, param1, param2);
```

### estimateGas(contract, \[libraries\], \[params\])

Estimates the gas that this transaction is going to cost you.

Parameters:

  - `contract` - descriptor object for contract to be deployed
  - `libraries` - key-value object containing all libraries which will
    be linked to the contract.
  - `params` - the constructor params you'd need to pass on deploy (if
    there are any)

The contract is descriptor object is the same as above.

Example :

 ```javascript
    const estimate = await deployer.estimateGas(TestContract, randomParam1, randomParam2);
    // returns something like "2470692"
```

## Deployers

# InfuraPrivateKeyDeployer

    InfuraPrivateKeyDeployer(privateKey, network, apiKey, [defaultOverrides])

Parameters:

  - `privateKey` - The private key to the deployment wallet/signer
    instance
  - `network` - network as found in `ethers.providers.networks`
  - `apiKey` - your Infura API key
  - `defaultOverrides` - \[Optional\] object overriding the deployment
    settings for `gasPrice` , `gasLimit` and `chainId`.

<!-- end list -->

 ```javascript
    const etherlime = require('etherlime');
    
    const TestContract = require('./TestContract.json');
    
    const defaultConfigs = {
        gasPrice: 20000000000,
        gasLimit: 4700000,
        chainId: 0 // Suitable for deploying on private networks like Quorum
    }
    
    const deploy = async (network, secret) => {
    
        const deployer = new etherlime.InfuraPrivateKeyDeployer('Your Private Key Goes Here',
           'ropsten', 'Your Infura API Key', defaultConfigs);
    
        const result = await deployer.deploy(TestContract, '0xda8a06f1c910cab18ad187be1faa2b8606c2ec86', 1539426974);
    }
```

## Setters

>   - <span class="title-ref">provider</span> . setPrivateKey
>     (privateKey)
>     
>       - `privateKey` - The private key to the deployment wallet/signer
>         instance
> 
>   - <span class="title-ref">provider</span> . setNetwork (network)
>     
>       - `network` - network as found in `ethers.providers.networks`
> 
>   - <span class="title-ref">provider</span> . setApiKey (apiKey)
>     
>       - `apiKey` - your Infura API key
> 
>   - <span class="title-ref">provider</span> . setDefaultOverrides
>     (defaultOverrides)
>     
>       - `defaultOverrides` - object overriding the deployment settings
>         for `gasPrice` , `gasLimit` and `chainId`.
> 
>   - <span class="title-ref">provider</span> . setSigner (signer)
>     
>       - `signer` - ethers.Wallet instance
> 
>   - <span class="title-ref">provider</span> . setProvider (provider)
>     
>       - `provider` - ethers.provider instance

Example :

 ```javascript
    const deployer = new etherlime.InfuraPrivateKeyDeployer(privateKey,
       network, apiKey, defaultConfigs);
    const newNetwork = 'ropsten';
    deployer.setNetwork(newNetwork);
```

# JSONRPCPrivateKeyDeployer

    JSONRPCPrivateKeyDeployer(privateKey, nodeUrl, [defaultOverrides])

Parameters:

  - `privateKey` - The private key to the deployment wallet/signer
    instance
  - `nodeUrl` - the url to the node you are trying to connect (local or
    remote)
  - `defaultOverrides` - \[Optional\] object overriding the deployment
    settings for `gasPrice` , `gasLimit` and `chainId`.

<!-- end list -->

 ```javascript
    const etherlime = require('etherlime');
    
    const TestContract = require('./TestContract.json');
    
    const defaultConfigs = {
        gasPrice: 20000000000,
        gasLimit: 4700000,
        chainId: 0 // Suitable for deploying on private networks like Quorum
    }
    
    const deploy = async (network, secret) => {
    
        const deployer = new etherlime.JSONRPCPrivateKeyDeployer('Your Private Key Goes Here',
           'http://localhost:8545/', defaultConfigs);
    
        const result = await deployer.deploy(TestContract);
    }
```

## Setters

>   - <span class="title-ref">provider</span> . setPrivateKey
>     (privateKey)
>     
>       - `privateKey` - The private key to the deployment wallet/signer
>         instance
> 
>   - <span class="title-ref">provider</span> . setNodeUrl (nodeUrl)
>     
>       - `nodeUrl` - the url to the node you are trying to connect
>         (local or remote)
> 
>   - <span class="title-ref">provider</span> . setDefaultOverrides
>     (defaultOverrides)
>     
>       - `defaultOverrides` - object overriding the deployment settings
>         for `gasPrice` , `gasLimit` and `chainId`.
> 
>   - <span class="title-ref">provider</span> . setSigner (signer)
>     
>       - `signer` - ethers.Wallet instance
> 
>   - <span class="title-ref">provider</span> . setProvider (provider)
>     
>       - `provider` - ethers.provider instance

Example :

 ```javascript
    const deployer = new etherlime.JSONRPCPrivateKeyDeployer(privateKey,
       nodeUrl, defaultOverrides);
    const newNodeUrl = http://localhost:9545;
    deployer.setNodeUrl(newNodeUrl);
```


# EtherlimeGanacheDeployer

    EtherlimeGanacheDeployer([privateKey], [port], [defaultOverrides])

Parameters:

  - `privateKey` - \[Optional\] The private key to the deployment
    wallet/signer instance. Defauts to the first one in the
    <span class="title-ref">etherlime ganache</span>
  - `port` - \[Optional\] the port you've ran the etherlime ganache on.
    Defaults to 8545.
  - `defaultOverrides` - \[Optional\] object overriding the deployment
    settings for `gasPrice` , `gasLimit` and `chainId`.

**This deployer only works with etherlime ganache**

 ```javascript
    const etherlime = require('etherlime');
    
    const TestContract = require('./TestContract.json');
    
    const defaultConfigs = {
        gasPrice: 20000000000,
        gasLimit: 4700000,
        chainId: 0 // Suitable for deploying on private networks like Quorum
    }
    
    const deploy = async (network, secret) => {
    
        const deployer = new etherlime.EtherlimeGanacheDeployer();
    
        const result = await deployer.deploy(TestContract);
    }
```

## Setters

>   - <span class="title-ref">provider</span> . setPrivateKey
>     (privateKey)
>     
>       - `privateKey` - The private key to the deployment wallet/signer
>         instance
> 
>   - <span class="title-ref">provider</span> . setPort (port)
>     
>       - `port` - the port you've ran the etherlime ganache on.
> 
>   - <span class="title-ref">provider</span> . setDefaultOverrides
>     (defaultOverrides)
>     
>       - `defaultOverrides` - object overriding the deployment settings
>         for `gasPrice` , `gasLimit` and `chainId`.
> 
>   - <span class="title-ref">provider</span> . setNodeUrl (nodeUrl)
>     
>       - `nodeUrl` - the url to the node you are trying to connect
>         (local or remote)
> 
>   - <span class="title-ref">provider</span> . setSigner (signer)
>     
>       - `signer` - ethers.Wallet instance
> 
>   - <span class="title-ref">provider</span> . setProvider (provider)
>     
>       - `provider` - ethers.provider instance

Example :

 ```javascript
    const deployer = new etherlime.EtherlimeGanacheDeployer();
    const port = 9545;
    deployer.setPort(port);
 ```