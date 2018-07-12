const utils = require('./../util');

let compiler = require("./etherlime-workflow-compile/index");
let Resolver = require("./etherlime-resolver/index");

const performCompilation = () => {
    let resolverOptions = {
        "working_directory": `${defaultPath}/contracts`,
        "contracts_build_directory": `${defaultPath}/build`
    };

    Resolver(resolverOptions);

    let compileOptions = {
        "contracts_directory": `${defaultPath}/contracts`,
        "contracts_build_directory": `${defaultPath}/build`
    };

    compiler.compile(compileOptions, () => { });
}

const run = async (defaultPath) => {
    performCompilation();
}

module.exports = {
    run
}