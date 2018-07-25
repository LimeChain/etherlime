Deployer
********

Deployer functionality
----------------------

The main functionality the deployer exposes is (obviously) the ability
to deploy compiled contract.

This is achieved through the ``deploy(contract, [params])`` function. 

deploy(contract, libraries, [params])
~~~~~~~~~~~~~~~~~~~~~~~~~~

Parameters:

* ``contract`` - descriptor object for contract to be deployed. More details below
* ``libraries`` - key-value object containing all libraries which will be linked to the contract.
* ``params`` - the constructor params you'd need to pass on deploy (if there are any)

The contract is descriptor object that needs to have atleast the following three fields: 

* ``contractName`` - the name of the contract 
* ``abi`` - the abi interface of the contract
* ``bytecode`` - the compiled bytecode

The libraries object should be in the following format:

::

    {
        "lib1_Name": "lib1_Address",
        "lib2_Name": "lib2_Address"
    }

If the contract to be deployed doesn't contains any libraries an ``{}``, ``undefined``, ``null``, ``false`` or ``0`` can be passed. For convenience we have made the deploy function to work even without this parameter passed.

estimateGas(contract, [params])
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Estimates the gas that this transaction is going to cost you.

Parameters:

* ``contract`` - descriptor object for contract to be deployed
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

* ``privateKey`` - The private key to the deployment wallet
* ``network`` - network as found in ``ethers.providers.networks``
* ``apiKey`` - your Infura API key
* ``defaultOverrides`` - [Optional] object overiding the deployment settings for ``gasPrice`` and ``gasLimit``.

::

    const etherlime = require('etherlime');

    const TestContract = require('./TestContract.json');

    const defaultConfigs = {
        gasPrice: 20000000000,
        gasLimit: 4700000
    }

    const deploy = async (network, secret) => {

        const deployer = new etherlime.InfuraPrivateKeyDeployer('Your Private Key Goes Here', 'ropsten', 'Your Infura API Key', defaultConfigs);
        
        const result = await deployer.deploy(TestContract, '0xda8a06f1c910cab18ad187be1faa2b8606c2ec86', 1539426974);
    }


JSONRPCDeployer
~~~~~~~~~~~~~~~

::

    JSONRPCDeployer(privateKey, nodeUrl, [defaultOverrides])

Parameters:

* ``privateKey`` - The private key to the deployment wallet
* ``nodeUrl`` - the url to the node you are trying to connect (local or remote)
* ``defaultOverrides`` - [Optional] object overiding the deployment settings for ``gasPrice`` and ``gasLimit``.

::

    const etherlime = require('etherlime');

    const TestContract = require('./TestContract.json');

    const defaultConfigs = {
        gasPrice: 20000000000,
        gasLimit: 4700000
    }

    const deploy = async (network, secret) => {

        const deployer = new etherlime.JSONRPCDeployer('Your Private Key Goes Here', 'http://localhost:8545/', defaultConfigs);
        
        const result = await deployer.deploy(TestContract);
    }


EtherlimeGanacheDeployer
~~~~~~~~~~~~~~~~~~~~~~~~

::

    EtherlimeGanacheDeployer([privateKey], [port], [defaultOverrides])

Parameters:

* ``privateKey`` - [Optional] The private key to the deployment wallet. Defauts to the first one in the `etherlime ganache`
* ``port`` - [Optional] the port you've ran the etherlime ganache on. Defaults to 8545.
* ``defaultOverrides`` - [Optional] object overiding the deployment settings for ``gasPrice`` and ``gasLimit``.

**This deployer only works with etherlime ganache**

::

    const etherlime = require('etherlime');

    const TestContract = require('./TestContract.json');

    const defaultConfigs = {
        gasPrice: 20000000000,
        gasLimit: 4700000
    }

    const deploy = async (network, secret) => {

        const deployer = new etherlime.EtherlimeGanacheDeployer();
        
        const result = await deployer.deploy(TestContract);
    }


