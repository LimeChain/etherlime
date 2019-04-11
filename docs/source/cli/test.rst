etherlime test
**************

Syntax
------

::

    etherlime test [path] [timeout] [skip-compilation] [gas-report] [solc-version] [output] [port]

Parameters:

* ``path`` - [Optional] By specifying ``path`` you can set a path to a selected directory or you can set the path directly to the javascript file which contains your tests. By default the ``path`` points to ``./test``.
* ``timeout`` - [Optional] This parameter defines the test timeout in milliseconds. Defaults to 10000 ms.
* ``skip-compilation`` - [Optional] This parameter controls wether a compilation will be ran before the tests are started. Default: false.
* ``gas-report`` - [Optional] Enables Gas reporting future that will show Gas Usage after each test. Default: false.
* ``solc-version`` - [Optional] By specifying ``solc-version`` you can set the version of the solc which will be used for compiling the smart contracts. By default it use the solc version from the node_modules folder.
* ``output`` - [Optional] Defines the way that the logs are shown. Choices: ``none`` - silences the output of logs, ``normal`` - see verbose logs in the console and ``structured`` - structured output in a file meant for inter program communication.
* ``port`` - [Optional] The port that the etherlime ganache is runing. Used for wiring up the default accounts correctly. Defaults to 8545

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
		let owner = accounts[3];
		let deployer;

		beforeEach(async () => {
			deployer = new etherlime.EtherlimeGanacheDeployer(owner.secretKey);
		});

		it('should set correct owner', async () => {
			const BillboardContract = await deployer.deploy(Billboard, {});
			let _owner = await BillboardContract.owner();

			assert.strictEqual(_owner, owner.signer.address, 'Initial contract owner does not match');
		});
	});


execute function from another account
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

::
	
	const etherlime = require('etherlime');
	const ethers = require('ethers');
	const Billboard = require('../build/Billboard.json');

	describe('Example', () => {
		let aliceAccount = accounts[3];
		let deployer;

		beforeEach(async () => {
			deployer = new etherlime.EtherlimeGanacheDeployer(aliceAccount.secretKey);
			const BillboardContract = await deployer.deploy(Billboard, {});
		});

		it('should execute function from another account', async () => {
			let bobsAccount = accounts[4].signer;
			const transaction = await BillboardContract
				.from(bobsAccount /* Could be address or just index in accounts like 3 */)
				.buy('Billboard slogan', { value: ONE_ETHER });
			assert.equal(transaction.from, bobsAccount.address);
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
			const BillboardContract = await deployer.deploy(Billboard, {});

			// Do something with the contract
		});
	});

assert.revert
~~~~~~~~~~~~~

::

	it('should throw if throwing method is called', async () => {
		assert.revert(contract.throwingMethod());
	});

Check if the desired event was broadcasted in the transaction receipt
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

::

    const etherlime = require('etherlime');
    const Billboard = require('../build/Billboard.json');
    const assert = require('chai').assert;

    describe('Billboard', () => {
        let owner = accounts[5];

        it('should emit event', async () => {
            const deployer = new etherlime.EtherlimeGanacheDeployer(owner.secretKey);
            const BillboardContract = await deployer.deploy(Billboard, {});

            const buyTransaction = await BillboardContract.buy('Billboard slogan', { value: 10000 });

            const transactionReceipt = await BillboardContract.verboseWaitForTransaction(buyTransaction);

            const expectedEvent = 'LogBillboardBought';

            assert.isDefined(transactionReceipt.events.find(emittedEvent => emittedEvent.event === expectedEvent, 'There is no such event'));
        });
    });

    
