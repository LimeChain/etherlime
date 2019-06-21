import Global = NodeJS.Global;
import { Wallet } from "ethers";

export type TxParams = {
    gasPrice?: number,
    gasLimit?: number,
    chainId?: number,
    etherscanApiKey?: string
}

export type CompiledContract = {
    abi: any[],
    bytecode: string,
    contractName: string,
    compiler: {version: string}
}

export type EtherlimeWallet = {
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