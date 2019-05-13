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
var signature_parser_1 = require("./utils/signature_parser");
var address_1 = require("./evm_data_types/address");
var array_1 = require("./evm_data_types/array");
var bool_1 = require("./evm_data_types/bool");
var dynamic_bytes_1 = require("./evm_data_types/dynamic_bytes");
var int_1 = require("./evm_data_types/int");
var method_1 = require("./evm_data_types/method");
var pointer_1 = require("./evm_data_types/pointer");
var static_bytes_1 = require("./evm_data_types/static_bytes");
var string_1 = require("./evm_data_types/string");
var tuple_1 = require("./evm_data_types/tuple");
var uint_1 = require("./evm_data_types/uint");
var Address = /** @class */ (function (_super) {
    __extends(Address, _super);
    function Address(dataItem) {
        return _super.call(this, dataItem, EvmDataTypeFactory.getInstance()) || this;
    }
    return Address;
}(address_1.AddressDataType));
exports.Address = Address;
var Bool = /** @class */ (function (_super) {
    __extends(Bool, _super);
    function Bool(dataItem) {
        return _super.call(this, dataItem, EvmDataTypeFactory.getInstance()) || this;
    }
    return Bool;
}(bool_1.BoolDataType));
exports.Bool = Bool;
var Int = /** @class */ (function (_super) {
    __extends(Int, _super);
    function Int(dataItem) {
        return _super.call(this, dataItem, EvmDataTypeFactory.getInstance()) || this;
    }
    return Int;
}(int_1.IntDataType));
exports.Int = Int;
var UInt = /** @class */ (function (_super) {
    __extends(UInt, _super);
    function UInt(dataItem) {
        return _super.call(this, dataItem, EvmDataTypeFactory.getInstance()) || this;
    }
    return UInt;
}(uint_1.UIntDataType));
exports.UInt = UInt;
var StaticBytes = /** @class */ (function (_super) {
    __extends(StaticBytes, _super);
    function StaticBytes(dataItem) {
        return _super.call(this, dataItem, EvmDataTypeFactory.getInstance()) || this;
    }
    return StaticBytes;
}(static_bytes_1.StaticBytesDataType));
exports.StaticBytes = StaticBytes;
var DynamicBytes = /** @class */ (function (_super) {
    __extends(DynamicBytes, _super);
    function DynamicBytes(dataItem) {
        return _super.call(this, dataItem, EvmDataTypeFactory.getInstance()) || this;
    }
    return DynamicBytes;
}(dynamic_bytes_1.DynamicBytesDataType));
exports.DynamicBytes = DynamicBytes;
var String = /** @class */ (function (_super) {
    __extends(String, _super);
    function String(dataItem) {
        return _super.call(this, dataItem, EvmDataTypeFactory.getInstance()) || this;
    }
    return String;
}(string_1.StringDataType));
exports.String = String;
var Pointer = /** @class */ (function (_super) {
    __extends(Pointer, _super);
    function Pointer(destDataType, parentDataType) {
        return _super.call(this, destDataType, parentDataType, EvmDataTypeFactory.getInstance()) || this;
    }
    return Pointer;
}(pointer_1.PointerDataType));
exports.Pointer = Pointer;
var Tuple = /** @class */ (function (_super) {
    __extends(Tuple, _super);
    function Tuple(dataItem) {
        return _super.call(this, dataItem, EvmDataTypeFactory.getInstance()) || this;
    }
    return Tuple;
}(tuple_1.TupleDataType));
exports.Tuple = Tuple;
var Array = /** @class */ (function (_super) {
    __extends(Array, _super);
    function Array(dataItem) {
        return _super.call(this, dataItem, EvmDataTypeFactory.getInstance()) || this;
    }
    return Array;
}(array_1.ArrayDataType));
exports.Array = Array;
var Method = /** @class */ (function (_super) {
    __extends(Method, _super);
    function Method(abi) {
        return _super.call(this, abi, EvmDataTypeFactory.getInstance()) || this;
    }
    return Method;
}(method_1.MethodDataType));
exports.Method = Method;
/* tslint:disable no-construct */
var EvmDataTypeFactory = /** @class */ (function () {
    /* tslint:enable prefer-function-over-method */
    function EvmDataTypeFactory() {
    }
    EvmDataTypeFactory.getInstance = function () {
        if (!EvmDataTypeFactory._instance) {
            EvmDataTypeFactory._instance = new EvmDataTypeFactory();
        }
        return EvmDataTypeFactory._instance;
    };
    /* tslint:disable prefer-function-over-method */
    EvmDataTypeFactory.prototype.create = function (dataItem, parentDataType) {
        // Create data type
        var dataType;
        if (Array.matchType(dataItem.type)) {
            dataType = new Array(dataItem);
        }
        else if (Address.matchType(dataItem.type)) {
            dataType = new Address(dataItem);
        }
        else if (Bool.matchType(dataItem.type)) {
            dataType = new Bool(dataItem);
        }
        else if (Int.matchType(dataItem.type)) {
            dataType = new Int(dataItem);
        }
        else if (UInt.matchType(dataItem.type)) {
            dataType = new UInt(dataItem);
        }
        else if (StaticBytes.matchType(dataItem.type)) {
            dataType = new StaticBytes(dataItem);
        }
        else if (Tuple.matchType(dataItem.type)) {
            dataType = new Tuple(dataItem);
        }
        else if (DynamicBytes.matchType(dataItem.type)) {
            dataType = new DynamicBytes(dataItem);
        }
        else if (String.matchType(dataItem.type)) {
            dataType = new String(dataItem);
        }
        // @TODO: DataTypeement Fixed/UFixed types
        if (dataType === undefined) {
            throw new Error("Unrecognized data type: '" + dataItem.type + "'");
        }
        else if (parentDataType !== undefined && !dataType.isStatic()) {
            var pointerToDataType = new Pointer(dataType, parentDataType);
            return pointerToDataType;
        }
        return dataType;
    };
    return EvmDataTypeFactory;
}());
exports.EvmDataTypeFactory = EvmDataTypeFactory;
/**
 * Convenience function for creating a DataType from different inputs.
 * @param input A single or set of DataItem or a signature for an EVM data type.
 * @return DataType corresponding to input.
 */
