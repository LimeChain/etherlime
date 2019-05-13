"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Queue = /** @class */ (function () {
    function Queue() {
        this._store = [];
    }
    Queue.prototype.pushBack = function (val) {
        this._store.push(val);
    };
    Queue.prototype.pushFront = function (val) {
        this._store.unshift(val);
    };
    Queue.prototype.popFront = function () {
        return this._store.shift();
    };
    Queue.prototype.popBack = function () {
        if (this._store.length === 0) {
            return undefined;
        }
        var backElement = this._store.splice(-1, 1)[0];
        return backElement;
    };
    Queue.prototype.mergeBack = function (q) {
        this._store = this._store.concat(q._store);
    };
    Queue.prototype.mergeFront = function (q) {
        this._store = q._store.concat(this._store);
    };
    Queue.prototype.getStore = function () {
        return this._store;
    };
    Queue.prototype.peekFront = function () {
        return this._store.length >= 0 ? this._store[0] : undefined;
    };
    return Queue;
}());
exports.Queue = Queue;
//# sourceMappingURL=queue.js.map