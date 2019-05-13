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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var _ = require("lodash");
var path = require("path");
var resolver_1 = require("./resolver");
var NPMResolver = /** @class */ (function (_super) {
    __extends(NPMResolver, _super);
    function NPMResolver(packagePath) {
        var _this = _super.call(this) || this;
        _this._packagePath = packagePath;
        return _this;
    }
    NPMResolver.prototype.resolveIfExists = function (importPath) {
        var _a, _b;
        if (!importPath.startsWith('/')) {
            var packageName = void 0;
            var packageScopeIfExists = void 0;
            var other = void 0;
            if (_.startsWith(importPath, '@')) {
                _a = __read(importPath.split('/')), packageScopeIfExists = _a[0], packageName = _a[1], other = _a.slice(2);
            }
            else {
                _b = __read(importPath.split('/')), packageName = _b[0], other = _b.slice(1);
            }
            var pathWithinPackage = path.join.apply(path, __spread(other));
            var currentPath = this._packagePath;
            var ROOT_PATH = '/';
            while (currentPath !== ROOT_PATH) {
                var packagePath = packageScopeIfExists === undefined ? packageName : path.join(packageScopeIfExists, packageName);
                var lookupPath = path.join(currentPath, 'node_modules', packagePath, pathWithinPackage);
                if (fs.existsSync(lookupPath) && fs.lstatSync(lookupPath).isFile()) {
                    var fileContent = fs.readFileSync(lookupPath).toString();
                    return { source: fileContent, path: importPath, absolutePath: lookupPath };
                }
                currentPath = path.dirname(currentPath);
            }
        }
        return undefined;
    };
    return NPMResolver;
}(resolver_1.Resolver));
exports.NPMResolver = NPMResolver;
//# sourceMappingURL=npm_resolver.js.map