"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(promise, callback) {
    if (typeof callback !== 'function') {
        return promise;
    }
    return promise.then((result) => {
        callback(null, result);
    }, (error) => {
        callback(error || new Error, null);
    });
}
exports.default = default_1;
