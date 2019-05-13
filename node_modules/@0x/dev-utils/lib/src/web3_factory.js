"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var subproviders_1 = require("@0x/subproviders");
var utils_1 = require("@0x/utils");
var fs = require("fs");
var constants_1 = require("./constants");
var env_1 = require("./env");
exports.web3Factory = {
    getRpcProvider: function (config) {
        if (config === void 0) { config = {}; }
        var provider = new subproviders_1.Web3ProviderEngine();
        var hasAddresses = config.hasAddresses === undefined || config.hasAddresses;
        config.shouldUseFakeGasEstimate =
            config.shouldUseFakeGasEstimate === undefined || config.shouldUseFakeGasEstimate;
        if (!hasAddresses) {
            provider.addProvider(new subproviders_1.EmptyWalletSubprovider());
        }
        if (config.shouldUseFakeGasEstimate) {
            provider.addProvider(new subproviders_1.FakeGasEstimateSubprovider(constants_1.constants.GAS_LIMIT));
        }
        var logger = {
            log: function (arg) {
                fs.appendFileSync('ganache.log', arg + "\n");
            },
        };
        var shouldUseInProcessGanache = !!config.shouldUseInProcessGanache;
        if (shouldUseInProcessGanache) {
            if (config.rpcUrl !== undefined) {
                throw new Error('Cannot use both GanacheSubrovider and RPCSubprovider');
            }
            var shouldThrowErrorsOnGanacheRPCResponse = config.shouldThrowErrorsOnGanacheRPCResponse === undefined ||
                config.shouldThrowErrorsOnGanacheRPCResponse;
            if (config.ganacheDatabasePath !== undefined) {
                var doesDatabaseAlreadyExist = fs.existsSync(config.ganacheDatabasePath);
                if (!doesDatabaseAlreadyExist) {
                    // Working with local DB snapshot. Ganache requires this directory to exist
                    fs.mkdirSync(config.ganacheDatabasePath);
                }
            }
            provider.addProvider(new subproviders_1.GanacheSubprovider({
                vmErrorsOnRPCResponse: shouldThrowErrorsOnGanacheRPCResponse,
                db_path: config.ganacheDatabasePath,
                gasLimit: constants_1.constants.GAS_LIMIT,
                logger: logger,
                verbose: env_1.env.parseBoolean(env_1.EnvVars.VerboseGanache),
                port: 8545,
                network_id: 50,
                mnemonic: 'concert load couple harbor equip island argue ramp clarify fence smart topic',
            }));
        }
        else {
            provider.addProvider(new subproviders_1.RPCSubprovider(config.rpcUrl || constants_1.constants.RPC_URL));
        }
        utils_1.providerUtils.startProviderEngine(provider);
        return provider;
    },
};
//# sourceMappingURL=web3_factory.js.map