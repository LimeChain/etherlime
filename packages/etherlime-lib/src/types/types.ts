import Global = NodeJS.Global;
import { Wallet } from "ethers";
import { Contract } from 'zos-lib';
import { ZosJSONRPCPrivateKeyDeployer } from "..";

export interface txParams {
    gasPrice?: number,
    gasLimit?: number,
    chainId?: number,
    etherscanApiKey?: string
}

export interface compiledContract {
    abi: any[],
    bytecode: string,
    contractName: string,
    compiler: {version: string}
}

export interface etherlimeWallet {
    secretKey: string,
	signer: Wallet
}

export interface JSONRPCGlobal extends Global {
  coverageSubprovider: any
  provider: any
}

export interface proxyData {
    address: string,
    deployer: ZosJSONRPCPrivateKeyDeployer,
    network: string 
}

export interface Generic<T> {
    [name: string]: T;
}