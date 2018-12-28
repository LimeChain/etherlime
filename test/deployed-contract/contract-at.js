const etherlime = require('../../index.js');
const ethers = require('ethers')
const chai = require('chai')
const assert = chai.assert;
const config = require('./../config.json');
const ICOTokenContract = require('./../testContracts/ICOToken.json');

const defaultConfigs = {
	gasPrice: config.defaultGasPrice,
	gasLimit: config.defaultGasLimit
}

describe('EtherlimeGanacheWrapper tests', () => {

	let address;
	let owner;
	let provider;

	before(async () => {
		const deployer = new etherlime.EtherlimeGanacheDeployer(undefined, undefined, defaultConfigs);
		const contractWrapper = await deployer.deploy(ICOTokenContract);
		owner = deployer.wallet;
		provider = deployer.provider;
		address = contractWrapper.contractAddress
	})

	it('should create generic wrapper', () => {
		const GreetingsContract = etherlime.ContractAt(ICOTokenContract, address, owner, provider)

		assert.isDefined(GreetingsContract.contract, 'The newly created GreetingsContract does not have a contract ethers.Contract');
		assert.deepEqual(GreetingsContract.wallet, owner, "The stored wallet was not the inputted one")
		assert.deepEqual(GreetingsContract.provider, provider, "The stored provider was not the inputted one")
		assert.deepEqual(GreetingsContract.contractAddress, address, "The stored contract address was not the inputted one")
		assert.isFunction(GreetingsContract.transfer, 'The newly created GreetingsContract does not have ethers.Contract function setGreetings');
		assert.isFunction(GreetingsContract.mint, 'The newly created GreetingsContract does not have ethers.Contract function setGreetings');
	})

	it('should create etherlime wrapper', () => {
		const GreetingsContract = etherlime.ContractAt(ICOTokenContract, address, owner)

		assert.isDefined(GreetingsContract.contract, 'The newly created GreetingsContract does not have a contract ethers.Contract');
		assert.deepEqual(GreetingsContract.wallet, owner, "The stored wallet was not the inputted one")
		assert.deepEqual(GreetingsContract.contractAddress, address, "The stored contract address was not the inputted one")
		assert.isFunction(GreetingsContract.transfer, 'The newly created GreetingsContract does not have ethers.Contract function setGreetings');
		assert.isFunction(GreetingsContract.mint, 'The newly created GreetingsContract does not have ethers.Contract function setGreetings');
		assert.lengthOf(GreetingsContract.instances, 10, 'The newly created GreetingsContract does not have 10 contracts for the 10 ganache accounts')
		assert.isObject(GreetingsContract.instancesMap, 'The newly created GreetingsContract does not have 10 contracts for the 10 ganache accounts')
	})


});