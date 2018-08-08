let compiler = require("./etherlime-workflow-compile/index");
let Resolver = require("./etherlime-resolver/index");
let colors = require("./../../utils/colors");

const run = async (defaultPath, runs) => {
    defaultPath = `${process.cwd()}/${defaultPath}`;

    performCompilation(defaultPath, runs);
}

const performCompilation = (defaultPath, runs) => {
    let compilerSolcOptions = {
        solc: {
            version: "0.4.24"
        }
    };

    let resolverOptions = {
        "working_directory": `${defaultPath}/contracts`,
        "contracts_build_directory": `${defaultPath}/build`,
        "compilers": compilerSolcOptions
    };

    Resolver(resolverOptions);

    let compileOptions = {
        "contracts_directory": `${defaultPath}/contracts`,
        "contracts_build_directory": `${defaultPath}/build`,
        "compilers": compilerSolcOptions
    };

    if (runs) {
        compileOptions.solc = {
            optimizer: {
                enabled: true,
                runs: runs
            }
        }
    }

    compiler.compile(compileOptions, (error, artifacts, paths) => {
        if (error) {
            var stack = error['stack'].split(',/');

            stack.forEach(message => {
                console.log(message);
            });

            return;
        }

        console.log(colors.colorSuccess('Compilation finished successfully'));
    });
}

module.exports = {
    run
}