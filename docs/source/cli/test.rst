etherlime test
**************

::

    etherlime test [path] [skip-compilation] [output]

Parameters:

* ``path`` - [Optional] By specifying ``path`` you can set a path to a selected directory or you can set the path directly to the javascript file which contains your tests. By default the ``path`` points to ``./test``.
* ``skip-compilation`` - [Optional] This parameter controls wether a compilation will be ran before the tests are started. Default: false.
* ``output`` - [Optional] Defines the way that the logs are shown. Choices: ``none`` - silences the output of logs, ``normal`` - see verbose logs in the console and ``structured`` - structured output in a file meant for inter program communication.

We've augmented the test runner with the following things you can use:

* In your unit tests you can use the global ``accounts`` object. It contains the secretKey (private key) and instance of ethers.Wallet of the account.
* The assert object has ``assert.revert(promiseOfFailingTransaction)`` function for testing reverting transactions

* There is a global utils object. Holding the following util methods:
	*  ``timeTravel(provider, seconds)`` method allowing etherlime ganache to move ``seconds`` ahead. You need to pass your provider from the EtherlimeGanacheDeployer
	* ``setTimeTo(provider, timestamp)`` method allowing etherlime ganache to move to the desired ``timestamp`` ahead. You need to pass your provider from the EtherlimeGanacheDeployer
	*  ``snapshot(provider)`` method allowing etherlime ganache to take a **Snapshot** of the current Blockchain data. You can revert back to this snapshot when desired. You need to pass your provider from the EtherlimeGanacheDeployer
	*  ``revertState(provider)`` method allowing etherlime ganache to **revert** back to the most recent snapshot. In case you don't have a snapshot it will reset the entire chain data. You need to pass your provider from the EtherlimeGanacheDeployer
	* ``mineBlock(provider)`` method telling the etherlime ganache to mine the next block. You need to pass your provider from the EtherlimeGanacheDeployer
	* ``hasEvent(tx, eventName)`` allowing the user to check if the desired event was broadcasted in the transaction. You need to pass the T ransaction and the Name of the Event.
    