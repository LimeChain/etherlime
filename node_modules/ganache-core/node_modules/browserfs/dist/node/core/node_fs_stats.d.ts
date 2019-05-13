/// <reference types="node" />
import * as fs from 'fs';
/**
 * Indicates the type of the given file. Applied to 'mode'.
 */
export declare enum FileType {
    FILE = 32768,
    DIRECTORY = 16384,
    SYMLINK = 40960,
}
/**
 * Emulation of Node's `fs.Stats` object.
 *
 * Attribute descriptions are from `man 2 stat'
 * @see http://nodejs.org/api/fs.html#fs_class_fs_stats
 * @see http://man7.org/linux/man-pages/man2/stat.2.html
 */
export default class Stats implements fs.Stats {
    size: number;
    atime: Date;
    mtime: Date;
    ctime: Date;
    static fromBuffer(buffer: Buffer): Stats;
    blocks: number;
    mode: number;
    /**
     * UNSUPPORTED ATTRIBUTES
     * I assume no one is going to need these details, although we could fake
     * appropriate values if need be.
     */
    dev: number;
    ino: number;
    rdev: number;
    nlink: number;
    blksize: number;
    uid: number;
    gid: number;
    birthtime: Date;
    fileData: Buffer | null;
    /**
     * Provides information about a particular entry in the file system.
     * @param [Number] item_type type of the item (FILE, DIRECTORY, SYMLINK, or SOCKET)
     * @param [Number] size Size of the item in bytes. For directories/symlinks,
     *   this is normally the size of the struct that represents the item.
     * @param [Number] mode Unix-style file mode (e.g. 0o644)
     * @param [Date?] atime time of last access
     * @param [Date?] mtime time of last modification
     * @param [Date?] ctime time of creation
     */
    constructor(itemType: FileType, size: number, mode?: number, atime?: Date, mtime?: Date, ctime?: Date);
    toBuffer(): Buffer;
    /**
     * **Nonstandard**: Clone the stats object.
     * @return [BrowserFS.node.fs.Stats]
     */
    clone(): Stats;
    /**
     * @return [Boolean] True if this item is a file.
     */
    isFile(): boolean;
    /**
     * @return [Boolean] True if this item is a directory.
     */
    isDirectory(): boolean;
    /**
     * @return [Boolean] True if this item is a symbolic link (only valid through lstat)
     */
    isSymbolicLink(): boolean;
    /**
     * Change the mode of the file. We use this helper function to prevent messing
     * up the type of the file, which is encoded in mode.
     */
    chmod(mode: number): void;
    isSocket(): boolean;
    isBlockDevice(): boolean;
    isCharacterDevice(): boolean;
    isFIFO(): boolean;
}
