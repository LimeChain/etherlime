var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var preload_file_1 = require("../generic/preload_file");
var file_system_1 = require("../core/file_system");
var node_fs_stats_1 = require("../core/node_fs_stats");
var api_error_1 = require("../core/api_error");
var async_1 = require("async");
var path = require("path");
var util_1 = require("../core/util");
/**
 * @hidden
 */
var errorCodeLookup;
/**
 * Lazily construct error code lookup, since DropboxJS might be loaded *after* BrowserFS (or not at all!)
 * @hidden
 */
function constructErrorCodeLookup() {
    if (errorCodeLookup) {
        return;
    }
    errorCodeLookup = {};
    // This indicates a network transmission error on modern browsers. Internet Explorer might cause this code to be reported on some API server errors.
    errorCodeLookup[Dropbox.ApiError.NETWORK_ERROR] = api_error_1.ErrorCode.EIO;
    // This happens when the contentHash parameter passed to a Dropbox.Client#readdir or Dropbox.Client#stat matches the most recent content, so the API call response is omitted, to save bandwidth.
    // errorCodeLookup[Dropbox.ApiError.NO_CONTENT];
    // The error property on {Dropbox.ApiError#response} should indicate which input parameter is invalid and why.
    errorCodeLookup[Dropbox.ApiError.INVALID_PARAM] = api_error_1.ErrorCode.EINVAL;
    // The OAuth token used for the request will never become valid again, so the user should be re-authenticated.
    errorCodeLookup[Dropbox.ApiError.INVALID_TOKEN] = api_error_1.ErrorCode.EPERM;
    // This indicates a bug in dropbox.js and should never occur under normal circumstances.
    // ^ Actually, that's false. This occurs when you try to move folders to themselves, or move a file over another file.
    errorCodeLookup[Dropbox.ApiError.OAUTH_ERROR] = api_error_1.ErrorCode.EPERM;
    // This happens when trying to read from a non-existing file, readdir a non-existing directory, write a file into a non-existing directory, etc.
    errorCodeLookup[Dropbox.ApiError.NOT_FOUND] = api_error_1.ErrorCode.ENOENT;
    // This indicates a bug in dropbox.js and should never occur under normal circumstances.
    errorCodeLookup[Dropbox.ApiError.INVALID_METHOD] = api_error_1.ErrorCode.EINVAL;
    // This happens when a Dropbox.Client#readdir or Dropbox.Client#stat call would return more than a maximum amount of directory entries.
    errorCodeLookup[Dropbox.ApiError.NOT_ACCEPTABLE] = api_error_1.ErrorCode.EINVAL;
    // This is used by some backend methods to indicate that the client needs to download server-side changes and perform conflict resolution. Under normal usage, errors with this code should never surface to the code using dropbox.js.
    errorCodeLookup[Dropbox.ApiError.CONFLICT] = api_error_1.ErrorCode.EINVAL;
    // Status value indicating that the application is making too many requests.
    errorCodeLookup[Dropbox.ApiError.RATE_LIMITED] = api_error_1.ErrorCode.EBUSY;
    // The request should be retried after some time.
    errorCodeLookup[Dropbox.ApiError.SERVER_ERROR] = api_error_1.ErrorCode.EBUSY;
    // Status value indicating that the user's Dropbox is over its storage quota.
    errorCodeLookup[Dropbox.ApiError.OVER_QUOTA] = api_error_1.ErrorCode.ENOSPC;
}
/**
 * @hidden
 */
function isFileInfo(cache) {
    return cache && cache.stat.isFile;
}
/**
 * @hidden
 */
function isDirInfo(cache) {
    return cache && cache.stat.isFolder;
}
/**
 * @hidden
 */
function isArrayBuffer(ab) {
    // Accept null / undefined, too.
    return ab === null || ab === undefined || (typeof (ab) === 'object' && typeof (ab['byteLength']) === 'number');
}
/**
 * Wraps a Dropbox client and caches operations.
 * @hidden
 */
