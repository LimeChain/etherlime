import { AbstractArtifactAdapter, SubTraceInfo, TraceInfoSubprovider } from '@0x/sol-tracing-utils';
/**
 * This type defines the schema of the config object that could be passed to CoverageSubprovider
 * isVerbose: If true - will log any unknown transactions. Defaults to true.
 * ignoreFilesGlobs: The list of globs matching the file names of the files we want to ignore coverage for. Defaults to [].
 */
export interface CoverageSubproviderConfig {
    isVerbose: boolean;
    ignoreFilesGlobs: string[];
}
export declare type CoverageSubproviderPartialConfig = Partial<CoverageSubproviderConfig>;
export declare const DEFAULT_COVERAGE_SUBPROVIDER_CONFIG: {
    isVerbose: boolean;
    ignoreFilesGlobs: never[];
};
/**
 * This class implements the [web3-provider-engine](https://github.com/MetaMask/provider-engine) subprovider interface.
 * It's used to compute your code coverage while running solidity tests.
 */
export declare class CoverageSubprovider extends TraceInfoSubprovider {
    private readonly _coverageCollector;
    private readonly _coverageSubproviderCnfig;
    /**
     * Instantiates a CoverageSubprovider instance
     * @param artifactAdapter Adapter for used artifacts format (0x, truffle, giveth, etc.)
     * @param defaultFromAddress default from address to use when sending transactions
     * @param partialConfig Partial configuration object
     */
    constructor(artifactAdapter: AbstractArtifactAdapter, defaultFromAddress: string, partialConfig?: CoverageSubproviderPartialConfig);
    protected _handleSubTraceInfoAsync(subTraceInfo: SubTraceInfo): Promise<void>;
    /**
     * Write the test coverage results to a file in Istanbul format.
     */
    writeCoverageAsync(): Promise<void>;
    private _isFileIgnored;
    /**
     * Computes partial coverage for a single file & subtrace.
     * @param contractData      Contract metadata (source, srcMap, bytecode)
     * @param subtrace          A subset of a transcation/call trace that was executed within that contract
     * @param pcToSourceRange   A mapping from program counters to source ranges
     * @param fileIndex         Index of a file to compute coverage for
     * @return Partial istanbul coverage for that file & subtrace
     */
    private _coverageHandler;
}
//# sourceMappingURL=coverage_subprovider.d.ts.map