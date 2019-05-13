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
Object.defineProperty(exports, "__esModule", { value: true });
var resolver_1 = require("./resolver");
/**
 * This resolver is a passthrough proxy to any resolver that records all the resolved contracts sources.
 * You can access them later using the `resolvedContractSources` public field.
 */
var SpyResolver = /** @class */ (function (_super) {
    __extends(SpyResolver, _super);
    function SpyResolver(resolver) {
        var _this = _super.call(this) || this;
        _this.resolvedContractSources = [];
        _this._resolver = resolver;
        return _this;
    }
    SpyResolver.prototype.resolveIfExists = function (importPath) {
        var contractSourceIfExists = this._resolver.resolveIfExists(importPath);
        if (contractSourceIfExists !== undefined) {
            this.resolvedContractSources.push(contractSourceIfExists);
        }
        return contractSourceIfExists;
    };
    return SpyResolver;
}(resolver_1.Resolver));
exports.SpyResolver = SpyResolver;
//# sourceMappingURL=spy_resolver.js.map