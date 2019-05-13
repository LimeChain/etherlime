/// <reference types="web3-provider-engine" />
import { Web3ProviderEngine } from '@0x/subproviders';
export interface Web3Config {
    hasAddresses?: boolean;
    shouldUseInProcessGanache?: boolean;
    shouldThrowErrorsOnGanacheRPCResponse?: boolean;
    rpcUrl?: string;
    shouldUseFakeGasEstimate?: boolean;
    ganacheDatabasePath?: string;
}
export declare const web3Factory: {
    getRpcProvider(config?: Web3Config): Web3ProviderEngine;
};
//# sourceMappingURL=web3_factory.d.ts.map