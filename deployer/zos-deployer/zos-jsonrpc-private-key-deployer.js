const { ZWeb3, Contracts, SimpleProject } = require('zos-lib')
const fs = require('fs') 
const path = require('path')

const JSONRPCPrivateKeyDeployer = require('../jsonrpc-deployer/jsonrpc-private-key-deployer')


class ZosJSONRPCPrivateKeyDeployer extends JSONRPCPrivateKeyDeployer {
    /**
	 *
	 * Instantiates new deployer based on the Zeppelin OS and private key based deployment signer instance
	 *
	 * @param {*} privateKey the private key for the deployer account
	 * @param {*} nodeUrl url of the network to deploy on. This is the node url address that is given to the class
	 * @param {*} defaultOverrides [Optional] default deployment overrides
	 */
	constructor(privateKey, nodeUrl, defaultOverrides) {
        super(privateKey, nodeUrl, defaultOverrides)
        ZWeb3.initialize(this.nodeUrl)
    }

    
    async deploy(contract) {
        const deploymentArguments = Array.prototype.slice.call(arguments) 
        deploymentArguments.splice(0, 1)
    
        await this._preValidateArguments(contract, deploymentArguments) 
        
        /* Create a SimpleProject to interact with ZeppelinOS programmatically. */
        const project = await this._createProject()
        const contractToDeploy = await this._readContract(contract)
   
        let proxyInstance;
        // ToDo rewrite this AI to a smarter code :))))
        if(!fs.existsSync('./proxy.json')) {
            proxyInstance = await this._createProxy(project, contractToDeploy, deploymentArguments)
        } else {
            let createdProxy = JSON.parse(fs.readFileSync('./proxy.json'))
            createdProxy = createdProxy[contractToDeploy.schema.contractName]
            if(createdProxy && createdProxy.network === this.nodeUrl) {
                proxyInstance = await this._updateProxy(project, contractToDeploy, deploymentArguments)
            } else {
                proxyInstance = await this._createProxy(project, contractToDeploy, deploymentArguments)
            }

        }

        try{
            proxyInstance = await this.wrapDeployedContract(contract, proxyInstance.address)
        } catch (e) {
            let { transaction, transactionReceipt } = await this._prepareTransactionStatus(project)
            await this._postValidateTransaction(contract, transaction, transactionReceipt)
        }
        
        await this._logAction(this.constructor.name, contract.contractName, 'Not provided', 0, project.txParams.gasPrice,'Not provided', proxyInstance.contractAddress) 
        return proxyInstance
    }

    async _readContract(contract) {
        await Contracts.setLocalBuildDir(`${process.cwd()}/build`)
        return Contracts.getFromLocal(contract.contractName)
    }


    async _createProject() {
        let projectName = path.parse(process.cwd()).name // the name of the project is needed to instantiate it
        let transactionParams = await this._setTransactionParams()
        return new SimpleProject(projectName, transactionParams)
    }


    async _updateProxy(project, contractToDeploy, deploymentArguments) {
        let proxy = JSON.parse(fs.readFileSync('./proxy.json'))
        let proxyAddress = proxy[contractToDeploy.schema.contractName].address 
        let methodName = deploymentArguments[0]  // the name of the initMethod (if any)
        deploymentArguments.splice(0, 1) //init arguments
        let proxyInstance = await project.upgradeProxy(proxyAddress, contractToDeploy, { initMethod: methodName, initArgs: [deploymentArguments] })
        return proxyInstance 
    }


    async _createProxy(project, contractToDeploy, deploymentArguments) {
        let proxyInstance = await project.createProxy(contractToDeploy, { initArgs: deploymentArguments })
        let readContract = {};
        
        if(fs.existsSync('./proxy.json')) {
            readContract = JSON.parse(fs.readFileSync('./proxy.json'));
            readContract[proxyInstance.schema.contractName] = {address: proxyInstance.options.address, deployer: proxyInstance.options.from, network: proxyInstance.currentProvider.host}
        } else {
            readContract[proxyInstance.schema.contractName] = {address: proxyInstance.options.address, deployer: proxyInstance.options.from, network: proxyInstance.currentProvider.host}
        } 
        
        fs.writeFileSync('./proxy.json', JSON.stringify(readContract, null, 4)) // second param is replacer if needed, third is number of spaces
        return proxyInstance
    }


    async _setTransactionParams() {
        let txParams = {} 
        let wallet = await ZWeb3.eth().accounts.wallet.add(this.signer.privateKey)
        txParams.from = wallet.address
        txParams = await this._overrideDeployTransactionConfig(txParams)
        txParams.gas = txParams.gasLimit // Zos deployer requires gas property, not gasLimit
        Contracts.artifactDefaults = txParams
		return txParams 
    }

    async _prepareTransactionStatus(project) {
        let transaction = {hash: "Not provided", gasPrice: project.txParams.gasPrice}
        let transactionReceipt = {hash: "Not provided", status: 0, gasUsed: "Not Provided"}
        return { transaction, transactionReceipt }
    }
 
}

module.exports = ZosJSONRPCPrivateKeyDeployer 