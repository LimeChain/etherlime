"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var process = require("process");
var EnvVars;
(function (EnvVars) {
    EnvVars["SolidityCoverage"] = "SOLIDITY_COVERAGE";
    EnvVars["SolidityProfiler"] = "SOLIDITY_PROFILER";
    EnvVars["SolidityRevertTrace"] = "SOLIDITY_REVERT_TRACE";
    EnvVars["VerboseGanache"] = "VERBOSE_GANACHE";
})(EnvVars = exports.EnvVars || (exports.EnvVars = {}));
exports.env = {
    parseBoolean: function (key) {
        var isTrue;
        var envVarValue = process.env[key];
        if (envVarValue === 'true') {
            isTrue = true;
        }
        else if (envVarValue === 'false' || envVarValue === undefined) {
            isTrue = false;
        }
        else {
            throw new Error("Failed to parse ENV variable " + key + " as boolean. Please make sure it's either true or false. Defaults to false");
        }
        return isTrue;
    },
};
//# sourceMappingURL=env.js.map