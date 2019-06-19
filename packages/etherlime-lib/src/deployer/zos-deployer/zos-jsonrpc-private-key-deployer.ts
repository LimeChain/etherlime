import { ZWeb3, Contract, Contracts, SimpleProject } from 'zos-lib';
import * as fs  from 'fs';
import * as path from 'path';

import JSONRPCPrivateKeyDeployer from '../jsonrpc-deployer/jsonrpc-private-key-deployer';
import { TxParams, CompiledContract, ProxyData } from '../../types/types';
import { TransactionResponse, TransactionReceipt } from 'ethers/providers';
import { BigNumber, bigNumberify } from 'ethers/utils';
import { DeployedContractWrapper } from '../..';


 class ZosJSONRPCPrivateKeyDeployer extends JSONRPCPrivateKeyDeployer {
    /**
	 *
	 * Instantiates new deployer based on the Zeppelin OS and private key based deployment signer instance
	 *
	 * @param {*} privateKey the private key for the deployer account
	 * @param {*} nodeUrl url of the network to deploy on. This is the node url address that is given to the class
	 * @param {*} defaultOverrides [Optional] default deployment overrides
	 */
	constructor(privateKey: string, nodeUrl: string, defaultOverrides: TxParams) {
        super(privateKey, nodeUrl, defaultOverrides);
        ZWeb3.initialize(this.nodeUrl);
    }


    async deploy(contract: CompiledContract, ...args): Promise<DeployedContractWrapper> {
        const deploymentArguments = Array.prototype.slice.call(args);

        await this._preValidateArguments(contract, deploymentArguments);

         /* Create a SimpleProject to interact with ZeppelinOS programmatically. */
        const project = await this._instantiateProject();
        const contractToDeploy = await this._readContract(contract);

        let proxyInstance;
        let proxyInstanceData = await this._findProxyInstanceData(contractToDeploy); // returns proxy data if it was already created

         try {
            // if proxy was deployed on the same network it will only be updated; otherwise a new instance will be created
            if(proxyInstanceData && proxyInstanceData.network === this.nodeUrl) {
                proxyInstance = await this._updateProxy(project, contractToDeploy, deploymentArguments);
            } else {
                proxyInstance = await this._createProxy(project, contractToDeploy, deploymentArguments);
            }

             proxyInstance = await this.wrapDeployedContract(contract, proxyInstance.address);

         } catch (e) {
            // if a transaction failed we need to customize params for the table result
            let { transaction, transactionReceipt } = await this._prepareTransactionStatus(project);
            await this._postValidateTransaction(contract, transaction, transactionReceipt);
        }
        
        await this._logAction(this.constructor.name, contract.contractName, 'Not provided', 0, project.txParams.gasPrice,'Not provided', proxyInstance.contractAddress, proxyInstance._contract.solcVersion, false);
        return proxyInstance;
    }

    private async _instantiateProject(): Promise<SimpleProject> {
        let projectName = path.parse(process.cwd()).name; // the name of the project is needed to instantiate it
        let transactionParams = await this._setTransactionParams();
        return new SimpleProject(projectName, undefined, transactionParams);
    }


    private async _readContract(contract: CompiledContract): Promise<Contract> {
        await Contracts.setLocalBuildDir(`${process.cwd()}/build`);
        return Contracts.getFromLocal(contract.contractName);
    }


    private async _findProxyInstanceData(contractToDeploy: Contract): Promise<ProxyData> {
        if(!fs.existsSync('./proxy.json')) {
            return
        }

        let deployedProxyData = JSON.parse(fs.readFileSync('./proxy.json').toString());
        return deployedProxyData[contractToDeploy.schema.contractName];
    }


    private async _updateProxy(project: SimpleProject, contractToDeploy: Contract, deploymentArguments: string[]): Promise<Contract> {
        let proxy = JSON.parse(fs.readFileSync('./proxy.json').toString());
        let proxyAddress = proxy[contractToDeploy.schema.contractName].address;
        let methodName = deploymentArguments[0];  // the name of the initMethod (if any)
        deploymentArguments.splice(0, 1); //init arguments
        let proxyInstance = await project.upgradeProxy(proxyAddress, contractToDeploy, { initMethod: methodName, initArgs: deploymentArguments });
        return proxyInstance;
    }


    private async _createProxy(project: SimpleProject, contractToDeploy: Contract, deploymentArguments: string[]): Promise<Contract> {
        let proxyInstance = await project.createProxy(contractToDeploy, { initArgs: deploymentArguments }) as Contract & {currentProvider: {host: string}};
        let proxyData = fs.existsSync('./proxy.json')? JSON.parse(fs.readFileSync('./proxy.json').toString()) : {};
        proxyData[proxyInstance.schema.contractName] = {address: proxyInstance.options.address, deployer: proxyInstance.options.from, network: proxyInstance.currentProvider.host};

         fs.writeFileSync('./proxy.json', JSON.stringify(proxyData, null, 4)); // second param is replacer if needed, third is number of spaces
        return proxyInstance;
    }


    private async _setTransactionParams(): Promise<any> {
        let transactionParams: any = {};
        let wallet = await ZWeb3.eth().accounts.wallet.add(this.signer.privateKey);
        transactionParams.from = wallet.address;
        transactionParams = await this._overrideDeployTransactionConfig(transactionParams);
        transactionParams.gas = transactionParams.gasLimit; // Zos deployer requires gas property, not gasLimit
        Contracts.setArtifactsDefaults(transactionParams); // set txParams on contract too
		return transactionParams;
    }

    private _prepareTransactionStatus(project: SimpleProject): any{
        let transaction = {hash: "Not provided", gasPrice: project.txParams.gasPrice}
        let transactionReceipt = { transactionHash: "Not provided", status: 0, gasUsed: "Not Provided" }
        return { transaction, transactionReceipt };
    }

 }

 export default ZosJSONRPCPrivateKeyDeployer  