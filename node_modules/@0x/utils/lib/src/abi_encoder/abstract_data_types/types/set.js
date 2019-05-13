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
Object.defineProperty(exports, "__esModule", { value: true });
var ethUtil = require("ethereumjs-util");
var _ = require("lodash");
var configured_bignumber_1 = require("../../../configured_bignumber");
var set_1 = require("../../calldata/blocks/set");
var constants_1 = require("../../utils/constants");
var data_type_1 = require("../data_type");
var pointer_1 = require("./pointer");
var AbstractSetDataType = /** @class */ (function (_super) {
    __extends(AbstractSetDataType, _super);
    function AbstractSetDataType(dataItem, factory, isArray, arrayLength, arrayElementType) {
        var _a, _b;
        if (isArray === void 0) { isArray = false; }
        var _this = _super.call(this, dataItem, factory) || this;
        _this._memberIndexByName = {};
        _this._members = [];
        _this._isArray = isArray;
        _this._arrayLength = arrayLength;
        _this._arrayElementType = arrayElementType;
        if (isArray && arrayLength !== undefined) {
            _a = __read(_this._createMembersWithLength(dataItem, arrayLength), 2), _this._members = _a[0], _this._memberIndexByName = _a[1];
        }
        else if (!isArray) {
            _b = __read(_this._createMembersWithKeys(dataItem), 2), _this._members = _b[0], _this._memberIndexByName = _b[1];
        }
        return _this;
    }
    AbstractSetDataType.prototype.generateCalldataBlock = function (value, parentBlock) {
        var block = value instanceof Array
            ? this._generateCalldataBlockFromArray(value, parentBlock)
            : this._generateCalldataBlockFromObject(value, parentBlock);
        return block;
    };
    AbstractSetDataType.prototype.generateValue = function (calldata, rules) {
        var _this = this;
        var _a;
        var members = this._members;
        // Case 1: This is an array of undefined length, which means that `this._members` was not
        //         populated in the constructor. So we must construct the set of members now.
        if (this._isArray && this._arrayLength === undefined) {
            var arrayLengthBuf = calldata.popWord();
            var arrayLengthHex = ethUtil.bufferToHex(arrayLengthBuf);
            var arrayLength = new configured_bignumber_1.BigNumber(arrayLengthHex, constants_1.constants.HEX_BASE);
            _a = __read(this._createMembersWithLength(this.getDataItem(), arrayLength.toNumber()), 1), members = _a[0];
        }
        // Create a new scope in the calldata, before descending into the members of this set.
        calldata.startScope();
        var value;
        if (rules.shouldConvertStructsToObjects && !this._isArray) {
            // Construct an object with values for each member of the set.
            value = {};
            _.each(this._memberIndexByName, function (idx, key) {
                var member = _this._members[idx];
                var memberValue = member.generateValue(calldata, rules);
                value[key] = memberValue;
            });
        }
        else {
            // Construct an array with values for each member of the set.
            value = [];
            _.each(members, function (member, idx) {
                var memberValue = member.generateValue(calldata, rules);
                value.push(memberValue);
            });
        }
        // Close this scope and return tetheh value.
        calldata.endScope();
        return value;
    };
    AbstractSetDataType.prototype.isStatic = function () {
        // An array with an undefined length is never static.
        if (this._isArray && this._arrayLength === undefined) {
            return false;
        }
        // If any member of the set is a pointer then the set is not static.
        var dependentMember = _.find(this._members, function (member) {
            return member instanceof pointer_1.AbstractPointerDataType;
        });
        var isStatic = dependentMember === undefined;
        return isStatic;
    };
    AbstractSetDataType.prototype.getDefaultValue = function (rules) {
        var _this = this;
        var defaultValue;
        if (this._isArray && this._arrayLength === undefined) {
            defaultValue = [];
        }
        else if (rules !== undefined && rules.shouldConvertStructsToObjects && !this._isArray) {
            defaultValue = {};
            _.each(this._memberIndexByName, function (idx, key) {
                var member = _this._members[idx];
                var memberValue = member.getDefaultValue();
                defaultValue[key] = memberValue;
            });
        }
        else {
            defaultValue = [];
            _.each(this._members, function (member, idx) {
                var memberValue = member.getDefaultValue();
                defaultValue.push(memberValue);
            });
        }
        return defaultValue;
    };
    AbstractSetDataType.prototype._generateCalldataBlockFromArray = function (value, parentBlock) {
        var _a;
        // Sanity check: if the set has a defined length then `value` must have the same length.
        if (this._arrayLength !== undefined && value.length !== this._arrayLength) {
            throw new Error("Expected array of " + JSON.stringify(this._arrayLength) + " elements, but got array of length " + JSON.stringify(value.length));
        }
        // Create a new calldata block for this set.
        var parentName = parentBlock === undefined ? '' : parentBlock.getName();
        var block = new set_1.SetCalldataBlock(this.getDataItem().name, this.getSignature(), parentName);
        // If this set has an undefined length then set its header to be the number of elements.
        var members = this._members;
        if (this._isArray && this._arrayLength === undefined) {
            _a = __read(this._createMembersWithLength(this.getDataItem(), value.length), 1), members = _a[0];
            var lenBuf = ethUtil.setLengthLeft(ethUtil.toBuffer("0x" + value.length.toString(constants_1.constants.HEX_BASE)), constants_1.constants.EVM_WORD_WIDTH_IN_BYTES);
            block.setHeader(lenBuf);
        }
        // Create blocks for members of set.
        var memberCalldataBlocks = [];
        _.each(members, function (member, idx) {
            var memberBlock = member.generateCalldataBlock(value[idx], block);
            memberCalldataBlocks.push(memberBlock);
        });
        block.setMembers(memberCalldataBlocks);
        return block;
    };
    AbstractSetDataType.prototype._generateCalldataBlockFromObject = function (obj, parentBlock) {
        var _this = this;
        // Create a new calldata block for this set.
        var parentName = parentBlock === undefined ? '' : parentBlock.getName();
        var block = new set_1.SetCalldataBlock(this.getDataItem().name, this.getSignature(), parentName);
        // Create blocks for members of set.
        var memberCalldataBlocks = [];
        _.forEach(this._memberIndexByName, function (memberIndex, memberName) {
            if (!(memberName in obj)) {
                throw new Error("Could not assign tuple to object: missing key '" + memberName + "' in object " + JSON.stringify(obj));
            }
            var memberValue = obj[memberName];
            var memberBlock = _this._members[memberIndex].generateCalldataBlock(memberValue, block);
            memberCalldataBlocks.push(memberBlock);
        });
        // Associate member blocks with Set block.
        block.setMembers(memberCalldataBlocks);
        return block;
    };
    AbstractSetDataType.prototype._computeSignatureOfMembers = function (isDetailed) {
        var _this = this;
        // Compute signature of members
        var signature = "(";
        _.each(this._members, function (member, i) {
            signature += member.getSignature(isDetailed);
            if (i < _this._members.length - 1) {
                signature += ',';
            }
        });
        signature += ')';
        return signature;
    };
    AbstractSetDataType.prototype._createMembersWithKeys = function (dataItem) {
        var _this = this;
        // Sanity check
        if (dataItem.components === undefined) {
            throw new Error("Tried to create a set using key/value pairs, but no components were defined by the input DataItem '" + dataItem.name + "'.");
        }
        // Create one member for each component of `dataItem`
        var members = [];
        var memberIndexByName = {};
        var memberNames = [];
        _.each(dataItem.components, function (memberItem) {
            // If a component with `name` already exists then
            // rename to `name_nameIdx` to avoid naming conflicts.
            var memberName = memberItem.name;
            var nameIdx = 0;
            while (_.includes(memberNames, memberName) || _.isEmpty(memberName)) {
                nameIdx++;
                memberName = memberItem.name + "_" + nameIdx;
            }
            memberNames.push(memberName);
            var childDataItem = {
                type: memberItem.type,
                name: dataItem.name + "." + memberName,
            };
            var components = memberItem.components;
            if (components !== undefined) {
                childDataItem.components = components;
            }
            var child = _this.getFactory().create(childDataItem, _this);
            memberIndexByName[memberName] = members.length;
            members.push(child);
        });
        return [members, memberIndexByName];
    };
    AbstractSetDataType.prototype._createMembersWithLength = function (dataItem, length) {
        var _this = this;
        // Create `length` members, deriving the type from `dataItem`
        var members = [];
        var memberIndexByName = {};
        var range = _.range(length);
        _.each(range, function (idx) {
            var memberDataItem = {
                type: _this._arrayElementType === undefined ? '' : _this._arrayElementType,
                name: dataItem.name + "[" + idx.toString(constants_1.constants.DEC_BASE) + "]",
            };
            var components = dataItem.components;
            if (components !== undefined) {
                memberDataItem.components = components;
            }
            var memberType = _this.getFactory().create(memberDataItem, _this);
            memberIndexByName[idx.toString(constants_1.constants.DEC_BASE)] = members.length;
            members.push(memberType);
        });
        return [members, memberIndexByName];
    };
    return AbstractSetDataType;
}(data_type_1.DataType));
exports.AbstractSetDataType = AbstractSetDataType;
//# sourceMappingURL=set.js.map