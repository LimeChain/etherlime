# etherlime test

## etherlime test

### Syntax

```text
etherlime test [path] [timeout] [skip-compilation] [gas-report] [runs] [solc-version]
[output] [port]
```

Parameters:

* `path` - \[Optional\] By specifying `path` you can set a path to a

  selected directory or you can set the path directly to the

  javascript file which contains your tests. By default the `path`

  points to `./test`.

* `timeout` - \[Optional\] This parameter defines the test timeout in

  milliseconds. Defaults to 2000 ms.

* `skip-compilation` - \[Optional\] This parameter controls wether a

  compilation will be ran before the tests are started. Default:

  false.

* `gas-report` - \[Optional\] Enables Gas reporting future that will

  show Gas Usage after each test. Default: false.

* `runs` - \[Optional\] By specifying `runs` between 1 and 999 you

  enabled the optimizer and set how many times the optimizer will be

  run. By default the optimizer is not enabled.

* `solc-version` - \[Optional\] By specifying `solc-version` you can

  set the version of the solc which will be used for compiling the

  smart contracts. By default it use the solc version from the

  node\_modules folder.

* `output` - \[Optional\] Defines the way that the logs are shown.

  Choices: `none` - silences the output of logs, `normal` - see

  verbose logs in the console and `structured` - structured output in

  a file meant for inter program communication.

* `port` - \[Optional\] The port that the etherlime ganache is runing.

  Used for wiring up the default accounts correctly. Defaults to 8545

### Global Objects

We've augmented the test runner with the following things you can use:

* In your unit tests you can use the global `accounts` object. It

  contains the secretKey \(private key\) and instance of ethers.Wallet

  of the account.

* The assert object has function:

    > * `assert.revert(promiseOfFailingTransaction)` for testing reverting transactions
    > * `assert.revertWith(promiseOfFailingTransaction, expectedRevertMessage)` for testing reverting transaction with specific revert message
    > * `assert.notRevert(promiseOfNotFailingTransaction)` for testing transaction is executed successfully
    > * `assert.isAddress(value)` for testing a value is a proper address
    > * `assert.isPrivateKey(value)` for testing a value is a proper private key
    > * `assert.isHash(value)` for testing a value is a proper hex
    > * `assert.emit(function, eventName)` for testing an event is emitted after function execution
    > * `assert.emitWithArgs(function, eventName, [args])` for testing an event is emitted with certain arguments after function execution
    > * `assert.balanceChanged(function, account, value)` for testing the balance of an account has been changed after function execution
    > * `assert.balancesChanged(function, [accounts], [values])` for testing the balances of multiple accounts has been changed after function execution

## Available Utils

On your disposal there is a global available utils object. Here are the methods it exposes:

> * `utils.timeTravel(provider, seconds)` method allowing etherlime
>
>     ganache to move `seconds` ahead. You need to pass your provider
>
>     from the EtherlimeGanacheDeployer
>
> * `utils.setTimeTo(provider, timestamp)` method allowing etherlime
>
>     ganache to move to the desired `timestamp` ahead. You need to pass
>
>     your provider from the EtherlimeGanacheDeployer
>
> * `utils.mineBlock(provider)` method telling the etherlime ganache
>
>     to mine the next block. You need to pass your provider from the
>
>     EtherlimeGanacheDeployer
>
> * `utils.snapshot(provider)` snapshot the state of the blockchain at the current block.
>    
>     Returns the integer id of the snapshot created
>
> * `utils.revertState(provider, snapshotID)` revert the state of the blockchain to a previous snapshot.
>
>     If no snapshot id is passed it will revert to the latest snapshot. Returns `true`.
>
> * `utils.hasEvent(receipt, contract, eventName)` allowing the user
>
>     to check if the desired event was broadcasted in the transaction
>
>     receipt. You need to pass the Transaction receipt, the contract
>
>     that emits it and the name of the Event.
>
> * `utils.parseLogs(receipt, contract, eventName)` allowing the user
>
>     get parsed events from a transaction receipt. You need to pass the
>
>     Transaction receipt, the contract that emits it and the name of
>
>     the Event. Always returns an event.

## Examples

### General Example

```javascript
    const etherlime = require('etherlime-lib');
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

            assert.strictEqual(_owner, owner.signer.address,
              'Initial contract owner does not match');
        });
    });
```

### execute function from another account

