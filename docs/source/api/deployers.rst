Deployer
********

Deployer functionality
----------------------

The main functionality the deployer exposes is (obviously) the ability
to deploy compiled contract.

This is achieved through the ``deploy(contract, [libraries], [params])`` function. 

deploy(contract, [libraries], [params])
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Parameters:

* ``contract`` - descriptor object for contract to be deployed. More details below
* ``libraries`` - key-value object containing all libraries which will be linked to the contract.
* ``params`` - the constructor params you'd need to pass on deploy (if there are any)

The contract is descriptor object that needs to have atleast the following three fields: 

* ``contractName`` - the name of the contract 
* ``abi`` - the abi interface of the contract
* ``bytecode`` - the compiled bytecode

The easiest way to get such descriptor is to compile your solidity files via `etherlime compile`

The libraries object should be in the following format:

::

    {
        libraryName0: '0xAddressOfLibrary0',
        libraryName1: '0xAddressOfLibrary1'
    }

If the contract to be deployed doesn't contains any libraries, ``{}``, ``undefined``, ``null``, ``false`` or ``0`` can be passed. For convenience we have made the deploy function to work even without this parameter passed.

Example

Linking libraries

::

    const contractUsingQueueAndLinkedList = require('...');

    const libraries = {
        Queue: '0x655341AabD39a5ee0939796dF610aD685a984C53,
        LinkedList: '0x619acBB5Dafc5aC340B6de4821835aF50adb29c1'
    }

    await deployer.deploy(contractUsingQueueAndLinkedList, libraries);

Skipping linking on contract without arguments

::

    const contractWithoutLibraries = require('...');

    await deployer.deploy(contractWithoutLibraries);

Skipping linking on contract with arguments

::

    const contractWithoutLibraries = require('...');

    await deployer.deploy(contractWithoutLibraries, false, param1, param2);


deployAndVerify(contract, [libraries], [params])
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The main functionality the deployAndVerify exposes is (obviously) the ability
to deploy and then verify compiled contract on Etherscan. This method exposes the same features as `deploy` method, but in addition automatically verifies the deployed smart contract using Etherscan API with Etherscan API Key.

In order to use the `deployAndVerify` method of the deployer, an Etherscan API Key is used. You can create your Etherscan API Key here_.

.. _here: https://etherscan.io/login?cmd=last

Parameters:

* ``contract`` - descriptor object for contract to be deployed. More details below
* ``libraries`` - key-value object containing all libraries which will be linked to the contract.
* ``params`` - the constructor params you'd need to pass on deploy (if there are any)

The deployment method reads the API Key form the deployer `defaultOverrides` object.

Passing API Key to the deployer:

* Passing the API Key to the `defaultOverrides` object:

:: 

    deployer.defaultOverrides = { gasLimit: 4700000, gasPrice: 3000000000, etherscanApiKey: '3DQYBPZZS77YDR15NKJHURVTV9WI2KH6UY' };

* Setting the API Key through the deployer `setVerifierApiKey` setter:

::

    deployer.setVerifierApiKey('3DQYBPZZS77YDR15NKJHURVTV9WI2KH6UY')


* Passing the API Key from `etherlime deploy` command with optional parameter `etherscanApiKey`:
    `etherlime deploy --secret="Your private key" --network="rinkeby" --etherscanApiKey="3DQYBPZZS77YDR15NKJHURVTV9WI2KH6UY"` 

::

    const deploy = async (network, secret, etherscanApiKey) => {
    const deployer = new etherlime.InfuraPrivateKeyDeployer(secret, network, "INFURA_API_KEY");
    deployer.defaultOverrides = { gasLimit: 4700000, gasPrice: 3000000000, etherscanApiKey };
    };

Network is automatically detected based on the network that the deployer is set to deploy. The supported networks are:

* ``mainnet``
* ``ropsten``
* ``rinkeby``
* ``kovan``
* ``goerli``


estimateGas(contract, [libraries], [params])
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Estimates the gas that this transaction is going to cost you.

Parameters:

