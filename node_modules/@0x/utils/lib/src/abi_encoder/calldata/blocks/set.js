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
var _ = require("lodash");
var calldata_block_1 = require("../calldata_block");
var SetCalldataBlock = /** @class */ (function (_super) {
    __extends(SetCalldataBlock, _super);
    function SetCalldataBlock(name, signature, parentName) {
        var _this = _super.call(this, name, signature, parentName, 0, 0) || this;
        _this._members = [];
        _this._header = undefined;
        return _this;
    }
    SetCalldataBlock.prototype.getRawData = function () {
        var rawDataComponents = [];
        if (this._header !== undefined) {
            rawDataComponents.push(this._header);
        }
        _.each(this._members, function (member) {
            var memberBuffer = member.getRawData();
            rawDataComponents.push(memberBuffer);
        });
        var rawData = Buffer.concat(rawDataComponents);
        return rawData;
    };
    SetCalldataBlock.prototype.setMembers = function (members) {
        this._members = members;
    };
    SetCalldataBlock.prototype.setHeader = function (header) {
        this._setHeaderSize(header.byteLength);
        this._header = header;
    };
    SetCalldataBlock.prototype.toBuffer = function () {
        if (this._header !== undefined) {
            return this._header;
        }
        return new Buffer('');
    };
    SetCalldataBlock.prototype.getMembers = function () {
        return this._members;
    };
    return SetCalldataBlock;
}(calldata_block_1.CalldataBlock));
exports.SetCalldataBlock = SetCalldataBlock;
//# sourceMappingURL=set.js.map