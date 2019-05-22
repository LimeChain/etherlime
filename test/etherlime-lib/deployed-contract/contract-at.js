let etherlime;
const ethers = require('ethers')
const chai = require('chai')
let chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const assert = chai.assert;
const config = require('./../../config.json');
const ICOTokenContract = require('./../../testContracts/ICOToken.json');

const defaultConfigs = {
	gasPrice: config.defaultGasPrice,
	gasLimit: config.defaultGasLimit
}

describe('ContractAt tests', () => {

	let address;
	let owner;
	let provider;

	before(async () => {
        etherlime = require('../../../packages/etherlime-lib/index');
		const deployer = new etherlime.EtherlimeGanacheDeployer(undefined, undefined, defaultConfigs);
		const contractWrapper = await deployer.deploy(ICOTokenContract);
		owner = deployer.signer;
		provider = deployer.provider;
		address = contractWrapper.contractAddress
	})

	it('should create generic wrapper with signer and provider', async () => {
		const GreetingsContract = await etherlime.ContractAt(ICOTokenContract, address, owner, provider)

		assert.isDefined(GreetingsContract.contract, 'The newly created GreetingsContract does not have a contract ethers.Contract');
		assert.deepEqual(GreetingsContract.signer, owner, "The stored signer was not the inputted one")
		assert.deepEqual(GreetingsContract.provider, provider, "The stored provider was not the inputted one")
		assert.deepEqual(GreetingsContract.contractAddress, address, "The stored contract address was not the inputted one")
		assert.isFunction(GreetingsContract.transfer, 'The newly created GreetingsContract does not have ethers.Contract function setGreetings');
		assert.isFunction(GreetingsContract.mint, 'The newly created GreetingsContract does not have ethers.Contract function setGreetings');
	})

	it('should throw on provider set with invalid signer', async () => {
		await assert.isRejected(etherlime.ContractAt(ICOTokenContract, address, undefined, provider), 'Incorrect signer supplied', 'No error was thrown when undefined signer was passed')
		const notASigner = address;
		await assert.isRejected(etherlime.ContractAt(ICOTokenContract, address, notASigner, provider), 'Incorrect signer supplied', 'No error was thrown when not a signer instance passed')
	})

	it('should create etherlime wrapper with two params', async () => {
		const GreetingsContract = await etherlime.ContractAt(ICOTokenContract, address)

		assert.isDefined(GreetingsContract.contract, 'The newly created GreetingsContract does not have a contract ethers.Contract');
		assert.deepEqual(GreetingsContract.contractAddress, address, "The stored contract address was not the inputted one")
		assert.isFunction(GreetingsContract.transfer, 'The newly created GreetingsContract does not have ethers.Contract function setGreetings');
		assert.isFunction(GreetingsContract.mint, 'The newly created GreetingsContract does not have ethers.Contract function setGreetings');
		assert.lengthOf(GreetingsContract.instances, 10, 'The newly created GreetingsContract does not have 10 contracts for the 10 ganache accounts')
		assert.isObject(GreetingsContract.instancesMap, 'The newly created GreetingsContract does not have 10 contracts for the 10 ganache accounts')
	})

	it('should create etherlime wrapper with signer', async () => {
		const GreetingsContract = await etherlime.ContractAt(ICOTokenContract, address, owner)

		assert.isDefined(GreetingsContract.contract, 'The newly created GreetingsContract does not have a contract ethers.Contract');
		assert.deepEqual(GreetingsContract.signer.address, owner.address, "The stored signer was not the inputted one")
		assert.deepEqual(GreetingsContract.contractAddress, address, "The stored contract address was not the inputted one")
		assert.isFunction(GreetingsContract.transfer, 'The newly created GreetingsContract does not have ethers.Contract function setGreetings');
		assert.isFunction(GreetingsContract.mint, 'The newly created GreetingsContract does not have ethers.Contract function setGreetings');
		assert.lengthOf(GreetingsContract.instances, 10, 'The newly created GreetingsContract does not have 10 contracts for the 10 ganache accounts')
		assert.isObject(GreetingsContract.instancesMap, 'The newly created GreetingsContract does not have 10 contracts for the 10 ganache accounts')
	})

	it('should throw err if passed signer is not connected to any provider', async () => {
		let signer = ethers.Wallet.createRandom()
		await assert.isRejected(etherlime.ContractAt(ICOTokenContract, address, signer, provider), "Passed signer is not connected to any provider.")
	})

	it('should create etherlime wrapper with signer and port', async () => {
		const GreetingsContract = await etherlime.ContractAt(ICOTokenContract, address, owner, 8545)

		assert.isDefined(GreetingsContract.contract, 'The newly created GreetingsContract does not have a contract ethers.Contract');
		assert.deepEqual(GreetingsContract.signer.address, owner.address, "The stored signer was not the inputted one")
		assert.deepEqual(GreetingsContract.contractAddress, address, "The stored contract address was not the inputted one")
		assert.isFunction(GreetingsContract.transfer, 'The newly created GreetingsContract does not have ethers.Contract function setGreetings');
		assert.isFunction(GreetingsContract.mint, 'The newly created GreetingsContract does not have ethers.Contract function setGreetings');
		assert.lengthOf(GreetingsContract.instances, 10, 'The newly created GreetingsContract does not have 10 contracts for the 10 ganache accounts')
		assert.isObject(GreetingsContract.instancesMap, 'The newly created GreetingsContract does not have 10 contracts for the 10 ganache accounts')
	})

	it('should create etherlime wrapper port', async () => {
		const GreetingsContract = await etherlime.ContractAt(ICOTokenContract, address, undefined, 8545)

		assert.isDefined(GreetingsContract.contract, 'The newly created GreetingsContract does not have a contract ethers.Contract');
		assert.deepEqual(GreetingsContract.signer.address, owner.address, "The stored signer was not the inputted one")
		assert.deepEqual(GreetingsContract.contractAddress, address, "The stored contract address was not the inputted one")
		assert.isFunction(GreetingsContract.transfer, 'The newly created GreetingsContract does not have ethers.Contract function setGreetings');
		assert.isFunction(GreetingsContract.mint, 'The newly created GreetingsContract does not have ethers.Contract function setGreetings');
		assert.lengthOf(GreetingsContract.instances, 10, 'The newly created GreetingsContract does not have 10 contracts for the 10 ganache accounts')
		assert.isObject(GreetingsContract.instancesMap, 'The newly created GreetingsContract does not have 10 contracts for the 10 ganache accounts')
	})

	it('should throw on wrong provider or port param', async () => {
		await assert.isRejected(etherlime.ContractAt(ICOTokenContract, address, owner, "NotAProvider"), 'You have supplied invalid value for provider or port argument', 'No error was thrown with invalid provider or port')
	})

	it('should throw err if passed signer is not connected to the current provider', async () => {
		let signer = ethers.Wallet.createRandom()
		await assert.isRejected(etherlime.ContractAt(ICOTokenContract, address, signer, 8545), "Passed signer is not connected to current provider")
	})

});