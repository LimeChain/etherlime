let Resolver = require("../compiler/etherlime-resolver/index");
let CompilerSupplier = require("../compiler/etherlime-compile/compilerSupplier");

let resolverOptions = {
    "working_directory": `${process.cwd()}`,
    "contracts_build_directory": `${process.cwd()}/build`,
    "quiet": false
};

let resolver = new Resolver(resolverOptions);

var supplier = new CompilerSupplier({
    version: undefined,
    docker: false
})

module.exports = {
    resolver,
    supplier
}