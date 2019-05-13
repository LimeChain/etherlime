/// <reference types="node" />
import { ContractSource, Resolver } from '@0x/sol-resolver';
import { ContractArtifact } from 'ethereum-types';
import * as solc from 'solc';
import { BinaryPaths } from './types';
/**
 * Gets contract data on network or returns if an artifact does not exist.
 * @param artifactsDir Path to the artifacts directory.
 * @param contractName Name of contract.
 * @return Contract data on network or undefined.
 */
export declare function getContractArtifactIfExistsAsync(artifactsDir: string, contractName: string): Promise<ContractArtifact | void>;
/**
 * Creates a directory if it does not already exist.
 * @param artifactsDir Path to the directory.
 */
export declare function createDirIfDoesNotExistAsync(dirPath: string): Promise<void>;
/**
 * Searches Solidity source code for compiler version range.
 * @param  source Source code of contract.
 * @return Solc compiler version range.
 */
export declare function parseSolidityVersionRange(source: string): string;
/**
 * Normalizes the path found in the error message. If it cannot be normalized
 * the original error message is returned.
 * Example: converts 'base/Token.sol:6:46: Warning: Unused local variable'
 *          to 'Token.sol:6:46: Warning: Unused local variable'
 * This is used to prevent logging the same error multiple times.
 * @param  errMsg An error message from the compiled output.
 * @return The error message with directories truncated from the contract path.
 */
export declare function getNormalizedErrMsg(errMsg: string): string;
/**
 * Parses the contract source code and extracts the dendencies
 * @param  source Contract source code
 * @return List of dependendencies
 */
export declare function parseDependencies(contractSource: ContractSource): string[];
/**
 * Fetches the list of available solidity compilers
 * @param isOfflineMode Offline mode flag
 */
export declare function getSolcJSReleasesAsync(isOfflineMode: boolean): Promise<BinaryPaths>;
/**
 * Compiles the contracts and prints errors/warnings
 * @param solcVersion Version of a solc compiler
 * @param standardInput Solidity standard JSON input
 * @param isOfflineMode Offline mode flag
 */
export declare function compileSolcJSAsync(solcVersion: string, standardInput: solc.StandardInput, isOfflineMode: boolean): Promise<solc.StandardOutput>;
/**
 * Compiles the contracts and prints errors/warnings
 * @param solcVersion Version of a solc compiler
 * @param standardInput Solidity standard JSON input
 */
export declare function compileDockerAsync(solcVersion: string, standardInput: solc.StandardInput): Promise<solc.StandardOutput>;
/**
 * Makes the path relative removing all system-dependent data. Converts absolute paths to a format suitable for artifacts.
 * @param absolutePathToSmth Absolute path to contract or source
 * @param contractsDir Current package contracts directory location
 * @param dependencyNameToPath Mapping of dependency name to package path
 */
export declare function makeContractPathsRelative(absolutePathToSmth: {
    [absoluteContractPath: string]: any;
}, contractsDir: string, dependencyNameToPath: {
    [dependencyName: string]: string;
}): {
    [contractPath: string]: any;
};
/**
 * Separates errors from warnings, formats the messages and prints them. Throws if there is any compilation error (not warning).
 * @param solcErrors The errors field of standard JSON output that contains errors and warnings.
 */
export declare function printCompilationErrorsAndWarnings(solcErrors: solc.SolcError[]): void;
/**
 * Gets the source tree hash for a file and its dependencies.
 * @param fileName Name of contract file.
 */
export declare function getSourceTreeHash(resolver: Resolver, importPath: string): Buffer;
/**
 * For the given @param contractPath, populates JSON objects to be used in the ContractVersionData interface's
 * properties `sources` (source code file names mapped to ID numbers) and `sourceCodes` (source code content of
 * contracts) for that contract.  The source code pointed to by contractPath is read and parsed directly (via
 * `resolver.resolve().source`), as are its imports, recursively.  The ID numbers for @return `sources` are
 * taken from the corresponding ID's in @param fullSources, and the content for @return sourceCodes is read from
 * disk (via the aforementioned `resolver.source`).
 */
export declare function getSourcesWithDependencies(resolver: Resolver, contractPath: string, fullSources: {
    [sourceName: string]: {
        id: number;
    };
}): {
    sourceCodes: {
        [sourceName: string]: string;
    };
    sources: {
        [sourceName: string]: {
            id: number;
        };
    };
};
/**
 * Gets the solidity compiler instance. If the compiler is already cached - gets it from FS,
 * otherwise - fetches it and caches it.
 * @param solcVersion The compiler version. e.g. 0.5.0
 * @param isOfflineMode Offline mode flag
 */
export declare function getSolcJSAsync(solcVersion: string, isOfflineMode: boolean): Promise<solc.SolcInstance>;
/**
 * Solidity compiler emits the bytecode without a 0x prefix for a hex. This function fixes it if bytecode is present.
 * @param compiledContract The standard JSON output section for a contract. Geth modified in place.
 */
export declare function addHexPrefixToContractBytecode(compiledContract: solc.StandardContractOutput): void;
/**
 * Takes the list of resolved contract sources from `SpyResolver` and produces a mapping from dependency name
 * to package path used in `remappings` later, as well as in generating the "relative" source paths saved to the artifact files.
 * @param contractSources The list of resolved contract sources
 */
export declare function getDependencyNameToPackagePath(contractSources: ContractSource[]): {
    [dependencyName: string]: string;
};
//# sourceMappingURL=compiler.d.ts.map