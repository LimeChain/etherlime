let compiler = require("./etherlime-workflow-compile/index");
let Resolver = require("./etherlime-resolver/index");

const performCompilation = (defaultPath) => {
    // const deploymentFile = `${process.cwd()}/${_deploymentFilePath}`;
    defaultPath = `${process.cwd()}/${defaultPath}`;

    let resolverOptions = {
        "working_directory": `${defaultPath}/contracts`,
        "contracts_build_directory": `${defaultPath}/build`
    };

    Resolver(resolverOptions);

    let compileOptions = {
        "contracts_directory": `${defaultPath}/contracts`,
        "contracts_build_directory": `${defaultPath}/build`
    };

    // console.log('compileOptions = ', compileOptions);
    // console.log('resolverOptions = ', resolverOptions);

    compiler.compile(compileOptions, (error, artifacts, paths) => { 
        // console.log('error = ', error);
        // console.log('artifacts = ', artifacts);
        console.log('paths = ', paths);
    });
}

const run = async (defaultPath) => {
    performCompilation(defaultPath);
}

module.exports = {
    run
}