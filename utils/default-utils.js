const ganacheSetupConfig = require('./../cli-commands/ganache/setup');

const setPrivateKey = function (privateKey) {
    return (privateKey) ? privateKey : ganacheSetupConfig.accounts[0].secretKey;
}

const setPort = function (port) {
    return (port) ? port : ganacheSetupConfig.defaultPort;
}

const setDefaultOverrides = function (defaultOverrides) {
    return (defaultOverrides) ? defaultOverrides : undefined;
}

module.exports = {
    setPrivateKey,
    setPort,
    setDefaultOverrides
}