```javascript
    const etherlime = require('etherlime-lib');
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
```

## accounts

```javascript
    const Billboard = require('../build/Billboard.json');
    const etherlime = require('etherlime-lib');

    describe('Billboard', () => {
        let owner = accounts[5];

        it('should initialize contract with correct values', async () => {
            const deployer = new etherlime.EtherlimeGanacheDeployer(owner.secretKey);
            const BillboardContract = await deployer.deploy(Billboard, {});

            // Do something with the contract
        });
    });
```

## assert.revert

```javascript
    it('should throw if throwing method is called', async () => {
        await assert.revert(contract.throwingMethod());
    });
```

## assert.revertWith

```javascript
    it('should throw with specific revert message', async () => {
        await assert.revertWith(contract.throwingMethod(), expectedRevertMessage);
    });
```


## assert.notRevert

```javascript
    it('should assert that function not revert and is executed successfully', async () => {
        await assert.notRevert(contract.notThrowingMethod());
    });
```

## assert.isAddress

```javascript
	const etherlime = require('etherlime');
	const Billboard = require('../build/Billboard.json');

	describe('Example', () => {
		let owner = accounts[3];
		let deployer;
		let BillboardContract;

		beforeEach(async () => {
			deployer = new etherlime.EtherlimeGanacheDeployer(owner.secretKey);
			BillboardContract = await deployer.deploy(Billboard, {});
        });
        
            it('should be valid address', async () => {
                assert.isAddress(BillboardContract.contractAddress, "The contract was not deployed");
            })
        
	});
```

## assert.isPrivateKey

```javascript
    it('should be valid private key', async () => {
        let aliceAccount = accounts[3];
        assert.isPrivateKey(aliceAccount.secretKey);
    });
```

## Check if the desired event was broadcasted in the transaction receipt

```javascript
    const etherlime = require('etherlime-lib');
    const Billboard = require('../build/Billboard.json');
    const assert = require('chai').assert;

    describe('Billboard', () => {
        let owner = accounts[5];

        it('should emit event', async () => {
            const deployer = new etherlime.EtherlimeGanacheDeployer(owner.secretKey);
            const BillboardContract = await deployer.deploy(Billboard, {});

            const expectedEvent = 'LogBillboardBought';
        	await assert.emit(BillboardContract.buy('Billboard slogan', { value: 10000 }), expectedEvent)
        });
    });
```

## Check if the desired event was broadcasted with specific arguments

```javascript
    it('should emit event with certain arguments', async () => {
        const expectedEvent = 'LogBillboardBought';
        const expectedArgs = 'Billboard slogan', 1000];
        await assert.emitWithArgs(BillboardContract.buy('Billboard slogan', { value: 10000 }), expectedEvent, expectedArgs)
    })
```

## Check if a balance was changed on ethers sent

```javascript
    it('should change balance on ethers sent', async () => {
        let bobsAccount = accounts[4].signer
        await assert.balanceChanged(bobsAccount.sendTransaction({
            to: aliceAccount.signer.address,
            value: 200
        }), bobsAccount, '-200')
    })
```

## Check if multiple balances changed on ethers sent

```javascript
    it('should change multiple balances on ethers sent', async () => {
        let sender = accounts[1].signer;
        let receiver = accounts[2].signer;
        await assert.balancesChanged(sender.sendTransaction({
                    to: receiver.address,
                    value: 200
                }), [sender, receiver], ['-200', 200])
    })
```

## Time travel and snapshot

```javascript
	const etherlime = require('etherlime');
	const Billboard = require('../build/Billboard.json');

	describe('Example', () => {
		let owner = accounts[3];
		let deployer;
		let BillboardContract;

		beforeEach(async () => {
			deployer = new etherlime.EtherlimeGanacheDeployer(owner.secretKey);
			BillboardContract = await deployer.deploy(Billboard, {});
        });
        
            it('should do something in the future', async () => {
                let seconds = 600000;
                await utils.timeTravel(deployer.provider, seconds);
                
                // Do what is needed to be done in the future
            })

            it('should snapshot the current state', async () => {
                let snapshotID = await utils.snapshot(deployer.provider);

                // Additional logic comes here
            })

            it('should revert the state to a previous snapshot', async () => {
                await utils.revertState(deployer.provider, snapshotID);

                // Add before or after the reversion the logic you need
        
	});
```

