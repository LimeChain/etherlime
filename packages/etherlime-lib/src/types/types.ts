import Global = NodeJS.Global;
import { Wallet } from "ethers";

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

export interface Generic<T> {
    [name: string]: T;
}