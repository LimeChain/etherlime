import { BaseFileSystem, FileSystem, BFSCallback, FileSystemOptions } from '../core/file_system';
import { ApiError } from '../core/api_error';
/**
 * Configuration options for a FolderAdapter file system.
 */
export interface FolderAdapterOptions {
    folder: string;
    wrapped: FileSystem;
}
/**
 * The FolderAdapter file system wraps a file system, and scopes all interactions to a subfolder of that file system.
 *
 * Example: Given a file system `foo` with folder `bar` and file `bar/baz`...
 *
 * ```javascript
 * BrowserFS.configure({
 *   fs: "FolderAdapter",
 *   options: {
 *     folder: "bar",
 *     wrapped: foo
 *   }
 * }, function(e) {
 *   var fs = BrowserFS.BFSRequire('fs');
 *   fs.readdirSync('/'); // ['baz']
 * });
 * ```
 */
export default class FolderAdapter extends BaseFileSystem implements FileSystem {
    static readonly Name: string;
    static readonly Options: FileSystemOptions;
    /**
     * Creates a FolderAdapter instance with the given options.
     */
    static Create(opts: FolderAdapterOptions, cb: BFSCallback<FolderAdapter>): void;
    static isAvailable(): boolean;
    _wrapped: FileSystem;
    _folder: string;
    /**
     * Wraps a file system, and uses the given folder as its root.
     *
     * @param folder The folder to use as the root directory.
     * @param wrapped The file system to wrap.
     */
    constructor(folder: string, wrapped: FileSystem);
    /**
     * Initialize the file system. Ensures that the wrapped file system
     * has the given folder.
     */
    initialize(cb: (e?: ApiError) => void): void;
    getName(): string;
    isReadOnly(): boolean;
    supportsProps(): boolean;
    supportsSynch(): boolean;
    supportsLinks(): boolean;
}
