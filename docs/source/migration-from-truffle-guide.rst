Migration from Truffle to Etherlime
***********************************

Install & Initialize Etherlime
------------------------------

::

    npm i -g etherlime

Install the global etherlime to allow you to run ``etherlime`` commands.

::

    etherlime init

The command will add to your project structure the following parts:

    - ./contracts/LimeFactory.sol
    - ./deployment/deploy.js
    - ./test/exampleTest.js

Note! These are added just to give you an example. You can remove them.



Write new scripts for deployment using the template provided
------------------------------------------------------------

- **require etherlime module**
    
- **require the compiled contract** from ./build folder not the contract itself

*with Truffle*
::

    const LimeFactory = artifacts.require("./LimeFactory.sol");

*with Etherlime*
::

    const etherlime = require('etherlime')
    const LimeFactory = require('../build/LimeFactory.json');

- **set the deployer and then deploy the contract**

*Local deployment with Etherlime*
::

    const etherlime = require('etherlime')
    const LimeFactory = require('../build/LimeFactory.json');
    const InterfaceFactory = require('../build/InterfaceFactory.json')

    const deployer = new etherlime.EtherlimeGanacheDeployer();
    const limeFactory = await deployer.deploy(LimeFactory);

    //example how to wrap deployed contract and to pass its address
    const contractInstance = await etherlime.ContractAt(InterfaceFactory, limeFactory.contractAddress)


Find more examples for deployment `here <https://etherlime.readthedocs.io/en/latest/api/deployers.html>`_.

----

Modify tests
------------

In order to modify the tests from Truffle to Etherlime, slight changes are needed to be done:

*with Truffle*
::

    const LimeFactory = artifacts.require("./LimeFactory.sol");

    contract('LimeFactory tests', async (accounts) => {

        let owner = accounts[0];

        beforeEach(async function() {
            limeFactory = await LimeFactory.new();
        });

        it('should do something', () => {

        })
    }

*with Etherlime*
::

    // step1: require Etherlime module
    const etherlime = require('etherlime')

    // step2: require compiled contract from ./build not the .sol file (as in deployment scripts)
    const LimeFactory = require('../build/LimeFactory.json')


    // step4: replace 'contract' descriptor to 'describe' then remove (accounts) param in async function 
    describe('LimeFactory tests', async () => {

        // step5: initialize account
        let owner = accounts[0];

        // step6: set the deployer in before/beforeEach and fix the deployment scripts as we did before
        beforeEach(async function() {

            deployer = new etherlime.EtherlimeGanacheDeployer(owner.secretKey);
            limeFactory = await deployer.deploy(LimeFactory);

        });

        it('should do something', () => {

        })
    })

Flexibility
~~~~~~~~~~~

- **in case you want to use an address of an account, you must extend it to** ``let owner = accounts[0].signer.address``
- **when a contract’s method is called, the default sender is set to accounts[0]. If you want to execute it from another account, replace** ``{from: anotherAccount}`` object with ``.from(anotherAccount)``. 

*with Truffle*
::

    await limeFactory.createLime(newLime' 0, 10, 12, {from: accounts[1]})


*with Etherlime*
::

    await limeFactory.from(2).createLime('newLime' 0, 10, 12);

    // as a param you may also use:
    await limeFactory.from(accounts[1]).createLime('newLime' 0, 10, 12);
    await limeFactory.from(accounts[1].signer).createLime('newLime' 0, 10, 12);
    await limeFactory.from(accounts[1].signer.address).createLime('newLime' 0, 10, 12);
    await limeFactory.from(customSigner).createLime('newLime' 0, 10, 12);

- **when you need to execute payable function, pass the value as an object** ``contract.somePayableFunction(arg1, arg2, {value: 100})``
- **don't use “.call” when calling view functions.**
- **to timeTravel - replace web3 increaseTime with global options** ``utils.timeTravel(provider, seconds)``

Assertions and available utils
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
For more convenience Etherlime provides some additional assertions and global utils object:

**assert it is an address**
::

    it('should be valid address', async () => {
        assert.isAddress(limeFactory.contractAddress, "The contract was not deployed");
    })



**assert a function revert**
::

    it('should revert if try to create lime with 0 carbohydrates', async () => {
        let carbohydrates = 0;
        await assert.revert(limeFactoryInstance.createLime("newLime2", carbohydrates, 8, 2), "Carbohydrates are not set to 0");
    });

**test an event**

*with Truffle:*

::

    let expectedEvent = 'FreshLime';
    let result = await limeFactory.createLime('newLime' 8, 10, 12);
    assert.lengthOf(result.logs, 1, "There should be 1 event emitted from new product!");
    assert.strictEqual(result.logs[0].event, expectedEvent, `The event emitted was ${result.logs[0].event} instead of ${expectedEvent}`);

*with Etherlime*

::

    let expectedEvent = 'FreshLime'
    let transaction = await limeFactory.createLime('newLime' 8, 10, 12);
    const transactionReceipt = await limeFactory.verboseWaitForTransaction(transaction)

    // check the transaction has such an event
    let isEmitted = utils.hasEvent(transactionReceipt, LimeFactory, expectedEvent);
    assert(isEmitted, 'Event FreshLime was not emitted');
    
    // parse logs
    let logs = utils.parseLogs(transactionReceipt, LimeFactory, expectedEvent);
    assert.equal(logs[0].name, 'newLime, "LimeFactory" with name "newLime" was not created');



Find more test examples `here <https://etherlime.readthedocs.io/en/latest/cli/test.html#>`_.

----

Final steps:
------------
- **delete** ``./migrations`` folder
- **delete** ``truffle.js/truffle-config.js`` file
- **delete** ``truffle`` from ``package.json``
- **delete** ``node_modules``
- **run** ``npm install``
- **open a fresh terminal tab and enter** ``etherlime ganache``
- **run** ``etherlime test``
