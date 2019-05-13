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
var AbiType;
(function (AbiType) {
    AbiType["Function"] = "function";
    AbiType["Constructor"] = "constructor";
    AbiType["Event"] = "event";
    AbiType["Fallback"] = "fallback";
})(AbiType = exports.AbiType || (exports.AbiType = {}));
var CompilationError = /** @class */ (function (_super) {
    __extends(CompilationError, _super);
    function CompilationError(errorsCount) {
        var _this = _super.call(this, 'Compilation errors encountered') || this;
        _this.typeName = 'CompilationError';
        _this.errorsCount = errorsCount;
        return _this;
    }
    return CompilationError;
}(Error));
exports.CompilationError = CompilationError;
//# sourceMappingURL=types.js.map