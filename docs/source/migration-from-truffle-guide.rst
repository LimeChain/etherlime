Migration from Truffle to Etherlime
***********************************

Install & Initialize Etherlime
------------------------------

::

    npm i -g etherlime

Install the global etherlime to allow you to run ``etherlime`` commands.

::

    etherlime init

It won’t override your project’s structure. It will only add a ``./deployment`` folder and some example templates. You can find them in => ``./contracts/LimeFactory.sol`` ; ``./deployment/deploy.js``; ``./test/exampleTest.js;``



Write new scripts for deployment using the template provided
------------------------------------------------------------

- **require etherlime module** ``const etherlime = require('etherlime')``
    
- **require the compiled contract** from ./build folder not the contract itself

*with Truffle*
::
    const LimeFactory = artifacts.require("./LimeFactory.sol");

*with Etherlime*
::
    const LimeFactory = require('../build/LimeFactory.json');

- **set the deployer and then deploy the contract**

*Deployment with Etherlime*
::
    const deployer = new etherlime.EtherlimeGanacheDeployer();
    const limeFactory = await deployer.deploy(LimeFactory);



- **when you need to pass the address of the deployed contract use the property** ``limeFactory.contractAddress``

- **when you need to wrap deployed contract use** ``etherlime.ContractAt()`` and pass as param compiled json object of the contract

Find more examples for deployment `here <https://etherlime.readthedocs.io/en/latest/api/deployers.html>`_.

----

Modify tests
------------
- **require('etherlime')**
- **require compiled contract from ./build not the .sol file (as in deployment scripts)**
- **replace** ``contract`` descriptor with ``describe``
- **remove (accounts) param**
- **initialize accounts** ``let owner = accounts[0]``
    Etherlime provides global accounts object, containing secretKey(privateKey) and wallet instance of ethers.Wallet of the account.
- **set the deployer in beforeEach and fix the deployment scripts in it as we did it before**


*with Truffle*
::
    contract('LimeFactory tests', async (accounts) => {
        beforeEach(async function() {
            limeFactory = await LimeFactory.new();
        });

        it('should do something', () => {

        })
    }

*with Etherlime*
::
    describe('LimeFactory tests', async () => {
        beforeEach(async function() {
            deployer = new etherlime.EtherlimeGanacheDeployer(accounts[0].secretKey);
            limeFactory = await deployer.deploy(LimeFactory);
        });

        it('should do something', () => {

        })
    })

- **in case you want to use an address of an account, you must extend it to** ``let owner = accounts[0].wallet.address``
- **remove “.call” when calling view functions.** You may try to replace all at once with “.call(“  => “(“. Be careful!
- **if you need to assert the result is an address, you may use** ``assert.isAddress(result)``
- **when you expect a function to revert, instead of “try-catch”, use** ``assert.revert()``
- **when a contract’s method is called, the default sender is set to accounts[0]. If you want to execute it from another account, replace** ``{from: owner}`` object with ``.from(anotherAccount)``. 

::
    
    await assert.revert(limeFactory.from(2).createLime('newLime' 0, 10, 12));


As a param you may also use: 
    - .from(2)
    - .from(accounts[2])
    - .from(accounts[2].wallet)
    - .from(accounts[2].wallet.address)
    - .from(customAddress)
    - .from(customWallet)

- **when you need to execute payable function, pass the value as an object** ``contract.somePayableFunction(arg1, arg2, {value: 100})``
- **to test an event, first you need to get “transactionReceipt”** and then you can use global util helper to assert that transaction has such an event. Also you can parse the event and read it.

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

    let isEmitted = utils.hasEvent(transactionReceipt, LimeFactory, expectedEvent);
    assert(isEmitted, 'Event FreshLime was not emitted');
    
    // parse logs
    let logs = utils.parseLogs(transactionReceipt, LimeFactory, expectedEvent);
    assert.equal(logs[0].name, 'newLime, "LimeFactory" with name "newLime" was not created');


- **timeTravel - replace web3 increaseTime with global options** ``utils.timeTravel(provider, seconds)``

Find more test examples `here <https://etherlime.readthedocs.io/en/latest/cli/test.html#>`_.

Final steps:
------------
- **delete** ``./migrations`` folder
- **delete** ``truffle.js/truffle-config.js`` file
- **delete** ``truffle`` from ``package.json``
- **delete** ``node_modules``
- **run** ``npm install``
- **in a new tab run** ``etherlime ganache``
- **run** ``etherlime test``







    




