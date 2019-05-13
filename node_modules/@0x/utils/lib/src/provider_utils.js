"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
exports.providerUtils = {
    /**
     * Starts the Web3ProviderEngine without excess block polling
     * @param providerEngine The Web3ProviderEngine
     */
    startProviderEngine: function (providerEngine) {
        if (providerEngine.start === undefined) {
            throw new Error("Invalid Web3ProviderEngine");
        }
        // HACK: When calling start() Web3ProviderEngine starts a block polling service
        // this continuously pulls data from the network and can result in high data usage
        // for long running services. If used in a front end application this can cause
        // a high amount of load on a node (one request per user per block).
        providerEngine._ready.go();
        providerEngine._running = true;
    },
    /**
     * Standardize the supported provider types into our internal provider interface
     * or throw if unsupported provider supplied.
     * @param supportedProvider Potentially supported provider instance
     * @return Provider that conforms of our internal provider interface
     */
    standardizeOrThrow: function (supportedProvider) {
        if (supportedProvider === undefined) {
            throw new Error("supportedProvider cannot be 'undefined'");
        }
        var provider = {
            isStandardizedProvider: true,
            isMetaMask: supportedProvider.isMetaMask,
            isParity: supportedProvider.isParity,
            stop: supportedProvider.stop,
            enable: supportedProvider.enable,
            sendAsync: _.noop.bind(_),
        };
        // Case 1: We've already converted to our ZeroExProvider so noop.
        if (supportedProvider.isStandardizedProvider) {
            // tslint:disable-next-line:no-unnecessary-type-assertion
            return supportedProvider;
            // Case 2: It's a compliant EIP 1193 Provider
            // tslint:disable-next-line:no-unnecessary-type-assertion
        }
        else if (supportedProvider.isEIP1193) {
            provider.sendAsync = function (payload, callback) {
                var method = payload.method;
                var params = payload.params;
                supportedProvider
                    .send(method, params)
                    .then(function (result) {
                    callback(null, result);
                })
                    .catch(function (err) {
                    callback(err);
                });
            };
            return provider;
            // Case 3: The provider has a `sendAsync` method, so we use it.
        }
        else if (supportedProvider.sendAsync !== undefined) {
            provider.sendAsync = supportedProvider.sendAsync.bind(supportedProvider);
            return provider;
            // Case 4: The provider does not have a `sendAsync` method but does have a `send` method
        }
        else if (supportedProvider.send !== undefined) {
            // HACK(fabio): Detect if the `send` method has the old interface `send(payload, cb)` such
            // as in versions < Web3.js@1.0.0-beta.37. If so, do a simple re-mapping
            if (_.includes(supportedProvider.send.toString(), 'function (payload, callback)')) {
                provider.sendAsync = supportedProvider.send.bind(supportedProvider);
                return provider;
            }
            else {
                // If doesn't have old interface, we assume it has new interface `send(method, payload)`
                // such as in versions > Web3.js@1.0.0-beta.38 and convert it to `sendAsync`
                provider.sendAsync = function (payload, callback) {
                    var method = payload.method;
                    var params = payload.params;
                    supportedProvider
                        .send(method, params)
                        .then(function (result) {
                        callback(null, result);
                    })
                        .catch(function (err) {
                        callback(err);
                    });
                };
                return provider;
            }
        }
        throw new Error("Unsupported provider found. Please make sure it conforms to one of the supported providers. See 'Provider' type in 'ethereum-types' package.");
    },
};
//# sourceMappingURL=provider_utils.js.map