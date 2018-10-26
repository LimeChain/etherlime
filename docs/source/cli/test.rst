etherlime test
**************

Syntax
------

::

    etherlime test [path] [skip-compilation] [output]

Parameters:

* ``path`` - [Optional] By specifying ``path`` you can set a path to a selected directory or you can set the path directly to the javascript file which contains your tests. By default the ``path`` points to ``./test``.
* ``skip-compilation`` - [Optional] This parameter controls wether a compilation will be ran before the tests are started. Default: false.
* ``output`` - [Optional] Defines the way that the logs are shown. Choices: ``none`` - silences the output of logs, ``normal`` - see verbose logs in the console and ``structured`` - structured output in a file meant for inter program communication.

Global Objects
--------------

We've augmented the test runner with the following things you can use:

* In your unit tests you can use the global ``accounts`` object. It contains the secretKey (private key) and instance of ethers.Wallet of the account.
* The assert object has ``assert.revert(promiseOfFailingTransaction)`` function for testing reverting transactions

Available Utils
---------------

On your disposal there is a global available utils object. Here are the methods it exposes:

	* ``utils.timeTravel(provider, seconds)`` method allowing etherlime ganache to move ``seconds`` ahead. You need to pass your provider from the EtherlimeGanacheDeployer
	* ``utils.setTimeTo(provider, timestamp)`` method allowing etherlime ganache to move to the desired ``timestamp`` ahead. You need to pass your provider from the EtherlimeGanacheDeployer
	* ``utils.snapshot(provider)`` method allowing etherlime ganache to take a **Snapshot** of the current Blockchain data. You can revert back to this snapshot when desired. You need to pass your provider from the EtherlimeGanacheDeployer
	* ``utils.revertState(provider)`` method allowing etherlime ganache to **revert** back to the most recent snapshot. In case you don't have a snapshot it will reset the entire chain data. You need to pass your provider from the EtherlimeGanacheDeployer
	* ``utils.mineBlock(provider)`` method telling the etherlime ganache to mine the next block. You need to pass your provider from the EtherlimeGanacheDeployer
	* ``utils.hasEvent(receipt, contract, eventName)`` allowing the user to check if the desired event was broadcasted in the transaction receipt. You need to pass the Transaction receipt, the contract that emits it and the name of the Event.
	* ``utils.parseLogs(receipt, contract, eventName)`` allowing the user get parsed events from a transaction receipt. You need to pass the Transaction receipt, the contract that emits it and the name of the Event. Always returns an event.

Examples
--------

General Example
~~~~~~~~~~~~~~~

::

	const etherlime = require('etherlime');
	const Billboard = require('../build/Billboard.json');

	describe('Example', () => {
		let accountFour = accounts[3];
		let deployer;

		beforeEach(async () => {
			deployer = new etherlime.EtherlimeGanacheDeployer(accountFour.secretKey);
		});

		it('should set correct owner', async () => {
			const deployedContractWrapper = await deployer.deploy(Billboard, {});
			const contract = deployedContractWrapper.contract;
			let _owner = await contract.owner();

			assert.strictEqual(_owner, owner.wallet.address, 'Initial contract owner does not match');
		});
	});


accounts
~~~~~~~~

::

	const Billboard = require('../build/Billboard.json');
	const etherlime = require('etherlime');

	describe('Billboard', () => {
		let owner = accounts[5];

		it('should initialize contract with correct values', async () => {
			const deployer = new etherlime.EtherlimeGanacheDeployer(owner.secretKey);
			const deployedContractWrapper = await deployer.deploy(Billboard, {});

			// Do something with the contract
		});
	});

assert.revert
~~~~~~~~~~~~~

::

	it('should throw if throwing method is called', async () => {
		assert.revert(contract.throwingMethod());
	});

utils.parseLogs
~~~~~~~~~~~~~~~

::

	it('should emit correct logs', async () => {
		let tx = await contract.someMethodWithEvents();

		let txReceipt = await provider.getTransactionReceipt(tx.hash);

		const logs = utils.parseLogs(txReceipt, contract, 'CertainEvent');

		assert(logs.length > 0, "No event was thrown")
	});

    