* ``contract`` - descriptor object for contract to be deployed
* ``libraries`` - key-value object containing all libraries which will be linked to the contract.
* ``params`` - the constructor params you'd need to pass on deploy (if there are any)

The contract is descriptor object is the same as above.

Example
::

    const estimate = await deployer.estimateGas(TestContract, randomParam1, randomParam2);
    // returns something like "2470692"

Deployers
---------

InfuraPrivateKeyDeployer
~~~~~~~~~~~~~~~~~~~~~~~~

::

    InfuraPrivateKeyDeployer(privateKey, network, apiKey, [defaultOverrides])

Parameters:

* ``privateKey`` - The private key to the deployment wallet/signer instance
* ``network`` - network as found in ``ethers.providers.networks``
* ``apiKey`` - your Infura API key
* ``defaultOverrides`` - [Optional] object overriding the deployment settings for ``gasPrice`` , ``gasLimit`` and ``chainId``.

::

    const etherlime = require('etherlime');

    const TestContract = require('./TestContract.json');

    const defaultConfigs = {
        gasPrice: 20000000000,
        gasLimit: 4700000,
        chainId: 0 // Suitable for deploying on private networks like Quorum
    }

    const deploy = async (network, secret) => {

        const deployer = new etherlime.InfuraPrivateKeyDeployer('Your Private Key Goes Here', 'ropsten', 'Your Infura API Key', defaultConfigs);
        
        const result = await deployer.deploy(TestContract, '0xda8a06f1c910cab18ad187be1faa2b8606c2ec86', 1539426974);
    }

Setters
^^^^^^^

    `deployer` . setPrivateKey (privateKey)
        * ``privateKey`` - The private key to the deployment wallet/signer instance

    `deployer` . setNetwork (network)
        * ``network`` - network as found in ``ethers.providers.networks``

    `deployer` . setApiKey (apiKey)
        * ``apiKey`` - your Infura API key

    `deployer` . setDefaultOverrides (defaultOverrides)
        * ``defaultOverrides`` - object overriding the deployment settings for ``gasPrice`` , ``gasLimit`` and ``chainId``.

    `deployer` . setSigner (signer)
        * ``signer`` - ethers.Wallet instance

    `deployer` . setProvider (provider)
        * ``provider`` - ethers.provider instance

    `deployer` . setVerifierApiKey (etherscanApiKey)
        * ``etherscanApiKey`` - Etherscan API Key

Example
::

    const deployer = new etherlime.InfuraPrivateKeyDeployer(privateKey, network, apiKey, defaultConfigs);
    const newNetwork = 'ropsten';
	deployer.setNetwork(newNetwork);

JSONRPCPrivateKeyDeployer
~~~~~~~~~~~~~~~~~~~~~~~~~

::

    JSONRPCPrivateKeyDeployer(privateKey, nodeUrl, [defaultOverrides])

Parameters:

* ``privateKey`` - The private key to the deployment wallet/signer instance
* ``nodeUrl`` - the url to the node you are trying to connect (local or remote)
* ``defaultOverrides`` - [Optional] object overriding the deployment settings for ``gasPrice`` , ``gasLimit`` and ``chainId``.

::

    const etherlime = require('etherlime');

    const TestContract = require('./TestContract.json');

    const defaultConfigs = {
        gasPrice: 20000000000,
        gasLimit: 4700000,
        chainId: 0 // Suitable for deploying on private networks like Quorum
    }

    const deploy = async (network, secret) => {

        const deployer = new etherlime.JSONRPCPrivateKeyDeployer('Your Private Key Goes Here', 'http://localhost:8545/', defaultConfigs);
        
        const result = await deployer.deploy(TestContract);
    }

Setters
^^^^^^^

    `deployer` . setPrivateKey (privateKey)
        * ``privateKey`` - The private key to the deployment wallet/signer instance

    `deployer` . setNodeUrl (nodeUrl)
        * ``nodeUrl`` - the url to the node you are trying to connect (local or remote)

    `deployer` . setDefaultOverrides (defaultOverrides)
        * ``defaultOverrides`` - object overriding the deployment settings for ``gasPrice`` , ``gasLimit`` and ``chainId``.

    `deployer` . setSigner (signer)
        * ``signer`` - ethers.Wallet instance

    `deployer` . setProvider (provider)
        * ``provider`` - ethers.provider instance

    `deployer` . setVerifierApiKey (etherscanApiKey)
        * ``etherscanApiKey`` - Etherscan API Key