var CachedDropboxClient = (function () {
    function CachedDropboxClient(client) {
        this._cache = {};
        this._client = client;
    }
    CachedDropboxClient.prototype.readdir = function (p, cb) {
        var _this = this;
        var cacheInfo = this.getCachedDirInfo(p);
        this._wrap(function (interceptCb) {
            if (cacheInfo !== null && cacheInfo.contents) {
                _this._client.readdir(p, {
                    contentHash: cacheInfo.stat.contentHash
                }, interceptCb);
            }
            else {
                _this._client.readdir(p, interceptCb);
            }
        }, function (err, filenames, stat, folderEntries) {
            if (err) {
                if (err.status === Dropbox.ApiError.NO_CONTENT && cacheInfo !== null) {
                    cb(null, cacheInfo.contents.slice(0));
                }
                else {
                    cb(err);
                }
            }
            else {
                _this.updateCachedDirInfo(p, stat, filenames.slice(0));
                folderEntries.forEach(function (entry) {
                    _this.updateCachedInfo(path.join(p, entry.name), entry);
                });
                cb(null, filenames);
            }
        });
    };
    CachedDropboxClient.prototype.remove = function (p, cb) {
        var _this = this;
        this._wrap(function (interceptCb) {
            _this._client.remove(p, interceptCb);
        }, function (err, stat) {
            if (!err) {
                _this.updateCachedInfo(p, stat);
            }
            cb(err);
        });
    };
    CachedDropboxClient.prototype.move = function (src, dest, cb) {
        var _this = this;
        this._wrap(function (interceptCb) {
            _this._client.move(src, dest, interceptCb);
        }, function (err, stat) {
            if (!err) {
                _this.deleteCachedInfo(src);
                _this.updateCachedInfo(dest, stat);
            }
            cb(err);
        });
    };
    CachedDropboxClient.prototype.stat = function (p, cb) {
        var _this = this;
        this._wrap(function (interceptCb) {
            _this._client.stat(p, interceptCb);
        }, function (err, stat) {
            if (!err) {
                _this.updateCachedInfo(p, stat);
            }
            cb(err, stat);
        });
    };
    CachedDropboxClient.prototype.readFile = function (p, cb) {
        var _this = this;
        var cacheInfo = this.getCachedFileInfo(p);
        if (cacheInfo !== null && cacheInfo.contents !== null) {
            // Try to use cached info; issue a stat to see if contents are up-to-date.
            this.stat(p, function (error, stat) {
                if (error) {
                    cb(error);
                }
                else if (stat.contentHash === cacheInfo.stat.contentHash) {
                    // No file changes.
                    cb(error, cacheInfo.contents.slice(0), cacheInfo.stat);
                }
                else {
                    // File changes; rerun to trigger actual readFile.
                    _this.readFile(p, cb);
                }
            });
        }
        else {
            this._wrap(function (interceptCb) {
                _this._client.readFile(p, { arrayBuffer: true }, interceptCb);
            }, function (err, contents, stat) {
                if (!err) {
                    _this.updateCachedInfo(p, stat, contents.slice(0));
                }
                cb(err, contents, stat);
            });
        }
    };
    CachedDropboxClient.prototype.writeFile = function (p, contents, cb) {
        var _this = this;
        this._wrap(function (interceptCb) {
            _this._client.writeFile(p, contents, interceptCb);
        }, function (err, stat) {
            if (!err) {
                _this.updateCachedInfo(p, stat, contents.slice(0));
            }
            cb(err, stat);
        });
    };
    CachedDropboxClient.prototype.mkdir = function (p, cb) {
        var _this = this;
        this._wrap(function (interceptCb) {
            _this._client.mkdir(p, interceptCb);
        }, function (err, stat) {
            if (!err) {
                _this.updateCachedInfo(p, stat, []);
            }
            cb(err);
        });
    };
    /**
     * Wraps an operation such that we retry a failed operation 3 times.
     * Necessary to deal with Dropbox rate limiting.
     *
     * @param performOp Function that performs the operation. Will be called up to three times.
     * @param cb Called when the operation succeeds, fails in a non-temporary manner, or fails three times.
     */
    CachedDropboxClient.prototype._wrap = function (performOp, cb) {
        var numRun = 0;
        var interceptCb = function (error) {
            // Timeout duration, in seconds.
            var timeoutDuration = 2;
            if (error && 3 > (++numRun)) {
                switch (error.status) {
                    case Dropbox.ApiError.SERVER_ERROR:
                    case Dropbox.ApiError.NETWORK_ERROR:
                    case Dropbox.ApiError.RATE_LIMITED:
                        setTimeout(function () {
                            performOp(interceptCb);
                        }, timeoutDuration * 1000);
                        break;
                    default:
                        cb.apply(null, arguments);
                        break;
                }
            }
            else {
                cb.apply(null, arguments);
            }
        };
        performOp(interceptCb);
    };
    CachedDropboxClient.prototype.getCachedInfo = function (p) {
        return this._cache[p.toLowerCase()];
    };
    CachedDropboxClient.prototype.putCachedInfo = function (p, cache) {
        this._cache[p.toLowerCase()] = cache;
    };
    CachedDropboxClient.prototype.deleteCachedInfo = function (p) {
        delete this._cache[p.toLowerCase()];
    };
    CachedDropboxClient.prototype.getCachedDirInfo = function (p) {
        var info = this.getCachedInfo(p);
        if (isDirInfo(info)) {
            return info;
        }
        else {
            return null;
        }
    };
    CachedDropboxClient.prototype.getCachedFileInfo = function (p) {
        var info = this.getCachedInfo(p);
        if (isFileInfo(info)) {
            return info;
        }
        else {
            return null;
        }
    };
    CachedDropboxClient.prototype.updateCachedDirInfo = function (p, stat, contents) {
        if (contents === void 0) { contents = null; }
        var cachedInfo = this.getCachedInfo(p);
        // Dropbox uses the *contentHash* property for directories.
        // Ignore stat objects w/o a contentHash defined; those actually exist!!!
        // (Example: readdir returns an array of stat objs; stat objs for dirs in that context have no contentHash)
        if (stat.contentHash !== null && (cachedInfo === undefined || cachedInfo.stat.contentHash !== stat.contentHash)) {
            this.putCachedInfo(p, {
                stat: stat,
                contents: contents
            });
        }
    };
    CachedDropboxClient.prototype.updateCachedFileInfo = function (p, stat, contents) {
        if (contents === void 0) { contents = null; }
        var cachedInfo = this.getCachedInfo(p);
        // Dropbox uses the *versionTag* property for files.
        // Ignore stat objects w/o a versionTag defined.
        if (stat.versionTag !== null && (cachedInfo === undefined || cachedInfo.stat.versionTag !== stat.versionTag)) {
            this.putCachedInfo(p, {
                stat: stat,
                contents: contents
            });
        }
    };
    CachedDropboxClient.prototype.updateCachedInfo = function (p, stat, contents) {
        if (contents === void 0) { contents = null; }
        if (stat.isFile && isArrayBuffer(contents)) {
            this.updateCachedFileInfo(p, stat, contents);
        }
        else if (stat.isFolder && Array.isArray(contents)) {
            this.updateCachedDirInfo(p, stat, contents);
        }
    };
    return CachedDropboxClient;
}());
var DropboxFile = (function (_super) {
    __extends(DropboxFile, _super);
    function DropboxFile(_fs, _path, _flag, _stat, contents) {
        return _super.call(this, _fs, _path, _flag, _stat, contents) || this;
    }
    DropboxFile.prototype.sync = function (cb) {
        var _this = this;
        if (this.isDirty()) {
            var buffer = this.getBuffer(), arrayBuffer = util_1.buffer2ArrayBuffer(buffer);
            this._fs._writeFileStrict(this.getPath(), arrayBuffer, function (e) {
                if (!e) {
                    _this.resetDirty();
                }
                cb(e);
            });
        }
        else {
            cb();
        }
    };
    DropboxFile.prototype.close = function (cb) {
        this.sync(cb);
    };
    return DropboxFile;
}(preload_file_1["default"]));
exports.DropboxFile = DropboxFile;
/**
 * A read/write file system backed by Dropbox cloud storage.
 *
 * Uses the Dropbox V1 API.
 *
 * NOTE: You must use the v0.10 version of the [Dropbox JavaScript SDK](https://www.npmjs.com/package/dropbox).
 */
