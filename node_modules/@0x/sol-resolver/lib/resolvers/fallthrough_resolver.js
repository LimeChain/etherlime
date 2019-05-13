"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var resolver_1 = require("./resolver");
var FallthroughResolver = /** @class */ (function (_super) {
    __extends(FallthroughResolver, _super);
    function FallthroughResolver() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._resolvers = [];
        return _this;
    }
    FallthroughResolver.prototype.appendResolver = function (resolver) {
        this._resolvers.push(resolver);
    };
    FallthroughResolver.prototype.resolveIfExists = function (importPath) {
        var e_1, _a;
        try {
            for (var _b = __values(this._resolvers), _c = _b.next(); !_c.done; _c = _b.next()) {
                var resolver = _c.value;
                var contractSourceIfExists = resolver.resolveIfExists(importPath);
                if (contractSourceIfExists !== undefined) {
                    return contractSourceIfExists;
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
        return undefined;
    };
    return FallthroughResolver;
}(resolver_1.Resolver));
exports.FallthroughResolver = FallthroughResolver;
//# sourceMappingURL=fallthrough_resolver.js.map