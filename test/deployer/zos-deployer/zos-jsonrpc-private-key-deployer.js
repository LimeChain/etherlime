const etherlime = require('./../../../index.js');
const ethers = require('ethers');
let chai = require("chai");
const assert = require('chai').assert;
let chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const fs = require('fs-extra');
const isAddress = require('../../../utils/address-utils').isAddress;

const ganacheSetupConfig = require('../../../cli-commands/ganache/setup');
const compiler = require('../../../cli-commands/compiler/compiler')
const config = require('./../../config.json');

const upgradedContract = require('./contracts/ZosContractUpgraded').upgradedContract

const defaultConfigs = {
	gasPrice: config.defaultGasPrice,
	gasLimit: config.defaultGasLimit
}

let zosContractInstance;
let limeContractInstance;
let proxyInstance;
let deployer;
let signer;
let notAdmin;
let ZosContract;
let ZosContractInitial;
let LimeFactory;
let currentDir;


describe('Zos deployer tests', async () => {

	describe('deploy proxy', async () => {

		before(async function() {
			currentDir = process.cwd();
			process.chdir('./test/deployer/zos-deployer')
			await compiler.run('.')
			LimeFactory = JSON.parse(fs.readFileSync('./build/LimeFactory.json'));
			ZosContract = JSON.parse(fs.readFileSync('./build/ZosContract.json'));
			deployer = new etherlime.ZosJSONRPCPrivateKeyDeployer(config.randomPrivateKey, config.nodeUrl, defaultConfigs);
			signer = deployer.signer
			notAdmin = new ethers.Wallet(ganacheSetupConfig.accounts[5].secretKey, deployer.provider);
		})

		it('should deploy new contract without init method correctly', async () => {
			limeContractInstance = await deployer.deploy(LimeFactory);
			
			assert.ok(isAddress(limeContractInstance.contractAddress), 'The deployed address is incorrect');
			assert.deepEqual(signer.address, limeContractInstance.signer.address, "The stored signer does not match the inputted one");
			assert.deepEqual(config.nodeUrl, limeContractInstance.provider.connection.url, "The stored provider does not match the inputted one");
		})
	
		it('should deploy contract with init method correctly', async () => {
			zosContractInstance = await deployer.deploy(ZosContract, 10);
			
			assert.ok(isAddress(zosContractInstance.contractAddress), 'The deployed address is incorrect');
			assert.deepEqual(signer.address, zosContractInstance.signer.address, "The stored signer does not match the inputted one");
			assert.deepEqual(config.nodeUrl, zosContractInstance.provider.connection.url, "The stored provider does not match the inputted one");
	
		});

		it('should have json file created with proxy instance data of all deployed contracts', async () => {
			assert.ok(fs.existsSync('./proxy.json'))
			proxyInstance = JSON.parse(fs.readFileSync('./proxy.json'))

			let limeProxyAddress = proxyInstance[LimeFactory.contractName].address
			assert.deepEqual(limeProxyAddress, limeContractInstance.contractAddress)

			let zosProxyAddress = proxyInstance[ZosContract.contractName].address
			assert.deepEqual(zosProxyAddress, zosContractInstance.contractAddress)

			
		})
	
		it('should read value from the contract', async () => {
			let instance = await zosContractInstance.contract.connect(notAdmin)
			let value = await instance.num()
			assert.equal(value.toNumber(), 10)
		})
	
		it('should not find a specific function before upgrading', async () => {
			const throwingFunction = () => {
				zosContractInstance.newFunction()
			}
			assert.throws(throwingFunction, "zosContractInstance.newFunction is not a function", "The contract not throw if specific function is called before upgrading");
		})
	
		it('should update contract correctly without changing its address', async () => {
			ZosContractInitial = fs.readFileSync('./contracts/ZosContract.sol')
			fs.writeFileSync('./contracts/ZosContract.sol', upgradedContract)
			fs.removeSync('./build')
			await compiler.run('.')
			ZosContract = JSON.parse(fs.readFileSync('./build/ZosContract.json'));
			let contractAddressBeforeUpgrading = zosContractInstance.contractAddress;

			zosContractInstance = await deployer.deploy(ZosContract);

			assert.ok(isAddress(zosContractInstance.contractAddress), 'The deployed address is incorrect');
			assert.equal(zosContractInstance.contractAddress, contractAddressBeforeUpgrading)
		})
	
		it('should have a specific function after upgrading', async () => {
			assert.equal(typeof zosContractInstance.newFunction, 'function')
		})


		it('should deploy on ropsten test net', async () => {
			deployer = new etherlime.ZosJSONRPCPrivateKeyDeployer(config.infuraRopstenPrivateKey, config.infuraRopstenURL, defaultConfigs);
			limeContractInstance = await deployer.deploy(LimeFactory)
			assert.ok(isAddress(limeContractInstance.contractAddress), 'The deployed address is incorrect');
		})

		it('should update the network and contract address in json file', async () => {
			proxyInstance = JSON.parse(fs.readFileSync('./proxy.json'))

			let limeProxyAddress = proxyInstance[LimeFactory.contractName].address
			let network = proxyInstance[LimeFactory.contractName].network
			assert.deepEqual(limeProxyAddress, limeContractInstance.contractAddress)
			assert.equal(network, config.infuraRopstenURL)
		})


		it('should throw if transaction failed', async () => {
			await assert.isRejected(deployer.deploy(ZosContract, "param to fail"), "failed");
		})

		after(async() => {
			fs.writeFileSync('./contracts/ZosContract.sol', ZosContractInitial)
			fs.removeSync('./proxy.json')
			fs.removeSync('./build')
			process.chdir(currentDir)
		})

	})

})