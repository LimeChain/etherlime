import { CompilerOptions, StandardOutput } from 'ethereum-types';
/**
 * The Compiler facilitates compiling Solidity smart contracts and saves the results
 * to artifact files.
 */
export declare class Compiler {
    private readonly _resolver;
    private readonly _nameResolver;
    private readonly _contractsDir;
    private readonly _compilerSettings;
    private readonly _artifactsDir;
    private readonly _solcVersionIfExists;
    private readonly _specifiedContracts;
    private readonly _useDockerisedSolc;
    private readonly _isOfflineMode;
    /**
     * Instantiates a new instance of the Compiler class.
     * @param opts Optional compiler options
     * @return An instance of the Compiler class.
     */
    constructor(opts?: CompilerOptions);
    /**
     * Compiles selected Solidity files found in `contractsDir` and writes JSON artifacts to `artifactsDir`.
     */
    compileAsync(): Promise<void>;
    /**
     * Compiles Solidity files specified during instantiation, and returns the
     * compiler output given by solc.  Return value is an array of outputs:
     * Solidity modules are batched together by version required, and each
     * element of the returned array corresponds to a compiler version, and
     * each element contains the output for all of the modules compiled with
     * that version.
     */
    getCompilerOutputsAsync(): Promise<StandardOutput[]>;
    watchAsync(): Promise<void>;
    private _getPathsToWatch;
    private _getContractNamesToCompile;
    /**
     * Compiles contracts, and, if `shouldPersist` is true, saves artifacts to artifactsDir.
     * @param fileName Name of contract with '.sol' extension.
     * @return an array of compiler outputs, where each element corresponds to a different version of solc-js.
     */
    private _compileContractsAsync;
    private _shouldCompile;
    private _persistCompiledContractAsync;
}
//# sourceMappingURL=compiler.d.ts.map