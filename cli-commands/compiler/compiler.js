let compiler = require("./etherlime-workflow-compile/index");
let Resolver = require("./etherlime-resolver/index");
let colors = require("./../../utils/colors");

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
        if (!error) {
            console.log(colors.colorSuccess('Compilation finished successfully'));

            return;
        }

        console.log(colors.colorFailure('Compilation finished with an error:'), error);
    });
}

const run = async (defaultPath) => {
    defaultPath = `${process.cwd()}/${defaultPath}`;

    performCompilation(defaultPath);
}

module.exports = {
    run
}