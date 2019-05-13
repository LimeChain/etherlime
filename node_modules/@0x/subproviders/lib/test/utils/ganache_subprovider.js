"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var ganache_1 = require("../../src/subproviders/ganache");
var configs_1 = require("../utils/configs");
var logger = {
    log: function (arg) {
        fs.appendFileSync('ganache.log', arg + "\n");
    },
};
exports.ganacheSubprovider = new ganache_1.GanacheSubprovider({
    logger: logger,
    verbose: false,
    port: configs_1.configs.port,
    networkId: configs_1.configs.networkId,
    mnemonic: configs_1.configs.mnemonic,
});
//# sourceMappingURL=ganache_subprovider.js.map