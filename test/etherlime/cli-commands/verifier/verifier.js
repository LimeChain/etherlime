const assert = require('chai').assert;
const Verifier = require('./../../../../packages/etherlime/cli-commands/verifier/verifier');
const etherlime = require('./../../../../packages/etherlime/index');
const API_URL_MAINNET = 'https://api.etherscan.io/api';
const API_URL_ROPSTEN = 'https://api-ropsten.etherscan.io/api';
const API_URL_RINKEBY = 'https://api-rinkeby.etherscan.io/api';
const API_URL_KOVAN = 'https://api-kovan.etherscan.io/api';
const API_URL_GOERLI = 'https://api-goerli.etherscan.io/api';




describe('Verifier class methods tests', () => {

	let signer;
	let provider;
	let deployer;
	let privateKey = '0x7ab741b57e8d94dd7e1a29055646bafde7010f38a900f55bbd7647880faa6ee8';

	before(async () => {
		global.Verifier = new Verifier();
	});

	it('should return the right API url based on the deployment network - mainnet', async () => {
		deployer = new etherlime.InfuraPrivateKeyDeployer(privateKey, "mainnet", "d780223beae54bfea08c9c26689609e9");
		const { apiUrl, networkName } = await global.Verifier._buildApiUrl(deployer);
		assert.strictEqual(apiUrl, API_URL_MAINNET, 'The API URL does not match');
		assert.strictEqual(networkName, 'homestead');
	});

	it('should return the right API url based on the deployment network - ropsten', async () => {
		deployer = new etherlime.InfuraPrivateKeyDeployer(privateKey, "ropsten", "d780223beae54bfea08c9c26689609e9");
		const { apiUrl, networkName } = await global.Verifier._buildApiUrl(deployer);
		assert.strictEqual(apiUrl, API_URL_ROPSTEN, 'The API URL does not match');
		assert.strictEqual(networkName, 'ropsten');
	});

	it('should return the right API url based on the deployment network - rinkeby', async () => {
		deployer = new etherlime.InfuraPrivateKeyDeployer(privateKey, "rinkeby", "d780223beae54bfea08c9c26689609e9");
		const { apiUrl, networkName } = await global.Verifier._buildApiUrl(deployer);
		assert.strictEqual(apiUrl, API_URL_RINKEBY, 'The API URL does not match');
		assert.strictEqual(networkName, 'rinkeby');
	});

	it('should return the right API url based on the deployment network - kovan', async () => {
		deployer = new etherlime.InfuraPrivateKeyDeployer(privateKey, "kovan", "d780223beae54bfea08c9c26689609e9");
		const { apiUrl, networkName } = await global.Verifier._buildApiUrl(deployer);
		assert.strictEqual(apiUrl, API_URL_KOVAN, 'The API URL does not match');
		assert.strictEqual(networkName, 'kovan');
	});

	it('should return the right API url based on the deployment network - goerli', async () => {
		deployer = new etherlime.InfuraPrivateKeyDeployer(privateKey, "goerli", "d780223beae54bfea08c9c26689609e9");
		const { apiUrl, networkName } = await global.Verifier._buildApiUrl(deployer);
		assert.strictEqual(apiUrl, API_URL_GOERLI, 'The API URL does not match');
		assert.strictEqual(networkName, 'goerli');
	});

});