/// <reference types="node" />
import { BFSOneArgCallback, BFSCallback, FileSystemOptions } from '../core/file_system';
import { AsyncKeyValueROTransaction, AsyncKeyValueRWTransaction, AsyncKeyValueStore, AsyncKeyValueFileSystem } from '../generic/key_value_filesystem';
/**
 * @hidden
 */
export declare class IndexedDBROTransaction implements AsyncKeyValueROTransaction {
    tx: IDBTransaction;
    store: IDBObjectStore;
    constructor(tx: IDBTransaction, store: IDBObjectStore);
    get(key: string, cb: BFSCallback<Buffer>): void;
}
/**
 * @hidden
 */
export declare class IndexedDBRWTransaction extends IndexedDBROTransaction implements AsyncKeyValueRWTransaction, AsyncKeyValueROTransaction {
    constructor(tx: IDBTransaction, store: IDBObjectStore);
    put(key: string, data: Buffer, overwrite: boolean, cb: BFSCallback<boolean>): void;
    del(key: string, cb: BFSOneArgCallback): void;
    commit(cb: BFSOneArgCallback): void;
    abort(cb: BFSOneArgCallback): void;
}
export declare class IndexedDBStore implements AsyncKeyValueStore {
    private storeName;
    private db;
    constructor(cb: BFSCallback<IndexedDBStore>, storeName?: string);
    name(): string;
    clear(cb: BFSOneArgCallback): void;
    beginTransaction(type: 'readonly'): AsyncKeyValueROTransaction;
    beginTransaction(type: 'readwrite'): AsyncKeyValueRWTransaction;
}
/**
 * Configuration options for the IndexedDB file system.
 */
export interface IndexedDBFileSystemOptions {
    storeName?: string;
}
/**
 * A file system that uses the IndexedDB key value file system.
 */
export default class IndexedDBFileSystem extends AsyncKeyValueFileSystem {
    static readonly Name: string;
    static readonly Options: FileSystemOptions;
    /**
     * Constructs an IndexedDB file system with the given options.
     */
    static Create(opts: IndexedDBFileSystemOptions, cb: BFSCallback<IndexedDBFileSystem>): void;
    static isAvailable(): boolean;
    /**
     * **Deprecated. Use IndexedDB.Create() method instead.**
     *
     * Constructs an IndexedDB file system.
     * @param cb Called once the database is instantiated and ready for use.
     *   Passes an error if there was an issue instantiating the database.
     * @param storeName The name of this file system. You can have
     *   multiple IndexedDB file systems operating at once, but each must have
     *   a different name.
     */
    constructor(cb: BFSCallback<IndexedDBFileSystem>, storeName?: string, deprecateMsg?: boolean);
}
