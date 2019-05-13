import { SupportedProvider, ZeroExProvider } from 'ethereum-types';
export declare const providerUtils: {
    /**
     * Starts the Web3ProviderEngine without excess block polling
     * @param providerEngine The Web3ProviderEngine
     */
    startProviderEngine(providerEngine: any): void;
    /**
     * Standardize the supported provider types into our internal provider interface
     * or throw if unsupported provider supplied.
     * @param supportedProvider Potentially supported provider instance
     * @return Provider that conforms of our internal provider interface
     */
    standardizeOrThrow(supportedProvider: SupportedProvider): ZeroExProvider;
};
//# sourceMappingURL=provider_utils.d.ts.map