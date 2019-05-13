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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = require("@0x/assert");
var types_1 = require("@0x/types");
var utils_1 = require("@0x/utils");
var JsonRpcError = require("json-rpc-error");
var subprovider_1 = require("./subprovider");
/**
 * This class implements the [web3-provider-engine](https://github.com/MetaMask/provider-engine) subprovider interface.
 * It forwards on JSON RPC requests to the supplied `rpcUrl` endpoint
 */
var RPCSubprovider = /** @class */ (function (_super) {
    __extends(RPCSubprovider, _super);
    /**
     * @param rpcUrl URL to the backing Ethereum node to which JSON RPC requests should be sent
     * @param requestTimeoutMs Amount of miliseconds to wait before timing out the JSON RPC request
     */
    function RPCSubprovider(rpcUrl, requestTimeoutMs) {
        if (requestTimeoutMs === void 0) { requestTimeoutMs = 20000; }
        var _this = _super.call(this) || this;
        assert_1.assert.isString('rpcUrl', rpcUrl);
        assert_1.assert.isNumber('requestTimeoutMs', requestTimeoutMs);
        _this._rpcUrl = rpcUrl;
        _this._requestTimeoutMs = requestTimeoutMs;
        return _this;
    }
    /**
     * This method conforms to the web3-provider-engine interface.
     * It is called internally by the ProviderEngine when it is this subproviders
     * turn to handle a JSON RPC request.
     * @param payload JSON RPC payload
     * @param _next Callback to call if this subprovider decides not to handle the request
     * @param end Callback to call if subprovider handled the request and wants to pass back the request.
     */
    // tslint:disable-next-line:prefer-function-over-method async-suffix
    RPCSubprovider.prototype.handleRequest = function (payload, _next, end) {
        return __awaiter(this, void 0, void 0, function () {
            var finalPayload, headers, response, err_1, text, statusCode, errMsg, err, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        finalPayload = subprovider_1.Subprovider._createFinalPayload(payload);
                        headers = new Headers({
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, utils_1.fetchAsync(this._rpcUrl, {
                                method: 'POST',
                                headers: headers,
                                body: JSON.stringify(finalPayload),
                            }, this._requestTimeoutMs)];
                    case 2:
                        response = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        end(new JsonRpcError.InternalError(err_1));
                        return [2 /*return*/];
                    case 4: return [4 /*yield*/, response.text()];
                    case 5:
                        text = _a.sent();
                        if (!response.ok) {
                            statusCode = response.status;
                            switch (statusCode) {
                                case types_1.StatusCodes.MethodNotAllowed:
                                    end(new JsonRpcError.MethodNotFound());
                                    return [2 /*return*/];
                                case types_1.StatusCodes.GatewayTimeout:
                                    errMsg = 'Gateway timeout. The request took too long to process. This can happen when querying logs over too wide a block range.';
                                    err = new Error(errMsg);
                                    end(new JsonRpcError.InternalError(err));
                                    return [2 /*return*/];
                                default:
                                    end(new JsonRpcError.InternalError(text));
                                    return [2 /*return*/];
                            }
                        }
                        try {
                            data = JSON.parse(text);
                        }
                        catch (err) {
                            end(new JsonRpcError.InternalError(err));
                            return [2 /*return*/];
                        }
                        if (data.error) {
                            end(data.error);
                            return [2 /*return*/];
                        }
                        end(null, data.result);
                        return [2 /*return*/];
                }
            });
        });
    };
    return RPCSubprovider;
}(subprovider_1.Subprovider));
exports.RPCSubprovider = RPCSubprovider;
//# sourceMappingURL=rpc_subprovider.js.map