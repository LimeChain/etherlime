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
var key_value_filesystem_1 = require("../generic/key_value_filesystem");
/**
 * A simple in-memory key-value store backed by a JavaScript object.
 */
var InMemoryStore = (function () {
    function InMemoryStore() {
        this.store = {};
    }
    InMemoryStore.prototype.name = function () { return InMemoryFileSystem.Name; };
    InMemoryStore.prototype.clear = function () { this.store = {}; };
    InMemoryStore.prototype.beginTransaction = function (type) {
        return new key_value_filesystem_1.SimpleSyncRWTransaction(this);
    };
    InMemoryStore.prototype.get = function (key) {
        return this.store[key];
    };
    InMemoryStore.prototype.put = function (key, data, overwrite) {
        if (!overwrite && this.store.hasOwnProperty(key)) {
            return false;
        }
        this.store[key] = data;
        return true;
    };
    InMemoryStore.prototype.del = function (key) {
        delete this.store[key];
    };
    return InMemoryStore;
}());
exports.InMemoryStore = InMemoryStore;
/**
 * A simple in-memory file system backed by an InMemoryStore.
 * Files are not persisted across page loads.
 */
var InMemoryFileSystem = (function (_super) {
    __extends(InMemoryFileSystem, _super);
    function InMemoryFileSystem() {
        return _super.call(this, { store: new InMemoryStore() }) || this;
    }
    /**
     * Creates an InMemoryFileSystem instance.
     */
    InMemoryFileSystem.Create = function (options, cb) {
        cb(null, new InMemoryFileSystem());
    };
    return InMemoryFileSystem;
}(key_value_filesystem_1.SyncKeyValueFileSystem));
InMemoryFileSystem.Name = "InMemory";
InMemoryFileSystem.Options = {};
exports["default"] = InMemoryFileSystem;
//# sourceMappingURL=InMemory.js.map