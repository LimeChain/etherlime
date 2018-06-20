# Usage

```
const etherlime = require('etherlime');

const TestContract = require('./TestContract.json');

const defaultConfigs = {
	gasPrice: 20000000000,
	gasLimit: 4700000
}

const deployer = new etherlime.InfuraPrivateKeyDeployer('Your Private Key Goes Here', 'ropsten', 'Your Infura API Key', defaultConfigs);

const run = async () => {
	
	const result = await deployer.deploy(TestContract, '0xda8a06f1c910cab18ad187be1faa2b8606c2ec86', 1539426974);
}

run();
```