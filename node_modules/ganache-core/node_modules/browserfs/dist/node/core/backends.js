exports.__esModule = true;
var util_1 = require("./util");
var AsyncMirror_1 = require("../backend/AsyncMirror");
var Dropbox_1 = require("../backend/Dropbox");
var Emscripten_1 = require("../backend/Emscripten");
var FolderAdapter_1 = require("../backend/FolderAdapter");
var HTML5FS_1 = require("../backend/HTML5FS");
var InMemory_1 = require("../backend/InMemory");
var IndexedDB_1 = require("../backend/IndexedDB");
var LocalStorage_1 = require("../backend/LocalStorage");
var MountableFileSystem_1 = require("../backend/MountableFileSystem");
var OverlayFS_1 = require("../backend/OverlayFS");
var WorkerFS_1 = require("../backend/WorkerFS");
var XmlHttpRequest_1 = require("../backend/XmlHttpRequest");
var ZipFS_1 = require("../backend/ZipFS");
var IsoFS_1 = require("../backend/IsoFS");
// Monkey-patch `Create` functions to check options before file system initialization.
[AsyncMirror_1["default"], Dropbox_1["default"], Emscripten_1["default"], FolderAdapter_1["default"], HTML5FS_1["default"], InMemory_1["default"], IndexedDB_1["default"], IsoFS_1["default"], LocalStorage_1["default"], MountableFileSystem_1["default"], OverlayFS_1["default"], WorkerFS_1["default"], XmlHttpRequest_1["default"], ZipFS_1["default"]].forEach(function (fsType) {
    var create = fsType.Create;
    fsType.Create = function (opts, cb) {
        var oneArg = typeof (opts) === "function";
        var normalizedCb = oneArg ? opts : cb;
        var normalizedOpts = oneArg ? {} : opts;
        function wrappedCb(e) {
            if (e) {
                normalizedCb(e);
            }
            else {
                create.call(fsType, normalizedOpts, normalizedCb);
            }
        }
        util_1.checkOptions(fsType, normalizedOpts, wrappedCb);
    };
});
/**
 * @hidden
 */
var Backends = { AsyncMirror: AsyncMirror_1["default"], Dropbox: Dropbox_1["default"], Emscripten: Emscripten_1["default"], FolderAdapter: FolderAdapter_1["default"], HTML5FS: HTML5FS_1["default"], InMemory: InMemory_1["default"], IndexedDB: IndexedDB_1["default"], IsoFS: IsoFS_1["default"], LocalStorage: LocalStorage_1["default"], MountableFileSystem: MountableFileSystem_1["default"], OverlayFS: OverlayFS_1["default"], WorkerFS: WorkerFS_1["default"], XmlHttpRequest: XmlHttpRequest_1["default"], ZipFS: ZipFS_1["default"] };
// Make sure all backends cast to FileSystemConstructor (for type checking)
var _ = Backends;
// tslint:disable-next-line:no-unused-expression
_;
// tslint:enable-next-line:no-unused-expression
exports["default"] = Backends;
//# sourceMappingURL=backends.js.map