var DropboxFileSystem = (function (_super) {
    __extends(DropboxFileSystem, _super);
    /**
     * **Deprecated. Please use Dropbox.Create() method instead.**
     *
     * Constructs a Dropbox-backed file system using the *authenticated* DropboxJS client.
     *
     * Note that you must use the old v0.10 version of the Dropbox JavaScript SDK.
     */
    function DropboxFileSystem(client, deprecateMsg) {
        if (deprecateMsg === void 0) { deprecateMsg = true; }
        var _this = _super.call(this) || this;
        _this._client = new CachedDropboxClient(client);
        util_1.deprecationMessage(deprecateMsg, DropboxFileSystem.Name, { client: "authenticated dropbox client instance" });
        constructErrorCodeLookup();
        return _this;
    }
    /**
     * Creates a new DropboxFileSystem instance with the given options.
     * Must be given an *authenticated* DropboxJS client from the old v0.10 version of the Dropbox JS SDK.
     */
    DropboxFileSystem.Create = function (opts, cb) {
        cb(null, new DropboxFileSystem(opts.client, false));
    };
    DropboxFileSystem.isAvailable = function () {
        // Checks if the Dropbox library is loaded.
        return typeof Dropbox !== 'undefined';
    };
    DropboxFileSystem.prototype.getName = function () {
        return DropboxFileSystem.Name;
    };
    DropboxFileSystem.prototype.isReadOnly = function () {
        return false;
    };
    // Dropbox doesn't support symlinks, properties, or synchronous calls
    DropboxFileSystem.prototype.supportsSymlinks = function () {
        return false;
    };
    DropboxFileSystem.prototype.supportsProps = function () {
        return false;
    };
    DropboxFileSystem.prototype.supportsSynch = function () {
        return false;
    };
    DropboxFileSystem.prototype.empty = function (mainCb) {
        var _this = this;
        this._client.readdir('/', function (error, files) {
            if (error) {
                mainCb(_this.convert(error, '/'));
            }
            else {
                var deleteFile = function (file, cb) {
                    var p = path.join('/', file);
                    _this._client.remove(p, function (err) {
                        cb(err ? _this.convert(err, p) : null);
                    });
                };
                var finished = function (err) {
                    if (err) {
                        mainCb(err);
                    }
                    else {
                        mainCb();
                    }
                };
                // XXX: <any> typing is to get around overly-restrictive ErrorCallback typing.
                async_1.each(files, deleteFile, finished);
            }
        });
    };
    DropboxFileSystem.prototype.rename = function (oldPath, newPath, cb) {
        var _this = this;
        this._client.move(oldPath, newPath, function (error) {
            if (error) {
                // the move is permitted if newPath is a file.
                // Check if this is the case, and remove if so.
                _this._client.stat(newPath, function (error2, stat) {
                    if (error2 || stat.isFolder) {
                        var missingPath = error.response.error.indexOf(oldPath) > -1 ? oldPath : newPath;
                        cb(_this.convert(error, missingPath));
                    }
                    else {
                        // Delete file, repeat rename.
                        _this._client.remove(newPath, function (error2) {
                            if (error2) {
                                cb(_this.convert(error2, newPath));
                            }
                            else {
                                _this.rename(oldPath, newPath, cb);
                            }
                        });
                    }
                });
            }
            else {
                cb();
            }
        });
    };
    DropboxFileSystem.prototype.stat = function (path, isLstat, cb) {
        var _this = this;
        // Ignore lstat case -- Dropbox doesn't support symlinks
        // Stat the file
        this._client.stat(path, function (error, stat) {
            if (error) {
                cb(_this.convert(error, path));
            }
            else if (stat && stat.isRemoved) {
                // Dropbox keeps track of deleted files, so if a file has existed in the
                // past but doesn't any longer, you wont get an error
                cb(api_error_1.ApiError.FileError(api_error_1.ErrorCode.ENOENT, path));
            }
            else {
                var stats = new node_fs_stats_1["default"](_this._statType(stat), stat.size);
                return cb(null, stats);
            }
        });
    };
    DropboxFileSystem.prototype.open = function (path, flags, mode, cb) {
        var _this = this;
        // Try and get the file's contents
        this._client.readFile(path, function (error, content, dbStat) {
            if (error) {
                // If the file's being opened for reading and doesn't exist, return an
                // error
                if (flags.isReadable()) {
                    cb(_this.convert(error, path));
                }
                else {
                    switch (error.status) {
                        // If it's being opened for writing or appending, create it so that
                        // it can be written to
                        case Dropbox.ApiError.NOT_FOUND:
                            var ab_1 = new ArrayBuffer(0);
                            return _this._writeFileStrict(path, ab_1, function (error2, stat) {
                                if (error2) {
                                    cb(error2);
                                }
                                else {
                                    var file = _this._makeFile(path, flags, stat, util_1.arrayBuffer2Buffer(ab_1));
                                    cb(null, file);
                                }
                            });
                        default:
                            return cb(_this.convert(error, path));
                    }
                }
            }
            else {
                // No error
                var buffer = void 0;
                // Dropbox.js seems to set `content` to `null` rather than to an empty
                // buffer when reading an empty file. Not sure why this is.
                if (content === null) {
                    buffer = util_1.emptyBuffer();
                }
                else {
                    buffer = util_1.arrayBuffer2Buffer(content);
                }
                var file = _this._makeFile(path, flags, dbStat, buffer);
                return cb(null, file);
            }
        });
    };
    DropboxFileSystem.prototype._writeFileStrict = function (p, data, cb) {
        var _this = this;
        var parent = path.dirname(p);
        this.stat(parent, false, function (error, stat) {
            if (error) {
                cb(api_error_1.ApiError.FileError(api_error_1.ErrorCode.ENOENT, parent));
            }
            else {
                _this._client.writeFile(p, data, function (error2, stat) {
                    if (error2) {
                        cb(_this.convert(error2, p));
                    }
                    else {
                        cb(null, stat);
                    }
                });
            }
        });
    };
    /**
     * Private
     * Returns a BrowserFS object representing the type of a Dropbox.js stat object
     */
    DropboxFileSystem.prototype._statType = function (stat) {
        return stat.isFile ? node_fs_stats_1.FileType.FILE : node_fs_stats_1.FileType.DIRECTORY;
    };
    /**
     * Private
     * Returns a BrowserFS object representing a File, created from the data
     * returned by calls to the Dropbox API.
     */
    DropboxFileSystem.prototype._makeFile = function (path, flag, stat, buffer) {
        var type = this._statType(stat);
        var stats = new node_fs_stats_1["default"](type, stat.size);
        return new DropboxFile(this, path, flag, stats, buffer);
    };
    /**
     * Private
     * Delete a file or directory from Dropbox
     * isFile should reflect which call was made to remove the it (`unlink` or
     * `rmdir`). If this doesn't match what's actually at `path`, an error will be
     * returned
     */
    DropboxFileSystem.prototype._remove = function (path, cb, isFile) {
        var _this = this;
        this._client.stat(path, function (error, stat) {
            if (error) {
                cb(_this.convert(error, path));
            }
            else {
                if (stat.isFile && !isFile) {
                    cb(api_error_1.ApiError.FileError(api_error_1.ErrorCode.ENOTDIR, path));
                }
                else if (!stat.isFile && isFile) {
                    cb(api_error_1.ApiError.FileError(api_error_1.ErrorCode.EISDIR, path));
                }
                else {
                    _this._client.remove(path, function (error) {
                        if (error) {
                            cb(_this.convert(error, path));
                        }
                        else {
                            cb(null);
                        }
                    });
                }
            }
        });
    };
    /**
     * Delete a file
     */
    DropboxFileSystem.prototype.unlink = function (path, cb) {
        this._remove(path, cb, true);
    };
    /**
     * Delete a directory
     */
    DropboxFileSystem.prototype.rmdir = function (path, cb) {
        this._remove(path, cb, false);
    };
    /**
     * Create a directory
     */
    DropboxFileSystem.prototype.mkdir = function (p, mode, cb) {
        var _this = this;
        // Dropbox.js' client.mkdir() behaves like `mkdir -p`, i.e. it creates a
        // directory and all its ancestors if they don't exist.
        // Node's fs.mkdir() behaves like `mkdir`, i.e. it throws an error if an attempt
        // is made to create a directory without a parent.
        // To handle this inconsistency, a check for the existence of `path`'s parent
        // must be performed before it is created, and an error thrown if it does
        // not exist
        var parent = path.dirname(p);
        this._client.stat(parent, function (error, stat) {
            if (error) {
                cb(_this.convert(error, parent));
            }
            else {
                _this._client.mkdir(p, function (error) {
                    if (error) {
                        cb(api_error_1.ApiError.FileError(api_error_1.ErrorCode.EEXIST, p));
                    }
                    else {
                        cb(null);
                    }
                });
            }
        });
    };
    /**
     * Get the names of the files in a directory
     */
    DropboxFileSystem.prototype.readdir = function (path, cb) {
        var _this = this;
        this._client.readdir(path, function (error, files) {
            if (error) {
                return cb(_this.convert(error));
            }
            else {
                return cb(null, files);
            }
        });
    };
    /**
     * Converts a Dropbox-JS error into a BFS error.
     */
    DropboxFileSystem.prototype.convert = function (err, path) {
        if (path === void 0) { path = null; }
        var errorCode = errorCodeLookup[err.status];
        if (errorCode === undefined) {
            errorCode = api_error_1.ErrorCode.EIO;
        }
        if (!path) {
            return new api_error_1.ApiError(errorCode);
        }
        else {
            return api_error_1.ApiError.FileError(errorCode, path);
        }
    };
    return DropboxFileSystem;
}(file_system_1.BaseFileSystem));
DropboxFileSystem.Name = "Dropbox";
DropboxFileSystem.Options = {
    client: {
        type: "object",
        description: "An *authenticated* Dropbox client. Must be from the 0.10 JS SDK.",
        validator: function (opt, cb) {
            if (opt.isAuthenticated && opt.isAuthenticated()) {
                cb();
            }
            else {
                cb(new api_error_1.ApiError(api_error_1.ErrorCode.EINVAL, "'client' option must be an authenticated Dropbox client from the v0.10 JS SDK."));
            }
        }
    }
};
exports["default"] = DropboxFileSystem;
//# sourceMappingURL=Dropbox.js.map