Example
::

    const deployer = new etherlime.JSONRPCPrivateKeyDeployer(privateKey, nodeUrl, defaultOverrides);
 	const newNodeUrl = http://localhost:9545;
	deployer.setNodeUrl(newNodeUrl);

EtherlimeGanacheDeployer
~~~~~~~~~~~~~~~~~~~~~~~~

::

    EtherlimeGanacheDeployer([privateKey], [port], [defaultOverrides])

Parameters:

* ``privateKey`` - [Optional] The private key to the deployment wallet/signer instance. Defauts to the first one in the `etherlime ganache`
* ``port`` - [Optional] the port you've ran the etherlime ganache on. Defaults to 8545.
* ``defaultOverrides`` - [Optional] object overriding the deployment settings for ``gasPrice`` , ``gasLimit`` and ``chainId``.

**This deployer only works with etherlime ganache**

::

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

Setters
^^^^^^^

    `deployer` . setPrivateKey (privateKey)
        * ``privateKey`` - The private key to the deployment wallet/signer instance

    `deployer` . setPort (port)
        * ``port`` - the port you've ran the etherlime ganache on.

    `deployer` . setDefaultOverrides (defaultOverrides)
        * ``defaultOverrides`` - object overriding the deployment settings for ``gasPrice`` , ``gasLimit`` and ``chainId``.

    `deployer` . setNodeUrl (nodeUrl)
        * ``nodeUrl`` - the url to the node you are trying to connect (local or remote)

    `deployer` . setSigner (signer)
        * ``signer`` - ethers.Wallet instance

    `deployer` . setProvider (provider)
        * ``provider`` - ethers.provider instance

    `deployer` . setVerifierApiKey (etherscanApiKey)
        * ``etherscanApiKey`` - Etherscan API Key

Example
::

    const deployer = new etherlime.EtherlimeGanacheDeployer();
    const port = 9545;
	deployer.setPort(port);



ZosJSONRPCPrivateKeyDeployer
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

::

    ZosJSONRPCPrivateKeyDeployer(privateKey, nodeUrl, [defaultOverrides])

Parameters:

* ``privateKey`` - The private key to the deployment wallet/signer instance
* ``nodeUrl`` - the url to the node you are trying to connect (local or remote)
* ``defaultOverrides`` - [Optional] object overriding the deployment settings for ``gasPrice`` , ``gasLimit`` and ``chainId``.

::

    const etherlime = require('etherlime');

    const TestContract = require('./TestContract.json');

    const defaultConfigs = {
        gasPrice: 20000000000,
        gasLimit: 4700000,
        chainId: 0 // Suitable for deploying on private networks like Quorum
    }

    const deploy = async (network, secret) => {

        const deployer = new etherlime.ZosJSONRPCPrivateKeyDeployer('Your Private Key Goes Here', 'http://localhost:8545/', defaultConfigs);
        
        const result = await deployer.deploy(TestContract);
    }

Setters
^^^^^^^

    `provider` . setPrivateKey (privateKey)
        * ``privateKey`` - The private key to the deployment wallet/signer instance

    `provider` . setNodeUrl (nodeUrl)
        * ``nodeUrl`` - the url to the node you are trying to connect (local or remote)

    `provider` . setDefaultOverrides (defaultOverrides)
        * ``defaultOverrides`` - object overriding the deployment settings for ``gasPrice`` , ``gasLimit`` and ``chainId``.

    `provider` . setSigner (signer)
        * ``signer`` - ethers.Wallet instance

    `provider` . setProvider (provider)
        * ``provider`` - ethers.provider instance

Example
::

    const deployer = new etherlime.ZosJSONRPCPrivateKeyDeployer(privateKey, nodeUrl, defaultOverrides);
 	const newNodeUrl = http://localhost:9545;
	deployer.setNodeUrl(newNodeUrl);