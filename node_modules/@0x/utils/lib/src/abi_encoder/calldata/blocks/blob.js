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
var calldata_block_1 = require("../calldata_block");
var BlobCalldataBlock = /** @class */ (function (_super) {
    __extends(BlobCalldataBlock, _super);
    function BlobCalldataBlock(name, signature, parentName, blob) {
        var _this = this;
        var headerSizeInBytes = 0;
        var bodySizeInBytes = blob.byteLength;
        _this = _super.call(this, name, signature, parentName, headerSizeInBytes, bodySizeInBytes) || this;
        _this._blob = blob;
        return _this;
    }
    BlobCalldataBlock.prototype.toBuffer = function () {
        return this._blob;
    };
    BlobCalldataBlock.prototype.getRawData = function () {
        return this._blob;
    };
    return BlobCalldataBlock;
}(calldata_block_1.CalldataBlock));
exports.BlobCalldataBlock = BlobCalldataBlock;
//# sourceMappingURL=blob.js.map