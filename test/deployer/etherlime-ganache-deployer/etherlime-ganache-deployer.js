const etherlime = require('./../../../index.js');
const assert = require('assert');
const config = require('./../../config.json');
const ganacheSetupConfig = require('./../../../cli-commands/ganache/setup');
const Greetings = require('./../../testContracts/Greetings.json');
const isAddress = require('./../../../utils/address-utils').isAddress;


const defaultConfigs = {
	gasPrice: config.defaultGasPrice,
	gasLimit: config.defaultGasLimit
}

const defaultNodeUrl = `http://localhost:${ganacheSetupConfig.defaultPort}`;
const defaultPrivateKey = ganacheSetupConfig.accounts[0].secretKey;

describe('GanacheCli-Deployer tests', () => {

	describe('Initialization', async () => {
		it('Should take default values on empty privateKey, port and defaultConfigs', () => {
			const deployer = new etherlime.EtherlimeGanacheDeployer();
			assert.deepEqual(config.nodeUrl, deployer.provider.connection.url, "The stored provider url does not match the inputted one");
			assert.deepEqual(defaultPrivateKey, deployer.wallet.privateKey, "The stored provider privateKey does not match the inputted one");
		})

		it('Should initialize the wallet with correct values', () => {
			const deployer = new etherlime.EtherlimeGanacheDeployer(config.ganacheCliPrivateKey, config.ganacheCliPort, defaultConfigs);
			assert.deepEqual(config.nodeUrl, deployer.provider.connection.url, "The stored provider url does not match the inputted one");
			assert.deepEqual(defaultConfigs, deployer.defaultOverrides, "The stored default overrides does not match the inputted one");
		})

		it('Should take default value on empty port', () => {
			const deployer = new etherlime.EtherlimeGanacheDeployer(config.ganacheCliPrivateKey, undefined, defaultConfigs);
			assert.deepEqual(config.nodeUrl, deployer.provider.connection.url, "The stored provider url does not match the inputted one");

		})

		it('Should take default value on empty privateKey', () => {
			const deployer = new etherlime.EtherlimeGanacheDeployer(undefined, config.ganacheCliPort, defaultConfigs);
			assert.deepEqual(defaultPrivateKey, deployer.wallet.privateKey, "The stored provider privateKey does not match the inputted one");

		})

		it('Should take default values on empty privateKey and port', () => {
			const deployer = new etherlime.EtherlimeGanacheDeployer(undefined, undefined, defaultConfigs);
			assert.deepEqual(config.nodeUrl, deployer.provider.connection.url, "The stored provider url does not match the inputted one");
			assert.deepEqual(defaultPrivateKey, deployer.wallet.privateKey, "The stored provider privateKey does not match the inputted one");
		})

		it('should deploy contract without default configs', async () => {

			deployer = new etherlime.EtherlimeGanacheDeployer();
			const contractWrapper = await deployer.deploy(Greetings);

			assert.ok(isAddress(contractWrapper.contractAddress), 'The deployed address is incorrect');
		})

		it('Should throw on string for port', () => {
			const throwingFunction = () => {
				new etherlime.EtherlimeGanacheDeployer(config.ganacheCliPrivateKey, '69', defaultConfigs)
			}

			assert.throws(throwingFunction, "The deployer did not throw with invalid nodeUrl");

		})

		it('Provider method toString should return string', () => {
			const deployer = new etherlime.EtherlimeGanacheDeployer(config.ganacheCliPrivateKey, config.ganacheCliPort, defaultConfigs);
			const returnedString = deployer.toString();
			assert(typeof returnedString === 'string', "The returned toString method did not return string");
			assert(returnedString.includes(config.nodeUrl), `The returned toString method did not contain ${config.nodeUrl}`)
		})
	})

	describe('Wrapping deployed contract', async () => {

		it('should wrap contracts correctly', async () => {
			const deployer = new etherlime.EtherlimeGanacheDeployer();
			const contractWrapper = await deployer.wrapDeployedContract(Greetings, config.randomAddress);

			assert.ok(isAddress(contractWrapper.contractAddress), 'The wrapped address is incorrect');
			assert.strictEqual(contractWrapper.contractAddress, config.randomAddress, 'The wrapped address is no the inputted one');
		})
	})
});