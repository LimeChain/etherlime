exports.__esModule = true;
/**
 * Indicates the type of the given file. Applied to 'mode'.
 */
var FileType;
(function (FileType) {
    FileType[FileType["FILE"] = 32768] = "FILE";
    FileType[FileType["DIRECTORY"] = 16384] = "DIRECTORY";
    FileType[FileType["SYMLINK"] = 40960] = "SYMLINK";
})(FileType = exports.FileType || (exports.FileType = {}));
/**
 * Emulation of Node's `fs.Stats` object.
 *
 * Attribute descriptions are from `man 2 stat'
 * @see http://nodejs.org/api/fs.html#fs_class_fs_stats
 * @see http://man7.org/linux/man-pages/man2/stat.2.html
 */
var Stats = (function () {
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
    function Stats(itemType, size, mode, atime, mtime, ctime) {
        if (atime === void 0) { atime = new Date(); }
        if (mtime === void 0) { mtime = new Date(); }
        if (ctime === void 0) { ctime = new Date(); }
        this.size = size;
        this.atime = atime;
        this.mtime = mtime;
        this.ctime = ctime;
        /**
         * UNSUPPORTED ATTRIBUTES
         * I assume no one is going to need these details, although we could fake
         * appropriate values if need be.
         */
        // ID of device containing file
        this.dev = 0;
        // inode number
        this.ino = 0;
        // device ID (if special file)
        this.rdev = 0;
        // number of hard links
        this.nlink = 1;
        // blocksize for file system I/O
        this.blksize = 4096;
        // @todo Maybe support these? atm, it's a one-user filesystem.
        // user ID of owner
        this.uid = 0;
        // group ID of owner
        this.gid = 0;
        // time file was created (currently unsupported)
        this.birthtime = new Date(0);
        // XXX: Some file systems stash data on stats objects.
        this.fileData = null;
        if (!mode) {
            switch (itemType) {
                case FileType.FILE:
                    this.mode = 0x1a4;
                    break;
                case FileType.DIRECTORY:
                default:
                    this.mode = 0x1ff;
            }
        }
        else {
            this.mode = mode;
        }
        // number of 512B blocks allocated
        this.blocks = Math.ceil(size / 512);
        // Check if mode also includes top-most bits, which indicate the file's
        // type.
        if (this.mode < 0x1000) {
            this.mode |= itemType;
        }
    }
    Stats.fromBuffer = function (buffer) {
        var size = buffer.readUInt32LE(0), mode = buffer.readUInt32LE(4), atime = buffer.readDoubleLE(8), mtime = buffer.readDoubleLE(16), ctime = buffer.readDoubleLE(24);
        return new Stats(mode & 0xF000, size, mode & 0xFFF, new Date(atime), new Date(mtime), new Date(ctime));
    };
    Stats.prototype.toBuffer = function () {
        var buffer = Buffer.alloc(32);
        buffer.writeUInt32LE(this.size, 0);
        buffer.writeUInt32LE(this.mode, 4);
        buffer.writeDoubleLE(this.atime.getTime(), 8);
        buffer.writeDoubleLE(this.mtime.getTime(), 16);
        buffer.writeDoubleLE(this.ctime.getTime(), 24);
        return buffer;
    };
    /**
     * **Nonstandard**: Clone the stats object.
     * @return [BrowserFS.node.fs.Stats]
     */
    Stats.prototype.clone = function () {
        return new Stats(this.mode & 0xF000, this.size, this.mode & 0xFFF, this.atime, this.mtime, this.ctime);
    };
    /**
     * @return [Boolean] True if this item is a file.
     */
    Stats.prototype.isFile = function () {
        return (this.mode & 0xF000) === FileType.FILE;
    };
    /**
     * @return [Boolean] True if this item is a directory.
     */
    Stats.prototype.isDirectory = function () {
        return (this.mode & 0xF000) === FileType.DIRECTORY;
    };
    /**
     * @return [Boolean] True if this item is a symbolic link (only valid through lstat)
     */
    Stats.prototype.isSymbolicLink = function () {
        return (this.mode & 0xF000) === FileType.SYMLINK;
    };
    /**
     * Change the mode of the file. We use this helper function to prevent messing
     * up the type of the file, which is encoded in mode.
     */
    Stats.prototype.chmod = function (mode) {
        this.mode = (this.mode & 0xF000) | mode;
    };
    // We don't support the following types of files.
    Stats.prototype.isSocket = function () {
        return false;
    };
    Stats.prototype.isBlockDevice = function () {
        return false;
    };
    Stats.prototype.isCharacterDevice = function () {
        return false;
    };
    Stats.prototype.isFIFO = function () {
        return false;
    };
    return Stats;
}());
exports["default"] = Stats;
//# sourceMappingURL=node_fs_stats.js.map