"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var ethereum_types_1 = require("ethereum-types");
var ethers = require("ethers");
var _ = require("lodash");
var _1 = require(".");
var address_utils_1 = require("./address_utils");
var configured_bignumber_1 = require("./configured_bignumber");
/**
 * AbiDecoder allows you to decode event logs given a set of supplied contract ABI's. It takes the contract's event
 * signature from the ABI and attempts to decode the logs using it.
 */
var AbiDecoder = /** @class */ (function () {
    /**
     * Instantiate an AbiDecoder
     * @param abiArrays An array of contract ABI's
     * @return AbiDecoder instance
     */
    function AbiDecoder(abiArrays) {
        var _this = this;
        this._eventIds = {};
        this._selectorToFunctionInfo = {};
        _.each(abiArrays, function (abi) {
            _this.addABI(abi);
        });
    }
    /**
     * Retrieves the function selector from calldata.
     * @param calldata hex-encoded calldata.
     * @return hex-encoded function selector.
     */
    AbiDecoder._getFunctionSelector = function (calldata) {
        var functionSelectorLength = 10;
        if (!calldata.startsWith('0x') || calldata.length < functionSelectorLength) {
            throw new Error("Malformed calldata. Must include a hex prefix '0x' and 4-byte function selector. Got '" + calldata + "'");
        }
        var functionSelector = calldata.substr(0, functionSelectorLength);
        return functionSelector;
    };
    /**
     * Attempt to decode a log given the ABI's the AbiDecoder knows about.
     * @param log The log to attempt to decode
     * @return The decoded log if the requisite ABI was available. Otherwise the log unaltered.
     */
    AbiDecoder.prototype.tryToDecodeLogOrNoop = function (log) {
        var eventId = log.topics[0];
        var numIndexedArgs = log.topics.length - 1;
        if (this._eventIds[eventId] === undefined || this._eventIds[eventId][numIndexedArgs] === undefined) {
            return log;
        }
        var event = this._eventIds[eventId][numIndexedArgs];
        var ethersInterface = new ethers.utils.Interface([event]);
        var decodedParams = {};
        var topicsIndex = 1;
        var decodedData;
        try {
            decodedData = ethersInterface.events[event.name].decode(log.data);
        }
        catch (error) {
            if (error.code === ethers.errors.INVALID_ARGUMENT) {
                // Because we index events by Method ID, and Method IDs are derived from the method
                // name and the input parameters, it's possible that the return value of the event
                // does not match our ABI. If that's the case, then ethers will throw an error
                // when we try to parse the event. We handle that case here by returning the log rather
                // than throwing an error.
                return log;
            }
            throw error;
        }
        var didFailToDecode = false;
        _.forEach(event.inputs, function (param, i) {
            // Indexed parameters are stored in topics. Non-indexed ones in decodedData
            var value = param.indexed ? log.topics[topicsIndex++] : decodedData[i];
            if (value === undefined) {
                didFailToDecode = true;
                return;
            }
            if (param.type === ethereum_types_1.SolidityTypes.Address) {
                var baseHex = 16;
                value = address_utils_1.addressUtils.padZeros(new configured_bignumber_1.BigNumber(value.toLowerCase()).toString(baseHex));
            }
            else if (param.type === ethereum_types_1.SolidityTypes.Uint256 || param.type === ethereum_types_1.SolidityTypes.Uint) {
                value = new configured_bignumber_1.BigNumber(value);
            }
            else if (param.type === ethereum_types_1.SolidityTypes.Uint8) {
                value = new configured_bignumber_1.BigNumber(value).toNumber();
            }
            decodedParams[param.name] = value;
        });
        if (didFailToDecode) {
            return log;
        }
        else {
            return __assign({}, log, { event: event.name, args: decodedParams });
        }
    };
    /**
     * Decodes calldata for a known ABI.
     * @param calldata hex-encoded calldata.
     * @param contractName used to disambiguate similar ABI's (optional).
     * @return Decoded calldata. Includes: function name and signature, along with the decoded arguments.
     */
    AbiDecoder.prototype.decodeCalldataOrThrow = function (calldata, contractName) {
        var functionSelector = AbiDecoder._getFunctionSelector(calldata);
        var candidateFunctionInfos = this._selectorToFunctionInfo[functionSelector];
        if (candidateFunctionInfos === undefined) {
            throw new Error("No functions registered for selector '" + functionSelector + "'");
        }
        var functionInfo = _.find(candidateFunctionInfos, function (candidateFunctionInfo) {
            return (contractName === undefined || _.toLower(contractName) === _.toLower(candidateFunctionInfo.contractName));
        });
        if (functionInfo === undefined) {
            throw new Error("No function registered with selector " + functionSelector + " and contract name " + contractName + ".");
        }
        else if (functionInfo.abiEncoder === undefined) {
            throw new Error("Function ABI Encoder is not defined, for function registered with selector " + functionSelector + " and contract name " + contractName + ".");
        }
        var functionName = functionInfo.abiEncoder.getDataItem().name;
        var functionSignature = functionInfo.abiEncoder.getSignatureType();
        var functionArguments = functionInfo.abiEncoder.decode(calldata);
        var decodedCalldata = {
            functionName: functionName,
            functionSignature: functionSignature,
            functionArguments: functionArguments,
        };
        return decodedCalldata;
    };
    /**
     * Adds a set of ABI definitions, after which calldata and logs targeting these ABI's can be decoded.
     * Additional properties can be included to disambiguate similar ABI's. For example, if two functions
     * have the same signature but different parameter names, then their ABI definitions can be disambiguated
     * by specifying a contract name.
     * @param abiDefinitions ABI definitions for a given contract.
     * @param contractName Name of contract that encapsulates the ABI definitions (optional).
     *                     This can be used when decoding calldata to disambiguate methods with
     *                     the same signature but different parameter names.
     */
    AbiDecoder.prototype.addABI = function (abiArray, contractName) {
        var _this = this;
        if (abiArray === undefined) {
            return;
        }
        var ethersInterface = new ethers.utils.Interface(abiArray);
        _.map(abiArray, function (abi) {
            switch (abi.type) {
                case ethereum_types_1.AbiType.Event:
                    // tslint:disable-next-line:no-unnecessary-type-assertion
                    _this._addEventABI(abi, ethersInterface);
                    break;
                case ethereum_types_1.AbiType.Function:
                    // tslint:disable-next-line:no-unnecessary-type-assertion
                    _this._addMethodABI(abi, contractName);
                    break;
                default:
                    // ignore other types
                    break;
            }
        });
    };
    AbiDecoder.prototype._addEventABI = function (eventAbi, ethersInterface) {
        var _a;
        var topic = ethersInterface.events[eventAbi.name].topic;
        var numIndexedArgs = _.reduce(eventAbi.inputs, function (sum, input) { return (input.indexed ? sum + 1 : sum); }, 0);
        this._eventIds[topic] = __assign({}, this._eventIds[topic], (_a = {}, _a[numIndexedArgs] = eventAbi, _a));
    };
    AbiDecoder.prototype._addMethodABI = function (methodAbi, contractName) {
        var abiEncoder = new _1.AbiEncoder.Method(methodAbi);
        var functionSelector = abiEncoder.getSelector();
        if (!(functionSelector in this._selectorToFunctionInfo)) {
            this._selectorToFunctionInfo[functionSelector] = [];
        }
        // Recored a copy of this ABI for each deployment
        var functionSignature = abiEncoder.getSignature();
        this._selectorToFunctionInfo[functionSelector].push({
            functionSignature: functionSignature,
            abiEncoder: abiEncoder,
            contractName: contractName,
        });
    };
    return AbiDecoder;
}());
exports.AbiDecoder = AbiDecoder;
//# sourceMappingURL=abi_decoder.js.map