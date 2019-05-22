# Migration guide from Etherlime v1.2 to v2.0

## Breaking Changes

### Installing v1.2

```text
npm i -g etherlime
```
This command in v1.2 fetch and install the whole library.

### Installing v2.0

#### Installing the CLI: 
```text
npm i -g etherlime
```

This command in v2.0 will install **only** the etherlime CLI commands library. You can use all the [CLI](https://app.gitbook.com/@etherlime/s/etherlime/developer-documentation/etherlime-cli) commands.


#### Installing the LIB: 
```text
npm i -g etherlime-lib
```

This command will install **only** etherlime LIB. You can use LIB to deploy, instantiate or test smart contracts.

### Deploying v1.2

Deploying in v1.2 is as follows:

Example:

```javascript
    const etherlime = require('etherlime');

    // Path to your etherlime compiled contract json file
    const TestContract = require('../build/TestContract.json'); 

    const deploy = async (network, secret) => {

        const deployer = new etherlime.EtherlimeGanacheDeployer();

        // Add params separated with ,
        const result = await deployer.deploy(TestContract, {});
    }

    module.exports = { deploy }
```
Please **note** that here etherlime is required as `etherlime`.

### Deploying v2.0

Deploying in v2.0 is as follows using Etherlime LIB.

Example:

```javascript
    const etherlime = require('etherlime-lib');

    // Path to your etherlime compiled contract json file
    const TestContract = require('../build/TestContract.json'); 

    const deploy = async (network, secret) => {

        const deployer = new etherlime.EtherlimeGanacheDeployer();

        // Add params separated with ,
        const result = await deployer.deploy(TestContract, {});
    }

    module.exports = { deploy }
```
Please **note** that here etherlime is required as `etherlime-lib`.


### Testing Smart Contracts v1.2

```javascript
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

            assert.strictEqual(_owner, owner.signer.address,
              'Initial contract owner does not match');
        });
    });
```
Please **note** that here etherlime is required as `etherlime`.


### Testing Smart Contracts v2.0

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
Please **note** that here etherlime is required as `etherlime-lib`.