Deployed Contract Wrapper
*************************

Wrappers
--------

One of the advancements of the etherlime is the result of the deployment
- the ``DeployedContractWrapper``

The ``DeployedContractWrapper`` is a powerful object that provides you
with ``ethers.Contract`` amongst other functionalities. This allows you
to start using your deployed contract right away as part of your
deployment sequence (f.e. you can call initialization methods)

In addition it exposes you
``verboseWaitForTransaction(transaction, transactionLabel)`` function.
This function can be used to wait for transaction to be mined while
giving you verbose output of the state. In addition it allows you to
specify a label for the transaction you are waiting for, so that you can
get a better understanding of what transaction is being waited for. This
comes in handy when deployment scripts start to grow.

::

    const contractWrapper = await deployer.deploy(ICOTokenContract);
    const transferTransaction = await contractWrapper.transferOwnership(randomAddress);
    const result = await contractWrapper.verboseWaitForTransaction(transferTransaction, 'Transfer Ownership');


If you are working with EtherlimeGanacheDeployer you will have the ``from`` method at your disposal. It will allow you to call certain methods from other default accounts.

::

    const deployer = new etherlime.EtherlimeGanacheDeployer();
    const contractWrapper = await deployer.deploy(SomeContract);
    const tx = await contractWrapper.from(0 /* could be string address or ethers.Wallet instance*/).someFunction(params);
    const result = await contractWrapper.verboseWaitForTransaction(tx);

Working with previously deployed contracts
------------------------------------------

Sometimes you want to work with already deployed contract. The deployer
object allows you to wrap such an deployed contract by it's address and
continue using the power of the wrapper object. The function you can use
to achieve this is ``wrapDeployedContract(contract, contractAddress)``.

::

    const deployedContractWrapper = deployer.wrapDeployedContract(SomeContractWithInitMethod, alreadyDeployedContractAddress);

    const initTransaction = await deployedContractWrapper.contract.init(randomParam, defaultConfigs);
    const result = await deployedContractWrapper.verboseWaitForTransaction(initTransaction, 'Init Contract');