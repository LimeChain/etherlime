/// <reference types="node" />
/// <reference types="dropboxjs" />
import PreloadFile from '../generic/preload_file';
import { BaseFileSystem, FileSystem, BFSOneArgCallback, BFSCallback, FileSystemOptions } from '../core/file_system';
import { FileFlag } from '../core/file_flag';
import { default as Stats, FileType } from '../core/node_fs_stats';
import { ApiError } from '../core/api_error';
import { File } from '../core/file';
export declare class DropboxFile extends PreloadFile<DropboxFileSystem> implements File {
    constructor(_fs: DropboxFileSystem, _path: string, _flag: FileFlag, _stat: Stats, contents?: Buffer);
    sync(cb: BFSOneArgCallback): void;
    close(cb: BFSOneArgCallback): void;
}
/**
 * Options for the Dropbox file system.
 */
export interface DropboxFileSystemOptions {
    client: Dropbox.Client;
}
/**
 * A read/write file system backed by Dropbox cloud storage.
 *
 * Uses the Dropbox V1 API.
 *
 * NOTE: You must use the v0.10 version of the [Dropbox JavaScript SDK](https://www.npmjs.com/package/dropbox).
 */
export default class DropboxFileSystem extends BaseFileSystem implements FileSystem {
    static readonly Name: string;
    static readonly Options: FileSystemOptions;
    /**
     * Creates a new DropboxFileSystem instance with the given options.
     * Must be given an *authenticated* DropboxJS client from the old v0.10 version of the Dropbox JS SDK.
     */
    static Create(opts: DropboxFileSystemOptions, cb: BFSCallback<DropboxFileSystem>): void;
    static isAvailable(): boolean;
    private _client;
    /**
     * **Deprecated. Please use Dropbox.Create() method instead.**
     *
     * Constructs a Dropbox-backed file system using the *authenticated* DropboxJS client.
     *
     * Note that you must use the old v0.10 version of the Dropbox JavaScript SDK.
     */
    constructor(client: Dropbox.Client, deprecateMsg?: boolean);
    getName(): string;
    isReadOnly(): boolean;
    supportsSymlinks(): boolean;
    supportsProps(): boolean;
    supportsSynch(): boolean;
    empty(mainCb: BFSOneArgCallback): void;
    rename(oldPath: string, newPath: string, cb: BFSOneArgCallback): void;
    stat(path: string, isLstat: boolean, cb: BFSCallback<Stats>): void;
    open(path: string, flags: FileFlag, mode: number, cb: BFSCallback<File>): void;
    _writeFileStrict(p: string, data: ArrayBuffer, cb: BFSCallback<Dropbox.File.Stat>): void;
    /**
     * Private
     * Returns a BrowserFS object representing the type of a Dropbox.js stat object
     */
    _statType(stat: Dropbox.File.Stat): FileType;
    /**
     * Private
     * Returns a BrowserFS object representing a File, created from the data
     * returned by calls to the Dropbox API.
     */
    _makeFile(path: string, flag: FileFlag, stat: Dropbox.File.Stat, buffer: Buffer): DropboxFile;
    /**
     * Private
     * Delete a file or directory from Dropbox
     * isFile should reflect which call was made to remove the it (`unlink` or
     * `rmdir`). If this doesn't match what's actually at `path`, an error will be
     * returned
     */
    _remove(path: string, cb: BFSOneArgCallback, isFile: boolean): void;
    /**
     * Delete a file
     */
    unlink(path: string, cb: BFSOneArgCallback): void;
    /**
     * Delete a directory
     */
    rmdir(path: string, cb: BFSOneArgCallback): void;
    /**
     * Create a directory
     */
    mkdir(p: string, mode: number, cb: BFSOneArgCallback): void;
    /**
     * Get the names of the files in a directory
     */
    readdir(path: string, cb: BFSCallback<string[]>): void;
    /**
     * Converts a Dropbox-JS error into a BFS error.
     */
    convert(err: Dropbox.ApiError, path?: string | null): ApiError;
}
