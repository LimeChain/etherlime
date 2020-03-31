const assert = require('chai').assert;
const Verifier = require('./../../../../packages/etherlime/cli-commands/verifier/verifier');
const etherlime = require('./../../../../packages/etherlime-lib/dist/index');
const API_URL_MAINNET = 'https://api.etherscan.io/api';
const API_URL_ROPSTEN = 'https://api-ropsten.etherscan.io/api';
const API_URL_RINKEBY = 'https://api-rinkeby.etherscan.io/api';
const API_URL_KOVAN = 'https://api-kovan.etherscan.io/api';
const API_URL_GOERLI = 'https://api-goerli.etherscan.io/api';

const POA_SOKOL_NETWORK = 'https://sokol.poa.network'
const POA_CORE_NETWORK = 'https://core.poa.network/';
const RSK_MAINNET_NETWORK = 'https://public-node.rsk.co:443';
const POA_XDAI_NETWORK = 'https://dai.poa.network';

const BLOCKSCKOUT_API_URL_ETHEREUM_MAINNET = 'https://blockscout.com/etc/mainnet/api';
const BLOCKSCKOUT_API_URL_POA_SOKOL = 'https://blockscout.com/poa/sokol/api';
const BLOCKSCKOUT_API_URL_POA_CORE = 'https://blockscout.com/poa/core/api';
const BLOCKSCKOUT_API_URL_RSK_MAINNET = 'https://blockscout.com/rsk/mainnet/api';
const BLOCKSCKOUT_API_URL_POA_XDAI = 'https://blockscout.com/poa/xdai/api';


describe('Verifier class methods tests', () => {

	describe('Build Etherscan API Url', () => {
		let signer;
		let provider;
		let deployer;
		let privateKey = '0x7ab741b57e8d94dd7e1a29055646bafde7010f38a900f55bbd7647880faa6ee8';

		before(async () => {
			global.Verifier = new Verifier();
		});

		it('should return the right API url based on the deployment network - mainnet', async () => {
			deployer = new etherlime.InfuraPrivateKeyDeployer(privateKey, "mainnet", "d780223beae54bfea08c9c26689609e9");
			const { apiUrl, networkName } = await global.Verifier._buildEtherscanApiUrl(deployer);
			assert.strictEqual(apiUrl, API_URL_MAINNET, 'The API URL does not match');
			assert.strictEqual(networkName, 'homestead');
		});

		it('should return the right API url based on the deployment network - ropsten', async () => {
			deployer = new etherlime.InfuraPrivateKeyDeployer(privateKey, "ropsten", "d780223beae54bfea08c9c26689609e9");
			const { apiUrl, networkName } = await global.Verifier._buildEtherscanApiUrl(deployer);
			assert.strictEqual(apiUrl, API_URL_ROPSTEN, 'The API URL does not match');
			assert.strictEqual(networkName, 'ropsten');
		});

		it('should return the right API url based on the deployment network - rinkeby', async () => {
			deployer = new etherlime.InfuraPrivateKeyDeployer(privateKey, "rinkeby", "d780223beae54bfea08c9c26689609e9");
			const { apiUrl, networkName } = await global.Verifier._buildEtherscanApiUrl(deployer);
			assert.strictEqual(apiUrl, API_URL_RINKEBY, 'The API URL does not match');
			assert.strictEqual(networkName, 'rinkeby');
		});

		it('should return the right API url based on the deployment network - kovan', async () => {
			deployer = new etherlime.InfuraPrivateKeyDeployer(privateKey, "kovan", "d780223beae54bfea08c9c26689609e9");
			const { apiUrl, networkName } = await global.Verifier._buildEtherscanApiUrl(deployer);
			assert.strictEqual(apiUrl, API_URL_KOVAN, 'The API URL does not match');
			assert.strictEqual(networkName, 'kovan');
		});

		it('should return the right API url based on the deployment network - goerli', async () => {
			deployer = new etherlime.InfuraPrivateKeyDeployer(privateKey, "goerli", "d780223beae54bfea08c9c26689609e9");
			const { apiUrl, networkName } = await global.Verifier._buildEtherscanApiUrl(deployer);
			assert.strictEqual(apiUrl, API_URL_GOERLI, 'The API URL does not match');
			assert.strictEqual(networkName, 'goerli');
		});

	});

	describe('Build Blockscout API Url', () => {
		let signer;
		let provider;
		let deployer;
		let privateKey = '0x7ab741b57e8d94dd7e1a29055646bafde7010f38a900f55bbd7647880faa6ee8';

		before(async () => {
			global.Verifier = new Verifier();
		});

		it('should return the right API url based on the deployment network and chain ID - Ethereum Mainnet', async () => {
			deployer = new etherlime.InfuraPrivateKeyDeployer(privateKey, 'mainnet');
			const apiData = await global.Verifier._buildBlockscoutApiUrl(deployer);
			assert.strictEqual(apiData.url, BLOCKSCKOUT_API_URL_ETHEREUM_MAINNET, 'The API URL does not match');
			assert.strictEqual(apiData.name, 'Ethereum Mainnet');
		});

		it('should return the right API url based on the deployment network and chain ID - POA Sokol', async () => {
			deployer = new etherlime.JSONRPCPrivateKeyDeployer(privateKey, POA_SOKOL_NETWORK);
			const apiData = await global.Verifier._buildBlockscoutApiUrl(deployer);
			assert.strictEqual(apiData.url, BLOCKSCKOUT_API_URL_POA_SOKOL, 'The API URL does not match');
			assert.strictEqual(apiData.name, 'POA Sokol');
		});

		it('should return the right API url based on the deployment network and chain ID - POA Core', async () => {
			deployer = new etherlime.JSONRPCPrivateKeyDeployer(privateKey, POA_CORE_NETWORK);
			const apiData = await global.Verifier._buildBlockscoutApiUrl(deployer);
			assert.strictEqual(apiData.url, BLOCKSCKOUT_API_URL_POA_CORE, 'The API URL does not match');
			assert.strictEqual(apiData.name, 'POA Core');
		});

		it('should return the right API url based on the deployment network and chain ID - RSK Mainnet', async () => {
			deployer = new etherlime.JSONRPCPrivateKeyDeployer(privateKey, RSK_MAINNET_NETWORK);
			const apiData = await global.Verifier._buildBlockscoutApiUrl(deployer);
			assert.strictEqual(apiData.url, BLOCKSCKOUT_API_URL_RSK_MAINNET, 'The API URL does not match');
			assert.strictEqual(apiData.name, 'RSK Mainnet');
		});

		it('should return the right API url based on the deployment network and chain ID - xDai Chain', async () => {
			deployer = new etherlime.JSONRPCPrivateKeyDeployer(privateKey, POA_XDAI_NETWORK);
			const apiData = await global.Verifier._buildBlockscoutApiUrl(deployer);
			assert.strictEqual(apiData.url, BLOCKSCKOUT_API_URL_POA_XDAI, 'The API URL does not match');
			assert.strictEqual(apiData.name, 'xDai Chain');
		});

	});
});