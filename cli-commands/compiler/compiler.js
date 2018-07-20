let compiler = require("./etherlime-workflow-compile/index");
let Resolver = require("./etherlime-resolver/index");

const performCompilation = (defaultPath) => {
    let resolverOptions = {
        "working_directory": `${defaultPath}/contracts`,
        "contracts_build_directory": `${defaultPath}/build`
    };

    Resolver(resolverOptions);

    let compileOptions = {
        "contracts_directory": `${defaultPath}/contracts`,
        "contracts_build_directory": `${defaultPath}/build`
    };

    compiler.compile(compileOptions, (error, artifacts, paths) => { 
        
    });
}

const run = async (defaultPath) => {
    defaultPath = `${process.cwd()}/${defaultPath}`;

    performCompilation(defaultPath);
}

module.exports = {
    run
}