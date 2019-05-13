"use strict";
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
exports.classUtils = {
    // This is useful for classes that have nested methods. Nested methods don't get bound out of the box.
    bindAll: function (self, exclude, thisArg) {
        if (exclude === void 0) { exclude = ['contructor']; }
        var e_1, _a;
        try {
            for (var _b = __values(Object.getOwnPropertyNames(self)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var key = _c.value;
                var val = self[key];
                if (!_.includes(exclude, key)) {
                    if (_.isFunction(val)) {
                        self[key] = val.bind(thisArg || self);
                    }
                    else if (_.isObject(val)) {
                        exports.classUtils.bindAll(val, exclude, self);
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return self;
    },
};
//# sourceMappingURL=class_utils.js.map