function create(input) {
    var dataItem = consolidateDataItemsIntoSingle(input);
    var dataType = EvmDataTypeFactory.getInstance().create(dataItem);
    return dataType;
}
exports.create = create;
/**
 * Convenience function to aggregate a single input or a set of inputs into a single DataItem.
 * An array of data items is grouped into a single tuple.
 * @param input A single data item; a set of data items; a signature.
 * @return A single data item corresponding to input.
 */
function consolidateDataItemsIntoSingle(input) {
    var dataItem;
    if (_.isArray(input)) {
        var dataItems = input;
        dataItem = {
            name: '',
            type: 'tuple',
            components: dataItems,
        };
    }
    else {
        dataItem = _.isString(input) ? signature_parser_1.generateDataItemFromSignature(input) : input;
    }
    return dataItem;
}
/**
 * Convenience function for creating a Method encoder from different inputs.
 * @param methodName name of method.
 * @param input A single data item; a set of data items; a signature; or an array of signatures (optional).
 * @param output A single data item; a set of data items; a signature; or an array of signatures (optional).
 * @return Method corresponding to input.
 */
function createMethod(methodName, input, output) {
    var methodInput = input === undefined ? [] : consolidateDataItemsIntoArray(input);
    var methodOutput = output === undefined ? [] : consolidateDataItemsIntoArray(output);
    var methodAbi = {
        name: methodName,
        inputs: methodInput,
        outputs: methodOutput,
        type: 'function',
        // default fields not used by ABI
        constant: false,
        payable: false,
        stateMutability: 'nonpayable',
    };
    var dataType = new Method(methodAbi);
    return dataType;
}
exports.createMethod = createMethod;
/**
 * Convenience function that aggregates a single input or a set of inputs into an array of DataItems.
 * @param input A single data item; a set of data items; a signature; or an array of signatures.
 * @return Array of data items corresponding to input.
 */
function consolidateDataItemsIntoArray(input) {
    var dataItems;
    if (_.isArray(input) && _.isEmpty(input)) {
        dataItems = [];
    }
    else if (_.isArray(input) && _.isString(input[0])) {
        dataItems = [];
        _.each(input, function (signature) {
            var dataItem = signature_parser_1.generateDataItemFromSignature(signature);
            dataItems.push(dataItem);
        });
    }
    else if (_.isArray(input)) {
        dataItems = input;
    }
    else if (typeof input === 'string') {
        var dataItem = signature_parser_1.generateDataItemFromSignature(input);
        dataItems = [dataItem];
    }
    else {
        dataItems = [input];
    }
    return dataItems;
}
/* tslint:enable no-construct */
//# sourceMappingURL=evm_data_type_factory.js.map