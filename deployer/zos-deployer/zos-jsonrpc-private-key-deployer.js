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
        this.initializeZWeb3()
    }

    initializeZWeb3() {
        ZWeb3.initialize(this.nodeUrl)
    }

    
    async deploy(contract) {
        const deploymentArguments = Array.prototype.slice.call(arguments) 
        deploymentArguments.splice(0, 1)
    
        await this._preValidateArguments(contract, deploymentArguments) 
        
        /* Create a SimpleProject to interact with ZeppelinOS programmatically. */
        const project = await this._createProject()
        const contractToDeploy = await this._readContract(contract)
   
        let proxyInstance 
        try {
            /* check if proxy already exit and just update it or create new one and write its data in json file */
            if(fs.existsSync('./proxy.json')) {
                proxyInstance =  await this._updateProxy(project, contractToDeploy, deploymentArguments)
            } else {
                proxyInstance = await this._createProxy(project, contractToDeploy, deploymentArguments)
            }
            console.log("proxy", proxyInstance)
            proxyInstance = await this.wrapDeployedContract(contract, proxyInstance.address)
        } catch(e) {
            console.log("ee", e)
            let { transaction, transactionReceipt } = await this._prepareTransactionStatus(project)
            // await this._postValidateTransaction(contract, transaction, transactionReceipt)
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
        let proxyAddress = JSON.parse(fs.readFileSync('./proxy.json')).options.address 
        let methodName = deploymentArguments[0]  // the name of the initMethod (if any)
        deploymentArguments.splice(0, 1) //init arguments
        let proxyInstance = await project.upgradeProxy(proxyAddress, contractToDeploy, { initMethod: methodName, initArgs: [deploymentArguments] })
        fs.writeFileSync('./proxy.json', JSON.stringify(proxyInstance, null, 4)) // update json file with new data
        return proxyInstance 
    }

    async _createProxy(project, contractToDeploy, deploymentArguments) {
        let proxyInstance = await project.createProxy(contractToDeploy, { initArgs: deploymentArguments }) 
        fs.writeFileSync('./proxy.json', JSON.stringify(proxyInstance, null, 4)) // second param is replacer if needed, third is number of spaces
        return proxyInstance 
    }


    async _setTransactionParams() {
        let txParams = {} 
        txParams.from = this.signer.address

        txParams = await this._overrideDeployTransactionConfig(txParams)
        txParams.gas = txParams.gasLimit // Zos deployer requires gas property, not gasLimit

		return txParams 
    }

    async _prepareTransactionStatus(project) {
        let transaction = {hash: "Not provided", gasPrice: project.txParams.gasPrice}
        let transactionReceipt = {hash: "Not provided", status: 0, gasUsed: "Not Provided"}
        return { transaction, transactionReceipt }
    }
 
}

module.exports = ZosJSONRPCPrivateKeyDeployer 