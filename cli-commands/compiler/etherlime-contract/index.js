var Schema = require("./../etherlime-contract-schema");
var Contract = require("./contract.js");

var contract = function (options) {
    var binary = Schema.normalize(options || {});
    
    return Contract.clone(binary);
};

module.exports = contract;

if (typeof window !== "undefined") {
    window.EtherlimeContract = contract;
}
